/*
 * @Description: vuex
 * @Version: 1.0
 * @Autor: sude
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 14:09:38
 * @LastEditTime: 2021-09-03 11:20:59
 */
import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import pushDatas from './modules/pushDatas'
import getters from './getters'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    pushDatas,
    planId:''
  },
  state: {
    winHeight: 0, // win 高
    
  },
  mutations: {
    // 设置宽高
    SET_WIDTH_AND_HEIGHT(state, style){
      state.winWidth = style.winWidth;
      state.winHeight = style.winHeight;
    },
    setPlanId(state, params){
      state.planId = params;
    },
  },
  actions: {
    // 设置宽高
    setWidthAndHeight({ commit }, style){
      commit('SET_WIDTH_AND_HEIGHT', style);
    }
  },
  getters
});
