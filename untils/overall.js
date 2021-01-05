// 全局方法文件

const mysql = require('mysql')
const fs = require('fs')
const path = require('path')

// sql占位符获取
function getArgs(opt, ...args) {
  if (!opt || !opt.body) return []
  args = args || []
  return args.map(v => opt.body[v])
}

// 请求参数获取
function getReqParams(opt, ...keys) {
  if (!opt || !opt.body) return {}
  const params = opt.body
  let result = {}
  keys.map(v => {
    result[v] = params[v] || ''
  })
  return result
}

// 获取全部请求参数
function getReqParamsAll(opt) {
  if (!opt || !opt.body) return {}
  const params = opt.body
  let result = {}
  Object.keys(params).map(v => {
    result[v] = params[v]
  })
  return result
}


// 请求结果格式化
function formatRes(res, isformatObj = true) {
  if (!res) return {}
  if (Array.isArray(res)) {   
    if (isformatObj) {
      return {
        ...res[0] || {}
      }
    }
    return {
      list: res
    }
  } else {
    return JSON.stringify(res) === '{}' ? {} : {...res}
  }
}

// 拼接条件查询语句sql语句
function relyOn(key = [], req, empty = true) {
  const params = req.body
  let arr = []
  const filters = [
    'pageIndex', 'pageSize', 'create_time', 'update_time', 'startTime', 'endTime'
  ]
  // 过滤掉数组中的参数
  arr = key.filter(v => !filters.includes(v) )
  let str = ``
  
  if (empty) {
    arr = arr.filter(v => params[v] !== '' && params[v] !== undefined)
  }
  arr.map((v, index) => {
    if (params[v]) {
      str += `${index === 0 ? 'where ' : ''}${index > 0 ? 'and ' : ''}${v} = ${mysql.escape(params[v])}`
    }
  })
  return str
}



// 传入mysqp分页参数设置
function setPagination(req) {
  /**
   * @param pageIndex(当前页)
   * @param pageSize(一页多少条)
   */
  let [pageIndex = 0, pageSize = 10] = getArgs(req, 'pageIndex', 'pageSize')
  pageSize = parseInt(pageSize)
  pageIndex = parseInt(pageIndex) * pageSize
  return [pageIndex, pageSize]
}

// 派发分页参数设置
function getPagination(pageIndex, pageSize, total) {
  return {
    // 当前页数
    pageIndex: (pageIndex / pageSize) + 1  ,
    // 当前要查的条数
    pageSize,
    // 总条数
    total: getTotal(total),
    // 总页数
    countPage: Math.ceil(getTotal(total) / pageSize)
  }
}

 // 移入真实路径
function freameuUploadImg(paths, fName) {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(__dirname, '../images/real/' + fName) ;
    fs.copyFile(paths, uploadDir, function(err) {
      if (err) {
        reject(err)
        return
      }
      resolve(
        {url: global.hostUrl + '/static/real/' + fName}
      )
      return
  })
  });
}

function getTotal(t) {
  t = t || []
  if (!t.length) return 0
  return Object.values(t[0])[0]
}

// 随机十六进制颜色
function randomHexColorCode() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

// 域名
const HOST_NAME = 'http://www.97blognb.cn'

module.exports = {
  getArgs,
  getReqParams,
  getReqParamsAll,
  formatRes,
  setPagination,
  getPagination,
  relyOn,
  freameuUploadImg,
  randomHexColorCode,
  HOST_NAME
}