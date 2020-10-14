
const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

global.$router.post('/upload', function(req, res, next) {
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8' // 编码
    form.keepExtensions = true // 保留扩展名
    // 临时目录
    form.uploadDir = path.join(__dirname, '../../images/temporary/')
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
        return
      }
      for(let key in files) {
        let file = files[key]
        let fName = (new Date()).getTime();
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
        var uploadDir = path.join(__dirname, '../../images/real/' + fName) ;
        fs.rename(file.path, uploadDir, function(err) {
          if (err) {
              res.write(err+"\n");
              res.end();
          }
          console.log(path.join(__dirname, '../../images/real/'))
          res.json(global.$resultFn.resultSuccess({fName: path.join(__dirname, '../../images/real/' ) + fName}))
          res.end();
        });
      }
      
    })
})



module.exports = global.$router