import { equipmentSearch } from '@/api'
export default {
  namespaced: true,
  state: {
    AllEquipment: '',
  },
  mutations: {
    setEquipment(state, payload) {
      state.AllEquipment = payload
    },
  },
  actions: {
    async getEquipment(context, index) {
      const res = await equipmentSearch(index)
      context.commit('setEquipment', res.data)
      console.log(res)
    },
    async getNumEquipment(context, id) {
      const res = await equipmentSearch('', id)
      context.commit('setEquipment', res.data)
      console.log(res)
    },
  },
}
