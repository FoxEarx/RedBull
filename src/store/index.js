import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import repair from './modules/repair'
import createVuexPersisted from 'vuex-persistedstate'
import commodityType from './modules/commodityType'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    repair,
    commodityType,
  },
  getters,
  plugins: [
    createVuexPersisted({
      reducer(state) {
        return {
          user: { token: state.user.token, userId: state.user.userId },
          repair,
          commodityType,
        }
      },
    }),
  ],
})

export default store
