var db = require('../config/index.js');
const sql = require('../sql/label')

// 增加标签
function addLabel(req, res) {
  db.queryArgs(sql.addLabelSql, global.$getArgs(req, 'label'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
    return 
  })
}

// 查询标签
function queryLabel(req, res) {
  db.query(sql.queryAll, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess(result, false))
    }
    return
  })
}

module.exports = {
  addLabel,
  queryLabel
}