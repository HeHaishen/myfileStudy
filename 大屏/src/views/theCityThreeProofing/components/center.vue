<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
 * @LastEditTime: 2021-09-23 14:51:28
-->
<template>
  <div class="three-proofing-center">
    <div
      class="center-map"
      :style="centerAllFixedLeftType === 'show' ? '' : { width: '100%' }"
    >
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
    <div class="center-right" v-show="centerAllFixedLeftType === 'show'">
      <div class="center-right-top">
        <div
          v-for="(item, index) in rightTopTabsList"
          :key="index"
          @click="titleClick(item, index)"
          :class="[titleActive === index ? 'active-title' : '']"
        >
          {{ item.name }}
          <span class="active" v-if="index === 0">/</span>
        </div>
      </div>
      <div class="center-top-content">
        <!-- 实时监测 -->
        <ul class="c-btn-list right-top-btns" v-if="titleActive === 0">
          <li
            v-for="(i, k) in typeBtnList"
            :key="k"
            :class="[weatherIndex === k ? 'chose-active' : '']"
            @click="weatherClick(i, k)"
          >
            {{ i.name }}
          </li>
        </ul>
        <div
          class="real-time-pic"
          v-show="titleActive === 0 && weatherIndex === 0"
          style="position: relative; overflow: hidden"
        >
          <!--  <iframe
            src="https://typhoon.weather.com.cn/gis/typhoon_m.shtml"
            style="
              width: 100%;
              height: calc(100% + 60px);
              position: absolute;
              bottom: -2px;
            "
          ></iframe> -->
          <iframe
            src="/taifeng/web.html"
            style="
              width: 100%;
              height: calc(100% + 60px);
              position: absolute;
              top: -60px;
            "
          ></iframe>
          <!-- <img
            src="../../../assets/images/theCityThreeProofing/satellite.png"
            alt=""
          /> -->
        </div>
        <div
          class="real-time-pic"
          v-if="titleActive === 0 && weatherIndex === 1"
        >
          <iframe
            v-if="weatherIndex === 1"
            style="width: 100%; height: 100%"
            :src="
              weatherIndex === 1
                ? `/web#/threeProofings/rainfallPattern?token=${cookieToken}`
                : ''
            "
            alt=""
          ></iframe>
        </div>
        <div
          class="real-time-pic"
          v-if="titleActive === 0 && weatherIndex === 2"
        >
          <iframe
            src="http://tqyb.com.cn/gz/weatherLive/cloudPictureFull/"
            style="width: 100%; height: 100%"
          ></iframe>
          <!-- <img
            src="../../../assets/images/theCityThreeProofing/typhoon.png"
            alt=""
          /> -->
        </div>
        <div
          class="real-time-pic"
          v-if="titleActive === 0 && weatherIndex === 3"
        >
          <iframe
            src="http://tqyb.com.cn/gz/weatherLive/radarFullPub/"
            style="width: 100%; height: 100%"
          ></iframe>
          <!-- <img
            src="../../../assets/images/theCityThreeProofing/radar.png"
            alt=""
          /> -->
        </div>

        <!-- 三防应急响应 -->

        <ul class="c-btn-list right-top-btns" v-if="titleActive === 1">
          <li
            v-for="(i, k) in threeTypeBtnList"
            :key="k"
            :class="[urgencyActiveIndex === k ? 'chose-active' : '']"
            @click="urgencyClick(i, k)"
          >
            {{ i.name }}
          </li>
        </ul>
        <div
          class="three-proofing-table real-time-pic"
          v-show="titleActive === 1 && urgencyActiveIndex === 0"
        >
          <div class="table-left">
            <img
              src="../../../assets/images/theCityThreeProofing/typhon-rainstorm.png"
              alt=""
            />
          </div>
          <div class="table-right">
            <clist :columns="tableHeaderList" :listData="tabelListData">
            </clist>
          </div>
        </div>

        <div
          class="three-proofing-charts real-time-pic"
          v-show="titleActive === 1 && urgencyActiveIndex === 1"
        ></div>
      </div>
      <div class="center-bottom-title">降雨量统计</div>
      <div class="center-bottom-content">
        <div class="center-bottom-top">
          <ul class="c-btn-list center-top-btns">
            <li
              v-for="(i, k) in rainFallTabsList"
              :key="k"
              :class="[rainfallIndex === k ? 'chose-active' : '']"
              @click="rainfallClick(i, k)"
            >
              {{ i.name }}
            </li>
          </ul>
          <p
            class="c-select-wrap center-top-select"
            v-show="rainfallIndex != 0"
          >
            <a-select default-value="广州市">
              <a-select-option
                value="item.name"
                v-for="(item, index) in cityList"
                :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-select
              @select="districtChange"
              v-model="area.district"
              :allowClear="area.district ? true : false"
              @change="districtStreet"
              :dropdownStyle="{ color: 'white' }"
              dropdownMatchSelectWidth
              dropdownClassName="dropDownSelect"
            >
              <a-select-option
                :value="item.name"
                v-for="(item, index) in districtList"
                :key="item.sn"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-select
              @select="streetChange"
              v-model="area.street"
              :allowClear="area.street ? true : false"
              @change="clearStreet"
            >
              <a-select-option
                :value="item.name"
                v-for="(item, index) in streetList"
                :key="item.sn"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </p>
        </div>

        <div class="rainfall-chart" v-show="rainfallIndex == 0"></div>
        <div class="rainfall-chart-day" v-show="rainfallIndex == 1"></div>
        <div class="rainfall-chart-hour" v-show="rainfallIndex == 2"></div>
      </div>
    </div>
    <!-- 左侧地图浮动内容 -->
    <div class="center-fixed-left" v-show="centerAllFixedLeftType === 'show'">
      <div class="fixed-left-inner" v-show="centerFixedLeftType === 'toLeft'">
        <div
          class="select-item"
          v-for="(item, index) in selectThing"
          :key="index"
        >
          <p @click="openShow(item, index)">
            <label style="cursor: pointer">
              {{ item.dictValue }}
              <div class="item-fold">
                <a-icon type="down" v-if="!item.show" />
                <a-icon type="up" v-if="item.show" />
              </div>
            </label>

            <span
              @click.stop="flexClickAllItem(item, index)"
              :class="[item.active ? 'active-span' : '']"
            ></span>
          </p>
          <ul v-show="item.show">
            <li v-for="(citem, cindex) in item.children" :key="cindex">
              <label>{{ citem.dictValue }}</label>
              <span
                :class="[citem.active ? 'active-span' : '']"
                @click="flexClickliItem(item, index, citem, cindex)"
              ></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="center-fiexd-opation">
        <a-icon
          style="color: #00ffff"
          v-if="centerFixedLeftType === 'toRight'"
          type="double-right"
          @click="clickOpationFixed"
        />
        <a-icon
          style="color: #00ffff"
          v-else
          type="double-left"
          @click="clickOpationFixed"
        />
      </div>
    </div>
    <div class="center-fixed-btns" v-show="centerAllFixedLeftType === 'show'">
      <p
        v-for="(i, k) in fixedBtnsList"
        :key="k"
        @click="centerPopClick(i, k, $event)"
      >
        {{ i.name }}
        <span v-if="i.clicked == false">︿</span>
        <span v-if="i.clicked == true">﹀</span>
      </p>
      <div class="btn-video" @click="videoClick($event)">
        <img
          src="../../../assets/images/theCityThreeProofing/icon_video.png"
          alt=""
        />
      </div>
    </div>
    <a-icon type="fullscreen" class="c-icon" @click="popClick" v-show="titleActive === 0" />
    <pop-up-layer
      v-show="centerPopOne"
      :show="centerPopOne"
      :setStyles="{}"
      @doClose="bulletinClose"
      opsition="btnTop"
      ref="myPopUpLayer"
      title="三防快报"
      class="centerPop"
    >
      <template slot="content">
        <div class="center-search">
          <input
            class="c-input"
            placeholder="请输入标题"
            type="text"
            v-model="searchData.popDataOne"
          />
          <img
            src="../../../assets/images/emergencyOverview/icon_search.png"
            alt=""
            @click="searchBulletin"
          />
        </div>
        <clist :columns="centerPopOneList" :listData="centerPopOneData">
        </clist>
        <div
          class="tree-change-pages"
          style="
            width: 100%;
            height: auto;
            display: flex;
            justify-content: flex-end;
          "
        >
          <changePage
            v-if="centerPorpOneTotal"
            v-model="centerPorpOneCurrent"
            :total="centerPorpOneTotal"
            @changePages="centerPopOneChangePages"
          />
        </div>
      </template>
    </pop-up-layer>
    <pop-up-layer
      v-show="centerPopTwo"
      :show="centerPopTwo"
      :setStyles="{}"
      @doClose="monitorClose"
      opsition="btnTop"
      ref="myPopUpLayer1"
      title="三防舆情监测"
      class="centerPop"
    >
      <template slot="content">
        <div class="center-search">
          <input
            class="c-input"
            placeholder="请输入监测内容"
            type="text"
            v-model="searchData.popDataTwo"
          />
          <img
            src="../../../assets/images/emergencyOverview/icon_search.png"
            alt=""
            @click="searchMonitor"
          />
        </div>
        <clist :columns="centerPopTwoList" :listData="centerPopTwoData">
        </clist>
        <div
          class="tree-change-pages"
          style="
            width: 100%;
            height: auto;
            display: flex;
            justify-content: flex-end;
          "
        >
          <changePage
            v-if="centerPorpTwoTotal"
            v-model="centerPorpTwoCurrent"
            :total="centerPorpTwoTotal"
            @changePages="centerPopTwoChangePages"
          />
        </div>
      </template>
    </pop-up-layer>
    <pop-up-layer
      v-show="fixedBtnsList[2]['clicked']"
      :show="fixedBtnsList[2]['clicked']"
      :setStyles="{}"
      @doClose="allCenterBtnClose(2)"
      opsition="btnTop"
      ref="myPopUpLayer2"
      title="三防应急预案"
      class="center-three-pop"
    >
      <template slot="content">
        <div class="center-search">
          <input
            class="c-input"
            placeholder="输入关键字"
            type="text"
            v-model="searchData.popDataThree"
          />
          <img
            src="../../../assets/images/emergencyOverview/icon_search.png"
            alt=""
            @click="searchEmergency"
          />
        </div>
        <div class="show-type">
          <ul>
            <li
              v-for="(i, k) in centerPopThreeObj.typeBtn"
              :key="k"
              :style="{ background: i.color }"
            >
              {{ i.name
              }}<span :style="{ color: i.labelColor }">{{ i.type }}</span>
            </li>
          </ul>
          <ul>
            <li
              :class="[
                centerPopThreeObj.emergencyActive === k + 1
                  ? 'border-li-active'
                  : '',
              ]"
              class="border-li"
              v-for="(i, k) in centerPopThreeObj.leveTypeBtn"
              :key="k"
              @click="changeEmergencyActive(k)"
            >
              {{ i.name }}
            </li>
          </ul>
        </div>
        <div class="ul-wrap three emergency">
          <clist
            :columns="centerPopThreeObj['headerList']"
            :listData="centerPopThreeObj['listData']"
          >
            <template slot="grade" slot-scope="{ record, text, index }">
              <div>
                {{ centerPopThreeObj.level[text] }}
              </div>
            </template>
            <template slot="printedTime" slot-scope="{ record, text, index }">
              <div>
                {{ text.split(" ")[0] }}
              </div>
            </template>
            <!-- grade -->
          </clist>
        </div>
        <div
          class="tree-change-pages"
          style="
            width: 100%;
            height: auto;
            display: flex;
            justify-content: flex-end;
          "
        >
          <changePage
            v-if="centerPopThreeObj['total']"
            v-model="centerPopThreeObj['currentPage']"
            :total="centerPopThreeObj['total']"
            @changePages="centerPopThreeObjChangePages"
          />
        </div>
      </template>
    </pop-up-layer>
    <pop-up-layer
      v-show="fixedBtnsList[3]['clicked']"
      :show="fixedBtnsList[3]['clicked']"
      :setStyles="{}"
      @doClose="allCenterBtnClose(3)"
      opsition="btnTop"
      ref="myPopUpLayer3"
      title="历史灾情防御措施"
      class="center-four-pop"
    >
      <template slot="content">
        <div class="center-search">
          <input
            class="c-input"
            placeholder="输入关键字"
            type="text"
            v-model="searchData.popDataFour"
          />
          <img
            src="../../../assets/images/emergencyOverview/icon_search.png"
            alt=""
            @click="searchHistory"
          />
        </div>
        <div class="ul-wrap">
          <clist
            :columns="centerPopFourObj['headerList']"
            :listData="centerPopFourObj['listData']"
          >
            <template slot="opation">
              <div class="table-btn-wrap">
                <p class="greed-btn">五个百分百</p>
                <p class="yellow-btn">各区数据</p>
                <p class="red-btn">成员单位数据</p>
              </div>
            </template>
          </clist>
          <div
            class="tree-change-pages"
            style="
              width: 100%;
              height: auto;
              display: flex;
              justify-content: flex-end;
            "
          >
            <changePage
              v-if="centerPopFourObj['total']"
              v-model="centerPopFourObj['currentPage']"
              :total="centerPopFourObj['total']"
              @changePages="centerPopFourObjChangePages"
            />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <!-- 摄像机弹窗 -->
    <pop-up-layer
      v-show="videoOBj['clicked']"
      :show="videoOBj['clicked']"
      :setStyles="{}"
      @doClose="videoClickClose"
      opsition="btnTop"
      ref="videoBtnUpLayer"
      title="视频监控"
      class="center-four-pop"
    >
      <template slot="content">
        <div class="center-search">
          <input
            class="c-input"
            placeholder="输入关键字"
            type="text"
            v-model="videoOBj.searchForm"
          />
          <img
            src="../../../assets/images/emergencyOverview/icon_search.png"
            alt=""
            @click="searchMonitor"
          />
        </div>
        <div class="ul-wrap">
          <clist
            :columns="videoOBj['headerList']"
            :listData="videoOBj['listData']"
          >
            <template slot="opation">
              <div class="table-btn-wrap">
                <p>定位</p>
              </div>
            </template>
          </clist>
          <changePage
            v-if="videoOBj['total']"
            v-model="videoOBj['currentPage']"
            :total="videoOBj['total']"
            @changePages="videoOBjChangePages"
          />
        </div>
      </template>
    </pop-up-layer>
    <div class="center-fixed-right" v-show="centerAllFixedLeftType === 'show'">
      <ul class="fixed-right">
        <li v-for="(i, k) in allStaticList" :key="k">
          <div class="fixed-li-title">{{ i.title }}</div>
          <div class="fixed-li-type">
            <p>
              <label for="">{{ i.checkName }}</label
              ><span
                style="cursor: pointer"
                @click="doStaicModelDetail(i, k, $event, 1)"
                >{{ i.checkNumber }}</span
              >
              <label for="">个</label>
            </p>
            <p>
              <label for="">{{ i.inlineName }}</label
              ><span
                style="cursor: pointer"
                @click="doStaicModelDetail(i, k, $event, 2)"
                >{{ i.inlineNumber }}</span
              >
              <label for="">{{ i.inlineUnit }}</label>
            </p>
          </div>
          <div class="fiexd-li-list">
            <p v-for="(item, index) in i.listData" :key="index">
              <span
                :class="[index === i.listData.length - 1 ? 'normal-type' : '']"
                >{{ item.number }}</span
              >
              <label for="">{{ item.name }}</label>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!--实时监测弹窗 -->
    <div
      class="center-all-opation"
      :style="centerAllFixedLeftType === 'show' ? { top: 0 } : { bottom: 0 }"
    >
      <a-icon
        style="color: #00ffff"
        v-if="centerAllFixedLeftType === 'show'"
        type="double-left"
        @click="clickAllOpationFixed"
      />
      <a-icon
        style="color: #00ffff"
        v-else
        type="double-right"
        @click="clickAllOpationFixed"
      />
    </div>
    <!-- 实时监测弹窗  -->
    <!-- 1为监测总数 2为在线数量-->
    <real-time-check ref="RealTimeCheck01" />
    <real-time-check ref="RealTimeCheck02" />
    <real-time-check ref="RealTimeCheck11" />
    <real-time-check ref="RealTimeCheck12" />
    <real-time-check ref="RealTimeCheck21" />
    <real-time-check ref="RealTimeCheck22" />
    <real-time-check ref="RealTimeCheck31" />
    <real-time-check ref="RealTimeCheck32" />
    <VideoTree ref="VideoTree" style="z-index: 9999"></VideoTree>
    <tempPop
      :title="typhon.title"
      :show="typhon.show"
      :v-show="typhon.show"
      :setStyles="{ left: '84.2%', top: '54%' }"
      class="command-table"
      @doClose="close('1')"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="c-typhon">
          <iframe
            v-if="typhon.show"
            src="/taifeng/web.html"
            style="width: 100%;
              height: calc(100% + 60px);
              position: absolute;
              top: -60px;"
          ></iframe>
        </div>
      </template>
    </tempPop>

    <tempPop
      :title="rainfall.title"
      :show="rainfall.show"
      :v-show="rainfall.show"
      :setStyles="{ left: '84.2%', top: '54%' }"
      class="command-table"
      @doClose="close('2')"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="c-typhon">
          <iframe
            v-if="rainfall.show"
            style="width: 100%; height: 100%"
            :src="`/web#/threeProofings/rainfallPattern?token=${cookieToken}`"
            alt=""
          ></iframe>
        </div>
      </template>
    </tempPop>

    <tempPop
      :title="cloud.title"
      :show="cloud.show"
      :v-show="cloud.show"
      :setStyles="{ left: '84.2%', top: '54%' }"
      class="command-table"
      @doClose="close('3')"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="c-typhon">
          <iframe
            v-if="cloud.show"
            src="http://tqyb.com.cn/gz/weatherLive/cloudPictureFull/"
            style="width: 100%; height: 100%"
          ></iframe>
        </div>
      </template>
    </tempPop>

    <tempPop
      :title="radar.title"
      :show="radar.show"
      :v-show="radar.show"
      :setStyles="{ left: '84.2%', top: '54%' }"
      class="command-table"
      @doClose="close('4')"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="c-typhon">
          <iframe
            v-if="radar.show"
            src="http://tqyb.com.cn/gz/weatherLive/radarFullPub/"
            style="width: 100%; height: 100%"
          ></iframe>
        </div>
      </template>
    </tempPop>
  </div>
