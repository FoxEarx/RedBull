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
    // 获取人员列表
    async getPersonnelList(context, id) {
      const { data } = await getPersonnelList(id)
      context.commit('setPersonnelList', data)
    },
    // 获取工作量列表
    async getUserWorkList(context, id) {
      const { data } = await getUserWorkList(id)
      context.commit('setUserWorkList', data)
    },
  },
}
