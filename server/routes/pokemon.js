const router = require('express').Router()

const pokemonDb = require('../db/pokemon')
const {decode} = require('../auth/token')

router.get('/', (req, res) => {
  pokemonDb.getPokemon()
    .then(pokemon => res.json(pokemon))
})

router.get('/megas', (req, res) => {
  pokemonDb.getMegas()
    .then(megas => res.json(megas))
})

router.get('/caught', decode, (req, res) => {
  pokemonDb.getUserPokemon(req.user.user_id)
    .then(caught => res.json(caught.map(({dex_number}) => dex_number)))
})

router.post('/caught/:id', decode, (req, res) => {
  pokemonDb.catchPokemon(req.params.id, req.user.user_id)
    .then(() => res.sendStatus(201))
})

module.exports = router
