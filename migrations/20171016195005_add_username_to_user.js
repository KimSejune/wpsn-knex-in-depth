
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('user', t => {
    t.string('username')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('user', t => {
    t.dropColumn('username')
  })
};
