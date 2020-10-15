var db = require('../config/index.js');
const sql = require('../sql/overall')

// 查询文章类型
function queryArticleType(req, res) {
  db.query(sql.queryArticleType, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result, false))
    return
  })
}

module.exports = {
  queryArticleType
}