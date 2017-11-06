
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('pokemon', table => {
    table.increments('dex_number')
    table.string('name')
    table.text('description')
    table.string('image_url')
    table.string('type_one')
    table.string('type_two')
    table.string('HP')
    table.string('Attack')
    table.string('Defense')
    table.string('SpAtk')
    table.string('SpDef')
    table.string('Speed')
    table.string('evolvesFrom')
    table.string('evolvesInto')
    table.integer('stage')
    table.integer('stages')
    table.string('oriGen')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pokemon')
};
