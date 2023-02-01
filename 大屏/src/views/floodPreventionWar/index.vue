<!--
 * @Description: 大屏-森林防火-战时
 * @Version: 1.0
 * @Autor: SuDe
 * @LastEditors: hehaishen
 * @Date: 2021-06-01 15:40:52
 * @LastEditTime: 2021-09-03 14:38:24
 

-->
<template>
  <div class="forest-fire" style="background: #182734">
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
    <!-- 头部-开始 -->
    <Header :title="'全市森林防火一张图'"></Header>

    <!-- 头部-结束 -->
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
              <li @click="temperatureClick($event, 1)">
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
                  <p>相对湿度</p>
                  <p>{{ temObjShow.waterTem }}</p>
                </div>
              </li>
              <li @click="temperatureClick($event, 2)">
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
              <li>
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
          <div class="wood-fire-spread">
            <div>森林山火蔓延模型预测</div>
            <div>
              <p>启动</p>
            </div>
          </div>
          <div class="fire-targeting-msg">
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
              <!-- <p class="chose-p">两公里</p>
				<p>三公里</p> -->
            </div>
            <div class="targeting-msg-chart">
              <div class="msg-chart-wrap1">
                <div class="chart-show-number" v-show="targetingChose === 2">
                  {{ sendThreeK }}
                </div>
                <div class="msg-chart-wrap2">
                  <div class="chart-show-number" v-show="targetingChose === 1">
                    {{ sendTwoK }}
                  </div>
                  <div class="msg-chart-wrap3">
                    <div
                      class="chart-show-number"
                      v-show="targetingChose === 0"
                    >
                      {{ sendOneK }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="targeting-msg-btn" @click="isSendMsg">发送疏散短信</div>
          </div>
        </div>
      </div>
      <div class="forset-left-bottom">
        <div class="left-bottom-content">
          <div class="fire-model-title">当前救火物资情况</div>
          <ul class="left-bottom-material">
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

          <ul class="fire-list-content">
            <vue-seamless-scroll
              :data="saveFireTeamList"
              :class-option="defaultOption"
            >
              <li v-for="(item, index) in saveFireTeamList" :key="index">
                <div @click="fireTeamClick(item, index)">
                  <a-icon
                    type="phone"
                    style="color: #00eaff"
                    @click="clickToPhone(item, index, $event)"
                  />
                  {{ item.name }}
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
          </ul>
        </div>
        <div class="left-bottom-content file-model-all">
          <div class="fire-model-title">指挥调度</div>
          <div class="left-right-tabs">
            <p
              v-for="(item, index) in rightTabsList"
              :class="[
                leftRightEventIndex === index ? 'right-tabs-active' : '',
              ]"
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
            class="left-bottom-contentin file-model-all"
            v-if="leftRightEventIndex === 0"
          >
            <div class="fire-list-header">
              <p>时间</p>
              <p>内容</p>
              <p>区域</p>
              <!-- <p>事件登记</p>
              <p>来源</p> -->
              <p>操作</p>
            </div>
            <ul class="fire-list-content" v-if="leftRightEventDatatList.length">
              <li v-for="(item, index) in leftRightEventDatatList" :key="index">
                <div>{{ item.created }}</div>
                <div>{{ item.eventName }}</div>
                <!-- <div>{{ item.eventPlace }}</div>
                <div>{{ item.reporter }}</div> -->
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
      </div>
      <div class="left-fixed">
        <FixedModel v-if="false"/>
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
    <div class="forest-center" v-if="true">
      <div class="fire-model-title" style="padding-right: 120px">
        {{
          eventDatailObj["eventName"]
            ? eventDatailObj["eventName"]
            : "广东省广州市石门国家森林公园发生火灾"
        }}
      </div>
      <!-- <div class="fire-model-title" style="padding-right:120px;">{{'广东省广州市石门国家森林公园发生火灾'}}</div> -->
      <ul class="forest-center-list">
        <li>
          <div class="center-list-event">死亡情况</div>
          <div class="center-list-detail">
            <p>
              死亡：<span v-if="yearsStaitcsObj['deathNum']">{{
                yearsStaitcsObj["deathNum"] ? yearsStaitcsObj["deathNum"] : "0"
              }}</span
              >人
            </p>
            <p>
              重伤：<span v-if="yearsStaitcsObj['seriousInjuryNum']">{{
                yearsStaitcsObj["seriousInjuryNum"]
                  ? yearsStaitcsObj["seriousInjuryNum"]
                  : 0
              }}</span
              >人
            </p>
            <p>
              轻伤：<span v-if="yearsStaitcsObj['minorWoundNum']">{{
                yearsStaitcsObj["minorWoundNum"]
                  ? yearsStaitcsObj["minorWoundNum"]
                  : "0"
              }}</span>
            </p>
          </div>
        </li>
        <li>
          <div class="center-list-event">救援队伍</div>
          <div class="center-list-detail">
            <p>
              现场救援队伍:
              <span v-if="yearsStaitcsObj['rescueTeamList'].length">{{
                yearsStaitcsObj["rescueTeamList"][0]["ranksNum"]
                  ? yearsStaitcsObj["rescueTeamList"][0]["ranksNum"]
                  : 0
              }}</span
              >支， 共<span v-if="yearsStaitcsObj['rescueTeamList'].length">{{
                yearsStaitcsObj["rescueTeamList"][0]["peopleNum"]
                  ? yearsStaitcsObj["rescueTeamList"][0]["peopleNum"]
                  : 0
              }}</span
              >人
            </p>
            <!-- <p >
						现场救援队伍: <span>{{arriveTeam}}</span>支，
                        共<span>{{arrivePeople}}</span>人
					</p> -->
            <p>
              在途救援队伍:
              <span v-if="yearsStaitcsObj['rescueTeamList'].length">{{
                yearsStaitcsObj["rescueTeamList"][1]["ranksNum"]
                  ? yearsStaitcsObj["rescueTeamList"][1]["ranksNum"]
                  : 0
              }}</span
              >支， 共<span v-if="yearsStaitcsObj['rescueTeamList'].length">{{
                yearsStaitcsObj["rescueTeamList"][1]["peopleNum"]
                  ? yearsStaitcsObj["rescueTeamList"][1]["peopleNum"]
                  : 0
              }}</span
              >人
            </p>
            <!-- <p>
						在途救援队伍:  <span>{{inTeam <0 ? 0:inTeam}}</span>支，
                        共<span>{{inPeople <0 ? 0:inPeople}}</span>人
					</p> -->
          </div>
        </li>
        <li>
          <div class="center-list-event">救援物资</div>
          <div class="center-list-detail">
            <!-- <p>
						现场救援物资:{{yearsStaitcsObj.sceneReliefMaterialsList.length?"":"无"}} <label v-if="yearsStaitcsObj && yearsStaitcsObj.sceneReliefMaterialsList && yearsStaitcsObj.sceneReliefMaterialsList.length" v-for="(item,index) in yearsStaitcsObj.sceneReliefMaterialsList" :key="index" v-show="index<2">{{item.materialName}}:<span>{{item.materialNum}}</span>{{item.unit}},</label>
					</p> -->
            <p>
              <label>现场救援物资: </label>
              <label
                v-if="
                  yearsStaitcsObj &&
                  yearsStaitcsObj.sceneReliefMaterialsList &&
                  yearsStaitcsObj.sceneReliefMaterialsList.length
                "
                v-for="(
                  item, index
                ) in yearsStaitcsObj.sceneReliefMaterialsList"
                :key="index"
                v-show="index < 2"
                >{{ item.materialName }}:<span>{{
                  item.materialNum ? item.materialNum : 0
                }}</span
                >{{ item.unit }},</label
              >
            </p>
            <p>
              <label>在途救援物资: </label
              ><label
                v-if="
                  yearsStaitcsObj &&
                  yearsStaitcsObj.waitReliefMaterialsList &&
                  yearsStaitcsObj.waitReliefMaterialsList.length
                "
                v-for="(item, index) in yearsStaitcsObj.waitReliefMaterialsList"
                :key="index"
                v-show="index < 2"
                >{{ item.materialName }}:<span>{{
                  item.materialNum ? item.materialNum : 0
                }}</span
                >{{ item.unit }},</label
              >
            </p>
            <!-- <p>
						在途救援物资: {{yearsStaitcsObj.waitReliefMaterialsList.length?"":"无"}} <label v-if="yearsStaitcsObj && yearsStaitcsObj.waitReliefMaterialsList && yearsStaitcsObj.waitReliefMaterialsList.length" v-for="(item,index) in yearsStaitcsObj.waitReliefMaterialsList" :key="index" v-show="index<2">{{item.materialName}}:<span>{{item.materialNum}}</span>{{item.unit}},</label>
					</p> -->
          </div>
        </li>
        <li>
          <div class="center-list-event">所需物资</div>
          <div class="center-list-detail">
            <!-- <p>
						<label v-if="yearsStaitcsObj && yearsStaitcsObj.sceneReliefMaterialsList" v-for="(item,index) in yearsStaitcsObj.sceneReliefMaterialsList" :key="index" v-show="index<2">{{item.materialName}}:<span>{{item.materialNum}}</span>{{item.unit}},</label>
					</p> -->
            <p>
              <label>消防车:<span>3</span>辆</label>
            </p>
            <p>
              <label>油锯:<span>20</span>台</label>
            </p>
          </div>
        </li>
        <li>
          <div class="center-list-event">所需物资</div>
          <div class="center-list-detail">
            <!-- <p>
              <label v-if="yearsStaitcsObj && yearsStaitcsObj.sceneReliefMaterialsList" v-for="(item,index) in yearsStaitcsObj.sceneReliefMaterialsList" :key="index" v-show="index<2">{{item.materialName}}:<span>{{item.materialNum}}</span>{{item.unit}},</label>
            </p> -->
            <p>
              <label>无人机:<span>30</span>辆</label>
            </p>
            <p>
              <label>灭火器:<span>2</span>个</label>
            </p>
            <!-- <p>
              死亡: <span>1</span>人
            </p>
            <p>
              重伤: <span>5</span>人
            </p>
            <p>
              损失：<span>1200W</span>
            </p> -->
          </div>
        </li>
      </ul>
    </div>
    <!-- 火灾统计-结束 -->
    <!-- 右侧模块-开始 -->
    <div class="forest-right">
      <div class="forest-right-left">
        <div class="right-left-connection2">
          <div class="fire-model-title">物联点数据实时展示</div>
          <div class="connection2-tab">
            <p
              v-for="(item, index) in connectionLabList"
              @click="doTabActive(index)"
              :class="[tabActive === index ? 'active-tab' : '']"
              :key="index"
            >
              {{ item.name }}
            </p>
          </div>
          <div class="left-connection2-wrap" v-if="tabActive === 1">
            <ul>
              <li>
                <video
                  src="../../assets/media/contact_point.mp4"
                  muted
                  autoplay
                  loop
                  style="height: 100%; width: 100%"
                ></video>
              </li>
              <li>
                <video
                  src="../../assets/media/nua.mp4"
                  muted
                  autoplay
                  loop
                  style="height: 100%; width: 100%"
                ></video>
              </li>
              <li>
                <video
                  src="../../assets/media/nua.mp4"
                  muted
                  autoplay
                  loop
                  style="width: 100%; height: 100%"
                ></video>
              </li>
            </ul>
          </div>
          <div class="left-connection2-wrap" v-if="tabActive === 0">
            <ul>
              <li>
                <img
                  style="display: block; width: 100%; height: 100%"
                  src="../../assets/images/fire_show1.png"
                  alt=""
                />
              </li>
              <li>
                <img
                  style="display: block; width: 100%; height: 100%"
                  src="../../assets/images/fire_show2.png"
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="right-left-connection2">
          <div class="fire-model-title">火场附近坡形坡地</div>
          <div class="slope-chart" style="width: 100%; height: 100%"></div>
        </div>
        <div class="right-left-uav2">
          <div class="fire-model-title" @click="UAVVideoClick">无人机视频</div>
          <div class="uav-list-wrap">
            <ul class="left-uav-list">
              <li>
                <div>
                  <video
                    src="../../assets/media/video.mp4"
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
                    src="../../assets/media/video1.mp4"
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

          <div class="left-uav-title" @click="monitoringVideoClick">
            监控点视频
          </div>
          <div class="uav-list-wrap">
            <ul class="left-uav-list">
              <li v-for="(i, k) in morningVideoList" :key="k">
                <div>
                  <video controls="controls" :id="`vedioPlayer${k}`" style="height: 100%; width: 100%"></video>
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
          <!-- <div class="fire-model-title">领导下达救援指令</div> -->
          <div class="fire-model-title">领导指令及反馈</div>
          <div class="right-right-order" v-if="false">
            <ul v-if="false">
              <li
                v-for="(item, index) in orderList"
                :key="index"
                v-show="index < 7"
              >
                <div>{{ item.commandDetail }}</div>
                <div>{{ item.commandTime.slice(-10) }}</div>
              </li>
            </ul>
          </div>
          <div class="right-right-content">
            <ul v-if="orderList.length">
              <li
                v-for="(item, index) in orderList"
                :key="index"
                :class="[index === 0 ? 'first-msg-li' : '']"
              >
                <div class="li-event-title">
                  <p>
                    <!-- <img :src="item.iconUrl" alt="" /> -->
                    <span>{{ item.position }}</span>
                    <span>{{ item.commanderName }}</span>
                    <span>{{ item.created.slice(8, 10) }}日</span>
                    <span>{{
                      item.created.slice(11, item.created.length)
                    }}</span>
                  </p>
                  <label
                    :class="[item.type === '1' ? 'green' : 'blue']"
                    for=""
                    >{{ item.commandTheme }}</label
                  >
                  <!--   <label :class="[item.type === '1' ? 'green' : 'blue']" for="">{{
                  item.commandTheme
                }}</label> -->
                </div>
                <div
                  v-if="item.commandDetail"
                  class="li-event-detail"
                  :class="[item.type === '1' ? 'bg-task' : 'bg-trouble']"
                >
                  {{ item.commandDetail }}
                  <div
                    v-if="item.feedBackList && item.feedBackList.length"
                    v-for="(fItem, fk) in item.feedBackList"
                    style="margin-top: 10px"
                  >
                    <p>{{ fItem.feedbackTime }}</p>
                    <p>
                      <label>{{ fItem.feedbackerNickName }}:</label
                      ><span>{{ fItem.feedbackerinfo }}</span>
                    </p>
                  </div>
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
        <!-- 	<div class="right-left-fire">
				<div class="fire-model-title">救援现场问题反馈</div>
         <div class="right-right-order">
            <ul v-if="false">
             <li v-for="(item,index) in orderList" :key="index">{{}}</li>
            </ul>
         </div>
			</div> -->
      </div>
    </div>
    <!-- 右侧模块-结束 -->
    <!-- 植被信息-开始 -->
    <div class="forest-message" v-if="false">
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
      <div
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
    </div>
    <!-- 植被信息-结束 -->
    <!-- <div class="forest-menu"></div> -->
    <!-- 事件轴 -->
    <div class="flex-time-wrap">
      <div class="time-inner">
        <div class="time-line">
          <!-- 刻度 -->
          <div class="calibration">
            <div style="max-height: 5vh">
              <p class="calibration-hours">{{ 0 }}小时</p>
              <p class="calibration-time">
                {{ beginTime.toLocaleTimeString().slice(2, -3) }}
              </p>
            </div>
            <div
              class="calibration-inner"
              v-for="(item, key) in timmerLineObj.nodeNum"
              :key="item"
              :style="item % 5 === 0 ? 'height:5vh' : ''"
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
            new Date(item).toLocaleString("chinese", { hour12: false })
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
    <div
      class="right-menu"
      style="height: 100%; width: 186px; position: fixed; right: 0"
    >
      <Menu></Menu>
    </div>
    <VideoTree
      ref="VideoTree"
      style="z-index: 9999"
      @areaCheckClick="areaCheckClick"
      @taskCheckClick="taskCheckClick"
      @searchListClick="videoSearchClick"
    ></VideoTree>
    <searchModel ref="SearchModel" />
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
    <RealTimeDisplay ref="RealTimeDisplay"></RealTimeDisplay>
    <FightingMaterials ref="FightingMaterials"></FightingMaterials>
    <UAVVideo ref="UAVVideo"></UAVVideo>
    <MonitoringVideo ref="MonitoringVideo"></MonitoringVideo>

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
    <teamDetail ref="TeamDetail" />
    <ContactPhone ref="ContactPhoneAll" />
  </div>
