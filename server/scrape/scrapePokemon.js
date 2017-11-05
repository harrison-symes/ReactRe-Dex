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
  console.log({stageData});
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
  console.log(pokemon.stages, 'stages')
  var evolutions = $('.evolution-profile').find('img')
  var first = $('.evolution-profile').find('.first').find('img')
  var middle = $('.evolution-profile').find('.middle').find('img')
  var last = $('.evolution-profile').find('.last').find('img')
  // console.log({first, middle, last});
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

  console.log({stage, atIndex});

  var evolvesFrom = []
  var evolvesInto = []

  switch(stage) {
    case 1:
      if (middle.length != 0) for (let i = 0; i < middle.length; i++) evolvesInto.push(middle[i].attribs.alt)
      else for (let i = 0; i < last.length; i++) evolvesInto.push(last[i].attribs.alt)
      break;
    case 2:
      console.log(middle.length, "middle");
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
  console.log({evolvesInto, evolvesFrom, atIndex});
  pokemon.evolvesInto = evolvesInto
  pokemon.evolvesFrom = evolvesFrom
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
        getStats($, pokemon)
        getTypes($, pokemon)
        pokemon.oriGen = getOriGen($)
        console.log({pokemon});
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
