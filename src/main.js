// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
let navigationGuards=require("./router/navigationGuards");

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

let md5 = require('md5');
Vue.prototype.$md5=md5;

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  navigationGuards,
  components: {App},
  template: '<App/>'
})
