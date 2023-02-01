<!--
 * @Description: 应急预案
 * @Author: liuxin
 * @Date: 2021-11-01 15:42:26
 * @LastEditTime: 2021-11-06 16:19:44
 * @LastEditors: JiaJun Wu
-->
<template>
    <div class="disaster">
        <div class="public-head">
            {{ title }}
        </div>
        <div class="plan-contents-list">
            <!-- <div class="content-opation">
                <p class="form-p">
                    <label for="">名称</label>
                    <input type="text" v-model="sendForm.name" />
                </p>
                <p class="form-p" v-if="false">
                    <label for="">类型</label>
                    <select
                        type="text"
                        v-model="sendForm.type"
                        disabled="disabled"
                        v-if="typeList.length"
                    >
                        <option v-for="(i, k) in typeList" :key="i.dictKey">
                            {{ i.dictValue }}
                        </option>
                    </select>
                </p>
                <p class="form-p" v-if="false">
                    <label for="">等级</label>
                    <select
                        type="text"
                        v-model="sendForm.level"
                        @change="levelChange"
                        v-if="levelList.length"
                    >
                        <option v-for="(i, k) in levelList" :key="i.dictKey">
                            {{ i.dictValue }}
                        </option>
                    </select>
                </p>
                <p class="btn" @click="toSearch">查询</p>
                <p class="btn" @click="doClearn">清空</p>
            </div> -->
            <div class="content-table-list">
                <Clist
                    class="table-list"
                    :columns="columns"
                    :listData="listData"
                >
                    <template
                        slot="eventTypeName"
                        slot-scope="{ record, text }"
                    >
                        <div style="width: 100%; height: 100%; display: block">
                            <p
                                style="width: 100%"
                                v-for="(i, k) in record.eventTypeName"
                                :key="i"
                            >
                                {{
                                    `${typeObj[i]}${
                                        k === record.eventTypeName.length - 1
                                            ? ""
                                            : "、"
                                    }`
                                }}
                            </p>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="{ record, text }">
                        <div class="operation-divs">
                            <p class="btn-p" @click="showDetail(record)">
                                查看
                            </p>
                            <p class="btn-p" @click="startPlans(record)" v-if="cookiesPlanIds">{{parentDatas.jbbh==record.eventId?'已启动':'切换预案'}}</p>
                            <p class="btn-p" @click="startPlans(record)" v-else>启动预案</p>
                        </div>
                    </template>
                </Clist>
            </div>
            <div class="table-pages" v-if="listData.length>0">
                <ChangePage
                    :total="total"
                    v-model="currentPage"
                    @changePages="changePages"
                />
            </div>
        </div>
        <StartPlan ref="startPlanModel" @doSure="startPlanDoSure" />
        <SendOrder ref="sendOrder" />
        <PlanDetail ref="planDetail" />
        <div class="angel lt"></div>
        <div class="angel rt"></div>
        <div class="angel lb"></div>
        <div class="angel rb"></div>
    </div>
</template>

<script>
// import Clist from "@/components/APicture/c-table.vue";
// import ChangePage from "@/components/APicture/changePage/index.vue";
// import { yjzhPreventionDangerFind } from "@/api/idsm/index";

import Cookies from "js-cookie";
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import StartPlan from "./startPlan";
import SendOrder from "./sendOrder";
import PlanDetail from "./planDetail";
import {
  getPlansList,
  planListType,
} from "@/api/emergencyOrganizationCommandWar";
import { getIdsmApi } from "@/api/idsm/index";
import { eventType } from '@/views/dragonBoatWartime/components/EventConsultation/utils';

