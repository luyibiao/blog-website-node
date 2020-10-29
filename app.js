const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const http = require('http')
const server = http.createServer(app)


const utils = require('./config/utils')
const port = 3000

// 挂载全局方法
global.$overall = require('./untils/overall')
// 挂载结果处理函数
global.$resultFn = require('./untils/code').results
// 拿到端口， 域名
global.hostUrl = `http://${utils.ServerHost}:${port}`
// 挂载数据库连接文件
global.$db = require('./config')
// 挂载sql语句函数
global.$sql = require('./sql')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 搭建静态服务
app.use('/static', express.static(__dirname + '/images'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
    
});

// 加载admin的router
const adminRoutes = require('./admin')
adminRoutes.init(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


server.listen(port, () => console.log(`You application is running here ${global.hostUrl}`))

module.exports = app;
