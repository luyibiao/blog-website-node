
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

// 增加二级栏目
global.$router.post('/addSecondsArticleType', function(req, res, next) {
  model.addSecondsArticleType(req, res, next)
})

// 转发网易云热评歌曲api 
// global.$router.post('/queryWYYmusic', function(req, res, next ) {
//   const request = require('request');
//   // 获取网易云音乐接口
//   const url = 'https://tenapi.cn/comment/'
//   request(url, function (err, response, body) {
//     if (!err && response.statusCode === 200) {
//       res.send(global.$resultFn.resultSuccess(JSON.parse(body), false));
//     } else {
//       res.json(global.$resultFn.resultErr(err))
//     }
//   })
// })


module.exports = global.$router