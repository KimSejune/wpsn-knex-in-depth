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
      .where({article_id})
      .join('user', 'user.id', 'comment.user_id')
      .orderBy('comment.id', 'desc')
  },
  createComment({user_id, article_id, content}) {
    return knex('comment')
      .insert({user_id, article_id, content})
  }
}
