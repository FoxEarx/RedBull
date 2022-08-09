import { getStrategyList } from '@/api/strategy'
export default {
  namespaced: true,
  state: {
    AllList: '',
  },
  mutations: {
    setStrategy(state, payload) {
      state.AllList = payload
      //   console.log(payload)
    },
  },
  actions: {
    async getStrategy(context, id) {
      const res = await getStrategyList(id)
      context.commit('setStrategy', res.data)
    },
  },
}
