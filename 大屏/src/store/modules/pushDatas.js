/*
 * @Description: 推送部分消息
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-03 10:32:04
 * @LastEditTime: 2021-09-03 11:48:51
 */
const pushDatas = {
  state: {
    responeData: null,
  },
  mutations: {
    SET_RESPONEDATA(state, responeData) {
      state.responeData = responeData;
    },
  },
  actions: {
    setResponeData({ commit }, responeData) {
      commit("SET_RESPONEDATA", responeData);
    },
  },
};
export default pushDatas;
