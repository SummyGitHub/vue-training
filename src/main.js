// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/store'
import App from './App'
import VueRouter from 'vue-router'
import routeConfig from './router/index'
import VueResource from 'vue-resource'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css' /*element样式文件*/

/* eslint-disable no-new */


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(Element)

const router = new VueRouter({
	mode: 'history', //此处不加上的话，url地址会出现#符号
	routes: routeConfig
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')