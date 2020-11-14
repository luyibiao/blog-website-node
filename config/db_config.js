
// 数据库配置
const mysql = {
  // 数据库地址
  host: '127.0.0.1',
  // 用户名
  user: 'root',
  // 用户密码
  password: 'rootmysql.',
  // 数据库名字
  database: 'blog-sql',
  // 强制日期类型（TIMESTAMP，DATETIME，DATE）以字符串形式返回
  dateStrings: true,
  multipleStatements: true
}

module.exports = mysql