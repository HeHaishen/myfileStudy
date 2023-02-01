<template>
  <div class="water-right">
    <div class="water-table">
      <p v-for="(item, index) in listData" :key="index">
        <span style="color:white;">{{ areaName(item.yjqjqh) }}</span>
        <span :style="{ color: levelColor(item.alarmGrade) }">{{
          item.alarmInfo ? item.alarmInfo : "暂无"
        }}</span>
      </p>
    </div>
    <div class="prediction-charts xin-chart-default" ref="PredictionCharts"></div>
  </div>
</template>

<script>
import guangzhouJson from "./GuangZhou";
import { imgIcon } from "./icon.js";
import moment from "moment";
import { meteorologicalWarningTable } from "@/api/theCityThreeProofing";
export default {
  name: "WeatherPrediction",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      listData: [],
      msgList: {}, //气象信息图片数据
       pagination: { current: 1, pageSize: 10, total: 0 },
    };
  },
  watch: {},
  computed: {},
  created() {},
  beforeDestroy() {
    this.predictionCharts && this.predictionCharts.dispose();
    window.removeEventListener("resize", this.onResize, false);
  },
  mounted() {
    this.initTable();
    window.addEventListener("resize", this.onResize, false);
  },
  methods: {
    initTable() {
      const data = {
        body: {
          yjzon: 440100000000,
          beginTime: moment().startOf("day").format("YYYY-MM-DD HH:mm"),
          endTime: moment().endOf("day").format("YYYY-MM-DD HH:mm"),
        },
        page: this.pagination.current,
        pageSize: 11,
        sortName: "sid",
        sortOrder: "desc",
      };
      meteorologicalWarningTable(data).then((res) => {
        let listData = [
          { yjqjqh: "440103" },
          { yjqjqh: "440104" },
          { yjqjqh: "440105" },
          { yjqjqh: "440106" },
          { yjqjqh: "440111" },
          { yjqjqh: "440112" },
          { yjqjqh: "440113" },
          { yjqjqh: "440114" },
          { yjqjqh: "440115" },
          { yjqjqh: "440117" },
          { yjqjqh: "440118" },
        ];
        this.listData = res.body.data;
        this.pagination.total = res.body.total * 1;
        let msgList = {};

        for (let i = 0; i < listData.length; i++) {
          for (let k = 0; k < this.listData.length; k++) {
            if (listData[i]["yjqjqh"] == this.listData[k]["yjqjqh"]) {
              listData[i] = this.listData[k];
            }
          }
        }
        this.listData = [...listData];
        this.listData.forEach((item) => {
          if (item.alarmGrade > 2) {
            if (!msgList[item.yjzldj]) {
              msgList[item.yjzldj] = [];
            }
            msgList[item.yjzldj].push({
              name: this.areaName(item.yjqjqh),
              type: item.yjzldj,
              manager: item.alarmInfo,
              issueTime: item.issueTime,
              value: this.areaAxis(item.yjqjqh),
            });
          }
        });
        // console.log(listData);
        this.msgList = msgList;

        // 拿到数据后初始化图表
        this.initCharts();
      });
    },
    // 左侧列表文字颜色
    levelColor(value) {
      if (!value) {
        return "white";
      }
      switch (String(value)) {
        case "1":
          return "gray";
        case "2":
          return "skyblue";
        case "3":
          return "rgb(224, 178, 26)";
        case "4":
          return "orange";
        case "5":
          return "red";
      }
    },
    // 区域编码转名称
    areaName(value) {
      switch (String(value)) {
        case "440103":
          return "荔湾区";
        case "440104":
          return "越秀区";
        case "440105":
          return "海珠区";
        case "440106":
          return "天河区";
        case "440111":
          return "白云区";
        case "440112":
          return "黄埔区";
        case "440113":
          return "番禺区";
        case "440114":
          return "花都区";
        case "440115":
          return "南沙区";
        case "440117":
          return "从化区";
        case "440118":
          return "增城区";
      }
    },
    // 区域中心左边转换
    areaAxis(value) {
      switch (String(value)) {
        case "440111":
          return [113.262831, 23.162281, 141];
        case "440106":
          return [113.335367, 23.13559, 141];
        case "440118":
          return [113.829579, 23.290497, 141];
        case "440103":
          return [113.243038, 23.124943, 141];
        case "440104":
          return [113.280714, 23.125624, 141];
        case "440105":
          return [113.262008, 23.103131, 141];
        case "440112":
          return [113.450761, 23.103239, 141];
        case "440113":
          return [113.364619, 22.938582, 141];
        case "440114":
          return [113.211184, 23.39205, 141];
        case "440115":
          return [113.53738, 22.794531, 141];
        case "440117":
          return [113.587386, 23.545283, 141];
      }
    },
    // 初始化图表
    initCharts() {
      // this.$nextTick(()=>{
        const divs = document.querySelector(".xin-chart-default")
        console.log(divs)
        this.predictionCharts = this.$echarts.init(divs);
        this.$echarts.registerMap("guangzhou", guangzhouJson.guangzhou);
        this.handleOption();
      // })
    },
    handleOption() {
      const msgList = this.msgList;
      console.log(msgList);
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          formatter: (e, t, n) => {
            if (e.componentSubType == "scatter") {
              return `${e.name}：${e.seriesName}`;
            } else {
              return `${e.name}`;
            }
          }, //悬浮展示格式
        },
        legend: {
          orient: "horizontal",
          id: 1,
          top: "top",
          left: "left",
          itemWidth: 40,
          itemHeight: 40,
          itemGap: -60,
          show: true,
          formatter: "",
          data: [
            {
              name: "高温黄色预警",
              icon: imgIcon["gw"],
            },
            {
              name: "雷雨黄色预警",
              icon: imgIcon["ly"],
            },
            {
              name: "暴雨黄色预警",
              icon: imgIcon["by"],
            },
            {
              name: "暴雨橙色预警",
              icon: imgIcon["by2"],
            },
            {
              name: "台风白色预警",
              icon: imgIcon["tf"],
            },
            {
              name: "暴雨红色预警",
              icon: imgIcon["by3"],
            },
          ],
          textStyle: {
            color: "white",
            opacity: 0,
          },
        },
        geo: {
          show: true,
          map: "guangzhou",
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          zoom: 1.1,
          // roam: true,
          itemStyle: {
            normal: {
              areaColor: "transparent",
              borderColor: "#3fdaff",
              borderWidth: 2,
              shadowColor: "rgba(63, 218, 255, 0.5)",
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        visualMap: {
          min: 0,
          max: 11,
          right: 26,
          bottom: 40,
          show: false,
          showLabel: false,
          pieces: [
            {
              value: 1,
              label: "越秀",
              color: "#DACCE0",
            },
            {
              value: 2,
              label: "南沙",
              color: "#FCBC28",
            },
            {
              value: 3,
              label: "海珠",
              color: "#6BC629",
            },
            {
              value: 4,
              label: "白云",
              color: "#FCF0C0",
            },
            {
              value: 5,
              label: "天河",
              color: "#63C999",
            },
            {
              value: 6,
              label: "黄埔",
              color: "#89C8EA",
            },
            {
              value: 7,
              label: "番禺",
              color: "#1EB2EE",
            },
            {
              value: 8,
              label: "花都",
              color: "#10A9EB",
            },
            {
              value: 9,
              label: "从化",
              color: "#6CC629",
            },
            {
              value: 10,
              label: "增城",
              color: "#DECADF",
            },
            {
              value: 11,
              label: "荔湾",
              color: "#FBBA28",
            },
          ],
          textStyle: {
            fontSize: 18,
            color: "#fff",
          },
        },

        series: [
          {
            name: "广州市数据",
            type: "map",
            mapType: "guangzhou", // 自定义扩展图表类型
            showLegendSymbol: false, // 存在legend时显示
            // 悬浮样式
            zoom: 1.1,
            // roam: true,
            label: {
              //显示名称
              show: true,
              color: "#fff",
              emphasis: {
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#F0FBED",
                borderColor: "#ccc",
                borderWidth: 1,
              },
              emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              },
            },
            data: [
              { name: "白云区", value: 1 },
              { name: "天河区", value: 2 },
              { name: "增城区", value: 3 },
              { name: "荔湾区", value: 4 },
              { name: "越秀区", value: 5 },
              { name: "海珠区", value: 6 },
              { name: "黄埔区", value: 7 },
              { name: "番禺区", value: 8 },
              { name: "花都区", value: 9 },
              { name: "南沙区", value: 10 },
              { name: "从化区", value: 11 },
            ],
            // 自定义名称映射
            nameMap: {
              Baiyun: "白云区",
              Tianhe: "天河区",
              Zengcheng: "增城区",
              Liwan: "荔湾区",
              Yuexiu: "越秀区",
              Haizhu: "海珠区",
              Huangpu: "黄埔区",
              Panyu: "番禺区",
              Huadu: "花都区",
              Nansha: "南沙区",
              Conghua: "从化区",
            },
          },
          {
            name: "高温黄色预警",
            type: "scatter",
            coordinateSystem: "geo",
            data: msgList["HIGHTEM-3"],
            symbol: imgIcon["gw"],
            symbolSize: function (val) {
              return val[2] / 4;
            },
          },
          {
            name: "雷雨黄色预警",
            type: "scatter",
            coordinateSystem: "geo",
            data: msgList["TDWIND-3"],
            symbol: imgIcon["ly"],
            symbolSize: function (val) {
              return val[2] / 4;
            },
          },
          {
            name: "暴雨黄色预警",
            type: "scatter",
            coordinateSystem: "geo",
            data: msgList["RAIN-3"],
            symbol: imgIcon["by"],
            symbolSize: function (val) {
              return val[2] / 4;
            },
          },
          {
            name: "暴雨橙色预警",
            type: "scatter",
            coordinateSystem: "geo",
            data: msgList["RAIN-4"],
            symbol: imgIcon["by2"],
            symbolSize: function (val) {
              return val[2] / 4;
            },
          },
          {
            name: "台风白色预警",
            type: "scatter",
            coordinateSystem: "geo",
            data: msgList["TDWIND-1"],
            symbol: imgIcon["tf"],
            symbolSize: function (val) {
              return val[2] / 4;
            },
          },
          {
            name: "暴雨红色预警",
            type: "scatter",
            coordinateSystem: "geo",
            data: msgList["RAIN-5"],
            symbol: imgIcon["by3"],
            symbolSize: function (val) {
              return val[2] / 4;
            },
          },
        ],
      };
      this.predictionCharts.setOption(option);
      // 解决初始加载无法继承父级宽高问题
      this.$nextTick(() => {
        this.predictionCharts.resize();
      });
    },
    onResize() {
      this.predictionCharts && this.predictionCharts.resize();
    },
  },
};
</script>
<style lang="less" scoped>
@w:100 /6400;
// @h:100 /1079;
@h:100 /900;
.water-right {
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  position: relative;
  .water-table {
    position: absolute;
    left: 2%;
    top: 20%;
    font-size: 16vh*@h;
    span + span {
      margin-left: 20vw*@w;
    }
  }

  .prediction-charts {
    width: 100%;
    height: 100%;
  }
}
</style>
