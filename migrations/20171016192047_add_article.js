
exports.up = function(knex, Promise) {
  return knex.schema.createTable('article', t => {
    t.increments()
    t.integer('user_id').unsigned().notNullable()
    t.string('title').notNullable()
    t.text('content').notNullable()
    t.foreign('user_id').references('user.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('article')
};
