<!--
 * @Description: 清除地图打点
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-10-30 16:07:50
-->
<template>
  <div class="all-icons-box icon_draw-map" title="绘制地图">
    <svg
      @click="showDrawMap($event)"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="36px"
      height="36px"
      viewBox="0 0 36 36"
      enable-background="new 0 0 36 36"
      xml:space="preserve"
    >
      <image
        id="image0"
        width="36"
        height="36"
        x="0"
        y="0"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
RQflCh0PJQH2NhA+AAACuUlEQVRIx5XVz0tUURTA8WPSBKalEvbDQDcplIJD0g80IUdTs0U/6L8I
NdJo0bJNUGb2g1qMYYquohSyRRQhVqYj0UKyAqGQQB3N1NGGcL4t5s59d9688dm7m/cu737evYdz
zhNEjUxeUqqf3EYO3dzAY81YzChTFGyQ2ck4AE8tKsYEmGLfBpkMxoFpzjPDsxglCNmMGUwZh1yg
U8A0+xGKLCrKwDXNLNLtAm1ljFlKEIQDMUp4A0CERsX0myG0jV0ECFJNlo3qwyPMgaLaWaRPMakU
OjCfAQhxgiwCBDW1wCOhjjCx65NmevhJmiMTT3kRLhBhQjCpCE0IqfQSojqO2a2YUe5pKpMAQa4T
IYQv+lodfzR1iV5CVCnAY2MyEW7FUdE7nZAWBauaOcx3ig1mu5q/qaltNOA1M1uoNagmBOEICwyQ
n8BY1BLZ9hJJpKJMHhMAjMQxKep4SSChllVNrbgyViQTIJMaIF8xH2xMWyKTCAk1rALPXRlf/Dqn
Qqjhyf8yzpCwhy8ADNuY24qpTFyzHvN+44wT5M4UbATKTcK069j4mSHDDYox75IwlfgJU++2o2TM
Hc10GIwnGZTGVwDeJmX8/NVMCZPRYk2EClVGn3FkjuMHoAVB8BLkdXzjs5KwWFeQTzN31UwF93UN
tjgxMWgzs8xxMC5vTUaoJqSpJV4pJoVWyk2oBoB5g6pWzDIV6ptVBnVVMQ8Ic9aEOoBFRUUPuGZj
7NRlUnhImHPm0Tz8Ak7SFUfZGTs1bO2GIsoEoR74xiZSeQzMU0orsMwxh8QzqS7NzPBCEDqBZgQh
h0lgHi/l5Dn2BcFnUFcUM0i6sIXfrLCDo3Sq7rhGYxIkkWqLMohwGvjBR/VXG6KB3HUZQag0qEHS
o8HuUcQwF9nrStgpxSDCECM0J43IetQk/TEG+Qf4Hr1OBLrgKQAAACV0RVh0ZGF0ZTpjcmVhdGUA
MjAyMS0xMC0yOVQxMjozNzowMSswMzowMEU7KnIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAt
MjlUMTI6Mzc6MDErMDM6MDA0ZpLOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccll
PAAAAABJRU5ErkJggg=="
      />
    </svg>
    <div class="show-draw-layer" v-show="layerShow">
      <div class="show-draw-title">标绘</div>
      <!-- 范围-开始 -->
      <ul>
        <li
          class="km-li"
          v-for="(i, k) in kmList"
          :key="i.id"
          :class="[
            chosedObj.id === i.id && chosedObj.type === i.type
              ? 'click-li'
              : '',
          ]"
          @click="doClickKMli(i, k)"
        >
          {{ i.title }}
        </li>
      </ul>
      <!-- 标志图案-开始 -->
      <ul>
        <li
          v-for="(i, k) in iconList"
          :key="i.id"
          class="icon-li"
          :class="[
            chosedObj.id === i.id && chosedObj.type === i.type
              ? 'click-li'
              : '',
          ]"
          v-html="i.icon"
          @click="doClickKMli(i, k)"
        ></li>
      </ul>
      <!-- 颜色-开始 -->
      <div class="chose-color">
        <p>颜色</p>
        <span
          @click="doShowColor"
          :style="{ background: colorChoseObj.color }"
        ></span>
        <ul class="chose-color-list" v-show="colorListShow">
          <li
            v-for="(i, k) in colorList"
            :key="i.id"
            :title="i.title"
            :style="{ background: i.color }"
            :class="[
              colorChoseObj.id === i.id && colorChoseObj.type === i.type
                ? 'click-li'
                : '',
            ]"
            @click="doChoseColorList(i, k)"
          ></li>
        </ul>
      </div>
      <!--操作按钮 -->
      <div class="btn-wrap">
        <p @click="drawClearAll">清除</p>
        <p @click="drawClearAll(1)">撤回</p>
        <p @click="enSure">确定</p>
        <p @click="doClose">关闭</p>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcon from "./icon/svgIcon";
