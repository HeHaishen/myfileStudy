<template>
  <div class="warning-right">
    <!-- 監測預警开始 -->
    <div class="early-warn">
      <!-- 更新时间 -->
      <div class="updateTime">更新时间:2020-10-20 18:00:00</div>
      <!-- 预警标题 -->
      <div class="title">监测预警</div>
      <!-- 预警数 -->
      <div class="warnNumber">
        <div class="early-desc">
          <div class="block">
            <p>总预警数</p>
            <div>33</div>
          </div>
          <div class="block">
            <p>企业预警数</p>
            <div>10</div>
          </div>
          <div class="block">
            <p>运输预警数</p>
            <div>23</div>
          </div>
        </div>
      </div>
      <!-- 预警监测信息 -->
      <div class="early-form">
        <!-- 标题 -->
        <div class="form-title">预警监测信息</div>
        <!-- 表格 -->
        <div class="form-content">
          <!-- 表头 -->
          <div class="form-header">
            <p>预警对象</p>
            <p>预警项</p>
            <p>预警内容</p>
            <p>预警接收人</p>
            <p>预警时间</p>
          </div>
          <!-- 表体 -->
          <ul>
            <li v-for="(item, index) in listData" :key="index">
              <p>{{ item.name }}</p>
              <p>{{ item.type }}</p>
              <p>{{ item.content }}</p>
              <p>{{ item.person }}</p>
              <p>{{ item.time }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 警示信息 -->
      <vue-seamless-scroll
        :class-option="classOption"
        class="warn-tip"
        :data="tipData"
      >
        <!-- 标题 -->
        <div class="tip-title">全国自然灾害综合风险预警提示</div>
        <!-- 提示内容 -->
        <div class="warn-desc">
          1月份全国自然灾害风险形势总体平稳。主要灾害种类为：森林火灾，低温雨雪冰冻和地震灾害。春运前期，人员流动增多，交通压力增大，需防范局部低温雨雪冰冻灾害对交通运输的不利影响
        </div>
      </vue-seamless-scroll>
    </div>
    <!-- 监测预警结束 -->

    <!-- 重点监管区域开始 -->
    <div class="key-area">
      <!-- 更新时间 -->
      <div class="updateTime">更新时间:2020-10-20 18:00:00</div>
      <!-- 重点监管区域标题 -->
      <div class="title">重点监管区域</div>
      <ul class="area-list">
        <li v-for="(item, index) in areaData" :key="index">
          <div
            :class="['area-title', item.status == 0 ? 'area-title-status' : '']"
          >
            {{ item.area }}
          </div>
          <div
            :class="[
              'area-information',
              item.status == 0 ? 'area-information-status' : '',
            ]"
          >
            <div class="infor-left">
              <p>{{ item.number }}</p>
              <p>{{ item.numberText }}</p>
            </div>
            <div class="infor-right">
              <p>{{ item.principal }}</p>
              <p>{{ item.phoneNumber }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="resource">
        <div class="resource-title">黄埔广石化片区应急资源</div>
        <ul class="resource-list">
          <li>
            <div class="resource-left">应急队伍</div>
            <div class="resource-right">
              <p>人员总数</p>
              <p><span>30377</span>人</p>
              <p>队伍总数</p>
              <p><span>493</span>支</p>
            </div>
          </li>
          <li>
            <div class="resource-left">应急队伍</div>
            <div class="resource-right">
              <p>人员总数</p>
              <p><span>30377</span>人</p>
              <p>队伍总数</p>
              <p><span>493</span>支</p>
            </div>
          </li>
          <li>
            <div class="resource-left">应急队伍</div>
            <div class="resource-right">
              <p>人员总数</p>
              <p><span>30377</span>人</p>
              <p>队伍总数</p>
              <p><span>493</span>支</p>
            </div>
          </li>
          <li>
            <div class="resource-left">应急队伍</div>
            <div class="resource-right">
              <p>人员总数</p>
              <p><span>30377</span>人</p>
              <p>队伍总数</p>
              <p><span>493</span>支</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "",
  props: {},
  components: { vueSeamlessScroll },
  data() {
    return {
      listData: [
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
        {
          name: "市应急局危险化学品安全平台",
          type: "企业重大危险源备案无效预警",
          content: "运输企业【广州市XXX公司】XXXX......",
          person: "黄大山",
          time: "2020-04-24 10:09:30",
        },
      ],
      areaData: [
        {
          area: "黄埔广石化片区",
          number: "12",
          numberText: "隐患数量",
          principal: "安全负责人:黄大三",
          phoneNumber: "联系电话:13821426697",
          status: "1",
        },
        {
          area: "南沙小虎岛片区",
          number: "08",
          numberText: "隐患数量",
          principal: "安全负责人:黄大三",
          phoneNumber: "联系电话:13821426697",
          status: "0",
        },
        {
          area: "南沙港",
          number: "23",
          numberText: "隐患数量",
          principal: "安全负责人:黄大三",
          phoneNumber: "联系电话:13821426697",
          status: "0",
        },
        {
          area: "黄埔港",
          number: "25",
          numberText: "隐患数量",
          principal: "安全负责人:黄大三",
          phoneNumber: "联系电话:13821426697",
          status: "0",
        },
      ],
      classOption: {
        step: 0.5,
      },
      tipData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
.warning-right {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 2% 1%;
  /*监测预警 */
  .early-warn {
    width: 100%;
    height: 50%;
    position: relative;
    background-image: url("../images/boxBorder.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 1px solid transparent;
    box-sizing: border-box;
    color: #fff;
    //   监测预警数
    .warnNumber {
      width: 100%;
      height: 15%;
      position: absolute;
      top: 8%;
      box-sizing: border-box;
      //主要部分
      .early-desc {
        height: 100%;
        width: 58%;
        display: flex;
        justify-content: space-between;
        margin: auto;
        .block {
          height: 100%;
          width: 30%;
          //上半部分
          p {
            width: 100%;
            height: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            font-size: var(--super3-mini-font);
            padding: 10px 0;
            white-space: nowrap;
          }
          //下半部分
          div {
            width: 100%;
            height: 60%;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--mini-number-font);
            color: rgb(1, 255, 255);
            background-image: url("../images/warnNumBorder.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }
      }
    }
    //监测表格
    .early-form {
      width: 96%;
      height: 51%;
      position: absolute;
      top: 26%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      //监测信息标题
      .form-title {
        padding-bottom: 15px;
        font-weight: 700;
        box-sizing: border-box;
      }
      //监测信息表格
      .form-content {
        width: 100%;
        border: 1px solid rgb(2, 101, 181);
        background-color: rgb(5, 42, 86);
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 1.5%;
      }
      //表格头部
      .form-header {
        border-bottom: 1px solid rgb(4, 122, 154);
        color: rgb(0, 255, 255);
        p {
          font-weight: 700;
          padding: 10px 0;
          box-sizing: border-box;
          font-size: var(--super3-mini-font);
        }
      }
      //表格滚动条
      ul::-webkit-scrollbar,
      ul::-webkit-scrollbar-track {
        background-color: transparent;
      }
      //表格内容
      ul {
        height: calc(100% - 50px);
        overflow-y: scroll;
        li {
          color: #00ecff;
          background-color: #053566;
          font-size: var(--super2-mini-font);
          margin-top: 1%;
          padding: 10px 0px;
        }
        li:nth-child(2n) {
          background-color: #054583;
        }
      }
      //定义表格头部与表格内容的宽度
      .form-header,
      li {
        //表格内容居中
        display: flex;
        align-items: center;
        p:nth-child(1) {
          width: 20%;
        }
        p:nth-child(2) {
          width: 20%;
        }
        p:nth-child(3) {
          width: 20%;
        }
        p:nth-child(4) {
          width: 20%;
          text-align: center;
        }
        p:nth-child(5) {
          width: 20%;
        }
      }
    }
    //预警提示
    .warn-tip {
      width: 96%;
      max-height: 17%;
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid rgb(160, 52, 89);
      background-color: rgb(52, 38, 77);
      text-align: center;
      padding: 0% 2%;
      overflow: hidden;
    }
    .tip-title {
      padding: 10px 0;
      font-weight: bold;
      box-sizing: border-box;
      font-size: var(--super3-mini-font);
    }
    .warn-desc {
      font-size: var(--super1-mini-font);
    }
  }
  // 标题
  .title {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--large-font);
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 5px #fff, 0 0 10px #0071a6, 0 0 15px #0071a6,
      0 0 20px #0071a6;
  }
  /*重点监管区域 */

  .key-area {
    color: #fff;
    width: 100%;
    position: relative;
    height: 46%;
    background-image: url("../images/boxBorder.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 1px solid transparent;
    box-sizing: border-box;
    padding: 0 1.6%;
    // 不换行
    p {
      white-space: nowrap;
    }
    /*监测预警 */

    .area-list {
      width: 90%;
      height: 28%;
      display: flex;
      justify-content: space-around;
      position: absolute;
      left: 50%;
      top: 19%;
      transform: translateX(-50%);
      li {
        overflow: hidden;
        width: 23%;
        height: 100%;
        .area-title {
          background: linear-gradient(
            to right,
            rgb(184, 52, 89),
            rgb(11, 36, 73)
          );
          height: 29%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0px 5%;
          font-size: var(--super3-mini-font);
        }
        // 根据状态显示不同的颜色
        .area-title-status {
          background: linear-gradient(
            to right,
            rgb(0, 192, 212),
            rgb(7, 36, 76)
          );
        }
        .area-information {
          display: flex;
          justify-content: flex-start;
          border: 1px solid rgb(201, 55, 92);
          box-sizing: border-box;
          height: 71%;
          position: relative;
          background-color: rgb(51, 39, 77);
        }
        // 根据状态显示不同的颜色
        .area-information-status {
          background-color: rgb(7, 54, 106);
          border: 1px solid rgb(4, 77, 145);
        }
        // 左侧信息
        .infor-left {
          height: 100%;
          box-sizing: border-box;
          width: 30%;
          position: relative;
          p:first-child {
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            font-weight: 900;
            font-size: var(--small-font);
            color: rgb(230, 57, 93);
          }
          p:last-child {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 60%;
            font-size: var(--super1-mini-font);
          }
        }
        // 右侧信息
        .infor-right {
          width: 70%;
          height: 100%;
          box-sizing: border-box;
          text-align: left;
          position: relative;
          p:first-child {
            position: absolute;
            top: 27%;
            left: 0;
            font-size: var(--super1-mini-font);
          }
          p:last-child {
            position: absolute;
            top: 60%;
            left: 0;
            font-size: var(--super1-mini-font);
          }
        }
      }
    }
    // 应急资源
    .resource {
      height: 40%;
      width: 96%;
      position: absolute;
      top: 52%;
      box-sizing: border-box;
      // 标题
      .resource-title {
        height: 32%;
        font-weight: bold;
      }
      // 资源列表
      .resource-list {
        width: 91%;
        height: 68%;
        display: flex;
        justify-content: space-between;
        margin: auto;
        li {
          overflow: hidden;
          width: 23%;
          display: flex;
          justify-content: flex-start;
          height: 100%;
          .resource-left {
            height: 100%;
            width: 18%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(0, 132, 233);
            box-sizing: border-box;
            writing-mode: vertical-rl;
            font-size: var(--super2-mini-font);
          }
          .resource-right {
            width: 82%;
            background: linear-gradient(
              to right,
              rgb(10, 57, 108),
              rgb(10, 38, 78)
            );
            height: 100%;
            position: relative;
            p {
              position: absolute;
            }
            p:nth-child(1) {
              left: 10%;
              top: 11%;
              font-size: var(--super1-mini-font);
            }
            p:nth-child(2) {
              left: 34%;
              top: 27%;
              font-size: var(--super1-mini-font);

              span {
                font-size: var(--small-font);
                color: rgb(1, 255, 255);
                font-weight: bold;
              }
            }
            p:nth-child(3) {
              left: 10%;
              top: 58%;
              font-size: var(--super1-mini-font);
            }
            p:nth-child(4) {
              left: 34%;
              top: 71%;
              font-size: var(--super1-mini-font);

              span {
                font-size: var(--small-font);
                color: rgb(1, 255, 255);
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
//更新时间
.updateTime {
  position: absolute;
  right: 6%;
  top: 4%;
  color: #fff;
  font-size: var(--super1-mini-font);
}
</style>