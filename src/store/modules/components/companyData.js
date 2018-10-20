/**
 * Created by Administrator on 2017/9/4.
 */
import * as MUTATIONS from '../../mutations';

const state = {
  companyListByIndustryCode: [],

};


const getters = {
  companyListByIndustryCode: state => state.companyListByIndustryCode,

};

const mutations = {
  [MUTATIONS.companyListByIndustryCode_mu](state, newList) {
    state.companyListByIndustryCode = newList;
  },

};

export default {
  state,
  getters,
  mutations
}
