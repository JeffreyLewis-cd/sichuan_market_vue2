// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
let navigationGuards=require("./router/navigationGuards");
/*ElementUI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/*md5*/
let md5 = require('md5');
Vue.prototype.$md5=md5;

/*Vuex-store*/
import store from './store';

/*百度-echarst*/
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  navigationGuards,
  store,
  components: {App},
  template: '<App/>'
})
