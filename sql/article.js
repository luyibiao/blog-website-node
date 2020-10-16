const mysql = require('mysql')

function addSQL(params, keys) {
  let s = `insert into article set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

function query(key, req) {
  const s1 = `select * from article ` + global.$overall.relyOn(key, req) + 'ORDER BY create_time desc limit ?, ?'
  const s2 = `;select count(*) from article ` + global.$overall.relyOn(key, req, false)
  return s1 + s2 
}

function update(params, keys) {
  let s = `update article set `
  keys.filter(v => (params[v] !== undefined && params[v] !== null)).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v} = ${mysql.escape(params[v])}`
  })
  s += ` where id = ?`
  return s
}

const sql = {
  // 新增文章
  add: function(params, ...keys) {
    return addSQL(params, keys)
  },
  // 查询文章
  query: function(req, ...keys) {
    return query(keys, req)
  },
  // 修改文章
  update: function(params, ...keys) {
    return update(params, keys)
  }
}

module.exports = sql