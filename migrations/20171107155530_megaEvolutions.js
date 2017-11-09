
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('megaEvolutions', table => {
    table.integer('dex_number')
    table.string('name')
    table.string('type_one')
    table.string('type_two')
    table.string('HP')
    table.string('Attack')
    table.string('Defense')
    table.string('SpAtk')
    table.string('SpDef')
    table.string('Speed')
    table.string('ability')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('megaEvolutions')
};
