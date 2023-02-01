/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-08 14:11:20
 * @LastEditTime: 2021-09-03 11:33:11
 */
const getters = {
  tonken: (state) => state.user.tonken,
  userInfo: (state) => state.user.userInfo,
  winWidth: (state) => state.winWidth,
  winHeight: (state) => state.winHeight,
  responeData: (state) => state.pushDatas.responeData,
};

export default getters;
