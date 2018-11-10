import Vue from 'vue'
import Vuex from 'vuex'
import adminAreas from './modules/administrative/areas/adminAreas'
import companyData from './modules/components/companyData'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    adminAreas,
    companyData,
  }
});
