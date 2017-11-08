var request = require('superagent')
var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')

var zombie = require("zombie");
zombie.waitDuration = '30s'

var browsers = 0
var browserLimit = 10
var pokemonLength = 800

var nock = require('nock')

nock('http://pagead2.googlesyndication.com')
.get('/pagead/js/adsbygoogle.js')
.times(Math.Infinity)
.reply(200, '{}')

start()

function start () {
  fs.readFile(path.join(__dirname, '/pokemans.txt'), 'utf8', (err, data) => {
    if (err) writeFile([])
      .then(() => start())
    else {
      var arr = JSON.parse(data).pokemon
      console.log(arr.length)
      console.log(process.argv)
      getImageRecursive(process.argv[2] ? Number(process.argv[2]) : arr.length > 0 ? arr.length : 1, arr)
      .then(message => console.log("done"))
    }
  })
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

  var name = pokemon.name
  if (name == 'Nidoran-F') name = "Nidoran♀"
  if (name == 'Nidoran-M') name = "Nidoran♂"
  if (name == 'Flabebe') name = "Flabébé"
  if (name == 'Flabebe') name = "Flabébé"
  if (name == 'Mr_Mime') name = "Mr. Mime"
  if (name == 'Mime_Jr') name = "Mime Jr."

  for (var i = 0; i < first.length; i++) if(first[i].attribs.alt === name) {
    stage = 1; atIndex = i;
  }
  for (var j = 0; j < middle.length; j++) if(middle[j].attribs.alt === name) {
    stage = 2; atIndex = j
  }
  for (var k = 0; k < last.length; k++) if(last[k].attribs.alt === name) {
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
      if (first[atIndex] || middle[atIndex]) evolvesFrom.push(middle[atIndex].attribs.alt)
      else evolvesFrom.push(middle[0].attribs.alt)
      break;
    default:
      break;
  }


  evolvesInto = evolvesInto.map(name => {
    if (name == 'Nidoran♂') return 'Nidoran-M'
    else if (name == 'Nidoran♀') return  'Nidoran-F'
    else if (name == "Flabébé") return "Flabebe"
    else if (name == "Mr. Mime") return "Mr_Mime"
    else if (name == "Mime Jr.") return "Mime_Jr"
    else return name
  })
  evolvesFrom = evolvesFrom.map(name => {
    if (name == 'Nidoran♂') return 'Nidoran-M'
    else if (name == 'Nidoran♀') return 'Nidoran-F'
    else if (name == "Flabébé") return "Flabebe"
    else if (name == "Mr. Mime") return "Mr_Mime"
    else if (name == "Mime Jr.") return "Mime_Jr"
    else return name
  })
  console.log({evolvesInto, evolvesFrom});
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

const getTier = ($) => {
  return $('.PokemonAltInfo-data').find('tr')[2].children[1].children[0].children[0].children[0].children[0].data
}


const getAbilties = ($, pokemon) => {
  var abilities = $('.AbilityList')[0]
  console.log(abilities.children.length);
  for (var i = 0; i < abilities.children.length; i++) {
    console.log({i});
    if (i ==  0) pokemon.ability_one = abilities.children[i].children[0].children[0].data
    if (i ==  1) pokemon.ability_two = abilities.children[i].children[0].children[0].data
    if (i ==  2) pokemon.ability_three = abilities.children[i].children[0].children[0].data
  }
  console.log({pokemon});
  // pokemon.ability_one = $('.PokemonAltInfo-data').find('tr')[1].children[1].children[0].children[0].children[0].children[0].data
}


const getPokemon = ($) => {
  let pokemon = {
    image_url: getImage($),
    dex_number: getNumber($),
    name: getName($),
    description: getDescription($),
  }
  if (pokemon.name == 'Nidoran♂') pokemon.name = 'Nidoran-M'
  if (pokemon.name == 'Nidoran♀') pokemon.name = 'Nidoran-F'
  if (pokemon.name == 'Flabébé') pokemon.name = 'Flabebe'
  if (pokemon.name == 'Mr.Mime') pokemon.name = 'Mr_Mime'
  if (pokemon.name == 'MimeJr.') pokemon.name = 'Mime_Jr'
  getStageData($, pokemon)
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
      case 'HP:': if(!pokemon.hasOwnProperty('HP')) pokemon.HP=value; break;
      case 'Attack:': if(!pokemon.hasOwnProperty('Attack')) pokemon.Attack=value; break;
      case 'Defense:': if(!pokemon.hasOwnProperty('Defense')) pokemon.Defense=value; break;
      case 'Sp. Atk:': if(!pokemon.hasOwnProperty('SpAtk')) pokemon.SpAtk=value; break;
      case 'Sp. Def:': if(!pokemon.hasOwnProperty('SpDef')) pokemon.SpDef=value; break;
      case 'Speed:': if (!pokemon.hasOwnProperty('Speed')) pokemon.Speed=value; break;
      default: break;
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
    console.log("starting site", pokemon.name, tries);
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
        pokemon.tier = getTier($)
        getAbilties($, pokemon)
        console.log({pokemon});
        browsers--
        resolve(pokemon)
        // Browser.close()
      })
      .catch(() => tries >= 20 ? resolve(pokemon) : setTimeout(() => resolve(getSmogonData(pokemon, tries + 1)), 3000))
    })
    .catch(() => tries >= 20 ? resolve(pokemon) : setTimeout(() => resolve(getSmogonData(pokemon, tries + 1)), 3000))
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
    getPokemonBaseData(idx, arr)
    .then(pokemon => {
      getSmogonData(pokemon)
      .then((pokemon) => {
        arr[idx - 1] = pokemon
        writeFile(arr)
        .then(message => {
          if (arr.length >= pokemonLength) resolve(arr)
          else resolve(getImageRecursive(idx + 1, arr))
          console.log(message)
        })
        .catch(err => {
          console.log(err)
        })
      })
    })
    .catch(err => {
      console.log(err)
      resolve(getImageRecursive(idx, arr))
    })
  })
}
