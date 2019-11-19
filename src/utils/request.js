import Vue from 'vue'
import axios from '../plugins/axios'
import router from '../router'

const codeMessage = {
  1000: '成功'
}

// 网络校验
const checkStatus = response => {
  if (response.status === 1000) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  Vue.prototype.$message.error(`${response.status}: ${errortext}`)
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}
// 请求返回内容的返回码校验
const checkCodeNum = ({ data }) => {
  const {
    codeNum, codeDesc, value, success, errorMsg
  } = data

  // 未登录
  if (codeNum === 1100) {
    Vue.prototype.$message.error(errorMsg || codeDesc || '系统错误')
    router.push('/login')
    return
  }

  return data
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  const defaultOptions = {
    credentials: 'include'
    // headers: {
    //   TOKEN: localStorage.getItem('token'),
    // },
  }
  const newOptions = { ...defaultOptions, ...options }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'PATCH'
  ) {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      }
      newOptions.data = JSON.stringify(newOptions.data)
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      }
    }
  }

  // 文件自动下载
  // if (newOptions.headers['Content-Type'] === 'application/msexcel') {
  //   if (requestURL.includes('token')) {
  //     window.open(`${requestURL}`, '_self');
  //   } else {
  //     window.open(`${requestURL}?token=${localStorage.getItem('token')}`, '_self');
  //   }
  //   return {};
  // }
  return axios(url, {
    ...newOptions,
    withCredentials: true
  })
    .then(checkStatus)
    .then(checkCodeNum)
    .catch(e => {
      console.error(e)
    })
}
