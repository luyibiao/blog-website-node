
let model = require('../../model/article_type.js');

// 拿文章类型数据列表
global.$router.post('/queryArticleType', function(req, res, next) {
  model.queryArticleType(req, res, next)
})

// 增加文章栏目
global.$router.post('/addArticleType', function(req, res, next) {
  model.addArticleType(req, res, next)
})

// 删除栏目
global.$router.post('/deleteArticleType', function(req, res, next) {
  model.deleteArticleType(req, res, next)
})

// 修改一级栏目
global.$router.post('/updateArticleType', function(req, res, next) {
  model.updateArticleType(req, res, next)
})

// 增加二级栏目
global.$router.post('/addSecondsArticleType', function(req, res, next) {
  model.addSecondsArticleType(req, res, next)
})

// 删除二级栏目
global.$router.post('/deleteSecondsArticle', function(req, res, next) {
  model.deleteSecondsArticle(req, res, next)
})

// 查询二级栏目
global.$router.post('/querySecondsArticleType', function(req, res, next) {
  model.querySecondsArticleType(req, res, next)
})
// 修改二级栏目
global.$router.post('/updateSecondsArticle', function(req, res, next) {
  model.updateSecondsArticle(req, res, next)
})

// 根据一级栏目查询二级栏目
global.$router.post('/queryTypeOrSecondsType', function(req, res, next) {
  model.queryTypeOrSecondsType(req, res, next)
})

// 增加侧边栏
global.$router.post('/addSideColumn', function(req, res, next) {
  model.addSideColumn(req, res, next)
})

// 获取侧边栏
global.$router.post('/querySideColumn', function(req, res, next) {
  model.querySideColumn(req, res, next)
})

// 删除侧边栏
global.$router.post('/deletesSideCoulmn', function(req, res, next) {
  model.deleteSideCoulmn(req, res, next)
})
// 修改侧边栏
global.$router.post('/updateSideColumn', function(req, res, next) {
  model.updateSideColumn(req, res, next)
})


module.exports = global.$router