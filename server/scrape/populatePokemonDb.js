istconst environment = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(environment)
const fs = require('fs')
const path = require('path')

populatePokemonDb()
  .then(() => console.log("done"))

function populatePokemonDb (connection) {
  return new Promise(function(resolve, reject) {
    const db = connection || knex
    console.log("running")
    fs.readFile(path.join(__dirname, '/pokemans.txt'), 'utf8', (err, data) => {
      if (err) console.log(err)
      else {
        var {pokemon} = JSON.parse(data)
        db('pokemon').del()
          .then(() => {
            resolve(Promise.all[pokemon.map(insertPokemon)])
          })
      }
    })
  });
}

function insertPokemon(pokemon) {
  return new Promise(function(resolve, reject) {
    const db = knex
    console.log("inserting", pokemon.name)
    db('pokemon')
    .where('dex_number', pokemon.dex_number)
    .first()
    .then(monDb => {
      if (monDb) resolve()
      else resolve(db('pokemon').insert(pokemon))
    })
    .catch(err => console.log(err, pokemon.name))
  });
}
