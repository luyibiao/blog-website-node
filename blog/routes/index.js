var fs = require('fs')
var path = require('path')

// 动态路由
var loadRoute = {
  path: path.join(__dirname, './src/'),
  app: null,
  // 遍历目录
  listDir: function(dir) {
    var fileList = fs.readdirSync(dir, 'utf-8')
    for(var i = 0; i < fileList.length; i++) {
      var stat = fs.lstatSync(dir + fileList[i])
      // 是目录， 需要继续
      if (stat.isDirectory()) {
        this.listDir(dir + fileList[i] + '/')
      } else {
        this.loadRoute(dir + fileList[i])
      }
    }
  },

  // 加载路由
  loadRoute: function(routeFile) {
    var pathArr = routeFile.split('\\');
    var routeName = pathArr[pathArr.length-1].replace(/(.*)\.\w+$/,'$1');
    
    var route = require(routeFile.substring(0,routeFile.lastIndexOf('.')));
    this.app.use("/blog/" + routeName, route);
  },

  // 初始化入口
  init: function(app, path) {
    if (!app) {
      console.error("系统主参数App未设置");
      return false;
    } else {
      this.app = app
      this.path = path ? path: this.path
      this.listDir(this.path)
    }
  }
}

module.exports = loadRoute