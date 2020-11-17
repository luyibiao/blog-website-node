const { banner, label, mine } = global.$sql('banner', 'label', 'mine')

// 拿轮播图列表
function queryBaner(req, res) {
  global.$db.query(banner.query(), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      const arr = result.filter(v => (v.type == 2) || (v.type == 1 && v.article_id))
      res.json(global.$resultFn.resultSuccess(arr, false))
    }
  })
  return
}

// 获取热门标签
function queryHotLabel(req, res) {
  // const arrs = ['label', 'hot']
  const arrs = []
  const pagesList = global.$overall.setPagination(req)
  global.$db.queryArgs(label.queryAll(arrs, req), pagesList, (err, result) => {
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

// 获取我的信息
function queryMineInfo(req, res) {
  global.$db.query(mine.query, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess(result))
    }
  })
  return
}

module.exports = {
  queryBaner,
  queryHotLabel,
  queryMineInfo
}