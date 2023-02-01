<!--
 * @Description: 地图测试页面
 * @Version: 1.0
 * @Autor: liangmeiping
-->
<template>
  <div class="major-wrap">
    <div class="major-contents">
      <div class="show-map">
        <div id="crystalContainer">
          <div
            id="envCenterInfo"
            class="status-bar"
            style="left: 0px; right: 0px; bottom: 0px"
          >
            <div id="camera_alt">视点高：NaN米</div>
            <div id="env_alt">海拔：NaN米</div>
            <div id="env_lat">纬度：NaN</div>
            <div id="env_lon">经度：NaN</div>
          </div>
        </div>
      </div>
      <div style="padding: 5px" class="mapDrawTool">
        <div class="input-group" style="padding-top: 5px; padding-left: 10px">
          <img
            @click="mapDrawCircle({ type: 'circle' }, queryPoint)"
            title="画圆"
            src="../../assets/images/map/circle.svg"
            alt="圆"
            style="
              width: 30px;
              height: 30px;
              margin-left: 20px;
              cursor: pointer;
            "
          />
          <img
            @click="mapDrawCircle({ type: 'circle', range: 1 })"
            title="画圆1公里"
            src="../../assets/images/map/circle.svg"
            alt="圆"
            style="
              width: 30px;
              height: 30px;
              margin-left: 20px;
              cursor: pointer;
            "
          />
          <img
            @click="mapDrawCircle({ type: 'circle', range: 3 })"
            title="画圆3公里"
            src="../../assets/images/map/circle.svg"
            alt="圆"
            style="
              width: 30px;
              height: 30px;
              margin-left: 20px;
              cursor: pointer;
            "
          />
          <img
            @click="mapDrawCircle({ type: 'point' })"
            title="标点"
            src="../../assets/images/map/flag.svg"
            alt="旗织"
            style="
              width: 34px;
              height: 34px;
              margin-left: 20px;
              cursor: pointer;
            "
          />
        </div>
        <div class="input-group" style="padding-top: 10px; padding-left: 10px">
          <img
            @click="mapDrawCircle({ type: 'ellipse' }, queryPoint)"
            title="椭圆"
            src="../../assets/images/map/circle.svg"
            alt="椭圆"
            style="
              width: 30px;
              height: 30px;
              margin-left: 20px;
              cursor: pointer;
            "
          />
          <img
            @click="mapDrawCircle({ type: 'Rect' })"
            title="画矩形"
            src="../../assets/images/map/rectangle.svg"
            alt="矩形"
            style="
              width: 30px;
              height: 30px;
              margin-left: 17px;
              cursor: pointer;
            "
          />
          <img
            @click="mapDrawCircle({ type: 'Polygon' })"
            title="画多边形"
            src="../../assets/images/map/rectangle.svg"
            alt="多边形"
            style="
              width: 30px;
              height: 30px;
              margin-left: 20px;
              cursor: pointer;
            "
          />
          <img
            @click="mapDrawCircle({ type: 'line' })"
            title="画线"
            src="../../assets/images/map/line.svg"
            alt="线条"
            style="
              width: 34px;
              height: 34px;
              margin-left: 20px;
              cursor: pointer;
            "
          />
        </div>
        <div
          class="input-group text-right"
          style="width: 100%; padding-top: 20px"
        >
          <input
            id="btnCenterClear"
            @click="mapDrawClear(1)"
            title="清除所有标绘"
            type="button"
            class="btn btn-danger"
            value="清空"
            style="width: 80px; margin-right: 20px"
          />
          <input
            id="btnCenterDel"
            @click="mapDrawClear(2)"
            title="删除前一个标绘"
            type="button"
            class="btn btn-danger"
            value="删除"
            style="width: 80px; margin-right: 20px"
          />
          <input
            id="btnCenterXY"
            @click="mapDrawClear(3)"
            title="保存所有标绘"
            type="button"
            class="btn btn-primary"
            value="确定"
            style="width: 80px; margin-right: 20px"
          />
        </div>
        <div style="padding-top: 10px">
          <input
            @click="mapDrawClear(4)"
            title="放大"
            type="button"
            class="btn btn-primary"
            value="放大"
            style="width: 80px; margin-right: 20px"
          />
          <input
            @click="mapDrawClear(5)"
            title="缩小"
            type="button"
            class="btn btn-primary"
            value="缩小"
            style="width: 80px; margin-right: 20px"
          />
          <input
            @click.stop.prevent="mapDrawClear(6)"
            title="影像"
            type="button"
            class="btn btn-primary"
            value="影像"
            style="width: 80px; margin-right: 20px"
          />
        </div>
        <div style="padding-top: 10px">           
          <input
            @click="selectMeasure({type:'line'})"
            title="测距"
            type="button"
            class="btn btn-primary"
            value="测距"
            style="width: 80px; margin-right: 20px"
          />
           <input
            @click="selectMeasure({type:'Polygon'})"
            title="测面"
            type="button"
            class="btn btn-primary"
            value="测面"
            style="width: 80px; margin-right: 20px"
          />
          <input
            @click="measureClear"
            title="清除测量"
            type="button"
            class="btn btn-primary"
            value="清除测量"
            style="width: 80px; margin-right: 20px;"
          />
        </div>
        <div style="padding-top: 10px">
          <input
            @click="measureClear(1)"
            title="清除最后一个测量"
            type="button"
            class="btn btn-primary"
            value="删除测量"
            style="width: 80px; margin-right: 20px;"
          />
           <input
            @click="heightToZoom"
            title="获取zoom"
            type="button"
            class="btn btn-primary"
            value="zoom"
            style="width: 80px; margin-right: 20px;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapDrawTool } from "../../../public/gzznGIS/Content/drawTool";
