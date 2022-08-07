import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import repair from './modules/repair'
import person from './modules/person'
import createVuexPersisted from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    repair,
    person,
  },
  getters,
  plugins: [
    createVuexPersisted({
      reducer(state) {
        return {
          user: { token: state.user.token, userId: state.user.userId },
          repair,
        }
      },
    }),
  ],
})

export default store
