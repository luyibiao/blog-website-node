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


// 转发网易云热评歌曲api 
global.$blogRouter.post('/queryWYYmusic', function(req, res, next ) {
  const request = require('request');
  // 获取网易云音乐接口
  const url = 'https://tenapi.cn/comment/'
  request(url, function (err, response, body) {
    try {
      if (!err && response.statusCode === 200) {
        res.send(global.$resultFn.resultSuccess(JSON.parse(body).data, false));
      } else {
        res.json(global.$resultFn.resultErr(err))
      }
    } catch (error) {
      res.json(global.$resultFn.resultErr(err))
    }
  })
})

module.exports = global.$blogRouter