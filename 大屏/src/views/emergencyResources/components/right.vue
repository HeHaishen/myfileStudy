<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-08-27 17:01:27
-->
<template>
  <div class="emergency-resources-right">
    <div class="right-left">
      <div class="model-title">统计资源</div>
      <div class="right-left-content">
        <ul class="left-content-list">
          <li v-for="(i, k) in statisticalList" :key="k" :class="[i.type === 2 ? 'half-li' : '']">
            <label>{{ i.title }}:</label><span @click="staticResouseClick(i, k,$event)">{{
              i.teamNum
            }}</span><label>{{ i.teamUnit }}</label>
            <label class="margin-label" v-if="i.text">{{ i.text }}</label><span v-if="i.peopleNum" @click="staticResouseClick(i, k,$event)">{{ i.peopleNum }}</span><label v-if="i.peopleUnit">{{ i.peopleUnit }}</label>
          </li>
        </ul>
        <div class="team-title">
          <p class="team-title-button">应急队伍</p>
        </div>
        <div class="team-content-wrap">
          <!-- <div class="team-content-search">
            <p>
              所有名称
              <select>
                <option v-for="(i, k) in allNameList" :key="k">
                  {{ i.name }}
                </option>
              </select>
            </p>
            <p>
              部门筛选
              <select>
                <option v-for="(i, k) in allNameList" :key="k">
                  {{ i.name }}
                </option>
              </select>
            </p>
          </div> -->
          <ul class="team-content-list">
            <li v-for="(i, k) in teamList" :key="k">
              <div @click="showTeamDetail(i, k, $event)">
                <!-- <p :class="[i.sortValue === 1 ? 'blue' : 'red']"> -->
                <p class="blue">
                  {{ i.peopleCount }}
                </p>
              </div>
              <div>
                <p>{{ i.teamName }}</p>
                <!-- <p>{{ i.peopleCount }}人</p> -->
              </div>
              <div>
                <p @click="teamLocationPointer(i)">定位</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-right">
      <div class="model-title">应急人员</div>
      <div class="right-right-content">
        <div class="right-content-search">
          <div>
            <input type="text" placeholder="请输入姓名或者职位进行搜索" v-model='query.peopleName' />
            <span @click='peopleSearch'>搜索</span>
          </div>
        </div>
        <div class="right-content-people">
          <div class="content-people-wrap" v-for="(i, k) in peopleList" :key="k">
            <div class="content-people-title">
              <p>{{ i.teamName }}</p>
            </div>
            <ul>
              <li>
                <div>
                  <p @click="peopleChecked(i, k)">{{ i.checked ? "√" : "" }}</p>
                </div>
                <div>
                  <img src="../../../assets/images/emergencyResources/icon_people.png" alt="" />
                </div>
                <div>
                  <p>姓名：{{ i.name }}</p>
                  <p>职位：{{ i.position }}</p>
                  <p>
                    电话：{{ i.phone }}
                    <a-icon type="phone" class="icon" @click="clickPhone(i, k, $event)" />
                    <a-icon type="mail" class="icon" @click="clickMessage(i, k, $event)" />
                  </p>
                  <p>部门：{{ i.deptName }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <team-detail ref="TeamDetail"></team-detail>
    <!-- 应急资源点击 -->
    <pop-up-layer v-show="playerObjs.show" :show="playerObjs.show" :setStyles="{'left':'84%','top':'50%'}" @doClose="staticResoureClose" ref="myPopUpLayer" :title="playerObjs.title" class="center-pop">
      <template slot="content">
        <div class="updata-time">
          更新日期：{{ new Date().getFullYear() }}年{{
            new Date().getMonth() + 1
          }}月
        </div>
        <div class="center-search">
          <input class="c-input" placeholder="输入关键字" type="text" v-model="playerObjs.searchForm" />
          <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="layerSearchHandel" />
        </div>
        <ul class="select-btn-list" v-if="playerObjs.title === '应急队伍(装备)'">
          <li v-for="(i, k) in teamDetailBtnList" :key="k" :class="teamActive === k ? 'active' : ''" @click="teamBtnActive(i, k)">
            {{ i.name }}
          </li>
        </ul>
        <div class="list-wrap">
          <clist :columns="playerObjs.headerList" :listData="playerObjs.centerList">
            <template slot="yddh" slot-scope="{ record, text,index }">
              <div class="exchange">
                {{text}}
                <a-icon type="phone" class="icon" @click="clickPhoneNew(record, index, $event)" />
                <a-icon type="mail" class="icon" @click="clickMessageNew(record, index,$event)" />
              </div>
            </template>
            <template slot="dh" slot-scope="{ record, text,index }">

              <div class="exchange">
                {{text}}
                <a-icon type="phone" class="icon" @click="clickPhoneNew(record, index, $event)" />
                <a-icon type="mail" class="icon" @click="clickMessageNew(record, index,$event)" />
              </div>
            </template>
            <template slot="phone" slot-scope="{ record, text,index }">
              <div class="exchange">
                {{text}}
                <a-icon type="phone" class="icon" @click="clickPhoneNew(record, index, $event)" />
                <a-icon type="mail" class="icon" @click="clickMessageNew(record, index, $event)" />
              </div>
            </template>
            <template slot="contactsphone" slot-scope="{ record, text,index }">
              <div class="exchange">
                {{text}}
                <a-icon type="phone" class="icon" @click="clickPhoneNew(record, index, $event)" />
                <a-icon type="mail" class="icon" @click="clickMessageNew(record, index, $event)" />
              </div>

            </template>
            <template slot="deviceId" slot-scope="{ record, text,index }">
              <div>{{resources(text)}}</div>
            </template>
            <template slot="option" slot-scope="{ record, text }">
              <div class="type-btn" @click="positionActive(record)">定位</div>
            </template>
          </clist>
        </div>
        <div class="list-change-page">
          <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pagesChange" />
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import {
  getStatisticalResourcesApi,
  getEmergencyTeamApi,
  getEmergencyCrewApi,
  getRecordTableApi,
  getStatisticalResourcesDetailApi, // 应急资源一张图-统计资源-详情
} from "@/api/emergencyResources";
import TeamDetail from "./teamDetail.vue";
import Clist from "@/components/APicture/c-table";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import ChangePage from "@/components/APicture/changePage";
export default {
  components: {
    TeamDetail,
    Clist,
    ContactPhone,
    MessageSend, ChangePage
  },
  data() {
    return {
      statisticalList: [
        {
          title: "应急队伍(装备)",
          teamNum: 0,
          teamUnit: "支",
          text: "共",
          peopleNum: 0,
          peopleUnit: "人",
          type: 1,
        },
        {
          title: "应急专家",
          teamNum: 0,
          teamUnit: "类",
          text: "共",
          peopleNum: 0,
          peopleUnit: "人",
          type: 1,
        },
        {
          title: "应急物资归属单位",
          teamNum: 0,
          teamUnit: "家",
          // text: "共",
          // peopleNum: 31325,
          // peopleUnit: "人",
          // type: 1,
        },
        {
          title: "避难场所数",
          teamNum: 0,
          teamUnit: "处",
          text: "可容纳",
          peopleNum: 0,
          peopleUnit: "人",
          type: 1,
        },
        {
          title: "示范社区",
          teamNum: 0,
          teamUnit: "个",
          type: 2,
        },
        {
          title: "应急指挥车",
          teamNum: 0,
          teamUnit: "辆",
          type: 2,
        },
        {
          title: "无人机",
          teamNum: 0,
          teamUnit: "架",
          type: 2,
        },
        {
          title: "单兵通讯",
          teamNum: 0,
          teamUnit: "台",
          type: 2,
        },
        { title: "对讲机", teamNum: 0, teamUnit: "台", type: 2 },
        {
          title: "视频监控",
          teamNum: 0,
          teamUnit: "台",
          type: 2,
        },
      ],
      allNameList: [
        { name: "名称1", key: 1 },
        { name: "名称2", key: 1 },
      ],
      teamList: [
        // {
        //   name: "广州市白云区应急局",
        //   key: 1,
        //   type: 1,
        //   number: 123,
        //   peopleNum: "123人",
        // },
        // {
        //   name: "广州市天河区应急局",
        //   key: 1,
        //   type: 2,
        //   number: 123,
        //   peopleNum: "123人",
        // },
        // {
        //   name: "广州市天河区应急局",
        //   key: 1,
        //   type: 2,
        //   number: 123,
        //   peopleNum: "123人",
        // },
        // {
        //   name: "广州市天河区应急局",
        //   key: 1,
        //   type: 2,
        //   number: 123,
        //   peopleNum: "123人",
        // },
      ],
      peopleList: [
        // {
        //   unitTitle: "广州市天河区应急局",
        //   name: "张三",
        //   position: "值班主管",
        //   phone: "13756892345",
        //   part: "部门",
        //   checked: false,
        // },
        // {
        //   unitTitle: "广州市白云区应急局",
        //   name: "张三",
        //   position: "值班主管",
        //   phone: "13756892345",
        //   part: "部门",
        //   checked: false,
        // },
        // {
        //   unitTitle: "广州市南沙区应急局",
        //   name: "张三",
        //   position: "值班主管",
        //   phone: "13756892345",
        //   part: "部门",
        //   checked: false,
        // },
      ],
      teamActive: 0,
      teamType: null,
      clickFlag: 0, //右点击的标记
      teamDetailBtnList: [
        { name: "全部", key: 0 },
        { name: "专业队伍", key: 1 },
        { name: "基层队伍", key: 2 },
      ],
      playerObjs: {
        show: false,
        title: "",

        searchForm: null,
        headerList: [],
        centerList: [],
      },
      // 搜索名称
      query: {
        peopleName: undefined
      },
      pagination: {
        total: undefined,
        current: 1
      },
      searchObjs: {
        searchIndex: undefined,
        searchData: undefined
      }
    };
  },
  watch: {
    'searchObjs.searchIndex': function (newVal, oldVal) {
      console.log(99999)
      console.log(this.clickFlag, 'this.clickFlag');
      console.log(this.pagination.current)
      this.playerObjs.searchForm = null
      this.pagination.current = 1
      this.pagination = JSON.parse(JSON.stringify(this.pagination
      ))
      console.log(this.pagination)
    }
  },
  created() { },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    init() {
      this.getStatisticalResourcesData(); // 统计资源
      this.getEmergencyTeamData();
      // this.getEmergencyCrewData();
      this.getRecordTableData();
    },
    initChart() { },

    peopleChecked(i, k) {
      this.peopleList[k].checked = !this.peopleList[k].checked;
      // 触发更新
      this.peopleList = JSON.parse(JSON.stringify(this.peopleList));
    },



    teamLocationPointer(record) {
      pGzznCore.teamLocation(record);
    },

    //应急资源一张图-统计资源
    getStatisticalResourcesData() {
      getStatisticalResourcesApi({
        body: { codes: "hFqTLbOp" },
        pageSize: 13,
      })
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.data && res.body.data.length) {
              this.statisticalList.map((item, key) => {
                let saveSame = res.body.data.find((i, k) => {
                  if (item.title === i.name) {
                    return i;
                  }
                });
                if (saveSame) {
                  item.teamNum = saveSame.num;
                  saveSame.people || saveSame === 0
                    ? (item.peopleNum = saveSame.people)
                    : "";
                  item.remoteData = saveSame;
                  item.indexCode = saveSame.indexCode;
                }
              });
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("获取数据错误！");
          }
        });
    },

    // 应急资源一张图-应急队伍
    getEmergencyTeamData() {
      getEmergencyTeamApi({
        body: { codes: "hFqTLbOp" },
      }).then((res) => {
        if (res.body && res.body.data && res.body.data.length) {
          console.log("应急资源一张图-应急队伍", res);
          this.teamList = res.body.data;
        }
      });
    },

    //  应急资源一张图-应急人员
    // getEmergencyCrewData() {
    //   getEmergencyCrewApi({
    //     body: { codes: "d0d4EEqp", name: this.query.peopleName, position: '值班主管' },
    //   }).then((res) => {
    //     if (res.body && res.body.data && res.body.data.length) {
    //       console.log("应急资源一张图-应急人员", res);
    //       this.peopleList = JSON.parse(JSON.stringify(res.body.data));
    //       console.log(this.peopleList, 'this.peopleList');

    //       this.peopleList.map((item) => {
    //         item.checked = true;
    //       });
    //     }
    //   });
    // },

    //  应急资源一张图-应急队伍-讯录表
    getRecordTableData() {
      getRecordTableApi({
        body: { codes: "d0d4EEqp", name: this.query.peopleName, position: '值班主管' },
      }).then((res) => {
        if (res.body && res.body.data && res.body.data.length) {
          console.log("应急资源一张图-应急队伍-讯录表", res);
          // this.peopleList = res.body.data;
          this.peopleList = res.body.data;

        }
      });
    },
    // // 应急队伍--详情
    showTeamDetail(i, k, e) {
      this.$refs.TeamDetail.$emit("show", { ...i, key: k, saveEvent: e });
    },
    // 资源统计
    staticResouseClick(i, k, e, item, pages) {

      if (this.clickFlag == k && pages == undefined) {
        this.pagination.current = 1
      }
      this.clickFlag = k;

      this.searchObjs.searchData = i
      this.searchObjs.searchIndex = k
      this.searchObjs.event = e
      if (!i.indexCode) {
        this.$message.warning("无相关数据");
        this.playerObjs.show = false
        return false;
      }
      this.playerObjs.title = i.title;
      let send = {}
      item ? send[item] = this.playerObjs.searchForm : ''
      if (this.clickFlag == 0) {
        send['type'] = this.teamType
      }
      getStatisticalResourcesDetailApi(i.indexCode, {
        body: {
          ...send,
        },
        page: pages ? pages : 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      })
        .then((res) => {
          if (res.success) {
            console.log(res);
            let arr = this.setListHeader(k);
            this.playerObjs.headerList = arr;
            this.playerObjs.centerList = []
            this.playerObjs.centerList = res.body.data;
            this.playerObjs.show = true;
            this.pagination.total = +res.total
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("获取数据错误！");
          }
        });
    },
    // 设置获取表头
    setListHeader(type) {
      let headerOBj = {
        0: [
          {
            title: "队伍名称",
            index: 0,
            textIndex: "teamName",
            width: "20%",
          },
          {
            title: "负责人",
            index: 0,
            textIndex: "person",
            width: "15%",
          },
          { title: "联系电话", index: 0, textIndex: "phone", width: "30%" },
          { title: "队伍类型", index: 0, textIndex: "type", width: "20%" },
          { title: "定位", index: 0, textIndex: "option", width: "15%" },
        ],
        1: [
          {
            title: "专家姓名",
            index: 0,
            textIndex: "zjxm",
            width: "25%",
          },
          {
            title: "联系电话",
            index: 0,
            textIndex: "yddh",
            width: "35%",
          },
          { title: "专家专业/类型", index: 0, textIndex: "zjlxmc", width: "35%" },
        ],
        3: [
          {
            title: "避难场所名称",
            index: 0,
            textIndex: "name",
            width: "20%",
          },
          {
            title: "负责人",
            index: 1,
            textIndex: "contacts",
            width: "10%",
          },
          {
            title: "联系电话",
            index: 2,
            textIndex: "contactsphone",
            width: "25%",
          },
          { title: "面积（m²）", index: 3, textIndex: "mj", width: "10%" },
          { title: "容纳人数", index: 4, textIndex: "krnrs", width: "10%" },
          { title: "位置", index: 5, textIndex: "address", width: "15%" },
          { title: "定位", index: 6, textIndex: "option", width: "10%" },
        ],
        4: [
          {
            title: "社区名称",
            index: 0,
            textIndex: "name",
            width: "40%",
          },
          {
            title: "地址",
            index: 0,
            textIndex: "address",
            width: "40%",
          },
          { title: "定位", index: 0, textIndex: "option", width: "20%" },
        ],
        5: [
          {
            title: "联系人",
            index: 0,
            textIndex: "lxr",
            width: "20%",
          },
          {
            title: "电话",
            index: 0,
            textIndex: "dh",
            width: "40%",
          },
          { title: "所属区域", index: 0, textIndex: "qy", width: "40%" },
        ],
        9: [
          {
            title: "名称",
            index: 0,
            textIndex: "name",
            width: "35%",
          },
          {
            title: "来源",
            index: 0,
            textIndex: "deviceId",
            width: "35%",
          },
          { title: "定位", index: 0, textIndex: "option", width: "30%" },
        ],
      };
      return headerOBj[type];
    },
    // 资源统计关闭
    staticResoureClose() {
      this.playerObjs.show = false;
    },
    // 资源统计点击搜索
    layerSearchHandel() {
      console.log(this.playerObjs.searchForm);
      if (this.clickFlag == 0) {
        this.staticResouseClick(this.searchObjs.searchData, this.searchObjs.searchIndex, this.searchObjs.event, 'teamName')
      } else if (this.clickFlag == 1) {
        this.staticResouseClick(this.searchObjs.searchData, this.searchObjs.searchIndex, this.searchObjs.event, 'zjxm')
      } else if (this.clickFlag == 3 || this.clickFlag == 4 || this.clickFlag == 9) {
        this.staticResouseClick(this.searchObjs.searchData, this.clickFlag, this.searchObjs.event, 'name')
      } else if (this.clickFlag == 5) {
        this.staticResouseClick(this.searchObjs.searchData, this.searchObjs.searchIndex, this.searchObjs.event, 'lxr')
      }

    },
    teamBtnActive(i, k) {
      console.log(i, k);

      this.teamActive = k;
      this.teamType = i.name == '全部' ? '' : i.name
      this.staticResouseClick(this.searchObjs.searchData, this.searchObjs.searchIndex, this.searchObjs.event, 'teamName')

    },
    // 应急资源弹窗
    positionActive(i) {
      // debugger;
      pGzznCore.teamPowerLocation(i, this.clickFlag);
    },
    // 点击电话icons
    clickPhone(i, k, e) {
      let sendMsg = {
        name: '海参',
        phone: '15919304717',
      };
      let { name, phone } = i;
      console.log(this.$refs.ContactPhone)
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone,
        item: i
      });
    },
    // 点击短信
    clickMessage(i, k, e) {
      /*  let sendMsg = {
         name: null,
         phone: 15919304717,
       }; */
      let { name, phone } = i;
      console.log(this.$refs.MessageSend)
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone
      });
    },
    // 点击电话icons
    clickPhoneNew(i, k, e) {
      let sendMsg = {
        name: '海参',
        phone: '15919304717',
      };
      let phoneName = this.phoneNumber(this.clickFlag)
      let messageName = this.nameDatas(this.clickFlag)

      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: i[messageName],
        phone: i[phoneName],
        item: i
      });
    },
    // 点击短信
    clickMessageNew(i, k, e) {
      /*  let sendMsg = {
         name: null,
         phone: 15919304717,
       }; */
      let phoneName = this.phoneNumber(this.clickFlag)
      let messageName = this.nameDatas(this.clickFlag)
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "pageRight",
        name: i[messageName],
        phone: i[phoneName],
      });
    },
    phoneNumber(item) {
      let phone = {
        0: 'phone',
        1: 'yddh',
        3: 'contactsphone',
        5: 'dh'
      }
      return phone[item]
    },
    nameDatas(item) {
      let phone = {
        0: 'teamName',
        1: 'zjxm',
        3: 'contacts',
        5: 'lxr'
      }
      return phone[item]
    },
    //应急人员搜索
    peopleSearch() {
      this.getRecordTableData()
    },
    pagesChange(pages, current) {
      this.pagination.current = +pages.pages
      if (this.clickFlag == 0) {
        this.staticResouseClick(this.searchObjs.searchData, this.searchObjs.searchIndex, this.searchObjs.event, 'teamName', this.pagination.current)
      } else if (this.clickFlag == 1) {
        this.staticResouseClick(this.searchObjs.searchData, this.searchObjs.searchIndex, this.searchObjs.event, 'zjxm', this.pagination.current)
      } else if (this.clickFlag == 3 || this.clickFlag == 4 || this.clickFlag == 9) {
        this.staticResouseClick(this.searchObjs.searchData, this.clickFlag, this.searchObjs.event, 'name', this.pagination.current)
      } else if (this.clickFlag == 5) {
        this.staticResouseClick(this.searchObjs.searchData, this.searchObjs.searchIndex, this.searchObjs.event, 'lxr', this.pagination.current)
      }
    },

    resources(item) {
      if (item == '44010000082006000055') {
        return '城管云'
      } else if (item == '44010000032006000056') {
        return '危化处'
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