export default {
  props:{
    eventData:{
      type: Object,
      default: () => {},
    }
  },
  components: {
    Clist,
    ChangePage,
    StartPlan,
    SendOrder,
    PlanDetail,
  },
  data() {
    return {
      title:'应急预案',
      parentDatas: {},
      listShow: false,
      cookiesPlanIds:'',
      sendForm: {
        name: null,
        type: null,
        eventLevelInput: null,
      },
      typeList: [],
      typeObj: {},
      levelList: [],
      levelObj: {},
      planTypeList: [], // 预案类型
      planTypeObj: {},
      /* 行政区划 */
      cityAreaList: [],
      cityAreaObj: {},
      /* 表格*/
      columns: [
        { title: "序号", textIndex: "indeKey", width: "5%" },
        { title: "预案名称", textIndex: "planName", width: "25%" },
        { title: "预案类型", textIndex: "eventTypeName", width: "23%" },
        { title: "编制部门", textIndex: "preparationDepartment", width: "22%" },
        // { title: "事发时间", textIndex: "sfsj", width: "20%" },
        // { title: "预案等级", textIndex: "eventLevel", width: "15%" },
        { title: "操作", textIndex: "operation", width: "25%" },
      ],
      listData: [],
      /* 分页 */
      total: 0,
      currentPage: 1,
    };
  },
  watch:{
    "$route.query":{
      handler(newVal,oldVal){
        this.parentDatas.sjlxdm = newVal.sjlxdm
        this.parentDatas.sfxzhq = newVal.sfxzhq
        this.parentDatas.jbbh = newVal.jbbh
        this.$store.commit('setPlanId','')
        this.doGetPlansList()
      },
      deep:true,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.total = 0;
      this.currentPage = 1;
      this.parentDatas = {...this.eventData,...this.parentDatas}
      this.doGetPlansList();
    },
    /* 事件详情 */
    // 查询事件概览
    // getEventDetail() {
    //   let code = "8qddPGf8";
    //   let data = {
    //     body: {
    //       jbbh: this.eventData.jbbh,
    //     },
    //     page: 1,
    //     pageSize: 10,
    //     sortName: "sid",
    //     sortOrder: "desc",
    //   };
    //   getIdsmApi(code, data).then((res) => {
    //       if (res.success) {
    //         this.parentDatas = {
    //           ...res.body.data[0],
    //           ...this.parentDatas
    //         }                  
    //         this.doGetPlansList();
    //       }
    //   })
    // },
    // 获取预案列表
    doGetPlansList() {
      this.listData = [];
      let sendBody = {
        eventType: this.parentDatas.sjlxdm,
        location: this.parentDatas.sfxzhq,
        eventId: this.parentDatas.jbbh,
        planName: this.sendForm.name
      };
      getPlansList({
        body: this.$filterParams({
          ...sendBody,
        }),
        pageSize: "10",
        page: this.currentPage,
      })
        .then(async (res) => {
          if (res.success) {
            this.listData = res.body;
            this.total = parseInt(res.total);
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
            if (res.body && res.body.length) {
              let saveObj = res.body.map((i, k) => {
                this.listData[k]["indeKey"] =
                  this.currentPage === 1
                    ? k + 1
                    : (this.currentPage - 1) * 10 + (k + 1);
                let sliptArr = this.listData[k]["eventType"]
                  ? this.listData[k]["eventType"].split(",")
                  : [];
                this.listData[k]["eventTypeName"] = sliptArr;

                if(i.eventId == this.parentDatas.jbbh){
                  console.log(this.parentDatas.jbbh,"parentDatas");
                  this.cookiesPlanIds = i.sid
                  this.$store.commit('setPlanId',i.sid)
                }
              });
              let waitObj = await saveObj;
              this.listData = JSON.parse(JSON.stringify(this.listData));
            }
          } else {
            this.$MyMessage.error(res.message);
          }
        })
        .catch((error) => {
          if (error) {
          }
        });
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
            arr = (await res.body) ? res.body : [];
          } else {
            arr = [];
          }
        })
        .catch((err) => {
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
      this.listShow = !this.listShow;
      this.$emit("iconClick", { showType: this.listShow });
      if (this.listShow) {
        this.init();
        this.getPlanTypeList();
        this.getCityAreaList();
      } else {
      }
    },
    /* 查询 */
    toSearch() {
      this.total = 0;
      this.currentPage = 1;
      this.doGetPlansList();
    },
    /* 清空 */
    doClearn() {
      this.sendForm.name = null;
      this.total = 0;
      this.currentPage = 1;
      this.doGetPlansList();
    },
    listClose() {
      this.listShow = false;
    },
    levelChange() {
    },
    /* 分页 */
    changePages(pages) {
      this.currentPage = pages.pages;
      this.doGetPlansList();
    },
    /* 查看详情 */
    showDetail(item) {
      this.$refs.planDetail.typeObj = this.typeObj;
      this.$refs.planDetail.levelObj = this.levelObj;
      this.$refs.planDetail.planTypeObj = this.planTypeObj;
      this.$refs.planDetail.cityAreaObj = this.cityAreaObj;
      this.$refs.planDetail.$emit("show", {
        ...item,
        ventDatas: this.parentDatas,
      });
    },
    /* 启动预案 */
    startPlans(item) {
      this.$refs.startPlanModel.typeObj = this.typeObj;
      this.$refs.startPlanModel.levelObj = this.levelObj;
      this.$refs.startPlanModel.planTypeObj = this.planTypeObj;

      // 是否已经启动过预案
      if(this.cookiesPlanIds==item.sid){
        this.startPlanDoSure(item)
        return
      }

      this.$refs.startPlanModel.$emit("show", {
        ...item,
        eventDatas: this.parentDatas,
      });
    },
    /* 启动预案-是 */
    startPlanDoSure(item) {

      // 储存已启动的预案sid
      // Cookies.set(`${this.parentDatas.jbbh}_bigplanIds`,item.sid)
      
      this.cookiesPlanIds = item.sid
      this.$store.commit('setPlanId',item.sid)

      this.$refs.sendOrder.typeObj = this.typeObj;
      this.$refs.sendOrder.levelObj = this.levelObj;
      this.$refs.sendOrder.planTypeObj = this.planTypeObj;
      this.$refs.sendOrder.$emit("show", {
        ...item,
        eventDatas: this.parentDatas,
      });
      this.listData.find((i, k) => {
        if (i.sid === item.sid) {
          this.listData[k].eventId = this.parentDatas.jbbh;
        }else{
          this.listData[k].eventId = null
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
@import "./index.less";
@import "../../../common.less";
.disaster {
    border: 2px solid #015ebd;
    width: 100%;
    height: 948px;
    position: relative;
    background-color: #001941;
}
// 表格样式
.list {
    max-height: calc(100% - 84px);
    overflow: auto;
    /deep/ .list-header {
        padding: 10px 16px;
        background: #0d2e63;
        div {
            font-size: 32px;
            color: #2295ff;
        }
    }
    /deep/ .list-body {
        height: auto !important;
        li {
            margin: 0;
            background: #092a5d;
            div {
                line-height: 42.5px;
                font-size: 32px;
                padding: 18px 16px;
                span {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            // 操作按钮样式
            .operate {
                border: 1px solid;
                padding: 0 14px;
                font-size: 24px;
                color: #fff;
                border-color: #10d378;
                background: #10b46777;
                & + .operate {
                    margin-left: 5px;
                    border-color: #103fda;
                    background: #0d36be67;
                }
            }
            &.double-columns {
                background: #012257;
            }
        }
    }
}
// 分页器样式
.pagination {
    text-align: center;
    margin-top: 30px;
    /deep/.c-page-all {
        .ant-pagination-prev {
            min-width: 55px;
            height: 55px;
            line-height: 55px;
            .ant-pagination-item-link {
                color: white;
                background-color: #013ba9;
                font-size: 24px;
            }
        }
        .ant-pagination-item {
            background: #0c2e6b;
            font-size: 24px;
            min-width: 55px;
            height: 55px;
            line-height: 55px;
            a {
                color: #ffffff;
            }
        }

        .ant-pagination-next {
            min-width: 55px;
            height: 55px;
            line-height: 55px;
            .ant-pagination-item-link {
                color: #ffffff;
                background-color: #013ba9;
                font-size: 24px;
            }
        }
        .ant-pagination-jump-next {
            font-size: 24px;
            color: #ffffff;
            .ant-pagination-item-link {
                .ant-pagination-item-container {
                    font-size: 24px;
                    color: #ffffff;
                    i {
                        font-size: 24px;
                        color: #ffffff;
                    }
                    span {
                        font-size: 24px;
                        color: #ffffff;
                    }
                }
            }
        }
        .ant-pagination-jump-prev {
            font-size: 24px;
            color: white;
            .ant-pagination-item-link {
                .ant-pagination-item-container {
                    font-size: 24px;
                    color: #ffffff;
                    i {
                        font-size: 24px;
                        color: #ffffff;
                    }
                    span {
                        font-size: 24px;
                        color: #ffffff;
                    }
                }
            }
        }

        .ant-pagination-jump-next-custom-icon {
            .ant-pagination-item-link {
                .ant-pagination-item-container {
                    .ant-pagination-item-ellipsis {
                        color: white;
                        font-size: 22px;
                    }
                }
            }
        }
    }
    /deep/ .ant-pagination-item-ellipsis {
        color: white;
        font-size: 20px;
    }
    /deep/ .ant-pagination-item-container i {
        font-size: 20px;
        color: #ffffff;
    }
    /deep/ .ant-pagination-item-container .ant-pagination-item-ellipsis {
        font-size: 20px;
        color: #ffffff;
    }
    /deep/
        .ant-pagination-jump-next
        .ant-pagination-item-container
        .ant-pagination-item-ellipsis,
    /deep/
        .ant-pagination-jump-prev
        .ant-pagination-item-container
        .ant-pagination-item-ellipsis {
        color: white;
        font-size: 20px;
    }
}
</style>
