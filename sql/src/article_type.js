const mysql = require('mysql')

function addArticleType(params, keys) {
  let s = `insert into articletype set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

function addSecondsSQL(params, keys) {
  let s = `insert into articletype_item set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

function updateArticleType(params, keys, str = 'articletype') {
  let s = `update ${str} set `
  keys.filter(v => (params[v] !== undefined && params[v] !== null)).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v} = ${mysql.escape(params[v])}`
  })
  s += ` where id = ?`
  return s
}

function addSideColum(params, keys) {
  let s = `insert into side_column set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

function updateSideColumn(params, keys) {
  let s = `update side_column set `
  keys.filter(v => (params[v] !== undefined && params[v] !== null)).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v} = ${mysql.escape(params[v])}`
  })
  s += ` where id = ?`
  return s
}

const sql = {
  // 查询一级栏目
  queryArticleType: `SELECT
  a.*,
  (
   SELECT
    count(1)
   FROM
    article
   WHERE
    article.type = a. CODE
  ) 'article_total'
 FROM
  articletype a`,
  // 增加一级栏目
  addArticleType: function(params, keys) {
    return addArticleType(params, keys)
  },
  //  查询是否已存在栏目
  quertExitArticle: 'select * from articletype where name = ? or code = ?',
  // 删除一级栏目
  deleteArticleType: 'delete from articletype where id = ?',
  // 修改一级栏目内容
  updateArticleType: function(params, keys) {
    return updateArticleType(params, keys)
  },

  // 查询二级栏目总数
  querySecondsArticleType: `SELECT
  a.*,
	pa.name as articletype_name,
  (
   SELECT
    count(1)
   FROM
    article
   WHERE
    article.child_type = a.CODE
  ) 'article_total'
FROM
  articletype_item a 
left JOIN
  articletype as pa
ON
a.articletype_id = pa.id
`,
  // 增加二级栏目
  addSecondsArticleType: function(params, keys) {
    return addSecondsSQL(params, keys)
  },
  // 删除二级栏目
  deleteSecondsArticle: function() {
     return `delete from articletype_item where id = ? or articletype_id = ?`
  },
  // 修改二级栏目
  updateSecondsArticle: function(params, keys) {
    return updateArticleType(params, keys, 'articletype_item')
  },
  // 查询一级栏目下某二级栏目下是否被注册过
  querySecondsExit: 'SELECT * from articletype_item as a where a.articletype_id = ? and (a.code = ? or a.name = ?)',
  // 根据一级栏目查询二级栏目
  queryTypeOrSecondsType: 'select * from articletype_item as a where a.articletype_code = ?',
  // 增加侧边栏目
  addSideColum: function(params, keys) {
    return addSideColum(params, keys)
  },
  // 获取侧边栏
  querySideColumn: 'select * from side_column',
  // 删除侧边栏
  deleteSideCoulmn: 'delete from side_column where id = ?',
  // 修改侧边栏
  updateSideColumn: function(params, keys) {
    return updateSideColumn(params, keys)
  }
}

module.exports = sql