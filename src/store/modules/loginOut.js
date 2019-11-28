const loginOut = {
  state: {
  },
  getters: {
  },
  mutations: {
    clearSession () {
      sessionStorage.clear()
      window.location.href = 'http://www.iot1234.com/siot3.0/#/passport/login'
    }
  },
  actions: {
  }
}

export default loginOut
