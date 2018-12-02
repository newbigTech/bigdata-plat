import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import permission from './module/permission'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    app
  }
})
