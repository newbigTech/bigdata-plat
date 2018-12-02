<template>
  <Layout style="height: 100%" class="main">
    <Header class="header-con">
      <div class="logo-con">
        <h2>数据开发</h2>
        <!--<img v-show="!collapsed" :src="maxLogo" key="max-logo" />-->
        <!--<img v-show="collapsed" :src="minLogo" key="min-logo" />-->
      </div>
      <Menu mode="horizontal" theme="light" active-name="1" @on-select="getActiveName" style="float:left;margin-left: 20%">
        <MenuItem name="1">
          <Icon type="ios-paper" />
          开发中心
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people" />
          发布中心
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-construct" />
          运维中心
        </MenuItem>
        <MenuItem name="4">
          <Icon type="ios-paper" />
          监控管理
        </MenuItem>
        <MenuItem name="5">
          <Icon type="ios-people" />
          数据管理
        </MenuItem>
        <MenuItem name="6">
          <Icon type="ios-construct" />
          项目管理
        </MenuItem>
      </Menu>
      <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
        <Input v-model="activeName" size="large" disabled icon="ios-clock-outline" placeholder="Enter something..." style="float:left; padding-top: 15px;width:300px;margin-right: 20px" />
        <user :user-avator="userAvator" />
        <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
      </header-bar>
    </Header>
    <Layout>
      <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-if="activeName !='1'" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
        <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        </side-menu>
      </Sider>
      <Sider hide-trigger collapsible :width="50" v-if="activeName =='1'" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
        <Menu mode="vertical" style="width: 50px" theme="light" active-name="1">
          <MenuItem name="1">
            <Icon type="ios-paper" />
            离线任务
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people" />
            流式任务
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-construct" />
            脚本开发
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-construct" />
            函数开发
          </MenuItem>
        </Menu>
      </Sider>

      <Content class="main-content-con">
        <Sider hide-trigger collapsible :width="50" v-if="activeName =='1'" style="float:right;margin-right:5px;overflow:hidden">
          <Menu mode="vertical" style="width: 50px" theme="light" active-name="1">
            <MenuItem name="1">
              <Icon type="ios-paper" />
              内容管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-people" />
              用户管理
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-construct" />
              综合设置
            </MenuItem>
          </Menu>
        </Sider>
        <Layout class="main-layout-con">
          <Content class="content-wrapper" style="height: 1000px">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import { routeMap } from '../../router/routers.js'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      activeName: '1'
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  methods: {
    ...mapMutations([
      'setLocal'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    getActiveName (name) {
      this.activeName = name
      this.$store.dispatch('GenerateRoutes', { type: name }).then(() => {
        this.$router.push({ path: routeMap[name][0].path + '/' + routeMap[name][0].children[0].path })
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },

    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    this.$store.dispatch('GenerateRoutes', { type: '1' }).then(() => {
    })
  }
}
</script>
