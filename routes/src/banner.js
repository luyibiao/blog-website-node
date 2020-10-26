const model = require('../../model/banner')

// 增加轮播图
global.$router.post('/addbanner', function(req, res, next) {
  model.addBanner(req, res, next)
})

// 查询轮播图列表
global.$router.post('/querybanner', function(req, res, next) {
  model.queryBanner(req, res, next)
})

// 修改轮播图
global.$router.post('/updatebanner', function(req, res, next) {
  model.upadteBanner(req, res, next)
})

// 查询轮播图详情
global.$router.post('/queryBannerDetail', function(req, res, next) {
  model.queryBannerDetail(req, res, next)
})

// 删除轮播图
global.$router.post('/deletebanner', function(req, res, next) {
  model.deleteBanner(req, res, next)
})

module.exports = global.$router