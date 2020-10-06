var mysql = require('mysql')
var dbConfig = require('./db_config')
const pool = mysql.createPool(dbConfig)
const variable = require('../untils/variable')
const token = require('../token/token')

const apis = [
  '/user/login'
]

function responseDoReturn(err, res, code) {
  let result = variable.result
  if (err) {
    result.code = code || '00'
    result.msg = err
    result.aa = token.createToken()
    delete result.data
  } else {
    result.code = '1'
    result.msg = 'success'
    result.data = res
  }
  return result
}

// 封装query之sql带不占位符func
function query(sql, callback) {
  if (!token.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxMSwiaWF0IjoxNjAxOTgwMDc2fQ.voF6TIU4V269VPyZ5THQMsXHkUbf4MzjihrVp4ekC1o')) {
    callback(responseDoReturn('token验证失败', null, '-1'))
    return
  }
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(responseDoReturn(err, null))
    } else {
      connection.query(sql, function (err, rows) {
        connection.release();
        callback(responseDoReturn(err, rows));                
    });
    }
  })
}

// 封装query之sql带占位符
function queryArgs(sql, args, callback) {
  if (!token.verifyToken()) {
    callback(responseDoReturn('token验证失败', null, '-1'))
    return
  }
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(responseDoReturn(err,null))
    } else {
      connection.query(sql, args,function (err, rows) {
        connection.release();
        callback(responseDoReturn(err,rows));  
      });
    }
  })
}

module.exports = {
  query,
  queryArgs
}