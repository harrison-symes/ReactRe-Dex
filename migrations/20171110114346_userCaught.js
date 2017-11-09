
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('userCaught', table => {
    table.integer('user_id')
    table.integer('dex_number')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('userCaught')
};
