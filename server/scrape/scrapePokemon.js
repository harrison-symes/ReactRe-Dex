var request = require('superagent')
var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')

var zombie = require("zombie");
zombie.waitDuration = '30s'

var browsers = 0
var browserLimit = 10
var pokemonLength = 10

var nock = require('nock')

nock('http://pagead2.googlesyndication.com')
.get('/pagead/js/adsbygoogle.js')
.times(Math.Infinity)
.reply(200, '{}')

start()

function start () {
  writeFile([])
  .then(() => {
    var arr = []
    console.log(arr.length)
    console.log(process.argv)
    Promise.all([
      Array(pokemonLength).fill(0).map((e, i) => getImageRecursive(i + 1, arr))
    ])
      .then(() => isDoneRecursive(arr))
      .then(message => console.log(message))
  })
}

function isDoneRecursive(arr) {
  return new Promise(function(resolve, reject) {
    writeFile(arr)
    console.log(arr.length, pokemonLength - arr.length, "to go");
    setTimeout(() => resolve(isDoneRecursive(arr)), 10000)
  });
}

function writeFile(pokemon) {
  return new Promise(function(resolve, reject) {
    const file = pokemon.filter(item => item)
    fs.writeFile(path.join(__dirname, '/pokemans.txt'), JSON.stringify({pokemon: file}), (err) => {
      if (!err) resolve("written " + file.length)
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
    case 'evolution-one': return 1
    case 'evolution-two': return 2
    case 'evolution-three': return 3
    case 'evolution-four': return 2
    case 'evolution-five': return 3
    case 'evolution-six': return 3
    case 'evolution-seven': return 2
    case 'evolution-eight': return 2
    default: return 1
  }
}

const solveStage = ($, pokemon) => {
  var evolutions = $('.evolution-profile').find('img')
  var first = $('.evolution-profile').find('.first').find('img')
  var middle = $('.evolution-profile').find('.middle').find('img')
  var last = $('.evolution-profile').find('.last').find('img')
  var stage = null
  var atIndex
  for (var i = 0; i < first.length; i++) if(first[i].attribs.alt === pokemon.name) {
    stage = 1; atIndex = i;
  }
  for (var j = 0; j < middle.length; j++) if(middle[j].attribs.alt === pokemon.name) {
    stage = 2; atIndex = j
  }
  for (var k = 0; k < last.length; k++) if(last[k].attribs.alt === pokemon.name) {
    middle.length == 0 ? stage = 2 : stage = 3
    atIndex = k
  }

  var evolvesFrom = []
  var evolvesInto = []

  switch(stage) {
    case 1:
      if (middle.length != 0) for (let i = 0; i < middle.length; i++) evolvesInto.push(middle[i].attribs.alt)
      else for (let i = 0; i < last.length; i++) evolvesInto.push(last[i].attribs.alt)
      break;
    case 2:
      if (first.length == atIndex + 1) evolvesFrom.push(first[atIndex].attribs.alt)
      else evolvesFrom.push(first[0].attribs.alt)
      if (middle.length != 0) {
        if (middle.length == last.length) evolvesInto.push(last[atIndex].attribs.alt)
        else for (let i=0; i<last.length; i++) evolvesInto.push(last[i].attribs.alt)
      }
      break;
    case 3:
      if (first[atIndex]) evolvesFrom.push(middle[atIndex].attribs.alt)
      break;
    default:
      break;
  }

  evolvesInto.map(evolution => {
    if (evolution == 'Nidoran♂') return 'Nidoran-M'
    else if (evolution == 'Nidoran♀') return  'Nidoran-F'
    else return evolution
  })

  evolvesFrom.map(evolution => {
    if (evolution == 'Nidoran♂') return 'Nidoran-M'
    else if (evolution == 'Nidoran♀') return  'Nidoran-F'
    else return evolution
  })

  pokemon.evolvesInto = JSON.stringify(evolvesInto)

  pokemon.evolvesFrom = JSON.stringify(evolvesFrom)
  pokemon.stage = stage
}

const getStageData = ($, pokemon) => {
  pokemon.stages = getStages($)
  solveStage ($, pokemon)
  return pokemon
}

const getOriGen = ($) => {
  return $('.OtherGensList').find('li')[0].children[0].children[0].data
}

const getPokemon = ($) => {
  let pokemon = {
    image_url: getImage($),
    dex_number: getNumber($),
    name: getName($),
    description: getDescription($),
  }
  getStageData($, pokemon)
  if (pokemon.name == 'Nidoran♂') pokemon.name = 'Nidoran-M'
  if (pokemon.name == 'Nidoran♀') pokemon.name = 'Nidoran-F'
  return pokemon
}


const getType = ($) => {
  return 'placeholder'
}

const getStats = ($, pokemon) => {
  const stats = $('.PokemonStats').find('tbody').find('tr')
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i].children[0].children[0].data
    const value = stats[i].children[1].children[0].data
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
}

const getTypes = ($, pokemon) => {
  const list = $('.PokemonSummary-types').find('.TypeList').find('.Type')
  pokemon.type_one = list[0].children[0].data
  pokemon.type_two = list[1] ? list[1].children[0].data : null
  if (pokemon.type_one == pokemon.type_two) pokemon.type_two = null
}

const getSmogonData = (pokemon, tries = 0) => {
  return new Promise(function(resolve, reject) {
    if (browsers >= browserLimit) setTimeout(() => resolve(getSmogonData(pokemon, tries)), 1000)
    else {
      console.log("starting site", pokemon.name, tries, browsers);
      const Browser = new zombie()
      browsers++
      Browser.visit("http://www.smogon.com/dex/sm/pokemon/" + pokemon.name)
      .then(() => {
        Browser.wait()
        .then(() => {
          // console.log(Browser.html())
          const $ = cheerio.load(Browser.html())
          // console.log($('ul'))
          getStats($, pokemon)
          getTypes($, pokemon)
          pokemon.oriGen = getOriGen($)
          console.log({pokemon});
          browsers--
          resolve(pokemon)
          // Browser.close()
        })
        .catch(() =>  setTimeout(() => resolve(getSmogonData(pokemon, tries + 1)), 3000))
      })
      .catch(() => setTimeout(() => resolve(getSmogonData(pokemon, tries + 1)), 3000))
    }
  });
  // return pokemon
}

function pokemonExists(idx, arr) {
  var formatIdx = JSON.stringify(idx).split('')
  while(formatIdx.length != 3) formatIdx.unshift('0')
  formatIdx = formatIdx.join('')
  return !!arr.find(pokemon => pokemon.dex_number === formatIdx)
}

function getPokemonBaseData(idx, arr) {
  return new Promise(function(resolve, reject) {
    if (!arr) arr = []
    request
    .get('https://www.pokemon.com/us/pokedex/' + idx)
    .then(res => {
      var $ = cheerio.load(res.text)
      var pokemon = getPokemon($)
      resolve(pokemon)
    })
    .catch(err => setTimeout(() => resolve(getPokemonBaseData(idx, arr)), 5000))
  })
}

function getImageRecursive (idx, arr) {
  return new Promise(function(resolve, reject) {
    console.log(idx)
    if (false) resolve(arr[idx])
    else {
      getPokemonBaseData(idx, arr)
      .then(pokemon => {
        getSmogonData(pokemon)
        .then((pokemon) => {
          arr[idx - 1] = pokemon
          // writeFile(arr)
          // .then(message => console.log(message))
          // .catch(err => {
          //   console.log(err)
          // })
          resolve()
          // if (idx >= 805) resolve(arr)
          // else resolve(getImageRecursive(idx + 1, arr))
        })
      })
      .catch(err => {
        console.log(err)
        resolve(getImageRecursive(idx, arr))
      })
    }
  })
}
