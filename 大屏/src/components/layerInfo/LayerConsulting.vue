<template>
  <div class="layer-consulting">
    <!-- 视频会商 -->
    <sud-layer
      :visible="meetingVis"
      :width="bodyWidth"
      :height="bodyHeight"
      :isCenter="true"
    >
      <template v-slot:header>
        <div class="content-header">
          <div class="c-h-title">视频会商</div>
          <div class="c-h-close" @click.stop="closeVis = !closeVis">
            <i class="el-icon-circle-close" style="font-size:40px;"></i>
            <transition name="fade" mode="out-in">
              <div class="c-h-c-popover" v-show="closeVis">
                <div>是否确定关闭会商？</div>
                <div style="margin-top: 10px">
                  <el-button @click.stop="closeVis = false" :size="size"
                    >否</el-button
                  >
                  <el-button type="primary" @click="onStopMeeting" :size="size"
                    >是</el-button
                  >
                </div>
                <div class="c-h-c-p-top"><i class="el-icon-caret-top"></i></div>
              </div>
            </transition>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div class="content-info">
          <div class="consulting-content">
            <div class="consulting-left">
              <video
                controls="controls"
                v-if="meetingVis"
                class="consulting-video"
                id="consulting-video"
              ></video>
            </div>
            <div class="consulting-right">
              <div>
                <div class="c-right-title">
                  <div class="c-r-t-num">人数: {{ arrUser.length }}</div>
                  <div class="c-r-t-search">
                    <el-input
                      placeholder="请输入名称"
                      clearable
                      :size="size"
                      v-model="searchName"
                    ></el-input>
                  </div>
                  <div class="c-r-t-btns">
                    <div
                      class="c-r-l-shutup"
                      @click.stop="shutupVis = !shutupVis"
                    >
                      恢复/禁言
                      <transition name="fade" mode="out-in">
                        <div class="c-r-l-s-popover" v-show="shutupVis">
                          <div>是否确定批量恢复或者禁言？</div>
                          <div style="margin-top: 10px">
                            <el-button
                              @click.stop="shutupVis = false"
                              :size="size"
                              >否</el-button
                            >
                            <el-button
                              type="primary"
                              @click="onShutup"
                              :size="size"
                              >是</el-button
                            >
                          </div>
                          <div class="c-h-c-p-top">
                            <i class="el-icon-caret-top"></i>
                          </div>
                        </div>
                      </transition>
                    </div>
                    <div
                      class="c-r-l-out"
                      @click.stop="kickOutVis = !kickOutVis"
                    >
                      剔除
                      <transition name="fade" mode="out-in">
                        <div class="c-r-l-o-popover" v-show="kickOutVis">
                          <div>是否确定批量剔除？</div>
                          <div style="margin-top: 10px">
                            <el-button
                              @click.stop="kickOutVis = false"
                              :size="size"
                              >否</el-button
                            >
                            <el-button
                              type="primary"
                              @click="onKickOut"
                              :size="size"
                              >是</el-button
                            >
                          </div>
                          <div class="c-h-c-p-top">
                            <i class="el-icon-caret-top"></i>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>
              <div class="c-right-list">
                <!-- <div v-for="(item,key) in arrUser" :key="key" style="margin-bottom: 15px;">
                                    <span :class="[item.state? 'green':'red']"> 
                                        {{ item.name }} {{ item.tel }} 
                                    </span>
                                    <span>{{ item.mute?'(已禁言)':'(未禁言)' }}</span>
                                    <span class="c-r-l-shutup" @click.stop="onShutup(item)">{{ item.mute?'恢复':'禁言' }}</span>
                                    <span class="c-r-l-out" @click.stop="onKickOut(item)">剔除</span>
                                </div> -->
                <el-table
                  ref="arrUser"
                  :row-key="
                    (row) => {
                      return row.tel;
                    }
                  "
                  :data="
                    arrUser.filter(
                      (data) =>
                        !searchName ||
                        data.name
                          .toLowerCase()
                          .includes(searchName.toLowerCase())
                    )
                  "
                  :row-class-name="tableRowClassName"
                  @selection-change="onSelectChangeUser"
                  :header-cell-style="{
                    background: 'rgba(21,49,99,1)',
                    color: 'rgba(0, 233, 234, 1)',
                  }"
                  style="width: 100%; height: 100%"
                >
                  <el-table-column
                    :reserve-selection="true"
                    type="selection"
                    width="55"
                  ></el-table-column>
                  <!-- <el-table-column type="index" width="80" label="序号"></el-table-column> -->
                  <el-table-column
                    label="名称"
                    header-align="center"
                    align="center"
                    prop="name"
                  >
                  </el-table-column>
                  <el-table-column
                    label="电话"
                    width="180"
                    header-align="center"
                    align="center"
                    prop="tel"
                  >
                  </el-table-column>
                  <el-table-column
                    label="是否禁言"
                    width="120"
                    header-align="center"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.mute ? 'danger' : 'success'"
                        disable-transitions
                        >{{ scope.row.mute ? "是" : "否" }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="是否在线"
                    width="120"
                    header-align="center"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.state ? 'success' : 'danger'"
                        disable-transitions
                        >{{ scope.row.state ? "是" : "否" }}</el-tag
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="c-right-invite" @click="onInvite">邀请</div>
            </div>
          </div>
        </div>
      </template>
    </sud-layer>

    <!-- 人员选择 -->
    <sud-layer
      :visible="personnelVis"
      :width="bodyWidth"
      :height="bodyHeight"
      :isCenter="true"
    >
      <template v-slot:header>
        <div class="content-header">
          <div class="c-h-title">人员选择</div>
          <div class="c-h-close" @click="personnelVis = false">
            <i class="el-icon-circle-close" style="font-size:40px;"></i>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div class="content-info">
          <div class="personnel-content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="应急专家" name="1">
                <div class="expert-list-content">
                  <div class="p-c-persons">
                    <div class="p-c-p-search">
                      <!-- <div> <el-checkbox v-model="expertList.checkAll" @change="onCheckAll('expertList')">全选</el-checkbox> </div> -->
                      <!-- <el-input placeholder="请输入名称" clearable :size="size" @keyup.enter.native="getUsers('expertList')" v-model="expertList.params.name">
                                                <el-button slot="append" icon="el-icon-search" @click="getUsers('expertList')"></el-button>
                                            </el-input> -->
                    </div>
                    <div class="p-c-p-lists">
                      <el-table
                        ref="expertList"
                        :data="expertList.lists"
                        :row-class-name="tableRowClassName"
                        @select="onSelectChange('expertList', ...arguments)"
                        @select-all="onSelectAll('expertList', ...arguments)"
                        :header-cell-style="{
                          background: 'rgba(21,49,99,1)',
                          color: 'rgba(0, 233, 234, 1)',
                        }"
                        style="width: 100%; height: 100%"
                      >
                        <el-table-column
                          type="selection"
                          width="55"
                        ></el-table-column>
                        <el-table-column
                          type="index"
                          width="80"
                          label="序号"
                        ></el-table-column>
                        <el-table-column
                          label="名称"
                          width="150"
                          header-align="center"
                          align="center"
                          prop="expertsName"
                        >
                        </el-table-column>
                        <el-table-column
                          label="职务"
                          header-align="center"
                          align="center"
                          prop="jobTitle"
                        >
                        </el-table-column>
                        <el-table-column
                          label="联系电话"
                          width="200"
                          header-align="center"
                          align="center"
                          prop="tel"
                        >
                        </el-table-column>
                      </el-table>
                      <!-- <el-checkbox-group v-model="expertList.checkeds">
                                                <div v-for="item in expertList.lists" :key="item.sid">
                                                    <el-checkbox :label="item.sid" @change="onCheckedChange(arguments[0],'expertList', item.sid)">
                                                        {{ item.expertsName }} {{ item.jobTitle?`(${item.jobTitle})`:'' }} {{ item.tel }} 
                                                    </el-checkbox>
                                                </div>
                                            </el-checkbox-group> -->
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="" name="2" v-if="false">
                <div class="mail-list-content">
                  <div class="p-c-mail">
                    <vue-tree
                      :treeData="treeData"
                      :checkable="false"
                      :checkedKeys="checkedKeys"
                    ></vue-tree>
                  </div>
                  <div class="p-c-persons">
                    <div class="p-c-p-search">
                      <!-- <div> <el-checkbox v-model="mailList.checkAll" @change="onCheckAll('mailList')">全选</el-checkbox> </div> -->
                      <el-input
                        placeholder="请输入名称"
                        clearable
                        :size="size"
                        @keyup.enter.native="getUsers('mailList')"
                        v-model="mailList.params.name"
                      >
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                          @click="getUsers('mailList')"
                        ></el-button>
                      </el-input>
                    </div>
                    <div class="p-c-p-lists">
                      <el-table
                        ref="mailList"
                        :data="mailList.lists"
                        :row-class-name="tableRowClassName"
                        @select="onSelectChange('mailList', ...arguments)"
                        @select-all="onSelectAll('mailList', ...arguments)"
                        :header-cell-style="{
                          background: 'rgba(21,49,99,1)',
                          color: 'rgba(0, 233, 234, 1)',
                        }"
                        style="width: 100%; height: 100%"
                      >
                        <el-table-column
                          type="selection"
                          width="55"
                        ></el-table-column>
                        <el-table-column
                          type="index"
                          width="80"
                          label="序号"
                        ></el-table-column>
                        <el-table-column
                          label="名称"
                          width="150"
                          header-align="center"
                          align="center"
                          prop="name"
                        >
                        </el-table-column>
                        <el-table-column
                          label="职务"
                          header-align="center"
                          align="center"
                          prop="unitName"
                        >
                        </el-table-column>
                        <el-table-column
                          label="联系电话"
                          width="200"
                          header-align="center"
                          align="center"
                          prop="tel"
                        >
                        </el-table-column>
                      </el-table>
                      <!-- <el-checkbox-group v-model="mailList.checkeds">
                                                <div v-for="item in mailList.lists" :key="item.sid">
                                                    <el-checkbox :label="item.sid" @change="onCheckedChange(arguments[0],'mailList', item.sid)">
                                                        {{ item.name }} {{ item.dutise?`(${item.dutise})`:'' }} {{ item.tel }} 
                                                    </el-checkbox>
                                                </div>
                                            </el-checkbox-group> -->
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="" name="3" v-if="false">
                <div class="team-list-content">
                  <div class="p-c-persons">
                    <div class="p-c-p-search">
                      <!-- <div> <el-checkbox v-model="teamList.checkAll" @change="onCheckAll('teamList')">全选</el-checkbox> </div> -->
                      <el-input
                        placeholder="请输入名称"
                        clearable
                        :size="size"
                        @keyup.enter.native="getUsers('teamList')"
                        v-model="teamList.params.name"
                      >
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                          @click="getUsers('teamList')"
                        ></el-button>
                      </el-input>
                    </div>
                    <div class="p-c-p-lists">
                      <el-table
                        ref="teamList"
                        :data="teamList.lists"
                        :row-class-name="tableRowClassName"
                        @select="onSelectChange('teamList', ...arguments)"
                        @select-all="onSelectAll('teamList', ...arguments)"
                        :header-cell-style="{
                          background: 'rgba(21,49,99,1)',
                          color: 'rgba(0, 233, 234, 1)',
                        }"
                        style="width: 100%; height: 100%"
                      >
                        <el-table-column
                          type="selection"
                          width="55"
                        ></el-table-column>
                        <el-table-column
                          type="index"
                          width="80"
                          label="序号"
                        ></el-table-column>
                        <el-table-column
                          label="队伍名称"
                          header-align="center"
                          align="center"
                          prop="name"
                        >
                        </el-table-column>
                        <el-table-column
                          label="主管部门"
                          header-align="center"
                          align="center"
                          prop="competentUnit"
                        >
                        </el-table-column>
                        <el-table-column
                          label="联系电话"
                          width="200"
                          header-align="center"
                          align="center"
                          prop="leaderTel"
                        >
                        </el-table-column>
                      </el-table>
                      <!-- <el-checkbox-group v-model="teamList.checkeds">
                                                <div v-for="item in teamList.lists" :key="item.sid">
                                                    <el-checkbox :label="item.sid" @change="onCheckedChange(arguments[0],'teamList', item.sid)">
                                                        {{ item.name }} {{ item.competentUnit?`(${item.competentUnit})`:'' }} {{ item.leaderTel }} 
                                                    </el-checkbox>
                                                </div>
                                            </el-checkbox-group> -->
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="通信录" name="4">
                <div class="expert-list-content">
                  <iframe
                    :src="iframeUrl"
                    frameborder="0"
                    width="100%"
                    height="100%"
                  ></iframe>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="p-c-bottom">
              <div class="p-c-b-lists">
                <div v-if="activeName == 1 && activeVis">
                  <el-tag
                    closable
                    :key="tag.sid"
                    class="p-c-b-l-tag"
                    color="rgba(0,0,0,0)"
                    @close="onCloseTag('mailList', tag)"
                    v-for="tag in mailList.selects"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
                <div v-if="activeName == 2 && activeVis">
                  <el-tag
                    v-for="tag in expertList.selects"
                    class="p-c-b-l-tag"
                    color="rgba(0,0,0,0)"
                    @close="onCloseTag('expertList', tag)"
                    :key="tag.sid"
                    closable
                  >
                    {{ tag.expertsName }}
                  </el-tag>
                </div>
                <div v-if="activeName == 3 && activeVis">
                  <el-tag
                    v-for="tag in teamList.selects"
                    class="p-c-b-l-tag"
                    color="rgba(0,0,0,0)"
                    @close="onCloseTag('teamList', tag)"
                    :key="tag.sid"
                    closable
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </div>
              <div class="p-c-b-join" @click="onJoin">加入</div>
            </div>
          </div>
        </div>
      </template>
    </sud-layer>
  </div>
