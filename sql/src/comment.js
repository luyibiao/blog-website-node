
const mysql = require('mysql')

const basis = `SELECT c.*, b.bg_color, b.userEmail, b.userName from comment as c INNER JOIN bloguser as b on c.user_id = b.id `

function addComment(params, keys) {
  let s = 'insert into comment set '
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v]) || ''}`
  })
  return s
}

function query(key, req) {
  const s1 = `${basis}  ` + global.$overall.relyOn(key, req) + ' ORDER BY create_time desc limit ?, ?'
  const s2 = `;select count(*) from comment ` + global.$overall.relyOn(key, req)
  return s1 + s2 
}

const sql = {
  // 增加评论
  addComment(params, keys) {
    return addComment(params, keys)
  },
  // 获取评论
  query(key, req) {
    return query(key, req)
  },
  // 查看评论数
  queryCommonets() {
    return 'select count(*) as count from comment where article_id = ?'
  }
}

module.exports = sql