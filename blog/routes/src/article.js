const article = require('../../model/article')

global.$blogRouter.post('/getArticleList', (req, res, next) => {
  article.getArticleList(req, res)
})

// 查询文章详情
global.$blogRouter.post('/queryArticleDetail', (req, res, next) => {
  article.queryArticleDetail(req, res, next)
})

// 获取文章类型
global.$blogRouter.post('/queryArticleType', (req, res, next) => {
  article.queryArticleType(req, res, next)
})

// 随便看看
global.$blogRouter.post('/queryRandowArticle', (req, res, next) => {
  article.queryRandowArticle(req, res, next)
})

// 查询二级栏目类型
global.$blogRouter.post('/queryArticleChildType', (req, res, next) => {
  article.queryArticleChildType(req, res, next)
})

// 设置观看数
global.$blogRouter.post('/setWatchNum', (req, res, next) => {
  article.setWatchNum(req, res, next)
})

// 查询上一条
global.$blogRouter.post('/queryUpArticle', (req, res, next) => {
  article.queryUpArticle(req, res, next)
})
// 查询下一条
global.$blogRouter.post('/queryNextArticle', (req, res, next) => {
  article.queryNextArticle(req, res, next)
})
// 根据父级栏目查询分类栏目
global.$blogRouter.post('/queryTypeOrSecondsType', (req, res, next) => {
  article.queryTypeOrSecondsType(req, res, next)
})
// 根据父级栏目查询分类栏目
global.$blogRouter.post('/querySecondTypeCount', (req, res, next) => {
  article.querySecondTypeCount(req, res, next)
})
module.exports = global.$blogRouter