
const formidable = require('formidable');
const path = require('path')

global.$router.post('/upload', function(req, res, next) {
  let form = new formidable.IncomingForm()
    form.encoding = 'utf-8' // 编码
    form.keepExtensions = true // 保留扩展名
    form.uploadDir = path.join(__dirname, '../../images/')
    form.parse(req, (err, fields, files) => {
      if (err) return next(err)
      console.log(fields) //Object 表单数据
      console.log(files) //上传文件用files.<name>访问
      res.json({
        code: 1,
        message: 'upload success',
        data: files
      })
    })
})



module.exports = global.$router