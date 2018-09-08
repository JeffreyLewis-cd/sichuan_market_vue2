import Vue from 'vue'
import Vuex from 'vuex'
import adminAreas from './modules/administrative/areas/adminAreas'



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    adminAreas
  }
});
