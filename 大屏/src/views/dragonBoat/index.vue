<!--
 * @Description: 龙舟水应急-战士
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-06-08 09:59:22
 * @LastEditTime: 2021-09-15 17:49:35
-->
<template>
  <div class="dragon-boat">
    <div class="layer">
      <layer-consulting ref="LayerConsulting"></layer-consulting>
    </div>
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
    <!-- 天地图-结束 -->

    <!-- 蒙版 -->
    <div class="top-gradient"></div>
    <div class="left-gradient"></div>
    <div class="right-gradient"></div>

    <!-- 头部-开始 -->
    <Header :title="'防暴雨内涝应急救援一张图'"></Header>
    <!-- 头部-结束 -->

    <!-- 左侧-开始 -->
    <div class="dragon-boat-left">
      <!-- <div class="model-title">当前救火物资情况</div> -->
      <div class="left-left">
        <div class="model-title">天气预报</div>
        <div class="left-left-weather">
          <ul class="weather-btn-list">
            <li
              v-for="(item, index) in weatherTypeList"
              :class="[
                index === weatherData.weatherIndex ? 'weather-active' : '',
              ]"
              :key="index"
              @click="onWeather(item, index)"
            >
              {{ item }}
            </li>
          </ul>

          <ul class="weather-msg-list" v-if="weatherData.weatherIndex === 0">
            <a-carousel
              :slidesToShow="5"
              :slidesToScroll="5"
              :autoplay="true"
              :autoplaySpeed="5000"
              :draggable="true"
              :dots="false"
            >
              <li v-for="(item, index) in sixHourList" :key="index">
                <!-- > -->
                <p>{{ item.monitorTime }}</p>
                <p><img :src="item.weatherIcon" alt="" /></p>
                <p>{{ item.weatherType }}</p>
                <p>{{ item.temp }}</p>
              </li>
            </a-carousel>
            <!-- sixHourList
oneDayList -->
          </ul>

          <ul class="weather-msg-list" v-if="weatherData.weatherIndex === 1">
            <a-carousel
              :slidesToShow="5"
              :slidesToScroll="5"
              :autoplay="true"
              :autoplaySpeed="5000"
              :draggable="true"
              :dots="false"
            >
              <li v-for="(item, index) in oneDayList" :key="index">
                <!-- > -->
                <p>{{ item.monitorTime }}</p>
                <p><img :src="item.weatherIcon" alt="" /></p>
                <p>{{ item.weatherType }}</p>
                <p>{{ item.temp }}</p>
              </li>
            </a-carousel>
            <!-- sixHourList
oneDayList -->
          </ul>
          <ul class="weather-msg-list" v-if="weatherData.weatherIndex === 2">
            <a-carousel
              :slidesToShow="5"
              :slidesToScroll="5"
              :autoplay="true"
              :autoplaySpeed="5000"
              :draggable="true"
              :dots="false"
            >
              <li v-for="(item, index) in weatherMSGList" :key="index">
                <!-- > -->
                <p>{{ item.monitorTime }}</p>
                <p><img :src="item.weatherIcon" alt="" /></p>
                <p>{{ item.weatherType }}</p>
                <p>{{ item.temp }}℃</p>
              </li>
            </a-carousel>
            <!-- sixHourList
