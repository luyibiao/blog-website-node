const mysql = require('mysql')

// 增加
function add(params, keys) {
  let s = 'insert into banner set '
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v]) || ''}`
  })
  return s
}

// 查询轮播图列表
function query() {
  let s = `select b.*, a.id as article_id, a.title, a.label from banner as b left join article as a on b.article_id = a.id and a.status = 'LINE'`
  return s
}

// 修改
function update(params, keys) {
  let s = `update banner set `
  keys.filter(v => (params[v] !== undefined && params[v] !== null)).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v} = ${mysql.escape(params[v])}`
  })
  s += ` where id = ?`
  return s
}

const sql = {
  add: function(params, keys) {
    return add(params, keys)
  },
  query: function(params) {
    return query(params)
  },
  queryDetail: function() {
    return `select * from banner where id = ?`
  },
  update: function(params, keys) {
    return update(params, keys)
  },
  delete: function() {
    return `delete from banner where id = ?`
  }
}

module.exports = sql