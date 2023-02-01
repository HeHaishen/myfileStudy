<template>
  <!-- 監測左侧 -->
  <div class="warning-left">
    <!-- 水位预警监测信息 -->
    <div class="water-level">
      <!-- 更新时间 -->
      <div class="updateTime">更新时间:2020-10-20 18:00:00</div>
      <!-- 标题 -->
      <div class="title">水位预警监测信息</div>
      <div class="level-content">
        <!-- 提示 -->
        <div class="level-tip">
          当前我市共有<span>15</span>个测站水位超警戒线
        </div>
        <div class="level-form">
          <!-- 面包屑导航 -->
          <div class="crumbs">
            <span>全部</span>
            <span> / 珠江潮位 / </span>
            <span>水位站</span>
          </div>
          <!-- 表格 -->
          <div class="form-content">
            <div class="form-header">
              <p>序号</p>
              <p>类型</p>
              <p>名称</p>
              <p>警戒水位(m)</p>
              <p>实时水位</p>
            </div>
            <ul>
              <li v-for="item in listData" :key="item.sid">
                <p>{{ item.number }}</p>
                <p>{{ item.type }}</p>
                <p>{{ item.name }}</p>
                <p>{{ item.alertValue }}</p>
                <p :class="[item.value >= item.alertValue ? 'exceed' : '']">
                  {{ item.value }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="key-reservoir">
      <div class="updateTime">更新时间:2020-10-20 18:00:00</div>
      <div class="title">重点水库信息</div>
      <div class="area-waterLevel">
        <ul>
          <li
            v-for="(item, index) in waterData"
            :key="index"
            :class="[item.waterLevel > item.warningWaterLevel ? 'red-box' : '']"
          >
            <p>警戒水位(m):{{ item.warningWaterLevel }}</p>
            <p>{{ item.waterLevel }}</p>
            <p>实时水位(m)</p>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="key-form">
        <div class="form-content">
          <div class="form-header">
            <p>序号</p>
            <p>名称</p>
            <p>警戒水位(m)</p>
            <p>实时水位</p>
          </div>
          <ul>
            <li v-for="item in keyData" :key="item.sid">
              <p>{{ item.number }}</p>
              <p>{{ item.name }}</p>
              <p>{{ item.warningWaterLevel }}</p>
              <p
                :class="[
                  item.waterLevel >= item.warningWaterLevel ? 'exceed' : '',
                ]"
              >
                {{ item.waterLevel }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  findEarlyWarn,
  findKeyReservoir,
} from "@/api/integratedManage/WaterWarning";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      // 水位预警检测信息
      listData: [
        {
          sid: "1",
          number: "1",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "2",
          number: "2",
          type: "水位站",
          name: "南顺水闸",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "3",
          number: "3",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "4",
          number: "4",
          type: "水位站",
          name: "南顺水闸",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "5",
          number: "5",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "6",
          number: "6",
          type: "水位站",
          name: "南顺水闸",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "7",
          number: "7",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "8",
          number: "8",
          type: "水位站",
          name: "南顺水闸",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "9",
          number: "9",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "10",
          number: "9",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "11",
          number: "9",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
        {
          sid: "12",
          number: "9",
          type: "珠江潮位",
          name: "鸿鹏岗水库",
          alertValue: "1.14",
          value: "1.51",
        },
      ],
      //重点水库
      waterData: [{}],
      //重点水库信息
      keyData: [
        {
          sid: "1",
          number: "1",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
        {
          sid: "2",
          number: "2",
          name: "南顺水闸",
          waterLevel: "1.10",
          warningWaterLevel: "1.21",
        },
        {
          sid: "3",
          number: "3",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
        {
          sid: "4",
          number: "4",
          name: "南顺水闸",
          waterLevel: "1.10",
          warningWaterLevel: "1.21",
        },
        {
          sid: "5",
          number: "5",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
        {
          sid: "6",
          number: "6",
          name: "南顺水闸",
          waterLevel: "1.10",
          warningWaterLevel: "1.21",
        },
        {
          sid: "7",
          number: "7",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
        {
          sid: "8",
          number: "8",
          name: "南顺水闸",
          waterLevel: "1.10",
          warningWaterLevel: "1.21",
        },
        {
          sid: "9",
          number: "9",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
        {
          sid: "10",
          number: "9",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
        {
          sid: "11",
          number: "9",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
        {
          sid: "12",
          number: "9",
          name: "鸿鹏岗水库",
          waterLevel: "1.14",
          warningWaterLevel: "1.51",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  created() {
    this.doEarlyWarn(); //查询水位预警检测信息
    this.doReservoir(); //查询重点水库信息
  },
  mounted() {},
  methods: {
    // 查询水位预警
    doEarlyWarn() {
      const data = {
        body: {},
        sortName: "sid",
        sortOrder: "desc",
      };
      findEarlyWarn(data).then((res) => {
        if (res.success) {
          let arr = JSON.parse(JSON.stringify(res.body));
          arr.map((e, i) => {
            e.number = i + 1;
          });
          this.listData = arr;
        } else {
        }
      });
    },
    // 查询重点水库
    doReservoir() {
      const data = {
        body: {},
        sortName: "sid",
        sortOrder: "desc",
      };
      findKeyReservoir(data).then((res) => {
        if (res.success) {
          let keyArr = JSON.parse(JSON.stringify(res.body));
          keyArr.forEach((e, i) => {
            e.number = i + 1;
          });
          this.keyData = keyArr;
          let arr = JSON.parse(JSON.stringify(keyArr));
          this.waterData = arr.splice(0, 5);
        } else {
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
.warning-left {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 2% 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
//实时超过预警
.exceed {
  color: rgb(202, 16, 29);
}
.water-level {
  width: 100%;
  height: 48%;
  background-image: url("../images/boxBorder.png");
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  padding: 0 3%;
  .level-content {
    width: 100%;
    height: 84%;
    // 水位预警提示
    .level-tip {
      width: 100%;
      box-sizing: border-box;
      max-height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(53, 38, 77);
      border: 1px solid rgb(230, 57, 93);
      font-size: var(--super1-mini-font);
      padding: 10px 0;
      color: #fff;
      font-weight: bold;

      span {
        font-size: var(--mini-font);
        color: rgb(253, 1, 1);
      }
    }
    //主要部分
    .level-form {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      //面包屑
      .crumbs {
        padding: 14px 0;
        box-sizing: border-box;
        font-size: var(--super-mini-font);
        span:first-child {
          color: rgb(248, 249, 250);
        }
        span {
          color: rgb(203, 199, 192);
        }
      }
      //表格
      .form-content {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgb(2, 101, 181);
        background-color: rgb(5, 42, 86);
        overflow: hidden;
        padding: 0 1%;
      }
      .form-header {
        border-bottom: 1px solid rgb(4, 122, 154);
        color: rgb(0, 255, 255);
        p {
          font-weight: 700;
          padding: 10px 0;
          font-size: var(--super3-mini-font);
        }
      }
      ul::-webkit-scrollbar,
      ul::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ul {
        height: calc(100% - 50px);
        overflow-y: scroll;
        li {
          color: #00ecff;
          background-color: #053566;
          margin-top: 1%;
          font-size: var(--super2-mini-font);
        }
        li:nth-child(2n) {
          background-color: #054583;
        }
      }
      .form-header p {
        white-space: nowrap;
      }
      .form-header,
      li {
        font-size: var(--super-mini-font);
        text-align: center;
        display: flex;
        align-items: center;
        p {
          padding: 10px 0;
        }
        p:nth-child(1) {
          width: 10%;
        }
        p:nth-child(2) {
          width: 25%;
        }
        p:nth-child(3) {
          width: 25%;
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
  }
}

// 重点水库信息
.key-reservoir {
  width: 100%;
  height: 48%;
  background-image: url("../images/boxBorder.png");
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: 1px solid transparent;
  padding: 8% 3% 2.5%;
  display: flex;
  flex-direction: column;

  // 水库警戒水位
  .area-waterLevel {
    width: 100%;
    height: 28%;
    margin-bottom: 2%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        font-size: 14px;
        color: #fff;
        position: relative;
        flex-shrink: 0;
        top: 0;
        left: 0;
        width: 130px;
        height: 130px;
        display: flex;
        flex-direction: column;
        background-image: url("../images/circleBorder.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        p {
          white-space: nowrap;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          font-size: var(--super1-mini-font);
        }
        p:nth-child(1) {
          top: -5%;
        }
        p:nth-child(2) {
          top: 19%;
          color: rgb(1, 227, 254);
          font-weight: 700;
          font-size: 20px;
          font-size: var(--mini-font);
        }
        p:nth-child(3) {
          top: 49%;
        }
        p:nth-child(4) {
          bottom: 5%;
          font-size: var(--super2-mini-font);
        }
      }
      .red-box {
        background-image: url("../images/redCircle.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        p:nth-child(2) {
          color: rgb(254, 1, 1);
        }
      }
    }
  }
  //警戒水位表格
  .key-form {
    height: 59%;
    //表格
    .form-content {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid rgb(2, 101, 181);
      background-color: rgb(5, 42, 86);
      overflow: hidden;
      padding: 0 1%;
    }
    .form-header {
      border-bottom: 1px solid rgb(4, 122, 154);
      color: rgb(0, 255, 255);
      p {
        font-weight: 700;
        padding: 10px 0;
        font-size: var(--super3-mini-font);
      }
    }
    ul::-webkit-scrollbar,
    ul::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ul {
      height: calc(100% - 50px);
      overflow-y: scroll;
      li {
        font-size: var(--super2-mini-font);
        color: #00ecff;
        background-color: #053566;
        margin-top: 1%;
      }
      li:nth-child(2n) {
        background-color: #054583;
      }
    }
    .form-header,
    li {
      font-size: var(--super-mini-font);
      text-align: center;
      display: flex;
      align-items: center;
      p {
        padding: 10px 0;
      }
      p:nth-child(1) {
        width: 15%;
      }
      p:nth-child(2) {
        width: 35%;
      }
      p:nth-child(3) {
        width: 25%;
      }
      p:nth-child(4) {
        width: 25%;
        text-align: center;
      }
    }
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
  white-space: nowrap;
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #0071a6, 0 0 15px #0071a6,
    0 0 20px #0071a6;
  white-space: nowrap;
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