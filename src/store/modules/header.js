import request from '@/ajax/request'
import urls from '@/api/orderCenter'

const header = {
  state: {
    refundStatusMap: ['全部', '退款中', '退款成功', '退款失败', '待审核', '已拒绝', '已撤销']
  },
  getters: {
  },
  mutations: {},
  actions: {
    order_orderMerchantList ({ commit }, data) {
      return request({
        url: urls.orderMerchantList,
        data
      })
    }
  }
}

export default header
