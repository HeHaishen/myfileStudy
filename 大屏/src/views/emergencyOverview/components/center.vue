<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-10 16:20:17
-->
<template>
  <div class="emergency-overview-center">
    <div class="overview-center-left">
      <div id="crystalContainer">
        <div
          id="envCenterInfo"
          class="status-bar"
          style="left: 0px; right: 0px; bottom: 0px"
        >
          <div id="camera_alt">视点高：NaN米</div>
          <div id="env_alt">海拔：NaN米</div>
          <div id="env_lat">纬度：NaN</div>
          <div id="env_lon">经度：NaN</div>
        </div>
      </div>
    </div>
    <div class="overview-center-right">
      <div class="model-title">风险隐患总览</div>
      <div class="risk-see">
        <ul>
          <!-- 修改了小手 无数据时先不弹窗  i.name -->
          <li
            v-for="(i, k) in riskList"
            :key="k"
            @click="latentRisk(i, k)"
            :class="{
              'point-and-click':
                i.name === '安全生产风险隐患' || i.name === '自然灾害风险隐患',
            }"
          >
            <div>{{ i.name }}</div>
            <div>{{ i.num }}</div>
            <div class="border-style" v-if="(k + 1) % 3 !== 0"></div>
          </li>
        </ul>
      </div>
      <div class="model-title">一屏盯全城</div>
      <div class="see-city">
        <ul>
          <!-- 修改小手 无数据先不弹窗 删除了 i.name-->
          <li
            v-for="(i, k) in seeCityList"
            :key="k"
            @click="latentRisk(i, k)"
            :class="{
              'point-and-click':
                i.name === '监控视频' || i.name === '移动指挥车辆',
              'li-line': k === 6,
            }"
          >
            <div>
              <p><img :src="i.img" alt="" /></p>
              <p>{{ i.name }}</p>
              <p>{{ i.number }}</p>
              <p>{{ i.unit }}</p>
              <p v-if="i.number2">{{ i.number2 }}</p>
              <p v-if="i.number2">{{ i.unit2 }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="overview-center-position">
      <p
        @click="videoTreeClick($event, k)"
        v-for="(i, k) in positionBtnList"
        :key="k"
        :style="{ 'background-image': i.img }"
      ></p>
    </div>
    <div
      id="videoZM"
      style="
        position: absolute;
        background: rgba(10, 67, 123, 0.5);
        width: 300px;
        height: 620px;
        bottom: 150px;
        border-radius: 10px;
        font-size: 26px;
        color: white;
        border: 2px solid #00ffff;
        box-shadow: 0 0 0.92592593vh #00eaff inset;
        -o-box-shadow: 0 0 0.92592593vh #00eaff inset;
        -ms-box-shadow: 0 0 0.92592593vh #00eaff inset;
        -moz-box-shadow: 0 0 0.92592593vh #00eaff inset;
        display: none;
      "
    >
      <p
        @click="switchCameraInfo(i)"
        v-for="(i, k) in videoZMList"
        :key="k"
        :style="{ cursor: 'pointer', padding: '8px', 'margin-bottom': 0 }"
      >
        {{ i }}
      </p>
    </div>

    <pop-up-layer
      title="安全生产风险隐患"
      :show="popShow"
      :setStyles="{ left: '61.5%', top: '63%' }"
      class="popTable"
      @doClose="popShow = false"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="natural-hazard">
          <ul>
            <li
              :class="{ 'active-li': dangerCompanyActive === item.key }"
              v-for="item in dangerCompanyList"
              :key="item.key"
              @click="onDangerCompany(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- <div class="search-icon">
          <input type="text" />
          <div class="icon-container">
            <img :src="iconSearch" alt="" class="img" />
          </div>
        </div> -->
        <!-- <div class="risk-classify" v-show="Industrysel.status">
          <span>{{ Industrysel.name }}行业分类：</span>
          <select v-model="riskClassify">
            <option :value="i.key" v-for="i in riskClassifyList" :key="i.key">
              {{ i.name }}
            </option>
          </select>
        </div> -->
        <div class="clist-table">
          <clist
            :columns="tableHeaderList"
            :listData="tabelListData"
            @tableTdClick="riskAssessment"
          >
            <template slot="index" slot-scope="{ record, text, index }">
              {{ index + 1 }}
            </template>
            <template slot="fxdj" slot-scope="{ record }">
              <button class="resource-btn" v-if="record.fxdj">
                {{ record.fxdj.substring(0, 2) }}
              </button>
            </template>
          </clist>
        </div>
      </template>
    </pop-up-layer>

    <pop-up-layer
      :title="riskTitle"
      :show="riskShow"
      :setStyles="{ left: '49%', top: '50%' }"
      class="popTable"
      @doClose="riskShow = false"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="corporate-info">
          <ul>
            <li>
              <span>企业注册地址:</span>
              <span>广州市黄埔区文冲街道石化路振兴街18号</span>
            </li>
            <li>
              <span>生产经营地址:</span>
              <span
                >黄埔区穗东街道隔墙路牛栏园1号，黄埔区文冲街道广州石化厂内</span
              >
            </li>
            <li>
              <span>主要负责人:</span>
              <span>杨坤林</span>
            </li>
            <li>
              <span>负责人联系电话:</span>
              <span>13800138000</span>
            </li>
            <li>
              <span>企业状态:</span>
              <span>正常</span>
            </li>
            <li>
              <span>风险评估级别信息:</span>
              <span>橙色</span>
            </li>
            <li>
              <span>企业分类与属性:</span>
              <span
                >【带储存设施经营】【重大危险源企业】 【石油库】
                【安全公告企业】 【重点监管危险化学品】 【石油化工企业】
                【罐区企业】 【危险化学品管道】</span
              >
            </li>
          </ul>
        </div>
        <div class="corporate-dangerous">
          <div @click="dangerousType = 0">
            危险物品实时保有量<span>7种 </span> 存量总数 <span>-32吨</span>
          </div>
          <div @click="dangerousType = 1">实时监控<span>13台</span></div>
        </div>
        <div v-show="dangerousType === 0">
          <div class="corporate-dangerous">
            <span>危险物品动态</span>
          </div>
          <div class="clist-table corporate-dangerous-list">
            <clist :columns="tableHeaderList2" :listData="tabelListData2">
              <template slot="status" slot-scope="{ record }">
                <span
                  :style="{
                    color: record.status === '超出范围' ? '#c11c47' : '',
                  }"
                  >{{ record.status }}</span
                >
              </template>
            </clist>
          </div>
        </div>
        <div v-show="dangerousType === 1">
          <div class="corporate-dangerous">
            <span>实时监控</span>
          </div>
          <div class="natural-hazard">
            <ul>
              <li
                :class="{ 'active-li': realMonitoringActive === item.key }"
                v-for="item in realMonitoring"
                :key="item.key"
                @click="onRealMonitoring(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="clist-table corporate-dangerous-list">
            <clist
              :columns="tableHeaderList2"
              :listData="tabelListData2"
              v-show="realMonitoringActive !== 2"
            >
              <template slot="status" slot-scope="{ record }">
                <span
                  :style="{
                    color: record.status === '超出范围' ? '#c11c47' : '',
                  }"
                  >{{ record.status }}</span
                >
              </template>
            </clist>
            <div class="video-surveillance" v-show="realMonitoringActive === 2">
              <div
                @click="
                  surveillanceVideoIndex =
                    surveillanceVideoIndex > 0
                      ? surveillanceVideoIndex - 1
                      : surveillanceVideoIndex
                "
                :class="{ Activeright: surveillanceVideoIndex === 0 }"
              ></div>
              <div>
                <div class="">
                  <video
                    :src="surveillanceVideoList[surveillanceVideoIndex].url"
                    controls
                    muted
                    style="height: 100%; width: 100%"
                  ></video>
                  <span
                    >{{ surveillanceVideoIndex + 1 }}/{{
                      surveillanceVideoList.length
                    }}</span
                  >
                </div>
              </div>
              <div
                @click="
                  surveillanceVideoIndex =
                    surveillanceVideoIndex < surveillanceVideoList.length - 1
                      ? surveillanceVideoIndex + 1
                      : surveillanceVideoIndex
                "
                :class="{
                  Activeleft:
                    surveillanceVideoIndex === surveillanceVideoList.length - 1,
                }"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>

    <pop-up-layer
      title="自然灾害风险隐患"
      :show="naturalPopShow"
      :setStyles="{ left: '61.5%', top: '63%' }"
      class="popTable"
      @doClose="naturalPopShow = false"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="search-icon">
          <input type="text" />
          <div class="icon-container">
            <img :src="iconSearch" alt="" class="img" />
          </div>
        </div>
        <!-- <div class="risk-classify">
          <span>风险隐患类型：</span>
          <select v-model="hiddenDanger">
            <option :value=i.key v-for="i in hiddenDangerList" :key=i.key>{{i.name}}</option>
          </select>
        </div> -->
        <div class="clist-table">
          <clist :columns="tableHeaderList4" :listData="tabelListData2">
          </clist>
        </div>
      </template>
    </pop-up-layer>

    <!-- 移动指挥车辆 -->
    <tempPop
      :title="mobile.title"
      :show="mobile.show"
      :setStyles="{ left: '54%', top: '62%' }"
      class="popTable"
      @doClose="mobileClose"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="search">
          <div></div>
          <div class="water_search">
            <a-input-search
              placeholder="输入关键字"
              v-model="mobile.input"
              @search="mobileInput"
            />
          </div>
        </div>
        <!-- <div class="search-icon">
          <input type="text" v-model="mobile.input" />
          <div class="icon-container" @click="mobileInput">
            <img :src="iconSearch" alt="" class="img" />
          </div>
        </div> -->
        <div class="clist-table">
          <clist
            :columns="mobile.columnList"
            :listData="mobile.dataList"
            @tableTdClick="tableCommand"
          >
            <template slot="dh" slot-scope="{ record, text }">
              <div>
                {{ text }}
                <a-icon
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
          </clist>
        </div>
        <div class="list-change-page">
          <ChangePage
            :total="mobile.total"
            :currentPage="mobile.currentPage"
            @changePages="clickMobileChangePages"
          />
        </div>
      </template>
    </tempPop>

    <!-- 社会动员指挥车辆 -->
    <tempPop
      :title="social.title"
      :show="social.show"
      :setStyles="{ left: '62%', top: '68%' }"
      class="popTable"
      @doClose="socialClose"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="search">
          <div></div>
          <div class="water_search">
            <a-input-search
              placeholder="输入关键字"
              v-model="social.input"
              @search="socialInput"
            />
          </div>
        </div>
        <!-- <div class="search-icon">
          <input type="text" v-model="social.input" />
          <div class="icon-container" @click="socialInput">
            <img :src="iconSearch" alt="" class="img" />
          </div>
        </div> -->
        <div class="clist-table">
          <clist
            :columns="social.columnList"
            :listData="social.dataList"
            @tableTdClick="tableCommand"
          >
            <template slot="dh" slot-scope="{ record, text }">
              <div>
                {{ text }}
                <a-icon
                  type="phone"
                  class="icon"
                  @click="clickSocialMobilePhone(record, $event)"
                  v-show="text"
                />
                <a-icon
                  type="mail"
                  class="icon"
                  @click="clickSocialMessage(record, $event)"
                  v-show="text"
                />
              </div>
            </template>
          </clist>
        </div>
        <div class="list-change-page">
          <ChangePage
            :total="social.total"
            :currentPage="social.currentPage"
            @changePages="clickSocialChangePages"
          />
        </div>
      </template>
    </tempPop>

    <!-- 监控视频 -->
    <tempPop
      :title="monitor.title"
      :show="monitor.show"
      :setStyles="{ left: '61.5%', top: '63%' }"
      class="popTable"
      @doClose="monitorClose"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="search">
          <div></div>
          <div class="water_search">
            <a-input-search
              placeholder="输入关键字"
              v-model="monitor.input"
              @search="monitorInput"
            />
          </div>
        </div>
        <!-- <div class="search-icon">
          <input type="text" v-model="monitor.input" />
          <div class="icon-container" @click="monitorInput">
            <img :src="iconSearch" alt="" class="img" />
          </div>
        </div> -->
        <div class="clist-table">
          <clist :columns="monitor.columnList" :listData="monitor.dataList">
            <template slot="position" slot-scope="{ record, text }">
              <div class="border" @click="clickVideo(record)">定位</div>
            </template>
            <template slot="deviceId" slot-scope="{ record, text }">
              <div>{{ resources(text) }}</div>
            </template>
          </clist>
        </div>
        <div class="list-change-page">
          <ChangePage
            :total="monitor.total"
            :currentPage="monitor.currentPage"
            @changePages="clickMonitorChangePages"
          />
        </div>
      </template>
    </tempPop>

    <pop-up-layer
      :title="carTitle"
      :show="carShow"
      :setStyles="{ left: '49%', top: '50%' }"
      class="popTable"
      @doClose="carShow = false"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="img-car">
          <img :src="carUrl" alt="" />
        </div>
      </template>
    </pop-up-layer>
    <div class="left-fixed">
      <FixedModel />
    </div>

    <VideoTree ref="VideoTree"></VideoTree>

    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import {
  getAllCityInfo,
  getIndicator,
  commonApi,
  getRiskPreview,
} from "@/api/emergencyOverview";
import FixedModel from "@/components/APicture/FixedModel"; // 防洪防涝点等
import Clist from "@/components/APicture/c-table";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import ChangePage from "@/components/APicture/changePage";
import VideoTree from "@/components/APicture/videoTree/index.vue";
export default {
  components: {
    Clist,
    ContactPhone,
    MessageSend,
    ChangePage,
    tempPop,
    VideoTree,
    FixedModel,
  },
  data() {
    return {
      // 移动指挥车辆
      mobile: {
        input: "",
        total: 0,
        currentPage: 1,
        title: "移动指挥车辆",
        show: false,
        columnList: [
          { title: "序号", index: 0, textIndex: "rownum", width: "10%" },
          { title: "联系电话", index: 3, textIndex: "dh", width: "40%" },
          { title: "联系人", index: 2, textIndex: "lxr", width: "15%" },
          { title: "所属单位", index: 1, textIndex: "qy", width: "35%" },
        ],
        dataList: [],
      },

      // 社会动员指挥车辆
      social: {
        input: "",
        total: 0,
        currentPage: 1,
        title: "社会动员指挥车辆",
        show: false,
        columnList: [
          { title: "序号", index: 0, textIndex: "rownum", width: "10%" },
          { title: "联系电话", index: 3, textIndex: "dh", width: "40%" },
          { title: "联系人", index: 2, textIndex: "lxr", width: "15%" },
          { title: "所属单位", index: 1, textIndex: "qy", width: "35%" },
        ],
        dataList: [],
      },

      // 监控视频
      monitor: {
        input: "",
        total: 0,
        currentPage: 1,
        title: "监控视频",
        show: false,
        columnList: [
          { title: "名称", index: 0, textIndex: "name", width: "40%" },
          { title: "来源", index: 3, textIndex: "deviceId", width: "40%" },
          { title: "定位", index: 2, textIndex: "position", width: "20%" },
        ],
        dataList: [],
      },

      iconSearch: require("../../../assets/images/dragonBoatNormal/u43.svg"),

      positionBtnList: [
        {
          img: `url('${require("../../../assets/images/emergencyOverview/bg_btn_center1.png")}')`,
        },
        {
          img: `url('${require("../../../assets/images/emergencyOverview/bg_btn_center2.png")}')`,
        },
      ],
      videoZMList: [],
      videoClickFlag: 0,
      videoInfoClickFlag: new Array(),
      defaultParams: {
        body: {},
        page: 1,
        pageSize: 20,
        sortName: "sid",
        sortOrder: "desc",
      },
      riskList: [
        { name: "风险隐患总数", num: "266" },
        { name: "安全生产风险隐患", num: "86" },
        { name: "公共卫生风险隐患", num: "10" },
        { name: "自然灾害风险隐患", num: "120" },
        { name: "社会安全风险隐患", num: "50" },
      ],
      seeCityList: [
        {
          name: "监控视频",
          number: "6431",
          img: require("../../../assets/images/emergencyOverview/icon_video.png"),
          unit: "万路",
        },
        {
          name: "社会动员指挥车",
          number: "64",
          img: require("../../../assets/images/emergencyOverview/icon_car_yellow.png"),
          unit: "辆",
        },
        {
          name: "移动指挥车辆",
          number: "643",
          img: require("../../../assets/images/emergencyOverview/icon_car_move.png"),
          unit: "辆",
        },
        {
          name: "单兵通讯",
          number: "63",
          img: require("../../../assets/images/emergencyOverview/icon_contact.png"),
          unit: "台",
        },

        {
          name: "无线对讲",
          number: "431",
          img: require("../../../assets/images/emergencyOverview/icon_modelPhone.png"),
          unit: "台",
        },
        {
          name: "无人机",
          number: "31",
          img: require("../../../assets/images/emergencyOverview/icon_vua.png"),
          unit: "架",
        },
        {
          name: "特殊情况通讯保障",
          img: require("../../../assets/images/emergencyOverview/icon_phone.png"),
          number: "38",
          unit: "类",
          number2: "38",
          unit2: "台",
        },
      ],
      data: {
        body: {
          lxr: "",
          name: "",
          type: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "index", width: "15%" },
        { title: "企业名称", index: 1, textIndex: "jtmc", width: "45%" },
        { title: "危化品行业", index: 2, textIndex: "fxdhy", width: "20%" },
        {
          title: "风险评估级别信息",
          index: 3,
          textIndex: "fxdj",
          width: "20%",
        },
      ],
      tabelListData: [
        {
          time: "1",
          content: "企业器温度达到55c1",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
        {
          time: "1",
          content: "企业器温度达到55c2",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
        {
          time: "1",
          content: "企业器温度达到55c3",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
        {
          time: "1",
          content: "企业器温度达到55c4",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
        {
          time: "1",
          content: "企业器温度达到55c5",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
        {
          time: "1",
          content: "企业器温度达到55c6",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
        {
          time: "1",
          content: "企业器温度达到55c7",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
        {
          time: "1",
          content: "企业器温度达到55c8",
          level: 1,
          resource: "蓝色",
          index: 1,
        },
      ],
      tableHeaderList2: [
        { title: "序号", index: 0, textIndex: "index", width: "10%" },
        { title: "品名", index: 1, textIndex: "name", width: "20%" },
        { title: "场所", index: 2, textIndex: "site", width: "40%" },
        { title: "进（吨）", index: 3, textIndex: "receive", width: "10%" },
        { title: "存量（吨）", index: 3, textIndex: "stock", width: "10%" },
        { title: "出（吨）", index: 3, textIndex: "leave", width: "10%" },
        { title: "状态", index: 3, textIndex: "status", width: "20%" },
      ],
      tabelListData2: [
        {
          index: "1",
          name: "柴油",
          site: "富悦广场A1栋201房",
          receive: 1,
          stock: 20,
          leave: 10,
          status: "超出范围",
        },
        {
          index: "2",
          name: "柴油",
          site: "A1栋201房",
          receive: 1,
          stock: 20,
          leave: 10,
          status: "超出范围",
        },
        {
          index: "3",
          name: "柴油",
          site: "A1栋201房",
          receive: 1,
          stock: 20,
          leave: 10,
          status: "超出范围",
        },
        {
          index: "4",
          name: "液化气体",
          site: "A1栋201房",
          receive: 1,
          stock: 20,
          leave: 10,
          status: "超出范围",
        },
        {
          index: "5",
          name: "柴油",
          site: "富悦广场A1栋201房",
          receive: 1,
          stock: 20,
          leave: 10,
          status: "正常",
        },
      ],
      tableHeaderList3: [
        { title: "序号", index: 0, textIndex: "index", width: "15%" },
        { title: "企业名称", index: 1, textIndex: "content", width: "45%" },
        { title: "危化品行业", index: 2, textIndex: "level", width: "20%" },
        {
          title: "风险评估级别信息",
          index: 3,
          textIndex: "resource",
          width: "20%",
        },
      ],
      dangerCompanyActive: 0,
      dangerCompanyList: [
        { name: "全部", key: 0 },
        { name: "重大危险源企业", key: 1 },
        { name: "重大隐患企业", key: 2 },
      ],
      // 选中风险隐患类型
      hiddenDanger: "森林消防",
      // 风险隐患类型
      hiddenDangerList: [
        { name: "森林消防", key: 0 },
        { name: "地址隐患", key: 1 },
        { name: "历史地震灾害点", key: 2 },
        { name: "三防主要风险点", key: 3 },
      ],
      tableHeaderList4: [
        { title: "序号", index: 0, textIndex: "index", width: "10%" },
        { title: "属地", index: 1, textIndex: "name", width: "10%" },
        {
          title: "积水、内涝点名称",
          index: 2,
          textIndex: "stock",
          width: "20%",
        },
        {
          title: "积水、内涝等级",
          index: 3,
          textIndex: "receive",
          width: "20%",
        },
        { title: "治理进展情况", index: 3, textIndex: "site", width: "40%" },
      ],
      tableHeaderList5: [
        { title: "序号", index: 0, textIndex: "index", width: "10%" },
        { title: "所属单位", index: 1, textIndex: "name", width: "35%" },
        { title: "联系人", index: 2, textIndex: "stock", width: "20%" },
        { title: "联系电话", index: 3, textIndex: "receive", width: "35%" },
      ],
      carTitle: "移动指挥车",
      carUrl: "",
      carShow: false,
      tableHeaderList6: [
        { title: "序号", index: 0, textIndex: "index", width: "8%" },
        { title: "所属部门", index: 1, textIndex: "name", width: "20%" },
        { title: "车型", index: 2, textIndex: "stock", width: "20%" },
        { title: "车牌", index: 3, textIndex: "receive", width: "20%" },
        { title: "联系人", index: 3, textIndex: "receive", width: "15%" },
        { title: "电话", index: 3, textIndex: "receive", width: "20%" },
      ],
      realMonitoringActive: 0,
      realMonitoring: [
        { name: "储罐监测", key: 0 },
        { name: "气体监测", key: 1 },
        { name: "视频监测", key: 2 },
      ],

      popShow: false, // 安全生产风险隐患弹窗
      riskShow: false, // 安全生产风险隐患企业信息弹窗
      riskTitle: "", // 安全生产风险隐患企业信息弹窗标题
      naturalPopShow: false, // 自然灾害风险隐患弹窗
      commandPopShow: false, // 移动指挥车弹窗
      dangerousType: 0, // 实                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         时监控
      // 是否显示行业分类下拉框
      Industrysel: {
        status: false,
        name: "",
      },
      // 选中行业分类
      riskClassify: "全部",
      // 行业分类下拉数据
      riskClassifyList: [
        { name: "全部", key: 0 },
        { name: "有色金属", key: 1 },
        { name: "烟草", key: 2 },
        { name: "纺织", key: 3 },
        { name: "金属治炼", key: 4 },
      ],
      // 监控视频当前下标
      surveillanceVideoIndex: 0,
      // 监控视频
      surveillanceVideoList: [
        { url: require("../../../assets/media/video.mp4"), key: 1 },
        { url: require("../../../assets/media/video1.mp4"), key: 2 },
        { url: require("../../../assets/media/scan.mp4"), key: 3 },
        { url: require("../../../assets/media/scan2.mp4"), key: 4 },
      ],
    };
  },
  watch: {
    dangerousType(newVal, oldVal) {
      if (newVal === 1) {
        this.tableHeaderList2 = [
          { title: "序号", index: 0, textIndex: "index", width: "10%" },
          { title: "设备名称", index: 1, textIndex: "name", width: "15%" },
          { title: "储罐名称", index: 2, textIndex: "site", width: "15%" },
          { title: "储罐编号", index: 3, textIndex: "receive", width: "10%" },
          { title: "监测类型", index: 3, textIndex: "stock", width: "10%" },
          { title: "监测数值", index: 3, textIndex: "leave", width: "10%" },
          { title: "数值单位", index: 3, textIndex: "status", width: "10%" },
          { title: "检测时间", index: 3, textIndex: "status", width: "20%" },
        ];
      } else {
        this.tableHeaderList2 = [
          { title: "序号", index: 0, textIndex: "index", width: "10%" },
          { title: "品名", index: 1, textIndex: "name", width: "20%" },
          { title: "场所", index: 2, textIndex: "site", width: "40%" },
          { title: "进（吨）", index: 3, textIndex: "receive", width: "10%" },
          { title: "存量（吨）", index: 3, textIndex: "stock", width: "10%" },
          { title: "出（吨）", index: 3, textIndex: "leave", width: "10%" },
          { title: "状态", index: 3, textIndex: "status", width: "20%" },
        ];
      }
    },
    realMonitoringActive(newVal, oldVal) {
      if (newVal === 0) {
        this.tableHeaderList2 = [
          { title: "序号", index: 0, textIndex: "index", width: "10%" },
          { title: "设备名称", index: 1, textIndex: "name", width: "15%" },
          { title: "储罐名称", index: 2, textIndex: "site", width: "15%" },
          { title: "储罐编号", index: 3, textIndex: "receive", width: "10%" },
          { title: "监测类型", index: 3, textIndex: "stock", width: "10%" },
          { title: "监测数值", index: 3, textIndex: "leave", width: "10%" },
          { title: "数值单位", index: 3, textIndex: "status", width: "10%" },
          { title: "检测时间", index: 3, textIndex: "status", width: "20%" },
        ];
      } else if (newVal === 1) {
        this.tableHeaderList2 = [
          { title: "序号", index: 0, textIndex: "index", width: "10%" },
          { title: "设备名称", index: 1, textIndex: "name", width: "20%" },
          { title: "气体名称", index: 2, textIndex: "site", width: "20%" },
          { title: "监测类型", index: 3, textIndex: "stock", width: "10%" },
          { title: "监测数值", index: 3, textIndex: "leave", width: "10%" },
          { title: "数值单位", index: 3, textIndex: "status", width: "10%" },
          { title: "检测时间", index: 3, textIndex: "status", width: "20%" },
        ];
      } else if (newVal === 2) {
        //视频
      }
    },
  },
  created() {
    // 获取一屏订全城监控视频数
    this.getVideoZM();
    // this.getVideoScanNum();
    // 获取风险隐患总览
    this.getRiskList();
    // 获取一屏盯全城
    this.getSeeCityList();
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
    this.init();
  },
  methods: {
    // 点击出现视频树
    videoTreeClick($event, index) {
      if (index == 0) {
        console.log($event.offsetLeft);
        this.$refs.VideoTree.$emit("show", { saveEvent: $event });
      }
    },

    // 区分监控视频来源
    resources(item) {
      if (item == "44010000082006000055") {
        return "城管云";
      } else if (item == "44010000032006000056") {
        return "危化处";
      }
    },
    clickVideo(record) {
      pGzznCore.videoSearchLocation(record); //地图定位
    },
    // 打电话
    clickMobilePhone(record, e) {
      let { lxr, dh } = record;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: lxr,
        phone: dh,
      });
    },

    // 发短信
    clickMessage(record, e) {
      let { lxr, dh } = record;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: lxr,
        phone: dh,
      });
    },

    clickSocialMobilePhone(record, e) {
      let { lxr, dh } = record;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: lxr,
        phone: dh,
      });
    },
    clickSocialMessage(record, e) {
      let { lxr, dh } = record;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: lxr,
        phone: dh,
      });
    },
    // 获取监控视频
    getMonitorVedioData() {
      getIndicator("LQcgZPIU", this.data).then((res) => {
        if (res.success) {
          console.log("获取监控视频", res);
          this.monitor.dataList = res.body.data;
          this.monitor.total = parseInt(res.body.total);
        }
      });
    },

    monitorInput() {
      this.monitor.currentPage = 1;
      this.data.page = 1;
      console.log("input", this.monitor.input);
      this.data.body.name = this.monitor.input;
      this.getMonitorVedioData();
    },

    monitorClose() {
      this.monitor.show = false;
      this.data.body.name = "";
      this.monitor.input = "";
      this.monitor.currentPage = 1;
      this.data.page = 1;
    },

    clickMonitorChangePages(pages, pageSize) {
      this.monitor.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.data.page = pages.pages;
      this.getMonitorVedioData();
    },

    mobileClose() {
      this.mobile.show = false;
      this.data.body.lxr = "";
      this.mobile.input = "";
      this.mobile.currentPage = 1;
      this.data.page = 1;
    },

    socialClose() {
      this.social.show = false;
      this.data.body.lxr = "";
      this.social.input = "";
      this.social.currentPage = 1;
      this.data.page = 1;
    },
    mobileInput() {
      this.mobile.currentPage = 1;
      this.data.page = 1;
      console.log("input", this.mobile.input);
      this.data.body.lxr = this.mobile.input;
      this.getMobileCommandData();
    },

    socialInput() {
      this.social.currentPage = 1;
      this.data.page = 1;
      console.log("input", this.social.input);
      this.data.body.lxr = this.social.input;
      this.getSocialCommandData();
    },
    
    // 获取移动指挥车辆
    getMobileCommandData() {
      this.data.body.type = "2";
      getIndicator("zqtTzawR", this.data).then((res) => {
        if (res.success) {
          console.log("获取应急指挥车辆", res);
          this.mobile.dataList = res.body.data;
          this.mobile.total = parseInt(res.body.total);
        }
      });
    },

    // 获取社会动员指挥车辆
    getSocialCommandData() {
      this.data.body.type = "1";
      getIndicator("zqtTzawR", this.data).then((res) => {
        if (res.success) {
          console.log("获取社会动员指挥车辆", res);
          this.social.dataList = res.body.data;
          this.social.total = parseInt(res.body.total);
        }
      });
    },

    clickMobileChangePages(pages, pageSize) {
      this.mobile.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.data.page = pages.pages;
      this.getMobileCommandData();
    },

    clickSocialChangePages(pages, pageSize) {
      this.social.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.data.page = pages.pages;
      this.getSocialCommandData();
    },

    tableCommand() {
      if (this.carTitle === "社会动员指挥车") {
        this.carShow = true;
        this.carUrl = require("../../../assets/images/constructionAchievements/bg_data.png");
      }
    },
    close() {
      this.show = false;
    },
    init() {
      let center = $(".center").width();
	  let centerH = $(".center").height();
      let left = $(".overview-center-left").width();
	  let leftH = $(".overview-center-left").height();
      let right = $(".overview-center-right").width();
      //获取风险隐患总览
      this.RiskPreview();
      mapOffsetPixel = Math.round((center - left - right) / 2);
	  mapOffsetYPixel = Math.round((centerH - leftH) / 2);	
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(10);
    },
    initChart() {},
    switchCamera(k) {
      if (k == 0) {
        if (this.videoClickFlag % 2 == 0) {
          document.getElementById("videoZM").style.display = "";
        } else {
          document.getElementById("videoZM").style.display = "none";
        }
        this.videoClickFlag++;
      }
    },
    switchCameraInfo(k) {
      if (k == "危化") {
        pGzznCore.dangerousImageProvider();
      } else if (k == "城管云") {
        pGzznCore.urbanDangerousImageProvider();
      } else {
        if (this.videoInfoClickFlag[k] == undefined) {
          this.videoInfoClickFlag[k] = 0;
        }
        if (this.videoInfoClickFlag[k] % 2 == 0) {
          pGzznCore.urbanDangerousZMProvider(k);
        } else {
          pGzznCore.urbanDangerousRemoveProvider(k);
        }
        this.videoInfoClickFlag[k] = this.videoInfoClickFlag[k] + 1;
      }
    },
    // 获取监控视频数
    getVideoScanNum() {
      getAllCityInfo().then((res) => {
        if (res.success) {
          let bodyList = res.body;
          if (res.body && res.body.length) {
            this.seeCityList.map((i, k) => {
              let finds = null;
              finds = bodyList.find((item, keys) => {
                if (item.name === i.name) {
                  return item;
                }
              });
              if (finds) {
                i.number = finds.number;
              }
            });
          }
        }
      });
    },

    // 获取风险隐患总览
    getRiskList() {
      getIndicator("QL4yrqVg", this.data).then((res) => {
        if (res.success) {
          this.riskList = res.body.data;
        }
      });
    },

    //获取风险隐患总览弹窗数据
    RiskPreview() {
      getRiskPreview(this.data).then((res) => {
        if (res.success) {
          if (res.body.data != null && res.body.data.length > 0) {
            this.tabelListData = JSON.parse(JSON.stringify(res.body.data));
            console.log(this.tabelListData, "333333");
          }
        }
      });
    },

    // 获取一屏盯全城
    getSeeCityList() {
      getIndicator("lmYH8Hz6", this.data).then((res) => {
        if (res.success) {
          let bodyList = res.body.data;
          if (res.body.data && res.body.data.length) {
            this.seeCityList.map((i, k) => {
              let finds = null;
              finds = bodyList.find((item, keys) => {
                if (item.name === i.name && item.unit === i.unit) {
                  return item;
                }
              });
              if (finds) {
                i.number = finds.num;
              }
            });
            this.seeCityList[this.seeCityList.length - 1].number2 =
              bodyList[bodyList.length - 1].num;
          }
        }
      });
    },
    // 获取安全生产风险隐患表格数据
    getSafetyProduction() {
      getIndicator("lmYH8Hz6", this.data).then((res) => {
        if (res.success) {
        }
      });
    },
    // 获取自然灾害风险隐患表格数据
    getRisksNaturalDisasters() {
      getIndicator("lmYH8Hz6", this.data).then((res) => {
        if (res.success) {
        }
      });
    },
    // 获取社会动员指挥车表格数据
    getSocialMobilizationCommandVehicle() {
      getIndicator("lmYH8Hz6", this.data).then((res) => {
        if (res.success) {
        }
      });
    },
    // 获取移动指挥车辆表格数据
    getMobileCommandVehicle() {
      getIndicator("lmYH8Hz6", this.data).then((res) => {
        if (res.success) {
        }
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
    // 获取弹窗表格数据
    latentRisk(i) {
      if (i.name === "安全生产风险隐患") {
        // return;
        this.popShow = true;
        // this.getSafetyProduction()
      } else if (i.name === "自然灾害风险隐患") {
        // return
        this.naturalPopShow = true;
        // this.getRisksNaturalDisasters()
      } else if (i.name === "社会动员指挥车") {
        // return;
        this.social.show = true;
        this.getSocialCommandData();
        // this.getSocialMobilizationCommandVehicle()
      } else if (i.name === "移动指挥车辆") {
        this.mobile.show = true;
        this.getMobileCommandData();
      } else if (i.name === "监控视频") {
        this.monitor.show = true;
        this.getMonitorVedioData();
      }
    },
    riskAssessment(record) {
      this.riskTitle = record.lineItem.content;
      this.riskShow = true;
    },
    onDangerCompany(item) {
      this.dangerCompanyActive = item.key;
      this.Industrysel.name = item.name;
      if (item.name === "重大隐患企业") {
        this.Industrysel.status = true;
        this.dangerCompanyList = [
          { name: "全部", key: 0 },
          { name: "非煤矿山", key: 1 },
          { name: "工贸", key: 2 },
          { name: "危化", key: 3 },
          { name: "烟花爆竹", key: 4 },
        ];
        this.Industrysel.name = this.dangerCompanyList[2].name;
      } else if (item.name === "全部") {
        this.Industrysel.status = false;
        this.dangerCompanyList = [
          { name: "全部", key: 0 },
          { name: "重大危险源企业", key: 1 },
          { name: "重大隐患企业", key: 2 },
        ];
      }
    },
    onRealMonitoring(item) {
      this.realMonitoringActive = item.key;
    },
    // 获取视频分组
    getVideoZM() {
      let that = this;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      commonApi(params, "nEuS0yYD").then((res) => {
        if (res.success) {
          let bodyList = res.body.data;
          for (let i = 0; i < bodyList.length; i++) {
            that.videoZMList.push(bodyList[i].zm);
          }
          that.videoZMList.push("城管云");
          that.videoZMList.push("危化");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";

#videoZM p:hover {
  background: rgba(10, 67, 123, 0.8);
}
</style>