<template>
  <div class="emergency">
    <div class="title">突发事件</div>
    <div class="info-content">
      <div class="header">
        <p>监测时间</p>
        <p>监测内容</p>
        <p>区域</p>
        <p>事件级别</p>
        <p>来源</p>
        <p>操作</p>
      </div>
      <ul>
        <li v-for="(item, index) in listData" :key="index">
          <p>{{ item.monitorTime }}</p>
          <p>{{ item.monitorContent }}</p>
          <p>{{ item.area }}</p>
          <p>{{ item.level }}</p>
          <p>{{ item.source }}</p>
          <p>{{ item.option }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "黄浦区黄埔东路发生内涝事故,造成大范围面积积水",
          area: "黄浦区",
          level: "红色预警",
          source: "黄浦区",
          option: "立项",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "黄浦区黄埔东路发生内涝事故,造成大范围面积积水",
          area: "黄浦区",
          level: "红色预警",
          source: "黄浦区",
          option: "立项",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "黄浦区黄埔东路发生内涝事故,造成大范围面积积水",
          area: "黄浦区",
          level: "红色预警",
          source: "黄浦区",
          option: "立项",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "黄浦区黄埔东路发生内涝事故,造成大范围面积积水",
          area: "黄浦区",
          level: "红色预警",
          source: "黄浦区",
          option: "立项",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "黄浦区黄埔东路发生内涝事故,造成大范围面积积水",
          area: "黄浦区",
          level: "红色预警",
          source: "黄浦区",
          option: "立项",
        },
        {
          monitorTime: "2021-05-13 13:00",
          monitorContent: "黄浦区黄埔东路发生内涝事故,造成大范围面积积水",
          area: "黄浦区",
          level: "红色预警",
          source: "黄浦区",
          option: "立项",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.emergency {
  width: 100%;
  height: 100%;
  background-image: url("../images/bigBorder.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
  position: relative;
  padding: 4%;
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
    height: 100%;
    box-sizing: border-box;
    color: #fff;
    overflow: hidden;
    font-size: var(--super-mini-font);
    padding: 0 1%;
    .header {
      background-color: rgb(27, 51, 99);
    }
    ul {
      li:nth-child(2n) {
        background-color: rgb(27, 51, 99);
      }
    }
    .header,
    li {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px 0;
      p {
        display: flex;
        justify-content: center;
      }
      p:nth-child(1) {
        width: 15%;
        text-align: center;
      }
      p:nth-child(2) {
        width: 28%;
      }
      p:nth-child(3) {
        width: 15%;
      }
      p:nth-child(4) {
        width: 15%;
      }
      p:nth-child(5) {
        width: 15%;
      }
      p:nth-child(6) {
        width: 10%;
      }
    }
    li {
      p:nth-child(6) {
        border: 1px solid rgb(12, 168, 185);
        padding: 6px 0;
        cursor: pointer;
      }
    }
  }
}
</style>