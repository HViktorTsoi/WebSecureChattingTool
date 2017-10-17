// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './App'
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
