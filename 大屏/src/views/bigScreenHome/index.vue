<!--
 * @Author: your name
 * @Date: 2021-06-30 14:12:21
 * @LastEditTime: 2021-09-08 19:50:25
 * @LastEditors: hehaishen
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\bigScreenHome\index.vue
-->
<template>
  <Container :options="{ width: '1920', height: '480' }">
    <div class="bigScreenHome" id="bigScreenHome">
      <!-- 頭部 -->
      <div class="title" ref="title">
        <div class="title-name">{{ title }}</div>
        <div class="sub-title">
          <div>
            <span></span> <span></span
            ><label
              v-for="(i, k) in subtitle"
              :key="k"
              style="color: #00ffff; margin: 0 10px"
              >{{ i }}</label
            >
            <i></i><i></i>
          </div>
        </div>
        <div class="title-date">
          <div style="margin-right: 10px">{{ today }}</div>
          <div>{{ time }}</div>
        </div>
      </div>
      <!-- 內容 -->
      <div class="content">
        <!-- 应急管理 -->
        <div class="r-l">
          <div class="emergency-management" ref="emergency-management">
            <div class="emergency-management-title">
              守护广州平安应急十大理念
            </div>
            <div class="emergency-management-content">
              <vue-seamless-scroll
                :class-option="classOption"
                class="warn-tip"
                :data="leftShowText"
              >
                <p v-for="(i, k) in leftShowText" :key="k">{{ i }}</p>
              </vue-seamless-scroll>
              <!-- <p>
                以"促一方发展，保方平安"切实维护全市人民群众生命财产安全为目标，围绕"风险、隐患、险情、灾情"演变过程。
              </p>
              <p>
                贯穿"测、报、防、抗、查、救、建、服"应急管理全链条，以云计算区块链、AI人工智能等新技术为支撑。
              </p>
              <p>
                实现“五个一。五个时”，构建快速反应，精准指挥。科学决策的应急管理体系。
              </p> -->
              <!-- <p>
                实现“五个一。五个时”，构建快速反应，精准指挥。科学决策的应急管理体系。
              </p>
              <p>
                实现“五个一。五个时”，构建快速反应，精准指挥。科学决策的应急管理体系。
              </p> -->
            </div>
          </div>
        </div>
        <!-- 大屏一览 -->
        <div class="r-c">
          <div class="main" ref="main">
            <img class="main-gif" src="./images/main_top2.gif" alt="" />
            <img class="main-bottom" src="./images/main_bottom.png" alt="" />
            <img class="main-tuoyuan" src="./images/tuoyuan.png" alt="" />
            <!-- <div class="main-item jscg" @click="openUrl('/idtv/#/subject/share/view?sid=ADDBDBBBD2A348CC93006ADDA1C70F77')">
              <span>建设成果总览</span>
            </div> -->
            <!--  <div
              class="main-item jscg"
              @click="openUrl('/big-screen/#/dustAndExplosionNew')"
            > -->
            <div
              class="main-item jscg"
              @click="openUrl('/big-screen/#/dustAndExplosionNew')"
            >
              <span>粉尘涉爆</span>
            </div>
            <!-- <div class="main-item yhfb" @click="openUrl('/idtv/#/subject/share/view?sid=A41DF0A41DE24FD7AF2DF891A0991D81')">
              <span>全市隐患分布</span>
            </div> -->
            <!-- <div
              class="main-item yhfb"
              @click="openUrl('/big-screen/#/cityHiddenDangerFirm')"
            > -->
            <div
              class="main-item yhfb"
              @click="openUrl('/big-screen/#/cityHiddenDangerFirm')"
            >
              <span>全市隐患分布</span>
            </div>
            <!-- <div class="main-item yjzy" @click="openUrl('/idtv/#/subject/share/view?sid=9CE8D935DACF44A1AE3E790B7DF8AD33')">
              <span>应急资源</span>
            </div> -->
            <div
              class="main-item yjzy"
              @click="openUrl('/big-screen/#/emergencyResources')"
            >
              <span>应急资源</span>
            </div>
            <!-- <div class="main-item yjgl" @click="openUrl('/idtv/#/subject/share/view?sid=69544FADE2C842CB936EDE82201AD1B5')">
              <span>应急概览</span>
            </div> -->
            <div
              class="main-item yjgl"
              @click="openUrl('/big-screen/#/emergencyOverview')"
            >
              <span>应急概览</span>
            </div>
            <div
              class="main-item slfh"
              @click="openUrl('/big-screen/#/floodPreventionWar?isScale=true')"
            >
              <span>森林防火</span>
            </div>
            <div
              class="main-item lzs"
              @click="openUrl('/big-screen/#/dragonBoat?isScale=true')"
            >
              <span>防暴雨内涝</span>
            </div>
            <!-- <div
              class="main-item qssf"
              @click="
                openUrl(
                  '/idtv/#/subject/share/view?sid=0F0471BD89E74F8A823F2A29030844DB'
                )
              "
            > -->
            <div
              class="main-item qssf"
              @click="openUrl('/big-screen/#/theCityThreeProofing')"
            >
              <span>全市三防</span>
            </div>
            <!-- <div
              class="main-item whp"
              @click="
                openUrl(
                  '/idtv/#/subject/share/view?sid=EE9C2CBDA5CE4674A3DB55E83F077304'
                )
              "
            > -->
            <div
              class="main-item whp"
              @click="openUrl('/big-screen/#/hazardousChemicals')"
            >
              <span>危险化学品</span>
            </div>
          </div>
        </div>
        <!-- 码上救 -->
        <div class="r-r">
          <div class="qr-code" ref="qr-code">
            <div class="qr-code-top">
              <span>码上救</span><img src="./images/code.png" alt="" />
            </div>
            <div class="qr-code-bottom">
              <span>码上办</span><img src="./images/code.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import moment from "moment";
