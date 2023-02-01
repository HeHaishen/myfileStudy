<template>
  <div class="key-area">
    <div class="title">
      <div class="model-title">重点监管区域</div>
      <div class="update-time time-box">
        更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <ul class="area-list">
      <li
        :class="{ 'list-selected': item.sid == hiddenSelected.sid }"
        v-for="(item, index) in numberOfHidden"
        :key="index"
        @click="doHiddenSelected(item)"
      >
        <div class="area-title">
          {{ item.subregion }}
          <div
            :class="[
              'location',
              { 'list-selected': item.sid == hiddenSelected.sid },
            ]"
          >
            定位
          </div>
        </div>
        <div class="area-information">
          <div class="infor-left">
            <div class="infor-name">隐患数量</div>
            <div class="infor-number">{{ item.num }}</div>
          </div>
          <div class="infor-right">
            <p>安全负责人：{{ item.director }}</p>
            <p>联系电话：{{ item.phone }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="resource">
      <div class="model-little-title">{{ hiddenSelected.subregion }}</div>
      <ul class="resource-list">
        <li @click="openResource('team')">
          <div class="resource-left">应急队伍</div>
          <div class="resource-right">
            <div class="static">
              <div class="title">人员总数</div>
              <div class="total">
                <span class="number">{{ emergencyResource.team.people }}</span
                >人
              </div>
            </div>
            <div class="static">
              <div class="title">队伍总数</div>
              <div class="total">
                <span class="number">{{ emergencyResource.team.teams }}</span
                >支
              </div>
            </div>
          </div>
        </li>
        <li @click="openResource('materials')">
          <div class="resource-left">应急物资</div>
          <div class="resource-right">
            <div class="static">
              <div class="title">物资总数</div>
              <div class="total">
                <span class="number">{{
                  emergencyResource.materials.materials
                }}</span
                >件
              </div>
            </div>
            <div class="static">
              <div class="title">归属单位</div>
              <div class="total">
                <span class="number">{{
                  emergencyResource.materials.unit
                }}</span
                >家
              </div>
            </div>
          </div>
        </li>
        <li @click="openResource('plan')">
          <div class="resource-left">应急预案</div>
          <div class="resource-right">
            <div class="static">
              <div class="title">企业应急预案</div>
              <div class="total">
                <span class="number">{{
                  emergencyResource.plan.enterprise
                }}</span
                >件
              </div>
            </div>
            <div class="static">
              <div class="title">政府应急预案</div>
              <div class="total">
                <span class="number">{{
                  emergencyResource.plan.government
                }}</span
                >件
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="knowledge-base">
      <div class="model-little-title">知识库</div>
      <ul class="knowledge-list">
        <li
          @click="openResource('directories')"
          style="border: 1px solid yellow"
        >
          <div class="name">危化品名录</div>
          <div class="number" style="color:yellow;">
            {{ emergencyResource.knowledge.directories }}
          </div>
        </li>
        <li @click="openResource('model')">
          <div class="name">典型案例</div>
          <div class="number">{{ emergencyResource.knowledge.model }}</div>
        </li>
      </ul>
    </div>
    <!-- 企业隐患上报排名结束 -->
    <pop-up-layer
      :show="resourceShow"
      :setStyles="{ left: '26%', top: '50%' }"
      ref="myPopUpLayer"
      class="leftTable"
      :title="popTitle"
      @doClose="close"
    >
      <template slot="content">
        <div class="table-content">
          <div class="search-box">
            <!-- 下拉选择框 -->
            <div class="sub">
              <div class="selected-box" v-if="openType == 'plan'">
                <div class="sub-title">预案分类：</div>
                <div class="my-select">
                  <a-select
                    placeholder="请选择企业类型"
                    v-model="industriesOption"
                    @change="openResource('plan', true)"
                    allowClear
                  >
                    <a-select-option
                      allowClear
                      :value="item"
                      v-for="(item, index) in industryList"
                      :key="index"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </div>
              </div>
              <div
                class="search-input"
                v-if="
                  openType == 'plan' ||
                  openType == 'directories' ||
                  openType == 'model' ||
                  openType == 'team' ||
                  openType == 'materials'
                "
              >
                <a-input-search
                  placeholder="请输入名称"
                  enter-button
                  v-model="searchWord"
                  @search="inputSearch"
                />
              </div>
              <div v-if="openType == 'team' || openType == 'materials'">
                <button class="video-discussion">视频会商</button>
                <button class="checkedAll" @click="checkedAllClick">
                  全选
                </button>
              </div>
            </div>
            <!-- 应急队伍 -->
            <div class="search-box-team" v-if="openType == 'team'">
              <ul>
                <li
                  :class="[
                    'team-list',
                    { selected: item == teamSearchSelected },
                  ]"
                  v-for="(item, index) in teamSearchList"
                  :key="index"
                  @click="SearchSelectedTeam(item)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="table-list">
            <Table :columns="columns" :listData="tableData">
              <template slot="index" slot-scope="{ record, text, index }">
                <span>{{ index + 1 }}</span>
              </template>
              <!-- checked -->
              <template slot="checked" slot-scope="{ record, text, index }">
                <div class="checked" @click="checkedClick(record, index)">
                  {{ text ? "√" : "" }}
                </div>
              </template>
              <template slot="phone" slot-scope="{ record, text, index }">
                <div class="exchange">
                  {{ text }}
                  <a-icon
                    type="phone"
                    class="icon"
                    @click="clickPhone(record, index, $event)"
                  />
                  <a-icon
                    type="mail"
                    class="icon"
                    @click="clickMessage(record, index, $event)"
                  />
                </div>
              </template>
              <template slot="option" slot-scope="{ record, text, index }">
                <div class="type-btn" @click="emergencyTeamLocation(record)">
                  定位
                </div>
              </template>
            </Table>
          </div>
          <div class="list-change-page">
            <ChangePage
              :total="pagination.total"
              :currentPage="pagination.current"
              @changePages="pagesChange"
            />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>
