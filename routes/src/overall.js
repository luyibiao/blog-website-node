
let model = require('../../model/overall.js');

// 拿文章类型数据列表
global.$router.post('/queryArticleType', function(req, res, next) {
  model.queryArticleType(req, res, next)
})

// 转发网易云热评歌曲api 
global.$router.post('/queryWYYmusic', function(req, res, next ) {
  var request = require('request');
  let list = []
  var url = 'https://tenapi.cn/comment/'
  for(let i = 0; i < 10; i++) {
    request(url, function (err, response, body) {
      var data = JSON.parse(body);
      list.push(data)
      if (i === 9) {
        if (!err && response.statusCode === 200) {
          res.send(global.$resultFn.resultSuccess(list, false));
        } else {
          res.json(global.$resultFn.resultErr(err))
        }
      }
    })
  }
})


module.exports = global.$router