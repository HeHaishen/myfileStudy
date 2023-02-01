<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-07-22 11:39:23
-->
<template>
  <div class="city-hidden-danger-center">
    <div class="map-bg"></div>
    <div class="center-left-top">
      <div class="list" v-for="(item, i) in DataList" :key="i">
        <div class="name">
          {{ item.name }} <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="number">{{ item.number }}</div>
      </div>
    </div>
    <div class="center-right-select">
      <div
        class="select-item"
        v-for="(item, index) in selectThing"
        :key="index"
      >
        <p @click="openShow(item, index)">
          {{ item.name }}
          <span
            @click.stop="flexClickAllItem(item, index)"
            :class="[item.active ? 'active-span' : '']"
          ></span>
        </p>
        <ul v-show="item.show">
          <li v-for="(citem, cindex) in item.children" :key="cindex">
            <label>{{ citem.childName }}</label>
            <span
              :class="[citem.active ? 'active-span' : '']"
              @click="flexClickliItem(item, index, citem, cindex)"
            ></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="icon">
      <div class="icon-camera map-bt-bg"><img :src="iconCamera" alt="" /></div>
      <div class="icon-contact map-bt-bg"><img :src="iconCar" alt="" /></div>
    </div>
    <!-- 综合统计（右侧） begin -->
    <div class="composite-statistics">
      <div class="composite-title">综合统计</div>
      <div class="composite-top">
        <div class="composite-top-left">
          <div class="composite-sub-title">涉危企业统计</div>
          <div class="composite-statistics-echart"></div>
        </div>
        <div class="composite-top-right">
          <div class="composite-sub-title">重点监管企业统计</div>
          <div class="supervise-statistics-echart"></div>
        </div>
      </div>
      <div class="composite-bt">
        <div class="composite-sub-title">危化品存量统计</div>
        <div class="stock-statistics">
          <div class="stock-statistics-left">
            <span class="name">危化品存量</span>
            <span class="number">17,258,351</span>
            <span class="unit">万吨</span>
          </div>
          <div class="stock-statistics-right">
            <span class="name">环比</span>
            <span class="number">△1%</span>
          </div>
        </div>
        <div class="stock-statistics-echart"></div>
      </div>
    </div>
    <!-- 综合统计（右侧） end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      DataList: [
        {
          name:'涉危企业总数',
          unit:'（家）',
          number:'3271'
        },
        {
          name:'重点监管企业总数',
          unit:'（家）',
          number:'229'
        },
        {
          name:'运输车辆总数',
          unit:'（辆）',
          number:'2156'
        },
        {
          name:'涉危品种总数',
          unit:'（种）',
          number:'3371'
        },
      ],
      // 侧边企业列表
      selectThing: [
        {
          key: 0,
          name: "危化品企业",
          active: false,
          show: true,
          children: [
            {
              childName: "生产企业",
              active: false,
            },
            {
              childName: "经营企业",
              active: false,
            },
            {
              childName: "使用企业",
              active: false,
            },
            {
              childName: "危运车辆",
              active: false,
            },
            {
              childName: "运输企业",
              active: false,
            },
            {
              childName: "烟花爆竹",
              active: false,
            },
            {
              childName: "民爆企业",
              active: false,
            },
            {
              childName: "油气长输",
              active: false,
            },
          ],
        },
        {
          key: 1,
          name: "重大危险源企业",
          active: false,
          show: true,
          children: [],
        },
        {
          key: 2,
          name: "重点监管化工工艺企业",
          active: false,
          show: true,
          children: [],
        },
        {
          key: 3,
          name: "监控视频",
          active: false,
          show: true,
          children: [
            {
              childName: "企业视频",
              active: false,
            },
            {
              childName: "社会视频",
              active: false,
            },
          ],
        },
        {
          key: 4,
          name: "重点防护目标",
          active: false,
          show: true,
          children: [
            {
              childName: "脆弱目标",
              active: false,
            },
            {
              childName: "人群密集区",
              active: false,
            },
            {
              childName: "学校",
              active: false,
            },
          ],
        },
        {
          key: 5,
          name: "应急救援队伍",
          active: false,
          show: true,
          children: [
            {
              childName: "市属救援",
              active: false,
            },
            {
              childName: "区属救援",
              active: false,
            },
          ],
        },
        {
          key: 6,
          name: "应急救援资源",
          active: false,
          show: true,
          children: [
            {
              childName: "避难场所",
              active: false,
            },
            {
              childName: "疏散安置点",
              active: false,
            },
            {
              childName: "应急专家",
              active: false,
            },
            {
              childName: "医院",
              active: false,
            },
          ],
        },
      ],
      iconCamera: require("../../../assets/images/hazardousChemicals/camera_before.png"),
      iconCar: require("../../../assets/images/hazardousChemicals/car_before.png"),
    }
  },
  created() {
    this.init();
  },
  mounted() {

  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.initChart();
      });
    },
    //echart 初始化
    initChart() {
      //重点监管企业统计echart
      let superviseObj = this.$echarts.init(document.getElementsByClassName('supervise-statistics-echart')[0]);
      superviseObj.setOption(this.superviseOption());
      let compositeObj = this.$echarts.init(document.getElementsByClassName('composite-statistics-echart')[0]);
      compositeObj.setOption(this.compositeOption());
      //危化品存量统计echart
      let stockObj = this.$echarts.init(document.getElementsByClassName('stock-statistics-echart')[0]);
      stockObj.setOption(this.stockOption());
      //窗口变化，重置echart图
      window.onresize = function () {
        superviseObj.resize();
        stockObj.resize();
        compositeOption.resize();
      };
    },
    compositeOption() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'line'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel:{
            show:false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['经营企业', '使用企业', '烟花爆竹企业', '运输企业', '生产企业',"城镇燃气企业","废弃处置企业","口岸企业","油气长输管道企业","民爆企业"],
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: "#fff",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
              type: 'bar',
              data: [1700, 1400, 450, 900, 1410 , 250, 350, 1100, 360, 894 ],
              label: {
                  show: true,
                  position:'insideRight'
              },
              color: "#2474ef",
          },
        ]
      };
      return option
    },
    superviseOption() {
      let option = {
        tooltip: {
          //   show: false,
          trigger: "item",
        },
        legend: {
          // data: ["专项一", "专项二", "专项三", "专项四", "专项五"],
          // show: true,
          right: "0",
          top: "center",
          icon: "circle", //正方形图例  square
          textStyle: {
            color: "#fff",
          },
          orient: "vertical",


        },
        grid: {
          // left: '-10%',
          // x: -10,
          // y: 0,
          // x1: 0,
          // y1: 0,
        },
        series: [
          {
            // top: 'center',
            // left: '-40%',
            // zoom: 2,
            // name: "专项一",
            type: "pie",
            radius: ["30%", "55%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              //   borderRadius: 10,
              borderColor: "#091d43",
              borderWidth: 3,
              //   color:'#000'
            },
            label: {
              show: true,
              position: "outside", //inside与outside 搭配labelLine一起使用
              formatter: "{b} {c}",

              textStyle: {
                fontWeight: "100",
                fontFamily: "Microsoft YaHei",
                color: "#fff",
                // fontSize: 8
              },
            },

            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              // length：10,
              length: 4,
            },
            data: [
              {
                name: "A类",
                value: "18",
              },
              {
                name: "B类",
                value: "22",
              },
              {
                name: "C类",
                value: "36",
              },
              {
                name: "D类",
                value: "56",
              },
              {
                name: "E类",
                value: "16",
              },
            ],
          },
        ],
      };
      return option;
    },
    stockOption(obj = null) {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: "0",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          data: ["流入", "流出", "存量"],
          textStyle: {
            color: "#fff",
          },
          right: "0",
        },
        xAxis: [
          {
            type: "category",
            data: [
              "从化",
              "黄埔",
              "增城",
              "番禺",
              "南沙",
              "花都",
              "白云",
              "天河",
              "荔湾",
              "越秀",
              "海珠",
            ],
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              // 控制显示隐藏
              //   show:false,
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: 14,
                color: "rgb(1, 208, 226)",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位（万吨）",
            min: 0,
            max: 20,
            interval: 5,
            axisLabel: {
              // 控制显示隐藏
              //   show:false,
              formatter: "{value} ",
              textStyle: {
                //   color: '#d7d7d7', //x轴字体颜色
                fontSize: 14,
                color: "#fff",
              },
              interval: 0, //设置成 0 强制显示所有标签
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "rgb(43, 54, 82)",
              },
            },
            nameTextStyle: {
              color: "#fff",
              align: "left",
            },
          },
        ],
        series: [
          {
            name: "流入",
            type: "bar",
            data: [6, 13, 9, 11, 6, 10, 16, 12, 11, 9, 7],
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                //barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "rgb(0,123,255)",
          },
          {
            name: "流出",
            type: "bar",
            data: [3, 8, 4, 7, 4, 4, 10, 4, 7, 4, 4],
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                //barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "rgb(0,201,1)",
          },
          {
            name: "存量",
            type: "bar",
            data: [2, 4, 2, 4, 2, 6, 2, 6, 2, 1, 3],
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                //barBorderRadius: [5, 5, 0, 0],
              },
            },
            color: "rgb(0,255,255)",
          },
        ],
      };
      return option;
    },

    // 展示
    openShow(item, index) {
      this.selectThing[index].show = !this.selectThing[index].show;
    },
    flexClickAllItem(item, index) {
      let is_Bool = true;
      this.selectThing[index].active = JSON.parse(JSON.stringify(!item.active));
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
      console.log(this.selectThing);
      if (this.selectThing[index].active) {
        is_Bool = true;
        this.selectThing[index].show = true;
        this.selectThing[index].children.map((citem, cindex) => {
          this.selectThing[index].children[cindex].active = true;
        });
      } else {
        is_Bool = false;
        this.loopMap(this.selectThing[index].children, false);
      }
    },
    flexClickliItem(item, index, citem, cindex) {
      this.selectThing[index].children[cindex].active = !citem.active;
      if (this.selectThing[index].children[cindex].active) {
        let childrenLength = this.selectThing[index].children.length;
        let currentArr = this.selectThing[index].children.filter((i, k) => {
          if (i.active) {
            return i;
          }
        });
        if (currentArr.length === childrenLength) {
          this.selectThing[index].active = true;
        }
      } else {
        this.selectThing[index].active = false;
      }
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
    },
    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
