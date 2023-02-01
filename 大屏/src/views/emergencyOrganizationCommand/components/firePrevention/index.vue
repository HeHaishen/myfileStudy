<!--
 * @Description: 防火
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-14 11:55:58
-->
<!-- 防火 -->
<template>
  <div class="manage">
    <ModelBox class="manage_yjdw" title="防火">
      <div slot="content" class="content">
        <!-- <div
          class="orinary-hidden"
          v-for="item in tabKeys"
          :key="item.key"
          @click="onChange(item)"
        >
          <img
            src="../../../../assets/images/majorFestivalsConductor/ordinary-hiddent-icon.png"
            alt=""
          />
          <span>{{ item.label }}：{{ formData[item.totalKey] || 0 }}</span>
        </div> -->
        <div
          class="orinary-hidden"
          v-for="item in tabKeys"
          :key="item.key"
          @click="onChange(item)"
        >
          <p>{{ formData[item.totalKey] || 0 }}</p>
          <img :src="item.icon" alt="" />
          <span>{{ item.label }}</span>

          <div
            class="selected"
            v-if="openMoreList.findIndex((e) => e.key == item.key) > -1"
          >
            <img
              src="~@/assets/images/majorFestivalsConductor/selected.png"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    </ModelBox>

    <template v-for="item in openMoreList">
      <pop-up-layer
        @click.native="onActive(item)"
        :key="item.key"
        :show="!item.isClose"
        @doClose="close(item)"
        opsition="pageCenter"
        :title="item.label"
        ref="myPopUpLayer"
        :class="[activeWindow == item.key && 'pop_up_layer_active']"
      >
        <div slot="content" class="upLayer_content">
          <UpView :activeKey="item.key" />
        </div>
      </pop-up-layer>
    </template>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import UpView from "./upView.vue";
import ModelBox from "../modelBox/index.vue";
import { getIdsmApi } from "@/api/idsm/index";

