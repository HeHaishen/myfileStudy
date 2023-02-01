<!--
 * @Description: 事件和事件统计
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-10-10 15:34:21
 * @LastEditTime: 2021-11-06 17:10:11
-->
<template>
  <ModelBox :title="title" class="c-mybox-position" style="z-index: 888">
    <template slot="content">
      <div class="emergency-event-content">
        <div class="content-left">
          <div class="emergency-event-charts"></div>
        </div>
        <div class="content-right">
          <ul>
            <li
              v-for="(i, k) in listData"
              :key="k"
              :class="[(k + 1) % 2 === 1 ? 'li-bg-odd' : 'li-bg-db']"
            >
              <div :alt="i.xxbt" @click="clickEventLine(i, k)">
                {{ i.xxbt }}
              </div>
              <div>{{ i.sfsj.slice(0, 10) }}</div>
            </li>
          </ul>
        </div>
        <div class="rightTitle">
          <div class="more" @click="onMore">更多</div>
        </div>
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
  </ModelBox>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox/index.vue";
import UpView from "./upView.vue";
import DetailView from "./detailView.vue"
import { getIdsmApi } from "@/api/idsm"; //  接口
export default {
  components: { ModelBox, UpView, DetailView },
  data() {
    return {
      title: "应急事件",
      emergencyEventCharts: null,
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
      this.doGetFiveDayEvent(() => {
        this.initChart();
      });
    });
  },
  methods: {
    initChart() {
      this.emergencyEventCharts = this.$echarts.init(
        document.getElementsByClassName("emergency-event-charts")[0]
      );
      this.emergencyEventCharts.setOption(this.setChart());
      let that = this;
      window.onresize = function () {
        that.emergencyEventCharts.resize();
      };
    },
    setChart() {
      // let xLabel = this.chartXData;
      // let goToSchool = this.chartYData;
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "transparent",
        },
        legend: {
          show: false,
          align: "left",
          right: "5%",
          top: "0",
          type: "plain",
          textStyle: {
            color: "#7ec7ff",
          },
          // icon:'rect',
          data: [
            {
              name: "最近五天事件",
            },
          ],
        },
        grid: {
          top: "10%",
          left: "10%",
          right: "10%",
          bottom: "15%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "#233653",
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#7ec7ff",
              },
              formatter: function (data) {
                return data;
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#192a44",
              },
            },
            axisTick: {
              show: false,
            },
            data: that.chartXData,
          },
        ],
        yAxis: [
          {
            name: "件",
            nameTextStyle: {
              color: "#7ec7ff",
              fontSize: 16,
              padding: 10,
            },
            min: 0,
            splitLine: {
              show: false,
              lineStyle: {
                color: "#192a44",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#233653",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#7ec7ff",
              },
              formatter: function (value) {
                if (value === 0) {
                  return value;
                }
                return value;
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "最近五天事件",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                color: "#00ffff", // 线条颜色
              },
              borderColor: "#00ffff",
            },
            itemStyle: {
              color: "#00ffff",
              borderColor: "#00ffff",
              borderWidth: 2,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: that.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(25,163,223,.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(25,163,223, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: that.chartYData,
          },
        ],
      };
      return option;
    },
    // 获取事件列表
    doGetEventList() {
      getIdsmApi("XiZd79n8", { body: {} })
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.data) {
              this.listData = res.body.data;
            } else {
              this.listData = [];
            }
          } else {
            this.listData = [];
          }
        })
        .catch((err) => {
          if (err) {
            this.listData = [];
          }
        });
    },
    // 获取五天事件统计
    doGetFiveDayEvent(callBack = () => {}) {
      getIdsmApi("dDtDnvhD", { body: {} })
        .then(async (res) => {
          if (res.success) {
            console.log("五日事件列表", res);
            if (res.body && res.body.data) {
              // this.listData = res.body.data;
              let xData = [];
              let yData = [];
              let arr = res.body.data.map((i, k) => {
                yData.push(i.num);
                xData.push(i.today.slice(5, i.today.length));
              });
              let awaitArr = await arr;
              this.chartXData = JSON.parse(JSON.stringify(xData));
              this.chartYData = JSON.parse(JSON.stringify(yData));
              callBack();
            } else {
              this.listData = [];
            }
          } else {
            this.listData = [];
          }
        })
        .catch((err) => {
          if (err) {
            this.listData = [];
          }
        });
    },
    //  点击事件
    clickEventLine(i, k) {
      this.onGPS(i);
      this.detailShow = true;
      console.log(i)
      this.getRemoteDetail(i.sid)
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
    getRemoteDetail(sid) {
      getIdsmApi("XiZd79n8", { body: { jbbh: sid } }).then((res) => {
        if (res.success) {
          console.log(res)
        }
      });
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
