
let model = require('../../model/overall.js');

// 拿文章类型数据列表
global.$router.post('/queryArticleType', function(req, res, next) {
  model.queryArticleType(req, res, next)
})


module.exports = global.$router