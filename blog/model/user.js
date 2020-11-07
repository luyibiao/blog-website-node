
const { regsEmail }  = require('../../untils/regs')
const { blogRegister } = global.$sql('blogRegister')
const { createCode, formatDatetime } = require('../../untils/helper')
const email = require('../../email')

function queryEffCode(params) {
  return new Promise((resolve, reject) => {
    global.$db.queryArgs(blogRegister.queryVerCode, [params.userEmail], (err, result) => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
      } else {
        resolve(result || [])
      }
    })
  })
}

// 批量修改
function batchUpdateCount(ids) {
  global.$db.queryArgs(blogRegister.batchUpdateCount, ...ids, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      // resolve(true)
    }
  })
}

// 查询用户名是否已注册
function queryUser(params, res) {
  return new Promise((resolve, reject) => {
    global.$db.queryArgs(blogRegister.queryUser, [params.userName], (err, result) => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
      } else {
        if (result && result.length && params.userEmail !== result[0].userEmail) {
          res.json(global.$resultFn.resultErr('昵称已经存在'))
          reject()
        } else {
          resolve(result)
        }
      }
    })
  })
}

// 查询该用户下有效验证码
function queryUserEffCode(params, res) {
  return new Promise((resolve, reject) => {
    global.$db.queryArgs(blogRegister.queryEffCode, [params.userEmail, params.code], (err, result) => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
      } else {
        if (!result || !result.length) {
          res.json(global.$resultFn.resultErr('验证码无效'))
          reject()
        } else {
          // 如果存在， 判断时间是否失效
          const instance = result[0]
          const effTime = formatDatetime(new Date(instance.create_time).getTime() + 5 * 60 * 1000, 'yyyy/MM/dd hh:mm:ss')
          const nowTime = formatDatetime(new Date(), 'yyyy/MM/dd hh:mm:ss')
          if (nowTime > effTime) {
            res.json(global.$resultFn.resultErr('验证码已过期'))
            reject()
          } else {
            resolve(result[0])
          }
        }
      }
    })
  })
}

// 发送验证码
async function sendCode(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.userName) {
    res.json(global.$resultFn.resultErr('昵称不能为空'))
    return
  }
  if (!params.userEmail) {
    res.json(global.$resultFn.resultErr('邮箱不能为空'))
    return
  }
  if (!regsEmail.test(params.userEmail)) {
    res.json(global.$resultFn.resultErr('邮箱格式错误'))
    return
  }
  
  // 先查出该邮箱下有无可用的验证码，如果有，则将使用次数置为0
  const verCodes = await queryEffCode(params, res)
  
  if (verCodes && verCodes.length) {
    const ids = verCodes.map(v => v.id)
    batchUpdateCount(ids, res)
  }
  // 生成验证码验证码
  params.code = createCode()

  // 写入数据
  const arr = [
    'code', 'userEmail', 'userName'
  ]
  global.$db.query(blogRegister.insertCode(params, arr), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      email.sendEmail(email.sendCodeEmail(params.code), params.userEmail)
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 验证登录
async function checkBlogLogin(req, res, next) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.userName) {
    res.json(global.$resultFn.resultErr('昵称不能为空'))
    return
  }
  if (!params.userEmail) {
    res.json(global.$resultFn.resultErr('邮箱不能为空'))
    return
  }
  if (!regsEmail.test(params.userEmail)) {
    res.json(global.$resultFn.resultErr('邮箱格式错误'))
    return
  }
  if (!params.code) {
    res.json(global.$resultFn.resultErr('验证码不能为空'))
    return
  }

  // 查询用户名是否已注册
  const isExitUser = await queryUser(params, res)
  // 验证码验证
  await queryUserEffCode(params, res)

  global.$db.queryArgs(blogRegister.updateCount, [params.userEmail])

  // 如果之前已经登录过
  if (isExitUser && isExitUser.length) {
    res.json(global.$resultFn.resultSuccess({
      id: isExitUser[0].id,
      userName: isExitUser[0].userName,
      userEmail: isExitUser[0].userEmail
    }))
  } else {
    // 写入数据
    const insertArrs = [
      'userName', 'userEmail'
    ]
    global.$db.query(blogRegister.addBlogUser(params, insertArrs), (err, result) => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
      } else {
        global.$db.queryArgs(blogRegister.queryUser, [params.userName], (e, r) => {
          if (e) {
            res.json(global.$resultFn.resultErr(e))
          } else {
            res.json(global.$resultFn.resultSuccess({
              id: r[0].id,
              userName: r[0].userName,
              userEmail: r[0].userEmail
            }))
          }
        })
      }
    })
  }
  return
}

module.exports = {
  sendCode,
  checkBlogLogin
}