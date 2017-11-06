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
      const arr = JSON.parse(data)
      getMegas(arr)
        .then(() => console.log("done"))
    }
  })
}

function writeFile(arr) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, JSON.stringify(arr), (err) => {
      if (err) reject(err)
      else resolve('success')
    })
  });
}

function getMegas (arr) {
  return new Promise(function(resolve, reject) {
    request
      .get("https://pokemondb.net/x-y/mega-evolution")
      .then(res => {
        const $ = cheerio.load(res.text)
        console.log($('.infocard-tall-list').find('.infocard-tall'));
        resolve()
      })

  })
}
