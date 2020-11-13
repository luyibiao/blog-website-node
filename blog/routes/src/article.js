const article = require('../../model/article')

global.$blogRouter.post('/getArticleList', (req, res, next) => {
  article.getArticleList(req, res, next)
})

// 查询文章详情
global.$blogRouter.post('/queryArticleDetail', (req, res, next) => {
  article.queryArticleDetail(req, res, next)
})

// 获取文章类型
global.$blogRouter.post('/queryArticleType', (req, res, next) => {
  article.queryArticleType(req, res, next)
})

module.exports = global.$blogRouter