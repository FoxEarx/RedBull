import { repairSearch, getordList } from '@/api'
export default {
  namespaced: true,
  state: {
    AllList: '',
    ordList: '',
  },
  mutations: {
    setRepair(state, payload) {
      state.AllList = payload
      // console.log('aa', payload)
    },
    setordList(state, payload) {
      state.ordList = payload
    },
  },
  actions: {
    async getAllList(context, id) {
      const res = await repairSearch(id)
      context.commit('setRepair', res.data)
    },
    async getordList(context, id) {
      const res = await getordList(id)
      context.commit('setordList', res.data)
    },
  },
}
