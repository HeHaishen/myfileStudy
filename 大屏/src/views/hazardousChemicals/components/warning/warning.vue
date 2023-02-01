<template>
  <!-- 监测预警 -->
  <div class="early-warn">
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
            <div class="div_green">10</div>
          </div>
          <div class="block">
            <p>运输预警数</p>
            <div class="div_red">23</div>
          </div>
        </div>
      </div>
      <!-- 预警监测信息 -->
      <div class="early-form">
        <div class="form-title">预警监测信息</div>
        <div class="form-content">
          <div class="form-header">
            <p>预警对象</p>
            <p>预警项</p>
            <p>预警内容</p>
            <p>预警接收人</p>
            <p>预警时间</p>
          </div>
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
      <div class="warn-tip">
        <div class="tip-title">全国自然灾害综合风险预警提示</div>
        <div class="warn-desc">
          1月份全国自然灾害风险形势总体平稳。主要灾害种类为：森林火灾，低温雨雪冰冻和地震灾害。春运前期，人员流动增多，交通压力增大，需防范局部低温雨雪冰冻灾害对交通运输的不利影响
        </div>
      </div>
    </div>
</template>
<script>
export default {
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
      ],
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang='less' scoped>
/*监测预警 */
@h:100 /1080;
@w:100 /1920;
.early-warn {
  color: #fff;
  position: relative;
  top: -4vh;
  width: @w*2000vw;
  height: @h*750vh;
  //background-image: url("./images/boxBorder.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: 1px solid transparent;
  //padding: 0px @w*36vw;
  .title {
    color: rgb(235, 240, 243);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -35%);
    font-size: @h*43vh;
    font-weight: bold;
    text-shadow: rgb(180, 227, 248) 0px 0px @h*20vh;
  }
  .warnNumber {
    margin-top: @h*45vh;
    .early-desc {
      width: @w*1200vw;
      display: flex;
      justify-content: space-between;
      margin: auto;
      p {
        height: @h*58vh;
        line-height: @h*58vh;
        font-size: @h*25vh;
      }
      .block {
        width: @w*300vw;
        text-align: center;
        div {
          height: @h*80vh;
          background-image: url("./images/warnNumBorder.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: @h*80vh;
          font-size: @h*50vh;
          font-weight: 700;
          color: rgb(1, 255, 255);
        }
        .div_green{
          background-image: url("./images/warnNumBorder_green.png");
        }
        .div_red{
          background-image: url("./images/warnNumBorder_red.png");
        }
      }
    }
  }
  .early-form {
    .form-title {
      height: @h*72vh;
      line-height: @h*72vh;
      font-size: @h*28vh;
      font-weight: 700;
    }
    .form-content {
      width: 100%;
      height: @h*342vh;
      border: @h*1vh solid rgb(2, 101, 181);
      box-sizing: border-box;
      padding: 0px @w*16vw;
      background-color: rgb(5, 42, 86);

      .form-header {
        height: @h*44vh;
        border-bottom: @h*1vh solid rgb(4, 122, 154);
        line-height: @h*44vh;
        color: rgb(0, 255, 255);
        p {
          font-weight: 700;
          font-size: @h*22vh;
        }
      }
      ul {
        li {
          color: #00ecff;
          background-color: #053566;
          height: @h*45vh;
          line-height: @h*45vh;
          margin-top: @h*10vh;
          font-size: @h*20vh;
          padding: 0px @w*26vw;
        }
        li:nth-child(2n) {
          background-color: #054583;
        }
      }
      .form-header,
      li {
        display: flex;
        p:nth-child(1) {
          width: @w*340vw;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
        p:nth-child(2) {
          width: @w*318vw;
        }
        p:nth-child(3) {
          width: @w*332vw;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
        p:nth-child(4) {
          width: @w*234vw;
          text-align: center;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
        p:nth-child(5) {
          width: @w*244vw;
        }
      }
    }
  }
  .warn-tip {
    border: @h*1vh solid rgb(160, 52, 89);
    background-color: rgb(52, 38, 77);
    margin-top: @h*42vh;
    width: @w*1500vw;
    height: @h*100vh;
    text-align: center;

    .tip-title {
      height: @h*50vh;
      line-height: @h*50vh;
      font-size: @h*20vh;
      font-weight: 700;
    }
    .warn-desc {
      height: @h*38vh;
      line-height: @h*38vh;
      font-size: @h*16vh;
    }
  }
}
</style>