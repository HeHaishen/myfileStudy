<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-12 13:08:52
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-05 17:50:05
-->
<template>
  <div class="icon_top">
    <ul>
      <li>
        
        <img
          @click="layerFristShow = !layerFristShow"
          :class="[layerFristShow?'li-bg-color':'','li-bg']"
          src="@/assets/images/majorFestivalsConductor/layerIcon1.png"
          alt=""
        />

        <div class="map-flex-content" v-show="layerFristShow">
          <div
            style="width: 100%; height: auto"
            v-for="(item, index) in iconSelectOneObj"
            :key="index"
          >
            <p>
              <span
                @click="flexClickAllItem(item, index)"
                :class="[item.active ? 'active-span' : '']"
              >
                <i>{{ item.active ? "✔" : "" }} </i>
              </span>
              <label>{{ item.typeName }}</label>
            </p>
            <ul>
              <li v-for="(citem, cindex) in item.children" :key="cindex">
                <span
                  @click="flexClickliItem(item, index, citem, cindex)"
                  :class="[citem.active ? 'active-span' : '']"
                  >{{ citem.active ? "✔" : "" }}</span
                ><label>{{ citem.typeName }}</label>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <img
          @click="layerSecondShow = !layerSecondShow"
           src="@/assets/images/majorFestivalsConductor/layerIcon2.png"
          :class="[layerSecondShow?'li-bg-color':'','li-bg']"
          alt=""
        />
        <div class="FixedModel" v-show="layerSecondShow">
          <PcmapLayer />
        </div>
      </li>
      
       <!-- <li title="人流热力图" >
        <img
         @click="openHeatMapFn"
           src="@/assets/images/majorFestivalsConductor/layerIcon3.png"
          :class="[openHeatMap?'li-bg-color':'','li-bg']"
          alt=""
        />
      </li> -->
    </ul>
  </div>
</template>

<script>
import { fileTypeLon } from "@/api/dragonBoat";
import PcmapLayer from "@/components/mapLayer/pcindex.vue";
export default {
  components: { PcmapLayer },
  data() {
    return {
      layerFristShow: false,
      layerSecondShow: false,
      iconSelectOneObj: [],
      openHeatMap:false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //选中
    flexClickliItem(item, index, citem, cindex) {
      this.iconSelectOneObj[index].children[cindex].active = !citem.active;
      if (this.iconSelectOneObj[index].children[cindex].active) {
        let childrenLength = this.iconSelectOneObj[index].children.length;
        let currentArr = this.iconSelectOneObj[index].children.filter(
          (i, k) => {
            if (i.active) {
              return i;
            }
          }
        );
        if (currentArr.length === childrenLength) {
          this.iconSelectOneObj[index].active = true;
        }
      } else {
        this.iconSelectOneObj[index].active = false;
      }
      this.iconSelectOneObj = JSON.parse(JSON.stringify(this.iconSelectOneObj));
      if (citem.type == "5") {
        //水位站
        pGzznCore.addPromiseWaterLevel(citem.active);
        WaterStationState = citem.active;
      } else if (citem.type == "4") {
        //隧道
        pGzznCore.addPromiseTunnel(citem.active);
      } else if (citem.type == "3") {
        //水浸点
        pGzznCore.addPromiseWaterloggingPoint(citem.active);
        WaterloggingPointState = citem.active;
      } else if (citem.type == "2") {
        //堤防
        pGzznCore.addPromiseBeware(citem.active);
      } else if (citem.type == "1") {
        //水库
        pGzznCore.addPromiseReservoirs(citem.active);
      } else if (citem.type == "6") {
        //雨量站
        pGzznCore.addPromiseRainfallStation(citem.active);
      } else if (
        citem.type == "440103" ||
        citem.type == "440104" ||
        citem.type == "440105" ||
        citem.type == "440106" ||
        citem.type == "440111" ||
        citem.type == "440112" ||
        citem.type == "440113" ||
        citem.type == "440114" ||
        citem.type == "440115" ||
        citem.type == "440183" ||
        citem.type == "440184"
      ) {
        //避难场所
        pGzznCore.addPromiseShelterArea(citem.type, citem.active);
      }
    },
    // 数据
    getFileTypeLon() {
      fileTypeLon().then((res) => {
        if (res.success) {
          this.iconSelectOneObj = JSON.parse(JSON.stringify(res.body));
        }
      });
    },

    //标题选择
    flexClickAllItem(item, index) {
      console.log(item, index);
      let is_Bool = true;
      this.iconSelectOneObj[index].active = JSON.parse(
        JSON.stringify(!item.active)
      );
      console.log(this.iconSelectOneObj[index].active);
      this.iconSelectOneObj = JSON.parse(JSON.stringify(this.iconSelectOneObj));
      if (this.iconSelectOneObj[index].active) {
        is_Bool = true;
        this.iconSelectOneObj[index].children.map((citem, cindex) => {
          this.iconSelectOneObj[index].children[cindex].active = true;
        });
      } else {
        is_Bool = false;
        this.loopMap(this.iconSelectOneObj[index].children, false);
      }
      for (let i = 0; i < item.children.length; i++) {
        let citem = item.children[i];
        if (citem.type == "5") {
          //水位站
          pGzznCore.addPromiseWaterLevel(is_Bool);
          WaterStationState = is_Bool;
        } else if (citem.type == "4") {
          //隧道
          pGzznCore.addPromiseTunnel(is_Bool);
        } else if (citem.type == "3") {
          //水浸点
          pGzznCore.addPromiseWaterloggingPoint(is_Bool);
        } else if (citem.type == "2") {
          //堤防
          pGzznCore.addPromiseBeware(is_Bool);
        } else if (citem.type == "1") {
          //水库
          pGzznCore.addPromiseReservoirs(is_Bool);
        } else if (citem.type == "6") {
          //雨量站
          pGzznCore.addPromiseRainfallStation(is_Bool);
        } else if (
          citem.type == "440103" ||
          citem.type == "440104" ||
          citem.type == "440105" ||
          citem.type == "440106" ||
          citem.type == "440111" ||
          citem.type == "440112" ||
          citem.type == "440113" ||
          citem.type == "440114" ||
          citem.type == "440115" ||
          citem.type == "440183" ||
          citem.type == "440184"
        ) {
          //避难场所
          pGzznCore.addPromiseShelterArea(citem.type, is_Bool);
        }
      }
    },
    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },
       openHeatMapFn() {
      this.openHeatMap=!this.openHeatMap
      window.open("http://122.13.0.169:10001/anov/canton-fair/#/ssjc");
    },

  },
  created() {},
  mounted() {
    this.getFileTypeLon();
  },
};
</script>
<style lang='less' scoped>
@import "./index.less";
.layerShow {
  border: 1px #00ffff solid;
  .box-sizing();
}




/deep/.ant-input-suffix{
  font-size: 35vh*@h !important;
}
</style>