import Container from "@/views/components/Container/index.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "bigScreenHome",
  props: {},
  components: {
    Container,
    vueSeamlessScroll,
  },
  data() {
    return {
      title: "应急管理综合应用平台",
      subtitle: ["实况", "实时", "实用"],
      today: moment().format("YYYY-MM-DD ddd"),
      time: moment().format("HH:mm"),
      timer: null,
      leftShowText: [
        "一、保持“三高”状态：高度重视、高度警醒、高度戒备。",
        "二、坚持做到“三清”：头脑清醒、情况清楚、思路清晰。",
        "三、持续念好“三字经”，即“三全三分”：全覆盖、全领域、全面性。风险分级、隐患分类、责任分解",
        "四、坚持用好五字诀：“查、改、防、练、救”，即在排查、整改、防范、演练和救援上，反复抓，抓反复，狠下功夫，坚持不懈。",
        "五、坚持做到“三真”：真诚、真学、真干。待人真诚，理论真学，工作真干。",
        "六、切实做到“三实”：实际、实在、实效。切合实际、作风实在、注重实效。信息化建设，坚持实况、实时、实用。",
        "七、践行三“gong”宗旨：做工作、建功勋、积公德。",
        "八、坚持实干兴安：尽职守、人努力、天帮忙。要靠九十九分努力，不靠一份运气；相信多出力气，才会更多福气。",
        "九、力践应急目标：有急必应、有急能应 、有急快应、有急善应，无急可应，无急也常应。平战相结合，平时如战时，战时如平时，实现应急安全在常态中进行，在战时如常态下应对。",
        "十、誓守广州平安，努力达到三风：风调雨顺、风平浪静、风和日丽。",
      ],
      classOption: {
        step: 0.3,
      },
    };
  },
  created() {},
  mounted() {
    this.timer = setInterval(() => {
      this.toda = moment().format("YYYY-MM-DD ddd");
      this.time = moment().format("HH:mm");
    }, 60 * 1000);
    // this.debounceInitWHFun()
    // window.addEventListener('resize', this.debounceInitWHFun, false)
  },
  methods: {
    // 重新获取比例
    debounceInitWHFun() {
      this.$nextTick(() => {
        const heightRatio = (document.body.offsetHeight / 937).toFixed(1);
        console.log(heightRatio);
        this.$refs["title"].style.transform = `scale(${heightRatio})`;
        this.$refs["title"].style.transformOrigin = "0 0";
        this.$refs[
          "emergency-management"
        ].style.transform = `scale(${heightRatio})`;
        this.$refs["emergency-management"].style.transformOrigin = "0";
        this.$refs["main"].style.transform = `scale(${heightRatio})`;
        this.$refs["main"].style.transformOrigin = "center";
        this.$refs["qr-code"].style.transform = `scale(${heightRatio})`;
        this.$refs["qr-code"].style.transformOrigin = "100%";
      });
    },
    // 跳转链接
    openUrl(url) {
      if (!url) {
        return;
      }
      window.open(url);
    },
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    window.removeEventListener("resize", this.debounceInitWHFun);
  },
};
</script>

