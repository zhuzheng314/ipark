const loginOut = {
  state: {
  },
  getters: {
  },
  mutations: {
    loginOut () {
      sessionStorage.clear()
      localStorage.clear()
      window.location.href = 'http://www.iot1234.com/siot3.0/#/passport/login'
    }
  },
  actions: {
  }
}

export default loginOut
