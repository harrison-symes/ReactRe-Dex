const environment = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(environment)
const fs = require('fs')
const path = require('path')

populateMegaEvolutionDb()
  .then(() => console.log("done"))

function populateMegaEvolutionDb (connection) {
  return new Promise(function(resolve, reject) {
    const db = connection || knex
    console.log("running")
    fs.readFile(path.join(__dirname, '/megaEvolutions.txt'), 'utf8', (err, data) => {
      if (err) console.log(err)
      else {
        var megas = JSON.parse(data)
        db('megaEvolutions').del()
          .then(() => {
            resolve(Promise.all[megas.map(insertPokemon)])
          })
      }
    })
  });
}

function insertPokemon(pokemon) {
  return new Promise(function(resolve, reject) {
    const db = knex
    // console.log("inserting", pokemon.name)
    db('megaEvolutions')
    .where('dex_number', pokemon.dex_number)
    .first()
    .then(monDb => {
      if (monDb) resolve()
      else resolve(db('megaEvolutions').insert(pokemon))
    })
    .catch(err => console.log(err, pokemon.name))
  });
}
