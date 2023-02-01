<!--
 * @Description: 预案
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-11-08 17:32:32
-->
<template>
  <div class="all-icons-box plan-icon">
    <div
      style="width: 100%; height: 100%"
      title="预案"
      @click="iconClick($event)"
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="31px"
        height="38px"
        viewBox="0 0 31 38"
        enable-background="new 0 0 31 38"
        xml:space="preserve"
      >
        <image
          id="image0"
          width="31"
          height="38"
          x="0"
          y="0"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAmCAQAAACW0ojXAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
RQflCh4QDzW9JmMAAAACFklEQVRIx8WVwWsTQRSHv02z2w2ljdRUEVKRSMWDNgfBSBFPgjcPFi+2
iIh6Ufwreu1BBUFBPOihKF68edCDSCAQEHoKFNTeYwtFmrit+XnI7ma32dlYI/iby8y89828nfdm
FmFoU1pSQ9/V0JKmTF4muKKaeqqpsh/cicHdBZwkT0vPyCGi6jDBZQDWeMM8MwC8ZYtMzM+iheoy
aV0FoYLWjR71DB4mbdIEmmwaPbwsZpV5yWuuUja7pOGwwDxumkOGdLnp5kH4APUH/4PHNLnH0f3g
P/Hw8PjAMp+BFW5znTEcxhhJ4VWVJL3TBZ3Q+J7aK6miVZlVDXYf4WPfyh5f+Mq2P/rEbnhSHaY5
Hg3+gCG4EgW/956HWEHIPI3jEwa8yKTfs9mIzFvxxBU4acDz4eHaOH7L8it+8nku0UjAj4UbXOFs
5Ntn43iGizxIwKfDXjmp9ntVdybBfJg5UtWruiPc4e4e601OA7BBnZ3IVh1m/bj8spGkbd2Klc0N
bfmWVZVkywlbVq+6ZRO9Mjke8YI5XEY5xXOeMO5bRvHY8cvaw2M3KOT4lXFZZIEaLc5jR+bb5GlF
xgpex/4bZ3Gub26SZXKRcSfISPprE6hIMdnwz58LgDW+DeDKHOqeQjXhHt83/vmCttKfuGgGBslO
C97l4DDfvsi18GlIkgJrMj7zZ3sPnbj/jVtD0FaWNu2/xtu/AX16hgFs5OsDAAAAJXRFWHRkYXRl
OmNyZWF0ZQAyMDIxLTEwLTMwVDEzOjE1OjUzKzAzOjAwQZZA2wAAACV0RVh0ZGF0ZTptb2RpZnkA
MjAyMS0xMC0zMFQxMzoxNTo1MyswMzowMDDL+GcAAAAASUVORK5CYII="
        />
      </svg>
    </div>
    <div class="plan-list-wrap">
      <pop-up-layer
        :show="listShow"
        :setStyles="{ zIndex: 9999 }"
        @doClose="listClose"
        title="预案"
        ref="myPopUpLayer"
      >
        <template slot="content">
          <div class="plan-contents-list">
            <div class="content-opation">
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
                  <option v-for="i in typeList" :key="i.dictKey">
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
                  <option v-for="i in levelList" :key="i.dictKey">
                    {{ i.dictValue }}
                  </option>
                </select>
              </p>
              <p class="btn" @click="toSearch">查询</p>
              <p class="btn" @click="doClearn">清空</p>
            </div>
            <div class="content-table-list">
              <Clist class="table-list" :columns="columns" :listData="listData">
                <template slot="eventTypeName" slot-scope="{ record }">
                  <div style="width: 100%; height: 100%; display: block">
                    <p
                      style="width: 100%"
                      v-for="(i, k) in record.eventTypeName"
                      :key="i"
                    >
                      {{
                        `${typeObj[i]}${
                          k === record.eventTypeName.length - 1 ? "" : "、"
                        }`
                      }}
                    </p>
                  </div>
                </template>
                <template slot="operation" slot-scope="{ record }">
                  <div class="operation-divs">
                    <p class="btn-p" @click="showDetail(record)">查看</p>
                    <!--  <p
                      class="btn-p"
                      @click="startPlans(record)"
                      v-if="cookiesPlanIds"
                    >
                      {{}}
                    </p> -->
                    <p
                      class="btn-p"
                      @click="startPlans(record)"
                      v-if="parentDatas.jbbh === record.eventId"
                    >
                      已启动
                    </p>
                    <!-- isStartOrNot -->
                    <p
                      class="btn-p"
                      @click="startPlans(record)"
                      v-else-if="
                        parentDatas.jbbh !== record.eventId &&
                        isStartOrNot(listData)
                      "
                    >
                      切换预案
                      <!--  {{
                        parentDatas.jbbh !== eventId.sid &&
                        isStartOrNot(listData)
                          ? "切换预案"
                          : ""
                      }} -->
                    </p>
                    <p class="btn-p" @click="startPlans(record)" v-else>
                      启动预案
                    </p>
                    <!-- <p class="btn-p" @click="startPlans(record)">{{cookiesPlanIds==record.sid?'已启动':'启动预案'}}</p> -->
                  </div>
                </template>
              </Clist>
            </div>
            <div class="table-pages">
              <ChangePage
                :total="total"
                v-model="currentPage"
                @changePages="changePages"
              />
            </div>
          </div>
        </template>
      </pop-up-layer>
    </div>
    <StartPlan ref="startPlanModel" @doSure="startPlanDoSure" />
    <SendOrder ref="sendOrder" />
    <PlanDetail ref="planDetail" />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import StartPlan from "./startPlan";
