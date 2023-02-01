<!--
 * @Description: 事件和事件统计
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-10 15:34:21
 * @LastEditTime: 2021-10-14 20:16:52
-->
<template>
  <div>
    <ModelBox :title="title" class="c-mybox-position" style="z-index: 8100">
      <template slot="content">
        <div class="emergency-event-content">
          <div class="event-inner">
            <ul>
              <li @click="liClickEvent(1)">
                <div>
                  <p class="icon">
                    <img
                      src="../../../../assets/images/majorFestivalsConductor/icon_event.png"
                    />
                  </p>
                  <p class="name">突发事件</p>
                </div>
                <div>
                  <p style="color: #2790fd">{{ statusObj.tfsj }}</p>
                </div>
              </li>
              <li @click="liClickEvent(2)">
                <div>
                  <p class="icon">
                    <img
                      src="../../../../assets/images/majorFestivalsConductor/icon_new.png"
                    />
                  </p>
                  <p class="name">舆情监控</p>
                </div>
                <div>
                  <p style="color: #fd8232">{{ statusObj.yqjk }}</p>
                </div>
              </li>
              <li @click="liClickEvent(3)">
                <div>
                  <p class="icon">
                    <img
                      src="../../../../assets/images/majorFestivalsConductor/icon_plan.png"
                    />
                  </p>
                  <p class="name">应急预案</p>
                </div>
                <div>
                  <p style="color: #fee845">{{ statusObj.yjya }}</p>
                </div>
              </li>
              <li @click="liClickEvent(4)">
                <div>
                  <p class="icon">
                    <img
                      src="../../../../assets/images/majorFestivalsConductor/icon_message.png"
                    />
                  </p>
                  <p class="name">靶向短信</p>
                </div>
                <div>
                  <p style="color: #01e99d">{{ statusObj.bxdx }}</p>
                </div>
              </li>
            </ul>
          </div>
          <!--  <div class="rightTitle">
          <div class="more" @click="onMore">更多</div>
        </div> -->
        </div>
      </template>
    </ModelBox>
    <pop-up-layer
      v-if="moreShow"
      :show="moreShow"
      @doClose="moreClose"
      opsition="pageCenter"
      title="应急事件-更多"
      ref="myPopUpLayer"
    >
      <div slot="content" class="upLayer_content">
        <UpView />
      </div>
    </pop-up-layer>
    <pop-up-layer
      v-if="detailShow"
      :show="detailShow"
      @doClose="detailClose"
      opsition="pageCenter"
      title="应急事件-详情"
      ref="myPopUpLayer"
    >
      <div slot="content" class="detail-upLayer_content">
        <DetailView />
      </div>
    </pop-up-layer>
  </div>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox/index.vue";
import UpView from "./upView.vue";
import DetailView from "./detailView.vue";
import { getIdsmApi } from "@/api/idsm"; //  接口
export default {
  components: { ModelBox, UpView, DetailView },
  data() {
    return {
      title: "应急事件",
      statusObj: {
        bxdx: "",
        tfsj: "",
        yjya: "",
        yqjk: "",
      },
      listData: [],
      chartXData: [],
      chartYData: [],
      moreShow: false,
      detailShow: false,
      detailObj: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.doGetEventList();
    });
  },
  methods: {
    // 获取事件列表
    doGetEventList() {
      getIdsmApi("Q7OP0QQS", { body: {} })
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.data) {
              this.statusObj = res.body.data[0];
            } else {
              this.listData = {
                tfsj: "",
                yqjk: "",
                yjya: "",
                bxdx: "",
              };
            }
          } else {
            this.listData = {
              tfsj: "",
              yqjk: "",
              yjya: "",
              bxdx: "",
            };
          }
        })
        .catch((err) => {
          if (err) {
            this.listData = {
              tfsj: "",
              yqjk: "",
              yjya: "",
              bxdx: "",
            };
          }
        });
    },
    //每个模块点击
    liClickEvent(type) {
      let tfsj = () => {
        this.onMore();
      };
      let yqjk = () => {
        window.open(
          "https://xwarning.wrd.cn/?token=da4544f7de3041c99599e4685d5b9710"
        );
      };
      let yjya = () => {
        this.$emit("openPlan");
      };
      let bxdx = () => {
        window.open(
          "http://122.13.0.169:10000/msg/index.html#/login/operation"
        );
        // this.$MyMessage.warning('此功能暂未开放')
      };
      let typeObj = {
        1: tfsj,
        2: yqjk,
        3: yjya,
        4: bxdx,
      };
      typeObj[type]();
    },
    //  点击事件
    clickEventLine(i, k) {
      this.onGPS(i);
      this.detailShow = true;
      console.log(i);
      this.getRemoteDetail(i.sid);
    },
    onGPS(item) {
      let items = pGzznCore.deepClone(item);
      let columns = [
        { title: "名称", textIndex: "xxbt" },
        { title: "时间", textIndex: "sjsj" },
      ];
      pGzznCore.pointLayerRemove({ type: "defaultType" });
      var objs = {
        imgUrl: "gzznGIS/Image/forTeam.svg",
        type: "defaultType",
        layerName: "应急事件",
        info: columns,
        //phoneInfo:{phone:"fzryddh",name:"mc"}
      };

      items.lon = items.lon;
      items.sid = items.id ? items.id : 1;
      items.lat = items.lat;
      items.name = items.xxbt;
      pGzznCore.setPointLayerToMap([items], objs);
    },
    onMore() {
      this.moreShow = true;
    },
    moreClose() {
      this.moreShow = false;
    },
    detailClose() {
      this.detailShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.detail-upLayer_content {
  height: 650vh * @h;
  width: 750vw * @w;
}
</style>
