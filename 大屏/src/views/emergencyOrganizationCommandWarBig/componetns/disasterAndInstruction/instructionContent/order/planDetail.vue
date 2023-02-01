<!--
 * @Description: 预案详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-11-02 11:05:22
 * @LastEditTime: 2021-11-11 19:04:15
-->
<template>
  <div class="order-plan-detail">
    <div v-if="planId">
      <div class="order-plan-content-detail">
        <div class="detail-title" :title="formData.planName">
          {{ formData.planName }}
        </div>
        <div class="document-number" :title="formData.documentNumber">
          {{ formData.documentNumber }}
        </div>
      </div>
      <div class="detail">
        <div class="item">
          <div class="label">预案类型：</div>
          <div class="value" :title="formData.planCategoryName">
            {{ formData.planCategoryName }}
          </div>
        </div>
        <div class="item">
          <div class="label">编制部门：</div>
          <div class="value" :title="formData.preparationDepartment">
            {{ formData.preparationDepartment }}
          </div>
        </div>
        <div class="item">
          <div class="label">事件类型：</div>
          <div class="value" :title="formData.eventTypeName">
            {{ eventHand() }}
          </div>
        </div>
        <div class="item">
          <div class="label">发布日期：</div>
          <div class="value" :title="formData.releaseTime">
            {{ formData.releaseTime }}
          </div>
        </div>
        <div class="item">
          <div class="label">印发日期：</div>
          <div class="value" :title="formData.issueTime">
            {{ formData.issueTime }}
          </div>
        </div>
        <div class="item">
          <div class="label">印发部门：</div>
          <div class="value" :title="formData.issuingDepartment">
            {{ formData.issuingDepartment }}
          </div>
        </div>
      </div>
      <div class="btns">
        <a-button class="btn" @click="onPlanDetail"> 预案详情 </a-button>
        <a-button class="btn" @click="onPlanInstruction"> 预案指令 </a-button>
      </div>
    </div>
    <div v-else style="text-align: center; font-size: 38px; margin-top: 15px">
      暂未启动预案
    </div>

    <PlanDetail class="big_plan_detail" ref="planDetail"></PlanDetail>
    <sendOrder class="big_send_order" ref="sendOrder"></sendOrder>
  </div>
</template>

<script>
import { planDetaisUseId } from "@/api/emergencyOrganizationCommandWar";
import PlanDetail from "@/views/emergencyOrganizationCommandWarBig/componetns/disasterAndInstruction/disasterRisk/planDetail.vue";
import sendOrder from "@/views/emergencyOrganizationCommandWarBig/componetns/disasterAndInstruction/disasterRisk/sendOrder.vue";
import {
  getPlansList,
  planListType,
} from "@/api/emergencyOrganizationCommandWar";
import { getIdsmApi } from "@/api/idsm/index";

