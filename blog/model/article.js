const {article, label: labSql, banner: bannerSql } = global.$sql('article', 'label', 'banner')

// 拿文章列表
function getArticleList(req, res) {
  const pagesList = global.$overall.setPagination(req)
  const arrs = [
    'title', 'create_time', 'type', 'author', 'status', 'child_type', 'hot_comments', 'topping'
  ]

  global.$db.queryArgs(article.query(req, arrs), pagesList, (err, result) => {
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

// 拿推荐文章列表
// function get

module.exports = {
  getArticleList
}