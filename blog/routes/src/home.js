const home = require('../../model/home')

// 查询轮播图
global.$blogRouter.post('/queryBaner', (req, res, next) => {
  home.queryBaner(req, res, next)
})

//  查询热门标签
global.$blogRouter.post('/queryHotLabel', (req, res, next) => {
  home.queryHotLabel(req, res, next)
})

// 查询关于我
global.$blogRouter.post('/queryMineInfo', (req, res, next) => {
  home.queryMineInfo(req, res, next)
})

global.$blogRouter.get('/aa', (req, res, next) => {
  res.json('电饭锅被警方发')
})

module.exports = global.$blogRouter