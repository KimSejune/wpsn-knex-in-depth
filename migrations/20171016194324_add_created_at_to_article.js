
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('article', t => {
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('article', t => {
    t.dropColumn('created_at')
  })
};