oneDayList -->
          </ul>
        </div>
        <div class="left-left-map">
          <div class="left-map-path">
            <span
              :class="mapPathActive === '1' ? 'active-span' : ''"
              @click="mapPathClick('1')"
              >降雨量分布</span
            >/
            <span
              :class="mapPathActive === '2' ? 'active-span' : ''"
              @click="mapPathClick('2')"
              >水位监测</span
            >/
            <span
              :class="mapPathActive === '3' ? 'active-span' : ''"
              @click="mapPathClick('3')"
              >台风路径</span
            >
          </div>
          <div class="left-map-img">
            <div
              v-show="false && mapPathActive === '1'"
              id="crystalContainerEx2"
              style="width: 100%; height: 100%"
            ></div>
            <div
              v-show="mapPathActive === '1'"
              id="crystalContainerEx3"
              style="width: 100%; height: 100%"
            >
              <iframe
                :src="rainLinkUrl"
                style="width: 100%; height: 100%"
              ></iframe>
            </div>
            <div
              v-show="mapPathActive === '2'"
              style="width: 100%; height: 100%; overflow: auto"
            >
              <div class="fire-list-header">
                <p>序号</p>
                <p>类型</p>
                <p>名称</p>
                <p>警界水位</p>
                <p>事实水位</p>
                <p>操作</p>
              </div>
              <ul class="fire-list-content" v-if="waterLevelList.length">
                <li v-for="(item, index) in waterLevelList" :key="index">
                  <div>{{ item.keys ? item.keys : "" }}</div>
                  <div>{{ item.type ? item.type : "" }}</div>
                  <div>{{ item.name ? item.name : "" }}</div>
                  <div>{{ item.alertValue ? item.alertValue : "" }}</div>
                  <div>{{ item.value ? item.value : "" }}</div>
                  <div>
                    <span @click="waterLevelPointer(item, index)">定位</span
                    ><span @click="waterLevelDetail(item, index)">详情</span>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-show="mapPathActive === '3'"
              id="crystalContainerEx3"
              style="width: 100%; height: 100%"
            >
              <iframe
                src="https://tf.istrongcloud.com/release/index.html"
                style="width: 100%; height: 100%"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div class="left-right">
        <div class="model-title">指挥调度</div>
        <div class="left-right-tabs">
          <p
            v-for="(item, index) in rightTabsList"
            :class="[leftRightEventIndex === index ? 'right-tabs-active' : '']"
            :key="index"
            @click="leftEventChange(item, index)"
          >
            {{ item.name }}
          </p>
        </div>
        <div class="left-right-scope" v-if="leftRightEventIndex === 1">
          <ul>
            <li
              v-for="(item, index) in scopeList"
              @click="scopeHandelActive(item, index)"
              :class="scopeActive === index ? 'scope-active' : ''"
              :key="index"
            >
              {{ item.name }}
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in scopeTypeList" :key="index">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="left-right-thing" v-if="leftRightEventIndex === 1">
          <div
            class="right-thing-list"
            v-for="(item, index) in thingList"
            :key="index"
          >
            <div class="thing-list-title">
              <p>{{ item.name }}</p>
              <p
                @click="doOpenShow(item, index)"
                :class="[item.active ? 'list-title-active ' : '']"
              >
                ▶
              </p>
            </div>
            <ul
              class="think-list-ul"
              v-show="item.active && item.listData.length"
            >
              <li v-for="(i, k) in item.listData" :key="k">
                <span
                  @click="doChoseThing(index, k, i.active)"
                  :class="[i.active ? 'active-span' : '']"
                  style="
                    color: white;
                    font-size: 26px;
                    text-align: center;
                    line-height: 30px;
                    font-weight: bold;
                  "
                  >{{ i.active ? "✔" : "" }}</span
                ><label> {{ i.ranksName }}</label>
              </li>
            </ul>
            <ul
              class="think-list-model"
              v-show="item.active && item.listDeviceData.length"
            >
              <li v-for="(i, k) in item.listDeviceData" :key="k">
                <div>
                  <img :src="i.iconUrl" alt="" />
                </div>
                <div>
                  <p>
                    <span>{{ i.sortNum }}</span
                    >{{ i.unit }}
                  </p>
                  <p>{{ i.equipName }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 事件列表 -->
        <div
          class="left-bottom-content file-model-all"
          v-if="leftRightEventIndex === 0"
        >
          <div class="fire-list-header">
            <p>发生时间</p>
            <p>内容</p>
            <p>区域</p>
            <p>事件登记</p>
            <p>来源</p>
            <p>操作</p>
          </div>
          <ul class="fire-list-content" v-if="leftRightEventDatatList.length">
            <li v-for="(item, index) in leftRightEventDatatList" :key="index">
              <div>{{ item.created }}</div>
              <div>{{ item.eventName }}</div>
              <div>{{ item.eventPlace }}</div>
              <div>{{ item.reporter }}</div>
              <div>{{ eventSourceType[item.eventSource] }}</div>
              <div><span @click="toPointerHanderl(item)">定位</span></div>
            </li>
          </ul>
        </div>
        <!-- 协同会商 -->
        <div class="left-right-synergy" v-if="leftRightEventIndex === 2">
          <ul class="synergy-list">
            <li v-for="(i, k) in synergyListData" :key="k">
              <span
                @click="synergyClick(i, k)"
                :class="[i.checked ? 'active-span' : '']"
                >{{ i.checked ? "✔" : "" }}</span
              >
              <label>{{ i.name }}</label>
            </li>
          </ul>
          <div class="synergy-btn-wrap">
            <p @click="selectAllTeam('select')">全选</p>
            <p @click="selectAllTeam('cancal')">取消全选</p>
            <p @click="showContactModel">一键会商</p>
            <p @click="showContactModelMore">更多</p>
          </div>
        </div>
      </div>
      <div class="left-fixed" v-if="iconSelectTwoActive">
        <FixedModel />
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
    <!-- 左侧-结束 -->

    <!-- 右侧-开始 -->
    <div class="dragon-boat-right">
      <div class="right-left">
        <div class="right-left-top">
          <div class="model-tabs">
            <p
              v-for="(item, index) in radioTabsList"
              :class="[radioTabsActive === index ? 'right-tabs-active' : '']"
              :key="index"
              @click="radioTabsChange(item, index)"
            >
              {{ item.name }}
            </p>
          </div>
          <ul v-if="radioTabsActive === 1" class="right-right-radiolist">
            <li
              v-for="(item, index) in radioList"
              :key="index"
              :class="[(index + 1) % 2 === 0 ? 'not-margin' : '']"
            >
              <div></div>
            </li>
          </ul>
          <div class="right-left-pointer" v-if="radioTabsActive === 0">
            <!-- <vue-seamless-scroll :data="[radioTabsActiveObj]" :class-option="defaultOption" > -->
            <div>
              <label for="">事件标题：</label
              ><span>{{ radioTabsActiveObj.eventName }}</span>
            </div>
            <div>
              <label for="">接报时间：</label
              ><span>{{ radioTabsActiveObj.receiveTime }}</span>
            </div>
            <div>
              <label for="">事件类型：</label
              ><span>{{ radioTabsActiveObj.eventType==='10008'?'防暴雨内涝':'其他' }}</span>
            </div>
            <div>
              <label for="">事件等级：</label
              ><span>{{ eventLevelObj[radioTabsActiveObj.eventLevel] }}</span>
            </div>
            <div>
              <label for="">事件概述：</label
              ><span>{{ radioTabsActiveObj.eventDiscribe }}</span>
            </div>
            <!-- </vue-seamless-scroll> -->
          </div>
          <div class="right-left-emergency" v-if="radioTabsActive === 2">
            <div class="fire-list-header" style>
              <p style="width:50%">预案名称</p>
              <p style="width:30%">预案类型</p>
              <!-- <p>印发日期</p>
              <p>牵头单位</p> -->
              <p style="width:20%">操作</p>
            </div>
            <ul class="fire-list-content" v-if="emergencyPlanList.length">
              <li
                class="list-content-li"
                v-for="(item, index) in emergencyPlanList"
                :key="index"
              >
                <div style="width:50%">{{ item.reservePlanTitle }}</div>
                <div style="width:30%">{{ item.reservePlanType }}</div>
                <!-- <div>{{ item.created.slice(0, 10) }}</div>
                <div>{{ item.leadingUnit }}</div> -->
                <div style="display: flex; justify-content: center ;width:20%">
                  <span @click="emergencyDetail(item)">查看</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="fire-targeting-msg" v-if="false">
          <div class="fire-model-title">靶向短信</div>
          <div class="targeting-msg-chose">
            <p
              v-for="(item, key) in targetingList"
              :class="[targetingChose === key ? 'chose-p' : '']"
              :key="key"
              @click="doChoseTarget(key)"
            >
              {{ item.name }}
            </p>
          </div>
          <div class="targeting-msg-chart">
            <div class="msg-chart-wrap1">
              <div class="chart-show-number" v-show="targetingChose === 2">
                {{ sendOneK }}
              </div>
              <div class="msg-chart-wrap2">
                <div class="chart-show-number" v-show="targetingChose === 1">
                  {{ sendTwoK }}
                </div>
                <div class="msg-chart-wrap3">
                  <div class="chart-show-number" v-show="targetingChose === 0">
                    {{ sendThreeK }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="targeting-msg-btn" @click="isSendMsg">发送疏散短信</div>
        </div>
        <div class="right-left-bottom" v-if="false">
          <!-- <div class="model-title">视频会商</div> -->
          <div class="model-title" v-if="false">视频监控</div>
          <ul class="right-right-radiolist" v-if="false">
            <li
              v-for="(item, index) in radioList"
              :key="index"
              :class="[(index + 1) % 2 === 0 ? '' : '']"
            >
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
          <!-- 视频会商-内容 -->
          <ul class="right-lefet-meeting" v-if="false">
            <li v-for="(item, index) in userMeetList" :key="index">
              <div class="user-header">
                <p class="user-header-img">
                  <img :src="item.imgUrl" alt="" />
                </p>
                <label v-show="item.type === '1'" class="current">✔</label>
                <label v-show="item.type === '2'" class="link">&lt;</label>
                <label v-show="item.type === '3'" class="delete">-</label>
              </div>
              <div class="user-text">
                {{ item.name }}
              </div>
            </li>
            <li class="user-add">
              <div class="user-header">
                <p class="user-header-img">+</p>
              </div>
              <div class="user-text">邀请</div>
            </li>
          </ul>
        </div>
        <!-- 无人机视频 -->
        <div class="right-left-uav2">
          <div class="fire-model-title">无人机视频</div>
          <div class="uav-list-wrap">
            <ul class="left-uav-list">
              <li>
                <div>
                  <!-- <iframe src="" frameborder="0"></iframe> -->
                  <video
                    src="../../assets/media/waterlogging1.mp4"
                    muted
                    autoplay
                    loop
                    mediatype="video"
                    crossorigin="anonymous"
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div>
                  <video
                    src="../../assets/media/waterlogging2.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div></div>
              </li>
              <li>
                <div></div>
              </li>
            </ul>
          </div>

          <div class="left-uav-title">监控点视频</div>
          <div class="uav-list-wrap">
            <ul class="left-uav-list">
              <li v-for="(i,k) in morningVideoList" :key="k">
                <div>
                  <video controls="controls" :id="`vedioPlayer${k}`" style="height: 100%; width: 100%"></video>
                </div>
              </li>
             <!--  <li>
                <div>
                  <video
                    src="../../assets/media/waterlogging1.mp4"
                    muted
                    autoplay
                    loop
                    style="height: 100%; width: 100%"
                  ></video>
                </div>
              </li>
              <li>
                <div></div>
              </li>
              <li>
                <div></div>
              </li> -->
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
      <div class="right-right">
        <div class="model-title">事件跟踪</div>
        <div class="right-right-title">持续时间：2小时36分钟32秒</div>
        <div class="right-right-content">
          <ul v-if="eventDataList.length">
            <li
              v-for="(item, index) in eventDataList"
              :key="index"
              :class="[index === 0 ? 'first-msg-li' : '']"
            >
              <div class="li-event-title">
                <p>
                  <!-- <img :src="item.iconUrl" alt="" /> -->
                  <span>{{ item.position }}</span>
                  <span>{{ item.name }}</span>
                  <span>{{ item.operatorTime.slice(8, 10) }}日</span>
                  <span>{{
                    item.operatorTime.slice(11, item.operatorTime.length)
                  }}</span>
                </p>
                <label
                  :class="[
                    item.operatorType === '【任务下达】' ? 'green' : 'blue',
                  ]"
                  for=""
                  >{{ item.operatorType }}</label
                >
              </div>
              <div
                v-if="item.content"
                class="li-event-detail"
                :class="[
                  item.operatorType === '【任务下达】'
                    ? 'bg-task'
                    : 'bg-trouble',
                ]"
              >
                {{ item.content }}
              </div>
              <img
                class="li-icon-task"
                src="../../assets/images/dragonBoat/icon_tast_li.png"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 右侧-结束 -->
    <!-- 地图点击事件-开始 -->
    <div class="map-flex-icon icon-one">
      <div class="flex-icon-img" @click="selectDivShow('iconSelectOneActive')">
        <img
          src="../../assets/images/dragonBoat/icon_map-selectone.png"
          alt=""
        />
      </div>
      <div class="map-flex-content" v-if="iconSelectOneActive">
        <div
          style="width: 100%; height: auto"
          v-for="(item, index) in iconSelectOneObj"
          :key="index"
        >
          <p>
            <span
              @click="flexClickAllItem(item, index)"
              :class="[item.active ? 'active-span' : '']"
              style="
                color: white;
                font-size: 26px;
                text-align: center;
                line-height: 30px;
                font-weight: bold;
              "
              >{{ item.active ? "✔" : "" }}</span
            >
            <label>{{ item.typeName }}</label>
          </p>
          <ul>
            <li v-for="(citem, cindex) in item.children" :key="cindex">
              <span
                @click="flexClickliItem(item, index, citem, cindex)"
                :class="[citem.active ? 'active-span' : '']"
                style="
                  color: white;
                  font-size: 26px;
                  text-align: center;
                  line-height: 30px;
                  font-weight: bold;
                "
                >{{ citem.active ? "✔" : "" }}</span
              ><label>{{ citem.typeName }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="map-flex-icon icon-two">
      <div class="flex-icon-img" @click="selectDivShow('iconSelectTwoActive')">
        <img
          src="../../assets/images/dragonBoat/icon_map-selecttow.png"
          alt=""
        />
      </div>
      <!-- <div class="left-fixed" v-if="iconSelectTwoActive">
        <FixedModel />
      </div> -->
      <!-- <div class="map-flex-content" v-if="iconSelectTwoActive"></div> -->
    </div>
    <!-- 地图点击事件-结束 -->
    <!-- 地图浮动内容-开始 -->
    <div class="map-start-model" v-if="false">
      <div class="map-start-title">
        <span></span>
        <label>抢险救援一队</label>
      </div>
      <div class="map-start-content">
        <div>
          <p>车辆：<span>2</span>辆</p>
          <p>人员：<span>36</span>人</p>
        </div>
        <div>
          <p>所有物资：<span></span></p>
        </div>
        <div>
          <p>划艇：<span>36</span>艘</p>
        </div>

        <div>
          <p>救生圈：<span>100</span>个</p>
        </div>
        <div>
          <p>水泵：<span>23</span>个</p>
        </div>
        <div>
          <p>划艇：<span>36</span>艘</p>
        </div>
        <div>
          <img src="../../assets/images/dragonBoat/icon_sun.png" alt="" />
          <img src="../../assets/images/dragonBoat/icon_sun.png" alt="" />
          <img src="../../assets/images/dragonBoat/icon_sun.png" alt="" />
        </div>
      </div>
      <div class="triangle">▼</div>
    </div>
    <!-- 事件轴 -->
    <div class="flex-time-wrap">
      <div class="time-inner">
        <div class="time-line">
          <!-- 刻度 -->
          <div class="calibration">
            <div style="height: 86px">
              <p class="calibration-hours">{{ 0 }}小时</p>
              <p class="calibration-time">
                {{
                  beginTime
                    .toLocaleTimeString("chinese", { hour12: false })
                    .slice(2, -3)
                }}
              </p>
            </div>
            <div
              class="calibration-inner"
              v-for="(item, key) in timmerLineObj.nodeNum"
              :key="item"
              :style="item % 5 === 0 ? 'height:86px' : ''"
            >
              <p v-if="item % 5 === 0 ? true : false" class="calibration-hours">
                {{ item / 5 }}小时
              </p>
              <p v-if="item % 5 === 0 ? true : false" class="calibration-time">
                {{
                  new Date(beginTime.getTime() + (item / 5) * 60 * 1000 * 60)
                    .toTimeString()
                    .slice(0, 5)
                }}
              </p>
              <p
                v-if="
                  new Date(beginTime.getTime() + (item / 5) * 60 * 1000 * 60)
                    .toTimeString()
                    .slice(0, 3) === '00:' && item % 5 === 0
                "
                class="calibration-time"
                style="
                  top: 122px;
                  color: white;
                  width: auto;
                  white-space: nowrap;
                  word-break: keep-all;
                "
              >
                {{
                  new Date(beginTime.getTime() + (item / 5) * 60 * 1000 * 60)
                    .toJSON()
                    .slice(0, 10)
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="hour-number" v-if="false">
          <!-- <p v-for="(item,key) in 25" :key="item">
          {{key < 10 ?'0':''}}{{key}}
        </p> -->
        </div>
        <div class="time-line-green" style="width: 130px">
          <div class="time-modle"></div>
        </div>
      </div>
      <div class="time-period" v-if="sixTimeModelList.length">
        <p
          v-for="(item, index) in sixTimeModelList"
          :key="index"
          :class="[timePointActive === index ? 'point-active' : '']"
          @click="timePointChange(item, index)"
        >
          时间段:{{
            new Date(item)
              .toLocaleString("chinese", { hour12: false })
              .slice(2, -3)
          }}
        </p>
      </div>
      <div class="time-long-show">
        <!-- <p>事件发生时长:<label v-if="saveTimeLong">{{(saveTimeLong - new Date(beginTime).getTime())/6000 }}</label></p> -->
        <p>
          事件发生时长:<label v-if="saveTimeLong">{{ showTimeLong() }}</label>
        </p>
      </div>
      <div class="time-begin-btn" v-if="!isAutoMove" @click="doAutoMove">▶</div>
    </div>

    <!-- 地图浮动内容-结束 -->
    <div
      class="right-menu"
      style="
        height: 100%;
        width: 186px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 8888;
      "
    >
      <Menu />
    </div>
    <c-model ref="CModel"></c-model>
    <searchModel ref="SearchModel" />
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
    <pop-up-layer
      v-show="playerObjs.show"
      :show="playerObjs.show"
      :setStyles="{}"
      @doClose="playerClose"
      ref="myPopUpLayer"
      :title="playerObjs.title"
      opsition="slefPoint"
      class="center-pop"
    >
      <template slot="content">
        <div class="popplay-iframe">
          <iframe
            width="100%"
            height="100%"
            :src="playerObjs.iframeUrl"
            frameborder="0"
          ></iframe>
        </div>
      </template>
    </pop-up-layer>
    <pop-up-layer v-if="pdfShow" :show="pdfShow" :setStyles="{}" @doClose="pdfClose" opsition="pageLeft" :title='"预案内容"' ref="myPopUpLayer">
      <template slot="content">
        <div class="pdf-vue-view">
          <PdfView :pdfUrl=" `/doc/api/store/preview/${this.pdfObj.fileId}`" :recordData="this.pdfObj">
          </PdfView>
        </div>
      </template>
    </pop-up-layer>
    <VideoTree
      ref="VideoTree"
      style="z-index: 9999"
     
    ></VideoTree>
  </div>
</template>

<script>
import Header from "@/components/APicture/header";
import Menu from "@/components/APicture/menu";
import FixedModel from "./components/fixedModel.vue"; // 防洪防涝点等
import Bus from "@/utils/Bus.js";
import moment from "moment";
import VideoTree from "@/components/APicture/videoTree/index.vue";
import searchModel from "@/components/APicture/search/index.vue";
import { MessagePush } from "@/utils/pushMinix"; //混入
import {
  getTeamInfo,
  getIotDevice,
  choseTeamGetDatas,
  searchWaterlogging,
  leftEventList,
  leftEventDetail,
  fileTypeLon,
  getWeather,
  getWeatherSeven,
  geteQuipment,
  getFacilities,
  getTeamPerson,
  getWaterLevel,
  getEmergencyPlan,
} from "@/api/dragonBoat";
import {
  beginVideoStream,
  videoStreamActive,
  stopVideoStream,
} from "@/api/common";
import { getNowWeater, getSeventDayWeater } from "@/api/floodPreventionWar";
import vueSeamlessScroll from "vue-seamless-scroll";
import cModel from "./components/model";
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue"; // 会商
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import Cookies from "js-cookie";
import flvjs from "flv.js";
import PdfView from '@/components/pdf/pdf-view'
export default {
  components: {
    Header,
    Menu,
    vueSeamlessScroll,
    cModel,
    LayerConsulting,
    FixedModel,
    VideoTree,
    searchModel,
    ContactPhone,
    MessageSend,
    PdfView
  },
  mixins: [MessagePush],
  data() {
    return {
      // 天气
      mapImgrul: require("../../assets/images/dragonBoat/9.png"),
      weatherTypeList: ["6H", "24H", "7天"],
	  videoListBeat:null,
      weatherMSGList: [
        /*  {
          dates: "24日",
          weatherType: "晴天",
          temp: "28~35",
          weatherIcon: require("../../assets/images/dragonBoat/icon_sun.png"),
        },
        {
          dates: "25日",
          weatherType: "晴天",
          temp: "28~35",
          weatherIcon: require("../../assets/images/dragonBoat/icon_sun.png"),
        },
        {
          dates: "26日",
          weatherType: "晴天",
          temp: "28~35",
          weatherIcon: require("../../assets/images/dragonBoat/icon_thrun.png"),
        },
        {
          dates: "27日",
          weatherType: "晴天",
          temp: "28~35",
          weatherIcon: require("../../assets/images/dragonBoat/icon_sun.png"),
        },
        {
          dates: "28日",
          weatherType: "晴天",
          temp: "28~35",
          weatherIcon: require("../../assets/images/dragonBoat/icon_water.png"),
        }, */
      ],
      // 6小时
      sixHourList: [],
      oneDayList: [],
      rightTabsList: [
        { key: 0, name: "事件列表" },
        { key: 1, name: "分析研判" },
        { key: 2, name: "协同会商" },
      ],
      scopeList: [
        { key: 1000, name: "1KM" },
        { key: 2000, name: "2KM" },
        { key: 3000, name: "3KM" },
      ],
      scopeActive: 0,
      scopeTypeList: [
        { key: 0, name: "影响范围" },
        { key: 1, name: "未来24小时影响范围" },
      ],
      thingList: [
        {
          key: 0,
          name: "应急队伍",
          active: false,
          listData: [],
          listDeviceData: [],
        },
        {
          key: 1,
          name: "应急装备",
          active: false,
          listData: [],
          listDeviceData: [],
        },
        {
          key: 2,
          name: "应急人员",
          active: false,
          listData: [],
          listDeviceData: [],
        },
        {
          key: 3,
          name: "重要设施",
          active: false,
          listData: [],
          listDeviceData: [],
        },
        {
          key: 4,
          name: "物联网设备",
          active: false,
          listData: [],
          listDeviceData: [],
        },
      ],
      radioTabsList: [
        { key: 0, name: "事件概况" },
        // { key: 1, name: "视频监控" },
        { key: 2, name: "应急预案" },
      ],
      radioTabsActive: 0,
      radioTabsActiveObj: {},
      //
      radioList: [
        { url: "", name: "123" },
        { url: "", name: "123" },
        { url: "", name: "123" },
        { url: "", name: "123" },
      ],
      // 协同会商
      synergyListData: [
        { name: "广州市应急管理局", key: 0, checked: false },
        { name: "三防应急指挥部", key: 2, checked: false },
        { name: "从化区应急管理局", key: 3, checked: false },
        { name: "白云区应急管理局", key: 4, checked: false },
        { name: "花都区应急管理局", key: 5, checked: false },
        { name: "增城区应急管理局", key: 6, checked: false },
        { name: "广州市气象局", key: 7, checked: false },
        { name: "省水文局广州水文分局", key: 8, checked: false },
        { name: "广州市水务局", key: 9, checked: false },
        { name: "广州市规划和自然资源局", key: 10, checked: false },
        { name: "广州市林业园林局", key: 11, checked: false },
        { name: "广州市公安局", key: 12, checked: false },
        { name: "广州警备区", key: 13, checked: false },
        { name: "广州市消防救援支队", key: 14, checked: false },
      ],
      synergyBtnList: [
        { name: "全选", key: 0 },
        { name: "会商", key: 1 },
        { name: "会商", key: 2 },
      ],
      userMeetList: [
        {
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/icon_user.png"),
          type: "1",
        },
        {
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/icon_user.png"),
          type: "2",
        },
        {
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/icon_user.png"),
          type: "3",
        },
        {
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/icon_user.png"),
          type: "1",
        },
        {
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/icon_user.png"),
          type: "2",
        },
        {
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/icon_user.png"),
          type: "3",
        },
      ],
      eventDataList: [
        /*  {
          type: "1",
          typeText: "【任务下达】",
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/123.png"),
          position: "局领导",
          dates: "23日",
          times: "13:45:20",
          detail: "任务完成内容",
        },
        {
          type: "2",
          typeText: "【任务下达】",
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/123.png"),
          position: "局领导",
          dates: "23日",
          times: "13:45:20",
          detail:
            "任务完成内容任务完成内容任务完成内容任务完成内容任务完成内容任务完成内容",
        },
        {
          type: "1",
          typeText: "【任务下达】",
          name: "张明明",
          imgUrl: require("../../assets/images/dragonBoat/123.png"),
          position: "局领导",
          dates: "23日",
          times: "13:45:20",
          detail:
            "任务完成内容任务完成内任务完成内容任务完成内容任务完成内容容任务完成内容任务完成内容任务完成内容任务完成内容任务完成内容任务完成内容",
        }, */
      ],
      // 左侧事件列表
      leftRightEventDatatList: [],
      leftRightEventIndex: 0,
      eventSourceType: {
        0: "pc",
        1: "移动终端",
        2: "邮件",
        3: "短信",
        4: "电话",
        5: "其他",
      },
      mapPathActive: "2",
      // icon-select地图shijian
      oldSelectActive: "",
      iconSelectOneActive: null,
      iconSelectOneObj: [],
      iconSelectTwoActive: null,
      iconSelectTwoObj: [],
      //当前天气预报
      weatherData: {
        weatherIndex: 0,
        weatherTime: "6H",
      },
      // 装备列表
      quipmentList: [],
      waterLevelList: [],
      // 应急预案
      emergencyPlanList: [],
      //时间轴配置
      timeOut: null,
      lineIsDown: false,
      saveMoveTime: 0,
      beginTime: new Date(),
      currentMoveTime: 0, // 时间轴改变的时间搓
      currentMoveStep: 0, // 车辆行进的步数
      timmerLineObj: {
        // 默认 24小时-120个节点，1px=32000毫秒,每个节点12分钟
        // 8小时-40个节点，1px=10666.7毫秒,每个节点12分钟
        // 6小时-30个节点，1px=8000毫秒,每个节点12分钟
        showHours: 6, //展示小时-120个节点
        nodeNum: 30, // 节点数
        onePxSecond: 8000, // 1px的毫秒数
      },
      //  保存时长
      saveTimeLong: 0,
      sixTimeModelList: [], //时间段数组
      timePointActive: 0,
      isAutoMove: true,
      // 把向中心
      //靶向范围选中
      targetingList: [
        { key: 0, name: "一公里" },
        { key: 1, name: "两公里" },
        { key: 2, name: "三公里" },
      ],
      targetingChose: 1,
      // 短信发送
      sendOneK: 200,
      sendTwoK: 600,
      sendThreeK: 1000,
      msgSendType: false,
      // 会商更多
      playerObjs: {
        show: false,
        title: "通讯录",
        iframeUrl: "/msg-abs#/mailList?token=",
      },
      // 监控点视频
      morningVideoList: [],
      //降雨量分布url
      rainLinkUrl:`/web#/threeProofings/rainfallPattern?token=${ Cookies.get("token")}`,
      pdfShow:false,
      pdfObj:{},
      eventLevelObj:{
        '1':'特别重大事故',
        '2':'重大事故',
        '3':'较大事故',
        '4':'一般事故',
        '60':'其他事件'
      }
    };
  },
  computed:{
    pushData(){
      return this.$store.getters.responeData
    }
  },
  watch: {
    pushData: {
      handler(newVal, oldVal) {
        // console.log('testssss',newVal)
        if(newVal.cmd) {
          let cmdCode = newVal.cmd
          switch(cmdCode){
            case 'event':
              this.getLeftEventList();
              break;
            default:
              break;
          }

        }
      },
      deep: true,
    },
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
    //this.remoteDatas();
    window.changeIconState = this.changeIconState;
    window.dragonBoatEventByMap = this.dragonBoatEvent;
    window.remoteTeamInfoDatas = this.remoteDatas;
    //this.doGetIotDevice();
    window.remoteIotDeviceDatas = this.doGetIotDevice;
    this.doSearchWaterlogging();
    //this.getLeftEventList();
    this.getFileTypeLon();
    //this.doGeteQuipment() // 获取装备
    window.remoteQuipmentDatas = this.doGeteQuipment;
    //this.doGetFacilities() // 获取设施
    window.remoteFacilitieDatas = this.doGetFacilities;
    //this.doGetTeamPerson() //获取应急人员
    window.remoteTeamPersonDatas = this.doGetTeamPerson;
    this.doGetWaterLevel(); //获取监测水位
    this.getLeftEventList(); // 事件列表
    window.changeMorningVideoList = this.changeMorningVideoList;
    this.$nextTick(() => {
      this.initTimeLine();
      this.timeLineMove();
      this.timeLineTimoutOut();
      if (this.$route.query && this.$route.query.isScale) {
        // 当路由带有isScale===true,触发缩放
        this.initScale();
      } else {
        this.init();
      }
    });
    // this.doWeather();
    this.playerObjs.iframeUrl =
      this.playerObjs.iframeUrl + Cookies.get("token");
    // console.log(moment(new Date().format('YYYY-MM-DD HH:MM:ss')))
    this.doGetNowWeater();
  },
  watch: {
    lineIsDown: function (newVal, oldVal) {
      if (oldVal === true && !newVal) {
        //  console.log('====>',this.getNowTimeAbleMobe())
        let isMoveTime = new Date(this.beginTime).getTime() + this.saveMoveTime;
        console.log(
          8989898,
          new Date(this.currentMoveTime).toLocaleString(),
          new Date(isMoveTime).toLocaleString()
        );
        if (
          this.getNowTimeAbleMobe(isMoveTime) &&
          this.isCurrentWidth() !== "tooSmall"
        ) {
          // 是否允许拖动到此点
          this.currentMoveTime =
            new Date(this.beginTime).getTime() + this.saveMoveTime;
          this.getLeftEventDetail({
            ...this.radioTabsActiveObj,
            sendTime: this.currentMoveTime,
          });
          const greenLine = document.querySelector(".time-line-green");
          console.log("greenLine1111111", parseFloat(greenLine.style.width));
        } else {
          this.$message.warning("无法滑动到未开始时间");
          this.initDateGreenLine(); //回到当前时间点
          this.timeLineTimoutOut(); // 重新开启计算市场移动时间轴
          this.isAutoMove = true; //
        }
      }
      console.log("watch", newVal, oldVal, this);
    },
	morningVideoList:function(newVal, oldVal){
		 this.$nextTick(function(){
			this.videoListPlay(newVal, oldVal);
		});
	},
  },
  beforeDestroy() {
    pGzznCore = null;
    this.timeOut = null;
  },
  methods: {
    init() {
      mapToolLocation = $(".dragon-boat-right").width() + 852;
      pGzznCore = new gzznCore("crystalContainer");
      pGzznCore.FlyTo(1);
      // setTimeout(function () {
      pGzznCore.addPromiseNephogram();
      // }, 5000);
      pGzznCore.addPromiseEventList();
      pGzznCore.addPromiseTunnel(true, false);
      pGzznCore.addPromiseWaterloggingPoint(true, false);
      pGzznCore.addPromiseWaterLevel(true, false);
    },
    // 初始化放大处理
    initScale() {
      const heightClint = document.querySelector("body").clientHeight;
      const widthClint = document.querySelector("body").clientWidth;
      // const columnNum = heightClint / 1080;
      const columnNum = parseFloat((heightClint / 1080).toFixed(2)); // 计算比例
      const widthScrac = parseFloat((widthClint / 5760).toFixed(2)); // 宽度
      const columnNumLine = parseFloat((heightClint / 1889).toFixed(2)); // 计算比例
      const widthScracLine = parseFloat((widthClint / 9120).toFixed(2)); // 宽度
      const leftDiv = document.querySelector(".dragon-boat-left");
      const rightDiv = document.querySelector(".dragon-boat-right");
      const timeLineDiv = document.querySelector(".flex-time-wrap"); // 时间轴统计
      const showMapDiv = document.querySelector(".show-map"); // 地图
      const leftGradient = document.querySelector(".left-gradient"); // 左蒙板
      const rightGradient = document.querySelector(".right-gradient"); // 右蒙板
      leftDiv.style.transform = `scale(${widthScrac},${columnNum})`;
      const mapFlexIcon = document.querySelectorAll(".map-flex-icon");
      leftDiv.style.transformOrigin = "0 0";
      rightDiv.style.transform = `scale(${widthScrac},${columnNum})`;
      rightDiv.style.transformOrigin = "top right";
      const menus = document.querySelector(".right-menu"); // 获取菜单栏
      const cMenus = document.querySelector(".c-menus");
      menus.style.transform = `scale(${widthScracLine},${columnNumLine})`;
      menus.style.transformOrigin = "top right";
      menus.style.top =
        (heightClint - cMenus.clientHeight * columnNumLine) / 2 + "px"; // 获取菜单栏'90px'
      menus.style.right = 0;
      timeLineDiv.style.transform = `scale(${widthScracLine},${columnNumLine})`;
      timeLineDiv.style.transformOrigin = "0 0";
      showMapDiv.style.width = "60%";
      leftGradient.style.width = "30%";
      rightGradient.style.width = "30%";
      let rightMenu = document
        .querySelector(".right-menu")
        .getBoundingClientRect().width;
      let rightWidth = rightDiv.getBoundingClientRect().width + rightMenu * 2;
      let mainWidth = document.getElementById("crystalContainer").offsetWidth;
      let clientWidth = document.body.clientWidth;
      let tempWidth = (clientWidth - mainWidth) / 2;
      if (rightWidth > tempWidth) {
        mapToolLocation = rightWidth - tempWidth + 1433;
      }
      pGzznCore = new gzznCore("crystalContainer", {
        imageryProviderViewModelsIndex: 1,
      });
      pGzznCore.addPromiseNephogram();
      pGzznCore.FlyTo(1);
      pGzznCore.addPromiseTunnel(true, false);
      pGzznCore.addPromiseWaterloggingPoint(true, false);
      pGzznCore.addPromiseWaterLevel(true, false);
      pGzznCore.addPromiseEventList();
      //this.init();
      /* 计算时间轴位置 */
      timeLineDiv.style.left =
        (widthClint - timeLineDiv.clientWidth * widthScracLine) / 2 + "px";
      rightDiv.style.right = (menus.clientWidth + 200) * widthScracLine + "px";
      //  timeLineDiv.style.transformOrigin = `${(showMapDiv.clientWidth*widthScrac - timeLineDiv.clientWidth*widthScrac)/2}px 0`;
      // 页面标题
      // const headerTitle =  document.querySelector('.picture-header')
      // headerTitle.style.transform= `scale(${columnNum})`
      // headerTitle.style.transformOrigin = 'center center'
      //  console.log('mapFlexIcon',mapFlexIcon)
      mapFlexIcon.forEach((i, k) => {
        mapFlexIcon[
          k
        ].style.transform = `scale(${widthScracLine},${columnNumLine})`;
        mapFlexIcon[k].style.left =
          leftDiv.clientWidth * widthScrac + 40 + "px";
      });
    },
    doChoseThing(index, k, active) {
      this.thingList[index]["listData"][k]["active"] = !active;
      if (!active) {
        this.doChoseTeamGetDatas(this.thingList[index]["listData"][k].sid);
      }
      let sid = this.thingList[index]["listData"][k].sid;
      return this.thingList[index]["listData"][k];
    },
    doOpenShow(item, index) {
      this.thingList[index]["active"] = !item.active;
    },
    // 选中-应急队伍-获取数据
    doChoseTeamGetDatas(sid) {
      choseTeamGetDatas(sid).then((res) => {
        if (res.success) {
          console.log(89898989, res);
        }
      });
    },
    //切换事件
    dragonBoatEvent(sid) {
      for (let i = 0; i < this.leftRightEventDatatList.length; i++) {
        if (this.leftRightEventDatatList[i].sid == sid) {
          this.radioTabsActiveObj = JSON.parse(
            JSON.stringify(this.leftRightEventDatatList[i])
          );
          this.getLeftEventDetail(this.leftRightEventDatatList[i]);
          break;
        }
      }
    },
    synergyClick(i, k) {
      this.synergyListData[k]["checked"] = !this.synergyListData[k]["checked"];
    },
    // 获取远程数据
    remoteDatas(res) {
      // 应急队伍，修改成按范围注入
      /**
      getTeamInfo().then((res) => {
        if (res.success) {
          this.thingList[0].listData = []; 
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body))
            saveList.map((i, k) => {
              i.active = false
              this.thingList[0].listData.push(i)
            });
          }
        } else {
        }
      }); */
      this.thingList[0].listData = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = true;
          this.thingList[0].listData.push(i);
        });
      }
    },
    // 获取物联网设备
    doGetIotDevice(res) {
      //修改成按范围注入
      /**
	  getIotDevice().then((res) => {
        if (res.success) {
          this.thingList[4]["listDeviceData"] = [];
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body));
            saveList.map((i, k) => {
              i.active = false;
              this.thingList[4]["listDeviceData"].push(i);
            });
          }
        }
      }); */
      this.thingList[4]["listDeviceData"] = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = false;
          this.thingList[4]["listDeviceData"].push(i);
        });
      }
    },
    // 查询内涝点
    doSearchWaterlogging() {
      searchWaterlogging({ body: {}, page: 1, pageSize: 1000 }).then((res) => {
        console.log("内涝点", res);
        if (res.success) {
        }
      });
    },
    // 查询龙舟水左侧事件列表
    getLeftEventList() {
      leftEventList({ body: {eventType: "10008"} })
        .then((res) => {
          if (res.success) {
            this.leftRightEventDatatList = [];
            if (res.body && res.body.length) {
              this.leftRightEventDatatList = res.body;
              this.radioTabsActiveObj = this.leftRightEventDatatList[0];
              this.getLeftEventDetail(this.leftRightEventDatatList[0]);
              this.doGetEmergencyPlan(this.leftRightEventDatatList[0]); //应急预案
            }
          } else {
            this.leftRightEventDatatList = [];
          }
        })
        .catch((error) => {
          if (error) {
            console.log(err);
          }
        });
    },
    /*
     *天气预报第一版
     */
    //获取天气预报
    doWeather() {
      getWeather("440100000000").then((res) => {
        if (res.success) {
          let weatherArr = [];
          res.body.forEach((e, i) => {
            let obj = {
              monitorTime: e.monitorTime.slice(-5),
              weatherType: e.weatherDesc,
              temp: e.temp,
              weatherIcon: require("../../assets/images/dragonBoat/icon_thrun.png"),
            };
            weatherArr.push(obj);
          });
          if (this.weatherData.weatherTime === "6H") {
            this.weatherMSGList = weatherArr.splice(0, 6);
          } else if (this.weatherData.weatherTime === "24H") {
            this.weatherMSGList = weatherArr;
          }
        } else {
        }
      });
    },
    //获取天气预报
    doWeatherSeven() {
      getWeatherSeven("440100000000").then((res) => {
        if (res.success) {
          let weatherArr = [];
          res.body.forEach((e, i) => {
            let obj = {
              monitorTime: `${e.monitorTime.slice(-2)}日`,
              weatherType: `${e.weatherDescDay}`,
              temp: `${e.tempNight}~${e.tempDay}`,
              weatherIcon: require("../../assets/images/dragonBoat/icon_thrun.png"),
            };
            weatherArr.push(obj);
          });
          this.weatherMSGList = weatherArr;
        } else {
        }
      });
    },
    /*
     *天气预报第二版
     */
    // 实时天气预报
    doGetNowWeater() {
      let monitorStartTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let monitorEndTimes = moment(
        new Date().getTime() + 1000 * 60 * 60 * 24
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
          if (res.success) {
            if (res.body && res.body.length) {
              let arrList = res.body;
            let  sortData = (a, b) =>{
              return a.monitorDay - b.monitorDay
            }
              /*   console.log('数组排序1',arrList)
               arrList.sort((a,b)=>{new Date(b.monitorTime).getTime() - new Date(a.monitorTime).getTime()})
               console.log('数组排序2',arrList) */
              let weatherArr = [];
              arrList.forEach((e, i) => {
                console.log(new Date(e.monitorTime).getTime(),e.monitorTime,88888888888888)
                let obj = {
                  monitorTime: `${e.monitorTime.split(" ")[1].slice(0,5) }`,
                  weatherType: `${e.weatherDesc}`,
                  temp: `${e.temp/10}℃`,
                  weatherIcon: require("../../assets/images/dragonBoat/icon_thrun.png"),
                  monitorDay:new Date(e.monitorTime).getTime()
                };
                
                weatherArr.push(obj);
              });
              weatherArr.sort(sortData)
              console.log(weatherArr)
              // this.weatherMSGList = weatherArr;
              this.sixHourList = weatherArr.slice(0, 6);
              this.oneDayList = weatherArr;
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error('oooooooooo',err);
        });
    },
    // 七天天气预报
    doGetSeventDayWeater() {
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
            let  sortData = (a, b) =>{
              return  a.monitorDay - b.monitorDay
            }
            if (res.body && res.body.length) {
              let weatherArr = [];
              // res.body.sort(sortData)
              console.log(res.body)
              res.body.forEach((e, i) => {
                let obj = {
                  monitorTime: `${e.monitorTime.slice(-2)}日`,
                  weatherType: `${e.weatherDescDay}`,
                  temp: `${e.tempNight}~${e.tempDay}`,
                  weatherIcon: require("../../assets/images/dragonBoat/icon_thrun.png"),
                  monitorDay:parseInt(new Date(e.monitorTime).getTime())
                };
                weatherArr.push(obj);
              });
              weatherArr.sort(sortData)
              this.weatherMSGList = weatherArr;
            }
            console.log("7天实时数据", res);
          } else {
            console.log("7天实时数据", res);
          }
        })
        .catch((err) => {});
    },
    // 事件切换
    leftEventChange(item, index) {
      console.log(index);
      this.leftRightEventIndex = index;
    },
    // 右侧导航切换
    radioTabsChange(item, index) {
      this.radioTabsActive = item.key;
      // console.log(index);
    },
    // 点击定位
    toPointerHanderl(item) {
      this.radioTabsActiveObj = item;
      this.toInitTimeLineList(item.created, () => {});
      this.getLeftEventDetail(item);
      this.doGetEmergencyPlan(item);
      pGzznCore.addPromiseEventInfo(item);
    },
    // 事件跟踪记录
    getLeftEventDetail(item) {
      let send = { eventId: item.sid };
      if (item && item.sendTime) {
        send.startTime = moment(item.sendTime).format("YYYY-MM-DD HH:mm:ss");
      }
      leftEventDetail({ body: { ...send } }).then((res) => {
        if (res.success) {
          try {
            if (res.body && this.eventDataList.length > res.body.length) {
              this.$nextTick(() => {
                const eventDiv = document.querySelector(".first-msg-li");
                eventDiv.classList.add("new-message");
                eventDiv.addEventListener("webkitAnimationEnd", function () {
                  eventDiv.classList.remove("new-message");
                });
              });
            }
            this.eventDataList = JSON.parse(JSON.stringify(res.body));
          } catch {}
        } else {
        }
      });
    },
    //
    selectDivShow(type) {
      let typeObj = {
        iconSelectOneActive: "iconSelectOneActive",
        iconSelectTwoActive: "iconSelectTwoActive",
        iconSelectThreeActive: "iconSelectThreeActive",
      };
      for (let key in typeObj) {
        this[typeObj[key]] = false;
      }
      // console.log(type,this.oldSelectActive,this.oldSelectActive === type)
      if (this.oldSelectActive === type) {
        this[type] = false;
        this.oldSelectActive = "";
      } else {
        this[type] = !this[type];
        this.oldSelectActive = type;
      }
      // if(this.iconSelectActive !== null && index === this.iconSelectActive){
      //   this.iconSelectActive = null
      // } else {
      //   this.iconSelectActive = index
      // }
    },
    changeIconState(type) {
      for (let i = 0; i < this.iconSelectOneObj.length; i++) {
        for (let j = 0; j < this.iconSelectOneObj[i].children.length; j++) {
          let pType = this.iconSelectOneObj[i].children[j].type;
          if (pType == type) {
            this.iconSelectOneObj[i].children[j].active = true;
          }
        }
      }
    },
    getFileTypeLon() {
      fileTypeLon().then((res) => {
        if (res.success) {
          console.log(res);
          this.iconSelectOneObj = JSON.parse(JSON.stringify(res.body));
          if(res.body && res.body.length) {
            this.iconSelectOneObj.map((item, index) => {
              this.iconSelectOneObj[index].active =
                item.typeName === "易涝点" ? true : false;
              if (item.children && item.children.length) {
                this.iconSelectOneObj[index].children.map((i, k) => {
                  this.iconSelectOneObj[index].children[k] = {
                    ...i,
                    active:
                      item.typeName === "易涝点" || i.typeName === "水位站"
                        ? true
                        : false,
                  };
                  //this.iconSelectOneObj[index].children[i].active = true;
                });
              }
            });
          }
        }
      });
    },
    loopMap(list, type = false) {
      list.map(async (item, index) => {
        list[index].active = type;
      });
    },
    flexClickAllItem(item, index) {
      let is_Bool = true;
      this.iconSelectOneObj[index].active = JSON.parse(
        JSON.stringify(!item.active)
      );
      this.iconSelectOneObj = JSON.parse(JSON.stringify(this.iconSelectOneObj));
      if (this.iconSelectOneObj[index].active) {
        is_Bool = true;
        this.iconSelectOneObj[index].children.map((citem, cindex) => {
          this.iconSelectOneObj[index].children[cindex].active = true;
        });
      } else {
        is_Bool = false;
        this.loopMap(this.iconSelectOneObj[index].children, false);
      }
      for (let i = 0; i < item.children.length; i++) {
        let citem = item.children[i];
        if (citem.type == "5") {
          //水位站
          pGzznCore.addPromiseWaterLevel(is_Bool);
          WaterStationState = is_Bool;
        } else if (citem.type == "4") {
          //隧道
          pGzznCore.addPromiseTunnel(is_Bool);
        } else if (citem.type == "3") {
          //水浸点
          pGzznCore.addPromiseWaterloggingPoint(is_Bool);
        } else if (citem.type == "2") {
          //堤防
          pGzznCore.addPromiseBeware(is_Bool);
        } else if (citem.type == "1") {
          //水库
          pGzznCore.addPromiseReservoirs(is_Bool);
        } else if (citem.type == "6") {
          //雨量站
          pGzznCore.addPromiseRainfallStation(is_Bool);
        } else if (
          citem.type == "440103" ||
          citem.type == "440104" ||
          citem.type == "440105" ||
          citem.type == "440106" ||
          citem.type == "440111" ||
          citem.type == "440112" ||
          citem.type == "440113" ||
          citem.type == "440114" ||
          citem.type == "440115" ||
          citem.type == "440183" ||
          citem.type == "440184"
        ) {
          //避难场所
          pGzznCore.addPromiseShelterArea(citem.type, is_Bool);
        }
      }
    },
    flexClickliItem(item, index, citem, cindex) {
      this.iconSelectOneObj[index].children[cindex].active = !citem.active;
      if (this.iconSelectOneObj[index].children[cindex].active) {
        let childrenLength = this.iconSelectOneObj[index].children.length;
        let currentArr = this.iconSelectOneObj[index].children.filter(
          (i, k) => {
            if (i.active) {
              return i;
            }
          }
        );
        if (currentArr.length === childrenLength) {
          this.iconSelectOneObj[index].active = true;
        }
      } else {
        this.iconSelectOneObj[index].active = false;
      }
      this.iconSelectOneObj = JSON.parse(JSON.stringify(this.iconSelectOneObj));
      if (citem.type == "5") {
        //水位站
        pGzznCore.addPromiseWaterLevel(citem.active);
        WaterStationState = citem.active;
      } else if (citem.type == "4") {
        //隧道
        pGzznCore.addPromiseTunnel(citem.active);
      } else if (citem.type == "3") {
        //水浸点
        pGzznCore.addPromiseWaterloggingPoint(citem.active);
      } else if (citem.type == "2") {
        //堤防
        pGzznCore.addPromiseBeware(citem.active);
      } else if (citem.type == "1") {
        //水库
        pGzznCore.addPromiseReservoirs(citem.active);
      } else if (citem.type == "6") {
        //雨量站
        pGzznCore.addPromiseRainfallStation(citem.active);
      } else if (
        citem.type == "440103" ||
        citem.type == "440104" ||
        citem.type == "440105" ||
        citem.type == "440106" ||
        citem.type == "440111" ||
        citem.type == "440112" ||
        citem.type == "440113" ||
        citem.type == "440114" ||
        citem.type == "440115" ||
        citem.type == "440183" ||
        citem.type == "440184"
      ) {
        //避难场所
        pGzznCore.addPromiseShelterArea(citem.type, citem.active);
      }
    },
    onWeather(item, index) {
      //当前按钮样式
      this.weatherData.weatherIndex = index;
      //当前时间
      this.weatherData.weatherTime = item;
      // 点击对象为7天时
      if (item === "7天") {
        // this.doWeatherSeven();
        this.doGetSeventDayWeater();
      } else {
        // this.doWeather();
      }
    },
    scopeHandelActive(item, index) {
      this.scopeActive = index;
      pGzznCore.addPromiseEventRange(item.key);
    },
    // 获取装备
    doGeteQuipment(res) {
      /**
	  geteQuipment({body:{}}).then(res=>{
        if(res.success) {
          this.thingList[1].listData = []; 
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body));
            saveList.map((i, k) => {
              i.active = false;
              i.ranksName = i.equipmentName
              this.thingList[1].listData.push(i);
            });
          }
        }
      }) */
      this.thingList[1].listData = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = true;
          i.ranksName = i.equipmentName;
          this.thingList[1].listData.push(i);
        });
      }
    },
    // 获取设施
    doGetFacilities(res) {
      /**
      getFacilities({body:{}}).then(res=>{
        if(res.success) {
          this.thingList[3].listData = []; 
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body));
            saveList.map((i, k) => {
              i.active = true;
              i.ranksName = i.name
              this.thingList[3].listData.push(i);
            });
          }
        }
      }) */
      this.thingList[3].listData = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = false;
          i.ranksName = i.name;
          this.thingList[3].listData.push(i);
        });
      }
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
    // 获取应急人员
    doGetTeamPerson(res) {
      /**
      getTeamPerson({body:{}}).then(res=>{
        if(res.success) {
          this.thingList[2].listData = []; 
          if (res.body && res.body.length) {
            let saveList = JSON.parse(JSON.stringify(res.body));
            saveList.map((i, k) => {
              i.active = false;
              i.ranksName = i.name
              this.thingList[2].listData.push(i);
            });
          }
        }
      }).catch((err)=>{
        
      })*/
      this.thingList[2].listData = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = true;
          i.ranksName = i.name;
          this.thingList[2].listData.push(i);
        });
      }
    },
    //
    mapPathClick(type) {
      this.mapPathActive = type;
    },
    // 获取监测水位
    doGetWaterLevel() {
      console.log(9999);
      getWaterLevel({ body: {} }).then((res) => {
        if (res.success) {
          this.waterLevelList = [];
          if (res.body && res.body.length) {
            this.waterLevelList = res.body;
            console.log( "88899988",this.waterLevelList)
            this.waterLevelList.map((i, k) => {
              i.keys = k + 1;
              // i.showValue = i.value?i.value:''
            });
          }
        }
      });
    },
    // 监测水位-定位位
    waterLevelPointer(item, index) {
      pGzznCore.addPromiseWaterStationLocation(item.sid);
    },
    // 监测水位-详情
    waterLevelDetail(item, index) {},
    // 应急预案-获取
    doGetEmergencyPlan(item) {
      getEmergencyPlan({ body: { eventId: item.sid } }).then((res) => {
        if (res.success) {
          this.emergencyPlanList = res.body;
          // console.log('应急预案',res)
        }
      });
    },
    // 靶向范围选择
    doChoseTarget(key) {
      this.targetingChose = key;
    },
    emergencyDetail(item, e) {
      this.pdfShow = true
      this.pdfObj = item
      // this.$refs.myPopUpLayer.$emit('')
      // this.$refs.CModel.$emit("show", { ...item, pageType: "detail" });
    },
    /* 时间轴部分 */
    //获取当前，判断是否允许拖动
    getNowTimeAbleMobe(isMoveTime) {
      let nowTime = new Date().getTime();
      if (isMoveTime < nowTime) {
        return true;
      } else {
        return false;
      }
      // console.log(this.currentMoveTime, nowTime,this.currentMoveTime<nowTime)
    },
    // 当绿色时间轴大于 2700 || 小于130 时触发
    isCurrentWidth() {
      const greenLine = document.querySelector(".time-line-green");
      let gWidth = parseInt(greenLine.style.width.replace("px", ""));
      if (gWidth >= 2700) {
        // 大于 2700
        this.initTimeLine();
        return "tooBig";
      } else if (gWidth <= 130) {
        // 小于130
        return "tooSmall";
      } else {
        return true;
      }
    },
    //初始化时间轴
    initTimeLine() {
      this.beginTime = new Date(); // 获取第二模块初始时间
      this.sixTimeModelList.push(this.beginTime); // 增加模块
      const greenLine = document.querySelector(".time-line-green");
      greenLine.style.width = "130px";
    },
    // 点击事件触发-初始化时间轴
    clickEventInitTimeLine(item) {
      this.beginTime = new Date(item.created);
      this.sixTimeModelList = [];
      this.sixTimeModelList.push(this.beginTime);
      const greenLine = document.querySelector(".time-line-green");
      greenLine.style.width = "130px";
    },
    // 分解传入的事件发生
    toInitTimeLineList(time, callBack = () => {}) {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
        this.timeOut = null;
      }
      const greenLine = document.querySelector(".time-line-green");
      let timeNum = new Date(time).getTime(); //事件发生事件戳
      let nowTimeNum = new Date().getTime(); //现在的事件戳
      let saveTime = nowTimeNum - timeNum; // 插件戳发生时长
      let oneLineSecond = 1000 * 60 * 60 * 6; // 每段时间轴的毫秒
      let periondTime = parseInt(saveTime / oneLineSecond); // 事件段拆分
      this.sixTimeModelList = [];
      this.beginTime = new Date(time); //获知给初始化时间
      if (periondTime) {
        // 多于1段
        for (let x = 0; x < periondTime; x++) {
          if (x === 0) {
            this.sixTimeModelList.push(new Date(time));
          } else {
            this.sixTimeModelList.push(
              new Date(new Date(time).getTime() + oneLineSecond * x + 1)
            );
            if (x == periondTime - 1) {
              this.timePointActive = this.sixTimeModelList.length - 1;
              greenLine.style.width =
                (nowTimeNum - (oneLineSecond * periondTime + timeNum)) /
                  this.timmerLineObj.onePxSecond +
                130 +
                "px";
              callBack();
            }
          }
        }
      } else {
        // 少于1段
        this.sixTimeModelList.push(new Date(time));
        this.timePointActive = this.sixTimeModelList.length - 1;
        greenLine.style.width =
          (nowTimeNum - timeNum) / this.timmerLineObj.onePxSecond + 130 + "px";
        callBack();
      }
    },
    // 时间轴的拖动
    timeLineMove() {
      const that = this;
      let x = null;
      let y = null;
      let mx = null;
      let my = null;
      let isDown = false;
      // let saveMoveTime = 0
      const greenLine = document.querySelector(".time-line-green");
      const moveModel = document.querySelector(".time-modle");
      moveModel.onmousedown = function (e) {
        that.isAutoMove = false;
        isDown = true;
        if (that.timeOut) {
          clearTimeout(that.timeOut);
        }
        that.lineIsDown = true;
        x = e.offsetX;
        y = e.offsetY;
        console.log("点击的位置", x);
      };
      window.onmousemove = function (e) {
        if (!isDown) {
          return false;
        }
        mx = e.offsetX;
        my = e.offsetY;

        let nl = moveModel.offsetLeft + (mx - x);
        greenLine.style.width = nl + "px";
        // that.saveMoveTime = ((nl - 110) * 32000) - 640000
        that.saveMoveTime = (nl - 130) * that.timmerLineObj.onePxSecond;

        console.log("that.saveMoveTime", that.saveMoveTime);
      };
      window.onmouseup = function () {
        //开关关闭
        isDown = false;
        that.lineIsDown = false;
      };
      moveModel.onmouseleave = function (e) {
        isDown = false;
        that.lineIsDown = false;
      };
    },
    initDateGreenLine() {
      let defaultPx = 130;
      let pxOne = this.timmerLineObj.onePxSecond;
      const greenLine = document.querySelector(".time-line-green");
      let currentTime = new Date().getTime();
      let beginNum = this.beginTime.getTime();
      // console.log("=============>>99",defaultPx + (( currentTime - beginNum )/pxOne))
      greenLine.style.width =
        defaultPx + (currentTime - beginNum) / pxOne + "px";
      return false;

      // let oneSecondPx =  1/second
    },
    // 时间轴-时间自动滑动
    timeLineTimoutOut() {
      let second = this.timmerLineObj.onePxSecond;
      let oneSecondPx = 1 / second;
      const greenLine = document.querySelector(".time-line-green");
      const moveModel = document.querySelector(".time-modle");
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(() => {
      /*   console.log(
          "greenLine",
          parseFloat(greenLine.style.width),
          greenLine.offsetWidth,
          oneSecondPx,
          greenLine
        ); */
        pGzznCore.addPromiseUpdateTeamPath();
        greenLine.style.width =
          parseInt(greenLine.style.width.replace("px", "")) + 1 + "px";
        this.saveTimeLong =
          (parseInt(greenLine.style.width.replace("px", "")) - 130) * second +
          new Date(this.beginTime).getTime();
        if (this.msgSendType) {
          this.sendOneK =
            this.sendOneK === 0
              ? 0
              : this.sendOneK - parseInt(Math.random() * 10) < 0
              ? 0
              : this.sendOneK - parseInt(Math.random() * 10);
          this.sendTwoK =
            this.sendTwoK === 0
              ? 0
              : this.sendTwoK - parseInt(Math.random() * 10) < 0
              ? 0
              : this.sendTwoK - parseInt(Math.random() * 10);
          this.sendThreeK =
            this.sendTwoK === 0
              ? 0
              : this.sendThreeK - parseInt(Math.random() * 10) < 0
              ? 0
              : this.sendThreeK - parseInt(Math.random() * 10);
        }
        clearTimeout(this.timeOut);
        // console.log('istimeout3',6666,this.timeOut)
        this.timeLineTimoutOut();
        this.getLeftEventDetail({
          ...this.radioTabsActiveObj,
          sendTime: new Date(),
        });
      }, second);
      this.isCurrentWidth();
    },
    // 获取时长
    showTimeLong() {
      let betweenNum =
        this.saveTimeLong - new Date(this.sixTimeModelList[0]).getTime();
      let second = parseInt((betweenNum / 1000 / 60) % 60); // 分钟
      let hours = parseInt((betweenNum / 1000 / 60 / 60) % 24); // 小时
      let datas = parseInt(betweenNum / 1000 / 3600 / 24); //天
      this.isCurrentWidth();
      return `${datas > 10 ? datas : "0" + datas}天${
        hours > 10 ? hours : "0" + hours
      }小时${second > 10 ? second : "0" + second}分钟`;
    },
    // 点击事件
    timePointChange(item, index) {
      this.timePointActive = index;
      this.beginTime = new Date(item);
      const greenLine = document.querySelector(".time-line-green");
      if (index === this.sixTimeModelList.length - 1) {
        greenLine.style.width =
          130 +
          (new Date().getTime() - new Date(this.beginTime).getTime()) /
            this.timmerLineObj.onePxSecond +
          "px";
      } else {
        greenLine.style.width = 130 + 2700 + "px";
      }
    },
    doAutoMove() {
      this.isAutoMove = true;
      this.beginTime = this.sixTimeModelList[this.sixTimeModelList.length - 1];
      this.initDateGreenLine(); //回到当前时间点
      this.timeLineTimoutOut();
      this.getLeftEventDetail({ ...this.radioTabsActiveObj });
    },
    isSendMsg() {
      this.msgSendType = true;
    },
    // 会商全选
    selectAllTeam(type) {
      //  select-全选 cancle-取消
      this.synergyListData.map((item, index) => {
        if (type === "select") {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    },
    // 展示融合通信模块
    showContactModel() {
      // Bus.$emit("openConsulting");
      // this.$emit("openConsulting")
      this.openConsulting();
    },
    showContactModelMore() {
      this.playerObjs.show = true;
      //  this.playerObjs.iframeUrl = this.playerObjs.iframeUrl + Cookies.get("token")
    },
    openConsulting() {
      this.$refs.LayerConsulting.$emit("openConsulting", { set: 888888 });
      this.$refs.LayerConsulting.meetingVis = true;
    },
    // 点击出现视频树
    videoTreeClick($event) {
      console.log($event, this.$refs.VideoTree);
      this.$refs.VideoTree.$emit("show", { saveEvent: $event });
    },
    // 点击搜索
    clickSearch($event) {
      this.$refs.SearchModel.$emit("show", { saveEvent: $event });
    },
    // 区域树选中
    areaCheckClick(keys, e, checkKeys) {},
    // 标签树选中
    taskCheckClick(keys, e, checkKeys) {},
    // 视频搜索点击
    videoSearchClick(i) {
      console.log(i);
    },
    // 更多-关闭
    playerClose() {
      this.playerObjs.show = false;
    },
      // 修改监控点视频列表
    changeMorningVideoList(vValue) {
      this.morningVideoList = vValue;
    },
	videoListPlay(newVal, oldVal){ //播放视频
	    let that = this;
		if (this.videoListBeat) {
			clearInterval(this.videoListBeat);
		}
		let sBody = [];
		for(let i=0;i<oldVal.length;i++){
			let formData = {};
			formData.deviceId = oldVal[i].deviceId;
			formData.id = oldVal[1].id;
			formData.playUrlMap = {};
			formData.success = true;
			formData.cause = '';
			sBody.push(formData);
		}
		stopVideoStream(sBody).then((res) => {
		  if (res.success) {}
		});
		let sBodyNew = [];
		for(let i=0;i<newVal.length;i++){
			let formData = {};
			formData.deviceId = newVal[i].deviceId;
			formData.id = newVal[1].id;
			formData.playUrlMap = {};
			formData.success = true;
			formData.cause = '';
			sBodyNew.push(formData);
		}
		beginVideoStream(sBodyNew).then((res) => {
          if (res.success) {
		     for(let i=0;i<res.body.length;i++){
           console.log('res.body',res.body)
				let droneVedioPlayer = flvjs.createPlayer({
					type: 'flv',
					url: res.body[i].playUrlMap?res.body[i].playUrlMap.FLV:'',
					hasAudio: false,
					hasVideo: true,
					isLive: true,
					withCredentials: false,
					cors: true, 
				});
				let videoElement = document.getElementById("vedioPlayer"+i);
				if(videoElement!=null){
					droneVedioPlayer.attachMediaElement(videoElement);
					droneVedioPlayer.load();
					droneVedioPlayer.play();
				}
			 }
		     this.videoListBeat = setInterval(function(){ that.videoStreamActive(sBodyNew); }, 15000);
		  }
       });
	},
	videoStreamActive(arr){
		videoStreamActive(arr).then((res) => {
			
		});
	},
    pdfClose(){
      this.pdfShow = false
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

<style scoped lang="less">
@import "./index.less";
</style>
