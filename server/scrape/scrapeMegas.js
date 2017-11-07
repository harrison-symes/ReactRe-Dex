var request = require('superagent')
var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')

var zombie = require("zombie");
zombie.waitDuration = '30s'

var nock = require('nock')

var filePath = path.join(__dirname, '/megaEvolutions.txt')

nock('http://pagead2.googlesyndication.com')
.get('/pagead/js/adsbygoogle.js')
.times(Math.Infinity)
.reply(200, '{}')


start()

function start() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) writeFile([])
      .then(() => start())
    else {
      console.log("file exists");
      // const arr = JSON.parse(data)
      const arr = []
      getMegas("https://pokemondb.net/x-y/mega-evolution", arr)
        .then(megas => getMegas("https://pokemondb.net/omega-ruby-alpha-sapphire/mega-evolution",megas))
        .then((megas) => writeFile(megas))
        .then((megas) => getSmogonMegaData(megas, 0))
        .then(megas => writeFile(megas))
        .then(() => console.log("done"))
    }
  })
}

function writeFile(arr) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, JSON.stringify(arr), (err) => {
      if (err) reject(err)
      else resolve(arr)
    })
  });
}

function getMegas (url, megas) {
  return new Promise(function(resolve, reject) {
    request
      .get(url)
      .then(res => {
        const $ = cheerio.load(res.text)
        const cards = $('.infocard-tall-list').find('.infocard-tall')
        for (var i = 0; i < cards.length; i++) {
          const pokemon = {
            name: cards[i].children[0].children[0].attribs.alt,
            dex_number: cards[i].children[2].children[0].data.split('#').join(''),
            type_one: cards[i].children[6].children[0].children[0].data,
            type_two: cards[i].children[6].children.length === 3 ? cards[i].children[6].children[2].children[0].data : null
          }
          console.log(pokemon);
          megas.push(pokemon)
        }
        resolve(megas)
      })

  })
}


function solveMegaStats($, pokemon) {
  const rows = $.children[2].children[0].children[0].children

  for (var i = 0; i < 6; i++) {
    const stat = rows[i].children[0].children[0].data
    const value = rows[i].children[1].children[0].data
    switch (stat) {
      case 'HP:': if(!pokemon.hasOwnProperty('HP')) pokemon.HP=value; break;
      case 'Attack:': if(!pokemon.hasOwnProperty('Attack')) pokemon.Attack=value; break;
      case 'Defense:': if(!pokemon.hasOwnProperty('Defense')) pokemon.Defense=value; break;
      case 'Sp. Atk:': if(!pokemon.hasOwnProperty('SpAtk')) pokemon.SpAtk=value; break;
      case 'Sp. Def:': if(!pokemon.hasOwnProperty('SpDef')) pokemon.SpDef=value; break;
      case 'Speed:': if (!pokemon.hasOwnProperty('Speed')) pokemon.Speed=value; break;
      default: break;
    }
  }
  pokemon.ability = $.children[1].children[0].children[0].children[1].children[1].children[0].children[0].children[0].children[0].data
  // for (let i = 0; i < stats.length; i++) {
  //   console.log({stat, value});
  // }
}

function checkSmogonStats (pokemon) {
  return pokemon.hasOwnProperty('HP') && pokemon.hasOwnProperty('Defense') && pokemon.hasOwnProperty('Attack') && pokemon.hasOwnProperty('Speed') && pokemon.hasOwnProperty('SpDef') && pokemon.hasOwnProperty('SpAtk') && pokemon.hasOwnProperty('ability')
}

function getSmogonMegaData (megas, idx) {
  return new Promise(function(resolve, reject) {
    const Browser = new zombie()
    console.log("starting site", megas[idx].name);
    if (checkSmogonStats(megas[idx])) resolve(getSmogonMegaData(megas, idx + 1))
    else {
      Browser.visit("http://www.smogon.com/dex/sm/pokemon/" + megas[idx].name.split(' ')[1])
      .then(() => {
        Browser.wait()
        .then(() => {
          // console.log(Browser.html())
          const $ = cheerio.load(Browser.html())
          const info = $('.PokemonAltInfo')
          // console.log(info[1]);
          if (info.length == 3) {
            if (megas[idx].name.split(' ')[2] == 'X') solveMegaStats(info[1], megas[idx])
            else  if(megas[idx].name.split(' ')[2] == 'Y') solveMegaStats(info[1], megas[idx])
          } else {
            solveMegaStats(info[1], megas[idx])
          }
          console.log(megas[idx]);
          writeFile(megas)
          .then(() => {
            if (idx == megas.length - 1) resolve(megas)
            else resolve(getSmogonMegaData(megas, idx + 1))
          })
          // Browser.close()
        })
        .catch(() => setTimeout(() => resolve(getSmogonMegaData(megas, idx)), 3000))
      })
      .catch(() => setTimeout(() => resolve(getSmogonMegaData(megas, idx)), 3000))
    }
  })
}