export default {
  components: { Clist, ModelBox, UpView },
  data() {
    return {
      tabKeys: [
        {
          label: "指挥机构",
          key: "1",
          totalKey: "zhjg",
          icon: require("../../../../assets/images/majorFestivalsConductor/fhzhjg.png"),
        },
        // {
        //   label: "扑火力量",
        //   key: "2",
        //   totalKey: "phll",
        //   icon: require("../../../../assets/images/majorFestivalsConductor/phll.png"),
        // },
        {
          label: "微型消防站",
          key: "3",
          totalKey: "wxxfz",
          icon: require("../../../../assets/images/majorFestivalsConductor/wxxp.png"),
        },
        {
          label: "消防车",
          key: "4",
          totalKey: "xfc",
          icon: require("../../../../assets/images/majorFestivalsConductor/xfc.png"),
        },
      ],
      formData: {},
      /** 更多打开数据 */
      openMoreList: [],
      /** 当前激活窗口 */
      activeWindow: null,
      clickToMap: { 1: false, 2: false, 3: false, 4: false },
      columns: [],
      columns1: [
        { title: "机构名称", textIndex: "groupName", width: "30%" },
        { title: "负责人", textIndex: "username", width: "15%" },
        { title: "电话", textIndex: "mobile", width: "30%" },
        { title: "区域", textIndex: "quyu", width: "15%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns3: [
        { title: "名称", textIndex: "name", width: "25%" },
        { title: "地址", textIndex: "address", width: "30%" },
        { title: "联系人", textIndex: "contacts", width: "10%" },
        { title: "电话", textIndex: "mobile", width: "25%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns4: [
        { title: "地址", textIndex: "standbyPoint", width: "20%" },
        { title: "联系人", textIndex: "contacts", width: "20%" },
        { title: "电话", textIndex: "phone", width: "30%" },
        { title: "数量", textIndex: "num", width: "10%" },
        { title: "单位", textIndex: "unit", width: "10%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
    };
  },
  //创建完成 访问当前this实例
  created() {
    this.doQuery();
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    doQuery() {
      let body = {
        body: {},
      };
      getIdsmApi("yjX9yL1Y", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.formData = res.body.data[0];
          } else {
            this.formData = {};
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    /** 关闭更多页面 */
    close(record) {
      let index = this.openMoreList.findIndex((e) => e.key == record.key);
      if (index > -1) {
        this.$set(this.openMoreList[index], "isClose", true);
        return;
      }
      if (this.openMoreList.length > 0) {
        this.activeWindow = this.openMoreList[this.openMoreList.length - 1].key;
      }
    },

    /** 激活 */
    onActive(record) {
      this.activeWindow = record.key;
    },

    /** 点击事件 */
    onChange(record) {
      let index = this.openMoreList.findIndex((e) => e.key == record.key);
      this.activeWindow = record.key;
      console.log(record.key);
      if (record.key == "2") {
        this.listData = [];
        return;
      } else if (record.key == "1") {
        this.columns = this.columns1;
      } else if (record.key == "4") {
        this.columns = this.columns4;
      } else {
        this.columns = this.columns3;
      }
      this.clickToMap[record.key] = !this.clickToMap[record.key];
      this.getAllData();
      if (index > -1) {
        this.openMoreList.splice(index, 1);
        return;
      }
      this.openMoreList.push({
        isClose: false,
        ...record,
      });
    },
    getAllData() {
      pGzznCore.pointLayerRemove({
        type: "defaultTypefh" + this.activeWindow,
        isFlag: true,
      });
      if (!this.clickToMap[this.activeWindow]) {
        return;
      }
      let body = {
        page: -1,
      };
      let code = "";
      switch (this.activeWindow) {
        case "1":
        case 1:
        case "2":
        case 2:
          code = "15vb7jna";
          body.body = {
            orgType: this.activeWindow,
          };
          break;
        case "3":
        case 3:
          body.body = {
            type: 3,
          };
          code = "CDubQsGk";
          break;
        case "4":
        case 4:
          body.body = {
            name: "消防车",
          };
          code = "xIY4Z3of";
          break;
      }
      getIdsmApi(code, body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.setLayerToMap(
              res.body.data,
              "defaultTypefh" + this.activeWindow
            );
          } else {
            this.listData = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    setLayerToMap(list, typeStr) {
      let items = pGzznCore.deepClone(list);
      let phones = this.activeWindow == 4 ? "phone" : "mobile";
      let names = this.activeWindow == 4 ? "contacts" : "username";
      pGzznCore.pointLayerRemove({ type: typeStr });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/fh" + this.activeWindow + ".png",
        imgSize: { width: 38, height: 38 },
        type: typeStr,
        layerName: "防火",
        info: this.columns.filter((e) => e.textIndex != "dw"),
        phoneInfo: { phone: phones, name: names },
      };
      console.log(items, objs, 1111);
      pGzznCore.setPointLayerToMap(items, objs);
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../common.less";
@import "./mixin.less";
.manage {
  .manage_yjdw {
    top: 1290vh * @h;
    left: 2816vw * @w;

    .content {
      display: flex;
      height: 330vh * @h;
      overflow: hidden;

      div {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
          color: #ffffff;
          font-size: 28vh * @h;
          margin-top: 10vh * @h;
          position: relative;
          bottom: 20vh * @h;
        }
        p {
          color: rgb(32, 254, 244);
          position: relative;
          top: 50vh * @h;
          font-weight: bolder;
          font-size: 28vh * @h;
        }
        img {
          width: 200vw * @w;
          height: 200vh * @h;
        }
      }

      .orinary-hidden {
        position: relative;
        .selected {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          img {
            width: 150vw * @w;
            height: 150vh * @h;
          }
        }
      }
    }
  }
  .pop_up_layer_active {
    z-index: 10000;
  }
}
</style>