import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    admin: ''

  },
  mutations: {
    // 登入 user改為傳進來的資料
    login (state, data) {
      state.user = data
    },
    logout (state) {
      // 登出 user改為 空值
      state.user = ''
    }

  },
  getters: {
    // getters 取 vuex資料
    user (state) {
      return state.user
    }
  },
  plugins: [createPersistedState()]
})
