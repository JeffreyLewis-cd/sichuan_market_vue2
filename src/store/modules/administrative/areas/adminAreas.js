/**
 * Created by Administrator on 2017/9/4.
 */
import * as MUTATIONS from '../../../mutations';

const state = {
  leftSideNavCollapse:false,

};


const getters = {
  leftSideNavCollapse: state => state.leftSideNavCollapse,

};

const mutations = {
  [MUTATIONS.leftSideNavCollapse_mu](state){
    state.leftSideNavCollapse=!state.leftSideNavCollapse;
  },

};

export default {
  state,
  getters,
  mutations
}
