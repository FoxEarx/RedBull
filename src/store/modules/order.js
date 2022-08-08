import { getOrderList } from '@/api/order'
export default {
  namespaced: true,
  state: {
    AllList: '',
  },
  mutations: {
    setOrder(state, payload) {
      state.AllList = payload
    },
  },
  actions: {
    async getOrder(context, id) {
      const res = await getOrderList(id)
      // console.log('order', res.data.currentPageRecords)
      context.commit('setOrder', res.data)
    },
  },
}
