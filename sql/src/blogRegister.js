
const mysql = require('mysql')
function insertCode(params, keys) {
  let s = `insert into verCode set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

function addBlogUser(params, keys) {
  let s = `insert into bloguser set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

function updateUser(params, keys) {
  let s = `update bloguser set `
  keys.filter(v => (params[v] !== undefined && params[v] !== null)).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v} = ${mysql.escape(params[v])}`
  })
  s += ` where id = ?`
  return s
}

const sql = {
  // 查询有效验证码
  queryVerCode: 'select * from verCode where userEmail = ? and count > 0',
  // 批量修改count次数值
  batchUpdateCount: 'update vercode set count = 0 where id in(?)',
  // 单独修改count 的值
  updateCount: 'update vercode set count = 0 where userEmail = ? and count = 1',
  // 插入验证码数据
  insertCode: function(params, keys) {
    return insertCode(params, keys)
  },
  // 查询用户名是否已注册
  queryUser: 'select * from bloguser where userName = ? or userEmail = ?',
  // 查询有效验证码数据
  queryEffCode: 'select * from verCode where userEmail = ? and code = ? and count > 0',
  // 写入用户数据
  addBlogUser: function(params, keys) {
    return addBlogUser(params, keys)
  },
  // 更新用户表数据
  updateUser: function(params, keys) {
    return updateUser(params, keys)
  }
}

module.exports = sql