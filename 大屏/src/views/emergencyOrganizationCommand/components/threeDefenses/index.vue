<!--
 * @Description: 三防
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-10 14:36:29
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-14 20:34:54
-->
<!-- 三防 -->
<template>
  <div class="manage">
    <ModelBox class="manage_yjdw" title="三防">
      <div slot="content" class="content">
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
            <div class="title" :class="[!item.totalKey && 'no_total_key']">
              {{ item.label }}
            </div>
            <div class="num" v-if="item.totalKey">
              {{ formData[item.totalKey] || 0 }}
            </div>
            <div
              class="selected"
              v-if="
                item.key == 2 &&
                openMoreList.findIndex((e) => e.key == item.key) > -1
              "
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
          <UpView v-if="item.key <= 4" :activeKey="item.key" />
          <IframeView v-else :url="item.url" />
        </div>
      </pop-up-layer>
    </template>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import UpView from "./upView.vue";
import IframeView from "./iframeView.vue";
import ModelBox from "../modelBox/index.vue";
import { getIdsmApi } from "@/api/idsm/index";

export default {
  components: { Clist, ModelBox, UpView, IframeView },
  data() {
    return {
      tabKeys: [
        {
          label: "指挥机构",
          key: "1",
          totalKey: "sfzhjg",
          img: require("../../../../assets/images/majorFestivalsConductor/zhjg.png"),
        },
        {
          label: "应急保障",
          key: "2",
          totalKey: "sfyjbzz",
          img: require("../../../../assets/images/majorFestivalsConductor/yjbzz.png"),
        },
        {
          label: "雨量",
          key: "3",
          totalKey: "yl",
          img: require("../../../../assets/images/majorFestivalsConductor/yl.png"),
        },
        {
          label: "风情",
          key: "4",
          totalKey: "fq",
          img: require("../../../../assets/images/majorFestivalsConductor/fqt.png"),
        },
        {
          label: "潮位图",
          key: "5",
          url: `${
            process.env.NODE_ENV === "production" ? ".." : "."
          }/web#/threeProofings/tideFigure`,
          img: require("../../../../assets/images/majorFestivalsConductor/cwt.png"),
        },
        {
          label: "台风路径",
          key: "6",
          url: `${
            process.env.NODE_ENV === "production" ? ".." : "."
          }/web#/threeProofings/typhoonTrack`,
          img: require("../../../../assets/images/majorFestivalsConductor/tflj.png"),
        },
        {
          label: "卫星云图",
          key: "7",
          url: "http://tqyb.com.cn/gz/weatherLive/cloudPictureFull",
          img: require("../../../../assets/images/majorFestivalsConductor/xyt.png"),
        },
        {
          label: "雷达",
          key: "8",
          url: "http://tqyb.com.cn/gz/weatherLive/radarFullPub",
          img: require("../../../../assets/images/majorFestivalsConductor/ldt.png"),
        },
      ],
      formData: {},
      /** 更多打开数据 */
      openMoreList: [],
      /** 当前激活窗口 */
      activeWindow: null,
      clickToMap: { 1: false, 2: false, 3: false, 4: false },
      columns:[],
      columns1: [
        { title: "姓名", textIndex: "name" },
        { title: "工作单位", textIndex: "orgName" },
        { title: "职务", textIndex: "post" },
        { title: "电话", textIndex: "phone" },
        { title: "保障队伍", textIndex: "supportTeam", orgType: 2 },
        { title: "保障力量", textIndex: "supportForce", orgType: 2 },
        { title: "保障位置", textIndex: "supportSeat", orgType: 2 },
        { title: "保障措施", textIndex: "supportMeas", orgType: 2 },
        { title: "抽排力量", textIndex: "pumpingForce", orgType: 2 },
        { title: "定位", textIndex: "dw" },
      ],
      columns2: [
        { title: "站点", textIndex: "zm" },
        { title: "瞬时风速", textIndex: "wdidf", noShow: "3" },
        { title: "瞬时风向", textIndex: "wdidd", noShow: "3" },
        { title: "当前一分钟雨量", textIndex: "rfmark1", noShow: "4" },
        { title: "五分钟雨量分布", textIndex: "minrf", noShow: "4" },
        { title: "小时雨量", textIndex: "hourrf", noShow: "4" },
        { title: "日雨量", textIndex: "dayrf", noShow: "4" },
        { title: "定位", textIndex: "dw" },
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

      getIdsmApi("3IxipDpM", body).then((res) => {
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
      if (parseFloat(record.key) > 2) {
        // TODO 此处将要为 3.雨量 4.风情表头做处理
        this.columns = this.columns2.filter((e) => parseFloat(e.noShow) != parseFloat(record.key));
      }else{
        this.columns = this.columns1;
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
    onActive(record) {
      console.log(record, "record");
      this.activeWindow = record.key;
    },
    getAllData() {
      if (this.activeWindow > 4) {
        return;
      }
      pGzznCore.pointLayerRemove({
        type: "defaultTypesf" + this.activeWindow,
        isFlag: true,
      });
      if (!this.clickToMap[this.activeWindow]) {
        return;
      }
      let body = {
        body: {
          orgType: this.activeWindow,
        },
        page: -1,
      };
      let code = this.activeWindow <= 2 ? "ojom7nRH" : "nMXYNM42";
      getIdsmApi(code, body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            if ([3, 4, "3", "4"].includes(this.activeWindow)) {
              res.body.data.map((v) => {
                Object.assign(v, {
                  lat: v.obtid == "G3102" ? "23.107" : "23.092",
                  lon: v.obtid == "G3102" ? "113.362" : "113.35",
                  zm:
                    v.obtid == "G3102"
                      ? "海珠区琶洲街会展公园"
                      : "海珠区琶洲街赤沙路",
                });
              });
            
          }
          this.setLayerToMap(
              res.body.data,
              "defaultTypesf" + this.activeWindow
          );
        } else {
          this.$MyMessage.error(res.message);
        }
        }
      });
    },
    setLayerToMap(list, typeStr) {
      console.log(this.column)
      let items = pGzznCore.deepClone(list);
      let phones = this.activeWindow == 4 ? "phone" : "mobile";
      let names = this.activeWindow == 4 ? "contacts" : "username";
      pGzznCore.pointLayerRemove({ type: typeStr, isFlag: true });
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/sf" + this.activeWindow + ".png",
        imgSize: { width: 32, height: 32 },
        type: typeStr,
        layerName: "三防",
        info: this.columns.filter((e) => e.textIndex != "dw"),
        phoneInfo: { phone: phones, name: names },
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
    top: 850vh * @h;
    left: 2816vw * @w;

    .content {
      height: 330vh * @h;
      overflow: hidden;

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
      //     font-size: 10vh * @h;
      //   }
      //   img {
      //     width: 50%;
      //     height: 50%;
      //   }
      // }

      .box {
        margin-top: 25vh * @h;
        margin-right: 12vw * @w;
        margin-left: 12vw * @w;
        width: 216vw * @w;
        // width: 50%;
        height: 120vh * @h;
        // height: 50%;
        float: left;
        position: relative;
        cursor: pointer;
        // padding: 5px;
        .c {
          background: url(../../../../assets/images/majorFestivalsConductor/bg_l.png)
            center no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
          height: 100%;
          width: 100%;
          .img {
            position: absolute;
            width: 45vw * @w;
            height: 45vh * @h;
            left: 25vw * @w;
            top: 45vh * @h;
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
            top: 35vh * @h;
            left: 85vw * @w;
            font-size: 25vh * @h;
          }
          .title {
            font-size: 20vh * @h;
            &.no_total_key {
              top: 48vh * @h;
            }
          }

          .num {
            font-size: 30vh * @h;
            top: 72vh * @h;
            color: white;
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

        &:nth-child(2),
        &:nth-child(8) {
          .c {
            background: url(../../../../assets/images/majorFestivalsConductor/bg_h.png)
              center no-repeat;
            background-size: 100% 100%;
          }
        }

        &:nth-child(3),
        &:nth-child(6) {
          .c {
            background: url(../../../../assets/images/majorFestivalsConductor/bg_lu.png)
              center no-repeat;
            background-size: 100% 100%;
          }
        }

        &:nth-child(4),
        &:nth-child(7) {
          .c {
            background: url(../../../../assets/images/majorFestivalsConductor/bg_q.png)
              center no-repeat;
            background-size: 100% 100%;
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