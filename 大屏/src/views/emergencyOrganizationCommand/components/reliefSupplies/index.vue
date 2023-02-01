<!--
 * @Description: 救灾物资
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-14 11:55:03
-->
<!-- 救灾物资 -->
<template>
  <div class="manage">
    <ModelBox class="manage_yjdw" title="救灾物资">
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
          class="box"
          v-for="item in tabKeys"
          :key="item.key"
          @click="onChange(item)"
        >
          <div class="c">
            <div class="img">
              <img :src="item.img" alt="" />
            </div>
            <div class="title">{{ item.label }}</div>
            <div class="num">{{ formData[item.totalKey] || 0 }}</div>

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
import WzzlDetails from "./wzzlDetails.vue";
import { getIdsmApi } from "@/api/idsm/index";

export default {
  components: { Clist, ModelBox, UpView, WzzlDetails },
  data() {
    return {
      tabKeys: [
        {
          label: "存储仓库",
          key: "1",
          totalKey: "ccck",
          img: require("../../../../assets/images/majorFestivalsConductor/ccck.png"),
        },
        {
          label: "保障企业",
          key: "2",
          totalKey: "bzqy",
          img: require("../../../../assets/images/majorFestivalsConductor/bzqy.png"),
        },
        {
          label: "应急装备",
          key: "3",
          totalKey: "yjzb",
          img: require("../../../../assets/images/majorFestivalsConductor/yjzb.png"),
        },
        {
          label: "应急物资",
          key: "4",
          totalKey: "yjwz",
          img: require("../../../../assets/images/majorFestivalsConductor/yjwz.png"),
        },
      ],
      formData: {},
      /** 更多打开数据 */
      openMoreList: [],
      /** 当前激活窗口 */
      activeWindow: null,
      clickToMap: { 1: false, 2: false, 3: false, 4: false },
      columns1: [
        { title: "仓库名称", textIndex: "mc" },
        { title: "主管部门", textIndex: "zgdw" },
        { title: "负责人", textIndex: "fzr" },
        { title: "电话", textIndex: "fzrbgdh" },
        { title: "储备总量", textIndex: "wzzl" },
        { title: "地址", textIndex: "dz" },
        { title: "定位", textIndex: "dw" },
      ],
      columns2: [
        { title: "供应商名称", textIndex: "qymc", width: "20%" },
        { title: "负责人", textIndex: "fzr", width: "15%" },
        { title: "电话", textIndex: "fzrbgdh", width: "25%" },
        { title: "物资总量", textIndex: "wzzl", width: "15%" },
        { title: "地址", textIndex: "dz", width: "15%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      columns3: [
        { title: "名称", textIndex: "name" },
        { title: "待命点", textIndex: "standbyPoint" },
        { title: "负责人", textIndex: "contacts" },
        { title: "电话", textIndex: "fzrbgdh" },
        { title: "物资总量", textIndex: "num" },
        { title: "单位", textIndex: "unit" },
        { title: "定位", textIndex: "dw" },
      ],
      columns: [],
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
      getIdsmApi("hAZZOJ7v", body).then((res) => {
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
      if (record.key == 1) {
        this.columns = this.columns1;
      } else if (record.key == 2) {
        this.columns = this.columns2;
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
        type: "defaultTypejzwz" + this.activeWindow,
        isFlag: true,
      });
      if (!this.clickToMap[this.activeWindow]) {
        return;
      }
      let body = {
        body: {
          lxdm: this.activeWindow,
        },
        page: -1,
      };
      let code = "";
      switch (this.activeWindow) {
        case "1":
        case 1:
          code = "lzVtiTyK";
          break;
        case "2":
        case 2:
          code = "9naLnFkk";
          break;
        default:
          code = "yNNzjlYo";
          break;
      }
      getIdsmApi(code, body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.setLayerToMap(
              res.body.data,
              "defaultTypejzwz" + this.activeWindow
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
      let columns = this.columns.filter((e) => e.textIndex != "dw");
      pGzznCore.pointLayerRemove({ type: typeStr, isFlag: true });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/jzwz" + this.activeWindow + ".png",
        imgSize: { width: 40, height: 36 },
        type: typeStr,
        layerName: "救灾物资",
        info: columns,
      };
      this.activeWindow == 1
        ? ""
        : (objs.phoneInfo = { phone: "fzrbgdh", name: "fzr" });
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
    top: 1735vh * @h;
    left: 30vw * @w;
    .rightTitle {
      position: absolute;
      top: 0;
      right: 30vw * @w;
      line-height: 64vh * @h;
      color: white;
      font-size: 22vh * @h;
      .more {
        cursor: pointer;
      }
    }
  }
  .content {
    // display: flex;
    height: 330vh * @h;
    overflow: hidden;

    .box {
      margin-top: 25vh * @h;
      margin-right: 26vw * @w;
      margin-left: 26vw * @w;
      width: 432vw * @w;
      // width: 50%;
      height: 120vh * @h;
      // height: 50%;
      float: left;
      position: relative;
      cursor: pointer;
      // padding: 5px;
      .c {
        background: url(../../../../assets/images/majorFestivalsConductor/Fourbg1.png)
          center no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        height: 100%;
        width: 100%;

        .img {
          position: absolute;
          width: 78vw * @w;
          height: 73vh * @h;
          left: 87vw * @w;
          top: 20vh * @h;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title,
        .num {
          color: white;
          display: inline-block;
          position: absolute;
          top: 20vh * @h;
          left: 182vw * @w;
          font-size: 28vh * @h;
        }
        .num {
          top: 65vh * @h;
          color: #2891fd;
        }
      }

      &:nth-child(2) {
        .c {
          background: url(../../../../assets/images/majorFestivalsConductor/Fourbg2.png)
            center no-repeat;
          background-size: 100% 100%;
          .num {
            color: #fe8431;
          }
        }
      }

      &:nth-child(3) {
        .c {
          background: url(../../../../assets/images/majorFestivalsConductor/Fourbg3.png)
            center no-repeat;
          background-size: 100% 100%;
          .num {
            color: #00ef9c;
          }
        }
      }

      &:nth-child(4) {
        .c {
          background: url(../../../../assets/images/majorFestivalsConductor/Fourbg4.png)
            center no-repeat;
          background-size: 100% 100%;
          .num {
            color: #ffe844;
          }
        }
      }

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

    // div {
    //   width: 50%;
    //   height: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   align-items: center;
    //   cursor: pointer;
    //   span {
    //     color: #ffffff;
    //     font-size: 16vh * @h;
    //   }
    //   img {
    //     width: 50%;
    //     height: 50%;
    //   }
    // }
  }

  .pop_up_layer_active {
    z-index: 10000;
  }
}
</style>