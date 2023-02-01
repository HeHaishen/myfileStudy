<!--
 * @Author: your name
 * @Date: 2021-06-23 15:21:38
 * @LastEditTime: 2021-06-23 20:39:11
 * @LastEditors: Please set LastEditors
 * @Description: 靶向短信和专家
 * @FilePath: \big-screen-vue\src\views\forestFireWartime\components\MsgAndExperts\index.vue
-->
<template>
  <div class="msg-and-experts">
    <!-- 物资情况 -->
    <div class="material-conditions">
      <div class="forecast">
        <div class="title">
          <p>森林山火蔓</p>
          <p>延模型预测</p>
        </div>
        <div class="start" @click="forecastStart">启用</div>
      </div>
      <div class="note">
        <public-title title='靶向短信' :publicStyle="{top:'-18px'}"></public-title>
        <div class="targeting-msg-chose">
          <p v-for="(item, key) in targetingList" :class="[targetingChose===key?'chose-p':'']" :key="key" @click="doChoseTarget(key)">{{item.name}}</p>
        </div>
        <div class="targeting-msg-chart">
          <div class="msg-chart-wrap1">
            <div class="chart-show-number" v-show="targetingChose===2">128人</div>
            <div class="msg-chart-wrap2">
              <div class="chart-show-number" v-show="targetingChose===1">300人</div>
              <div class="msg-chart-wrap3">
                <div class="chart-show-number" v-show="targetingChose===0">521人</div>
              </div>
            </div>
          </div>
        </div>
        <div class="targeting-msg-btn">
          <span>发送疏散短信</span>
        </div>
        <!-- <material-conditions></material-conditions> -->

      </div>
    </div>
    <!-- 队伍情况 -->
    <div class="team-situation">
      <public-title title='森林火灾专家情况'></public-title>

      <team-situation></team-situation>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/views/forestFireWartime/public/components/publicTitle.vue'
import MaterialConditions from './components/materialConditions'
import TeamSituation from './components/teamSituation'
export default {
  name: "MsgAndExperts",
  props: {},
  components: { MaterialConditions, TeamSituation, PublicTitle },
  data() {
    return {
      //靶向范围选中
      targetingList: [
        { key: 0, name: "一公里" },
        { key: 1, name: "两公里" },
        { key: 2, name: "三公里" },
      ],
      targetingChose: 1,
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {
    //   启用模型
    forecastStart() {
      console.log("启用模型");
    },
    // 靶向范围选择
    doChoseTarget(key) {
      this.targetingChose = key;
    },
  },
}
</script>
<style lang='less' scoped>
.msg-and-experts {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2%;
  // 物资情况
  .material-conditions {
    width: 100%;
    height: 46%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .forecast {
      position: relative;
      background: url('./images/bg_wood_fire_model_old.png') no-repeat;
      background-size: 100% 100%;
      width: 100%;
      height: 30%;
      padding: 6% 2%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .title {
        color: #00ffff;
        font-size: var(--middle-font);
      }
      .start {
        padding: 15px 40px;
        border: 1px solid #00ffffcc;
        background: #121e52cc;
        color: #fff;
        cursor: pointer;
        user-select: none;
      }
      .start:hover {
        opacity: 0.8;
      }
    }
    .note {
      position: relative;
      background: url('./images/bg_connection2.png') no-repeat;
      background-size: 100% 100%;
      width: 100%;
      height: 65%;
      padding: 6% 7% 2%;
      display: flex;
      flex-direction: column;
      .targeting-msg-chose {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        p {
          width: auto;
          margin-right: 8px;
          padding: 5px 15px;
          box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          color: white;
          border: 1px #01ffff solid;
          cursor: pointer;
        }
        p:hover {
          opacity: 0.8;
        }
        .chose-p {
          box-shadow: 0 0 5px #00ffff;
          background: rgba(22, 139, 156, 0.6);
        }
      }
      .targeting-msg-chart {
        width: 100%;
        flex: 1;
        margin: 2% 0;
        .msg-chart-wrap1 {
          margin: 0 auto;
          width: 100%;
          height: 100%;
          border-radius: 50% 50%;
          background: rgba(48, 212, 178, 0.4);
          display: flex;
          align-items: center;
          position: relative;

          .chart-show-number {
            position: absolute;
            height: 127px;
            width: 167px;
            bottom: 9px;
            left: 50%;
            transform: translateX(-50%);
            background: url('./images/bg_targeting_number.png') no-repeat;
            background-size: 100% 100%;
            z-index: 8888;
            line-height: 91px;
            text-align: center;
            color: #01274c;
          }
          .msg-chart-wrap2 {
            margin: 0 auto;
            width: 80%;
            height: 80%;
            border-radius: 50% 50%;
            background: rgba(48, 212, 178, 0.7);
            border: 5px #4ece9b solid;
            display: flex;
            align-items: center;
            position: relative;
            .chart-show-number {
              position: absolute;
              height: 127px;
              width: 167px;
              bottom: 9px;
              left: 50%;
              transform: translateX(-50%);
              background: url('./images/bg_targeting_number.png') no-repeat;
              background-size: 100% 100%;
              z-index: 8888;
              line-height: 91px;
              text-align: center;
              color: #01274c;
            }
            .msg-chart-wrap3 {
              margin: 0 auto;
              width: 60%;
              height: 60%;
              border-radius: 50% 50%;
              background: rgba(48, 212, 178, 1);
              position: relative;
              .chart-show-number {
                position: absolute;
                height: 127px;
                width: 167px;
                bottom: 9px;
                left: 50%;
                transform: translateX(-50%);
                background: url('./images/bg_targeting_number.png') no-repeat;
                background-size: 100% 100%;
                z-index: 8888;
                line-height: 91px;
                text-align: center;
                color: #01274c;
              }
            }
          }
        }
      }
      .targeting-msg-btn {
        text-align: center;
        span {
          border: 1px #01ffff solid;
          color: white;
          cursor: pointer;
          display: inline-block;
          padding: 10px 15px;
        }
      }
      .targeting-msg-btn>span:hover {
        opacity: 0.6;
      }
    }
  }
  // 队伍情况
  .team-situation {
    position: relative;
    background: url('./images/bg_img.png') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 46%;
    padding: 6% 2%;
  }
}
</style>