</template>

<script>
import moment from "moment";
import Clist from "@/components/APicture/c-table";
import RealTimeCheck from "./realTimeCheck";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import VideoTree from "@/components/APicture/videoTree/index.vue";
import changePage from "@/components/APicture/changePage";
import Cookies from "js-cookie";
import {
  getRainfallCity,
  getRainfallDay,
  getResponseList,
  getAreaSelect,
  getResponseStatus,
  getRainfallHour,
  getBulletinList,
  getMonitorList,
  getReservoirWater, // 水库水情
  getRiversWater, // 河湖水情
  getPumpLockWater, // 泵站水闸水情
  getWaterlogging, // 积水内涝点
  getReservoirWaterDetail, // 水库水情-detail
  getRiversWaterDetail, // 河湖水情-detail
  getPumpLockWaterDetail, // 泵站水闸水情-detail
  getWaterloggingDetail, // 积水内涝点-detail
  getReponsePlan, // 应急预案
  getPreventionMeasures, // 历史灾情防御措施
  commonApi, //地图侧边栏共用接口
} from "../../../api/theCityThreeProofing";
export default {
  components: { Clist, RealTimeCheck, VideoTree, changePage, tempPop },
  data() {
    return {
      cookieToken: null,
      // 侧边企业列表
      selectThing: [],
      defaultParams: {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      },

      limitParams: {
        body: {
          title: "",
          detectionContent: "",
          name: "",
          // grade: 0,
          eventName: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
      titleActive: 0,
      rightTopTabsList: [
        { name: "实时监测", key: 0 },
        { name: "三防应急响应", key: 1 },
      ],
      // 台风路径图
      typhon: {
        title: "台风路径图",
        show: false,
      },
      rainfall: {
        title: "降雨填色图",
        show: false,
      },
      cloud: {
        title: "卫星云图",
        show: false,
      },
      radar: {
        title: "雷达回波图",
        show: false,
      },
      typeBtnList: [
        { name: "台风路径图", key: 0 },
        { name: "降雨填色图", key: 1 },
        { name: "卫星云图", key: 2 },
        { name: "雷达回波图", key: 3 },
      ],
      threeTypeBtnList: [
        { name: "三防应急响应", key: 0 },
        { name: "响应情况统计", key: 1 },
      ],
      rainFallTabsList: [
        { name: "本月平均降雨量", key: 0 },
        { name: "日降雨量", key: 1 },
        { name: "单时最大降雨量", key: 2 },
      ],
      // 点击按钮
      fixedBtnsList: [
        { name: "三防快报", key: 0, clicked: false },
        { name: "舆情监测", key: 1, clicked: false },
        { name: "三防应急预案", key: 2, clicked: false },
        { name: "历史灾情防御措施", key: 3, clicked: false },
      ],
      // 所有应急情况list
      allStaticList: [
        {
          type: 1,
          title: "水库水情",
          checkName: "监测总数",
          checkNumber: "0",
          checkUnit: "个",
          inlineName: "在线数量",
          inlineNumber: "0",
          inlineUnit: "个",
          listData: [
            { name: "漫坝", number: "0" },
            { name: "超正常", number: "0" },
            { name: "超汛期", number: "0" },
            { name: "超汛期", number: "0" },
          ],
        },
        {
          type: 2,
          title: "河湖水情",
          checkName: "监测总数",
          checkNumber: "0",
          checkUnit: "个",
          inlineName: "在线数量",
          inlineNumber: "0",
          inlineUnit: "个",
          listData: [
            { name: "超保证", number: "0" },
            { name: "超警戒", number: "0" },
            { name: "正常", number: "0" },
          ],
        },
        {
          type: 3,
          title: "泵站水闸水情",
          checkName: "监测总数",
          checkNumber: "0",
          checkUnit: "个",
          inlineName: "在线数量",
          inlineNumber: "0",
          inlineUnit: "个",
          listData: [
            { name: "超保证", number: "0" },
            { name: "超警戒", number: "0" },
            { name: "正常", number: "0" },
          ],
        },
        {
          type: 4,
          title: "积水内涝点",
          checkName: "监测总数",
          checkNumber: "0",
          checkUnit: "个",
          inlineName: "在线数量",
          inlineNumber: "0",
          inlineUnit: "个",
          listData: [
            { name: "严重内涝", number: "0" },
            { name: "严重内涝", number: "0" },
            { name: "轻度内涝", number: "0" },
            { name: "无内涝", number: "0" },
          ],
        },
      ],
      // chart
      rainfallChartDiv: null,
      rainfallChartDayDiv: null,
      rainfallChartHourDiv: null,
      proofingChartsDiv: null,
      cityList: [{ name: "广州市", key: 1 }],
      districtList: [],
      streetList: [],
      area: {
        city: "广州",
        district: null,
        street: null,
      },
      areaSearchCode: {
        cityCode: 440100000000,
        areaCode: undefined,
        streetCode: undefined,
      },
      // 降雨量tab选择
      rainfallIndex: 0,
      // 应急按钮索引
      urgencyActiveIndex: 0,
      // 三防应急响应表格数据
      tableHeaderList: [
        { title: "地市", index: 0, textIndex: "areaName", width: "15%" },
        { title: "类型", index: 1, textIndex: "typeName", width: "15%" },
        { title: "级别", index: 2, textIndex: "level", width: "15%" },
        { title: "时间", index: 3, textIndex: "responseTime", width: "20%" },
        { title: "最高", index: 4, textIndex: "highestLevel", width: "15%" },
        { title: "启动", index: 5, textIndex: "startTime", width: "20%" },
      ],
      tabelListData: [
        // { areaName: '2021-05-13', typeName: '[红色预警]监测到xoooxxoow企业器温度达到55c', level: 1, responseTime: '****企业', highestLevel: 0, startTime: },
        // { time: '2021-05-13', content: '[红色预警]监测到xoooxxoow企业器温度达到55c', level: 2, resource: '****企业', index: 0 },
        // { time: '2021-05-13', content: '[红色预警]监测到xoooxxoow企业器温度达到55c', level: 3, resource: '****企业', index: 0 },
        // { time: '2021-05-13', content: '[红色预警]监测到xoooxxoow企业器温度达到55c', level: 3, resource: '****企业', index: 0 },
      ],

      weatherIndex: 0,
      // 三防弹窗
      centerPorpOneTotal: 0,
      centerPorpOneCurrent: 1,
      centerPopOne: false,
      centerPopOneList: [
        { title: "发布时间", index: 0, textIndex: "releaseTime", width: "40%" },
        { title: "标题", index: 1, textIndex: "title", width: "60%" },
      ],
      centerPopOneData: [],

      centerPopTwo: false,
      centerPorpTwoTotal: 0,
      centerPorpTwoCurrent: 1,
      centerPopTwoList: [
        {
          title: "监测时间",
          index: 0,
          textIndex: "detectionTime",
          width: "40%",
        },
        {
          title: "监测内容",
          index: 1,
          textIndex: "detectionContent",
          width: "60%",
        },
        { title: "监测内容", index: 1, textIndex: "source", width: "60%" },
      ],
      centerPopTwoData: [],
      searchData: {
        popDataOne: "",
        popDataTwo: "",
        popDataThree: null,
        popDataFour: null,
      },
      // 三防应急预案-弹窗
      centerPopThreeObj: {
        headerList: [
          { title: "类别", index: 0, textIndex: "type", width: "15%" },
          { title: "等级", index: 0, textIndex: "grade", width: "7%" },
          { title: "预案名称", index: 1, textIndex: "name", width: "20%" },
          { title: "牵头单位", index: 2, textIndex: "orgName", width: "18%" },
          { title: "发文编号", index: 3, textIndex: "code", width: "15%" },
          {
            title: "印发时间",
            index: 4,
            textIndex: "printedTime",
            width: "15%",
          },
          {
            title: "公开方式",
            index: 5,
            textIndex: "publicMethod",
            width: "10%",
          },
        ],
        emergencyActive: 0,
        listData: [],
        typeBtn: [
          {
            name: "防暴雨内涝",
            type: 0,
            color: "rgba(15,71,98,1)",
            labelColor: "rgba(0,220,255,1)",
          },
          {
            name: "防风",
            type: 1,
            color: "rgba(51,26,62,1)",
            labelColor: "rgba(255,102,204,1)",
          },
          {
            name: "防汛",
            type: 2,
            color: "rgba(51,71,71,1)",
            labelColor: "rgba(255,255,0,1)",
          },
          {
            name: "防旱",
            type: 3,
            color: "rgba(15,71,71,1)",
            labelColor: "rgba(255,82,0,1)",
          },
          {
            name: "防冻",
            type: 4,
            color: "rgba(0,204,255,1)",
            labelColor: "rgba(0,255,102,1)",
          },
        ],
        level: {
          1: "I级",
          2: "II级",
          3: "III级",
          4: "IV级",
        },
        leveTypeBtn: [
          { name: "I级", type: 1 },
          { name: "II级", type: 2 },
          { name: "III级", type: 3 },
          { name: "IV级", type: 4 },
        ],
        currentPage: 1,
        total: 0,
      },
      // 历史灾情防御措施-弹窗
      centerPopFourObj: {
        headerList: [
          {
            title: "发生时间",
            index: 0,
            textIndex: "printedTime",
            width: "15%",
          },
          { title: "灾种", index: 1, textIndex: "disasterType", width: "15%" },
          { title: "事件名称", index: 2, textIndex: "eventName", width: "30%" },
          { title: "", index: 3, textIndex: "opation", width: "40%" },
        ],
        listData: [],
        currentPage: 1,
        total: 0,
      },
      // 视频按钮点击
      videoOBj: {
        clicked: false,
        headerList: [
          {
            title: "摄像机名称",
            index: 0,
            textIndex: "printedTime",
            width: "40%",
          },
          {
            title: "摄像机编码",
            index: 1,
            textIndex: "disasterType",
            width: "40%",
          },
          { title: "定位", index: 2, textIndex: "eventName", width: "20%" },
        ],
        listData: [],
        searchForm: null,
        currentPage: 1,
        total: 0,
      },
      centerFixedLeftType: "toLeft", // toLeft-隐藏 toRight-显示
      centerAllFixedLeftType: "show", // show-显示 hidden 隐藏
    };
  },
  created() {
    this.initDatas();
    this.getSidebarDatas();
    this.cookieToken = Cookies.get("token");
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    close(num) {
      if (num === "1") {
        this.typhon.show = false;
      } else if (num === "2") {
        this.rainfall.show = false;
      } else if (num === "3") {
        this.cloud.show = false;
      } else if (num === "4") {
        this.radar.show = false;
      }
    },

    // 点击放大
    popClick() {
      if (this.titleActive === 0 && this.weatherIndex === 0) {
        this.typhon.show = true;
      } else if (this.titleActive === 0 && this.weatherIndex === 1) {
        this.rainfall.show = true;
      } else if (this.titleActive === 0 && this.weatherIndex === 2) {
        this.cloud.show = true;
      } else if (this.titleActive === 0 && this.weatherIndex === 3) {
        this.radar.show = true;
      }
    },
    /**
     * @description: 切换应急预案等级
     * @param {*}
     * @return {*}
     */
    changeEmergencyActive(k) {
      this.centerPopThreeObj.emergencyActive = k + 1;
      this.limitParams.body.grade = this.centerPopThreeObj.emergencyActive;
      this.doGetReponsePlan();
    },
    // 展示
    openShow(item, index) {
      item.show = !item.show;
      // 如果是展开 且 子级没有数据，则请求接口获取子级
      if (item.show && item.children.length == 0) {
        this.getSidebarChildren(item);
      }
    },
    //获取侧边栏顶层数据的子级
    getSidebarChildren(parent) {
      let code = "9GO8HDzz";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.parentId = parent.sid;
      commonApi({ ...params, code: code }).then((res) => {
        if (res.success) {
          let data = JSON.parse(JSON.stringify(res.body.data));
          for (let item of data) {
            item.active = false;
          }
          parent.children = data;
        } else {
          console.error(res.message);
        }
      });
    },
    flexClickAllItem(item, index) {
      let is_Bool = true;
      this.selectThing[index].active = JSON.parse(JSON.stringify(!item.active));
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
      if (this.selectThing[index].active) {
        //遍历获取子级的所有详情数据
        this.selectThing[index].children.forEach((option) => {
          this.getSidebarDetail(option);
        });
        is_Bool = true;
        this.selectThing[index].show = true;
        this.selectThing[index].children.map((citem, cindex) => {
          this.selectThing[index].children[cindex].active = true;
        });
      } else {
        is_Bool = false;
        this.loopMap(this.selectThing[index].children, false);
        this.selectThing[index].children.forEach((option) => {
          pGzznCore.addPromiseHazardousQYRemove(option.dictValue);
        });
      }
    },
    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },
    flexClickliItem(item, index, citem, cindex) {
      this.selectThing[index].children[cindex].active = !citem.active;
      if (this.selectThing[index].children[cindex].active) {
        //获取该项的详情
        this.getSidebarDetail(citem);
        let childrenLength = this.selectThing[index].children.length;
        let currentArr = this.selectThing[index].children.filter((i, k) => {
          if (i.active) {
            return i;
          }
        });
        if (currentArr.length === childrenLength) {
          this.selectThing[index].active = true;
        }
      } else {
        this.selectThing[index].active = false;
        pGzznCore.addPromiseHazardousQYRemove(citem.dictValue);
      }
      this.selectThing = JSON.parse(JSON.stringify(this.selectThing));
    },
    //获取侧边栏二级数据项的具体详情
    getSidebarDetail(item) {
      let code = item.interfaceCode;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body = item.condition ? JSON.parse(item.condition) : {};
      commonApi({ ...params, code: code }).then((res) => {
        if (res.success) {
          console.log(res);
          pGzznCore.addPromiseHazardousQY(res, item.dictValue, 4);
        } else {
          console.error(res.message);
        }
      });
    },
    //获取侧边栏数据：一层
    getSidebarDatas() {
      let code = "9GO8HDzz";
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      params.body.dictName = "SF_LAYER";
      console.log(111111);
      commonApi({ ...params, code: code }).then((res) => {
        console.log(22222);

        if (res.success) {
          let data = [];
          for (let item of res.body.data) {
            let newItem = { ...item, active: false, show: false, children: [] };
            data = [...data, newItem];
          }
          this.selectThing = data;
        } else {
          console.error(res.message);
        }
      });
    },
    init() {
      let mainRight = $(".center-fixed-right").width();
      let clientWidth = document.body.clientWidth;
      if (clientWidth < 3000) {
        mapToolLocation = mainRight + 1328;
      } else {
        mapToolLocation = mainRight + 1433;
      }
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(15);
    },
    initChart() {
      this.rainfallChartDiv = this.$echarts.init(
        document.querySelector(".rainfall-chart")
      );
      this.rainfallChartDiv.setOption(this.rainfallChart());

      this.rainfallChartDayDiv = this.$echarts.init(
        document.querySelector(".rainfall-chart-day")
      );

      this.rainfallChartDayDiv.setOption(this.rainfallChartDay());
      this.proofingChartsDiv = this.$echarts.init(
        document.querySelector(".three-proofing-charts")
      );
      this.proofingChartsDiv.setOption(this.responseChart());

      this.rainfallChartHourDiv = this.$echarts.init(
        document.querySelector(".rainfall-chart-hour")
      );
      this.rainfallChartHourDiv.setOption(this.rainfallChartHour());

      // 获取区降水量
      this.rainfallCity();
    },
    initDatas() {
      this.doGetReservoirWater(); // 水库水情
      this.doGetRiversWater(); // 河湖水情
      this.doGetPumpLockWater(); // 泵站水闸水情
      this.doGetWaterlogging(); // 水内涝点
      this.doGetReponsePlan(); // 全市三防-应急预案
      this.doGetPreventionMeasures(); // 全市三防-历史灾情防御措施
    },
    centerPopClick(item, index, e) {
      console.log(item, index, e);
      this.limitParams.page = 1;
      this.centerPorpOneCurrent = 1;
      this.centerPorpTwoCurrent = 1;
      this.centerPopThreeObj.currentPage = 1;
      this.centerPopFourObj.currentPage = 1;
      if (index == 0) {
        item.clicked = !item.clicked;
        this.centerPopOne = !this.centerPopOne;
        this.bulletinList();
        this.$refs.myPopUpLayer.saveEvent = e;
      } else if (index == 1) {
        item.clicked = !item.clicked;
        this.centerPopTwo = !this.centerPopTwo;
        this.monitorList();
        this.$refs.myPopUpLayer1.saveEvent = e;
      } else {
        this.fixedBtnsList[index]["clicked"] =
          !this.fixedBtnsList[index]["clicked"];
        this.$refs["myPopUpLayer" + index].saveEvent = e;
      }
    },
    // 三防应急预案和历史灾情点击关闭
    allCenterBtnClose(index) {
      this.fixedBtnsList[index]["clicked"] = false;
    },
    // 获取三防快报
    bulletinList() {
      // this.searchData.popDataOne
      this.limitParams.body.title = this.searchData.popDataOne;
      getBulletinList(this.limitParams).then((res) => {
        if (res.success) {
          this.centerPopOneData = res.body.data;
          this.centerPorpOneTotal = parseInt(res.total);
          // centerPorpOneCurrent
        }
      });
    },
    // 三防快报搜索
    searchBulletin() {
      this.bulletinList();
    },

    /**
     * @description: 三防应急预案
     * @param {*}
     * @return {*}
     */
    searchEmergency() {
      this.limitParams.page = 1;
      this.centerPopThreeObj.currentPage = 1;
      this.doGetReponsePlan(); // 全市三防-应急预案
    },
    //三防快报关闭
    bulletinClose() {
      this.centerPopOne = false;
    },

    // 获取三防舆情列表
    monitorList() {
      // this.searchData.popDataTwo,
      this.limitParams.body.detectionContent = this.searchData.popDataTwo;
      getMonitorList(this.limitParams).then((res) => {
        if (res.success) {
          this.centerPopTwoData = res.body.data;
          this.centerPorpTwoTotal = parseInt(res.total);
        }
      });
    },
    // 水库水情
    doGetReservoirWater() {
      getReservoirWater({ body: {} })
        .then((res) => {
          if (res.success) {
            // ("checkNumber,inlineNumber");
            this.allStaticList[0]["checkNumber"] = res.body.data[0].monitorNum;
            this.allStaticList[0]["inlineNumber"] = res.body.data[0].onlineNum;
            this.allStaticList[0]["listData"][0]["number"] =
              res.body.data[0].damNum;
            this.allStaticList[0]["listData"][1]["number"] =
              res.body.data[0].exceedNum;
            this.allStaticList[0]["listData"][2]["number"] =
              res.body.data[0].floodNum;
            this.allStaticList[0]["listData"][3]["number"] =
              res.body.data[0].normal;
          } else {
            this.$message.error("无法获取水库水情");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("错误获取水库水情");
          }
        });
    },
    // 河湖水情
    doGetRiversWater() {
      getRiversWater({ body: {} })
        .then((res) => {
          if (res.success) {
            // ("checkNumber,inlineNumber");
            this.allStaticList[1]["checkNumber"] = res.body.data[0].monitorNum;
            this.allStaticList[1]["inlineNumber"] = res.body.data[0].onlineNum;
            this.allStaticList[1]["listData"][0]["number"] =
              res.body.data[0].ensureNum;
            this.allStaticList[1]["listData"][1]["number"] =
              res.body.data[0].alertNum;
            this.allStaticList[1]["listData"][2]["number"] =
              res.body.data[0].normal;
          } else {
            this.$message.error("无法获取河湖水情");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("错误获取河湖水情");
          }
        });
    },
    //泵站水闸水情
    doGetPumpLockWater() {
      getPumpLockWater({ body: {} })
        .then((res) => {
          if (res.success) {
            // ("checkNumber,inlineNumber");
            this.allStaticList[2]["checkNumber"] = res.body.data[0].monitorNum;
            this.allStaticList[2]["inlineNumber"] = res.body.data[0].onlineNum;
            this.allStaticList[2]["listData"][0]["number"] =
              res.body.data[0].ensureNum;
            this.allStaticList[2]["listData"][1]["number"] =
              res.body.data[0].alertNum;
            this.allStaticList[2]["listData"][2]["number"] =
              res.body.data[0].normal;
          } else {
            this.$message.error("无法获取泵站水闸水情");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("错误获取泵站水闸水情");
          }
        });
    },
    // 积水内涝点
    doGetWaterlogging() {
      getWaterlogging({ body: {} })
        .then((res) => {
          if (res.success) {
            // ("checkNumber,inlineNumber");
            this.allStaticList[3]["checkNumber"] = res.body.data[0].monitorNum;
            this.allStaticList[3]["inlineNumber"] = res.body.data[0].onlineNum;
            this.allStaticList[3]["listData"][0]["number"] =
              res.body.data[0].severeNum;
            this.allStaticList[3]["listData"][1]["number"] =
              res.body.data[0].moderateNum;
            this.allStaticList[3]["listData"][2]["number"] =
              res.body.data[0].mildNum;
            this.allStaticList[3]["listData"][3]["number"] =
              res.body.data[0].normal;
          } else {
            this.$message.error("无法获取泵站水闸水情");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("错误获取泵站水闸水情");
          }
        });
    },
    doStaicModelDetail(i, k, $event, type) {
      console.log(k);
      let typeObj = {
        1: "监测总数",
        2: "在线数量",
      };
      this.$refs["RealTimeCheck" + k + type].$emit("show", {
        i,
        k,
        saveEvent: $event,
        pageType: type,
        pageTypeName: typeObj[type],
      });
      /*  switch(k){
          case 0:
            getReservoirWaterDetail().then((res)=>{
              if(res.success) {
                console.log('success',res)
              } else {
                this.$message.error('')
              }
            }).catch((err)=>{
              if(err){
                console.log(888)
              }
            })
            break;
          case 1:
            getRiversWaterDetail().then((res)=>{
              if(res.success) {
                console.log('success',res)
              } else {
                this.$message.error('')
              }
            }).catch((err)=>{
              if(err){
                console.log(888)
              }
            })
            break;
          case 2:
            getPumpLockWaterDetail().then((res)=>{
              if(res.success) {
                console.log('success',res)
              } else {
                this.$message.error('')
              }
            }).catch((err)=>{
              if(err){
                console.log(888)
              }
            })
            break;
          case 3:
            getWaterloggingDetail().then((res)=>{
              if(res.success) {
                console.log('success',res)
              } else {
                this.$message.error('')
              }
            }).catch((err)=>{
              if(err){
                console.log(888)
              }
            })
           break;
          default:
            break;
        } */
    },
    // 全市三防-应急预案
    doGetReponsePlan() {
      this.limitParams.body.name = this.searchData.popDataThree;
      getReponsePlan(this.limitParams)
        .then((res) => {
          if (res.success) {
            console.log(res);
            this.centerPopThreeObj["listData"] = res.body.data;
            this.centerPopThreeObj.total = parseInt(res.total);
            console.log("全市三防-应急预案", res.body.data);
            // this.centerPopThreeObj = this.centerPopThreeObj
          } else {
            this.$message.error("无法获取应急预案");
          }
        })
        .catch((err) => {
          if (err) {
            // console.warn('获取应急预案异常', err);
            // console.error('获取应急预案异常', err);
            this.$message.error("错误获取应急预案");
          }
        });
    },
    // 全市三防-历史灾情防御措施
    doGetPreventionMeasures() {
      this.limitParams.body.eventName = this.searchData.popDataFour;
      getPreventionMeasures(this.limitParams)
        .then((res) => {
          if (res.success) {
            this.centerPopFourObj["listData"] = res.body.data;
            this.centerPopFourObj["total"] = parseInt(res.total);
            // this.centerPopFourObj = this.centerPopFourObj
          } else {
            this.$message.error("无法获取历史灾情防御措施");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("错误获取历史灾情防御措施");
          }
        });
    },
    // 三防舆情搜索
    searchMonitor() {
      this.monitorList();
    },

    /**
     * @description:  历史灾情防御措施搜索
     * @param {*}
     * @return {*}
     */
    searchHistory() {
      this.limitParams.page = 1;
      this.centerPopFourObj.currentPage = 1;
      this.doGetPreventionMeasures();
    },
    // 三防快报关闭
    monitorClose() {
      this.centerPopTwo = false;
    },
    titleClick(item, index) {
      this.titleActive = index;
      if (this.titleActive === 1) {
        //获取三防应急列表
        this.responseList();
      }
    },
    // 切换应急按钮
    urgencyClick(item, index) {
      this.urgencyActiveIndex = index;
      if (index == 1) {
        this.ResponseStatus();
        this.proofingChartsDiv.resize();
      }
    },
    //天气图像切换
    weatherClick(item, index) {
      this.weatherIndex = index;
    },
    // 获取三防应急列表
    responseList() {
      let data = {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getResponseList(data).then((res) => {
        if (res.success) {
          this.tabelListData = res.body.data;
        }
      });
    },
    //获取三防应急echart
    ResponseStatus() {
      let data = {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getResponseStatus(data).then((res) => {
        if (res.success) {
          console.log(res);

          this.proofingChartsDiv.setOption({
            dataset: {
              dimensions: ["time", "num"],
              source: res.body.data,
            },
          });
        }
      });
    },
    // 降雨量切换
    rainfallClick(item, index) {
      this.rainfallIndex = index;
      this.rainfallChartDayDiv.resize();
      this.rainfallChartHourDiv.resize();

      if (item.name == "日降雨量") {
        this.areaSearchCode.areaCode = null;
        this.areaSearchCode.streetCode = null;
        this.area.district = null;
        this.area.street = "";
        this.streetList = [];
        this.rainFallDay();
        this.areaSelect();
        this.rainfallChartDayDiv.resize();
      } else if (item.name == "单时最大降雨量") {
        this.areaSearchCode.areaCode = "";
        this.areaSearchCode.streetCode = "";
        this.area.district = "";
        this.area.street = "";
        this.areaSelect();
        this.rainFallHour();
      }
    },
    //获取区降水量
    rainfallCity() {
      const time = moment().format("YYYY-MM");
      let data = {
        body: {
          happenTime: time,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getRainfallCity(data).then((res) => {
        if (res.success) {
          if (res.body.data != null) {
            this.rainfallChartDiv.setOption({
              dataset: {
                dimensions: ["areaName", "num"],
                source: res.body.data,
              },
            });
          }
        }
      });
    },
    //获取日降水量
    rainFallDay() {
      let data = {
        body: {
          cityCode: this.areaSearchCode.cityCode,
          areaCode: this.areaSearchCode.areaCode,
          street: this.areaSearchCode.streetCode,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getRainfallDay(data).then((res) => {
        if (res.success) {
          if (res.body.data != null) {
            this.rainfallChartDayDiv.setOption({
              dataset: {
                dimensions: ["day", "num"],
                source: res.body.data,
              },
            });
          }
        }
      });
    },
    //获取小时降水量
    rainFallHour() {
      let data = {
        body: {
          cityCode: this.areaSearchCode.cityCode,
          areaCode: this.areaSearchCode.areaCode,
          street: this.areaSearchCode.streetCode,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getRainfallHour(data).then((res) => {
        if (res.success) {
          console.log(res);

          if (res.body.data != null && res.body.data.length > 0) {
            this.rainfallChartHourDiv.setOption({
              dataset: {
                dimensions: ["hour", "sum"],
                source: res.body.data,
              },
            });
          }
        }
      });
    },
    //获取区级选择
    areaSelect(code = null) {
      let data = {
        body: {
          en: code ? code : 440100000000,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getAreaSelect(data).then((res) => {
        if (res.success) {
          const type = res.body.data.find((e) => e.types == 3);
          if (type) {
            this.districtList = res.body.data;
          } else {
            this.streetList = res.body.data;
          }
        }
      });
    },
    // 市选择
    cityChange() {
      this.areaSearchCode.cityCode = 440100000000;
    },
    // 区选择
    districtChange(value, item) {
      this.areaSearchCode.areaCode = item.data.key;
      this.areaSearchCode.streetCode = "";
      this.area.street = "";
      this.areaSelect(this.areaSearchCode.areaCode);
      if (this.rainfallIndex == 1) {
        this.rainFallDay();
      } else if (this.rainfallIndex == 2) {
        this.rainFallHour();
      }

      // this.areaSelect(item)
    },
    //区取消
    districtStreet() {
      if (this.area.district == undefined) {
        this.areaSearchCode.areaCode = "";
        this.area.street = "";
        this.areaSearchCode.streetCode = "";
        if (this.rainfallIndex == 1) {
          this.rainFallDay();
        } else if (this.rainfallIndex == 2) {
          this.rainFallHour();
        }
      }
    },
    // 街选择
    streetChange(value, item) {
      this.areaSearchCode.streetCode = item.data.key;
      if (this.rainfallIndex == 1) {
        this.rainFallDay();
      } else if (this.rainfallIndex == 2) {
        this.rainFallHour();
      }
      this.rainFallDay();
    },
    // 街取消
    clearStreet() {
      if (this.area.street == undefined) {
        this.areaSearchCode.streetCode = "";
        if (this.rainfallIndex == 1) {
          this.rainFallDay();
        } else if (this.rainfallIndex == 2) {
          this.rainFallHour();
        }
      }
    },
    responseChart() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "item",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true,
        },
        color: "rgb(1,255,255)",
        xAxis: {
          type: "category",

          axisLine: {
            show: false,
            lineStyle: {
              color: "#cdd5e2",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#01ffff",
              fontSize: that.$setFontSize(14),
            },
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#cdd5e2",
              },
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#3e4e68",
              },
            },
            axisLabel: {
              textStyle: {
                color: "white",
                fontSize: that.$setFontSize(14),
              },
            },

            /*   axisLine: {
                  lineStyle: {
                    color: "#cdd5e2",
                  },
                }, */
          },
        ],
        series: [
          {
            name: "数量",

            type: "bar",
          },
        ],
      };
      return option;
    },
    rainfallChart() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(14),
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true,
        },
        legend: {
          left: "center",
          top: "5%",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(14),
          },
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
        },
        xAxis: {
          type: "category",
          data: [
            "从化",
            "黄埔",
            "增城",
            "番禺",
            "南沙",
            "花都",
            "白云",
            "天河",
            "荔湾",
            "越秀",
            "海珠",
          ],
          axisLine: {
            show: false,
            lineStyle: {
              color: "#cdd5e2",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#01ffff",
              fontSize: that.$setFontSize(16),
            },
          },
        },

        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#cdd5e2",
              },
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#3e4e68",
              },
            },
            axisLabel: {
              textStyle: {
                color: "white",
                fontSize: that.$setFontSize(16),
              },
            },
            /*   axisLine: {
                  lineStyle: {
                    color: "#cdd5e2",
                  },
                }, */
          },
        ],
        series: [
          {
            name: "降雨量",
            type: "bar",
            barWidth: "12px",
            itemStyle: {
              normal: {
                color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00fefe",
                  },
                  {
                    offset: 1,
                    color: "#01ffff",
                  },
                ]),
              },
            },
            data: [200, 300, 400, 200, 9000, 600, 788, 1223, 5644, 456, 788],
          },
        ],
      };
      return option;
    },
    rainfallChartDay() {
      let that = this;
      let option = {
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(14),
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        yAxis: {
          type: "value",
          name: "雨量(mm)",
          nameTextStyle: {
            fontSize: that.$setFontSize(16),
            padding: [0, 0, 0, 20],
            color: "#fff",
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#cdd5e2",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#3e4e68",
            },
          },
          axisLabel: {
            textStyle: {
              color: "white",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        series: [
          {
            name: "降雨量",
            type: "line",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: that.$setFontSize(16),
                  },
                },
              },
            },

            itemStyle: {
              normal: {
                lineStyle: {
                  color: "rgb(1,255,255)",
                },
              },
            },
          },
        ],
      };
      return option;
    },
    rainfallChartHour() {
      let that = this;
      let option = {
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(14),
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#01ffff",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        yAxis: {
          type: "value",
          name: "雨量(mm)",
          nameTextStyle: {
            fontSize: that.$setFontSize(16),
            padding: [0, 0, 0, 40], //左缩进
            color: "#fff",
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#cdd5e2",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#3e4e68",
            },
          },
          axisLabel: {
            textStyle: {
              color: "white",
              fontSize: that.$setFontSize(16),
            },
          },
        },
        series: [
          {
            name: "降雨量",
            type: "line",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: that.$setFontSize(16),
                  },
                },
              },
            },

            itemStyle: {
              normal: {
                lineStyle: {
                  color: "rgb(1,255,255)",
                },
              },
            },
          },
        ],
      };
      return option;
    },
    // 视频点击
    videoClick(e) {
      // this.videoOBj.clicked = !this.videoOBj.clicked;
      this.$refs.VideoTree.$emit("show", { saveEvent: e });
      // this.$refs.videoBtnUpLayer.saveEvent = e;
    },
    // 视频点击
    videoClickClose() {
      this.videoOBj.clicked = !this.videoOBj.clicked;
    },
    // 关闭或隐藏--选择
    clickOpationFixed(type) {
      this.centerFixedLeftType =
        this.centerFixedLeftType === "toLeft" ? "toRight" : "toLeft";
    },
    // 关闭或隐藏所有
    clickAllOpationFixed(type) {
      this.centerAllFixedLeftType =
        this.centerAllFixedLeftType === "show" ? "hidden" : "show";
    },
    // 弹窗点击查询和分页
    centerPopOneChangePages(pages, pageSize) {
      console.log(pages, pageSize);
    },
    //
    centerPopTwoChangePages(pages, pageSize) {
      console.log(pages, pageSize);
    },
    centerPopThreeObjChangePages(pages, pageSize) {
      console.log(pages, pageSize);
      this.limitParams.page = pages.pages;
      this.centerPopThreeObj.currentPage = pages.pages;
      this.doGetReponsePlan(); // 全市三防-应急预案
    },
    centerPopFourObjChangePages(pages, pageSize) {
      console.log(pages, pageSize);
    },
    videoOBjChangePages(pages, pageSize) {
      console.log(pages, pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
.command-table {
  width: 1840vw * @w;
  height: 700vh * @h;
}
.command-table2 {
  width: 2500vw * @w;
}
.command-table3 {
  width: 750vw * @w;
}
.command-table4 {
  width: 979vw * @w;
}
</style>
