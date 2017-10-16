const express = require('express')
const query = require('./query')

const router = express.Router()

// 게시글 목록
router.get('/', (req, res) => {
  query.getArticles()
    .select('article.id', 'article.title', 'article.content', 'article.created_at', 'user.username')
    .then(articles => {
      res.render('article/list.pug', {
        articles
      })
    })
})

router.get('/new', (req, res) => {
  res.render('article/new.pug')
})

router.post('/new', (req, res) => {
  const article = {
    user_id: req.user.id,
    title: req.body.title,
    content: req.body.content
  }
  query.createArticle(article)
    .then(() => {
      res.redirect('/bbs')
    })
})

// 게시글
router.get('/:id', (req, res) => {
  query.getArticleById(req.params.id)
    .select('article.id', 'article.title', 'article.content', 'article.created_at', 'user.username')
    .then(data => {
      res.render('article/show.pug', data)
    })
})

module.exports = router
