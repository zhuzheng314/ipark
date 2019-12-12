import { Message } from 'element-ui'

const loginOut = {
  state: {
  },
  getters: {
  },
  mutations: {
    loginOut () {
      Message.error('登录失效')
      sessionStorage.clear()
      localStorage.clear()
      window.location.href = 'http://www.iot1234.com/siot3.0/#/passport/login'
    }
  },
  actions: {
  }
}

export default loginOut
