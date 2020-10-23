const db = require('../config/index.js');
const sql = require('../sql/banner')

// 增加轮播图
async function addBanner(req, res, next) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.logoPath) {
    res.json(global.$resultFn.resultErr('图片不能为空'))
    return
  }
  if (params.type == 1 && !params.article_id) {
    res.json(global.$resultFn.resultErr('跳转文章不能为空'))
    return
  }
  if(params.type == 2 && !params.url) {
    res.json(global.$resultFn.resultErr('外联不能为空'))
    return
  }
  if (params.logoPath) {
    const u = await global.$overall.freameuUploadImg(params.logoPath, params.logonName).catch(e => {
      res.json(global.$resultFn.resultErr(e))
    })
    params.imgUrl = u.url
  }
  const arr = [
    'article_id', 'type', 'imgUrl', 'url'
  ]
  db.query(sql.add(params, arr), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(e))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

module.exports = {
  addBanner
}