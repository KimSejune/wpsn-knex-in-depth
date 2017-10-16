
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', t => {
    t.increments()
    t.integer('user_id').unsigned().notNullable()
    t.integer('article_id').unsigned().notNullable()
    t.text('content').notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment')
};
