const express = require('express')

const router = express.Router()

// 게시글 목록
router.get('/', (req, res) => {
  const articles = [
    {id: 3, title: '새 게시글', author: '김승하'},
    {id: 2, title: '새 게시글', author: '김승하'},
    {id: 1, title: '새 게시글', author: '김승하'},
  ]
  res.render('articles.pug', {
    articles
  })
})

// 게시글
router.get('/:id', (req, res) => {
  res.render('article.pug', {
    title: '제목',
    author: '김승하',
    created_at: new Date(),
    content: '하하하하 내용내용'
  })
})
module.exports = router
