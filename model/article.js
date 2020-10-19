var db = require('../config/index.js');
const sql = require('../sql/article')

function check(params, res) {
  if (params.check) return true
  if (!params.title) {
    res.json(global.$resultFn.resultErr('标题不能为空'))
    return false
  }
  if (!params.author) {
    res.json(global.$resultFn.resultErr('作者不能为空'))
    return false
  }
  if (!params.contentdesc) {
    res.json(global.$resultFn.resultErr('文章简介不能为空'))
    return false
  }
  if (!params.content) {
    res.json(global.$resultFn.resultErr('文章内容不能为空'))
    return false
  }
  return true
}
// 增加文章
function add(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!check(params, res)) return
  
  global.$overall.freameuUploadImg(params.logoPath, params.logonName).then(r => {
    params.logo = r.url
    const arrs = [
      'title', 'author', 'label', 'content', 'contentdesc', 'type', 'draft', 'status', 'logo'
    ]
    db.query(sql.add(params, ...arrs), (err, result) => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
      } else {
        res.json(global.$resultFn.resultSuccess({}))
      }
    })
  }).catch(e => {
    res.json(global.$resultFn.resultErr(e))
  })
  return
}

// 查询文章
function query(req, res) {
  const pagesList = global.$overall.setPagination(req)
  const arrs = [
    'title', 'create_time', 'type', 'author', 'status', 'hot_comments', 'topping', 'draft'
  ]
  db.queryArgs(sql.query(req, arrs), pagesList, (err, result) => {
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
      return
    }
  })
  return
}

// 修改文章内容
function update(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!check(params, res) ) return
  const arrs = [
    'title', 'author', 'label', 'content', 'contentdesc', 'type', 'draft', 'status', 'logo', 'hot_comments', 'topping', 'id'
  ]
  db.queryArgs(sql.update(params, ...arrs), [params.id], (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

module.exports = {
  add,
  query,
  update
}