const {article, label: labSql, banner: bannerSql } = global.$sql('article', 'label', 'banner')

// 拿文章列表
function getArticleList(req, res) {
  var nodemailer = require('nodemailer');
  // 创建一个SMTP客户端配置
  var config = {
    host: 'smtp.qq.com',//网易163邮箱 smtp.163.com
    port: 465,//网易邮箱端口 25
    auth: {
        user: '1739717921@qq.com', //邮箱账号
        pass: 'hpkzbnopseccceij'  //邮箱的授权码
    }
  };

  // 创建一个SMTP客户端对象
  var transporter = nodemailer.createTransport(config);

  // 发送邮件
function send(mail){
  transporter.sendMail(mail, function(error, info){
      if(error) {
          return console.log(error);
      }
      console.log('mail sent:', info.response);
  });
};

// 创建一个邮件对象
var mail = {
  // 发件人
  from: 'lu<1739717921@qq.com>',
  // 主题
  subject: '狗蒋',
  // 收件人
  to: '1739717921@qq.com',
  // 邮件内容，HTML格式
  // text: '点击激活：xxx' //可以是链接，也可以是验证码
};
send(mail);
  const pagesList = global.$overall.setPagination(req)
  const arrs = [
    'title', 'create_time', 'type', 'author', 'status', 'child_type', 'hot_comments', 'topping'
  ]

  global.$db.queryArgs(article.query(req, arrs), pagesList, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      const pageParams = global.$overall.getPagination(pagesList[0], pagesList[1], result[1])
      const js = global.$resultFn.resultSuccess(result[0], false)
      js.data = {
        ...js.data,
        ...pageParams
      }
      res.json(js)
      return
    }
  })
  return
}

// 拿推荐文章列表
// function get

module.exports = {
  getArticleList
}