import { routeMap, constantRouterMap } from '../../router/routers.js'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, data) => {
      state.addRouters = data.routers
      state.routers = constantRouterMap.concat(data.routers)
    }
  },
  getters: {
    permission_routers: state => state.routers
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        let newRouters = routeMap[data.type]
        if (newRouters === undefined) {
          newRouters = routeMap['1']
        }
        commit('SET_ROUTERS', { routers: newRouters })
        resolve()
      })
    }
  }
}

export default permission
