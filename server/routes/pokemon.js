const router = require('express').Router()

const pokemonDb = require('../db/pokemon')

router.get('/', (req, res) => {
  pokemonDb.getPokemon()
    .then(pokemon => res.json(pokemon))
})

module.exports = router
