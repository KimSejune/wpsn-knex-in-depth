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

// 게시글 폼
router.get('/new', (req, res) => {
  res.render('article/new.pug')
})

// 게시글 생성
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

// 게시글 + 댓글 폼
router.get('/:id', (req, res) => {
  const id = req.params.id
  const articlePromise = query.getArticleById(id)
    .select('article.id', 'article.title', 'article.content', 'article.created_at', 'user.username')
  const commentPromise = query.getCommentsByArticleId(id)
    .select('user.username', 'comment.content')
  Promise.all([articlePromise, commentPromise])
    .then(([article, comments]) => {
      res.render('article/show.pug', {article, comments})
    })
})

// 댓글 생성
router.post('/:id/comment', (req, res) => {
  const comment = {
    user_id: req.user.id,
    article_id: req.params.id,
    content: req.body.content
  }
  query.createComment(comment)
    .then(() => {
      res.redirect(`/bbs/${req.params.id}`)
    })
})

module.exports = router