<script>
import moment from "moment";
import * as api from "@/api/hazardousChemicals";
import Table from "@/components/APicture/c-table.vue";
import * as commonColumns from "./utils/tableData";
import ChangePage from "@/components/APicture/changePage";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
export default {
  components: {
    Table,
    ChangePage,
    ContactPhone,
    MessageSend,
  },
  data() {
    return {
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
      numberOfHidden: [],
      hiddenSelected: {}, //被选中的片区
      emergencyResource: {
        team: {
          people: "",
          teams: "",
        },
        materials: {
          materials: "",
          unit: "",
        },
        plan: {
          enterprise: "",
          government: "",
        },
        knowledge: {
          directories: "",
          model: "",
        },
      },
      popTitle: "",
      resourceShow: false,
      columns: [],
      tableData: [],
      industriesOption: undefined,
      industryList: ["政府预案", "企业预案", "重大危险源预案"],
      teamSearchList: ["专业队伍", "基层队伍", "社会力量", "民兵基干力量"],
      teamSearchSelected: "专业队伍",
      openType: "",
      searchWord: undefined,
      pagination: {
        current: 1,
        total: 0,
      },
    };
  },
  created() {
    this.getNumberOfHidden();
  },
  mounted() {},
  methods: {
    moment,
    //应急队伍api
    getTableTeam(type) {
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.type = type || "";
      params.body.teamName = this.searchWord;
      params.page = this.pagination.current;
      api.getTableTeam(params).then((res) => {
        if (res.success) {
          res.body.data.map((item) => {
            item.checked = false;
          });
          this.tableData = res.body.data;
          this.pagination.total = +res.total;
        } else {
          console.error(res.message);
        }
      });
    },
    handelSelected(e) {
      this.getTableData();
    },

    /**
     * @description: 物资仓库 单选框的切换
     * @param {*} record
     * @param {*} index
     * @return {*}
     */
    checkedClick(record, index) {
      this.tableData[index].checked = !this.tableData[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.tableData));
    },

    /**
     * @description:物资仓库  点击全选
     * @param {*}
     * @return {*}
     */
    checkedAllClick() {
      let data = this.tableData.filter((item) => item.checked);
      console.log("选中了", data);
      this.tableData.map((item) => {
        if (data.length === this.tableData.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },

    emergencyTeamLocation(record, flag = 10) {
      pGzznCore.teamPowerLocation(record, flag);
    },
    //应急物资api
    getTableMaterials() {
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.name = this.searchWord;
      params.page = this.pagination.current;
      console.log(params, "params");

      api.getTableMaterials(params).then((res) => {
        if (res.success) {
          res.body.data.map((item) => {
            item.checked = false;
          });
          this.tableData = res.body.data;
          this.pagination.total = +res.total;
        } else {
          console.error(res.message);
        }
      });
    },
    //应急预案api
    getTablePlan() {
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.name = this.searchWord;
      params.body.type = this.industriesOption;
      params.page = this.pagination.current;

      console.log(params);
      api.getTablePlan(params).then((res) => {
        if (res.success) {
          this.tableData = res.body.data;
          this.pagination.total = +res.total;
        } else {
          console.error(res.message);
        }
      });
    },
    //危化品名录api
    getTableDirectories() {
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.productName = this.searchWord;
      params.page = this.pagination.current;

      api.getTableDirectories(params).then((res) => {
        if (res.success) {
          this.tableData = res.body.data;
          this.pagination.total = +res.total;
        } else {
          console.error(res.message);
        }
      });
    },
    //事故案例api
    getTableModel() {
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.name = this.searchWord;
      params.page = this.pagination.current;

      console.log(params);
      api.getTableModel(params).then((res) => {
        if (res.success) {
          this.tableData = res.body.data;
          this.pagination.total = +res.total;
        } else {
          console.error(res.message);
        }
      });
    },
    //应急队伍，列表搜索类型选择
    SearchSelectedTeam(type) {
      console.log(type);
      this.searchWord = "";
      this.teamSearchSelected = this.teamSearchSelected === type ? "" : type;

      this.$set(this.pagination, "current", 1);
      console.log(this.pagination.current, "this.pagination.current");

      this.getTableTeam(this.teamSearchSelected);
    },
    inputSearch() {
      this.pagination.current = 1;

      switch (this.openType) {
        case "plan":
          this.getTablePlan();
          break;
        case "team":
          this.getTableTeam(this.teamSearchSelected);
          break;
        case "directories":
          this.getTableDirectories();
          break;
        case "model":
          this.getTableModel();
          break;
        case "materials":
          this.getTableMaterials();
          break;
        default:
          break;
      }
    },
    //重置所有搜索条件
    reset() {
      this.searchWord = "";
      this.teamSearchSelected = "专业队伍";
    },
    // 应急资源弹窗
    openResource(type, flag) {
      this.openType = type;
      this.pagination.current = 1;
      if (!flag) {
        this.industriesOption = undefined;
      }
      //重置所有搜索条件
      this.reset();
      switch (type) {
        case "team":
          this.popTitle = "应急队伍";
          this.columns = commonColumns.columnsTeam;
          this.getTableTeam(this.teamSearchSelected);
          break;
        case "materials":
          this.popTitle = "物资仓库";
          this.columns = commonColumns.columnsMaterials;
          this.getTableMaterials();
          break;
        case "plan":
          this.popTitle = "应急预案";
          this.columns = commonColumns.columnsPlan;
          this.getTablePlan();
          break;
        case "directories":
          this.popTitle = "危化品名录";
          this.columns = commonColumns.columnsDirectories;
          this.getTableDirectories();
          break;
        case "model":
          this.popTitle = "事故案例";
          this.columns = commonColumns.columnsModel;
          this.getTableModel();
          break;
        default:
          break;
      }
      this.resourceShow = true;
    },
    close() {
      this.resourceShow = false;
    },
    // 各地隐患数量
    getNumberOfHidden() {
      api.getNumberOfHidden(this.defaultParams).then((res) => {
        if (res.success) {
          this.numberOfHidden = res.body.data;
          if (res.body.data.length > 0) {
            this.doHiddenSelected(this.numberOfHidden[0]);
          }
        } else {
          console.error(res.message);
        }
      });
    },
    // 各地片区应急资源:与‘各地隐患数量’接口相关联,code值根据上面接口获取
    getEmergencyResource(sliceArea) {
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body["sliceArea"] = sliceArea;
      api.getEmergencyResource(params).then((res) => {
        if (res.success) {
          let data = this.emergencyResource;
          for (let item of res.body.data) {
            switch (item.name) {
              case "应急队伍":
                data.team.people = item.oneNum;
                data.team.teams = item.twoNum;
                break;
              case "应急物资":
                data.materials.materials = item.oneNum;
                data.materials.unit = item.twoNum;
                break;
              case "应急预案":
                data.plan.enterprise = item.oneNum;
                data.plan.government = item.twoNum;
                break;
              case "知识库":
                data.knowledge.directories = item.oneNum;
                data.knowledge.model = item.twoNum;
                break;
              default:
                break;
            }
          }
          this.emergencyResource = data;
          console.log("emergencyResource", this.emergencyResource);
        } else {
          console.error(res.message);
        }
      });
    },

    //各片区列表选中事件
    doHiddenSelected(item) {
      this.hiddenSelected = item;
      this.getEmergencyResource(item.subregionCode);
      pGzznCore.addPromiseAreaLoction(item);
    },

    //分页
    pagesChange(pages, current) {
      this.pagination.current = +pages.pages;
      switch (this.popTitle) {
        case "应急队伍":
          this.getTableTeam(this.teamSearchSelected);
          break;
        case "物资仓库":
          this.getTableMaterials();
          break;
        case "应急预案":
          this.getTablePlan();
          break;
        case "危化品名录":
          this.getTableDirectories();
          break;
        case "事故案例":
          this.getTableModel();
          break;
        default:
          break;
      }
    },
    clickPhone(i, k, e) {
      let sendMsg = {
        name: "海参",
        phone: "15919304717",
      };
      let { person, phone } = i;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "pagetLeft",
        name: person,
        phone,
        item: i,
      });
    },
    // 点击短信
    clickMessage(i, k, e) {
      /*  let sendMsg = {
         name: null,
         phone: 15919304717,
       }; */
      let { person, phone } = i;

      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "pagetLeft",
        name: person,
        phone,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
