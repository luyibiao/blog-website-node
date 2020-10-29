const mysql = require('mysql')

function addSecondsSQL(params, keys) {
  let s = `insert into articletype_item set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

const sql = {
  // 查询栏目
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
  articletype a
 GROUP BY
  a. CODE,a.id,a.name,a.create_time,a.update_time`,
  // 增加栏目
  addArticleType: 'insert into articletype set name = ?, code = ?',
  //  查询是否已存在栏目
  quertExitArticle: 'select * from articletype where name = ? or code = ?',
  // 删除一级栏目
  deleteArticleType: 'delete from articletype where id = ?',

  // 查询二级栏目总数
  // querySecondsArticleType: ''
  // 增加二级栏目
  addSecondsArticleType: function(params, keys) {
    return addSecondsSQL(params, keys)
  }
}

module.exports = sql