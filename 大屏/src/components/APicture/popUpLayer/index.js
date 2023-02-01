/*
 * @Description: 使用挂载全局组件
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-24 15:45:04
 * @LastEditTime: 2021-07-24 16:04:20
 */
import myPopUpLayer from "./index.vue";

const PopUpLayer = {
  install: function (Vue) {
    Vue.component("PopUpLayer", myPopUpLayer);
  },
};

export default PopUpLayer;
