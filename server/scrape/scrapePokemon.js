var request = require('superagent')
var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')

start()

function start () {
  fs.readFile(path.join(__dirname, '/pokemans.txt'), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      writeFile([])
      .then(() => start())
    } else {
      var arr = JSON.parse(data).pokemon
      console.log(arr.length)
      getImageRecursive(1, arr)
      .then(pokemon => {
        console.log(pokemon.length)
        writeFile(pokemon)
        .then(message => console.log('done!'))
      })
    }
  })
}

function writeFile(pokemon) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.join(__dirname, '/pokemans.txt'), JSON.stringify({pokemon}), (err) => {
      if (!err) resolve("written " + pokemon.length +  " images")
      else reject(err)
    })
  });
}

const getImage = ($) => $('.profile-images').find('img')[0].attribs.src

const getName = ($)  => $('.pokedex-pokemon-pagination-title')[0].children[1].children[0].data.split(' ').filter(c =>c!=' ').join('').split('\n')[1]

const getNumber = ($) => $('.pokedex-pokemon-pagination-title')[0].children[1].children[1].children[0].data.split('#')[1]

const getDescription = ($) => $('.version-y')[0].children[0].data.split(' ').filter(c=>c!= '').join(' ').split('\n').filter(c=>c!='').join(' ').split('').filter((a,b,c)=>b!=0).join('')

const getStages = ($) => {
  const stageData = $('.pokedex-pokemon-evolution')[0].attribs.class.split(' ')[2]
  switch (stageData) {
    case 'evolution-three':
      return 3
    case 'evolution-two':
      return 2
    defaut:
      return 1
  }
}

const solveStage = ($, pokemon) => {
  var evolutions = $('.evolution-profile').find('img')
  var stage = 1
  for (var i = 0; i < evolutions.length; i++) {
    // console.log(i, evolutions[i]);
    if (evolutions[i].attribs.alt == pokemon.name) stage = i+1
  }
  var evolvesFrom = null
  var evolvesInto = null
  switch(stage) {
    case 1:
      evolvesInto = evolutions[stage] ? evolutions[stage].attribs.alt : null
    case 2:
      evolvesInto = evolutions[stage] ? evolutions[stage].attribs.alt : null
      evolvesFrom = evolutions[stage - 2] ? evolutions[stage - 2].attribs.alt : null
    case 3:
      evolvesFrom = evolutions[stage - 2] ? evolutions[stage - 2].attribs.alt : null
    default:
      break;
  }
  pokemon.evolvesInto = evolvesInto
  pokemon.evolvesFrom = evolvesFrom
  pokemon.stage = stage
}

const getStageData = ($, pokemon) => {
  pokemon.stages = getStages($)
  solveStage ($, pokemon)
  return pokemon
}



const getPokemon = ($) => {
  let pokemon = {
    image_url: getImage($),
    dex_number: getNumber($),
    name: getName($),
    description: getDescription($),
  }
  getStageData($, pokemon)
  return pokemon
}


const getType = ($) => {
  return 'placeholder'
}

const getSmogonData = (pokemon, tries = 0) => {
  return new Promise(function(resolve, reject) {
    var nock = require('nock')

    nock('http://pagead2.googlesyndication.com')
    .get('/pagead/js/adsbygoogle.js')
    .times(Math.Infinity)
    .reply(200, '{}')

    var zombie = require("zombie");
    zombie.waitDuration = '30s'
    console.log("starting site", pokemon.name);
    Browser = new zombie()
    Browser.visit("http://www.smogon.com/dex/sm/pokemon/" + pokemon.name)
    .then(() => {
      Browser.wait()
      .then(() => {
        // console.log(Browser.html())
        const $ = cheerio.load(Browser.html())
        // console.log($('ul'))
        var list = $('.PokemonSummary-types').find('.TypeList').find('.Type')
        pokemon.type_one = list[0].children[0].data
        pokemon.type_two = list[1] ? list[1].children[0].data : null
        var stats = $('.PokemonStats').find('tbody').find('tr')
        for (let i = 0; i < stats.length; i++) {
          console.log(stats.length);
          const stat = stats[i].children[0].children[0].data
          const value = stats[i].children[1].children[0].data
          console.log({stat, value});
          switch (stat) {
            case 'HP:':
              pokemon.HP = value
            case 'Attack:':
              pokemon.Attack = value
            case 'Defense:':
              pokemon.Defense = value
            case 'Sp. Atk:':
              pokemon.SpAtk = value
            case 'Sp. Def:':
              pokemon.SpDef = value
            case 'Speed:':
              pokemon.Speed = value
            default:
              break;
          }
        }
        console.log(pokemon)
        resolve(pokemon)

      })
      .catch(() => {
        if (tries >= 5) resolve(pokemon)
        else setTimeout(() => resolve(getSmogonData(pokemon, tries + 1)), 3000)
      })
    })
    .catch(() => {
      if (tries >= 5) resolve(pokemon)
      else setTimeout(() => resolve(getSmogonData(pokemon, tries + 1)), 3000)

    })
  });
  // return pokemon
}

function getPokemonBaseData(idx, arr) {
  return new Promise(function(resolve, reject) {
    if (!arr) arr = []
    // const pokemon = arr.find(pokemon => pokemon.dex_number == idx)
    // if (pokemon && pokemon.hasOwnProperty('name') && pokemon.hasOwnProperty('description') && pokemon.hasOwnProperty('image_url')) resolve (pokemon)
    // else {
      request
      .get('https://www.pokemon.com/us/pokedex/' + idx)
      .then(res => {
        var $ = cheerio.load(res.text)
        var pokemon = getPokemon($)
        resolve(pokemon)
      })
      .catch(err => resolve(err))
    // }
  })
}

function getImageRecursive (idx, arr) {
  return new Promise(function(resolve, reject) {
    console.log(idx)
    getPokemonBaseData(idx, arr)
      .then(pokemon => {
        getSmogonData(pokemon)
        .then((pokemon) => {
          arr[idx - 1] = pokemon
          writeFile(arr)
          .then(message => console.log(message))
          .catch(err => {
            console.log(err)
          })
          if (idx >= 805) resolve(arr)
          else resolve(getImageRecursive(idx + 1, arr))
        })
      })
      .catch(err => {
        console.log(err)
        resolve(getImageRecursive(idx, arr))
      })
  })
}
