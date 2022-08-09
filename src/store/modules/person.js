import { getPersonnelList, getUserWorkList } from '@/api/person'

export default {
  namespaced: true,
  state: {
    personnelList: [],
    workList: [],
  },
  mutations: {
    setPersonnelList(state, payload) {
      state.personnelList = payload
    },
    setUserWorkList(state, payload) {
      state.workList = payload
    },
  },
  actions: {
    async getPersonnelList(context, id) {
      const { data } = await getPersonnelList(id)
      context.commit('setPersonnelList', data)
    },
    async getUserWorkList(context, id) {
      const { data } = await getUserWorkList(id)
      context.commit('setUserWorkList', data)
    },
  },
}
