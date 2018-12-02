import {
  getMenuByRouter,
  localSave,
  localRead
} from '@/libs/util'
import store from '@/store'
import { saveErrorLogger } from '@/api/data'

export default {
  state: {
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) => {
      const rout = store.getters.permission_routers
      if (rout === undefined) {
        store.dispatch('GenerateRoutes', { type: '1' }).then(() => {})
      }
      return getMenuByRouter(store.getters.permission_routers, rootState.user.access)
    },
    errorCount: state => state.errorList.length
  },
  mutations: {
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    }
  }
}
