const mysql = require('mysql')

function addSQL(req, ...keys) {
  const s = `insert into article set `
  const params = global.$overall.getReqParams(req, ...keys)
  Object.keys(params).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

const sql = {
  // 新增文章
  add: function(req, ...keys) {
    return addSQL(req, ...keys)
  }
}

module.exports = sql