/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-08 14:07:34
 * @LastEditTime: 2021-06-09 16:37:51
 */
const user = {
  state: {
    token: "",
    userInfo: {},
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      let num = 32 - userInfo.sid.length;
      state.userInfo = userInfo;
      state.randomNum = Math.random().toFixed(num).split(".")[1];
    },
  },
  actions: {
    setUserInfo({ commit }, userInfo) {
      commit("SET_USERINFO", userInfo);
    },
  },
};
export default user;
