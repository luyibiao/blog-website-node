
let model = require('../../model/article.js');

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


module.exports = global.$router