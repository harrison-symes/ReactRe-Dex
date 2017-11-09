const router = require('express').Router()

const pokemonDb = require('../db/pokemon')

router.get('/', (req, res) => {
  pokemonDb.getPokemon()
    .then(pokemon => res.json(pokemon))
})

router.get('/megas', (req, res) => {
  pokemonDb.getMegas()
    .then(megas => res.json(megas))
})

module.exports = router