</template>

<script>
import flvjs from "flv.js";
import Bus from "@/utils/Bus.js";
import { mapGetters } from "vuex";
// import { debounce } from 'lodash';
import VueTree from "@/components/VueTree/VueTree.vue";
import { getGroupFind, getContactsFind } from "@/api/meeting/abs";
import { expertsFind, teamFind } from "@/api/meeting/ers";
import Cookies from "js-cookie";
import {
  launchMeeting,
  inviteMembers,
  closeVideoConference,
  getConferenceStatus,
  kickOutPhoneMembers,
  shutupPhoneMembers,
  shutupResumePhoneMembers,
} from "@/api/meeting";

export default {
  components: {
    VueTree,
  },
  data() {
    // this.onJoin = debounce(this.onJoin, 2000,{'leading': true,'trailing': false});
    // this.onKickOut = debounce(this.onKickOut, 2000,{'leading': true,'trailing': false});
    // this.onShutup = debounce(this.onShutup, 2000,{'leading': true,'trailing': false});
    return {
      bodyHeight: 0,
      bodyWidth: 0,
      searchName: "", // 搜索人名
      selectedUsers: [], // 选中人员
      size: "medium",
      activeName: "1",
      activeVis: true, // 用了刷新勾选
      closeVis: false, // 关闭会商提示标识
      shutupVis: false, // 禁言提示标识
      kickOutVis: false, // 剔除提示标识
      meetingVis: false, // 会商标识
      personnelVis: false, // 加入人员标识
      flvPlayer: null,
      conferenceNumber: "", // 视频编号
      contactGroupId: "", // 联系人组ID
      stream: "", // 直播频道
      arrUser: [], // 用户
      hashUser: {}, // 哈希用户
      timer: null,
      wait: 5, // 刷新时间
      defaultProps: {
        children: "children",
        label: "label",
      },
      treeData: [],
      checkedKeys: { selects: [] },
      // 通讯录
      mailList: {
        checkAll: false, // 全选标识
        params: {}, // 参数
        checkeds: [], // 选择列表
        lists: [], // 人员列表
        selects: {}, // 所有选中人员
        hashUsers: {}, // 哈希人员
      },
      // 应急专家
      expertList: {
        checkAll: false, // 全选标识
        params: {}, // 参数
        checkeds: [], // 选择列表
        lists: [], // 人员列表
        selects: {}, // 所有选中人员
        hashUsers: {}, // 哈希人员
      },
      // 应急队伍
      teamList: {
        checkAll: false, // 全选标识
        params: {}, // 参数
        checkeds: [], // 选择列表
        lists: [], // 人员列表
        selects: {}, // 所有选中人员
        hashUsers: {}, // 哈希人员
      },
      // 通讯录
      iframeUrl: "/msg-abs#/mailList?token=",
    };
  },
  computed: {
    ...mapGetters(["winWidth", "winHeight"]),
  },
  watch: {
    "checkedKeys.selects": {
      handler(newValue, oldValue) {
        if (newValue.length) {
          this.mailList.params.groupId = newValue[0];
        }
        this.mailList.checkeds = [];
        this.mailList.checkAll = false;
        this.getUsers("mailList");
      },
    },
  },
  beforeDestroy() {
    // 销毁监听事件
    Bus.$off("openConsulting");
  },
  created() {
    this.iframeUrl = this.iframeUrl + Cookies.get("token");
    this.setHeightAndWidth();
    Bus.$on("openConsulting", this.openConsulting);
    // document.querySelector('body').clientHeight
    // this.getGroups();
    // this.getUsers('expertList');
    // this.getUsers('teamList');
  },
  mounted() {},
  methods: {
    // 设置宽高
    setHeightAndWidth() {
      this.bodyHeight = document.querySelector("body").clientHeight * 0.75;
      this.bodyWidth = document.querySelector("body").clientHeight;
    },
    //清空勾选
    clearSelection() {
      this.$refs.arrUser.clearSelection();
    },
    // 勾选人员
    onSelectChangeUser(selection) {
      console.log(selection);
      this.onRefresh(0);
      if (!selection.length) {
        this.onRefresh(1);
      }
      this.selectedUsers = selection;
    },
    // 踢人
    onKickOut() {
      const that = this;
      if (that.selectedUsers.length) {
        let phoneList = [];
        that.selectedUsers.forEach((item) => {
          phoneList.push(item.tel);
        });

        kickOutPhoneMembers({
          body: {
            phoneList: phoneList,
            conferenceNumber: that.conferenceNumber,
          },
        }).then((res) => {
          that.selectedUsers.forEach((item) => {
            delete that.hashUser[item.tel];
          });
          that.clearSelection();
          that.getUserList();
        });
      }
    },
    // 禁言和解除禁言
    onShutup() {
      const that = this;
      if (that.selectedUsers.length) {
        let shutupUsers = [],
          recoveryUsers = [];
        that.selectedUsers.forEach((item) => {
          if (item.mute) {
            // 解除禁言
            recoveryUsers.push(item.tel);
          } else {
            // 禁言
            shutupUsers.push(item.tel);
          }
        });
        that.clearSelection();
        if (recoveryUsers.length) {
          // 解除禁言
          shutupResumePhoneMembers({
            body: {
              phoneList: recoveryUsers,
              conferenceNumber: this.conferenceNumber,
            },
          }).then((res) => {
            this.getUserList();
          });
        }
        if (shutupUsers.length) {
          // 禁言
          shutupPhoneMembers({
            body: {
              phoneList: shutupUsers,
              conferenceNumber: this.conferenceNumber,
            },
          }).then((res) => {
            this.getUserList();
          });
        }
      }
    },
    // 切换面板
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    // 关闭已勾选人物
    onCloseTag(type, tag) {
      delete this[type].selects[tag.sid];
      this.$refs[type].toggleRowSelection(tag, false);
      this.onRefreshSelect();
    },
    // 设置计时器
    setTime(fn, wait) {
      let that = this;
      function interval() {
        clearTimeout(that.timer);
        that.timer = null;
        that.timer = setTimeout(interval, wait);
        fn();
      }
      that.timer = setTimeout(interval, wait);
    },
    // 邀请人员
    onInvite() {
      this.initData();
      this.activeName = "1";
      this.personnelVis = true;
      // this.getGroups();
      // this.getUsers('expertList');
      // this.getUsers('teamList');
    },
    // 清空数据
    initData() {
      this.mailList = {
        checkAll: false, // 全选标识
        params: {}, // 参数
        checkeds: [], // 选择列表
        lists: [], // 人员列表
        selects: {}, // 所有选中人员
        hashUsers: {}, // 哈希人员
      };
      this.expertList = {
        checkAll: false, // 全选标识
        params: {}, // 参数
        checkeds: [], // 选择列表
        lists: [
          {
            expertsName: "陆科",
            jobTitle: "会议负责人",
            tel: "18602006700",
            sid: "1",
          },
          {
            expertsName: "葛工",
            jobTitle: "会议负责人",
            tel: "13660863661",
            sid: "2",
          },
          {
            expertsName: "梁照延",
            jobTitle: "开发人员",
            tel: "13247572625",
            sid: "3",
          },
          {
            expertsName: "王珍珍",
            jobTitle: "测试人员",
            tel: "13728093106",
            sid: "6",
          },
          {
            expertsName: "聂念君",
            jobTitle: "开发人员",
            tel: "13640888293",
            sid: "4",
          },
          {
            expertsName: "吴志松",
            jobTitle: "开发人员",
            tel: "13073049977",
            sid: "5",
          },
        ], // 人员列表
        selects: {}, // 所有选中人员
        hashUsers: {}, // 哈希人员
      };
      this.teamList = {
        checkAll: false, // 全选标识
        params: {}, // 参数
        checkeds: [], // 选择列表
        lists: [], // 人员列表
        selects: {}, // 所有选中人员
        hashUsers: {}, // 哈希人员
      };
    },
    //开启会议后添加人
    onJoinUsers() {
      const that = this;
      for (let v in that.mailList.selects) {
        let item = that.mailList.selects[v];
        if (!that.hashUser[item.tel]) {
          that.hashUser[item.tel] = {
            name: item.name,
            tel: item.tel,
            state: 0,
            mute: 0,
          };
        }
      }
      for (let v in that.expertList.selects) {
        let item = that.expertList.selects[v];
        if (!that.hashUser[item.tel]) {
          that.hashUser[item.tel] = {
            name: item.expertsName,
            tel: item.tel,
            state: 0,
            mute: 0,
          };
        }
      }
      for (let v in that.teamList.selects) {
        let item = that.teamList.selects[v];
        if (!that.hashUser[item.leaderTel]) {
          that.hashUser[item.leaderTel] = {
            name: item.name,
            tel: item.leaderTel,
            state: 0,
            mute: 0,
          };
        }
      }
    },
    // 加入会议
    onJoin() {
      console.log(7777);
      const that = this;
      let phones = [];
      for (let v in that.mailList.selects) {
        let item = that.mailList.selects[v];
        if (!that.hashUser[item.tel]) {
          phones.push(item.tel);
        }
      }
      for (let v in that.expertList.selects) {
        let item = that.expertList.selects[v];
        if (!that.hashUser[item.tel]) {
          phones.push(item.tel);
        }
      }
      for (let v in that.teamList.selects) {
        let item = that.teamList.selects[v];
        if (!that.hashUser[item.leaderTel]) {
          phones.push(item.leaderTel);
        }
      }
      console.log(phones, that.expertList);
      // 加入会商
      if (that.conferenceNumber) {
        if (phones.length) {
          inviteMembers({
            body: {
              conferenceNumber: that.conferenceNumber,
              phoneList: phones,
            },
          }).then((res) => {
            that.personnelVis = false;
            that.onJoinUsers();
            that.initData();
          });
        }
      } else {
        // 发起会商
        if (phones.length) {
          launchMeeting({ body: { phoneList: phones } }).then((res) => {
            that.conferenceNumber = res.body.conferenceNumber;
            that.contactGroupId = res.body.contactGroupId;
            that.stream = res.body.stream;
            that.openFlv("consulting-video", res.body.videoUrl);
            that.onRefresh(1);
            that.personnelVis = false;
            that.onJoinUsers();
            that.initData();
            console.log("onRefresh");
          });
        }
      }
    },
    // 获取通讯录人员
    getUsers(type) {
      const that = this;
      let data = { body: { ...this[type].params }, page: 1, pageSize: 9999 };
      if (type === "mailList") {
        getContactsFind(data).then((res) => {
          res.body.forEach((item) => {
            that[type].hashUsers[item.sid] = item;
          });
          that[type].lists = res.body;
        });
      } else if (type === "expertList") {
        expertsFind(data).then((res) => {
          res.body.forEach((item) => {
            that[type].hashUsers[item.sid] = item;
          });
          that[type].lists = res.body;
        });
      } else if (type === "teamList") {
        teamFind(data).then((res) => {
          res.body.forEach((item) => {
            that[type].hashUsers[item.sid] = item;
          });
          that[type].lists = res.body;
        });
      }
    },
    // 刷新Select
    onRefreshSelect() {
      const that = this;
      that.activeVis = false;
      setTimeout(() => {
        that.activeVis = true;
      }, 200);
    },
    // table点击勾选
    onSelectChange(type, selection, row) {
      if (this[type].selects[row.sid]) {
        delete this[type].selects[row.sid];
      } else {
        this[type].selects[row.sid] = row;
      }
      console.log(selection);
      this.onRefreshSelect();
      // if(value){
      //     this[type].selects[sid] = this[type].hashUsers[sid];
      // }else{
      //     delete this[type].selects[sid];
      // }
    },
    // table点击全选
    onSelectAll(type, selection) {
      if (selection.length) {
        this[type].lists.forEach((item) => {
          this[type].selects[item.sid] = item;
        });
      } else {
        this[type].lists.forEach((item) => {
          if (this[type].selects[item.sid]) {
            delete this[type].selects[item.sid];
          }
        });
      }
      this.onRefreshSelect();
    },
    // 点击全选
    onCheckAll(type) {
      if (this[type].checkAll) {
        let checkeds = [];
        this[type].lists.forEach((item) => {
          checkeds.push(item.sid);
          this[type].selects[item.sid] = item;
        });
        this[type].checkeds = checkeds;
      } else {
        this[type].lists.forEach((item) => {
          if (this[type].selects[item.sid]) {
            delete this[type].selects[item.sid];
          }
        });
        this[type].checkeds = [];
      }
    },
    // 点击勾选
    onCheckedChange(value, type, sid) {
      if (value) {
        this[type].selects[sid] = this[type].hashUsers[sid];
      } else {
        delete this[type].selects[sid];
      }
      this[type].checkAll =
        this[type].checkeds.length === this[type].lists.length;
    },
    // 是否刷新
    onRefresh(flag) {
      const that = this;
      if (flag) {
        clearTimeout(that.timer);
        that.timer = null;
        that.timer = that.setTime(that.getUserList, that.wait * 1000);
      } else {
        clearTimeout(that.timer);
        that.timer = null;
      }
    },
    // 打开会商面板
    openConsulting(data) {
      console.log(data);
      const that = this;
      that.meetingVis = true;
    },
    // 开启flv视频流
    openFlv(id, url) {
      const that = this;
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById(id);
        that.flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: url,
          hasAudio: true,
          hasVideo: true,
          isLive: true,
          withCredentials: false,
          cors: true,
        });
        that.flvPlayer.attachMediaElement(videoElement);
        that.flvPlayer.load();
        that.flvPlayer.play();
      }
    },
    // 拉取用户状态列表
    getUserList() {
      let that = this;
      console.log("getUserList");
      if (that.conferenceNumber) {
        console.log("getUserList", 11);
        getConferenceStatus({
          body: { conferenceNumber: that.conferenceNumber },
        }).then((res) => {
          console.log("getUserList", 22);
          let arrUser = [];
          for (let v in that.hashUser) {
            let state = 0,
              mute = 0;
            res.body.forEach((item) => {
              if (item.name.includes(v)) {
                state = parseInt(item.online);
                mute = parseInt(item.mute);
              }
            });
            arrUser.push({
              name: that.hashUser[v].name,
              tel: that.hashUser[v].tel,
              state: state,
              mute: mute,
            });
          }
          that.arrUser = arrUser;
        });
      }
    },
    // 关闭会议
    onStopMeeting() {
      const that = this;
      if (that.flvPlayer) {
        that.flvPlayer.pause();
        that.flvPlayer.unload();
        that.flvPlayer.detachMediaElement();
        that.flvPlayer.destroy();
      }

      if (that.conferenceNumber) {
        closeVideoConference({
          body: {
            conferenceNumber: that.conferenceNumber,
            contactGroupId: that.contactGroupId,
            stream: that.stream,
          },
        });
      }

      that.onRefresh(0);
      that.clearSelection();
      that.conferenceNumber = "";
      that.hashUser = {};
      that.arrUser = [];
      that.meetingVis = false;
      that.flvPlayer = null;
      that.initData();
    },
    //获取组
    getGroups() {
      let that = this;
      let data = { body: {}, page: 1, pageSize: 10000 };
      getGroupFind(data).then((res) => {
        res.body.map((item) => {
          item.expand = false;
          item.checked = false;
          return item;
        });
        let treeData = that.treeDataformat(
          res.body,
          "sid",
          "parentId",
          "children"
        );
        that.treeData = treeData;
        that.checkedKeys.selects = treeData.length ? [treeData[0].sid] : [];
      });
    },
    //list转tree
    treeDataformat(source, id, parentId, children) {
      let cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          (child) => father[id] == child[parentId]
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father[children] = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father[parentId] == 1; // 如果第一层不是parentId=0，请自行修改
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "";
      } else {
        return "success-row";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.layer-consulting {
  width: 100%;
  height: 100%;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  /deep/ .sud-layer {
    .sud-layer-header {
      overflow: visible;
    }
  }
  .content-header {
    height: 100%;
    width: 100%;
    background: rgba(0, 44, 103, 0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: move;
    box-sizing: border-box;

    .c-h-title {
      font-weight: bold;
      color: rgba(0, 233, 234, 1);
    }
    .c-h-close {
      cursor: pointer;
      position: relative;
      .c-h-c-popover {
        position: absolute;
        right: 0px;
        top: 40px;
        background: #fff;
        min-width: 220px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        padding: 12px;
        color: #606266;
        line-height: 1.4;
        text-align: right;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        word-break: break-all;
        z-index: 9;
        font-size: 24px;
        .c-h-c-p-top {
          position: absolute;
          top: -22px;
          right: 0;
          color: #fff;
        }
      }
    }
  }
  .content-info {
    height: 100%;
    width: 100%;
    padding: 8px;
    background: rgba(0, 44, 103, 0.6);
    overflow: auto;
    box-sizing: border-box;
    word-break: break-all;
    .content-col {
      line-height: 30px;
      span {
        font-size: 12px;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }

    .consulting-content {
      height: 100%;
      display: flex;
      .consulting-left {
        height: 100%;
        width: calc(100% - 600px);
        .consulting-video {
          width: 100%;
          height: 100%;
        }
      }
      .consulting-right {
        height: 100%;
        width: 600px;
        margin-left: 8px;
        .c-right-title {
          font-weight: bold;
          height: 40px;
          line-height: 40px;
          color: rgba(0, 233, 234, 1);
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .c-r-t-num {
            max-width: 180px;
          }
          .c-r-t-search {
            width: 200px;
            transform: translateY(-2px);
            ::v-deep .el-input {
              width: 200px;
              .el-input__inner {
                color: #fff;
                background-color: transparent;
                border-width: 2px;
                // border-color: rgba(78,157,253);
              }
              .el-input-group__append {
                color: #fff;
                background-color: transparent;
                border-width: 2px;
                // border-color: rgba(78,157,253);
              }
            }
          }
          .c-r-t-btns {
            display: flex;
            .c-r-l-shutup {
              cursor: pointer;
              color: #fff;
              background-color: #e6a23c;
              padding: 0px 5px;
              margin-right: 10px;
              border-radius: 5px;
              position: relative;
              .c-r-l-s-popover {
                position: absolute;
                right: 0px;
                top: 50px;
                background: #fff;
                min-width: 220px;
                border-radius: 4px;
                border: 1px solid #ebeef5;
                padding: 12px;
                color: #606266;
                line-height: 1.4;
                text-align: right;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                word-break: break-all;
                z-index: 9;
                font-size: 24px;
                .c-h-c-p-top {
                  position: absolute;
                  top: -22px;
                  right: 0;
                  color: #fff;
                }
              }
            }
            .c-r-l-out {
              cursor: pointer;
              color: #fff;
              background-color: #f56c6c;
              padding: 0px 5px;
              border-radius: 5px;
              position: relative;
              .c-r-l-o-popover {
                position: absolute;
                right: 0px;
                top: 50px;
                background: #fff;
                min-width: 220px;
                border-radius: 4px;
                border: 1px solid #ebeef5;
                padding: 12px;
                color: #606266;
                line-height: 1.4;
                text-align: right;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                word-break: break-all;
                z-index: 9;
                font-size: 24px;
                .c-h-c-p-top {
                  position: absolute;
                  top: -22px;
                  right: 0;
                  color: #fff;
                }
              }
            }
          }
        }
        .c-right-list {
          height: calc(100% - 70px);
          padding: 8px 0;
          box-sizing: border-box;
          overflow: auto;
          /deep/ .el-table {
            // 去掉最下面白线
            font-size: var(--mini-font);
            padding-bottom: 20px;
            .cell {
              line-height: 25px;
            }
            &::before {
              height: 0px;
            }
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0);
            .success-row {
              background: rgba(19, 45, 92, 1);
            }
            .el-table__expanded-cell {
              background-color: transparent;
            }

            tr {
              background-color: transparent;
            }

            .el-table__header-wrapper {
              .has-gutter {
                th {
                  border: none;
                  background-color: transparent;
                }
              }
            }

            .el-table__body-wrapper {
              height: calc(100% - 35px);
              overflow-x: hidden;
              overflow-y: auto;
              td {
                border: none;
                background-color: transparent;
              }
              &::-webkit-scrollbar {
                display: none;
              }
            }

            .el-table__empty-text {
              color: #fff;
            }
          }
          .c-r-l-shutup {
            cursor: pointer;
            color: #fff;
            background-color: #e6a23c;
            padding: 0px 5px;
            margin: 0 10px;
            border-radius: 5px;
          }
          .c-r-l-out {
            cursor: pointer;
            color: #fff;
            background-color: #f56c6c;
            padding: 0px 5px;
            border-radius: 5px;
          }
          &::-webkit-scrollbar {
            width: 5px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(67, 137, 233, 0.5);
            border-radius: 5px;
          }
          &::-webkit-scrollbar-track {
            background: rgba(0, 44, 103, 0.2);
          }
          .green {
            color: rgba(0, 233, 234, 1);
          }
          .red {
            color: #f56c6c;
          }
        }
        .c-right-invite {
          width: 50%;
          height: 30px;
          line-height: 26px;
          margin: auto;
          color: rgba(0, 233, 234, 1);
          border: 2px solid rgba(29, 176, 255);
          text-align: center;
          box-sizing: border-box;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
    .personnel-content {
      height: 100%;
      /deep/ .el-table {
        // 去掉最下面白线
        font-size: var(--mini-font);
        padding-bottom: 20px;
        .cell {
          line-height: 25px;
        }
        &::before {
          height: 0px;
        }
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0);
        .success-row {
          background: rgba(19, 45, 92, 1);
        }
        .el-table__expanded-cell {
          background-color: transparent;
        }

        tr {
          background-color: transparent;
        }

        .el-table__header-wrapper {
          .has-gutter {
            th {
              border: none;
              background-color: transparent;
            }
          }
        }

        .el-table__body-wrapper {
          height: calc(100% - 35px);
          overflow-x: hidden;
          overflow-y: auto;
          td {
            border: none;
            background-color: transparent;
          }
          &::-webkit-scrollbar {
            display: none;
          }
        }

        .el-table__empty-text {
          color: #fff;
        }
      }
      ::v-deep .el-tabs {
        height: calc(100% - 88px);
        .el-tabs__content {
          height: calc(100% - 60px);
          .el-tab-pane {
            height: 100%;
          }
        }
        .el-tabs__item {
          color: #fff;
          padding: 0px 10px;
          margin-right: 8px;
          position: relative;
          background-color: rgba(56, 140, 255, 0.6);
          // &::after{
          //     content: '';
          //     right: 0;
          //     top: 0;
          //     height: 100%;
          //     width: 100%;
          //     z-index: -1;
          //     position: absolute;
          //     background-color: rgba(56,140,255,0.6);
          //     -webkit-transform: skew(30deg);
          //     -moz-transform: skew(30deg);
          //     -o-transform: skew(30deg);
          //     transform: skew(30deg);
          // }
        }
        .is-active {
          background-color: rgba(56, 140, 255);
          // &::after{
          //     content: '';
          //     right: 0;
          //     top: 0;
          //     height: 100%;
          //     width: 100%;
          //     z-index: -1;
          //     position: absolute;
          //     background-color: rgba(56,140,255);
          //     -webkit-transform: skew(30deg);
          //     -moz-transform: skew(30deg);
          //     -o-transform: skew(30deg);
          //     transform: skew(30deg);
          // }
        }
        .el-tabs__active-bar {
          height: 0;
        }
        .el-tabs__nav-wrap {
          &::after {
            background-color: transparent;
          }
        }
      }
      .mail-list-content {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 40px);
        .p-c-mail {
          width: 500px;
          height: 100%;
          overflow: auto;
          &::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(67, 137, 233, 0.5);
            border-radius: 5px;
          }
          &::-webkit-scrollbar-track {
            background: rgba(0, 44, 103, 0.2);
          }
        }
        .p-c-persons {
          width: calc(100% - 520px);
          height: 100%;
          .el-checkbox {
            color: #fff;
            margin-bottom: 5px;
            .el-checkbox__label {
              color: #fff;
            }
          }
          .p-c-p-search {
            display: flex;
            justify-content: space-between;
            align-items: center;

            ::v-deep .el-input {
              width: 200px;
              .el-input__inner {
                color: #fff;
                background-color: transparent;
                border-width: 2px;
                // border-color: rgba(78,157,253);
              }
              .el-input-group__append {
                color: #fff;
                background-color: transparent;
                border-width: 2px;
                // border-color: rgba(78,157,253);
              }
            }
          }

          .p-c-p-lists {
            height: 100%;
            overflow: auto;
            margin-top: 8px;
            &::-webkit-scrollbar {
              width: 5px;
            }
            &::-webkit-scrollbar-thumb {
              background-color: rgba(67, 137, 233, 0.5);
              border-radius: 5px;
            }
            &::-webkit-scrollbar-track {
              background: rgba(0, 44, 103, 0.2);
            }
          }
        }
      }
      .expert-list-content {
        height: calc(100% - 40px);
        .p-c-persons {
          height: 100%;
        }
        .el-checkbox {
          color: #fff;
          margin-bottom: 5px;
          .el-checkbox__label {
            color: #fff;
          }
        }
        .p-c-p-search {
          display: flex;
          justify-content: space-between;
          align-items: center;

          ::v-deep .el-input {
            width: 200px;
            .el-input__inner {
              color: #fff;
              background-color: transparent;
              border-width: 2px;
              // border-color: rgba(78,157,253);
            }
            .el-input-group__append {
              color: #fff;
              background-color: transparent;
              border-width: 2px;
              // border-color: rgba(78,157,253);
            }
          }
        }

        .p-c-p-lists {
          height: 100%;
          overflow: auto;
          margin-top: 8px;
          box-sizing: border-box;
          &::-webkit-scrollbar {
            width: 5px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(67, 137, 233, 0.5);
            border-radius: 5px;
          }
          &::-webkit-scrollbar-track {
            background: rgba(0, 44, 103, 0.2);
          }
        }
      }
      .team-list-content {
        height: calc(100% - 40px);
        .el-checkbox {
          color: #fff;
          margin-bottom: 5px;
          .el-checkbox__label {
            color: #fff;
          }
        }
        .p-c-p-search {
          display: flex;
          justify-content: space-between;
          align-items: center;

          ::v-deep .el-input {
            width: 200px;
            .el-input__inner {
              color: #fff;
              background-color: transparent;
              border-width: 2px;
              // border-color: rgba(78,157,253);
            }
            .el-input-group__append {
              color: #fff;
              background-color: transparent;
              border-width: 2px;
              // border-color: rgba(78,157,253);
            }
          }
        }

        .p-c-p-lists {
          height: 100%;
          overflow: auto;
          margin-top: 8px;
          &::-webkit-scrollbar {
            width: 5px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(67, 137, 233, 0.5);
            border-radius: 5px;
          }
          &::-webkit-scrollbar-track {
            background: rgba(0, 44, 103, 0.2);
          }
        }
      }
      .p-c-bottom {
        display: flex;
        height: 88px;
        align-items: center;
        .p-c-b-lists {
          width: calc(100% - 150px);
          overflow: auto;
          height: 100%;
          padding: 8px 0;
          box-sizing: border-box;
          &::-webkit-scrollbar {
            display: none;
          }
          .p-c-b-l-tag {
            border: none;
            margin: 0 5px 5px 0;
            color: #fff;
            font-size: var(--mini-font);
            /deep/ .el-tag__close {
              top: -10px;
              right: 0px;
              background-color: #409eff;
              color: #fff;
            }
          }
        }
        .p-c-b-join {
          width: 150px;
          height: 30px;
          line-height: 26px;
          color: rgba(0, 233, 234, 1);
          border: 2px solid rgba(29, 176, 255);
          text-align: center;
          box-sizing: border-box;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
