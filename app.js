var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var http = require('http')
var server = http.createServer(app)
var utils = require('./config/utils')

var loadRoute = require('./routes')

const token = require('./token/token')

const router = express.Router();
const codes = require('./untils/code')

const port = 3000

const overall = require('./untils/overall')

// 获取传过来的token值
function getCookie(req) {
  return cookies = req.cookies ? req.cookies.token || '' : ''
}

const rouArrs = [
  '/user/login', '/overall/queryArticleType'
]
// token检验
router.use((req, res, next) => {
  if (rouArrs.includes(req.originalUrl)) {
    next()
  } else {
    token.verifyToken(getCookie(req)).then(res => {
      // 解密成功，将token赋值给req
      req.decoded = res
      next()
    }).catch(e => {
      // token验证失败
      res.json(codes.results.resultTokenErr())
    })
  }
})

global.$router = router
global.$overall = overall
global.$resultFn = codes.results
global.hostUrl = `http://${utils.ServerHost}:${port}`

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/images'));

// 加载全部路由
loadRoute.init(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
    
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
