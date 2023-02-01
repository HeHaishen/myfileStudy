<template>
  <div>
    <div class="layer">
      <layer-consulting ref="LayerConsulting"></layer-consulting>
    </div>

    <!-- 指挥机构 -->
    <pop-up-layer
      :title="riskTitle"
      :show="commandAuthorityShow"
      :setStyles="{ left: '88%', top: '56%' }"
      class="command-table"
      @doClose="close"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div
          class="video-discussion mouse-click"
          v-if="authorityList.length !== 0"
          @click="showContactModel"
        >
          <span>视频会商</span>
        </div>
        <div class="command-table-content">
          <div class="command-table-left" v-if="commandAuthorityShow">
            <a-tree
              :load-data="onLoadData"
              :tree-data="treeData"
              @select="onSelect"
            />
          </div>
          <div class="command-table-right">
            <div class="title">{{ selectedTitle }}</div>

            <!-- <div v-for="item in authorityList" :key="item.id">
              <p><img :src="item.imgUrl" alt="" />{{ item.postName }}</p>
              <div class="command-table-right-list">
                <div v-for="item in item.children" :key="item.id">
                  <input type="checkbox" v-model="item.checked" id="ch" />
                  <span>{{ item.name }}</span>
                  <span>{{ item.depaName }}</span>
                  <span>{{ item.phone }}</span>
                </div>
              </div>
            </div> -->
            <button
              class="checkedAll"
              @click="checkedAllClick"
              v-show="authorityList.length != 0"
            >
              全选
            </button>
            <div class="right-data" v-show="authorityList.length != 0">
              <Clist :columns="authorityHeader" :listData="authorityList">
                <template slot="checked" slot-scope="{ record, text }">
                  <div class="checked" @click="checkedClick(record)">
                    {{ text ? "√" : "" }}
                  </div>
                </template>
                <template slot="mobilePhone" slot-scope="{ record, text }">
                  <div>
                    {{ text
                    }}<a-icon
                      type="phone"
                      class="icon"
                      @click="clickMobilePhone(record, $event)"
                      v-show="text"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="clickMessage(record, $event)"
                      v-show="text"
                    />
                  </div>
                </template>

                <template slot="officePhone" slot-scope="{ record, text }">
                  <div>
                    {{ text }}
                    <a-icon
                      type="phone"
                      class="icon"
                      v-show="text"
                      @click="clickOfficePhone(record, $event)"
                    />
                  </div>
                </template>
              </Clist>
            </div>
            <changePage
              v-model="current"
              :total="total"
              @changePages="keyChangePages"
              v-show="authorityList.length != 0"
            ></changePage>
            <div class="no-datatips" v-show="authorityList.length == 0">
              暂无人员信息
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>

    <!-- 防汛责任人 -->
    <pop-up-layer
      :title="riskTitle"
      :show="dutyFloodShow"
      :setStyles="{ left: '79%', top: '50%' }"
      class="command-table command-table2"
      @doClose="close"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="clist-table">
          <div class="clist-header">
            <div class="type-switch">
              <div @click="dutyFloodCkick(0)" class="mouse-click">
                <img
                  src="../../../assets/images/theCityThreeProofing/zrr1.svg"
                  alt=""
                />
                <span>中型水库防汛责任人</span>
              </div>
              <div @click="dutyFloodCkick(1)" class="mouse-click">
                <img
                  src="../../../assets/images/theCityThreeProofing/zrr2.svg"
                  alt=""
                />
                <span>堤围防汛责任人</span>
              </div>
            </div>
            <div class="vedio">视频会商</div>
          </div>

          <div class="search-header">
            <div class="conditions-search">
              <span v-show="dutyFloodIndex === 0">水库名称：</span
              ><input
                v-show="dutyFloodIndex === 0"
                v-model="formData.reservoirName"
                placeholder="请输入水库名称"
              />
              <span v-show="dutyFloodIndex === 1">提围名称：</span
              ><input
                v-show="dutyFloodIndex === 1"
                v-model="formData.dikeName"
                placeholder="请输入提围名称"
              />
              <span>区域：</span
              ><input v-model="formData.areaCode" placeholder="请输入区域" />
              <button class="mouse-click btn" @click="onSubmit(2)">查询</button>
              <button class="mouse-click btn" @click="onEmpty">清空</button>
            </div>
            <button
              class="mouse-click btn all-checked"
              @click="checkedAllFloodClick"
              v-show="tabelListData2.length != 0"
            >
              全选
            </button>
          </div>

          <div class="clist-table-list-title">
            <div v-for="item in tableTitleList" :key="item.index">
              <p :style="item.index !== 0 ? '' : 'opacity: 0;'">
                {{ item.name }}
              </p>
            </div>
          </div>
          <div class="clist-table-list">
            <div class="list-table">
              <clist :columns="tableHeaderList2" :listData="tabelListData2">
                <!--  -->
                <template slot="checked" slot-scope="{ record, text, index }">
                  <div
                    class="checked mouse-click"
                    @click="checkedFloodClick(record, index)"
                  >
                    {{ text ? "√" : "" }}
                  </div>
                </template>
                <template slot="dutyPhone" slot-scope="{ record, text, index }">
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="dutyMobilePhone(record, $event, text)"
                      v-show="text"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="dutyMessage(record, $event, text)"
                      v-show="text"
                    />
                  </div>
                </template>

                <!-- administrationOfficePhone   administrationMobilePhone -->

                <template
                  slot="administrationOfficePhone"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="
                        administrationOfficeMobilePhone(record, $event, text)
                      "
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="administrationOfficeMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>

                <template
                  slot="administrationMobilePhone"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="administrationMobilePhone(record, $event, text)"
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="administrationMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>

                <!-- technologyOfficePhone  technologyMobilePhone  patrolName -->
                <template
                  slot="technologyOfficePhone"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="technologyOfficeMobilePhone(record, $event, text)"
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="technologyOfficeMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>

                <template
                  slot="technologyMobilePhone"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="technologyMobilePhone(record, $event, text)"
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="technologyMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>
                <!-- patrolName  patrolOfficePhone  patrolMobilePhone -->
                <template
                  slot="patrolOfficePhone"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="patrolOfficeMobilePhone(record, $event, text)"
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="patrolOfficeMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>

                <template
                  slot="patrolMobilePhone"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="patrolMobilePhone(record, $event, text)"
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="patrolMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>
              </clist>
            </div>
            <div class="list-pagination" v-show="tabelListData2.length != 0">
              <changePage
                v-model="flood.currentPage"
                :total="flood.total"
                @changePages="keyFloodChangePages"
              ></changePage>
            </div>

            <div class="no-datatips" v-show="tabelListData2.length == 0">
              暂无人员信息
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>

    <!-- 危险区域人群 -->
    <pop-up-layer
      :title="riskTitle"
      :show="hazardousAreaShow"
      :setStyles="{ left: '79%', top: '50%' }"
      class="command-table command-table2"
      @doClose="close"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="clist-table">
          <div class="clist-header">
            <div></div>
            <div class="vedio">视频会商</div>
          </div>
          <div class="search-header danger-header">
            <div class="conditions-search">
              <span>名称：</span
              ><input v-model="formData.name" placeholder="请输入转移人姓名" />
              <span>位置描述：</span
              ><input
                v-model="formData.describe"
                placeholder="请输入位置描述"
              />
              <span>房屋结构：</span
              ><input
                v-model="formData.houseStructure"
                placeholder="请输入房屋结构"
              />
              <button class="mouse-click btn" @click="onSubmit(3)">查询</button>
              <button class="mouse-click btn" @click="onEmpty">清空</button>
            </div>
            <button
              class="mouse-click btn all-checked"
              @click="checkedAllDangerClick"
              v-show="tabelListData3.length != 0"
            >
              全选
            </button>
          </div>

          <div class="clist-table-list2">
            <div class="list-table">
              <clist :columns="tableHeaderList3" :listData="tabelListData3">
                <template slot="checked" slot-scope="{ record, text, index }">
                  <div
                    class="checked mouse-click"
                    @click="checkedDangerClick(record, index)"
                  >
                    {{ text ? "√" : "" }}
                  </div>
                </template>
                <template slot="phone" slot-scope="{ record, text, index }">
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="dangerMobilePhone(record, $event, text)"
                      v-show="text != '无'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="dangerMessage(record, $event, text)"
                      v-show="text != '无'"
                    />
                  </div>
                </template>
              </clist>
            </div>
            <div class="list-pagination" v-show="tabelListData3.length != 0">
              <changePage
                v-model="hazardous.currentPage"
                :total="hazardous.total"
                @changePages="keyHazardousChangePages"
              ></changePage>
            </div>
            <div class="no-datatips" v-show="tabelListData3.length == 0">
              暂无人员信息
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>

    <!-- 三本台账 -->
    <pop-up-layer
      :title="riskTitle"
      :show="parameterListShow"
      :setStyles="{ left: '79%', top: '50%' }"
      class="command-table command-table2"
      @doClose="close"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="clist-table">
          <div class="clist-header">
            <div class="type-switch">
              <ul>
                <li
                  class="mouse-click"
                  :class="{ active: parameterActive == item.id }"
                  @click="parameterClick(item)"
                  v-for="item in parameterList"
                  :key="item.id"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div class="vedio">视频会商</div>
          </div>
          <div class="search-header">
            <div class="conditions-search">
              <span>区域：</span
              ><input v-model="formData.areaName" placeholder="请输入区域" />
              <span>名称：</span
              ><input v-model="formData.subjectName" placeholder="请输入名称" />
              <span>管理单位：</span
              ><input
                v-model="formData.managementUnit"
                placeholder="请输入管理单位"
              />
              <button class="mouse-click btn" @click="onSubmit(4)">查询</button>
              <button class="mouse-click btn" @click="onEmpty">清空</button>
            </div>
            <button
              class="mouse-click btn all-checked"
              @click="checkedAllThreeClick"
              v-show="tabelListData4.length != 0"
            >
              全选
            </button>
          </div>

          <div class="clist-table-list-title">
            <div v-for="item in tableTitleList" :key="item.index">
              <p :style="item.index !== 0 ? '' : 'opacity: 0;'">
                {{ item.name }}
              </p>
            </div>
          </div>
          <div class="clist-table-list">
            <div class="list-table">
              <clist :columns="tableHeaderList4" :listData="tabelListData4">
                <template slot="checked" slot-scope="{ record, text, index }">
                  <div
                    class="checked mouse-click"
                    @click="checkedThreeClick(record, index)"
                  >
                    {{ text ? "√" : "" }}
                  </div>
                </template>
                <!-- administrationName  administrationMobile -->
                <template
                  slot="administrationMobile"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="
                        administrationMobileMobilePhone(record, $event, text)
                      "
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="administrationMobileMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>

                <!-- technologyName technologyMobilePhon -->
                <template
                  slot="technologyMobilePhon"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="
                        technologyMobilePhonMobilePhone(record, $event, text)
                      "
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="technologyMobilePhonMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>

                <!-- patrolName  patrolMobilePhone -->
                <template
                  slot="patrolMobilePhone"
                  slot-scope="{ record, text, index }"
                >
                  {{ text }}
                  <div class="wrap-center">
                    <a-icon
                      type="phone"
                      class="icon"
                      @click="
                        patrolMobilePhoneMobilePhone(record, $event, text)
                      "
                      v-show="text != '--'"
                    />
                    <a-icon
                      type="mail"
                      class="icon"
                      @click="patrolMobilePhoneMessage(record, $event, text)"
                      v-show="text != '--'"
                    />
                  </div>
                </template>
              </clist>
            </div>
            <div class="list-pagination" v-show="tabelListData4.length != 0">
              <changePage
                v-model="three.currentPage"
                :total="three.total"
                @changePages="keyThreeChangePages"
              ></changePage>
            </div>
            <div class="no-datatips" v-show="tabelListData4.length == 0">
              暂无人员信息
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table";
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue"; // 会商
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import changePage from "@/components/APicture/changePage";
import {
  getConductInstitution,
  getCommanderInformation,
  getReservoirFlood,
  getBundFlood,
  getRiskZonePopulation,
  getThreeParameter,
} from "@/api/theCityThreeProofing";
export default {
  props: {
    popType: {
      type: Number,
      default: 0,
    },
    riskTitle: {
      type: String,
      default: "",
    },
  },
  components: {
    Clist,
    LayerConsulting,
    ContactPhone,
    MessageSend,
    changePage,
  },
  data() {
    return {
      // 防汛责任人
      flood: {
        total: 0,
        currentPage: 1,
        active: 0,
      },
      // 危险区域人群
      hazardous: {
        total: 0,
        currentPage: 1,
      },
      // 三本台账
      three: {
        total: 0,
        currentPage: 1,
      },
      dutyFloodIndex: 0, // 防汛责任人-下标 0水库1堤围
      current: 1,
      total: 0,
      treeNode: [],
      // 默认参数对象
      data: {
        body: {
          accountType: "城市易涝点",
          reservoirName: "",
          dikeName: "",
        },
        page: 1,
        pageSize: 10,
        pn: -1,
        sortName: "sid",
        sortOrder: "desc",
      },
      formData: {
        reservoirName: "",
        dikeName: "",
        subjectName: "",
      }, // 搜索框对象
      commandAuthorityShow: false, // 指挥机构
      dutyFloodShow: false, // 防汛责任人
      hazardousAreaShow: false, // 危险区域人群
      parameterListShow: false, // 三本台账
      // 指挥机构人员信息数据
      authorityList: [],
      selectedTitle: "三防指挥机构",
      authorityHeader: [
        { title: "姓名", index: 0, textIndex: "name", width: "10%" },
        {
          title: "工作单位",
          index: 1,
          textIndex: "adminPosition",
          width: "20%",
        },
        { title: "三防岗位", index: 2, textIndex: "sfPost", width: "10%" },
        { title: "办公电话", index: 3, textIndex: "officePhone", width: "20%" },
        { title: "手机电话", index: 4, textIndex: "mobilePhone", width: "30%" },
        { title: "", index: 4, textIndex: "checked", width: "10%" },
      ],
      tableTitleList: [
        { name: "行政责任人", index: 0 },
        { name: "行政责任人", index: 1 },
        { name: "技术责任人", index: 2 },
        { name: "巡查责任人", index: 3 },
      ],
      // 防汛责任人表格数据
      tabelListData2: [],
      // 防汛责任人 表格标题
      tableHeaderList2: [
        { title: "水库名称", index: 1, textIndex: "reservoirName" },
        { title: "所在地（县镇）", index: 1, textIndex: "address" },
        { title: "值班电话", index: 2, textIndex: "dutyPhone" },

        { title: "姓名", index: 3, textIndex: "administrationName" },
        { title: "职务", index: 3, textIndex: "administrationPost" },
        { title: "办公电话", index: 3, textIndex: "administrationOfficePhone" },
        { title: "手机", index: 3, textIndex: "administrationMobilePhone" },

        { title: "姓名", index: 3, textIndex: "technologyName" },
        { title: "职务", index: 3, textIndex: "technologyPost" },
        { title: "办公电话", index: 3, textIndex: "technologyOfficePhone" },
        { title: "手机", index: 3, textIndex: "technologyMobilePhone" },

        { title: "姓名", index: 3, textIndex: "patrolName" },
        { title: "职务", index: 3, textIndex: "patrolPost" },
        { title: "办公电话", index: 3, textIndex: "patrolOfficePhone" },
        { title: "手机", index: 3, textIndex: "patrolMobilePhone" },
        { title: "", index: 3, textIndex: "checked" },
      ],
      // 危险区域人群 表格标题
      tableHeaderList3: [
        { title: "区域", index: 0, textIndex: "areaName" },
        {
          title: "转移人姓名",
          index: 1,
          textIndex: "reservoirName",
        },
        { title: "台账类型", index: 2, textIndex: "type" },
        { title: "风险级别", index: 2, textIndex: "level" },
        { title: "位置描述", index: 2, textIndex: "describe" },
        {
          title: "房屋结构",
          index: 2,
          textIndex: "houseStructure",
        },
        {
          title: "是否外来人口",
          index: 2,
          textIndex: "foreignPopulation",
        },
        {
          title: "转移时是否需要辅助",
          index: 2,
          textIndex: "auxiliary",
        },
        { title: "联系方式", index: 2, textIndex: "phone" },
        { title: "", index: 2, textIndex: "checked" },
      ],
      // 三本台账 表格标题
      tableHeaderList4: [
        { title: "水库名称", index: 1, textIndex: "subjectName" },
        { title: "辖区", index: 0, textIndex: "areaName" },
        { title: "所在位置", index: 2, textIndex: "address" },

        { title: "职务", index: 3, textIndex: "administrationPost" },
        { title: "姓名", index: 3, textIndex: "administrationName" },
        { title: "手机", index: 3, textIndex: "administrationMobile" },

        { title: "职务", index: 3, textIndex: "technologyPost" },
        { title: "姓名", index: 3, textIndex: "technologyName" },
        { title: "手机", index: 3, textIndex: "technologyMobilePhon" },

        { title: "职务", index: 3, textIndex: "patrolPost" },
        { title: "姓名", index: 3, textIndex: "patrolName" },
        { title: "手机", index: 3, textIndex: "patrolMobilePhone" },
        { title: "", index: 3, textIndex: "checked" },
      ],
      // 危险区域人群表格数据
      tabelListData3: [],
      // 本台账表格数据
      tabelListData4: [],
      // 三本台账 数据筛选
      // '水库','山塘','堤防','闸坝','城市易涝点','地质灾害点','地下施工点','隧道','涵洞'
      parameterList: [
        { id: 1, name: "城市易涝点" },
        { id: 2, name: "地质灾害点" },
        { id: 3, name: "地下施工点" },
        { id: 4, name: "涵洞" },
        { id: 5, name: "闸坝" },
        { id: 6, name: "堤防" },
        { id: 7, name: "隧道" },
        { id: 8, name: "水库" },
        { id: 9, name: "山塘" },
      ],
      // 三本台账 数据筛选-下标
      parameterActive: 1,
      // 树形表数据
      treeData: [
        { title: "广州市指挥机构", key: "440000000000" }, // isLeaf是否有下级 true否 false是
      ],
    };
  },
  watch: {
    // 监听父组件传过来的弹窗类型
    popType(newVal) {
      console.log(newVal);
      this.dutyFloodShow = false;
      this.commandAuthorityShow = false;
      this.hazardousAreaShow = false;
      this.parameterListShow = false;
      // 指挥机构
      if (newVal === 1) {
        this.conductInstitution("-1");
        this.commanderInformation("440100000000");
        // 防汛责任人
      } else if (newVal === 2) {
        this.reservoirFlood();
        // 危险区域人群
      } else if (newVal === 3) {
        this.riskZonePopulation();
        // 三本台账
      } else if (newVal === 4) {
        this.threeParameter();
      }
    },
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
  },
  methods: {
    // 三本台账
    patrolMobilePhoneMobilePhone(item, e, text) {
      let { patrolName, patrolMobilePhone } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: patrolMobilePhone,
      });
    },
    patrolMobilePhoneMessage(item, e, text) {
      let { patrolName, patrolMobilePhone } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: patrolMobilePhone,
      });
    },
    technologyMobilePhonMobilePhone(item, e, text) {
      let { technologyName, technologyMobilePhon } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: technologyName,
        phone: technologyMobilePhon,
      });
    },
    technologyMobilePhonMessage(item, e, text) {
      let { technologyName, technologyMobilePhon } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: technologyName,
        phone: technologyMobilePhon,
      });
    },
    administrationMobileMobilePhone(item, e, text) {
      let { administrationName, administrationMobile } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationMobile,
      });
    },
    administrationMobileMessage(item, e, text) {
      let { administrationName, administrationMobile } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationMobile,
      });
    },

    // 危险区域人群
    dangerMobilePhone(item, e, text) {
      let { phone, reservoirName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: reservoirName,
        phone: phone,
      });
    },
    dangerMessage(item, e, text) {
      let { phone, reservoirName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: reservoirName,
        phone: phone,
      });
    },

    // 防汛责任人
    // patrolName patrolOfficePhone patrolMobilePhone

    patrolMobilePhone(item, e, text) {
      let { patrolMobilePhone, patrolName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: patrolMobilePhone,
      });
    },
    patrolMessage(item, e, text) {
      let { patrolMobilePhone, patrolName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: patrolMobilePhone,
      });
    },
    patrolOfficeMobilePhone(item, e, text) {
      let { patrolOfficePhone, patrolName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: patrolOfficePhone,
      });
    },
    patrolOfficeMessage(item, e, text) {
      let { patrolOfficePhone, patrolName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: patrolOfficePhone,
      });
    },
    technologyMobilePhone(item, e, text) {
      let { technologyMobilePhone, administrationName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: technologyMobilePhone,
      });
    },
    technologyMessage(item, e, text) {
      let { technologyMobilePhone, administrationName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: technologyMobilePhone,
      });
    },
    technologyOfficeMobilePhone(item, e, text) {
      let { technologyOfficePhone, administrationName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: technologyOfficePhone,
      });
    },
    technologyOfficeMessage(item, e, text) {
      let { technologyOfficePhone, administrationName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: technologyOfficePhone,
      });
    },
    administrationMobilePhone(item, e, text) {
      let { administrationMobilePhone, administrationName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationMobilePhone,
      });
    },
    administrationMessage(item, e, text) {
      let { administrationMobilePhone, administrationName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationMobilePhone,
      });
    },
    administrationOfficeMobilePhone(item, e, text) {
      let { administrationOfficePhone, administrationName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationOfficePhone,
      });
    },
    administrationOfficeMessage(item, e, text) {
      let { administrationOfficePhone, administrationName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: administrationOfficePhone,
      });
    },
    dutyMobilePhone(item, e, text) {
      let { dutyPhone, administrationName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: dutyPhone,
      });
    },
    dutyMessage(item, e, text) {
      let { dutyPhone, administrationName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: dutyPhone,
      });
    },
    keyChangePages(currentPage) {
      console.log(currentPage);
      // this.current = currentPage;
      this.data.page = currentPage.pages;

      if (this.treeNode.length) {
        this.commanderInformation(this.treeNode[0]);
      } else {
        this.commanderInformation("440100000000");
      }

      // JSON.parse(JSON.stringify(this.authorityList));
    },

    keyFloodChangePages(page) {
      console.log("防汛责任人", page);
      this.data.page = page.pages;
      this.flood.currentPage = page.pages;
      if (this.flood.active === 0) {
        this.reservoirFlood();
      } else {
        this.bundFlood();
      }
    },
    keyHazardousChangePages(page) {
      this.data.page = page.pages;
      this.hazardous.currentPage = page.pages;
      this.riskZonePopulation();
    },
    keyThreeChangePages(page) {
      this.data.page = page.pages;
      this.three.currentPage = page.pages;
      this.threeParameter();
    },
    clickMobilePhone(record, e) {
      let { name, mobilePhone } = record;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone: mobilePhone,
      });
    },
    // 打电话
    clickTeamPhone(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    // 发短信
    clickTeamMessage(vValue) {
      let { name, phone, event } = vValue;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    clickOfficePhone(record, e) {
      let { name, officePhone } = record;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone: officePhone,
      });
    },
    clickMessage(record, e) {
      console.log(record);
      let { name, mobilePhone } = record;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone: mobilePhone,
      });
    },

    // 单选
    checkedClick(record) {
      console.log("点击选中", record);
      this.authorityList.map((item) => {
        if (item.sid == record.sid) {
          item.checked = !item.checked;
        }
      });
      // JSON.parse(JSON.stringify(this.authorityList));
    },

    // 防汛责任人单选框
    checkedFloodClick(record, index) {
      this.tabelListData2[index].checked = !this.tabelListData2[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.tabelListData2));
    },

    checkedDangerClick(record, index) {
      this.tabelListData3[index].checked = !this.tabelListData3[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.tabelListData3));
    },

    // 三本台账单选框
    checkedThreeClick(record, index) {
      this.tabelListData4[index].checked = !this.tabelListData4[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.tabelListData4));
    },

    // 点击全选  指挥机构
    checkedAllClick() {
      let data = this.authorityList.filter((item) => item.checked);
      console.log("选中了", data);
      this.authorityList.map((item) => {
        if (data.length === this.authorityList.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },

    // 防汛责任人 全选
    checkedAllFloodClick() {
      let data = this.tabelListData2.filter((item) => item.checked);
      console.log("选中了", data);
      this.tabelListData2.map((item) => {
        if (data.length === this.tabelListData2.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },

    // 三本台账  全选
    checkedAllThreeClick() {
      let data = this.tabelListData4.filter((item) => item.checked);
      console.log("选中了", data);
      this.tabelListData4.map((item) => {
        if (data.length === this.tabelListData4.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },

    // 危险人群  全选
    checkedAllDangerClick() {
      let data = this.tabelListData3.filter((item) => item.checked);
      console.log("选中了", data);
      this.tabelListData3.map((item) => {
        if (data.length === this.tabelListData3.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },

    // 树形结构数据处理
    treeDataProcessing(treeId, type, typeName, obj) {
      let dataArr = [];
      let index = 0;
      for (const key in treeId) {
        dataArr.push({
          id: key,
          children: [],
        });
        obj.map((val) => {
          if (val[type] === key) {
            dataArr[index][typeName] = val[typeName];
            dataArr[index].children.push(val);
          }
        });
        index++;
      }
      return dataArr;
    },
    // 数据空值处理 --
    objDataProcessing2(obj) {
      obj.map((val) => {
        for (const key in val) {
          if (!val[key]) {
            val[key] = "--";
          }
        }
        val.checked = false;
      });
      return obj;
    },
    // 关闭弹窗
    close() {
      if (this.popType === 1) {
        this.commandAuthorityShow = false;
      } else if (this.popType === 2) {
        this.formData.reservoirName = "";
        this.formData.dikeName = "";
        this.data.body.reservoirName = "";
        this.data.body.dikeName = "";
        this.data.page = 1;
        this.flood.currentPage = 1;
        this.dutyFloodShow = false;
      } else if (this.popType === 3) {
        this.formData.name = "";
        this.data.page = 1;
        this.hazardous.currentPage = 1;
        this.data.body.reservoirName = "";
        this.hazardousAreaShow = false;
      } else if (this.popType === 4) {
        this.formData.subjectName = "水库";
        this.data.body.subjectName = "水库";
        this.parameterActive = 1;
        this.data.page = 1;
        this.three.currentPage = 1;
        this.parameterListShow = false;
      }
      this.$emit("clickClose");
    },
    // 加载监控资源树
    onLoadData(treeNode) {
      console.log("加载监控资源树", treeNode);
      // debugger
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        this.data.body = { pn: treeNode.dataRef.key };
        getConductInstitution(this.data).then((res) => {
          if (res.success) {
            if (res.body.data.length === 0) return;
            let listData = res.body.data.map((i, k) => {
              if (i.isLeaf == "0") {
                i.isLeaf = false;
              } else if (i.isLeaf == "1") {
                i.isLeaf = true;
              }
            });
            res.body.data = JSON.parse(
              JSON.stringify(res.body.data)
                .replace(/sn/g, "key")
                .replace(/name/g, "title")
            );
            treeNode.dataRef.children = [...res.body.data];
            this.treeData = [...this.treeData];
            console.log("树状图", this.treeData);
            resolve();
          }
        });
      });
    },
    // 点击树节点触发
    onSelect(treeNode, r) {
      if (treeNode.length === 0) return;
      this.data.page = 1;
      this.current = 1;
      console.log("点击树节点触发", treeNode, r);
      this.selectedTitle = r.node.dataRef.title;
      this.treeNode = treeNode;
      console.log("点击树节点触发", treeNode);
      this.commanderInformation(treeNode[0]);
    },
    // 展示融合通信模块
    showContactModel() {
      // Bus.$emit("openConsulting");
      // this.$emit("openConsulting")
      this.openConsulting();
    },
    openConsulting() {
      this.$refs.LayerConsulting.$emit("openConsulting", { set: 888888 });
      this.$refs.LayerConsulting.meetingVis = true;
    },
    // 切换三本台账表格
    parameterClick(item) {
      this.parameterActive = item.id;
      this.tableHeaderList4[0].title = `${item.name}名称`;
      this.data.body.accountType = item.name;
      this.data.body.subjectName = "";
      this.formData.subjectName = "";
      this.data.page = 1;
      this.three.currentPage = 1;
      this.threeParameter();
    },
    // 查询
    onSubmit(index) {
      if (index === 2) {
        this.dutyFloodCkick(this.dutyFloodIndex);
      } else if (index === 3) {
        this.riskZonePopulation();
      } else if (index === 4) {
        this.threeParameter();
      }
    },
    // 清空输入框
    onEmpty() {
      this.formData = {};
    },
    // 切换-防汛责任人0水库1堤围
    dutyFloodCkick(index) {
      this.dutyFloodIndex = index;

      // this.data.body = this.formData;
      // this.formData = {};
      this.data.page = 1;
      this.flood.currentPage = 1;
      // console.log();
      if (index === 0) {
        this.tableHeaderList2[0] = {
          title: "水库名称",
          index: 1,
          textIndex: "reservoirName",
        };
        this.formData.dikeName = "";
        this.flood.active = 0;
        this.reservoirFlood();
      } else {
        this.tableHeaderList2[0] = {
          title: "堤围名称",
          index: 0,
          textIndex: "dikeName",
        };
        this.flood.active = 1;
        this.formData.reservoirName = "";
        this.bundFlood();
      }
    },
    // 获取全市三防-指挥机构
    conductInstitution(pn) {
      this.data.body = { pn };
      getConductInstitution(this.data).then((res) => {
        if (res.success) {
          this.treeData = [
            { title: res.body.data[0].name, key: res.body.data[0].sn },
          ];
          this.commandAuthorityShow = true;
        }
      });
    },
    // 获取全市三防-指挥人员信息
    commanderInformation(orgCode) {
      this.data.body = { orgCode };
      getCommanderInformation(this.data).then((res) => {
        console.log("获取全市三防-指挥人员信息", res);
        let listData = res.body.data.map((item) => {
          item.checked = false;
        });
        this.total = parseInt(res.body.total);
        this.authorityList = res.body.data;
        // if (res.success) {
        //   this.authorityList = [
        //     {
        //       id: 0,
        //       imgUrl: require("../../../assets/images/theCityThreeProofing/wjx.png"),
        //       postName: "总指挥",
        //       children: [],
        //     },
        //     {
        //       id: 1,
        //       imgUrl: require("../../../assets/images/theCityThreeProofing/wjx.png"),
        //       postName: "副指挥",
        //       children: [],
        //     },
        //     {
        //       id: 2,
        //       imgUrl: require("../../../assets/images/theCityThreeProofing/chengyuan.png"),
        //       postName: "成员",
        //       children: [],
        //     },
        //   ];
        //   let _this = this;
        //   let obj = {};
        //   res.body.data.map((val) => {
        //     obj[val.postType] = true;
        //   });
        //   let data = this.treeDataProcessing(
        //     obj,
        //     "postType",
        //     "postName",
        //     res.body.data
        //   );
        //   data.map((val) => {
        //     if (obj[val.id])
        //       val.imgUrl = _this.authorityList[val.id - 1].imgUrl;
        //   });
        //   this.authorityList = data;
        // }
      });
    },
    // 获取全市三防-水库防汛责任人
    reservoirFlood() {
      this.data.body.reservoirName = this.formData.reservoirName;
      getReservoirFlood(this.data).then((res) => {
        // this.formData = {};
        if (res.success) {
          console.log("获取全市三防-水库防汛责任", this.tabelListData2);
          this.flood.total = parseInt(res.body.total);
          this.tabelListData2 = this.objDataProcessing2(res.body.data);
          // console.log(
          //   "获取全市三防-水库防汛责任",
          //   JSON.parse(JSON.stringify(this.tabelListData2))
          // );
          // let listData = this.tabelListData2.map((item) => {
          //   item.checked = false;
          // });
          // console.log("获取全市三防-水库防汛责任", listData);
          this.dutyFloodShow = true;
        }
      });
    },
    // 获取全市三防-堤围防汛责任人
    bundFlood() {
      this.data.body.dikeName = this.formData.dikeName;
      getBundFlood(this.data).then((res) => {
        // this.formData = {};
        if (res.success) {
          this.flood.total = parseInt(res.body.total);
          // debugger;
          this.tabelListData2 = this.objDataProcessing2(res.body.data);
        }
      });
    },
    // 获取全市三防-危险区域人群
    riskZonePopulation() {
      this.data.body.reservoirName = this.formData.name;
      getRiskZonePopulation(this.data).then((res) => {
        // this.formData = {};
        if (res.success) {
          this.tabelListData3 = this.objDataProcessing2(res.body.data);
          this.hazardousAreaShow = true;
          this.hazardous.total = parseInt(res.body.total);
        }
      });
    },
    // 获取全市三防-三本台账
    threeParameter() {
      // this.data.body.accountType = this.accountType;
      // this.data.body = {
      //   accountType: this.parameterActive,
      // };
      this.data.body = { ...this.data.body, ...this.formData };
      getThreeParameter(this.data).then((res) => {
        // this.formData = {};
        if (res.success) {
          this.tabelListData4 = this.objDataProcessing2(res.body.data);
          this.parameterListShow = true;
          this.three.total = parseInt(res.body.total);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../index.less";

/deep/.layer-title-icon::before {
  display: none;
}

.layer {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99999;
  pointer-events: none;
}

.command-table {
  width: 1500vw * @w;
  height: auto;
  padding: 10vh * @h;
  background-color: #0d3858;
  // text-align: center;

  .video-discussion {
    color: #fff;
    text-align: right;
    margin-bottom: 10vh * @h;

    span {
      display: inline-block;
      width: 130vw * @w;
      height: 35vh * @h;
      line-height: 35vh * @h;
      text-align: center;
      font-size: 20vh * @h;
      border-radius: 5vh * @h;
      margin-right: 20vw * @w;
      background-color: #169bd5;
    }
  }

  .command-table-content {
    margin-top: 10vh * @h;
    display: flex;
    height: 650vh * @h;

    .command-table-left {
      width: 320vw * @w;
      height: 100%;
      margin-right: 30vw * @w;
      border: 1px solid #797979;
      background-color: #071f40;
      padding: 20vh * @h 20vw * @w;
      color: #fff;
      overflow-x: hidden;

      /deep/ span {
        color: white;
        font-size: 18vh * @h;
        line-height: 28vh * @h;
      }
      & /deep/ .ant-tree-switcher {
        font-size: 18vh * @h;
        line-height: 28vh * @h;
      }
      & /deep/ .ant-tree-switcher i {
        font-size: 18vh * @h;
        line-height: 28vh * @h;
      }
      & /deep/ .ant-tree-switcher .ant-tree-switcher-icon {
        font-size: 18vh * @h !important;
        line-height: 28vh * @h;
      }
      & /deep/ .ant-tree-node-selected {
        background-color: transparent;
      }
      /deep/ .ant-tree-node-selected span {
        color: #2de9e8;
      }
      /deep/ .ant-tree-switcher {
        width: auto;
      }
      /deep/ .ant-tree-node-content-wrapper .ant-tree-title {
        padding: 10vh * @h 0;
        .box-sizing();
      }
      /deep/ .ant-tree > li:first-child {
        margin-top: 10vh * @h;
      }
      /deep/ .ant-tree li {
        margin: 10vh * @h 0;
      }
    }

    .command-table-right {
      flex: 1;
      height: 100%;
      color: #fff;
      // overflow-y: auto;
      padding-right: 20vw * @w;
      position: relative;

      > div {
        > p {
          display: flex;
          align-items: center;
          font-size: 20vh * @h;
          margin: 0;
          padding: 10vh * @h 20vw * @w;
          border: 1px solid #0e2c58;
          background-color: #1b2f4c;

          > img {
            width: 25vw * @w;
            height: auto;
            margin-right: 12vw * @w;
          }
        }

        .command-table-right-list {
          > div {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0 20vw * @w;
            height: 60vh * @h;

            > input {
              margin-left: 10vw * @w;
              margin-right: 18vw * @w;
            }

            > span {
              flex: 2;
              font-size: 12vh * @h;

              &:nth-child(4) {
                flex: 4;
              }
            }

            &:nth-child(2n) {
              background-color: #0e3058;
            }
          }
        }
      }

      .title {
        color: #fff;
        font-size: 20vh * @h;
        line-height: 20vh * @h;
        margin-top: 20vh * @h;
        margin-bottom: 20vh * @h;
      }

      // > button {
      //   background-color: #169bd5;
      //   border: none;
      //   margin-right: 10vh * @h;
      // }

      .checkedAll {
        width: 80vw * @w;
        // height: 30vh * @h;
        position: absolute;
        // line-height: 30vh * @h;
        top: 18vh * @h;
        right: 35vw * @w;
        font-size: 20vh * @h;
        background-color: #169bd5;
        padding: 2vh * @h 0;
        border: none;
      }
      /deep/.ant-pagination {
        text-align: right;
      }

      .icon {
        margin: 0 10vw * @w;
        color: #00ffff;
        cursor: pointer;
      }

      .checked {
        width: 20vh * @h;
        height: 20vh * @h;
        border: 1px solid #4890e7;
      }
      .right-data {
        height: 540vh * @h;

        /deep/.list-body {
          max-height: 86% !important;
        }
      }

      .no-datatips {
        color: #fff;
        font-size: 22vh * @h;
      }
    }
  }

  .clist-table {
    color: #fff;
    margin-top: 10vh * @h;
    padding: 10vh * @h 15vw * @w;
    .clist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .vedio {
        width: 138vw * @w;
        height: 35vh * @h;
        line-height: 35vh * @h;
        text-align: center;
        font-size: 20vh * @h;
        border-radius: 5vh * @h;
        background-color: #169bd5;
        padding: 0 4vw * @w;
      }
    }

    .type-switch {
      color: #fff;
      display: flex;
      align-items: center;

      > div {
        height: 50vh * @h;
        display: flex;
        align-items: center;
        background-color: #1d4948;
        padding: 0 14vw * @w;
        margin-right: 20vh * @h;

        img {
          width: 40vw * @w;
          height: auto;
          margin-right: 10vh * @h;
        }

        span {
          font-size: 22vh * @h;
        }
      }

      > ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 120vw * @w;
          height: 35vh * @h;
          line-height: 35vh * @h;
          text-align: center;
          font-size: 14vh * @h;
          padding: 0 10vw * @w;
          margin-right: 10vw * @w;
          background-color: #0b495a;
          border: 2px solid #0066cc;
        }

        li.active {
          background-color: #0066cc;
        }
      }
    }

    .search-header {
      display: flex;
      justify-content: space-between;

      .checkedAll {
        background-color: #169bd5;
      }
    }

    .danger-header {
      align-items: center;
      .all-checked {
        margin-top: 0 !important;
        margin-right: 50vw * @w;
      }
    }

    .conditions-search {
      display: flex;
      align-items: center;
      margin: 15vh * @h 0 20vh * @h;

      > span {
        font-size: 18vh * @h;
      }

      > input {
        width: 200vw * @w;
        height: 35vh * @h;
        line-height: 30vh * @h;
        background-color: #333333;
        color: #fff;
        padding-left: 20vw * @w;
        border: none;
        margin-right: 30vw * @w;
        font-size: 16vh * @h;

        &::placeholder {
          color: #eee;
        }
      }

      > button {
        background-color: #169bd5;
        border: none;
        margin-right: 10vh * @h;
        padding: 0;
      }
    }

    .clist-table-list-title {
      display: flex;
      max-height: 600vh * @h;
      // overflow: hidden;
      // overflow-y: auto;
      justify-content: space-between;

      > div {
        width: 24.5%;

        > p {
          font-size: 16vh * @h;
          text-align: center;
          color: #ffff99;
          font-weight: 600;
        }
      }
    }

    .clist-table-list {
      // display: flex;
      max-height: 600vh * @h;
      justify-content: space-between;
      .icon {
        color: #00ccff;
        margin-left: 6vh * @h;
      }
      .wrap-center {
        display: block;
      }

      /deep/.list-body li div {
        flex-direction: column;
      }

      .checked {
        width: 20vh * @h;
        height: 20vh * @h;
        border: 1px solid #4890e7;
      }

      .list-table {
        // width: 24.5%;
        height: 500vh * @h;
        overflow: hidden;

        > p {
          font-size: 16vh * @h;
          text-align: center;
          color: #ffff99;
          font-weight: 600;
        }
      }

      .list-pagination {
        // display: flex;
        margin-top: 20vh * @h;
        text-align: right;
      }
    }

    .clist-table-list2 {
      // display: flex;
      max-height: 600vh * @h;
      justify-content: space-between;

      .icon {
        color: #00ccff;
        margin-left: 4vh * @h;
      }

      /deep/.list-body li div {
        flex-direction: column;
      }

      .checked {
        width: 20vh * @h;
        height: 20vh * @h;
        border: 1px solid #4890e7;
      }

      .wrap-center {
        display: block;
      }

      .list-table {
        width: 100%;
        height: 500vh * @h;
        overflow: hidden;

        > p {
          font-size: 16vh * @h;
          text-align: center;
          color: #ffff99;
          font-weight: 600;
        }
      }
      .list-pagination {
        // display: flex;
        margin-top: 20vh * @h;
        text-align: right;
      }
    }
  }
}

.command-table2 {
  width: 2500vw * @w;
}

.mouse-click {
  cursor: pointer;
}
.box-sizing() {
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.btn {
  background-color: #169bd5;
  font-size: 18vh * @h;
  height: 35vh * @h;
  // line-height: 35vh * @h;
  padding: 4vh * @h 8vh * @h !important;
  .box-sizing();
  border: none;
  margin-right: 10vh * @h;
  border-radius: 6vh * @h;
}

.all-checked {
  margin-right: 50vw * @w;
  margin-top: 40vh * @h;
}
</style>