import { mapDrawTool } from "../../../../../../public/gzznGIS/Content/drawTool";
import {
  getIdsmApi,
  figurePosition,
  figurePositionDelete,
} from "@/api/map/index";
export default {
  data() {
    return {
      clickNum: 0,
      /* 展示层 */
      layerShow: false,
      chosedObj: {
        id: 1,
        title: "1KM",
        chosed: true,
        type: "KM",
      },
      kmList: [
        {
          id: 1,
          title: "1KM",
          chosed: false,
          type: "KM",
          graphType: "circle",
          range: 1,
        },
        {
          id: 2,
          title: "2KM",
          chosed: false,
          type: "KM",
          graphType: "circle",
          range: 2,
        },
        {
          id: 3,
          title: "3KM",
          chosed: false,
          type: "KM",
          graphType: "circle",
          range: 3,
        },
      ],
      iconList: [
        {
          id: 1,
          title: "旗帜",
          chosed: false,
          type: "icon",
          icon: svgIcon.flag,
          graphType: "point",
        },
        {
          id: 2,
          title: "椭圆形",
          chosed: false,
          type: "icon",
          icon: svgIcon.oval,
          graphType: "ellipse",
        },
        {
          id: 3,
          title: "长条形",
          chosed: false,
          type: "icon",
          icon: svgIcon.square,
          graphType: "Rect",
        },
        {
          id: 4,
          title: "星星",
          chosed: false,
          type: "icon",
          icon: svgIcon.start,
          graphType: "Polygon",
        },
        {
          id: 5,
          title: "笔",
          chosed: false,
          type: "icon",
          icon: svgIcon.pen,
          graphType: "line",
        },
      ],
      colorList: [
        { id: 1, color: "red", title: "红色", chosed: false, type: "color" },
        { id: 2, color: "green", title: "绿色", chosed: false, type: "color" },
        { id: 3, color: "yellow", title: "黄色", chosed: false, type: "color" },
        { id: 4, color: "orange", title: "橙色", chosed: false, type: "color" },
        {
          id: 5,
          color: "#00fff1",
          title: "青色",
          chosed: false,
          type: "color",
        },
        { id: 6, color: "blue", title: "蓝色", chosed: false, type: "color" },
      ],
      /* 选中的颜色 */
      colorChoseObj: {
        id: 1,
        color: "red",
        title: "红色",
        chosed: false,
        type: "color",
      },
      colorListShow: false,
    };
  },
  methods: {
    showDrawMap(e) {
      this.clickNum += 1;
      this.layerShow = !this.layerShow;
      this.$emit("showDrawMap", {
        clickNum: this.clickNum,
        show: this.layerShow,
      });
      if (this.layerShow) {
        let Layers = pGzznCore.findArray(mapDrawTool.drawList,"strType","1");
        if (!Layers) {
          this.queryFind();
        }
      } else {
        mapDrawTool.clear(null,"1");
        mapDrawTool.deleteSids = [];
      }
    },
    /* 公里点击 */
    doClickKMli(i, k) {
      this.chosedObj = i;
      this.chosedObj.chosed = true;
      this.$emit("doClickKMli", { ...this.chosedObj });
      this.selectDraw();
    },
    /* 点击选择颜色 */
    doShowColor() {
      this.colorListShow = !this.colorListShow;
    },
    doChoseColorList(i, k) {
      this.colorChoseObj = i;
      this.colorChoseObj.chosed = true;
      this.$emit("clickColor", { ...this.colorChoseObj });
      this.selectDraw();
    },
    selectDraw() {
      let objs = {
        type: this.chosedObj.graphType,
        color: this.colorChoseObj.color,
        strType:"1",
        showDrawTooltip:true
      };
      if (this.chosedObj.graphType == "circle" && this.chosedObj.range) {
        objs.range = this.chosedObj.range;
      }

      mapDrawTool.selectDrawTool(objs, (res) => {});
    },
    /* 确定 */
    enSure() {
      //this.layerShow = false;
      this.$emit("enSureLayer", {
        chosedObj: this.chosedObj,
        colorChoseObj: this.colorChoseObj,
      });
      this.querySave("saveBatch", true); //新增
      this.querySave("updateBatch"); //修改
      this.deleteMapDraw(); //删除对应图形
    },
    doClose() {
      this.layerShow = false;
      this.$emit("closeLayer");
      this.colorListShow = false;
      mapDrawTool.clear(null,"1");
      mapDrawTool.deleteSids = [];
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
              objs.pointLayerType = [];
              objs.labelShow = true;
              objs.text = item.name ? item.name : "";
              objs.color=objs.colour;
              objs.strType="1";
              mapDrawTool.selectRender(objs);
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
        if(lists[i].strType != "1"){continue;}
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
          colour: lists[i].objs && lists[i].objs.color ? lists[i].objs.color : ""
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
    drawClearAll(num){
      if(num){
        mapDrawTool.clear(num,"1");
      }else{
        mapDrawTool.clear(null,"1");
      }
    }
  },
  mounted(){
    this.$EventBus.$on("mapClearAll", () => {
        this.doClose();
    });
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.icon_draw-map {
  top: 163vh * @h;
  left: 1944vw * @w;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
