const knex = require('./knex')
const bcrypt = require('bcrypt')
const validator = require('validator')

module.exports = {
  firstOrCreateUserByProvider(provider, provider_user_id, access_token=null, avatar_url=null, username=null) {
    return knex('user')
      .where({
        provider,
        provider_user_id
      })
      .first()
      .then(user => {
        if (user) {
          return user
        } else {
          return knex('user')
            .insert({
              provider,
              provider_user_id,
              access_token,
              avatar_url,
              username
            })
            .then(([id]) => {
              return knex('user')
                .where({id})
                .first()
            })
        }
      })
  },
  getUserById(id) {
    return knex('user')
      .where({id})
      .first()
  },
  getArticles() {
    return knex('article')
      .join('user', 'user.id', 'article.user_id')
      .orderBy('article.id', 'desc')
  },
  getArticlesWithCommentCount() {
    const subquery = knex('comment')
      .select('article_id', knex.raw('count(*) as comment_count'))
      .groupBy('article_id')
      .as('comment_count_table')
    return this.getArticles()
      .leftOuterJoin(subquery, 'comment_count_table.article_id', 'article.id')
      .select(knex.raw('coalesce(comment_count_table.comment_count, 0) as comment_count'))
  },
  createArticle({user_id, title, content}) {
    return knex('article')
      .insert({
        user_id,
        title,
        content
      })
  },
  getArticleById(id) {
    return knex('article')
      .join('user', 'user.id', 'article.user_id')
      .where('article.id', id)
      .first()
  },
  getCommentsByArticleId(article_id) {
    return knex('comment')
      .join('user', 'user.id', 'comment.user_id')
      .select('user.username', 'comment.content')
      .where({article_id})
      .orderBy('comment.id', 'desc')
  },
  createComment({user_id, article_id, content}) {
    return knex('comment')
      .insert({user_id, article_id, content})
  }
}
