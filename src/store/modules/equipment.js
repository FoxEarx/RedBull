import { equipmentSearch } from '@/api'
export default {
  namespaced: true,
  state: {
    AllEquipment: '',
    AllPoint: [],
  },
  mutations: {
    setEquipment(state, payload) {
      state.AllEquipment = payload
    },
    setEquipmentAllPoint(state, payload) {
      state.AllPoint = payload
    },
  },
  actions: {
    async getEquipment(context, index) {
      const res = await equipmentSearch(index)
      context.commit('setEquipment', res.data)
    },
    async getNumEquipment(context, id) {
      const res = await equipmentSearch('', id)
      context.commit('setEquipment', res.data)
    },
  },
}
