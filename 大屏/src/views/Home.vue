<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 14:09:38
 * @LastEditTime: 2021-11-01 14:45:38
-->
<template>
  <div class="home">
    <div class="layer">
      <layer-consulting></layer-consulting>
    </div>
    <p class="home-link-title">前期开发</p>
    <div class="home-link">
      <router-link to="/forestFire">森林火灾(旧)</router-link><br />
      <router-link to="/dragonBoat">龙舟水(旧)</router-link><br />
      <router-link to="/floodPrevention">三防(旧)</router-link><br />
      <router-link to="/warnScreen">监测预警</router-link>
      <router-link to="/eventList">事件信息</router-link><br />
      <router-link to="/integratedManageLeft">综合管理-左</router-link><br />
      <router-link to="/integratedManage">综合管理-中</router-link><br />
      <router-link to="/integratedManageRight">综合管理-右</router-link><br />
      <router-link to="/rainstormLeft">防暴雨-左</router-link><br />
      <router-link to="/rainstorm">防暴雨-中</router-link><br />
      <router-link to="/rainstormRight">防暴雨-右</router-link><br />
      <router-link to="/typhoonLeft">防风-左</router-link><br />
      <router-link to="/typhoon">防风-中</router-link><br />
      <router-link to="/typhoonRight">防风-右</router-link><br />
      <!-- <router-link to="/floodDedense">防汛</router-link><br/> -->
      <router-link to="/holidayManageLeft">节假日-左</router-link><br />
      <router-link to="/holidayManage">节假日-中</router-link><br />
      <router-link to="/holidayManageRight">节假日-右</router-link><br />
      <router-link to="/forestFireWartimeLeft">森林防火-战时-左</router-link
      ><br />
      <router-link to="/forestFireWartime">森林防火-战时-中</router-link><br />
      <router-link to="/forestFireWartimeRight">森林防火-战时-右</router-link
      ><br />
      <router-link to="/dragonBoatWartimeLeft">水龙舟-战时-左</router-link
      ><br />
      <router-link to="/dragonBoatWartime">水龙舟-战时-中</router-link><br />
      <router-link to="/dragonBoatWartimeRight">水龙舟-战时-右</router-link
      ><br />
      <router-link to="/enterpriseRisk"
        >隐患企业分布-企业事故风险情况(旧)</router-link
      ><br />
      <router-link to="/dangerStatistics"
        >全市隐患分布-八大行业统计(旧)</router-link
      ><br />
      <router-link to="/detonation">企业隐患自查信息-粉尘涉爆(旧)</router-link
      ><br />
      <a href="/bigscreen/">应急管理指挥调度应用</a><br />
      <router-link to="/floodPreventionWarNew"
        >森林防火一张图36比9(旧)</router-link
      ><br />
    </div>

    <p class="home-link-title">后期开发</p>

    <div class="home-link">
      <div @click="clickFireScale('/floodPreventionWar')">
        森林防火一张图战时自适应-新
      </div>
      <div @click="clickFireScale('/forestFire')">
        森林防火一张图平时自适应-新
      </div>
      <div @click="clickFireScale('/dragonBoat')">龙舟水一张图自适应-新</div>

      <router-link to="/dustAndExplosionNew">涉尘涉爆-新</router-link><br />
      <router-link to="/constructionAchievement">建设成果展示-新</router-link
      ><br />
      <router-link to="/bigScreenHome">大屏首页-新</router-link><br />
      <router-link to="/dataConstruction">数据建设-新</router-link><br />
      <router-link to="/emergencyOverview">应急概览一张图-新</router-link><br />
      <router-link to="/emergencyResources">应急资源一张图-新</router-link
      ><br />
      <router-link to="/theCitysDanger">全市重大危险源一张图-新</router-link
      ><br />
      <!-- <router-link to="/dustAndExplosion">涉尘涉爆-sude</router-link><br /> -->
      <!-- <router-link to="/cityPrevention">全市三防</router-link><br /> -->
      <router-link to="/hazardousChemicals">危险化学品-新</router-link><br />
      <!-- <router-link to="/achievements">建设成果展示-sude</router-link><br /> -->
      <router-link to="/cityHiddenDangerFirm"
        >全市隐患企业分布一张图(新)</router-link
      ><br />
      <router-link to="/dragonBoatNormal">龙舟水平时(新)</router-link><br />
      <router-link to="/theCityThreeProofing">全市三防(新)</router-link><br />
      <router-link to="/integratedEmergency"
        >应急综合管理应用平台（未确定、未开发）</router-link
      ><br />
      <router-link to="/threeProoingHomePages"
        >广州应急管理应用平台首页</router-link
      ><br />
      <router-link to="/threeProoingRainfallColor">雨量色斑图</router-link
      ><br />
      <router-link to="/threeProoingRainfallDatas">雨量数据表</router-link
      ><br />
      <router-link to="/threeProoingWindDatas">风情数据表</router-link><br />
      <router-link to="/majorFestivalsConductor">重大节日指挥</router-link>
      <!-- /emergencyOrganizationCommand -->
      <router-link to="/emergencyOrganizationCommand">抢险救援指挥</router-link>
      <router-link to="/emergencyOrganizationCommandWar"
        >抢险救援指挥战时</router-link
      >
      <!-- /emergencyOrganizationCommandBig -->
      <router-link to="/emergencyOrganizationCommandBig"
        >抢险救援指挥大屏-平时</router-link
      >
      <router-link to="/emergencyOrganizationCommandWarBig"
        >抢险救援指挥大屏-战时</router-link
      >
    </div>
    <!-- <span @click="testMessage">8888888</span> -->
  </div>
</template>

<script>
import TimeLine from "@/components/tools/TimeLine";
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue";
export default {
  name: "Home",
  components: { TimeLine, LayerConsulting },
  data() {
    return {};
  },
  beforeDestroy() {},
  created() {},
  mounted() {},
  methods: {
    clickFireScale(path) {
      this.$router.push({ path: path, query: { isScale: true } });
    },
    testMessage() {
      this.$MyMessage.error("999999");
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  position: relative;
  .layer {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 99999;
    pointer-events: none;
  }
}

.home-link {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px;
  a {
    display: block;
    margin-right: 20px;
    width: 18%;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0px 2px 16px #aaa;
    border-radius: 4px 4px;
    line-height: 24px;
    // border-top:1px #92ffff solid;
    // border-left:1px #92ffff solid;
  }
  a:hover {
    color: blue;
    box-shadow: 0px 0px 16px #0e2020;
  }
  div {
    margin-right: 20px;
    width: 18%;
    margin-bottom: 20px;
    cursor: pointer;
    text-align: center;
    box-shadow: 0px 2px 16px #aaa;
    border-radius: 4px 4px;
    line-height: 24px;
  }
  div:hover {
    color: blue;
    box-shadow: 0px 0px 16px #0e2020;
  }
}

.home-link-title {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  color: #00ffff;
  padding-left: 16px;
  font-weight: bold;
}
</style>