import SendOrder from "./sendOrder";
import PlanDetail from "@/views/emergencyOrganizationCommandWar/components/fixedIcon/planIcon/planDetail";
import {
  getPlansList,
  planListType,
} from "@/api/emergencyOrganizationCommandWar";
import { getIdsmApi } from "@/api/idsm/index";
export default {
  components: {
    Clist,
    ChangePage,
    StartPlan,
    SendOrder,
    PlanDetail,
  },
  data() {
    return {
      parentDatas: {},
      listShow: false,
      cookiesPlanIds: "",
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
        { title: "预案类型", textIndex: "eventTypeName", width: "25%" },
        { title: "编制部门", textIndex: "preparationDepartment", width: "25%" },
        // { title: "事发时间", textIndex: "sfsj", width: "20%" },
        // { title: "预案等级", textIndex: "eventLevel", width: "15%" },
        { title: "操作", textIndex: "operation", width: "20%" },
      ],
      listData: [
        {
          indeKey: "1",
          name: "原名称",
          type: "类型",
          level: "等级",
        },
      ],
      /* 分页 */
      total: 0,
      currentPage: 1,
    };
  },
  watch: {
    "$route.query": {
      handler(newVal, oldVal) {
        this.parentDatas.sjlxdm = newVal.sjlxdm;
        this.parentDatas.sfxzhq = newVal.sfxzhq;
        this.parentDatas.jbbh = newVal.jbbh
        this.$store.commit('setPlanId','')
        this.doGetPlansList();
      },
      deep: true,
    },
  },
  mounted() {
    console.log(this.parentDatas, "this.parentDatas");
    // this.cookiesPlanIds = {...JSON.parse(Cookies.get("planIds")||'{}')}
    // this.cookiesPlanIds = Cookies.get(`${this.$route.query.jbbh}_planIds`);
  },
  methods: {
    init() {
      this.total = 0;
      this.currentPage = 1;
      this.doGetPlansList();
    },
    doGetPlansList() {
      this.listData = [];
      let sendBody = {
        eventType: this.parentDatas.sjlxdm,
        location: this.parentDatas.sfxzhq,
        eventId: this.parentDatas.jbbh,
        planName: this.sendForm.name,
        eventId: this.parentDatas.jbbh,
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
            console.log(error);
          }
        });
    },
    /*
      判断预案是否需要切换（） 
      reurn {null}
     */
    isStartOrNot(list) {
      let currentItem = null;
      currentItem = list.find((i, k) => {
        if (i.eventId === this.parentDatas.jbbh) {
          this.$store.commit('setPlanId',i.sid)
          return i;
        }
      });
      if (currentItem && currentItem.eventId) {
        return true;
      } else {
        return false;
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
      this.listShow = !this.listShow;
      this.$emit("iconClick", { showType: this.listShow });
      // console.log("this.parentDatas", this.parentDatas);
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
      console.log(this.sendForm);
    },
    /* 分页 */
    changePages(pages) {
      console.log(pages);
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

      console.log(this.parentDatas.jbbh, "是否已经启动过预案");
      // 是否已经启动过预案
      // if(this.cookiesPlanIds[item.sid]){
      if (this.cookiesPlanIds == item.sid) {
        this.startPlanDoSure(item);
        return;
      }

      this.$refs.startPlanModel.$emit("show", {
        ...item,
        eventDatas: this.parentDatas,
      });
    },
    /* 启动预案-是 */
    startPlanDoSure(item) {
      // this.cookiesPlanIds = {...JSON.parse(Cookies.get("planIds")||'{}')}
      // Cookies.set(`${this.parentDatas.jbbh}_planIds`, item.sid);
      
      this.cookiesPlanIds = item.sid;
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

<style lang="less" scoped>
@import "./index.less";
.plan-icon {
  top: 453vh * @h;
  right: 1029vw * @w;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
