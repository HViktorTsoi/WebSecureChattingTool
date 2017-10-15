// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './App'
// import './assets/js/bootstrap'
import './assets/css/bootstrap.min.css'
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