<style lang="less" scope>
#bigScreenHome {
  min-width: 1920px;
  min-height: 480px;
  position: relative;
  font-size: var(--mini-font);
  background: url("./images/bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  // justify-content: space-between;
  flex-direction: column;

  .title {
    position: relative;
    width: 1920px;
    height: 70px;
    box-sizing: border-box;
    background: url("./images/bg_header.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
    color: #fff;
    .title-name {
      line-height: 70px;
      letter-spacing: 5px;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      text-shadow: 0 0 5px #fff, 0 0 10px #0071a6, 0 0 15px #0071a6,
        0 0 20px #0071a6;
    }
    .sub-title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 50%);
      display: flex;
      font-size: 16px;
      span {
        border: 8px solid;
        border-color: transparent transparent transparent #0071a6d3;
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translate(-100%, -50%);
        left: 0;
        &:nth-of-type(1) {
          transform: translate(-160%, -50%);
        }
      }
      i {
        border: 8px solid;
        border-color: transparent #0071a6d3 transparent transparent;
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translate(100%, -50%);
        right: 0;
        &:nth-of-type(1) {
          transform: translate(160%, -50%);
        }
      }
    }
    .title-date {
      position: absolute;
      top: 15px;
      right: 10px;
      display: flex;
      align-items: center;
      & > div:nth-child(1) {
        font-size: 12px;
      }
      & > div:nth-child(2) {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
  .content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    flex: 1;
    .r-l {
      height: 100%;
      display: flex;
      align-items: center;
      .emergency-management {
        margin-left: 90px;
        width: 220px;
        height: 330px;
        background: url("./images/left_box.png") no-repeat;
        background-size: 100% 100%;
        padding: 60px 24px 20px;
        position: relative;
        .emergency-management-title {
          position: absolute;
          white-space: nowrap;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 0 5px #fff, 0 0 10px #0071a6, 0 0 15px #0071a6,
            0 0 20px #0071a6;
        }
        .emergency-management-content {
          overflow-y: auto;
          height: 100%;
          font-size: 14px;
          color: #fff;
          &::-webkit-scrollbar {
            display: none;
          }
          p {
            margin-bottom: 1em;
          }
        }
      }
    }
    .r-c {
      margin: 0 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .main {
        width: 886px;
        height: 410px;
        display: flex;
        align-items: center;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;
        img {
          position: absolute;
        }
        .main-gif {
          // top: 69px;
          // width: 480px;
          top: 68px;
          width: 502px;
          z-index: 11;
          left:50%;
          transform: translateX(-50%);
        }
        .main-bottom {
          top: 98px;
          width: 466px;
          z-index: 10;
        }
        .main-tuoyuan {
          top: 150px;
          width: 800px;
          height: 220px;
          z-index: 9;
        }
        .main-item {
          position: absolute;
          width: 110px;
          height: 110px;
          z-index: 11;
          cursor: pointer;
          display: flex;
          justify-content: center;
          span {
            color: rgba(255, 255, 255, 0.774);
            font-size: 12px;
            align-self: flex-end;
            margin-bottom: 25px;
            padding-right: 10px;
          }
        }
        .jscg {
          left: 0;
          top: 190px;
          background: url("./images/jscg_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/jscg_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .yhfb {
          left: 110px;
          top: 110px;
          background: url("./images/aqsc_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/aqsc_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .yjzy {
          left: 110px;
          top: 250px;
          background: url("./images/sfsb_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/sfsb_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .yjgl {
          left: 290px;
          top: 280px;
          background: url("./images/zdwx_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/zdwx_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .slfh {
          right: 290px;
          top: 280px;
          background: url("./images/slfh_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/slfh_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .lzs {
          right: 110px;
          top: 255px;
          background: url("./images/bdhy_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/bdhy_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .qssf {
          right: 0;
          top: 180px;
          background: url("./images/sfjc_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/sfjc_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .whp {
          right: 110px;
          top: 110px;
          background: url("./images/whp_b.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("./images/whp_r.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .r-r {
      height: 100%;
      display: flex;
      align-items: center;

      .qr-code {
        margin-right: 90px;
        width: 220px;
        height: 330px;
        background: url("./images/right_box.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 25px 0 21px 0;
        span {
          font-size: 12px;
          line-height: 18px;
          color: #fff;
        }
        img {
          margin-top: 14px;
          width: 40%;
        }
        .qr-code-top {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .qr-code-bottom {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
}
</style>
