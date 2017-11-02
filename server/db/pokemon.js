const environment = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(environment)

module.exports = {
  getPokemon: (testDb) => (testDb || knex)('pokemon').orderBy('dex_number', 'asc')
}
