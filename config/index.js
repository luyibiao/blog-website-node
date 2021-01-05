var mysql = require('mysql')
var dbConfig = require('./db_config')
const pool = mysql.createPool(dbConfig)

// 封装query之sql带不占位符func
function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err)
      // callback(responseDoReturn(err, null))
    } else {
      connection.query(sql, function (err, rows) {
        connection.release();
        callback(err, rows)
        // callback(responseDoReturn(err, rows));                
    });
    }
  })
}

// 封装query之sql带占位符
function queryArgs(sql, args, callback) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        // callback(responseDoReturn(err,null))
        callback && callback(err)
        reject(err)
      } else {
        try {
          connection.query(sql, args,function (err, rows) {
            connection.release();
            callback && callback(err, rows)
            resolve(err, rows)
            // callback(responseDoReturn(err,rows));  
          });
        } catch (error) {
        }
        
      }
    })
  })
}

module.exports = {
  query,
  queryArgs
}