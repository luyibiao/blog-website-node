const mysql = require('mysql')

function add(params, keys) {
  let s = 'insert into banner set '
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v]) || ''}`
  })
  return s
}

function query() {
  // 本地跳转
  let s = `select b.*, a.id as aid, a.title, a.label from banner as b inner join article as a on b.article_id = a.id and a.status = 'LINE'`
}

const sql = {
  add: function(params, keys) {
    return add(params, keys)
  },
  query: function(params) {
    return query(params)
  }
}

module.exports = sql