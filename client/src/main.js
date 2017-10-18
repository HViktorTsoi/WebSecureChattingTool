// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './App'
import Login from './components/Login'
import Chat from './components/Chat'
// import './assets/js/bootstrap'
import './assets/css/bootstrap.min.css'

import store from './store'

Vue.config.productionTip = false

// 时间转换
Vue.prototype.$parseTime = function (unixTimestamp) {
  function fmtSgl (num) {
    return num >= 10 ? num : '0' + num
  }
  if (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000)
    var formattedTime =
      fmtSgl(date.getHours()) + ':' +
      fmtSgl(date.getMinutes()) + ':' +
      fmtSgl(date.getSeconds())
    return formattedTime
  } else {
    return null
  }
}

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueRouter)

// 配置路由
var routes = [
  {
    path: '/Login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/Chat',
    component: Chat,
    name: 'Chat'
  }
]
var router = new VueRouter({
  routes: routes
})
router.beforeEach((to, from, next) => {
  let lastTimeState = localStorage.lastTimeState ? JSON.parse(localStorage.lastTimeState) : null
  // 如果不是到登录界面
  if (to.fullPath !== '/Login') {
    try {
      if (!store.state.nickName) {
        // 如果是刷新页面或者是短期离线
        if (!lastTimeState || (new Date().getTime() / 1000 - lastTimeState.lastTime > 5)) {
          alert('你未登录，请先登录！')
          router.push('Login')
        } else { // 否则恢复状态 并判断是否要重新连接
          if (store.state.ws) {
            next()
          } else {
            // 如果websocket没有被初始化 则重新连接
            store.replaceState(lastTimeState.state)
            store.dispatch('initWebSocket').then(() => {
              next()
            })
          }
        }
      } else {
        next()
      }
    } catch (exception) {
      console.log(exception)
      alert('ERROR：你未登录，请先登录！')
      router.push('Login')
    }
  } else {
    if (store.state.ws) {
      store.state.ws.send(JSON.stringify({
        type: 'quit',
        uid: store.state.uid
      }))
    }
    delete localStorage.lastTimeState
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
})

window.onbeforeunload = function () {
  localStorage.lastTimeState = JSON.stringify({
    state: store.state,
    lastTime: new Date().getTime() / 1000
  })
}
