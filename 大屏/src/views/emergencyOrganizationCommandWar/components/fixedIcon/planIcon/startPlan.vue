<!--
 * @Description: 启动预案
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-11-01 20:30:17
 * @LastEditTime: 2021-11-04 15:03:01
-->
<template>
  <div class="start-plan">
    <pop-up-layer
      :show="layerShow"
      @doClose="layerClose"
      :title="title"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="start-plan-content">
          <ul class="start-plan-list">
            <li
              v-for="(i, k) in labelList"
              :key="k"
              :class="[i.id === 7 ? 'aline-li' : '']"
            >
              <label for="">{{ i.title }}</label>
              <div>{{ i.content }}</div>
            </li>
          </ul>
          <div class="message-show">
            <div class="message-detail">是否启动该预案？</div>
            <div class="message-btn">
              <p class="ms-btn" @click="doSure">是</p>
              <p class="ms-btn" @click="doDisable">否</p>
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>
  </div>
</template>

<script>
import { startPlanApi } from "@/api/emergencyOrganizationCommandWar";
export default {
  data() {
    return {
      title: "启动预案-",
      layerShow: false,
      parentDatas: {},
      typeObj: {},
      levelObj: {},
      planTypeObj: {},
      labelList: [
        { id: 1, title: "预案类型：", indexKey: "planCategory", content: "" },
        { id: 2, title: "事件类型", indexKey: "eventTypeName", content: "" },
        {
          id: 3,
          title: "编制部门：",
          indexKey: "preparationDepartment",
          content: "",
        },
        { id: 4, title: "发布日期：", indexKey: "releaseTime", content: "" },
        {
          id: 5,
          title: "印发部门： ",
          indexKey: "issuingDepartment",
          content: "",
        },
        { id: 6, title: "印发日期：", indexKey: "issueTime", content: "" },
        {
          id: 7,
          title: "适用范围：",
          indexKey: "scope",
          content: "",
        },
      ],
    };
  },
  mounted() {
    this.$on("show", (item) => {
      console.log(item);
      this.parentDatas = item;
      this.title = `启动预案-${item.planName}`;
      this.layerShow = true;
      this.init(item);
    });
  },
  methods: {
    init(item) {
      this.labelList.map((i, k) => {
        if (i.indexKey === "eventTypeName") {
          this.labelList[k].content = "";
          item["eventTypeName"].map((ie, ke) => {
            this.labelList[k].content =
              this.labelList[k].content +
              this.typeObj[ie] +
              (item["eventTypeName"].length - 1 === ke ? "" : "、");
          });
        } else if (i.indexKey === "planCategory") {
          console.log(999999, this.planTypeObj);
          this.labelList[k].content = item.planCategory
            ? this.planTypeObj[item.planCategory]
            : "";
        } else {
          this.labelList[k].content = item[this.labelList[k].indexKey];
        }
      });
    },
    layerClose() {
      this.layerShow = false;
    },
    /* 是 */
    doSure() {
      let parsentDatas = this.parentDatas;
      let sendObj = {
        planId: parsentDatas.sid,
        eventId: parsentDatas.eventDatas.jbbh,
      };
      startPlanApi(sendObj).then((res) => {
        if (res.success) {


          this.$MyMessage.success("启动预案成功！");
          this.layerShow = false;
          this.$emit("doSure", { ...this.parentDatas });
        } else {
          this.$MyMessage.error("启动预案失败！请稍后再试");
        }
      });
    },
    /* 否 */
    doDisable() {
      this.layerShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../fixedIcon/common.less";
.start-plan {
  /deep/ .start-plan-content {
    width: 1820vw * @w;
    height: 900vh * @h;
    overflow: auto;
    .start-plan-list {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      margin-bottom: 24vh * @h;
      li {
        width: 45%;
        height: auto;
        min-height: 55vh * @h;
        color: white;
        font-size: 32vh * @h;
        display: flex;
        justify-content: flex-start;
        label {
          display: block;
          width: 200vw * @w;
          flex-shrink: 0;
          text-align: right;
          padding-right: 24vw * @w;
          white-space: nowrap;
        }
        div {
          flex-shrink: 0;
          width: calc(100% - 200vw * @w);
        }
      }
      .aline-li {
        width: 100%;
      }
    }
    .message-show {
      width: 100%;
      height: auto;
      .message-detail {
        width: 100%;
        height: 38vh * @h;
        line-height: 38vh * @h;
        font-size: 34vh * @h;
        color: white;
        text-align: center;
      }
      .message-btn {
        width: 100%;
        height: 38vh * @h;
        display: flex;
        justify-content: center;
        .ms-btn {
          margin-top: 32vh * @h;
          width: 120vw * @w;
          height: 50vh * @h;
          line-height: 50vh * @h;
          border: 1px solid rgba(18, 150, 219, 1);
          font-size: 32vh * @h;
          text-align: center;
          color: white;
          margin-right: 32vw * @w;
        }
      }
    }
  }
}
</style>
