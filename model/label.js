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
  const pagesList = global.$overall.setPagination(req)
  const pages = [
    // 普通参数
    // ...global.$overall.getArgs(req, ...arrs).filter(v => v),
    // 分页参数
    ...pagesList
    // 普通参数
    // ...global.$overall.getArgs(req, ...arrs).filter(v => v),
  ]
  db.queryArgs(sql.queryAll(arrs, req), pages, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      const pageParams = global.$overall.getPagination(pagesList[0], pagesList[1], result[1])
      const js = global.$resultFn.resultSuccess(result[0], false)
      js.data = {
        ...js.data,
        ...pageParams
      }
      res.json(js)
    }
    return
  })
}

module.exports = {
  addLabel,
  queryLabel
}