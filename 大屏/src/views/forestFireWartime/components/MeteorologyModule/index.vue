<template>
  <div class="meteorology-module">
    <div class="left-top-meteorology">
      <div class="meteorology-title">气象实时信息展示</div>
      <div class="meteorology-show">
        <ul>
          <li>
            <div class="li-content-img">
              <div class="img-box">
                <img src="./images/img_sun.png" alt="" />
              </div>
            </div>
            <div class="li-content-detail">
              <div class="detail-box">
                <div class="left-box">
                  {{ temObjShow.nowTem }}
                </div>
                <div class="right-box">
                  <p class="right-top">℃</p>
                  <p class="right-bottom">
                    {{ temObjShow.weatherDesc }}
                  </p>
                </div>
              </div>
              <div class="bottom-box">
                {{ temObjShow.tem }}
              </div>
              <!-- <p class="li-now-tem">{{ temObjShow.nowTem }}</p>
              <p class="li-about-tem">{{ temObjShow.tem }}</p>
              <p class="li-now-unit">℃</p>
              <p class="li-now-state">{{ temObjShow.weatherDesc }}</p> -->
            </div>
          </li>
          <li>
            <div class="li-content-logo">
              <p class="li-img-icon">
                <img src="./images/img_humidity.png" alt="" />
              </p>
              <p class="li-img-text">湿度</p>
            </div>
            <div class="li-content-detail detail-padding">
              <p>比较湿度</p>
              <p>{{ temObjShow.waterTem }}</p>
            </div>
          </li>
          <li>
            <div class="li-content-logo">
              <p class="li-img-icon">
                <img src="./images/img_wind_direction.png" alt="" />
              </p>
              <p class="li-img-text">风力风向</p>
            </div>
            <div class="li-content-detail detail-padding">
              <p>{{ temObjShow.windDirection }}</p>
              <p>{{ temObjShow.windStrength }}</p>
            </div>
          </li>
          <li>
            <div class="li-content-logo">
              <p class="li-img-icon">
                <img src="./images/img_thunder.png" alt="" />
              </p>
              <p class="li-img-text">雷电</p>
            </div>
            <div class="li-content-detail detail-padding" v-show="false">
              <p>西南风向</p>
              <p>微风&nbsp;&nbsp;&lt;3级</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="meteorology-chart">
        <div class="meteorology-chart-line"></div>
        <div class="meteorology-chart-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeather } from "@/api/floodPreventionWar";

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      temperatureOneDiv: null,
      temperatureTwoDiv: null,
      temObjShow: {
        nowTem: null,
        tem: null, // 温度
        waterTem: null, // 湿度,
        windDirection: null, // 风向
        windStrength: null, //
        weatherDesc: null, // 天气状态
      },
    };
  },
  watch: {},
  computed: {},
  created() {
    window.addEventListener("resize", this.onResize, false);
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    this.temperatureOneDiv && this.temperatureOneDiv.dispose();
    this.temperatureTwoDiv && this.temperatureTwoDiv.dispose();
    window.removeEventListener("resize", this.onResize, false);
  },
  methods: {
    // 调整窗口后重置
    onResize() {
      this.temperatureOneDiv && this.temperatureOneDiv.resize();
      this.temperatureTwoDiv && this.temperatureTwoDiv.resize();
    },
    // 初始化Echart图
    initChart() {
      // 温度统计1
      this.getWeatherFun().then((res) => {
        this.temperatureOneDiv = this.$echarts.init(
          document.getElementsByClassName("meteorology-chart-line")[0]
        );
        let resDatas = {
          titleName: "温度统计",
          seriesName: "温度统计",
          ...res,
        };
        this.temperatureOneDiv.setOption(this.temperatureOneChart(resDatas));
      });
      // 温度统计2
      this.getWeatherFun().then((res) => {
        this.temperatureTwoDiv = this.$echarts.init(
          document.getElementsByClassName("meteorology-chart-line")[1]
        );
        let resDatas = {
          titleName: "湿度统计",
          seriesName: "湿度统计",
          xDabaList: res.xDabaListWater,
          seriesDataList: res.seriesDatWateraList,
        };
        this.temperatureTwoDiv.setOption(this.temperatureOneChart(resDatas));
      });
    },
    // 温度-湿度echartDatas
    getWeatherFun() {
      return new Promise((resolve, reject) => {
        getWeather("440100000000")
          .then((res) => {
            if (res.success) {
              if (res.body && res.body.length) {
                let saveList = JSON.parse(JSON.stringify(res.body));
                let xDabaList = []; // 温度X轴
                let seriesDataList = []; // 温度数据
                let xDabaListWater = []; // 湿度X轴
                let seriesDatWateraList = []; // 湿度数据
                saveList.map((item, index) => {
                  if (index < 7) {
                    xDabaList.push(item.monitorTime.slice(-5));
                    seriesDataList.push(item.temp ? item.temp : 0);
                    xDabaListWater.push(item.monitorTime.slice(-5));
                    seriesDatWateraList.push(item.humidity);
                  }
                });
                this.temObjShow = JSON.parse(
                  JSON.stringify({
                    nowTem: saveList[0].temp,
                    tem: `${saveList[0].temp}℃~${
                      saveList[saveList.length - 1].temp
                    }℃`, // 温度
                    waterTem: `${saveList[0].humidity}~${
                      saveList[saveList.length - 1].humidity
                    }`, // 湿度,
                    windDirection: `${saveList[0].windDirection}`, // 风向
                    windStrength: `${saveList[0].windStrength}`,
                    weatherDesc: saveList[0].weatherDesc, //
                  })
                );
                resolve({
                  xDabaList: xDabaList,
                  seriesDataList: seriesDataList,
                  xDabaListWater: xDabaListWater,
                  seriesDatWateraList: seriesDatWateraList,
                });
              } else {
                resolve({
                  xDabaList: xDabaList,
                  seriesDataList: seriesDataList,
                  xDabaListWater: xDabaListWater,
                  seriesDatWateraList: seriesDatWateraList,
                });
              }
            } else {
              resolve({
                xDabaList: xDabaList,
                seriesDataList: seriesDataList,
                xDabaListWater: xDabaListWater,
                seriesDatWateraList: seriesDatWateraList,
              });
            }
          })
          .catch((error) => {
            if (error) {
              reject({
                xDabaList: xDabaList,
                seriesDataList: seriesDataList,
                xDabaListWater: xDabaListWater,
                seriesDatWateraList: seriesDatWateraList,
              });
            }
          });
      });
    },
    //Echart参数方法
    temperatureOneChart(obj) {
      let option = {
        title: {
          text: obj.titleName,
          itemGap: 30,
          textStyle: {
            color: "#02ffff",
            fontSize: "30px",
            marginBttom: "20px",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "30",
          right: "0",
          bottom: "30",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: obj.xDabaList,
            axisLabel: {
              textStyle: {
                margin: 100,
                color: "#ffffff",
                fontSize: "24px",
              },
            },
            offset: 10,
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "24px",
              },
            },
            splitLine: {
              //网格线
              lineStyle: {
                type: [10, 10],
                dashOffset: 5,
                //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
                color: "#ffffff",
              },
              show: true, //隐藏或显示
            },
          },
        ],
        series: [
          {
            name: obj.seriesName,
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: obj.seriesDataList,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#12486a", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#112b4c", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            lineStyle: {
              color: "#00feff",
            },
          },
        ],
      };
      return option;
    },
  },
};
</script>
<style lang='less' scoped>
.meteorology-module {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2%;
  .left-top-meteorology {
    height: 100%;
    width: 100%;
    background: url("./images/bg_meeting.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 3% 2%;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    .meteorology-title {
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      font-weight: bold;
      color: #01ffff;
      position: absolute;
      left: 50%;
      top: -1%;
      transform: translateX(-50%);
      font-size: var(--large-font);
    }
    .meteorology-show {
      width: 100%;
      height: 25%;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        margin-top: 3%;
        justify-content: space-around;
        //   padding: 0 20px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        li {
          flex-shrink: 0;
          width: 22%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          position: relative;
          border-right: 1px solid;
          -o-border-image: linear-gradient(
              transparent,
              transparent,
              #00ffff,
              transparent,
              transparent
            )
            60;
          border-image: linear-gradient(
              transparent,
              transparent,
              #00ffff,
              transparent,
              transparent
            )
            60;
          .li-content-img {
            width: 40%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              display: block;
              width: 130px;
              height: 130px;
            }
          }
          .li-content-logo {
            width: auto;
            height: 60%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            margin-right: 30px;
            .li-img-text {
              font-size: var(--mini-font);

              color: white;
              margin-top: 10%;
            }
            .li-img-icon {
              display: block;
              width: auto;
              height: auto;
              margin-bottom: 1%;
              margin-top: 8px;
              img {
                display: block;
                width: 67px;
                height: 77px;
                margin: 0 auto;
              }
            }
          }
          .li-content-detail {
            width: 40%;
            height: 60%;
            position: relative;
            text-align: center;
            padding-left: 6px;
            box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            display: flex;
            align-content: center;
            flex-direction: column;
            justify-content: center;
            color: #01ffff;
            .li-now-tem {
              font-size: 55px;
              font-weight: bold;
              font-family: "微软雅黑";
              color: #01ffff;
              box-sizing: border-box;
              -o-box-sizing: border-box;
              -ms-box-sizing: border-box;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              text-shadow: 0 0 20px #aef;
              position: absolute;
              top: 11%;
            }
            .li-about-tem {
              font-size: var(--mini-font);

              color: #01ffff;
              position: absolute;
              top: 69%;
            }
            .li-now-unit {
              position: absolute;
              top: 8%;
              left: 58%;
              color: #01ffff;
              font-size: 23px;
            }
            .li-now-state {
              position: absolute;
              top: 35%;
              left: 56%;
              color: #01ffff;
              font-size: 29px;
            }
            .detail-box {
              display: flex;
              justify-content: flex-end;
              padding-top: 10px;

              .left-box {
                width: 55%;
                font-size: 60px;
                font-weight: bold;
                text-align: right;
                color: #01ffff;
                text-shadow: 0 0 20px #aef;
                padding-right: 10px;
                font-size: var(--title-font);
              }
              .right-box {
                text-align: left;
                width: 45%;
              }
            }
            .bottom-box {
              margin-top: 10px;
            }
          }
          .detail-padding {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            p {
              margin-top: 10px;
              // line-height: 42px;
              font-size: var(--mini-font);
            }
            p:first-child {
              margin-top: 15%;
            }
          }
        }
        li:nth-child(4) {
          border: none;
        }
      }
    }
    .meteorology-chart {
      width: 100%;
      height: 70%;
      display: flex;
      justify-content: space-between;
      padding: 1% 30px;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .meteorology-chart-line {
        flex: 1 0 50%;
      }
    }
  }
}
</style>