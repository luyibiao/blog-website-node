
const model = require('../../model/article.js');

// 增加文章
global.$router.post('/add', function(req, res, next) {
  model.add(req, res, next)
})

// 拿文章类型数据列表
global.$router.post('/query', function(req, res, next) {
  model.query(req, res, next)
})

// 修改
global.$router.post('/update', function(req, res, next) {
  model.update(req, res, next)
})

// 查询文章详情
global.$router.post('/detail', function(req, res, next) {
  model.quertyDetail(req, res, next)
})

// 删除文章
global.$router.post('/delete', function(req, res, next) {
  model.deleteDetail(req, res, next)
})

// 获取评论数
global.$router.post('/queryCommonetCount', function(req, res, next) {
  model.queryCommonetCount(req, res, next)
})


module.exports = global.$router