<!--
 * @Description:当前救火队伍详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-15 21:23:18
 * @LastEditTime: 2021-08-26 21:09:43
-->
<template>
  <pop-up-layer
    v-show="show"
    :show="show"
    :setStyles="{}"
    @doClose="videoClickClose"
    opsition="btnTop"
    ref="SearchAllModel"
    :title="title"
    class="team-detail"
  >
    <template slot="content">
      <div class="detail-contents" v-if="this.pageType === 'team'">
        <div class="content-left">
          <ul>
            <li>
              <label for="">名称:</label>
              <p>{{ responeData.name }}</p>
            </li>
            <li>
              <label for="">人数：</label>
              <p>{{ responeData.personnelNum }}</p>
            </li>
            <li>
              <label for="">队长：</label>
              <p>{{ responeData.teamName }}</p>
            </li>
            <li>
              <label for="">联系：</label>
              <p>{{ responeData.contacts }}</p>
            </li>
            <li>
              <label for="">坐标：</label>
              <p>{{ responeData.lat }}-{{ responeData.lon }}</p>
            </li>
            <li>
              <label for="">物资：</label>
              <p>
                <span
                  v-for="(i, k) in responeData.sceneReliefMaterialsList"
                  :key="k"
                  >{{ i.materialName }}:{{ i.materialNum
                  }}{{ i.unit }}&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
              </p>
            </li>
          </ul>
        </div>
        <div class="content-right">
          <!-- <div class="center-search">
            <a-input
              class="c-input"
              placeholder="输入关键字"
              type="text"
              v-model="searchForm.name"
            />
            <img
              src="../../../../assets/images/emergencyOverview/icon_search.png"
              alt=""
              @click="searchMonitor"
            />
          </div> -->
          <div class="ul-wrap">
            <clist :columns="headerList" :listData="listData">
              <template slot="contacts" slot-scope="{ record, text, index }">
                <span>{{ text }} </span>
                <a-icon
                  type="phone"
                  style="color: #00eaff; margin: 0 8px"
                  @click="clickToPhone(record, index, $event)"
                />
                <a-icon
                  type="mail"
                  class="icon"
                  style="color: #00eaff; margin: 0 8px"
                  @click="clickMessageNew(record, index, $event)"
                />
                <!--   <div class="table-btn-wrap">
                  <p>定位</p>
                </div> -->
              </template>
            </clist>
          </div>
        </div>
      </div>
      <div class="detail-contents" style="width: 100%" v-else>
        <!-- <div class="ul-wrap"> -->
        <clist :columns="expertHeaderList" :listData="expertListData">
          <template slot="contacts" slot-scope="{ record, text, index }">
            <span>{{ text }} </span>
            <a-icon
              type="phone"
              style="color: #00eaff; margin: 0 8px"
              @click="clickToPhone(record, index, $event)"
            />
            <a-icon
              type="mail"
              class="icon"
              style="color: #00eaff; margin: 0 8px"
              @click="clickMessageNew(record, index, $event)"
            />
            <!--   <div class="table-btn-wrap">
                  <p>定位</p>
                </div> -->
          </template>
        </clist>
        <!-- </div> -->
      </div>
      <ContactPhone ref="ContactPhoneAll" />
      <MessageSend ref="MessageSend" />
    </template>
  </pop-up-layer>
</template>
<script>
import clist from "@/components/APicture/c-table.vue";
import {
  getTeamDetail,
  getTeamMembers,
  getExpertDetail,
} from "@/api/floodPreventionWar";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
export default {
  components: { clist, ContactPhone, MessageSend },
  data() {
    return {
      show: false,
      pageType: "team", // expert-应急队伍
      parentData: {},
      searchForm: {
        name: null,
      },
      title: "队伍详情",
      responeData: {
        name: "",
        teamName: "",
        contacts: "",
        sceneReliefMaterialsList: [],
      },
      headerList: [
        { title: "序号", index: 0, textIndex: "indexKey", width: "18%" },
        { title: "名称", index: 1, textIndex: "name", width: "31%" },
        { title: "电话", index: 2, textIndex: "contacts", width: "51%" },
      ],
      listData: [],
      expertHeaderList: [
        { title: "序号", index: 0, textIndex: "indexKey", width: "18%" },
        { title: "名称", index: 1, textIndex: "expertName", width: "31%" },
        { title: "电话", index: 2, textIndex: "contactNumber", width: "51%" },
      ],
      expertListData: [],
    };
  },
  mounted() {
    this.$on("show", (data) => {
      this.show = true;
      this.parentData = data;
      this.pageType = data.pageType ? data.pageType : "team";
      console.log("teamDEetail", data, data.pageType === "team");
      this.title = data.title
        ? data.title
        : this.pageType === "team"
        ? "队伍详情"
        : "专家详情";
      this.$refs.SearchAllModel.saveEvent = data.saveEvent;
      if (this.pageType === "team") {
        this.doGetTeamDetail({ sid: data.sid });
        this.doGetTeamMembers({ teamId: data.teamId });
      } else {
        console.log(99897);
        this.doGetExpertDetail(data);
      }
    });
  },
  methods: {
    initData() {
      this.responeData = {
        name: "",
        teamName: "",
        contacts: "",
        sceneReliefMaterialsList: [],
      };
      this.listData = [];
    },
    searchMonitor() {},
    videoClickClose() {
      this.show = false;
    },
    // 获取队伍详情
    doGetTeamDetail(obj) {
      getTeamDetail(obj).then((res) => {
        if (res.success) {
          this.responeData = JSON.parse(JSON.stringify(res.body[0]));
        }
      });
    },
    // 获取队伍人员信息
    doGetTeamMembers(obj) {
      getTeamMembers(obj).then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            res.body.map((i, k) => {
              i.indexKey = k + 1;
            });
            this.listData = JSON.parse(JSON.stringify(res.body));
          }
        }
      });
    },
    // 获取专家详情
    doGetExpertDetail(obj) {
      getExpertDetail({ body: { orgId: obj.orgId } }).then((res) => {
        if (res.success) {
          console.log("专家", res);
          res.body.map((i, k) => {
            i.indexKey = k + 1;
            i.name = i.expertName;
            i.contacts = i.contactNumber;
          });
          this.expertListData = JSON.parse(JSON.stringify(res.body));
        }
      });
    },
    clickToPhone(i, k, e) {
      i.phone = i.contacts;
      let { name, phone } = i;
      /*   console.log(i, k);
      return false; */
      this.$refs.ContactPhoneAll.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone,
        item: i,
      });
    },
    // 点击短信
    clickMessageNew(i, k, e) {
      /*  let sendMsg = {
         name: null,
         phone: 15919304717,
       }; */
      // let phoneName = this.phoneNumber(this.clickFlag)
      // let messageName = this.nameDatas(this.clickFlag)
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: i["name"],
        phone: i["contacts"],
      });
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>
