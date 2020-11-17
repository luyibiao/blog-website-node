
const { label: sql } = global.$sql('label')

// 增加标签
function addLabel(req, res) {
  const params = global.$overall.getReqParams(req, 'label').label
  if (!params) {
    res.json(global.$resultFn.resultErr('标签名称不能为空'))
    return
  }
  global.$db.queryArgs(sql.addLabelSql, global.$overall.getArgs(req, 'label'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
    return 
  })
}

// 修改标签
function updateLabel(req, res) {
  const params = global.$overall.getReqParams(req, 'label', 'id')
  if (!params.id) {
    res.json(global.$resultFn.resultErr('id为空'))
    return
  }
  if (!params.label) {
    res.json(global.$resultFn.resultErr('标签名称不能为空'))
    return
  }
  global.$db.queryArgs(sql.update, global.$overall.getArgs(req, 'label', 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

// 删除标签
function deleteLabel(req, res) {
  const params = global.$overall.getReqParams(req, 'id')
  if (!params.id) {
    res.json(global.$resultFn.resultErr('id为空'))
    return
  }
  global.$db.queryArgs(sql.delete, global.$overall.getArgs(req, 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 查询标签
function queryLabel(req, res) {
  const arrs = ['label', 'hot']
  const pagesList = global.$overall.setPagination(req)
  global.$db.queryArgs(sql.queryAll(arrs, req), pagesList, (err, result) => {
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
  return
}

// 设置热门标签
function updateHotLabel(req, res) {
  // updateHot
  const params = global.$overall.getReqParamsAll(req)
  global.$db.queryArgs(sql.updateHot, [params.hot, params.id], (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

module.exports = {
  addLabel,
  updateLabel,
  queryLabel,
  deleteLabel,
  updateHotLabel
}