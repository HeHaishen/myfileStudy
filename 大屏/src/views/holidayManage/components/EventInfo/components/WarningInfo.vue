<template>
  <div class="warning-info">
    <div class="title">预警信息</div>
    <div class="info-content">
      <!-- tab切换 -->
      <div class="info-header">
        <div
          v-for="(item, index) in tabData"
          :key="index"
          :class="['tab-box', index == selectIndex ? 'tab-bgc' : '']"
          @click="select(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="info-from">
        <div class="from-header">
          <p>监测时间</p>
          <p>监测内容</p>
          <p>级别</p>
          <p>监测来源</p>
        </div>
        <ul>
          <li v-for="(item, index) in listData" :key="index">
            <p>{{ item.monitorTime }}</p>
            <p>{{ item.monitorContent }}</p>
            <p>
              <span :style="{ background: getBgc(item.level) }">
                {{ item.levelText }}
              </span>
            </p>
            <p>{{ item.source }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabData: ["全部", "安全生产", "自然灾害"],
      listData: [
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "[红色预警]监测到xxxxxxxx企业xxx设备容器温度达到55℃",
          level: "1",
          source: "xxx企业",
          levelText: "红色预警",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "[红色预警]监测到xxxxxxxx企业xxx设备容器温度达到55℃",
          level: "2",
          source: "xxx企业",
          levelText: "红色预警",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "[红色预警]监测到xxxxxxxx企业xxx设备容器温度达到55℃",
          level: "3",
          source: "xxx企业",
          levelText: "红色预警",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "[红色预警]监测到xxxxxxxx企业xxx设备容器温度达到55℃",
          level: "1",
          source: "xxx企业",
          levelText: "红色预警",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "[红色预警]监测到xxxxxxxx企业xxx设备容器温度达到55℃",
          level: "2",
          source: "xxx企业",
          levelText: "红色预警",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "[红色预警]监测到xxxxxxxx企业xxx设备容器温度达到55℃",
          level: "1",
          source: "xxx企业",
          levelText: "红色预警",
        },
      ],
      selectIndex: 0, //选中的tab选项
    };
  },
  methods: {
    select(i) {
      this.selectIndex = i;
    },
    getBgc(level) {
      if (level == 1) {
        return "red";
      }
      if (level == 2) {
        return "rgb(233,200,45)";
      }
      if (level == 3) {
        return "skyblue";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.warning-info {
  width: 100%;
  height: 100%;
  background-image: url("../images/bigBorder.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
  position: relative;
  padding: 0 4% 4%;
  // 标题
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -3%;
    white-space: nowrap;
    color: rgb(41, 255, 255);
    font-weight: bold;
    font-size: var(--large-font);
  }
  //主要内容
  .info-content {
    width: 100%;
    height: 87%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 8%;
    //   tab切换
    .info-header {
      width: 42%;
      height: 12%;
      display: flex;
      justify-content: space-between;
      .tab-box {
        width: 31%;
        height: 100%;
        border: 1px solid rgb(7, 132, 158);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: var(--super-mini-font);
        cursor: pointer;
      }
      .tab-bgc {
        background-color: rgb(12, 73, 118);
        box-shadow: inset 1px 0px 12px rgb(11, 115, 146);
      }
    }

    .info-from {
      width: 100%;
      height: 85%;
      color: #fff;
      font-size: var(--super-mini-font);
      overflow: hidden;
      .from-header {
        background-color: rgb(27, 51, 99);
      }
      ul {
        li:nth-child(2n) {
          background-color: rgb(27, 51, 99);
        }
      }
      .from-header,
      li {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        p {
          display: flex;
          justify-content: space-around;
          text-align: center;
        }
        p:nth-child(1) {
          width: 25%;
        }
        p:nth-child(2) {
          width: 30%;
        }
        p:nth-child(3) {
          width: 17%;
        }
        p:nth-child(4) {
          width: 25%;
        }
      }
      li p:nth-child(3) span {
        padding: 10px;
        display: inline-block;
      }
    }
  }
}
</style>