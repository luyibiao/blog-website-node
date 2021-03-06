
const formidable = require('formidable');
const path = require('path')

global.$router.post('/upload1', function(req, res, next) {
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8' // 编码
    form.keepExtensions = true // 保留扩展名
    // 临时目录
    form.uploadDir = path.join(__dirname, '../../../images/real/')
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
        return
      }
      const { file } = files
      let fName = file.name.split('.')[0] + (new Date()).getTime();
        switch (file.type){
          case "image/jpeg":
              fName = fName + ".jpg";
              break;
          case "image/png":
              fName = fName + ".png";
              break;
          default :
              fName =fName + ".png";
              break;
        }
      const s = file.path.replace(/\\/g,'/').split('/')
      res.json(global.$resultFn.resultSuccess({
        path: global.$overall.HOST_NAME + '/images/' + s[s.length - 1]
      }))
    })
    return
})



module.exports = global.$router