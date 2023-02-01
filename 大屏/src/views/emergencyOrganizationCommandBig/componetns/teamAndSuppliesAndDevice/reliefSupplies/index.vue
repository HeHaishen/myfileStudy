<!--
 * @Description: 救灾物资
 * @Author: liuxin
 * @Date: 2021-11-01 15:42:26
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-11-03 15:23:00
-->
<template>
  <div class="relief_supplies">
    <div class="public-head">救灾物资</div>
    <div class="public-content">
      <div class="box" v-for="item in tabKeys" :key="item.key" @click="onChange(item)">
        <div class="c">
          <div class="img">
            <img :src="item.img" alt="" />
          </div>
          <div class="title">{{ item.label }}</div>
          <div class="num">{{ formData[item.totalKey] || 0 }}</div>

          <div class="selected" v-if="openMoreList.findIndex((e) => e.key == item.key) > -1">
            <img src="~@/assets/images/majorFestivalsConductor/selected.png" alt="" srcset="" />
          </div>
        </div>
      </div>
    </div>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>

    <template v-for="item in openMoreList">
      <pop-up-layer @click.native="onActive(item)" :key="item.key" :show="!item.isClose" @doClose="close(item)" opsition="pageCenter" :title="item.label" ref="myPopUpLayer" class="big_pop_up_layer" :class="[activeWindow == item.key && 'pop_up_layer_active']">
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
import WzzlDetails from "./wzzlDetails.vue";
import { getIdsmApi } from "@/api/idsm/index";

export default {
  props: {},
  components: { Clist, UpView, WzzlDetails },
  data() {
    return {
      tabKeys: [
        {
          label: "存储仓库",
          key: "1",
          totalKey: "ccck",
          img: require("../../../../../assets/images/majorFestivalsConductor/ccck.png"),
        },
        {
          label: "保障企业",
          key: "2",
          totalKey: "bzqy",
          img: require("../../../../../assets/images/majorFestivalsConductor/bzqy.png"),
        },
        {
          label: "应急装备",
          key: "3",
          totalKey: "yjzb",
          img: require("../../../../../assets/images/majorFestivalsConductor/yjzb.png"),
        },
        {
          label: "应急物资",
          key: "4",
          totalKey: "yjwz",
          img: require("../../../../../assets/images/majorFestivalsConductor/yjwz.png"),
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
  watch: {},
  computed: {},
  created() {
    this.doQuery();
  },
  mounted() { },
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
@import '../../../common.less';
@import './mixin.less';

.relief_supplies {
  border: 2px solid #015ebd;
  width: 100%;
  height: 460px;
  position: relative;
  background-color: #001941;

  .public-content {
    padding: 15px 22px;
    overflow: hidden;

    .box {
      margin-top: 25px;
      margin-right: 26px;
      margin-left: 26px;
      width: 540px;
      height: 140px;
      float: left;
      position: relative;
      cursor: pointer;
      // padding: 5px;
      .c {
        background: url('~@/assets/images/majorFestivalsConductor/Fourbg1.png')
          center no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        height: 100%;
        width: 100%;

        .img {
          position: absolute;
          width: 95px;
          height: 95px;
          left: 95px;
          top: 26px;
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
          top: 20px;
          left: 255px;
          font-size: 40px;
        }
        .num {
          top: 83px;
          color: #2891fd;
        }
      }

      &:nth-child(2) {
        .c {
          background: url('~@/assets/images/majorFestivalsConductor/Fourbg2.png')
            center no-repeat;
          background-size: 100% 100%;
          .num {
            color: #fe8431;
          }
        }
      }

      &:nth-child(3) {
        .c {
          background: url('~@/assets/images/majorFestivalsConductor/Fourbg3.png')
            center no-repeat;
          background-size: 100% 100%;
          .num {
            color: #00ef9c;
          }
        }
      }

      &:nth-child(4) {
        .c {
          background: url('~@/assets/images/majorFestivalsConductor/Fourbg4.png')
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
          width: 150px;
          height: 150px;
        }
      }
    }
  }

  .pop_up_layer_active {
    z-index: 10000;
  }
}
</style>