export default {
  components: {
    PlanDetail,
    sendOrder,
  },
  props: {
    planId: {
      type: String,
      default: "",
    },
    eventData:{
      type:Object,
      default:()=>{return {}}
    },
  },
  data() {
    return {
      formData: {},
      parentDatas: {},
      typeList: [],
      typeObj: {},
      levelList: [],
      levelObj: {},
      planTypeList: [], // 预案类型
      planTypeObj: {},
      /* 行政区划 */
      cityAreaList: [],
      cityAreaObj: {},
    };
  },
  watch: {
    planId: {
      immediate: true,
      handler(val, old) {
        if (val != old) {
          this.iconClick();
          this.doGetPlansList();
          this.init({ sid: val });
        }
      },
    },
  },
  mounted() {},
  methods: {
    init(item) {
      this.doPlanDetaisUseId(item);
    },
    doPlanDetaisUseId(item) {
      let sendObj = { sid: item.sid };
      planDetaisUseId(sendObj).then((res) => {
        if (res.success) {
          let index = this.planTypeList.findIndex(
            (e) => e.dictKey == res.body.planCategory
          );
          if (index > -1) {
            res.body.planCategoryName = this.planTypeList.find(
              (e) => e.dictKey == res.body.planCategory
            ).dictValue;
          }
          this.formData = res.body;
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    /** 预案详情 事件 */
    onPlanDetail() {
      this.$refs.planDetail.typeObj = this.typeObj;
      this.$refs.planDetail.levelObj = this.levelObj;
      this.$refs.planDetail.planTypeObj = this.planTypeObj;
      this.$refs.planDetail.cityAreaObj = this.cityAreaObj;
      this.$refs.planDetail.$emit("show", {
        ...this.formData,
      });
    },
    /** 预案指令 事件 */
    onPlanInstruction() {
      this.$refs.sendOrder.typeObj = this.typeObj;
      this.$refs.sendOrder.levelObj = this.levelObj;
      this.$refs.sendOrder.planTypeObj = this.planTypeObj;
      console.log(this.eventData,'this.parentDatas');
      this.$refs.sendOrder.$emit("show", {
        ...this.formData,
        eventDatas: this.eventData,
      });
    },

    eventHand() {
      let eventType = this.formData.eventType
        ? this.formData.eventType.split(",")
        : [];
      let str = [];
      eventType.map((v) => {
        let index = this.typeList.findIndex((e) => e.dictKey == v);
        if (index > -1) {
          str.push(this.typeList[index].dictValue);
        }
      });
      return str.toString();
    },

    async doGetPlansList() {
      this.levelList = await this.doDict("ZHDP_EVENT_LEVEL");
      this.typeList = await this.doDict("ZHDP_EVENT_TYPE");
      let typeObj = {};
      let levelObj = {};
      if (this.typeList.length) {
        let objType = await this.typeList.map((i, k) => {
          typeObj[i.dictKey] = i.dictValue;
        });
        this.typeObj = typeObj;
        let ObjLevel = await this.levelList.map((i, k) => {
          levelObj[i.dictKey] = i.dictValue;
        });
        this.levelObj = levelObj;
      }
    },

    // 查询字典
    async doDict(type, num = null) {
      let arr = [];
      let code = "9GO8HDzz";
      let data = {
        body: this.$filterParams({
          dictName: type,
          dictKey: num,
        }),
        page: 1,
        pageSize: 100,
        sortName: "sid",
        sortOrder: "desc",
      };
      await getIdsmApi(code, data).then(async (res) => {
        if (res.success) {
          arr = (await res.body) ? res.body.data : [];
        }
      });
      return arr;
    },
    async getPlanDict(dicKey) {
      let arr = [];
      await planListType(dicKey)
        .then(async (res) => {
          if (res.success) {
            console.log(res);
            arr = (await res.body) ? res.body : [];
          } else {
            arr = [];
          }
        })
        .catch((err) => {
          console.log(err);
          arr = [];
        });
      return arr;
    },
    async getPlanTypeList() {
      this.planTypeList = await this.getPlanDict("yalx");
      if (this.planTypeList.length) {
        let saveObj = {};
        let mapObj = await this.planTypeList.map((i, k) => {
          saveObj[i.dictKey] = i.dictValue;
        });
        this.planTypeObj = saveObj;
      }
    },
    /* 获取行政区划 */
    async getCityAreaList() {
      this.cityAreaList = await this.getPlanDict("admin_div");
      if (this.cityAreaList.length) {
        let saveObj = {};
        let mapObj = await this.cityAreaList.map((i, k) => {
          saveObj[i.dictKey] = i.dictValue;
        });
        this.cityAreaObj = saveObj;
      }
    },
    iconClick(e) {
      this.getPlanTypeList();
      this.getCityAreaList();
    },
  },
};
</script>

<style lang="less" scoped>
// @import "../../../common.less";
.order-plan-detail {
  width: 100%;
  color: white;

  .order-plan-content-detail {
    .detail-title {
      text-align: center;
      font-size: 48px;
    }
    .document-number {
      text-align: right;
      margin: 20px 0;
      font-size: 38px;
    }
  }

  .detail {
    overflow: hidden;
    margin-top: 24px;
    .item {
      width: 50%;
      float: left;
      overflow: hidden;
      font-size: 38px;
      line-height: 72px;
      .label {
        text-align: right;
        width: 45%;
        float: left;
      }
      .value {
        text-align: left;
        width: 55%;
        float: left;

        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .btns {
    text-align: center;
    margin-top: 20px;
    .btn {
      display: inline-block;
      background-color: transparent;
      border-color: #1382bb;
      color: white;
      margin: 10px 10px;

      font-size: 38px;
      line-height: 72px;
      height: 72px;
      padding: 0 26px;
    }
  }

  .big_plan_detail {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    transform: translate(50%,50%);
    /deep/ .c-popup-layer {
      min-width: 305px;
      min-height: 124px;
      width: auto;
      height: auto;
      background: rgba(2, 14, 35, 0.8);
      // background:red;
      position: fixed;
      z-index: 9999;
      box-shadow: 0 0 6vh #436f8b;
      -o-box-shadow: 0 0 6vh #436f8b;
      -ms-box-shadow: 0 0 6vh #436f8b;
      -moz-box-shadow: 0 0 6vh #436f8b;
      -webkit-box-shadow: 0 0 6vh #436f8b;
      padding: 6px 6px;
      border: 2px solid #01ffff;
      /* 弹窗标题-开始 */
      .layer-title {
        width: 100%;
        height: 26px;
        line-height: 26px;
        font-size: 20px;
        font-weight: bold;
        color: white;
        padding-left: 10px;
      }
      .layer-title-icon::before {
        content: "  | ";
        color: #01e9ff;
        font-size: 30px;
        font-weight: bold;
      }
      /* 弹窗标题-结束 */
      .layer-close {
        width: 32px;
        height: 26px;
        text-align: center;
        cursor: pointer;
        position: absolute;
        right: 24px;
        top: 8px;
        p {
          width: 100%;
          height: 100%;
          line-height: 26px;
          text-align: center;
          color: white;
          font-size: 30px;
          text-align: center;
          font-weight: bold;
        }
      }

      .layer-contents {
        .plan-content-detail {
          width: 1820px;
          height: 1600px;
          overflow: auto;
          padding: 20px 30px;
          .see-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            .see-file {
              display: inline-block;
              > a {
                color: #fff;
                &:hover {
                  color: #1d87f4;
                }
              }
              > div {
                margin-top: 20px;
                font-size: 30px;
                color: #ff4d4f;
              }
            }
          }
          .box-title {
            height: 100px;
            color: white;
            font-size: 42px;
            line-height: 100px;
            position: relative;
            padding-left: 24px;
            &::before {
              content: "";
              width: 12px;
              height: 46px;
              background: #086dd9;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              border-radius: 2px 4px;
            }
          }
          .detail-title {
            width: 100%;
            height: 90px;
            text-align: center;
            color: white;
            font-size: 62px;
            font-weight: bold;
          }
          .document-number {
            width: 100%;
            height: 48px;
            line-height: 18px;
            font-size: 34px;
            color: white;
            text-align: right;
          }
          .base-message {
            width: 100%;
            min-height: 384px;
            height: auto;
            overflow: auto;
            padding: 24px 0;
            ul {
              width: 100%;
              height: auto;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              li {
                width: 45%;
                min-height: 80px;
                height: auto;
                display: flex;
                justify-content: flex-start;
                font-size: 30px;
                div:nth-child(1) {
                  flex-shrink: 0;
                  width: 233px;
                  height: auto;
                  padding: 8px 18px;
                  color: white;
                  text-align: right;
                }
                div:nth-child(2) {
                  width: calc(100% - 78px);
                  height: auto;
                  padding: 8px 20px;
                  color: white;
                }
              }
            }
          }
          .general-box {
            width: 100%;
            min-height: 94px;
            height: auto;
            font-size: 30px;
            color: white;
          }
          .organization-system {
            width: 100%;
            min-height: 574px;
            height: auto;
            .form-top {
              width: 100%;
              height: 64px;
              display: flex;
              justify-content: space-around;
              div {
                width: 50%;
                height: 100%;
                line-height: 64px;
                color: white;
                font-size: 34px;
                display: flex;
                justify-content: flex-end;
                text-align: center;
                select {
                  background: rgba(0, 0, 0, 0.8);
                  color: white;
                  font-size: 34px;
                }
              }
            }
            .table-list-wrap {
              width: 100%;
              height: calc(100% - 64px);
            }
          }
          .emergency-disposal {
            width: 100%;
            height: auto;
            .emergency-disposal-list {
              width: 100%;
              height: auto;
              li {
                width: 100%;
                height: auto;
                .list-open-li {
                  width: 100%;
                  height: 92px;
                  background: #25578b;
                  color: white;
                  font-size: 34px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  div:nth-child(2) {
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .show-pdf {
            width: 100%;
            height: 1044px;
            background: white;
          }
        }
      }
    }

    /deep/ .txl_pop_up_layer {
      .memberInfo-table-list {
        width: 1820px;
        overflow: auto;
        padding: 20px 30px;

        .table-list {
          max-height: 800px;
          overflow: auto;
          margin: 20px 0;
          .list-header {
            padding: 14px 0;
            div {
              font-size: 20px;
            }
          }
          .list-body {
            height: auto !important;
            li {
              div {
                font-size: 20px;
                padding: 0 10px;
                span {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }

              .phone {
                .icon {
                  margin: 0 10px;
                  color: #00ffff;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .table-pages {
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .c-page-all {
          .ant-pagination-prev {
            min-width: 32px;
            height: 32px;
            line-height: 32px;

            .ant-pagination-item-link {
              font-size: 20px;
            }
          }

          .ant-pagination-item {
            font-size: 20px;
            min-width: 32px;
            height: 32px;
            line-height: 32px;
          }

          .ant-pagination-next {
            min-width: 32px;
            height: 32px;
            line-height: 32px;

            .ant-pagination-item-link {
              font-size: 20px;
            }
          }

          .ant-pagination-jump-next {
            font-size: 20px;

            .ant-pagination-item-link {
              .ant-pagination-item-container {
                font-size: 20px;

                i {
                  font-size: 20px;
                }

                span {
                  font-size: 20px;
                }
              }
            }
          }

          .ant-pagination-jump-prev {
            font-size: 20px;

            .ant-pagination-item-link {
              .ant-pagination-item-container {
                font-size: 20px;

                i {
                  font-size: 20px;
                }

                span {
                  font-size: 20px;
                }
              }
            }
          }

          .ant-pagination-jump-next-custom-icon {
            .ant-pagination-item-link {
              .ant-pagination-item-container {
                .ant-pagination-item-ellipsis {
                  font-size: 20px;
                }
              }
            }
          }
        }

        /deep/ .ant-pagination-item-ellipsis,
        /deep/ .ant-pagination-item-container i,
        /deep/ .ant-pagination-item-container .ant-pagination-item-ellipsis,
        /deep/
          .ant-pagination-jump-next
          .ant-pagination-item-container
          .ant-pagination-item-ellipsis,
        /deep/
          .ant-pagination-jump-prev
          .ant-pagination-item-container
          .ant-pagination-item-ellipsis {
          font-size: 20px;
        }
      }
    }
  }

  .big_send_order {
    /deep/ .c-popup-layer {
      min-width: 305px;
      min-height: 124px;
      width: auto;
      height: auto;
      background: rgba(2, 14, 35, 0.8);
      // background:red;
      position: fixed;
      z-index: 9999;
      box-shadow: 0 0 6vh #436f8b;
      -o-box-shadow: 0 0 6vh #436f8b;
      -ms-box-shadow: 0 0 6vh #436f8b;
      -moz-box-shadow: 0 0 6vh #436f8b;
      -webkit-box-shadow: 0 0 6vh #436f8b;
      padding: 6px 6px;
      border: 2px solid #01ffff;
      /* 弹窗标题-开始 */
      .layer-title {
        width: 100%;
        height: 26px;
        line-height: 26px;
        font-size: 20px;
        font-weight: bold;
        color: white;
        padding-left: 10px;
      }
      .layer-title-icon::before {
        content: "  | ";
        color: #01e9ff;
        font-size: 30px;
        font-weight: bold;
      }
      /* 弹窗标题-结束 */
      .layer-close {
        width: 32px;
        height: 26px;
        text-align: center;
        cursor: pointer;
        position: absolute;
        right: 24px;
        top: 8px;
        p {
          width: 100%;
          height: 100%;
          line-height: 26px;
          text-align: center;
          color: white;
          font-size: 30px;
          text-align: center;
          font-weight: bold;
        }
      }

      .layer-contents {
        .plan-content-detail {
          width: 1820px;
          height: 1600px;
          overflow: auto;
          padding: 20px 30px;
          .see-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            .see-file {
              display: inline-block;
              > a {
                color: #fff;
                &:hover {
                  color: #1d87f4;
                }
              }
              > div {
                margin-top: 20px;
                font-size: 30px;
                color: #ff4d4f;
              }
            }
          }
          .box-title {
            height: 100px;
            color: white;
            font-size: 42px;
            line-height: 100px;
            position: relative;
            padding-left: 24px;
            &::before {
              content: "";
              width: 12px;
              height: 46px;
              background: #086dd9;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              border-radius: 2px 4px;
            }
          }
          .detail-title {
            width: 100%;
            height: 90px;
            text-align: center;
            color: white;
            font-size: 62px;
            font-weight: bold;
          }
          .document-number {
            width: 100%;
            height: 48px;
            line-height: 18px;
            font-size: 34px;
            color: white;
            text-align: right;
          }
          .base-message {
            width: 100%;
            min-height: 384px;
            height: auto;
            overflow: auto;
            padding: 24px 0;
            ul {
              width: 100%;
              height: auto;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              li {
                width: 45%;
                min-height: 80px;
                height: auto;
                display: flex;
                justify-content: flex-start;
                font-size: 30px;
                div:nth-child(1) {
                  flex-shrink: 0;
                  width: 233px;
                  height: auto;
                  padding: 8px 18px;
                  color: white;
                  text-align: right;
                }
                div:nth-child(2) {
                  width: calc(100% - 78px);
                  height: auto;
                  padding: 8px 20px;
                  color: white;
                }
              }
            }
          }
          .general-box {
            width: 100%;
            min-height: 94px;
            height: auto;
            font-size: 30px;
            color: white;
          }
          .organization-system {
            width: 100%;
            min-height: 574px;
            height: auto;
            .form-top {
              width: 100%;
              height: 64px;
              display: flex;
              justify-content: space-around;
              div {
                width: 50%;
                height: 100%;
                line-height: 64px;
                color: white;
                font-size: 34px;
                display: flex;
                justify-content: flex-end;
                text-align: center;
                select {
                  background: rgba(0, 0, 0, 0.8);
                  color: white;
                  font-size: 34px;
                }
              }
            }
            .table-list-wrap {
              width: 100%;
              height: calc(100% - 64px);
            }
          }
          .emergency-disposal {
            width: 100%;
            height: auto;
            .emergency-disposal-list {
              width: 100%;
              height: auto;
              li {
                width: 100%;
                height: auto;
                .list-open-li {
                  width: 100%;
                  height: 92px;
                  background: #25578b;
                  color: white;
                  font-size: 34px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  div:nth-child(2) {
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .show-pdf {
            width: 100%;
            height: 1044px;
            background: white;
          }
        }
      }
    }

    /deep/ .send-order-content {
      width: 1820px;
    }
    .content-detail {
      width: 100%;
      height: 70px;
      display: flex;
      .form-p {
        display: flex;
        color: white;
        font-size: 30px;
        margin-right: 32px;
        align-items: center;
        input {
          display: block;
          height: 62px;
          width: 320px;
          background: rgba(0, 0, 0, 0.8);
          border: rgba(18, 150, 219, 1);
          border: 1px solid rgb(13, 93, 136);
        }
        span {
        }
      }
      .btn,
      .btn-disabled {
        width: 180px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        background: rgba(18, 150, 219, 1);
        color: white;
        font-size: 30px;
        cursor: pointer;
        border-radius: 8px 8px;
        -o-border-radius: 8px 8px;
        -ms-border-radius: 8px 8px;
        -moz-border-radius: 8px 8px;
        -webkit-border-radius: 8px 8px;
        white-space: nowrap;
        margin-right: 32px;
      }
      .btn-disabled {
        cursor: not-allowed;
        border: 1px solid #999;
        color: #eee;
        background-color: #999;
        transition: all 1s;
      }
    }
    .content-table-list {
      height: calc(100% - 150px);
      width: 100%;
      margin-bottom: 14px;
      overflow: auto;
      .list-header {
        padding: 14px 0;
        div {
          font-size: 30px;
        }
      }
      .list-body {
        li {
          div {
            font-size: 28px;
            padding: 0 10px;
            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .line-divs {
        width: 100%;
        height: auto;
        input {
          display: block;
          height: 62px;
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          border: rgba(18, 150, 219, 1);
          border: 1px solid rgb(13, 93, 136);
          text-align: center;
        }
      }
      .operation-divs {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        .btn-p,
        .btn-disabled {
          border: 1px solid rgba(18, 150, 219, 1);
          padding: 2px 24px;
          color: white;
          font-size: 30px;
          cursor: pointer;
          white-space: nowrap;
          margin-right: 32px;
        }
        .btn-p:hover {
          color: rgba(18, 150, 219, 1);
        }
        .btn-disabled {
          cursor: not-allowed;
          border: 1px solid #999;
          color: #eee;
          background-color: #999;
          transition: all 1s;
        }
        .btn-disabled:hover {
          color: #eee;
        }
      }
    }
    .table-pages {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
