export default {
  namespaced: true,
  state: {
    ClickInformation: {},
    className: {},
    EditCommodity: {},
  },
  mutations: {
    setClickInformation(state, payload) {
      state.ClickInformation = payload
    },
    setClassName(state, payload) {
      state.ClassName = payload
    },
    setEditCommodity(state, payload) {
      state.EditCommodity = payload
    },
  },
  actions: {
    getClickInformation(context, payload) {
      context.commit('setClickInformation', payload)
    },
    getClassName(context, payload) {
      context.commit('setClassName', payload)
    },
    getEditCommodity(context, payload) {
      context.commit('setEditCommodity', payload)
    },
  },
}
