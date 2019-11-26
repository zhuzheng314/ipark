import axios from 'axios'
import { baseUrl } from './../config/api'

let loadingInstance

const codeMessage = {
  1000: '成功',
  1001: '插入重复数据',
  1002: '外键冲突',
  1100: '尚未登录',
  1101: '没有权限',
  1102: '登录失败',
  1103: '用户被锁定',
  1110: '内部错误',
  1111: '数据库访问错误',
  1112: '服务访问错误',
  1113: 'API参数错误',
  1114: '资源未找到',
  1115: '接口已废弃'
}

const request = axios.create({
  baseURL: baseUrl
})

// 请求body
const body = {
  v: '1.0',
  app_id: 'C767115F-0ED0-0001-3451-1DC0D520ECB0',
  app_key: '9aaa8e3fea97081839f7515cb3426359'
}

sessionStorage.setItem('_token', 'C8B0A05E-F0E0-0001-7D19-1F401AA7FAC0')
// 获取token
const token = sessionStorage.getItem('_token')

request.interceptors.request.use(
  config => {
    config.data = {
      ...config.data,
      access_token: token,
      app_id: body.app_id,
      app_key: body.app_key,
      v: body.v
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  config => {
    const code = config.data.code
    const msg = codeMessage[code]
    if (code === 1100 || code === 1102 || code === 1103) {
      window.location.href = 'http://www.iot1234.com/siot3.0/#/passport/login'
    }
    config.data.msg = code + ':' + msg
    return config.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