</template>
<script>
import Header from "@/components/APicture/header";
import Menu from "@/components/APicture/menu";
import FixedModel from "./components/fixedModel.vue"; // 防洪防涝点等
import VideoTree from "@/components/APicture/videoTree/index.vue";
import RealTimeDisplay from "./components/realTimeDisplay/index.vue";
import FightingMaterials from "./components/fightingMaterials/index.vue";
import UAVVideo from "./components/UAVVideo/index.vue";
import MonitoringVideo from "./components/monitoringVideo/index.vue";
import { MessagePush } from "@/utils/pushMinix"; //混入
import {
  getTeamInfo,
  getWeather,
  eventTaskSendDetail,
  yearsStaticsFire,
  getEventDetail,
  getArriveTeam,
  getNowWeater,
  oneDataWeater,
  getTeamDetail,
  getSeventDayWeater,
} from "@/api/floodPreventionWar";
import {
  nowDisasterRelief,
  nowFireBrigade,
  nowTeamExpert,
  nowTeamExpertChange,
  leftEventList,
} from "@/api/forestFire";
import {
  beginVideoStream,
  videoStreamActive,
  stopVideoStream,
} from "@/api/common";
import moment from "moment";
import indexVue from "../floodDedense/components/MeteorologyModule/index.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import Bus from "@/utils/Bus.js";
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue"; // 会商
import searchModel from "@/components/APicture/search/index.vue";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
import Cookies from "js-cookie";
import teamDetail from "./components/teamDetail";
import flvjs from "flv.js";
// import ContactPhone from "@/components/APicture/contactPhone/index.vue";
export default {
  props: {},
  components: {
    Header,
    Menu,
    vueSeamlessScroll,
    LayerConsulting,
    FixedModel,
    VideoTree,
    searchModel,
    ContactPhone,
    MessageSend,
    RealTimeDisplay,
    FightingMaterials,
    UAVVideo,
    MonitoringVideo,
    teamDetail,
    // ContactPhone
  },
  mixins: [MessagePush],
  data() {
    return {
      pageType: "show",
      // 当前救灾物资
      disasterReliefList: [
        {
          url: require("../../assets/images/forestFire/icon_car.png"),
          materialName: "消防车",
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
      // 救火专家队伍情况
      nowTeamExpertChangeList: [],
      //靶向范围选中
      targetingList: [
        { key: 0, name: "一公里" },
        { key: 1, name: "两公里" },
        { key: 2, name: "三公里" },
      ],
      eventSourceType: {
        0: "pc",
        1: "移动终端",
        2: "邮件",
        3: "短信",
        4: "电话",
        5: "其他",
      },
      targetingChose: 1,
      // 植被信息隐藏显示
      vegetationShow: false, // 全是植被信息
      checkVegetationInfo: false, // 查看植被信息
      waterInfo: false, //水源信息
      vegetationShowObj: {
        height: "auto",
      },
      vegetationHiddenObj: {
        height: "65px",
        overflow: "hidden",
      },
      // 物联点数据实时展示2
      connectionLabList: [
        { key: 0, name: "图片" },
        { key: 1, name: "视频" },
      ],
      tabActive: 0,
      temperatureOneDiv: null,
      temperatureTwoDiv: null,
      temObjShow: {
        nowTem: null,
        tem: null, // 温度
        waterTem: null, // 湿度,
        windDirection: null, // 风向
        windStrength: null, //
        weatherDesc: null, // 天气状态
      },
      // 火场坡度
      slopeChartDiv: null,
      // 指令对象
      orderList: [],
      feedBack: [],
      lineIsDown: false,
      saveMoveTime: 0,
      beginTime: new Date(),
      currentMoveTime: 0, // 时间轴改变的时间搓
      currentMoveStep: 0, // 时间轴行进的步数
      timeOut: null,
      yearsStaitcsObj: {
        // 年度火灾统计
        carNum: "",
        created: "",
        deathNum: "",
        equipmentList: [],
        minorWoundNum: "",
        personnelNum: "",
        ranksName: "",
        rescueTeamList: [],
        sceneReliefMaterialsList: [],
        seriousInjuryNum: "",
        waitReliefMaterialsList: [],
      },
      eventDatailObj: {},
      //时间轴配置
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
      // 短信发送
      sendOneK: 600,
      sendTwoK: 600,
      sendThreeK: 600,
      msgSendType: false,
      directiveList: [], //指令集合
      // 时间计算次数
      timeNum: 0,
      //到达的人数
      arrivePeople: 0,
      //到达的队伍
      arriveTeam: 0,
      // 在途的队伍
      inTeam: 3,
      //在途的人数
      inPeople: 35,
      // 指挥调度==========>部分
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
      leftRightEventDatatList: [],
      leftRightEventIndex: 0,
      // 协同会商
      synergyListData: [
        { name: "广州市应急管理局", key: 0, checked: false },
        { name: "增城区应急管理局", key: 2, checked: false },
        { name: "白云区应急管理局", key: 3, checked: false },
        { name: "花都区应急管理局", key: 4, checked: false },
        { name: "从化区应急管理局", key: 5, checked: false },
        { name: "增城区林业园林局", key: 6, checked: false },
        { name: "增城区公安分局", key: 7, checked: false },
        { name: "增城区气象局", key: 8, checked: false },
        { name: "广州市林火监测中心", key: 9, checked: false },
        { name: "增城区供电局", key: 10, checked: false },
        { name: "增城区卫生健康局", key: 11, checked: false },
        { name: "增城区委宣传部", key: 12, checked: false },
        { name: "增城区消防", key: 13, checked: false },
        { name: "省航空护林站", key: 14, checked: false },
      ],
      iconSelectTwoActive: null,
      // iconSelectTwoActive
      // 会商更多
      playerObjs: {
        show: false,
        title: "通讯录",
        iframeUrl: "/msg-abs#/mailList?token=",
      },
      // 监控点视频
      morningVideoList: [],
	  videoListBeat:null,
    };
  },
  watch: {
    lineIsDown: function (newVal, oldVal) {
      if (oldVal === true && !newVal) {
        //  console.log('====>',this.getNowTimeAbleMobe())
        let isMoveTime = new Date(this.beginTime).getTime() + this.saveMoveTime;
        // console.log(8989898,new Date(this.currentMoveTime).toLocaleString(),new Date(isMoveTime).toLocaleString())
        if (
          this.getNowTimeAbleMobe(isMoveTime) &&
          this.isCurrentWidth() !== "tooSmall"
        ) {
          // 是否允许拖动到此点
          this.currentMoveTime =
            new Date(this.beginTime).getTime() + this.saveMoveTime;
          this.getEventTaskSendDetail({ time: this.currentMoveTime });
          const greenLine = document.querySelector(".time-line-green");
          let nowGreenLine = parseFloat(greenLine.style.width);
          // this.getEventTaskSendDetail
          // console.log('greenLine1111111',parseFloat(greenLine.style.width));
          // console.log('greenLine1111111',this.currentMoveStep);

          this.directiveList = [];
          this.orderList = [];
          this.getEventTaskSendDetail();
          pGzznCore.addPromiseRollbackTeamPath(nowGreenLine);
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
    pushData: {
      handler(newVal, oldVal) {
        //console.log('testssss',newVal)
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
  created() {
    // this.remoteDatas();
    // 当前救灾===>不调用20200701
    // this.getNowDisasterRelief()
    // 当前队伍就火
    this.getNowFireBrigade();
    // 森林火灾专家情况
    // this.getNowTeamExpert()
    this.getNowTeamExpertChange();
    // 事件指令
    this.getEventTaskSendDetail();
    // 年度统计
    this.getYearsStaitcs();
    // 事件详情
    this.userIDGetEventDetail();
    // 事件列表
    this.getLeftEventList();
    // 获取实况天气
    this.doGetNowWeater();
    // 获取一整天的天气情况
    // this.doOneDataWeater();
    //  获取7天天气
    this.doGetSeventDayWeater();
    // console.log('cookieshow对对对',Cookies.get('token'))
    this.playerObjs.iframeUrl =
      this.playerObjs.iframeUrl + Cookies.get("token");
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
    window.mapInitPlaceChart = this.mapInitPlaceChart;
    window.remoteIotDeviceDatas = this.doGetIotDevice;
    window.remoteTeamInfoDatas = this.remoteDatas;
    window.remoteQuipmentDatas = this.doGeteQuipment;
    window.remoteFacilitieDatas = this.doGetFacilities;
    window.remoteTeamPersonDatas = this.doGetTeamPerson;
    window.changeMorningVideoList = this.changeMorningVideoList;
    this.$nextTick(() => {
      this.initTimeLine();
      this.initChart();
      this.timeLineMove();
      this.timeLineTimoutOut();
      if (this.$route.query && this.$route.query.isScale) {
        // 当路由带有isScale===true,触发缩放
        this.initScale();
      } else {
        this.init();
      }
    });
  },
  beforeDestroy() {
    try {
      pGzznCore.closeLayer3D();
      pGzznCore = null;
      this.timeOut = null;
    } catch (err) {}
  },
  methods: {
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
                }℃~${saveResponeList[0]["temp"] / 10}℃`, // 温度
                waterTem: saveObj.humidity, // 湿度,
                windDirection: saveObj.windDirectionText, // 风向
                windStrength: saveObj.windStrength/10 + 'm/s', //
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
    doOneDataWeater() {
      oneDataWeater()
        .then((res) => {
          if (res.success) {
            console.log(res);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 气象实时信息展示 点击出现气象弹窗
    temperatureClick($event, index) {
      // console.log("气象实时信息展示", $event, this.$refs.RealTimeDisplay);
      this.$refs.RealTimeDisplay.$emit("show", {
        saveEvent: $event,
        activeIndex: index,
      });
    },

    // 风力方向
    windClick($event, index) {
      // console.log("气象实时信息展示", $event, this.$refs.RealTimeDisplay);
      this.$refs.RealTimeDisplay.$emit("show", {
        saveEvent: $event,
        activeIndex: index,
      });
    },

    // 雷电
    thunderClick($event, index) {
      // console.log("气象实时信息展示", $event, this.$refs.RealTimeDisplay);
      this.$refs.RealTimeDisplay.$emit("show", {
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
    // 查询龙舟水左侧事件列表
    getLeftEventList() {
      leftEventList({ body: { eventType: "10007" } })
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
          }
        });
    },

    init() {
      layerLocation = $(".forest-left").width();
      mapToolLocation = $(".forest-right").width() + 252;
      pGzznCore = new gzznCore("crystalContainer", {
        imageryProviderViewModelsIndex: 1,
      });
      pGzznCore.FlyTo(2);
    },
    // 初始化Echart图
    initChart() {
      // 温度统计1
      this.getWeatherFun().then((res) => {
        console.log(res)
        this.temperatureOneDiv = this.$echarts.init(
          document.getElementsByClassName("meteorology-chart-line")[0]
        );
        // if(res.xDabaList)  {}
        /*  xDabaList: xDabaList,
            seriesDataList: seriesDataList,
            xDabaListWater: xDabaListWater,
            seriesDatWateraList: seriesDatWateraList,) 
        */
        let resDatas = {
          titleName: "温度统计",
          seriesName: "温度统计",
          ...res,
        };
        if(!resDatas.xDabaList){
          resDatas.xDabaList = []
          for(let x =0;x<7;x++){
            let text = ((new Date().getHours())+x)+ ":00"
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
      // 坡度地形图
      this.slopeChartDiv = this.$echarts.init(
        document.getElementsByClassName("slope-chart")[0]
      );
      //this.slopeChartDiv.setOption(this.placeChart());

      // 物联点实时数据统计

      // 当前主要蓄水情况
    },
    // 初始化放大处理
    initScale() {
      const heightClint = document.querySelector("body").clientHeight; //整个窗口的高度
      const widthClint = document.querySelector("body").clientWidth; // 整个窗口的宽度
      const columnNum = parseFloat((heightClint / 1889).toFixed(2)); // 计算比例
      const widthScrac = parseFloat((widthClint / 9120).toFixed(2)); // 宽度
      const leftDiv = document.querySelector(".forest-left"); // 获取左部元素
      const rightDiv = document.querySelector(".forest-right"); // 获取右部元素
      const forestCenterStatic = document.querySelector(".forest-center"); // 中间统计
      const timeLineDiv = document.querySelector(".flex-time-wrap"); // 时间轴统计
      const showMapDiv = document.querySelector(".show-map"); // 地图
      const envCenterInfo = document.querySelector("#envCenterInfo"); // 地图信息
      const mapFlexIcon = document.querySelectorAll(".map-flex-icon");
      leftDiv.style.transform = `scale(${widthScrac},${columnNum})`;
      leftDiv.style.transformOrigin = "0 0";
      rightDiv.style.transform = `scale(${widthScrac},${columnNum})`;
      rightDiv.style.transformOrigin = "top right";
      const menus = document.querySelector(".right-menu"); // 获取菜单栏
      menus.style.transform = `scale(${widthScrac},${columnNum})`;
      menus.style.transformOrigin = "top right";
      menus.style.top =
        (heightClint -
          document.querySelector(".c-menus").offsetHeight * columnNum) /
          2 +
        124 +
        "px"; // 获取菜单栏'90px'
      menus.style.right = 0;
      //  menus.style.
      // menus.style.height = heightClint + 'px'
      // 页面标题
      // const headerTitle =  document.querySelector('.picture-header')
      // headerTitle.style.transform= `scale(${columnNum})`
      // headerTitle.style.transformOrigin = 'top left'
      forestCenterStatic.style.transform = `scale(${widthScrac},${columnNum})`;
      forestCenterStatic.style.transformOrigin = "0 0";
      timeLineDiv.style.transform = `scale(${widthScrac},${columnNum})`;
      timeLineDiv.style.transformOrigin = "0 0";
      //envCenterInfo.style.transform = `scale(${widthScrac},${columnNum})`;
      showMapDiv.style.width = "60%";
      /* 计算时间轴位置 */
      timeLineDiv.style.left =
        (widthClint - timeLineDiv.clientWidth * widthScrac) / 2 + "px";
      forestCenterStatic.style.left =
        (widthClint - forestCenterStatic.clientWidth * widthScrac) / 2 + "px";

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
      pGzznCore = new gzznCore("crystalContainer", {
        imageryProviderViewModelsIndex: 1,
      });
      pGzznCore.FlyTo(2);
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
      // = '900px';
    },
    synergyClick(i, k) {
      this.synergyListData[k]["checked"] = !this.synergyListData[k]["checked"];
    },
    // 动态创建蒙层
    creadElements() {},
    // 靶向范围选择
    doChoseTarget(key) {
      this.targetingChose = key;
    },
    // 植被信息显示
    toShowVegetation(type) {
      this["" + type] = true;
    },
    // 隐藏植被信息
    toHiddenVegetation(type) {
      this["" + type] = false;
    },
    //
    doTabActive(key) {
      this.tabActive = key;
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
    mapInitPlaceChart(vValue) {
      this.slopeChartDiv.setOption(this.placeChart(vValue));
    },
    // 获取应急人员
    doGetTeamPerson(res) {
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
    // 获取设施
    doGetFacilities(res) {
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
    // 获取装备
    doGeteQuipment(res) {
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
    remoteDatas(res) {
      // 应急队伍，修改成按范围注入
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
      this.thingList[4]["listDeviceData"] = [];
      if (res.body && res.body.length) {
        let saveList = JSON.parse(JSON.stringify(res.body));
        saveList.map((i, k) => {
          i.active = false;
          this.thingList[4]["listDeviceData"].push(i);
        });
      }
    },
    // 地形chart
    placeChart(value) {
      let that = this;
      var date = [];
      var data = [];
      var arr = value.split("-");
      var team = arr[0].split(",");
      var team1 = arr[1].split(",");
      for (var i = 0; i < team.length; i++) {
        date.push(team[i]);
        data.push(team1[i]);
      }
      var option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: 28,
          },
          position: function (pt) {
            return [pt[0], "10%"];
          },
          formatter: function (param) {
            let item = param[0];
            let poc = "距离";
            let str = "";
            str +=
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              item.color +
              '"></span>' +
              poc +
              " : " +
              parseInt(item.axisValue) +
              "<br />";
            str +=
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
              item.color +
              '"></span>' +
              item.seriesName +
              " : " +
              item.value +
              "<br />";
            return str;
          },
        },
        title: {
          left: "center",
          text: "剖面分析图",
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            formatter: "{value} 米",
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            formatter: "{value} 米",
          },
        },
        series: [
          {
            name: "高程",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: data,
          },
        ],
      };
      return option;
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
                this.temObjShow = JSON.parse(
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
                );
                resolve({
                  xDabaList: xDabaList,
                  seriesDataList: seriesDataList,
                  xDabaListWater: xDabaListWater,
                  seriesDatWateraList: seriesDatWateraList,
                });
              } else {
                resolve({});
              }
            } else {
              resolve({});
            }
          })
          .catch((error) => {
            if (error) {
              reject({
                /*    xDabaList: xDabaList,
                seriesDataList: seriesDataList,
                xDabaListWater: xDabaListWater,
                seriesDatWateraList: seriesDatWateraList, */
              });
            }
          });
      });
    },
    // 地形chart

    // 当前救灾物资
    getNowDisasterRelief() {
      nowDisasterRelief().then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            this.disasterReliefList.map((item, index) => {
              let saveObj = null;
              saveObj = res.body.find((i, k) => {
                // console.log(item.materialName,i.materialName)
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
            // this.disasterReliefList = JSON.parse(JSON.stringify(res.body))
          }
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
    // 当前救火队伍救火情况
    getNowFireBrigade() {
      nowFireBrigade().then((res) => {
        if (res.success) {
          if (res.body && res.body.length) {
            console.log("当前救火队伍救火情况", res.body);
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
    // 森林火灾专家情况
    getNowTeamExpertChange() {
      nowTeamExpertChange().then((res) => {
        if (res.success) {
          console.log("森林火灾专家情况", res);
          if (res.body && res.body.length) {
            this.nowTeamExpertChangeList = res.body;
          }
        }
      });
    },
    // 获取年度统计
    getYearsStaitcs(callBack = () => {}) {
      yearsStaticsFire({ body: { sid: "2521067874866184192" } }).then((res) => {
        if (res.success) {
          console.log("年度火灾统计", res);
          this.yearsStaitcsObj = JSON.parse(JSON.stringify(res.body));
          if (
            res.body &&
            res.body["sceneReliefMaterialsList"] &&
            res.body["sceneReliefMaterialsList"].length
          ) {
            console.log("ojbk");
            this.disasterReliefList.map((item, index) => {
              let saveObj = null;
              saveObj = res.body["sceneReliefMaterialsList"].find((i, k) => {
                // console.log(item.materialName,i.materialName)
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
            console.log(this.disasterReliefList);
          }
          callBack();
        }
      });
    },
    // 根据id 获取事件详情
    userIDGetEventDetail() {
      getEventDetail({
        body: {
          sid: "2712883158710632581",
        },
      }).then((res) => {
        if (res.success) {
          this.eventDatailObj = {};
          if (res.body && res.body.length) {
            this.eventDatailObj = res.body[0];
          }
          // console.log('事件详情',res)
        }
      });
    },
    // 事件详情
    getEventTaskSendDetail(data = null) {
      // console.log('jjjjjjjjjj',moment(new Date()).format('YYYY-MM-DD hh:mm:ss'))
      let send = {
        eventId: data && data.sid ? data.sid : "2521067874866184192",
      };
      if (data) {
        send.startDate = moment(data.time).format("YYYY-MM-DD HH:mm:ss");
      }
      const that = this;
      const play = (size) => {
        let arr = that.directiveList.length - 1;
        let showArr =
          that.orderList.length - 1 < 0 ? 0 : that.orderList.length - 1;
        let saveCurrentList = that.directiveList.slice(
          arr - showArr - size,
          arr - showArr
        );
        that.orderList.unshift(...saveCurrentList);
        that.$nextTick(() => {
          const eventDiv = document.querySelector(".first-msg-li");
          eventDiv.classList.add("new-message");
          eventDiv.addEventListener("webkitAnimationEnd", function () {
            eventDiv.classList.remove("new-message");
          });
        });
      };

      if (this.directiveList.length <= 0) {
        eventTaskSendDetail({ body: { ...send } }).then((res) => {
          this.directiveList = res.body;
          if (res.body && res.body.length) {
            play(3);
          }
        });
      } else {
        if (this.timeNum % 4 === 0) {
          play(1);
        }
      }
      return;

      eventTaskSendDetail({ body: { ...send } }).then((res) => {
        console.log("事件指令", res);
        if (res.success) {
          let saveList = res.body;
          if (saveList && saveList.length) {
            saveList.map((item, index) => {
              this.orderList.push(item);
              this.feedBack.push(item.feedBackList[0]);
            });

            this.$nextTick(() => {
              const eventDiv = document.querySelector(".first-msg-li");
              eventDiv.classList.add("new-message");
              eventDiv.addEventListener("webkitAnimationEnd", function () {
                eventDiv.classList.remove("new-message");
              });
            });
          }
        }
      });
    },
    // 救火队伍-点击
    fireTeamClick(item, index) {
      pGzznCore.addPromiseFireTeamLoc(item.sid);
    },
    // 救火专家-点击
    teamExpertClick(item, index) {
      pGzznCore.addPromiseFireExpertLocation(item.sid);
    },
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
    // 当绿色时间轴大于 2700 || 小于130 时触发
    isCurrentWidth() {
      const greenLine = document.querySelector(".time-line-green");
      let gWidth = parseInt(greenLine.style.width.replace("px", ""));
      if (gWidth >= 2700) {
        // 大于 2700
        this.initTimeLine();
        return "tooBig";
      } else if (gWidth < 130) {
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
      let that = this;
      this.timeOut = setTimeout(() => {
        console.log(
          "greenLine",
          parseFloat(greenLine.style.width),
          greenLine.offsetWidth,
          oneSecondPx
        );
        // alert(333)
        this.currentMoveStep = parseFloat(greenLine.style.width);
        pGzznCore.addPromiseUpdateTeamPath(
          this.currentMoveStep,
          function (vValue) {
            // alert(44)
            console.log(vValue); //应急队伍到达火场触发
            that.getTeamList([vValue.sid]);
            // 当前救灾物资
          }
        );
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
        this.timeNum++;
        this.timeLineTimoutOut();
        this.getEventTaskSendDetail({ time: new Date() });
      }, second);
      this.isCurrentWidth();
    },

    // 获取队伍
    getTeamList(arr) {
      getArriveTeam({ body: arr }).then((res) => {
        if (res.success) {
          // this.getNowDisasterRelief()
          // 救火年度统计
          this.getYearsStaitcs(() => {
            let scenList = JSON.parse(
              JSON.stringify(this.yearsStaitcsObj["sceneReliefMaterialsList"])
            ); // 年度统计
            this.disasterReliefList.map((item, index) => {
              let saveObj = null;
              saveObj = scenList.find((i, k) => {
                // console.log(item.materialName,i.materialName)
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
          });
        } else {
        }
      });
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
      this.getEventTaskSendDetail();
      this.beginTime = this.sixTimeModelList[this.sixTimeModelList.length - 1];
      this.initDateGreenLine(); //回到当前时间点
      this.timeLineTimoutOut();
    },

    isSendMsg() {
      this.msgSendType = true;
    },
    // 指挥调度部分=====>>>

    // 事件切换
    leftEventChange(item, index) {
      console.log(index);
      this.leftRightEventIndex = index;
    },
    scopeHandelActive(item, index) {
      this.scopeActive = index;
      pGzznCore.addPromiseEventRange(item.key, false);
    },
    doOpenShow(item, index) {
      this.thingList[index]["active"] = !item.active;
    },
    // 点击定位
    toPointerHanderl(item) {
      this.radioTabsActiveObj = item;
      this.toInitTimeLineList(item.created, () => {});
      // this.getLeftEventDetail(item);
      // this.doGetEmergencyPlan(item);
      pGzznCore.addPromiseEventInfo(item);
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
      //this.$emit("openConsulting")
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
    // 当前救火队伍详情
    showTeamDetail(i, k, e) {
      this.$refs.TeamDetail.$emit("show", {
        ...i,
        key: k,
        saveEvent: e,
        title: i.name,
      });
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
				let droneVedioPlayer = flvjs.createPlayer({
					type: 'flv',
					url: res.body[i].playUrlMap.FLV,
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
    // 点击电话icons
    clickToPhone(i, k, e) {
      let sendMsg = {
        name: "海参",
        phone: "15919304717",
      };
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
    /*  // 当前救火队伍详情
    showExpertDetail(i, k, e) {
      this.$refs.TeamDetail.$emit("show", {
        ...i,
        key: k,
        saveEvent: e,
        title: i.name,
        pageType:'expert'
      });
    }, */
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
    pushData(){
      return this.$store.getters.responeData
    }
  },
};
</script>

<style scoped="scoped" lang="less">
@import "./index.less";
</style>
