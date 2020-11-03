const article = require('../../model/article')

global.$blogRouter.post('/getArticleList', (req, res, next) => {
  article.getArticleList(req, res, next)
})

// 查询文章详情
global.$blogRouter.post('/queryArticleDetail', (req, res, next) => {
  article.getArticleList(req, res, next)
})

module.exports = global.$blogRouter