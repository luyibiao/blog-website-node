
let model = require('../../model/label.js');

global.$router.post('/addLabel', function(req, res, next) {
  model.addLabel(req, res, next)
})

global.$router.post('/update', function(req, res, next) {
  model.updateLabel(req, res, next)
})

global.$router.post('/list', function(req, res, next) {
  model.queryLabel(req, res, next)
})

global.$router.post('/delete', function(req, res, next) {
  model.deleteLabel(req, res, next)
})

// 设置热门标签
global.$router.post('/hot', function(req, res, next) {
  model.updateHotLabel(req, res, next)
})


module.exports = global.$router