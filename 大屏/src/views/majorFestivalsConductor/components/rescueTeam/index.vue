<!--
 * @Description: 应急救援队伍
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-14 11:53:05
-->
<!-- 应急救援队伍 -->
<template>
  <div class="manage" ref="manages">
    <ModelBox class="manage_yjdw" title="应急救援队伍">
      <div slot="content" class="content">
        <div
          class="orinary-hidden"
          v-for="item in tabKeys"
          :key="item.key"
          @click="onChange(item)"
        >
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
          <p>{{ formData[item.totalKey] || 0 }}</p>
          <img :src="item.icon" alt="" />
          <span>{{ item.label }}</span>
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
          label: "社会救援力量",
          key: "1",
          totalKey: "sociology",
          icon: require("../../../../assets/images/majorFestivalsConductor/help-power-icon1.png"),
        },
        {
          label: "专业救援力量",
          key: "2",
          totalKey: "major",
          icon: require("../../../../assets/images/majorFestivalsConductor/help-power-icon2.png"),
        },
        {
          label: "现场救援力量",
          key: "3",
          totalKey: "basic",
          icon: require("../../../../assets/images/majorFestivalsConductor/help-power-icon3.png"),
        },
      ],
      /** 更多打开数据 */
      openMoreList: [],
      /** 当前激活窗口 */
      activeWindow: null,
      formData: {},
      columns: [
        { title: "队伍名称", textIndex: "mc", width: "35%" },
        { title: "总人数", textIndex: "zrs", width: "10%" },
        { title: "负责人", textIndex: "fzr", width: "10%" },
        { title: "负责人电话", textIndex: "fzryddh", width: "35%" },
        { title: "定位", textIndex: "dw", width: "10%" },
      ],
      clickShowMap: { 1: false, 2: false, 3: false },
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
      getIdsmApi("uScfkN5b", body).then((res) => {
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
      this.clickShowMap[record.key] = !this.clickShowMap[record.key];
      this.getAllDataQuery();
      if (index > -1) {
        this.openMoreList.splice(index, 1);
        return;
      }
      this.openMoreList.push({
        isClose: false,
        ...record,
      });
    },
    getAllDataQuery() {
      let body = {
        body: {
          lxdm: this.activeWindow,
        },
        page: -1,
      };
      getIdsmApi("1pQeEGzH", body).then((res) => {
        if (res.success) {
          let lists = res.body.data ? res.body.data : [];
          this.setLayerToMap(
            lists,
            "defaultTypeyjjhdw" + this.activeWindow,
            true
          );
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    setLayerToMap(list, typeStr, isFlag = false) {
      let items = pGzznCore.deepClone(list);
      let columns = this.columns.filter((e) => e.textIndex != "dw");
      pGzznCore.pointLayerRemove({ type: typeStr, isFlag: isFlag });
      if (!this.clickShowMap[this.activeWindow]) {
        return;
      }
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/yjjhdw" + this.activeWindow + ".png",
        imgSize: { width: 50, height: 46 },
        type: typeStr,
        layerName: "应急救援队伍",
        info: columns,
        phoneInfo: { phone: "fzryddh", name: "fzr" },
        lonLat: { lon: "jd", lat: "wd" },
      };

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
    top: 885vh * @h;
    left: 30vw * @w;

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
        position: relative;
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