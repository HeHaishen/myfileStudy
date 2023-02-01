<!--
 * @Description: 预案详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-11-02 11:05:22
 * @LastEditTime: 2021-11-08 10:29:14
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
    <div v-else class="plan_title_id">暂未启动预案</div>

    <PlanDetail ref="planDetail"></PlanDetail>
    <sendOrder ref="sendOrder"></sendOrder>
  </div>
</template>

<script>
import { planDetaisUseId } from "@/api/emergencyOrganizationCommandWar";
import PlanDetail from "@/views/emergencyOrganizationCommandWar/components/fixedIcon/planIcon/planDetail.vue";
import sendOrder from "@/views/emergencyOrganizationCommandWar/components/fixedIcon/planIcon/sendOrder.vue";
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
      default: () => "",
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
      this.$refs.sendOrder.$emit("show", {
        ...this.formData,
        eventDatas: this.parentDatas,
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
@import "../../../common.less";
.order-plan-detail {
  width: 100%;
  color: white;

  .plan_title_id {
    text-align: center;
    font-size: 42vh * @h;
    margin-top: 20vh * @h;
  }

  .order-plan-content-detail {
    .detail-title {
      text-align: center;
      font-size: 42vh * @h;
    }
    .document-number {
      text-align: right;
      margin: 20vh * @h 0;
      font-size: 32vh * @h;
    }
  }

  .detail {
    overflow: hidden;
    margin-top: 20vh * @h;
    .item {
      width: 50%;
      float: left;
      overflow: hidden;
      font-size: 32vh * @h;
      line-height: 64vh * @h;
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
    font-size: 36vh * @h;
    margin-top: 20vh * @h;
    .btn {
      display: inline-block;
      background-color: transparent;
      border-color: #1382bb;
      color: white;
      margin: 10vh * @h 10vw * @w;
    }
  }
}
</style>
