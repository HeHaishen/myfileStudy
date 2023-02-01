<!--
 * @Description: 大屏-森林防火-平时
 * @Version: 1.0
 * @Autor: SuDe
 * @LastEditors: JiaJun Wu
 * @Date: 2021-06-01 15:40:52
 * @LastEditTime: 2021-10-27 10:20:34
-->
<template>
  <div class="forest-fire">
    <!-- 天地图 -->
    <div class="show-map">
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
    <Header :title="'全市森林防火一张图'" />
    <!-- 左侧模块-开始 -->
    <div class="forest-left">
      <div class="forest-left-top">
        <div class="left-top-meteorology">
          <div class="meteorology-title">气象实时信息展示</div>
          <div class="meteorology-show">
            <ul>
              <li @click="temperatureClick($event, 0)">
                <div class="li-content-img">
                  <img
                    src="../../assets/images/forestFire/img_sun.png"
                    alt=""
                  />
                </div>
                <div class="li-content-detail">
                  <p class="li-now-tem">{{ temObjShow.nowTem }}</p>
                  <p class="li-about-tem">{{ temObjShow.tem }}</p>
                  <p class="li-now-unit">℃</p>
                  <p class="li-now-state">{{ temObjShow.weatherDesc }}</p>
                </div>
              </li>
              <li>
                <div class="li-content-logo">
                  <p class="li-img-icon">
                    <img
                      src="../../assets/images/forestFire/img_humidity.png"
                      alt=""
                    />
                  </p>
                  <p class="li-img-text">湿度</p>
                </div>
                <div class="li-content-detail detail-padding">
                  <p>比较湿度</p>
                  <p>{{ temObjShow.waterTem }}</p>
                </div>
              </li>
              <li @click="windClick($event, 1)">
                <div class="li-content-logo">
                  <p class="li-img-icon">
                    <img
                      src="../../assets/images/forestFire/img_wind_direction.png"
                      alt=""
                    />
                  </p>
                  <p class="li-img-text">风力风向</p>
                </div>
                <div class="li-content-detail detail-padding">
                  <p>{{ temObjShow.windDirection }}</p>
                  <p>{{ temObjShow.windStrength }}</p>
                </div>
              </li>
              <li @click="thunderClick($event, 2)">
                <div class="li-content-logo">
                  <p class="li-img-icon">
                    <img
                      src="../../assets/images/forestFire/img_thunder.png"
                      alt=""
                    />
                  </p>
                  <p class="li-img-text">雷电</p>
                </div>
                <div class="li-content-detail detail-padding" v-show="false">
                  <p>西南风向</p>
                  <p>微风&nbsp;&nbsp;&lt;3级</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="meteorology-chart">
            <div class="meteorology-chart-line"></div>
            <div class="meteorology-chart-line"></div>
          </div>
        </div>
        <div class="left-top-right">
          <div class="left-wood-fire">
            <div>森林防灾危害程度预测模型</div>
          </div>
          <div class="fire-holiday-statistics">
            <div class="fire-model-title">易着火节日统计</div>
            <ul>
              <li
                v-for="(item, index) in festivalList"
                :key="item.key"
                @click="festivalClick($event, index)"
                :style="[index === 0 ? { 'margin-right': '144px' } : '']"
              >
                <p class="fire-holiday-number">{{ item.num }}</p>
                <p class="fire-holiday-unit">起</p>
                <p class="fire-holiday-type">{{ item.name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="forset-left-bottom">
        <div class="left-bottom-content">
          <div class="fire-model-title">当前救火物资情况</div>
          <ul class="left-bottom-material" v-if="disasterReliefList.length">
            <li
              v-for="(item, index) in disasterReliefList"
              :key="index"
              @click="fightingMaterialsClick($event, index)"
            >
              <img class="material-img" :src="item.url" alt="" />
              <div class="material-detail">
                <p class="material-detail-type">{{ item.materialName }}</p>
                <p class="material-detail-number">{{ item.materialNum }}</p>
                <p class="material-detail-unit">{{ item.unit }}</p>
              </div>
            </li>

            <!-- <li >
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_car.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">消防车</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">辆</p>
              </div>
            </li>
			   <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_annihilator.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">灭火器</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">个</p>
              </div>
            </li>
            <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_helicopter.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">直升机</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">辆</p>
              </div>
            </li>
            <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_UAV.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">无人机</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">个</p>
              </div>
            </li>
            <li>
              <img
                class="material-img"
                src="../../assets/images/forestFire/icon_people.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">防护服</p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">件</p>
              </div>
            </li>
            <li>
				<img
                class="material-img"
                src="../../assets/images/forestFire/icon_spray.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">喷雾机</p></p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">台</p>
			  </div>
			</li>
            <li>
				<img
                class="material-img"
                src="../../assets/images/forestFire/icon_satellite_phone.png"
                alt=""
              />
              <div class="material-detail">
                <p class="material-detail-type">卫星电话</p></p>
                <p class="material-detail-number">36540</p>
                <p class="material-detail-unit">台</p>
			  </div>
			</li> -->
          </ul>
        </div>
        <div class="left-bottom-content left-bottom-margin file-model-all">
          <div class="fire-model-title">当前救火队伍情况</div>
          <div class="fire-list-header">
            <p>队伍名称</p>
            <p>在岗</p>
            <p>请假</p>
            <p>退役</p>
          </div>
          <ul class="fire-list-content" v-if="saveFireTeamList.length">
            <vue-seamless-scroll
              :data="saveFireTeamList"
              :class-option="defaultOption"
            >
              <li
                class="swiper-slide"
                v-for="(item, index) in saveFireTeamList"
                :key="index"
              >
                <div>
                  <a-icon
                    style="color: #00eaff"
                    type="phone"
                    @click="clickToPhone(item, index, $event)"
                  />
                  <span @click="fireTeamClick(item, index)">{{
                    item.name
                  }}</span>
                </div>
                <div
                  style="cursor: pointer"
                  @click="showTeamDetail(item, index, $event)"
                >
                  {{ item.onDutyNum }}
                </div>
                <div>{{ item.leaveNum }}</div>
                <div>{{ item.retireNum }}</div>
              </li>
            </vue-seamless-scroll>
            <!-- <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li> -->
          </ul>
        </div>
        <div class="left-bottom-content file-model-all">
          <div class="fire-model-title">森林火灾专家情况</div>
          <div class="fire-list-header">
            <p>所在单位</p>
            <p>在岗</p>
            <p>请假</p>
            <p>退役</p>
          </div>
          <ul class="fire-list-content">
            <vue-seamless-scroll
              :data="nowTeamExpertList"
              :class-option="defaultOption"
            >
              <li v-for="(item, index) in nowTeamExpertList" :key="index">
                <div>
                  <a-icon
                    type="phone"
                    style="color: #00eaff"
                    @click="clickToPhone(item, index, $event)"
                  />
                  <span @click="teamExpertClick(item, index)">{{
                    item.name
                  }}</span>
                </div>
                <div @click="showExpertDetail(item, index, $event)">
                  {{ item.onDutyNum }}
                </div>
                <div>{{ item.leaveNum }}</div>
                <div>{{ item.retireNum }}</div>
              </li>
            </vue-seamless-scroll>
            <!-- <li>
				  <div>救援队伍名称1</div>
				  <div>5000</div>
				  <div>5000</div>
				  <div>5000</div>
			  </li> -->
          </ul>
        </div>
      </div>
      <div class="center-fixed-icon" style="width: auto">
        <div
          class="btn-video"
          @click="clickSearch($event)"
          style="
            border: 1px solid #00ffff;
            color: #00ffff;
            font-size: 32px;
            display: flex;
            align-item: center;
            justify-content: center;
            margin-bottom: 10px;
          "
        >
          <a-icon type="zoom-in" />
        </div>
        <div class="btn-video" @click="videoTreeClick($event)">
          <img
            src="../../assets/images/theCityThreeProofing/icon_video.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- 左侧模块-结束 -->
    <!-- 火灾统计-开始 -->
    <div class="forest-center" v-if="false">
      <div class="fire-model-title" style="padding-right: 120px">
        2020年火灾统计
      </div>
      <ul class="forest-center-list">
        <li>
          <div class="center-list-event">2.13增城区**生大火灾</div>
          <div class="center-list-detail">
            <p>死亡：<span>1</span>人</p>
            <p>重伤：<span>5</span>人</p>
            <p>损失：<span>1200W</span></p>
          </div>
        </li>
        <li>
          <div class="center-list-event">2.13增城区**生大火灾</div>
          <div class="center-list-detail">
            <p>死亡: <span>1</span>人</p>
            <p>重伤: <span>5</span>人</p>
            <p>损失：<span>1200W</span></p>
          </div>
        </li>
        <li>
          <div class="center-list-event">2.13增城区**生大火灾</div>
          <div class="center-list-detail">
            <p>死亡: <span>1</span>人</p>
            <p>重伤: <span>5</span>人</p>
            <p>损失：<span>1200W</span></p>
          </div>
        </li>
        <li>
          <div class="center-list-event">2.13增城区**生大火灾</div>
          <div class="center-list-detail">
            <p>死亡: <span>1</span>人</p>
            <p>重伤: <span>5</span>人</p>
            <p>损失：<span>1200W</span></p>
          </div>
        </li>
        <li>
          <div class="center-list-event">2.13增城区**生大火灾</div>
          <div class="center-list-detail">
            <p>死亡: <span>1</span>人</p>
            <p>重伤: <span>5</span>人</p>
            <p>损失：<span>1200W</span></p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 火灾统计-结束 -->
    <div class="forest-right">
      <div class="forest-right-left">
        <div class="right-left-connection">
          <div class="fire-model-title">物联点数据实时展示</div>
          <div class="connection-datas">
            <p>
              设备监控总数:<span>{{ conectionObj.total }}</span
              >台
            </p>
            <p>
              异常设备:<span>{{ conectionObj.abnormalNum }}</span
              >台
            </p>
          </div>
          <div class="connection-chart"></div>
        </div>
        <div class="right-left-uav">
          <div class="fire-model-title" @click="UAVVideoClick">无人机视频</div>
          <div class="uav-list-wrap">
            <ul class="left-uav-list">
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
            </ul>
          </div>

          <div class="left-uav-title" @click="monitoringVideoClick">
            监控点视频
          </div>
          <div class="uav-list-wrap">
            <ul class="left-uav-list">
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div>
                  <video
                    src="../../assets/media/nua.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
            </ul>
            <ul class="left-uav-list">
              <li>
                <div></div>
              </li>
              <li>
                <div></div>
              </li>
              <li>
                <div></div>
              </li>
              <li>
                <div></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="forest-right-right">
        <div class="right-left-water">
          <div class="fire-model-title">当前主要蓄水情况</div>
          <div class="water-chart-btn">
            <p v-for="(item, index) in waterBtnList" :key="index">
              {{ item.name }}
            </p>
          </div>
          <div class="water-chart"></div>
        </div>
        <div class="right-left-fire">
          <div class="fire-model-title">历年火灾趋势图</div>
          <div class="fire-chart"></div>
          <div class="fire-chart"></div>
        </div>
      </div>
    </div>
    <!-- 植被信息-开始 -->
    <div class="forest-message">
      <!-- 全市植被统计-开始 -->
      <div
        class="forest-vegetation"
        :style="vegetationShow ? vegetationShowObj : vegetationHiddenObj"
      >
        <div class="forest-vegetation-hidden" v-if="!vegetationShow">
          <p class="vegetation-title-center">全市植被统计</p>
          <p
            class="vegetation-title-open"
            @click="toShowVegetation('vegetationShow')"
          >
            ▲
          </p>
        </div>
        <div class="forest-vegetation-title" v-if="vegetationShow">
          <p class="vegetation-title-icon"></p>
          <p class="vegetation-title-text">全市植被统计</p>
          <p
            class="vegetation-title-close"
            @click="toHiddenVegetation('vegetationShow')"
          >
            X
          </p>
        </div>
        <div class="forest-vegetation-statices">
          <p>
            全市珍惜植被共计:<span>{{ cityVegetationCount.area }}</span
            >亩
          </p>
          <p>
            被烧珍惜植被共计:<span>{{ cityVegetationCount.damageArea }}</span
            >亩
          </p>
        </div>
        <ul class="forest-vegetation-list">
          <li
            v-show="cityVegetationCount.countyVegetationCountList"
            v-for="(
              item, index
            ) in cityVegetationCount.countyVegetationCountList"
            :key="index"
          >
            <div class="li-num">
              <p>{{ item.area }}<span>亩</span></p>
            </div>
            <div class="li-name">{{ item.countyName }}</div>
          </li>
          <!-- <li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li> -->
        </ul>
      </div>
      <!-- 全市植被统计-结束 -->

      <!-- 查看植被信息-开始 -->
      <div
        v-show="false"
        class="forest-vegetation"
        :style="checkVegetationInfo ? vegetationShowObj : vegetationHiddenObj"
      >
        <div class="forest-vegetation-hidden" v-if="!checkVegetationInfo">
          <p class="vegetation-title-center">查看植被信息</p>
          <p
            class="vegetation-title-open"
            @click="toShowVegetation('checkVegetationInfo')"
          >
            ▲
          </p>
        </div>
        <div class="forest-vegetation-title" v-if="checkVegetationInfo">
          <p class="vegetation-title-icon"></p>
          <p class="vegetation-title-text">查看植被信息</p>
          <p
            class="vegetation-title-close"
            @click="toHiddenVegetation('checkVegetationInfo')"
          >
            X
          </p>
        </div>
        <div class="forest-vegetation-statices">
          <p>全市珍惜植被共计:<span>1023</span>亩</p>
          <p>被烧珍惜植被共计:<span>236</span>亩</p>
        </div>
        <ul class="forest-vegetation-list">
          <li>
            <div class="li-num">
              <p>30<span>亩</span></p>
            </div>
            <div class="li-name">天河</div>
          </li>
          <li>
            <div class="li-num">
              <p>30<span>亩</span></p>
            </div>
            <div class="li-name">天河</div>
          </li>
          <li>
            <div class="li-num">
              <p>30<span>亩</span></p>
            </div>
            <div class="li-name">天河</div>
          </li>
          <li>
            <div class="li-num">
              <p>30<span>亩</span></p>
            </div>
            <div class="li-name">天河</div>
          </li>
        </ul>
      </div>
      <!-- 查看植被信息-结束 -->

      <!-- 查看水源信息-开始 -->
      <div
        class="forest-vegetation"
        :style="waterInfo ? vegetationShowObj : vegetationHiddenObj"
      >
        <div class="forest-vegetation-hidden" v-if="!waterInfo">
          <p class="vegetation-title-center">水源信息</p>
          <p
            class="vegetation-title-open"
            @click="toShowVegetation('waterInfo')"
          >
            ▲
          </p>
        </div>
        <div class="forest-vegetation-title" v-if="waterInfo">
          <p class="vegetation-title-icon"></p>
          <p class="vegetation-title-text">水源信息</p>
          <p
            class="vegetation-title-close"
            @click="toHiddenVegetation('waterInfo')"
          >
            X
          </p>
        </div>
        <div class="forest-vegetation-statices">
          <p>
            全市水资源被共计:<span>{{ waterInfoObj.waterTield }}</span
            >亩
          </p>
          <!-- <p>被烧珍惜植被共计:<span>236</span>亩</p> -->
        </div>
        <ul class="forest-vegetation-list">
          <li
            v-for="(item, index) in waterInfoObj.countyReservoirCountList"
            :key="index"
          >
            <div class="li-num">
              <p>{{ item.waterTield }}<span>亩</span></p>
            </div>
            <div class="li-name">{{ item.countyName }}</div>
          </li>
          <!-- <li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li>
				<li>
					<div class="li-num">
						<p>30<span>亩</span></p>
					</div>
					<div class="li-name">天河</div>
				</li> -->
        </ul>
      </div>
      <!-- 查看水源信息-结束 -->
    </div>
    <!-- 植被信息-结束 -->
    <div class="forest-menu"></div>

    <div
      class="right-menu"
      style="
        height: auto;
        width: 186px;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 6667;
      "
    >
      <Menu></Menu>
    </div>
    <VideoTree ref="VideoTree" style="z-index: 9999"></VideoTree>
    <RealTimeDisplay ref="RealTimeDisplay"></RealTimeDisplay>
    <FightingMaterials ref="FightingMaterials"></FightingMaterials>
    <FireFestival ref="FireFestival"></FireFestival>
    <searchModel ref="SearchModel" />
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
    <IOTData ref="IOTChart"></IOTData>
    <UAVVideo ref="UAVVideo"></UAVVideo>
    <MonitoringVideo ref="MonitoringVideo"></MonitoringVideo>
    <teamDetail ref="TeamDetail" />
    <ContactPhone ref="ContactPhoneAll" />
  </div>
</template>
<script>
import Header from "@/components/APicture/header";
import Menu from "@/components/APicture/menu";
import {
  vegetationCount,
  nowDisasterRelief,
  nowFireBrigade,
  nowTeamExpert,
  iotVideoCount,
  fileCountByCity,
  fileCountByYear,
  reservoirCountByMonth,
  cityVegetationCount,
  getWeather,
} from "@/api/forestFire";
import {
  getNowWeater,
  getSeventDayWeater
} from "@/api/floodPreventionWar"
import vueSeamlessScroll from "vue-seamless-scroll";
import VideoTree from "@/components/APicture/videoTree/index.vue";

import RealTimeDisplay from "./component/realTimeDisplay/index.vue";
import FightingMaterials from "./component/fightingMaterials/index.vue";
import FireFestival from "./component/fireFestival/index.vue";
import IOTData from "./component/IOTData/index.vue";
import UAVVideo from "./component/UAVVideo/index.vue";
import MonitoringVideo from "./component/monitoringVideo/index.vue";

import searchModel from "@/components/APicture/search/index.vue";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import teamDetail from "./component/teamDetail";
import moment from "moment";
export default {
  props: {},
  components: {
    Header,
    Menu,
    vueSeamlessScroll,
    VideoTree,
    searchModel,
    ContactPhone,
    MessageSend,
    RealTimeDisplay,
    FightingMaterials,
    FireFestival,
    IOTData,
    UAVVideo,
    MonitoringVideo,
    teamDetail,
  },
  data() {
    return {
      pageType: "show",
      festivalList: [
        { name: "春节", key: 1, num: 8 },
        { name: "清明", key: 2, num: 81 },
      ],
      // 当前救灾物资
      disasterReliefList: [
        {
          url: require("../../assets/images/forestFire/icon_car.png"),
          materialName: "消防处",
          materialNum: 0,
          unit: "辆",
        },
        {
          url: require("../../assets/images/forestFire/icon_annihilator.png"),
          materialName: "灭火器",
          materialNum: 0,
          unit: "个",
        },
        {
          url: require("../../assets/images/forestFire/icon_helicopter.png"),
          materialName: "直升机",
          materialNum: 0,
          unit: "辆",
        },
        {
          url: require("../../assets/images/forestFire/icon_UAV.png"),
          materialName: "无人机",
          materialNum: 0,
          unit: "辆",
        },
        {
          url: require("../../assets/images/forestFire/icon_people.png"),
          materialName: "防护服",
          materialNum: 0,
          unit: "套",
        },
        {
          url: require("../../assets/images/forestFire/icon_spray.png"),
          materialName: "喷雾机",
          materialNum: 0,
          unit: "台",
        },
        {
          url: require("../../assets/images/forestFire/icon_satellite_phone.png"),
          materialName: "卫星电话",
          materialNum: 0,
          unit: "台",
        },
        {
          url: require("../../assets/images/forestFire/icon_chain_saw.png"),
          materialName: "油锯",
          materialNum: 0,
          unit: "台",
        },
      ],
      // 当前救火队伍情况
      saveFireTeamList: [],
      // 救火专家队伍情况
      nowTeamExpertList: [],
      // 植被信息隐藏显示

      checkVegetationInfo: false, // 查看植被信息

      // 植被信息-显示
      vegetationShowObj: {
        height: "auto",
      },
      // 植被信息-隐藏
      vegetationHiddenObj: {
        height: "65px",
        overflow: "hidden",
      },
      // 主要蓄水统计按钮切换
      waterBtnList: [
        { key: 0, name: "全市" },
        { key: 1, name: "范围内" },
      ],
      //全市植被信息
      vegetationShow: false, // 全是植被信息-详情显示隐藏
      cityVegetationCount: {
        showDetail: false,
        area: null, // 全市珍惜植被总面积（亩）
        countyVegetationCountList: [], // 区域植被集合
        damageArea: null, // 被烧珍惜植被总面积（亩）
      },
      // 查看水资源信息
      waterInfo: false, //水源信息
      waterInfoObj: {
        waterTield: null,
        countyReservoirCountList: [],
      }, //水源信息
      // chart数据--元素容器
      temperatureOneDiv: null, // 温度统计1
      temperatureTwoDiv: null, // 温度统计1
      connectionChartDiv: null, // 物联点实时数据统计
      conectionObj: {
        abnormalNum: 0,
        total: 0,
      },
      waterDiv: null, // 当前主要蓄水情况div
      fireYearDiv: null, // 历年火灾趋势图
      fireCountDiv: null, // 全国主要城市火灾趋势图
      temObjShow: {
        nowTem: null,
        tem: null, // 温度
        waterTem: null, // 湿度,
        windDirection: null, // 风向
        windStrength: null, //
        weatherDesc: null, // 天气状态
      },
    };
  },
  created() {
    this.getVegetationCount();
    // 当前救灾
    this.getNowDisasterRelief();
    // 当前队伍就火
    this.getNowFireBrigade();
    // 森林火灾专家情况
    this.getNowTeamExpert();
    // 查看全市水资源信息
    this.getCityVegetationCount();
    this.doGetNowWeater()
    this.doGetSeventDayWeater()
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
    this.$nextTick(() => {
      this.initChart();
      if (this.$route.query && this.$route.query.isScale) {
        // 当路由带有isScale===true,触发缩放
        this.initScale();
      } else {
        this.init();
      }
    });
  },
  beforeDestroy() {
    pGzznCore.closeLayer3D();
    pGzznCore = null;
  },
  methods: {
    init() {
      layerLocation = $(".forest-left").width();
      mapToolLocation = $(".forest-right").width() + 252;
      // pGzznCore = new gzznCore("crystalContainer");
      // pGzznCore.FlyTo();
    },
    // 初始化Echart图
    initChart() {
      // 温度统计1
      this.getWeatherFun().then((res) => {
        this.temperatureOneDiv = this.$echarts.init(
          document.getElementsByClassName("meteorology-chart-line")[0]
        );
        let resDatas = {
          titleName: "温度统计",
          seriesName: "温度统计",
          ...res,
        };
        if(!resDatas.xDabaList){
          resDatas.xDabaList = []
          for(let x =0;x<7;x++){
            let text = (new Date().getHours()+x)+ ":00"
            resDatas.xDabaList.push(text)
            
          }
          resDatas.seriesDataList= [30,31,28,30,30,27,26]
        }
        this.temperatureOneDiv.setOption(this.temperatureOneChart(resDatas));
      });
      // 温度统计2
      this.getWeatherFun().then((res) => {
        this.temperatureTwoDiv = this.$echarts.init(
          document.getElementsByClassName("meteorology-chart-line")[1]
        );
         if(!res.xDabaListWater){
          res.xDabaListWater = []
          for(let x =0;x<7;x++){
            let text = (new Date().getHours()+x)+ ":00"
            res.xDabaListWater.push(text)
            
          }
          res.seriesDatWateraList= [30,40,28,30,30,40,28]
        }
        let resDatas = {
          titleName: "湿度统计",
          seriesName: "湿度统计",
          xDabaList: res.xDabaListWater,
          seriesDataList: res.seriesDatWateraList,
        };
        this.temperatureTwoDiv.setOption(this.temperatureOneChart(resDatas));
      });
      // 物联点实时数据统计
      this.getIotVideoCount().then((res) => {
        console.log("物联点数据实时展示", res);
        this.connectionChartDiv = this.$echarts.init(
          document.getElementsByClassName("connection-chart")[0]
        );
        this.connectionChartDiv.setOption(this.connectionChart(res));

        let that = this;
        this.connectionChartDiv.on("click", (data) => {
          that.$refs.IOTChart.$emit("show", {
            // saveEvent:data,
            name: data.name,
          });
          console.log("物联点实时数据统计", data);
        });
      });
      // 当前主要蓄水情况
      this.getReservoirCountByMonth().then((res) => {
        this.waterDiv = this.$echarts.init(
          document.getElementsByClassName("water-chart")[0]
        );
        this.waterDiv.setOption(this.waterChart(res));
      });
      // 历年火灾趋势图fireChart fireCountChart
      this.getFileCountByCity().then((res) => {
        this.fireYearDiv = this.$echarts.init(
          document.getElementsByClassName("fire-chart")[0]
        );
        this.fireYearDiv.setOption(this.fireChart(res));
      });
      this.getFileCountByYear().then((res) => {
        console.log(888888888888);
        this.fireCountDiv = this.$echarts.init(
          document.getElementsByClassName("fire-chart")[1]
        );
        this.fireCountDiv.setOption(this.fireCountChart(res));
      });
    },
    // 初始化放大处理
    initScale() {
      const heightClint = document.querySelector("body").clientHeight;
      const widthClint = document.querySelector("body").clientWidth;
      const columnNum = heightClint / 1889;
      const widthScrac = parseFloat((widthClint / 9120).toFixed(2)); // 宽度
      const leftDiv = document.querySelector(".forest-left");
      const rightDiv = document.querySelector(".forest-right");
      const showMapDiv = document.querySelector(".show-map"); // 地图
      const envCenterInfo = document.querySelector("#envCenterInfo"); // 地图信息
      const forestVegetation = document.querySelector(".forest-message"); //
      leftDiv.style.transform = `scale(${widthScrac},${columnNum})`;
      leftDiv.style.transformOrigin = "0 0";
      rightDiv.style.transform = `scale(${widthScrac},${columnNum})`;
      rightDiv.style.transformOrigin = "top right";
      const menus = document.querySelector(".right-menu"); // 获取菜单栏
      const cMenus = document.querySelector(".c-menus");
      menus.style.transform = `scale(${widthScrac},${columnNum})`;
      menus.style.transformOrigin = "top right";
      menus.style.top =
        (heightClint - cMenus.clientHeight * columnNum) / 2 + "px"; // 获取菜单栏'90px'
      menus.style.right = 0;
      showMapDiv.style.width = "60%";
      //envCenterInfo.style.transform = `scale(${widthScrac},${columnNum})`;

      layerLocation = leftDiv.getBoundingClientRect().width;
      let rightWidth = rightDiv.getBoundingClientRect().width;
      let mainWidth = document.getElementById("crystalContainer").offsetWidth;
      let clientWidth = document.body.clientWidth;
      let tempWidth = (clientWidth - mainWidth) / 2;
      if (rightWidth > tempWidth) {
        mapToolLocation = rightWidth - tempWidth + 1433;
      }
      if (clientWidth < 3000) {
        layerLocationWidth = 358;
      }
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo();

      /* // 页面标题
	  const headerTitle =  document.querySelector('.picture-header')
	  headerTitle.style.transform= `scale(${columnNum})`
      headerTitle.style.transformOrigin = 'top left'  */
      this.$nextTick(() => {
        /* console.log("889898999",leftDiv.clientWidth,leftDiv.clientHeight,leftDiv.clientWidth*widthScrac,leftDiv.clientHeight*columnNum )
        console.log('showMapDiv',showMapDiv.clientWidth) */
        let wrapDiv = document.querySelector(".forest-fire");
        /* 左侧 */
        let styleObj = {
          width: leftDiv.clientWidth * widthScrac + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          left: 0,
          // background:"red",
          "background-image":
            "linear-gradient(to right, #182734, #182734, #182734,#182734,#182734, rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
        };
        let leftDivs = document.createElement("div");
        for (let k in styleObj) {
          leftDivs.style[k] = styleObj[k];
        }
        /* 右侧边 */
        let styleObjRight = {
          width: rightDiv.clientWidth * widthScrac + "px",
          height: wrapDiv.clientHeight + "px",
          position: "fixed",
          top: 0,
          right: 0,
          // background:"red",
          "background-image":
            "linear-gradient(to left, #182734, #182734, #182734, #182734,#182734,rgba(20, 27, 53, 0.4))",
          "box-shadow": "0 0 190px rgba(20, 27, 53, 1)",
        };
        let cRightDivs = document.createElement("div");
        for (let k in styleObjRight) {
          cRightDivs.style[k] = styleObjRight[k];
        }
        // leftDivs.setAttributes("class","cread-element-left")
        wrapDiv.appendChild(leftDivs);
        wrapDiv.appendChild(cRightDivs);
        // leftDivs.style.width = styleObj.width
        // leftDivs.style.height = styleObj.height
      });
    },
    // 植被信息显示
    toShowVegetation(type) {
      this["" + type] = true;
    },
    // 隐藏植被信息
    toHiddenVegetation(type) {
      this["" + type] = false;
    },
    // 获取全市植被
    getVegetationCount() {
      vegetationCount().then((res) => {
        if (res) {
          if (res.body) {
            this.cityVegetationCount = JSON.parse(JSON.stringify(res.body));
            // this.cityVegetationCount.showDetail = false
          }
        } else {
          this.$message.warning(res.message);
        }
      });
    },
      // 获取当前天气实况
    doGetNowWeater() {
      let monitorStartTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let monitorEndTimes = moment(
        new Date().getTime() + 1000 * 60 * 60
      ).format("YYYY-MM-DD HH:mm:ss");
      // let monitorTimes = moment(new Date()).format("YYYY-MM-DD");
      let sendData = {
        // monitorStartTime: monitorTimes + " 00:00:00",
        // monitorEndTime: monitorTimes + " 23:59:59",
        monitorStartTime,
        monitorEndTimes,
        areaSn: "440111000000",
        source: "GZQX",
      };
      /*    console.log("获取当前天气实况",sendData)
      return false */
      getNowWeater({ body: { ...sendData } })
        .then((res) => {
          console.info("获取当前天气实况222", res);
          if (res.success) {
            if (res.body && res.body.length) {
              const saveResponeList = res.body;
              const saveObj = saveResponeList[0];
              saveObj.windDirectionText = this.$getWindString(
                saveObj["windDirection"]
              );
              this.temObjShow = {
                nowTem: saveObj.temp / 10,
                 tem: `${
                  saveResponeList[saveResponeList.length - 1]["temp"] / 10
                }℃~${saveResponeList[0]["temp"] / 10}℃`, // 温度 // 温度
                waterTem: saveObj.humidity, // 湿度,
                windDirection: saveObj.windDirectionText, // 风向
                windStrength: saveObj.windStrength/10 + "m/s", //
                weatherDesc: saveObj.weatherDesc, // 天气状态
              };
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 获取七天天气
    doGetSeventDayWeater() {
      // let monitorTimes = moment(new Date()).format("YYYY-MM-DD");
      // format("YYYY-MM-DD HH:mm:ss")
      let monitorTimes = moment(new Date()).format("YYYY-MM-DD");
      let monitorEndTime = moment(
        new Date().getTime() + 60 * 60 * 1000 * 24 * 7
      ).format("YYYY-MM-DD");
      let sendData = {
        monitorStartTime: monitorTimes + " 00:00:00",
        monitorEndTime: monitorEndTime + " 23:59:59",
        areaSn: "440111000000",
        source: "GZQX",
      };
      getSeventDayWeater({ 
        body: { ...sendData },
        "sortName": "MONITOR_TIME",
        "sortOrder": "asc" 
      })
        .then((res) => {
          if (res.success) {
            if (res.body && res.body.length) {
              let saveCurrentDay = res.body.find((i, k) => {
                if (i.monitorTime === moment(new Date()).format("YYYY-MM-DD")) {
                  return i;
                }
              });
              if (saveCurrentDay) {
                this.temObjShow.waterTem = saveCurrentDay.humidityDay + "%";
              }
            }
            console.log("7天实时数据", res);
          } else {
            console.log("7天实时数据", res);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
    // 查看全市水资源信息
    getCityVegetationCount() {
      cityVegetationCount().then((res) => {
        if (res) {
          console.log("查看全市水资源", res);
          if (res.body) {
            this.waterInfoObj = JSON.parse(JSON.stringify(res.body));
            // this.cityVegetationCount.showDetail = false
          }
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    // 当前救灾物资
    getNowDisasterRelief() {
      nowDisasterRelief().then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.disasterReliefList.map((item, index) => {
              let saveObj = null;
              saveObj = res.body.find((i, k) => {
                console.log(item.materialName, i.materialName);
                if (item.materialName == i.materialName) {
                  return i;
                }
              });
              if (saveObj) {
                item.materialNum = saveObj.materialNum;
              }
            });
            this.disasterReliefList = JSON.parse(
              JSON.stringify(this.disasterReliefList)
            );
          }
        }
      });
    },
    // 当前救火队伍救火情况
    getNowFireBrigade() {
      nowFireBrigade().then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.saveFireTeamList = res.body;
          }
        }
      });
    },
    // 森林火灾专家情况
    getNowTeamExpert() {
      nowTeamExpert().then((res) => {
        if (res.success) {
          console.log("森林火灾专家情况", res);
          if (res.body && res.body.length) {
            this.nowTeamExpertList = res.body;
          }
        }
      });
    },
    //Echart参数方法
    temperatureOneChart(obj) {
      let option = {
        title: {
          text: obj.titleName,
          itemGap: 30,
          textStyle: {
            color: "#02ffff",
            fontSize: "32px",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "30",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: obj.xDabaList,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "22px",
              },
            },
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "22px",
              },
            },
            splitLine: {
              //网格线
              lineStyle: {
                type: [10, 10],
                dashOffset: 5,
                //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
                color: "#ffffff",
              },
              show: true, //隐藏或显示
            },
          },
        ],
        series: [
          {
            name: obj.seriesName,
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: obj.seriesDataList,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#12486a", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#112b4c", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            lineStyle: {
              color: "#00feff",
            },
          },
        ],
      };
      return option;
    },
    // 物联点数据实时战士
    connectionChart(obj) {
      let option = {
        xAxis: {
          type: "category",
          data: obj.xDabaList,
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "22px",
            },
          },
          lineStyle: {
            type: [10, 10],
            dashOffset: 5,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "22px",
            },
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
              //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
              color: "#ffffff",
            },
            show: true, //隐藏或显示
          },
        },
        series: [
          {
            data: obj.seriesDataList,
            type: "bar",
            barWidth: 42,
            itemStyle: {
              color: "#41ddf6",
            },
          },
        ],
      };
      return option;
    },
    // 当前主要蓄水情况
    waterChart(obj) {
      let option = {
        title: {
          text: "堆叠区域图",
          textStyle: {
            color: "#02ffff",
            fontSize: "32px",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: obj.xDabaList,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "22px",
              },
            },
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "22px",
              },
            },
            splitLine: {
              //网格线
              lineStyle: {
                type: [10, 10],
                dashOffset: 5,
                //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
                color: "#ffffff",
              },
              show: true, //隐藏或显示
            },
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            symbol: "circle",
            symbolSize: 16,
            data: obj.seriesDataList,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#12486a", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#112b4c", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            lineStyle: {
              color: "#00feff",
            },
          },
        ],
      };
      return option;
    },
    // 全市历年火灾趋势图
    fireChart(obj) {
      let option = {
        title: {
          text: "全国主要城市火灾趋势图",
          itemGap: 20,
          textStyle: {
            color: "#ffffff",
            fontSize: "32px",
          },
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "20",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "rbg(16,31,54)",
              color: "#ffffff",
            },
          },
        },
        xAxis: {
          type: "category",
          data: obj.xDabaList,
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "22px",
            },
          },
          lineStyle: {
            type: [10, 10],
            dashOffset: 5,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "22px",
            },
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
              //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
              color: "#ffffff",
            },
            show: true, //隐藏或显示
          },
        },
        series: [
          {
            data: obj.seriesDataList,
            type: "line",
            symbol: "circle",
            symbolSize: 16, //折线点的大小
            itemStyle: {
              normal: {
                color: "#00feff",
                lineStyle: {
                  color: "#00feff",
                },
              },
            },
          },
        ],
      };
      return option;
    },

    // 全国主要城市火灾
    fireCountChart(obj) {
      let option = {
        title: {
          text: "全国主要城市火灾趋势图",
          textStyle: {
            color: "#ffffff",
            fontSize: "32px",
          },
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "rbg(16,31,54)",
              color: "#ffffff",
            },
          },
        },
        xAxis: {
          type: "category",
          data: obj.xDabaList,
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "22px",
            },
          },
          lineStyle: {
            type: [10, 10],
            dashOffset: 5,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "22px",
            },
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: [10, 10],
              dashOffset: 5,
              //type:'dotted', //设置网格线类型 dotted：虚线 ,dashed:虚线,solid:实线
              color: "#ffffff",
            },
            show: true, //隐藏或显示
          },
        },
        series: [
          {
            data: obj.seriesDataList,
            type: "line",
            symbol: "circle",
            symbolSize: 16, //折线点的大小
            itemStyle: {
              normal: {
                color: "#ffc416",
                lineStyle: {
                  color: "#ffc416",
                },
              },
            },
          },
        ],
      };
      return option;
    },
    // Echart 数据获取
    // 物联点数据实时展示
    getIotVideoCount() {
      return new Promise((resolve, reject) => {
        iotVideoCount().then((res) => {
          if (res.success) {
            this.conectionObj = res.body;
            console.log("物联点数据实时展示", res);
            if (
              res.body &&
              res.body.childIotVideoCountList &&
              res.body.childIotVideoCountList.length
            ) {
              let saveList = JSON.parse(
                JSON.stringify(res.body.childIotVideoCountList)
              );
              let xDabaList = [];
              let seriesDataList = [];
              saveList.map((item, index) => {
                xDabaList.push(item.equipName);
                seriesDataList.push(item.sortNum ? item.sortNum : 0);
              });
              resolve({
                xDabaList: xDabaList,
                seriesDataList: seriesDataList,
              });
            } else {
              resolve({
                xDabaList: [],
                seriesDataList: [],
              });
            }
          } else {
            resolve({
              xDabaList: [],
              seriesDataList: [],
            });
          }
        });
      });
    },
    // 全国主要城市火灾趋势图
    getFileCountByCity() {
      return new Promise((resolve, reject) => {
        fileCountByCity()
          .then((res) => {
            if (res.success) {
              if (res.body && res.body.length) {
                let saveList = JSON.parse(JSON.stringify(res.body));
                let xDabaList = [];
                let seriesDataList = [];
                saveList.map((item, index) => {
                  xDabaList.push(item.cityName);
                  seriesDataList.push(item.num ? item.num : 0);
                });
                resolve({
                  xDabaList: xDabaList,
                  seriesDataList: seriesDataList,
                });
              } else {
                resolve({
                  xDabaList: [],
                  seriesDataList: [],
                });
              }
            } else {
              resolve({
                xDabaList: [],
                seriesDataList: [],
              });
            }
          })
          .catch((error) => {
            if (error) {
              reject({
                xDabaList: [],
                seriesDataList: [],
              });
            }
          });
      });
    },
    // 全市历年火灾趋势图
    getFileCountByYear() {
      return new Promise((resolve, reject) => {
        fileCountByYear()
          .then((res) => {
            if (res.success) {
              if (res.body && res.body.length) {
                let saveList = JSON.parse(JSON.stringify(res.body));
                let xDabaList = [];
                let seriesDataList = [];
                saveList.map((item, index) => {
                  xDabaList.push(item.year);
                  seriesDataList.push(item.num ? item.num : 0);
                });
                resolve({
                  xDabaList: xDabaList,
                  seriesDataList: seriesDataList,
                });
              } else {
                resolve({
                  xDabaList: [],
                  seriesDataList: [],
                });
              }
            } else {
              resolve({
                xDabaList: [],
                seriesDataList: [],
              });
            }
          })
          .catch((error) => {
            if (error) {
              reject({
                xDabaList: [],
                seriesDataList: [],
              });
            }
          });
      });
    },
    // 当前蓄水情况
    getReservoirCountByMonth() {
      return new Promise((resolve, reject) => {
        reservoirCountByMonth().then((res) => {
          if (res.success) {
            console.log("dfdfdf", res);
            if (res.body && res.body.length) {
              let saveList = JSON.parse(JSON.stringify(res.body));
              let xDabaList = [];
              let seriesDataList = [];
              saveList.map((item, index) => {
                xDabaList.push(item.month);
                seriesDataList.push(item.num ? item.num : 0);
              });
              resolve({
                xDabaList: xDabaList,
                seriesDataList: seriesDataList,
              });
            } else {
              resolve({
                xDabaList: [],
                seriesDataList: [],
              });
            }
          } else {
            resolve({
              xDabaList: [],
              seriesDataList: [],
            });
          }
        });
      });
    },
    // 温度-湿度echartDatas
    getWeatherFun() {
      return new Promise((resolve, reject) => {
        getWeather("440100000000")
          .then((res) => {
            if (res.success) {
              if (res.body && res.body.length) {
                let saveList = JSON.parse(JSON.stringify(res.body));
                let xDabaList = []; // 温度X轴
                let seriesDataList = []; // 温度数据
                let xDabaListWater = []; // 湿度X轴
                let seriesDatWateraList = []; // 湿度数据
                saveList.map((item, index) => {
                  if (index < 7) {
                    xDabaList.push(item.monitorTime.slice(-5));
                    seriesDataList.push(item.temp ? item.temp : 0);
                    xDabaListWater.push(item.monitorTime.slice(-5));
                    seriesDatWateraList.push(item.humidity);
                  }
                });
               /*  this.temObjShow = JSON.parse(
                  JSON.stringify({
                    nowTem: saveList[0].temp,
                    tem: `${saveList[0].temp}℃~${
                      saveList[saveList.length - 1].temp
                    }℃`, // 温度
                    waterTem: `${saveList[0].humidity}~${
                      saveList[saveList.length - 1].humidity
                    }`, // 湿度,
                    windDirection: `${saveList[0].windDirection}`, // 风向
                    windStrength: `${saveList[0].windStrength}`,
                    weatherDesc: saveList[0].weatherDesc, //
                  })
                ); */
                resolve({
                  xDabaList: xDabaList,
                  seriesDataList: seriesDataList,
                  xDabaListWater: xDabaListWater,
                  seriesDatWateraList: seriesDatWateraList,
                });
              } else {
                resolve({
                  // xDabaList: xDabaList,
                  // seriesDataList: seriesDataList,
                  // xDabaListWater: xDabaListWater,
                  // seriesDatWateraList: seriesDatWateraList,
                });
              }
            } else {
              resolve({
                // xDabaList: xDabaList,
                // seriesDataList: seriesDataList,
                // xDabaListWater: xDabaListWater,
                // seriesDatWateraList: seriesDatWateraList,
              });
            }
          })
          .catch((error) => {
            if (error) {
              reject({
                // xDabaList: xDabaList,
                // seriesDataList: seriesDataList,
                // xDabaListWater: xDabaListWater,
                // seriesDatWateraList: seriesDatWateraList,
              });
            }
          });
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
    // 救火队伍-点击
    fireTeamClick(item, index) {
      pGzznCore.addPromiseFireTeamLocation(item);
    },
    // 救火专家-点击
    teamExpertClick(item, index) {
      pGzznCore.addPromiseFireExpertLocation(item);
    },
    // 防火物资-点击
    // 点击出现视频树
    videoTreeClick($event) {
      console.log($event, this.$refs.VideoTree);
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
    },

    // 气象实时信息展示 点击出现气象弹窗
    temperatureClick($event, index) {
      console.log("气象实时信息展示", $event, this.$refs.RealTimeDisplay);
      this.$refs.RealTimeDisplay.$emit("show", {
        saveEvent: $event,
        activeIndex: index,
      });
    },

    // 风力方向
    windClick($event, index) {
      console.log("气象实时信息展示", $event, this.$refs.RealTimeDisplay);
      this.$refs.RealTimeDisplay.$emit("show", {
        saveEvent: $event,
        activeIndex: index,
      });
    },

    // 雷电
    thunderClick($event, index) {
      console.log("气象实时信息展示", $event, this.$refs.RealTimeDisplay);
      this.$refs.RealTimeDisplay.$emit("show", {
        saveEvent: $event,
        activeIndex: index,
      });
    },

    // 易着火节日统计
    festivalClick($event, index) {
      console.log("易着火节日统计", $event, this.$refs.FireFestival);
      this.$refs.FireFestival.$emit("show", {
        saveEvent: $event,
        activeIndex: index,
      });
    },

    // 无人机视频
    UAVVideoClick() {
      // 子传父
      this.$refs.UAVVideo.$emit("show");
    },

    // 监控点视频
    monitoringVideoClick() {
      this.$refs.MonitoringVideo.$emit("show");
    },

    // 当前救火物资情况
    fightingMaterialsClick($event, index) {
      console.log(
        "当前救火物资情况",
        $event,
        index,
        this.$refs.FightingMaterials
      );
      this.$refs.FightingMaterials.$emit("show", {
        saveEvent: $event,
        activeIndex: index,
      });
    },

    // 点击搜索
    clickSearch($event) {
      this.$refs.SearchModel.$emit("show", { saveEvent: $event });
    },
    // 当前救火队伍详情
    showTeamDetail(i, k, e) {
      this.$refs.TeamDetail.$emit("show", {
        ...i,
        key: k,
        saveEvent: e,
        title: i.name,
      });
    },
    // 点击电话icons
    clickToPhone(i, k, e) {
     /*  console.log("应急专家", i);
      return false; */
      i.phone = i.contact;
      let { name, phone } = i;
      this.$refs.ContactPhoneAll.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone,
        item: i,
      });
    },
    showExpertDetail(i, k, e) {
      this.$refs.TeamDetail.$emit("show", {
        ...i,
        key: k,
        saveEvent: e,
        title: i.name,
        pageType:'expert'
      });
    }
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>

<style scoped="scoped" lang="less">
@import "./index.less";
</style>
