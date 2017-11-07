const environment = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(environment)

module.exports = {
  getPokemon: (testDb) => (testDb || knex)('pokemon').orderBy('dex_number', 'asc'),
  getMegas: (testDb) => (testDb || knex)('megaEvolutions'),
  getMegaById: (id, testDb) => (testDb || knex)('megaEvolutions').where('dex_number', id).first()
}
