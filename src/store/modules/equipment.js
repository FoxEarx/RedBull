import { equipmentSearch, addEquipmentType } from '@/api'
export default {
  namespaced: true,
  state: {
    AllEquipment: '',
    AllPoint: [],
    DeviceType: [],
  },
  mutations: {
    setEquipment(state, payload) {
      state.AllEquipment = payload
    },
    setEquipmentAllPoint(state, payload) {
      state.AllPoint = payload
    },
    setDeviceType(state, payload) {
      state.DeviceType = payload
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
    async getDeviceType(context, id, val) {
      const res = await addEquipmentType(id, 10, val)
      context.commit('setDeviceType', res.data)
      console.log(res)
    },
    async getSearchDeviceType(context, val) {
      const res = await addEquipmentType(1, 10, val)
      context.commit('setDeviceType', res.data)
    },
  },
}
