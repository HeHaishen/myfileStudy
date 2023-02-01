<template>
  <div class="warn-screen">
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
    <div class="key-area">
      <div class="title">重点监管区域</div>
      <ul class="area-list">
        <li>
          <div class="area-title">黄埔广石化片区</div>
          <div class="area-information">
            <div class="infor-left">
              <p>12</p>
              <p>隐患数量</p>
            </div>
            <div class="infor-right">
              <p>安全负责人：黄大三</p>
              <p>联系电话：13821426697</p>
            </div>
          </div>
        </li>
        <li>
          <div class="area-title">黄埔广石化片区</div>
          <div class="area-information">
            <div class="infor-left">
              <p>12</p>
              <p>隐患数量</p>
            </div>
            <div class="infor-right">
              <p>安全负责人：黄大三</p>
              <p>联系电话：13821426697</p>
            </div>
          </div>
        </li>
        <li>
          <div class="area-title">黄埔广石化片区</div>
          <div class="area-information">
            <div class="infor-left">
              <p>12</p>
              <p>隐患数量</p>
            </div>
            <div class="infor-right">
              <p>安全负责人：黄大三</p>
              <p>联系电话：13821426697</p>
            </div>
          </div>
        </li>
        <li>
          <div class="area-title">黄埔广石化片区</div>
          <div class="area-information">
            <div class="infor-left">
              <p>12</p>
              <p>隐患数量</p>
            </div>
            <div class="infor-right">
              <p>安全负责人：黄大三</p>
              <p>联系电话：13821426697</p>
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
              <p>30377人</p>
              <p>队伍总数</p>
              <p>493支</p>
            </div>
          </li>
          <li>
            <div class="resource-left">应急队伍</div>
            <div class="resource-right">
              <p>人员总数</p>
              <p>30377人</p>
              <p>队伍总数</p>
              <p>493支</p>
            </div>
          </li>
          <li>
            <div class="resource-left">应急队伍</div>
            <div class="resource-right">
              <p>人员总数</p>
              <p>30377人</p>
              <p>队伍总数</p>
              <p>493支</p>
            </div>
          </li>
          <li>
            <div class="resource-left">应急队伍</div>
            <div class="resource-right">
              <p>人员总数</p>
              <p>30377人</p>
              <p>队伍总数</p>
              <p>493支</p>
            </div>
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
};
</script>

<style lang='less' scoped>
@h:100 /1080;
@w:100 /1920;
.warn-screen {
  margin: auto;
  width: @w*1637vw;
  height: @h*1832vh;
  background-color: rgb(9, 20, 50);
  box-sizing: border-box;
  padding: @h*50vh @w*20vw;
  // 标题
  .title {
    color: rgb(235, 240, 243);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -35%);
    font-size: @h*43vh;
    font-weight: bold;
    text-shadow: rgb(180, 227, 248) 0px 0px @h*20vh;
  }
  /*监测预警 */
  .early-warn {
    color: #fff;
    position: relative;
    width: @w*1584vw;
    height: @h*824vh;
    background-image: url("./images/boxBorder.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 1px solid transparent;
    padding: 0px @w*36vw;
  }
  .warnNumber {
    margin-top: @h*65vh;
    .early-desc {
      width: @w*925vw;
      display: flex;
      justify-content: space-between;
      margin: auto;
      p {
        height: @h*58vh;
        line-height: @h*58vh;
        font-size: @h*25vh;
      }
      .block {
        width: @w*225vw;
        text-align: center;
        div {
          height: @h*60vh;
          background-image: url("./images/warnNumBorder.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: @h*60vh;
          font-size: @h*38vh;
          font-weight: 700;
          color: rgb(1, 255, 255);
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
      width: @w*1500vw;
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
  /*监测预警结束 */

  /*重点监管区域 */
  /*监测预警 */
  .key-area {
    color: #fff;
    position: relative;
    width: @w*1584vw;
    height: @h*853vh;
    background-image: url("./images/boxBorder.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 1px solid transparent;
    padding: 0px @w*40vw 0 @w*28vw;
    margin-top: @h*67vh;
    box-sizing: border-box;
    .area-list {
      width: @w*1465vw;
      height: @h*188vh;
      margin: @h*160vh auto 0;
      display: flex;
      justify-content: space-around;
      li {
        width: @w*307vw;
        height: @h*186vh;
        background-image: url("./images/skyblueBorder.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .area-title {
          height: @h*50vh;
          line-height: @h*50vh;
          font-size: @h*18vh;
          margin-left: @w*18vw;
        }
        .area-information {
          display: flex;
          text-align: center;
        }
        .infor-left {
          width: @w*100vw;
          height: @h*136vh;
          p:first-child {
            font-size: @h*42vh;
            font-weight: 900;
            color: rgb(230, 57, 93);
            margin: @h*20vh 0 @h*16vh;
          }
          p:last-child {
            font-size: @h*14vh;
          }
        }
        .infor-right {
          width: @w*207vw;
          height: @h*136vh;
          text-align: left;
          p {
            margin-top: @h*32vh;
            font-size: @h*16vh;
          }
        }
      }
      li:first-child {
        background-image: url("./images/redBorder.png");
      }
    }
    // .resource {
    //   .resource-title {
    //     height: @h*60vh;
    //     linh
    //   }
    // }
  }
}
</style>