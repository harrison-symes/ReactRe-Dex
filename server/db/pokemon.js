const environment = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(environment)

module.exports = {
  getPokemon: (testDb) => (testDb || knex)('pokemon').orderBy('dex_number', 'asc'),
  getMegas: (testDb) => (testDb || knex)('megaEvolutions'),
  getMegaById: (id, testDb) => (testDb || knex)('megaEvolutions').where('dex_number', id).first(),
  getUserPokemon: (user_Id, testDb) => (testDb || knex)('userCaught').where('user_Id', user_Id).select('dex_number'),
  catchPokemon: (dex_number, user_id, testDb) => (testDb || knex)('userCaught').insert({dex_number, user_id})
}
