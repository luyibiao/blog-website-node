var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var useraa = require('./routes/user')

var app = express();

var http = require('http')
var server = http.createServer(app)

var utils = require('./config/utils')

var loadRoute = require('./untils/index.js');


var port = 3000

app.all('*', function(req, res, next) {
 
  res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址
    
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    
  next();
    
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', useraa)



// loadRoute.init(app);

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

server.listen(port, () => console.log(`You application is running here http://${utils.ServerHost}:${port}`))

module.exports = app;
