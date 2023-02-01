/*
 * @Description:
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 14:09:38
 * @LastEditTime: 2021-11-08 10:49:34
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookies from "js-cookie";
import Antd from "ant-design-vue";
import { userLogin, isAuthed } from "@/api/login";
import { encrypt } from "@/utils/aes";
// 重置标签样式
import "./styles/normalize.css";
import "./assets/font/font.css";
import "./styles/common.less";
import "ant-design-vue/dist/antd.css";
import "./styles/reset.less";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import { toWindDirStr } from "@/utils/changeWind";
import Zui from "Zui";
const { ZFile } = Zui;
Vue.component(ZFile.name, ZFile);

import {
  Input,
  Tabs,
  TabPane,
  Tree,
  Step,
  Steps,
  Popover,
  Button,
  Table,
  TableColumn,
  Checkbox,
  CheckboxGroup,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Timeline,
  TimelineItem,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "element-ui";
Vue.use(Tag);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(TabPane);
Vue.use(Tree);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Popover);
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Table);
Vue.use(Checkbox);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(TableColumn);
Vue.use(CheckboxGroup);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// swiper

import VueAwesomeSwiper from "vue-awesome-swiper";
import "@/../node_modules/swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper);

Vue.use(Antd);
// 全局自定义弹窗
import PopUpLayer from "@/components/APicture/popUpLayer/index.js";
Vue.use(PopUpLayer);
// 融合通讯
import AddContacts from "./components/APicture/addContacts/index.js";
Vue.use(AddContacts);
//message
import MyMessage from "@/components/APicture/Messages/index.js";
Vue.use(MyMessage);

import "./utils/filter"; // global filter 全局filter
import { setFontSize, filterParams } from "./utils/common"; // 设置js 文字大小
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$setFontSize = setFontSize;
Vue.prototype.$getWindString = toWindDirStr; // 风向转换
Vue.prototype.$filterParams = filterParams; //过滤空对象
// Vue.prototype.$socketIo = undefined;
// Vue.prototype.$myMessage = MyMessage;
console.log(Vue);

// 引入弹窗
import sudLayer from "sud-layer";
import "sud-layer/lib/sud-layer.css";
Vue.use(sudLayer);

// 用户登录
const saveEvn = process.env.NODE_ENV;
if (saveEvn === "production") {// 正式环境
  let getUrlToken = location.href.split("token=");
  if (getUrlToken.length && getUrlToken.length > 2) {// 判断进来的url是否包含token,刷新
    Cookies.set("token",getUrlToken[0], { expires: 1 });
    isAuthed().then((res) => {
      console.log("isAuthed", res);
      if (res.success) {
        new Vue({
          router,
          store,
          render: (h) => h(App),
        }).$mount("#app");
      }
    });
  } else {// 刷新
    isAuthed().then((res) => {
      console.log("isAuthed", res);
      if (res.success) {
        new Vue({
          router,
          store,
          render: (h) => h(App),
        }).$mount("#app");
      }
    });
  }
} else {// 开发环境
  if (Cookies.get("token")) {
    isAuthed().then((res) => {
      console.log("HasisAuthed", res);
      if (res.success) {
        new Vue({
          router,
          store,
          render: (h) => h(App),
        }).$mount("#app");
      }
    });
  } else {
    userLogin({ body: encrypt("216admin") }).then((res) => {
      Cookies.set("token", res.body.token, { expires: 1 });
      console.log("tokenssss", Cookies.get("token"));
      isAuthed().then((res) => {
        console.log("isAuthed", res);
      });
      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount("#app");
    });
  }
}
