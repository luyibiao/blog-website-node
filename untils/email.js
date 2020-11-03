const nodemailer = require('nodemailer');

// 授权邮箱
const authEmail = '1739717921@qq.com'
// 授权码
const authCode = 'hpkzbnopseccceij'

// 创建一个SMTP客户端配置
const config = {
  service: "QQ", // 使用了内置传输发送邮件 支持列表：https://nodemailer.com/smtp/well-known/
  auth: {
      user: authEmail, //邮箱账号
      pass: authCode  //邮箱的授权码
  },
  pool: true
};

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

// 发送邮件
function send(mail){
  if (!mail || typeof mail !== 'object') return 
  mail = {
     // 发件人
    from: '九七个人博客<1739717921@qq.com>',
    ...mail
  }
  transporter.sendMail(mail, function(error, info){
      if(error) {
          return console.log(error);
      }
  });
};




module.exports = send