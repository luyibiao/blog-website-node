var mysql = require('mysql')
var dbConfig = require('./db_config')
const pool = mysql.createPool(dbConfig)
const variable = require('../untils/variable')

// function formatRes(res) {
//   if (!res) return {}
//   if (res && Array.isArray(res)) {
//     return {
//       list: res
//     }
//   } else {
//     return {
//       ...res
//     }
//   }
// }

function responseDoReturn(err, res) {
  let result = variable.result
  if (err) {
    result.code = '00'
    result.msg = 'err' + err
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