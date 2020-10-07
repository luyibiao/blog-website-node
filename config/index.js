var mysql = require('mysql')
var dbConfig = require('./db_config')
const pool = mysql.createPool(dbConfig)
const variable = require('../untils/variable')
const code = require('../untils/code')


function responseDoReturn(err, res, c) {
  let result = variable.result
  if (err) {
    result.code = c || code.error
    result.msg = err
    delete result.data
  } else {
    result.code = code.success
    result.msg = 'success'
    result.data = res
  }
  return result
}

// 封装query之sql带不占位符func
function query(sql, callback) {
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