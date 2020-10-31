const { banner } = global.$sql('banner')

// 拿轮播图列表
function queryBaner(req, res) {
  global.$db.query(banner.query(), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(e))
    } else {
      const arr = result.filter(v => (v.type == 2) || (v.type == 1 && v.article_id))
      res.json(global.$resultFn.resultSuccess(arr, false))
    }
  })
  return
}

module.exports = {
  queryBaner
}