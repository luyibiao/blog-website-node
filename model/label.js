var db = require('../config/index.js');
const sql = require('../sql/label')

// 增加标签
function addLabel(req, res) {
  db.queryArgs(sql.addLabelSql, global.$overall.getArgs(req, 'label'), (err, result) => {
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
  const arrs = ['label']
  const pages = [
    // 普通参数
    ...global.$overall.getArgs(req, ...arrs).filter(v => v),
    // 分页参数
    ...global.$overall.setPagination(req)
  ]
  db.queryArgs(sql.queryAll(arrs, req), pages, (err, result) => {
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