import { measureTool } from "../../../public/gzznGIS/Content/measureTool";

import Vue from "vue";
Vue.prototype.$EventBus = new Vue();

import {
  getIdsmApi,
  figurePosition,
  figurePositionDelete,
} from "@/api/map/index";
import TreeItemVue from "../../components/VueTree/TreeItem.vue";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    mapInit() {
      pGzznCore = new gzznCore("crystalContainer", {
        imageryProviderViewModelsIndex: 1,
      });
      pGzznCore.gzLineightColour = true;
      // pGzznCore.FlyTo(1, () => {
      if (!mapDrawTool.viewer && pGzznCore.viewer) {
        mapDrawTool.viewer = pGzznCore.viewer;
      }
      mapDrawTool.initToolLocation();
      this.queryFind();
      // });
      document.getElementById("envCenterInfo").style.right = "0";
    },
    //查询全部标绘图形回来
    queryFind() {
      let datas = {
        body: {},
        page: -1,
      };
      figurePosition("find", datas).then((res) => {
        if (res.success) {
          if (res.body && res.body.length > 0) {
            res.body.forEach((item) => {
              var objs = pGzznCore.deepClone(item);
              objs.pointLayerType = [
                "defaultTypebaseChannels",
                "defaultTypebaseCorpInfo",
              ];
              objs.labelShow = true;
              objs.text = item.name ? item.name : "";
              objs.color = objs.colour;
              if (objs.type != "point" && objs.type != "line") {
                mapDrawTool.selectRender(objs, (res) => {
                  //this.queryPoint(res);
                });
              } else {
                mapDrawTool.selectRender(objs);
              }
            });
          }
        }
      });
    },
    //保存、修改
    querySave(codes, isflag) {
      let lists = mapDrawTool.drawList;
      let QueryDatas = this.getQueryDatas(isflag);
      let datas = QueryDatas.datas;
      let sidList = QueryDatas.sidList;
      if (datas.length > 0) {
        //codes ："saveBatch" / "update"
        figurePosition(codes, datas).then((res) => {
          if (res.success) {
            if (isflag) {
              sidList.forEach((item, index) => {
                lists[item].sid = res.body[index];
              });
            }
          }
        });
      }
    },
    getQueryDatas(isflag) {
      let lists = mapDrawTool.drawList;
      let datas = [];
      let sidList = [];
      for (let i = 0; i < lists.length; i++) {
        if (isflag) {
          if (lists[i].sid) {
            continue;
          }
        } else {
          if (!lists[i].sid) {
            continue;
          }
        }

        sidList.push(i);
        let objs = {
          type: lists[i].type,
          lats: lists[i].geometry.lat.join(","),
          lons: lists[i].geometry.lon.join(","),
          name: lists[i].name ? lists[i].name : "",
          colour:
            lists[i].objs && lists[i].objs.color ? lists[i].objs.color : "",
        };
        if (lists[i].type == "circle" || lists[i].type == "ellipse") {
          objs.lon = lists[i].center[0];
          objs.lat = lists[i].center[1];
          objs.radius = lists[i].radius;
        }
        if (lists[i].sid) {
          objs.sid = lists[i].sid;
        }
        datas.push(objs);
      }
      return { datas: datas, sidList: sidList };
    },
    //删除
    deleteMapDraw() {
      let lists = mapDrawTool.deleteSids;
      if (lists.length == 0) {
        return;
      }
      let datas = {
        body: lists,
      };
      figurePositionDelete("delete", datas).then((res) => {
        if (res.success) {
          mapDrawTool.deleteSids = [];
        }
      });
    },
    //绘制圆
    mapDrawCircle(objs) {
      //pGzznCore.measureInit({'Flag':parseFloat(num)})
      objs.pointLayerType = [
        "defaultTypebaseChannels",
        "defaultTypebaseCorpInfo",
      ];
      objs.isFlagPopule = true;
      objs.showDrawTooltip = true;
      if (objs.type != "point" && objs.type != "line") {
        mapDrawTool.selectDrawTool(objs, (res) => {
          //this.queryPoint(res);
        });
      } else {
        mapDrawTool.selectDrawTool(objs);
      }
    },
    mapDrawClear(num) {
      if (parseFloat(num) == 1) {
        mapDrawTool.clear();
      } else if (parseFloat(num) == 2) {
        mapDrawTool.clear(1);
      } else if (parseFloat(num) == 3) {
        this.querySave("saveBatch", true); //新增
        this.querySave("updateBatch"); //修改
        this.deleteMapDraw(); //删除对应图形
      } else if (parseFloat(num) == 4) {
        // console.log(pGzznCore.viewer.camera.getMagnitude());
        // pGzznCore.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000;
        // const height =
        //   pGzznCore.viewer.scene.camera.positionCartographic.height;
        // const realAmount = height / 2;
        const minHeight = parseFloat(
          pGzznCore.viewer.scene.camera.positionCartographic.height
        );
        //console.log(realAmount,"realAmount");
        if (minHeight > 1000) {
          $(".navigation-control-icon-zoom-in").click();
          //pGzznCore.viewer.camera.zoomIn(realAmount);
        }
      } else if (parseFloat(num) == 5) {
        //pGzznCore.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000;
        // const height =
        //   pGzznCore.viewer.scene.camera.positionCartographic.height;
        // const realAmount =
        //   (3 * height) / Math.log(height);
        const maxHeight = parseFloat(
          pGzznCore.viewer.scene.camera.positionCartographic.height
        );
        if (maxHeight < 600000) {
          //pGzznCore.viewer.camera.zoomOut(realAmount);
          $(".navigation-control-icon-zoom-out").click();
        }
      } else if (parseFloat(num) == 6) {
        if (
          $(
            ".crystal-viewer-toolbar .crystal-baseLayerPicker-dropDown.crystal-baseLayerPicker-dropDown-visible"
          ).length > 0
        ) {
          $(
            ".crystal-viewer-toolbar .crystal-baseLayerPicker-dropDown.crystal-baseLayerPicker-dropDown-visible"
          ).removeClass("crystal-baseLayerPicker-dropDown-visible");
        } else {
          $(
            ".crystal-viewer-toolbar .crystal-baseLayerPicker-dropDown"
          ).addClass("crystal-baseLayerPicker-dropDown-visible");
        }
        //$("button.crystal-button.crystal-toolbar-button>img").click();
      }
    },
    queryPoint(items) {
      var that = this;
      let params = items.geometry;
      // var pParam = {
      //   latArr: params.lat.join(","),
      //   lonArr: params.lon.join(","),
      //   str: ["baseChannels", "baseCorpInfo"].join(","),
      // };
      let vueParams = new FormData();
      vueParams.append("latArr", params.lat.join(","));
      vueParams.append("lonArr", params.lon.join(","));
      vueParams.append("str", ["baseChannels", "baseCorpInfo"].join(","));
      getIdsmApi("findPolygonData", vueParams).then((res) => {
        if (res.success) {
          if (res.body) {
            if (res.body.baseChannels && res.body.baseChannels.length > 0) {
              let baseChannelsType = items.pointLayerType.find((str) => {
                return str.indexOf("baseChannels") != -1;
              });
              that.setLayerToMap(res.body.baseChannels, baseChannelsType);
            }

            if (res.body.baseCorpInfo && res.body.baseCorpInfo.length > 0) {
              let baseCorpInfoType = items.pointLayerType.find((str) => {
                return str.indexOf("baseCorpInfo") != -1;
              });
              that.setLayerToMap(res.body.baseCorpInfo, baseCorpInfoType);
            }
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
      //pGzznCore.drawCircleOutline(params.geometry,null,"blue","line");
    },
    setLayerToMap(items, typeStr) {
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/command_center.png",
        imgSize: { width: 30, height: 26 },
        type: typeStr,
        layerName: "指挥中心",
        info: [{ title: "名称", textIndex: "name" }],
        //phoneInfo: { phone: "devOnePhone", name: "devOneFzr" },
        lonLat: { lon: "longitude", lat: "latitude" },
      };

      pGzznCore.setPointLayerToMap(items, objs);
    },
    heightToZoom() {
      function getZoom(height) {
        var A = 40487.57;
        var B = 0.00007096758;
        var C = 91610.74;
        var D = -40467.74;
        return Math.round(D + (A - D) / (1 + Math.pow(height / C, B)));
      }
      var height = Math.ceil(pGzznCore.viewer.camera.positionCartographic.height);
      var zoom = getZoom(height);
      console.log(zoom, "zoom");
    },
    selectMeasure(objs){
      measureTool.selectMeasure(objs)
    },
    measureClear(num){
      measureTool.clear(num)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mapInit();
      pGzznCore.mapClickTeamPhoneMessage = true;
    });
    $("#app").click((e) => {
      e.preventDefault();
      let lists = $(
        ".crystal-viewer-toolbar .crystal-baseLayerPicker-dropDown.crystal-baseLayerPicker-dropDown-visible"
      );
      if (lists && lists.length > 0) {
        lists.removeClass("crystal-baseLayerPicker-dropDown-visible");
      }
      e.stopPropagation();
    });
  },
  beforeDestroy() {
    pGzznCore = null;
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.show-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.small-and-change {
  width: auto;
  height: auto;
  font-size: 60vh * @h;
  color: #00ffff;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 8000;
  cursor: pointer;
  text-align: center;
}
.small-and-change-left {
  left: 986vw * @w;
}
.small-and-change-right {
  right: 986vw * @w;
}
.small-height-change-left {
  left: 60vw * @w;
}
.small-height-change-right {
  right: 60vw * @w;
}

.icon_heat_map {
  cursor: pointer;
  position: fixed;
  left: 1024vw * @w;
  bottom: 80vh * @h;
  width: 75vw * @w;
  height: 75vh * @h;
  z-index: 9999;
  background: rgba(22, 51, 55, 0.5);
  border: 1px #00ffff solid;
  transition: all 0.5s;

  &.hide {
    left: 50vw * @w;
  }

  &.gas_station {
    bottom: 170vh * @h;
    padding: 10vh * @h 10vw * @w;
  }

  &.ai_car {
    bottom: 260vh * @h;
  }

  &.command_center {
    bottom: 350vh * @h;
  }

  &.active {
    background: #dfebf5;
  }

  .icon_heat_map_layer {
    position: absolute;
    width: 600vw * @w;
    height: auto;
    background: rgba(15, 22, 24, 0.7);
    bottom: 0;
    left: 80vw * @w;
    z-index: 9999;
    padding: 15vh * @h 20vw * @w;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-align: center;
    span {
      color: white;
      padding: 20vh * @h 20vw * @w;
      &:hover {
        color: #1fb9d2;
      }
    }
  }
}
.layerIcon {
  transition: all 0.5s;
  &.hide {
    left: 50vw * @w;
  }
}

.mapDrawTool {
  padding: 5px;
  position: absolute;
  top: 10px;
  left: 10px;
  background: #6dc97dcc;
  border-radius: 5px;
}
</style>
