/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-30 16:39:48
 * @LastEditTime: 2021-09-07 14:57:13
 */
import { MyMessage } from "./messageBox.js";
const myMessageBox = {
  install: function (Vue) {
    Vue.prototype.$MyMessage = MyMessage;
  },
};
export default myMessageBox;
