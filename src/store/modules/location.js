export default {
  namespaced: true,
  state: {
    columnInfo: {},
  },
  mutations: {
    setColumnInfo(state, payload) {
      state.columnInfo = payload
    },
  },
  actions: {
    getColumnInfo(context, payload) {
      context.commit('setColumnInfo', payload)
    },
  },
  getters: {},
}
