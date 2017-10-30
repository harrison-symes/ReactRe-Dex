
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('pokemon', table => {
    table.increments('dex_number')
    table.string('name')
    table.text('description')
    table.string('image_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pokemon')
};
