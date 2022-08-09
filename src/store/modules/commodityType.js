export default {
  namespaced: true,
  state: {
    ClickInformation: {},
  },
  mutations: {
    setClickInformation(state, payload) {
      state.ClickInformation = payload
    },
  },
  actions: {
    getClickInformation(context, payload) {
      context.commit('setClickInformation', payload)
    },
  },
}
