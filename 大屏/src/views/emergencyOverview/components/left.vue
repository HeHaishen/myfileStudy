<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-09-29 15:45:14
-->
<template>
  <div class="emergency-overview-left">
    <div class="left-left">
      <div class="model-title">突发事件总览</div>
      <div class="update-time position-update-time">
        更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <div class="year-add-up">
        <div class="show-year">
          <span>{{ new Date().getFullYear() }}</span>
          <label>年累计</label>
        </div>
        <div class="year-type-list">
          <div
            class="list-show"
            v-for="(i, k) in addUpList"
            :key="k"
            :class="{ margins: k === 1 }"
          >
            <p class="list-show-title">{{ i.title }}</p>
            <p
              class="list-show-num"
              :style="{
                background: `url('${i.bg}') center no-repeat`,
                'background-size': '100%',
              }"
            >
              {{ i.num }}
            </p>
          </div>
        </div>
      </div>
      <div class="every-year-wrap" style="margin-bottom: 10px">
        <div class="model-little-title">历年突发事件总量</div>
        <div class="chart-opation">
          <p
            class="type-btn"
            v-for="(i, k) in totalBtnList"
            :key="k"
            @click="doActiveBtn(i, k)"
            :class="{ 'btn-active-type': activeBtnKey === k }"
          >
            {{ i.name }}
          </p>
          <p class="c-select-wrap">
            <select
              class="c-select"
              v-model="timeHorizon.startTime"
              @change="beginYearChange"
            >
              <option v-for="(i, k) in beginYearList" :key="k">{{ i }}</option>
            </select>
            <span>-</span
            ><select
              class="c-select"
              v-model="timeHorizon.endTime"
              @change="endYearChange"
            >
              <option v-for="(i, k) in beginYearList" :key="k">{{ i }}</option>
            </select>
          </p>
        </div>
        <div class="chart-show-event chart-event-total"></div>
      </div>
      <div class="every-year-wrap">
        <div class="model-little-title">
          历年突发事件{{ eventBtnList[activeEventBtnKey].name }}
        </div>
        <div class="chart-opation">
          <p
            class="type-btn"
            v-for="(i, k) in eventBtnList"
            :key="k"
            @click="doEventBtn(i, k)"
            :class="{ 'btn-active-type': activeEventBtnKey === k }"
          >
            {{ i.name }}
          </p>
        </div>
        <!-- 死亡人数 -->
        <div class="chart-show-event chart-event-death"></div>
        <!-- 经济损失 -->
      </div>
    </div>
    <div class="left-right">
      <div class="left-right-top">
        <div class="model-title">预警总览</div>
        <div class="update-time position-update-time">
          更新时间：{{ moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <div class="position-total-title">
          <span>{{ new Date().getFullYear() }}年预警总数</span>
          <span>{{ warningTotalNum }}</span>
        </div>
        <div class="left-right-content">
          <div class="right-top-top wraning-chart"></div>
          <div class="right-top-bottom">
            <div class="top-bottom-title">三大运营商预警发布</div>
            <div class="top-bottom-content" @click="topBottomClick">
              <div>
                <p>{{ new Date().getFullYear() }}年发布次数</p>
                <p class="green-bg">{{ WarningPublish.releaseNum }}</p>
                <p>
                  同比上升<label for="">{{ WarningPublish.numberRise }}%</label>
                </p>
              </div>
              <div>
                <p>{{ new Date().getFullYear() }}年发布人次</p>
                <p class="blue-bg">{{ WarningPublish.releasePersonTime }}</p>
                <p>
                  同步上升<label for="">{{ WarningPublish.personRise }}%</label>
                </p>
              </div>
            </div>
            <div class="top-bottom-title">舆情监测</div>
            <div class="top-bottom-opinion">
              <div class="opinion-content">
                <div class="check-content">监测内容</div>
                <div class="check-center">
                  <div></div>
                  <p>789</p>
                </div>
                <div class="check-right">
                  <p
                    v-for="item in publicMonitor"
                    :key="item.key"
                    @click="publicMonitorClick(item.name,item)"
                  >
                    {{ item.name }}
                  </p>
                  <!-- <p>日报</p>
                  <p>周报</p>
                  <p>简报</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <pop-up-layer
          v-if="showPop"
          :show="showPop"
          ref="myPopUpLayer"
          class="leftTable"
          :title="popTitle"
          @doClose="close"
        >
          <template slot="content">
            <div class="chart-event-month"></div>
          </template>
        </pop-up-layer>
      </div>

      <div class="left-right-bottom">
        <div class="model-title">应急资源总览</div>
        <ul>
          <li v-for="(i, k) in resourcesList" :key="k" @click="switchCamera(k)">
            <div>
              <p><img :src="i.img" alt="" /></p>
              <p>{{ i.name }}</p>
              <p>
                <span :style="{ color: i.color }">{{ i.number }}</span>
                <span>{{ i.unit }}</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="model-title">应急预案总览</div>
        <ul>
          <li
            v-for="(i, k) in planList"
            :key="k"
            @click="emergencyPlanClick(k)"
          >
            <div>
              <p><img :src="i.img" alt="" /></p>
              <p>{{ i.name }}</p>
              <p>
                <span :style="{ color: i.color }">{{ i.number }}</span>
                <!-- <span>{{i.unit}}</span> -->
              </p>
            </div>
          </li>
        </ul>

        <pop-up-layer
          v-if="showPop_bottom"
          :show="showPop_bottom"
          ref="myPopUpLayer"
          class="leftTable_bottom"
          :title="popTitle_box"
          @doClose="closeFn"
        >
          <template slot="content">
            <div class="chart-event-die"></div>
          </template>
        </pop-up-layer>

        <!--  应急预案  -->
        <tempPop
          :title="emergencyPlan.title"
          :show="emergencyPlan.show"
          :v-show="emergencyPlan.show"
          :setStyles="{ left: '27%', top: '63%' }"
          class="command-table command-table3"
          @doClose="emergencyClose"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="emer-top">
              <div class="emergencyChart"></div>
              <div class="emer-top-right">
                <li
                  class="child"
                  v-for="(item, index) in emergencyPlan.typeList"
                  :key="index"
                >
                  <div class="name">{{ item.name }}</div>
                  <div class="value">{{ item.value }}</div>
                </li>
              </div>
            </div>
            <div class="emer-bottom">
              <div class="search">
                <div class="water_search">
                  <a-input-search
                    placeholder="输入关键字"
                    v-model="emergencyTeam.input"
                    @search="emergencyTeamInput"
                  />
                </div>

                <!-- <div class="search-icon">
                  <input type="text" v-model="emergencyPlan.input" />
                  <div class="icon-container" @click="emergencyPlanInput">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div> -->
              </div>

              <div class="emergency-table">
                <Table
                  :columns="emergencyPlan.columnHeader"
                  :listData="emergencyPlan.tableList"
                >
                  <template slot="zjgxsj" slot-scope="{ record, text }">
                    <div>
                      {{ text.split(" ")[0] }}
                    </div>
                  </template>
                </Table>
              </div>
              <div class="list-change-page">
                <ChangePage
                  :total="emergencyPlan.total"
                  :currentPage="emergencyPlan.currentPage"
                  @changePages="clickEmergencyPlanChangePages"
                />
              </div>
            </div>
          </template>
        </tempPop>

        <!-- 应急队伍 -->
        <tempPop
          :title="emergencyTeam.title"
          :show="emergencyTeam.show"
          :v-show="emergencyTeam.show"
          :setStyles="{ left: '10%', top: '50%' }"
          class="command-table command-table3"
          @doClose="resourceClose('0')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="content-header">
              <ul class="team-list">
                <li
                  class="tabs"
                  v-for="(item, index) in emergencyTeam.list"
                  :key="item.key"
                  :class="
                    emergencyTeam.emergencyTeamIndex == index ? 'active' : ''
                  "
                  @click="emergencyTeamClick(index)"
                >
                  {{ item.type }}
                </li>
              </ul>
              <div v-show="emergencyTeam.emergencyTeamIndex == 1" class="c-function">
                <button class="video-discussion">视频会商</button>
                <button
                  class="checkedAll"
                  @click="checkedAllClick"
                  v-show="emergencyTeam.teamList.length != 0"
                >
                  全选
                </button>
              </div>
            </div>

            <div
              class="emergency-team-list"
              v-show="emergencyTeam.emergencyTeamIndex == 1"
            >
              <div class="search-row">
                <div class="time">更新：{{ emergencyTeam.date }}</div>
                <div class="search-icon">
                  <input type="text" v-model="emergencyTeam.input" />
                  <div class="icon-container" @click="emergencyTeamInput">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>
              <ul class="table-list">
                <li
                  class="table-child"
                  v-for="(item, index) in emergencyTeam.tableList"
                  :key="item.key"
                  :class="[
                    emergencyTeam.tableListIndex === index ? 'active' : '',
                  ]"
                >
                  {{ item.type }}
                </li>
              </ul>
              <div class="emergency-team-table">
                <Table
                  :columns="emergencyTeam.teamHeader"
                  :listData="emergencyTeam.teamList"
                >
                  <template slot="checked" slot-scope="{ record, text, index }">
                    <div
                      class="checked mouse-click"
                      @click="checkedClick(record, index)"
                    >
                      {{ text ? "√" : "" }}
                    </div>
                  </template>
                  <template slot="position" slot-scope="{ record, text }">
                    <div class="border" @click="emergencyTeamLocation(record)">
                      定位
                    </div>
                  </template>
                  <template slot="fzryddh" slot-scope="{ record, text }">
                    <div>
                      {{ text }}
                      <a-icon
                        type="phone"
                        class="icon"
                        @click="emergencyTeamMobilePhone(record, $event)"
                        v-show="record.fzryddh"
                      />
                      <a-icon
                        type="mail"
                        class="icon"
                        @click="emergencyTeamMessage(record, $event)"
                        v-show="record.fzryddh"
                      />
                    </div>
                  </template>
                </Table>
                <div class="list-change-page">
                  <ChangePage
                    :total="emergencyTeam.total"
                    :currentPage="emergencyTeam.currentPage"
                    @changePages="clickEmergencyTeamChangePages"
                  />
                </div>
              </div>
            </div>

            <div
              class="emergency-team-chart"
              v-show="emergencyTeam.emergencyTeamIndex == 0"
            >
              <div class="sum-chart">
                <div class="left-sum">
                  <div class="title">
                    {{ emergencyTeam.year }}年应急队伍数量统计
                  </div>
                  <div class="time">更新：{{ emergencyTeam.date }}</div>
                </div>
                <div class="rightChart"></div>
              </div>
              <div class="region-chart">
                <div class="left-sum">
                  <div class="title">
                    {{ emergencyTeam.year }}年应急队伍数量统计
                  </div>
                  <div class="time">更新：{{ emergencyTeam.date }}</div>
                </div>
                <div class="rightChart"></div>
              </div>
            </div>
          </template>
        </tempPop>

        <!-- 应急场所 -->
        <tempPop
          :title="emergencySite.title"
          :show="emergencySite.show"
          :v-show="emergencySite.show"
          :setStyles="{ left: '15%', top: '55%' }"
          class="command-table command-table3"
          @doClose="resourceClose('1')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="content-header">
              <ul class="team-list">
                <li
                  class="tabs"
                  v-for="(item, index) in emergencySite.list"
                  :key="item.key"
                  :class="
                    emergencySite.emergencySiteIndex == index ? 'active' : ''
                  "
                  @click="emergencySiteClick(index)"
                >
                  {{ item.type }}
                </li>
              </ul>
              <div v-show="emergencySite.emergencySiteIndex == 1" class="c-function">
                <button class="video-discussion">视频会商</button>
                <button
                  class="checkedAll"
                  @click="checkedSiteAllClick"
                  v-show="emergencySite.teamList.length != 0"
                >
                  全选
                </button>
              </div>
            </div>
            <div
              class="emergency-team-list"
              v-show="emergencySite.emergencySiteIndex == 1"
            >
              <div class="search-row">
                <div class="time">更新：{{ emergencySite.date }}</div>
                <div class="search-icon">
                  <input type="text" v-model="emergencySite.input" />
                  <div class="icon-container" @click="emergencySiteInput">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>
              <ul class="table-list">
                <li
                  class="table-child"
                  v-for="(item, index) in emergencySite.tableList"
                  :key="item.key"
                  :class="[
                    emergencySite.tableListIndex === index ? 'active' : '',
                  ]"
                >
                  {{ item.type }}
                </li>
              </ul>
              <div class="emergency-team-table">
                <Table
                  :columns="emergencySite.teamHeader"
                  :listData="emergencySite.teamList"
                >
                  <template slot="checked" slot-scope="{ record, text, index }">
                    <div
                      class="checked mouse-click"
                      @click="checkedSiteClick(record, index)"
                    >
                      {{ text ? "√" : "" }}
                    </div>
                  </template>
                  <template slot="position" slot-scope="{ record, text }">
                    <div
                      class="border"
                      @click="emergencyTeamLocation(record, 11)"
                    >
                      定位
                    </div>
                  </template>
                  <template slot="fzryddh" slot-scope="{ record, text }">
                    <div>
                      {{ text }}
                      <a-icon
                        type="phone"
                        class="icon"
                        @click="emergencySiteMobilePhone(record, $event)"
                        v-show="record.fzryddh != '暂无'"
                      />
                      <a-icon
                        type="mail"
                        class="icon"
                        @click="emergencySiteMessage(record, $event)"
                        v-show="record.fzryddh != '暂无'"
                      />
                    </div>
                  </template>
                </Table>
                <div class="list-change-page">
                  <ChangePage
                    :total="emergencySite.total"
                    :currentPage="emergencySite.currentPage"
                    @changePages="clickEmergencySiteChangePages"
                  />
                </div>
              </div>
            </div>

            <div
              class="emergency-team-chart"
              v-show="emergencySite.emergencySiteIndex == 0"
            >
              <div class="sum-chart">
                <div class="left-sum">
                  <div class="title">应急场所各区数量统计</div>
                  <div class="time">更新：{{ emergencySite.date }}</div>
                </div>
                <div class="rightChart"></div>
              </div>
              <!-- <div class="region-chart">
                <div class="left">
                  <div class="title">2020年应急队伍数量统计</div>
                  <div class="time">
                    更新：{{ emergencySite.date }}
                  </div>
                </div>
                <div class="rightChart"></div>
              </div> -->
            </div>
          </template>
        </tempPop>
        <!-- 应急专家 -->
        <tempPop
          :title="emergencyExpert.title"
          :show="emergencyExpert.show"
          :v-show="emergencyExpert.show"
          :setStyles="{ left: '20%', top: '60%' }"
          class="command-table command-table3"
          @doClose="resourceClose('2')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="content-header">
              <ul class="team-list">
                <li
                  class="tabs"
                  v-for="(item, index) in emergencyExpert.list"
                  :key="item.key"
                  :class="
                    emergencyExpert.emergencyExpertIndex == index
                      ? 'active'
                      : ''
                  "
                  @click="emergencyExpertClick(index)"
                >
                  {{ item.type }}
                </li>
              </ul>
              <div v-show="emergencyExpert.emergencyExpertIndex == 1" class="c-function"> 
                <button class="video-discussion">视频会商</button>
                <button
                  class="checkedAll"
                  @click="checkedExpertAllClick"
                  v-show="emergencyTeam.teamList.length != 0"
                >
                  全选
                </button>
              </div>
            </div>
            <div
              class="emergency-team-list"
              v-show="emergencyExpert.emergencyExpertIndex == 1"
            >
              <div class="search-row">
                <div class="time">更新：{{ emergencyExpert.date }}</div>
                <div class="search-icon">
                  <input type="text" v-model="emergencyExpert.input" />
                  <div class="icon-container" @click="emergencyExpertInput">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>
              <!-- <ul class="table-list">
                <li
                  class="table-child"
                  v-for="(item, index) in emergencyExpert.tableList"
                  :key="item.key"
                  :class="[
                    emergencyExpert.tableListIndex === index ? 'active' : '',
                  ]"
                >
                  {{ item.type }}
                </li>
              </ul> -->
              <div class="emergency-team-table">
                <Table
                  :columns="emergencyExpert.teamHeader"
                  :listData="emergencyExpert.teamList"
                >
                  <!-- <template slot="position" slot-scope="{ record, text }">
                    <div class="border">定位</div>
                  </template> -->
                  <template slot="yddh" slot-scope="{ record, text }">
                    <div>
                      {{ text }}
                      <a-icon
                        type="phone"
                        class="icon"
                        @click="emergencyExpertMobilePhone(record, $event)"
                        v-show="record.yddh"
                      />
                      <a-icon
                        type="mail"
                        class="icon"
                        @click="emergencyExpertMessage(record, $event)"
                        v-show="record.yddh"
                      />
                    </div>
                  </template>
                  <template slot="checked" slot-scope="{ record, text, index }">
                    <div
                      class="checked mouse-click"
                      @click="checkedExpertClick(record, index)"
                    >
                      {{ text ? "√" : "" }}
                    </div>
                  </template>
                </Table>
                <div class="list-change-page">
                  <ChangePage
                    :total="emergencyExpert.total"
                    :currentPage="emergencyExpert.currentPage"
                    @changePages="clickEmergencyExpertChangePages"
                  />
                </div>
              </div>
            </div>

            <div
              class="emergency-team-chart"
              v-show="emergencyExpert.emergencyExpertIndex == 0"
            >
              <div class="sum-chart">
                <div class="left-sum">
                  <div class="title">
                    {{ emergencyExpert.year }}年应急专家数量统计
                  </div>
                  <div class="time">更新：{{ emergencyExpert.date }}</div>
                </div>
                <div class="rightChart"></div>
              </div>
              <!-- <div class="region-chart">
                <div class="left">
                  <div class="title">2020年各区应急专家数量统计</div>
                  <div class="time">更新：{{ emergencyExpert.date }}</div>
                </div>
                <div class="rightChart"></div>
              </div> -->
            </div>
          </template>
        </tempPop>

        <!-- 应急仓库 -->
        <tempPop
          :title="materialWarehouse.title"
          :show="materialWarehouse.show"
          :v-show="materialWarehouse.show"
          :setStyles="{ left: '25%', top: '65%' }"
          class="command-table command-table3"
          @doClose="resourceClose('3')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <ul class="team-list">
              <li
                class="tabs"
                v-for="(item, index) in materialWarehouse.list"
                :key="item.key"
                :class="
                  materialWarehouse.materialWarehouseIndex == index
                    ? 'active'
                    : ''
                "
                @click="materialWarehouseClick(index)"
              >
                {{ item.type }}
              </li>
            </ul>
            <div
              class="emergency-team-list"
              v-show="materialWarehouse.materialWarehouseIndex == 1"
            >
              <div class="search-row">
                <div class="time">
                  更新：{{ moment(new Date()).format("YYYY年MM月") }}
                </div>
                <div class="search-icon">
                  <input type="text" v-model="materialWarehouse.input" />
                  <div class="icon-container" @click="materialWarehouseInput">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>
              <ul class="table-list">
                <li
                  class="table-child"
                  v-for="(item, index) in materialWarehouse.tableList"
                  :key="item.key"
                  :class="[
                    materialWarehouse.tableListIndex === index ? 'active' : '',
                  ]"
                >
                  {{ item.type }}
                </li>
              </ul>
              <div class="emergency-team-table">
                <Table
                  :columns="materialWarehouse.teamHeader"
                  :listData="materialWarehouse.teamList"
                >
                  <template slot="position" slot-scope="{ record, text }">
                    <div class="border">{{ text }}</div>
                  </template>
                </Table>
                <div class="list-change-page">
                  <ChangePage
                    :total="materialWarehouse.total"
                    :currentPage="materialWarehouse.currentPage"
                    @changePages="clickMaterialWarehouseChangePages"
                  />
                </div>
              </div>
            </div>

            <div
              class="emergency-team-chart"
              v-show="materialWarehouse.materialWarehouseIndex == 0"
            >
              <div class="sum-chart">
                <div class="left">
                  <div class="title">物资类型占比统计</div>
                  <div class="time">
                    更新：{{ moment(new Date()).format("YYYY年MM月") }}
                  </div>
                </div>
                <div class="rightChart"></div>
              </div>
              <div class="region-chart">
                <div class="left">
                  <div class="title">物资仓库各区数量统计</div>
                  <div class="time">
                    更新：{{ moment(new Date()).format("YYYY年MM月") }}
                  </div>
                </div>
                <div class="rightChart"></div>
              </div>
            </div>
          </template>
        </tempPop>
        <!-- 示范社区 Demonstration community-->
        <tempPop
          :title="community.title"
          :show="community.show"
          :v-show="community.show"
          :setStyles="{ left: '30%', top: '70%' }"
          class="command-table command-table3"
          @doClose="resourceClose('4')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="search-row">
              <div class="time">
                更新：{{ moment(new Date()).format("YYYY年MM月") }}
              </div>
              <div class="water_search">
                <a-input-search
                  placeholder="输入关键字"
                  v-model="community.input"
                  @search="communityClick"
                />
              </div>
              <!-- <div class="search-icon">
                <input type="text" v-model="community.input" />
                <div class="icon-container" @click="communityClick">
                  <img :src="iconSearch" alt="" class="img" />
                </div>
              </div> -->
            </div>
            <div class="emergency-team-table">
              <Table
                :columns="community.teamHeader"
                :listData="community.teamList"
              >
                <template slot="position" slot-scope="{ record, text }">
                  <div class="border" @click="emergencyTeamLocation(record, 4)">
                    定位
                  </div>
                </template>
              </Table>
            </div>
            <div class="list-change-page">
              <ChangePage
                :total="community.total"
                :currentPage="community.currentPage"
                @changePages="clickCommunityChangePages"
              />
            </div>
          </template>
        </tempPop>

        <!-- 三大运营商预警发布 -->
        <tempPop
          :title="warningRelease.title"
          :show="warningRelease.show"
          :v-show="warningRelease.show"
          :setStyles="{ left: '32%', top: '65%' }"
          class="command-table command-table3"
          @doClose="resourceClose('5')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="search-row">
              <div class="time">
                更新：{{ moment(new Date()).format("YYYY年MM月") }}
              </div>
              <div class="search-icon">
                <input type="text" />
                <div class="icon-container">
                  <img :src="iconSearch" alt="" class="img" />
                </div>
              </div>
            </div>
            <div class="emergency-team-table">
              <Table
                :columns="warningRelease.teamHeader"
                :listData="warningRelease.teamList"
              >
                <template slot="position" slot-scope="{ record, text }">
                  <div class="border">{{ text }}</div>
                </template>
              </Table>
            </div>
          </template>
        </tempPop>

        <!-- 舆情监测 -->
        <tempPop
          :title="monitor.title"
          :show="monitor.show"
          :v-show="monitor.show"
          :setStyles="{ left: '32%', top: '65%' }"
          class="command-table command-table3"
          @doClose="resourceClose('6')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="search-row">
              <div class="time">
                更新：{{ moment(new Date()).format("YYYY年MM月") }}
              </div>
              <div class="search-icon">
                <input type="text" v-model="monitor.searchForm.title" />
                <div class="icon-container">
                  <img :src="iconSearch" alt="" class="img" @click="searchMonitor" />
                </div>
              </div>
            </div>
            <div class="emergency-team-table">
              <Table :columns="monitor.teamHeader" :listData="monitor.teamList">
                <template slot="position" slot-scope="{ record, text }">
                  <div class="border">{{ text }}</div>
                </template>
              </Table>
            </div>
            <div class="list-change-page">
              <ChangePage
                :total="monitor.total"
                :currentPage="monitor.page"
                @changePages="monitorChangePages"
              />
            </div>
          </template>
        </tempPop>
      </div>
    </div>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
    <!-- <layer-consulting ref="consulting"></layer-consulting> -->
  </div>
</template>

<script>
import moment from "moment";
import ChangePage from "@/components/APicture/changePage";
import { getAllEmergencyOverview, getIndicator,getPublicMonitor } from "@/api/emergencyOverview";
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue";
import Bus from "@/utils/Bus.js";
import listDatas from "../utils/datas";
import popUpLayer from "@/components/APicture/popUpLayer/index.vue";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import Table from "@/components/APicture/c-table.vue";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
export default {
  components: {
    LayerConsulting,
    popUpLayer,
    tempPop,
    Table,
    ChangePage,
    ContactPhone,
    MessageSend,
  },
  data() {
    return {
      defaultParams: {
        body: {
          name: "",
          keywords: "",
          yamc: "",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
      iconSearch: require("../../../assets/images/dragonBoatNormal/u43.svg"),

      // cityList: [
      //   { name: "广州市", key: 1 },
      //   { name: "惠州市", key: 2 },
      //   { name: "深圳市", key: 3 },
      //   { name: "清远市", key: 4 },
      //   { name: "汕尾市", key: 5 },
      // ],
      // countyList: [
      //   { name: "请选择区县", key: 0 },
      //   { name: "番禺区", key: 1 },
      //   { name: "花都区", key: 2 },
      //   { name: "海珠区", key: 3 },
      //   { name: "天河区", key: 4 },
      // ],
      // streetList: [
      //   { name: "请选择镇街", key: 0 },
      //   { name: "大石街道", key: 1 },
      //   { name: "中山二路", key: 2 },
      //   { name: "迎宾大道", key: 3 },
      //   { name: "天河区", key: 4 },
      // ],
      // cityType: "广州市",
      // countyType: "请选择区县",
      // streetType: "请选择镇街",

      // 应急预案
      emergencyPlan: {
        total: 0,
        currentPage: 1,
        input: "",
        title: "应急预案",
        show: false,
        columnHeader: [
          { title: "类别", index: 0, textIndex: "yalxdm", width: "20%" },
          { title: "预案名称", index: 1, textIndex: "yamc", width: "60%" },
          {
            title: "印发时间",
            index: 4,
            textIndex: "zjgxsj",
            width: "20%",
          },
        ],
        tableList: [],
        typeList: [
          { name: "自然灾害预案", value: 9 },
          { name: "事故灾难类预案", value: 22 },
          { name: "公共卫生事件类预案", value: 8 },
          { name: "社会安全事件类预案", value: 9 },
        ],
      },

      emergencyChart: null,

      // 应急仓库
      materialWarehouse: {
        date: "",
        input: "",
        currentPage: 1,
        total: 0,
        title: "应急仓库",
        show: false,
        materialWarehouseIndex: 1,
        tableListIndex: 0,
        list: [
          { type: "图表", key: 1 },
          { type: "列表", key: 2 },
        ],
        tableList: [
          { type: "仓库", key: 1 },
          { type: "物资", key: 2 },
        ],
        teamHeader: [
          { title: "仓库名称", index: 0, textIndex: "name", width: "40%" },
          {
            title: "负责人",
            index: 2,
            textIndex: "charge",
            width: "15%",
          },
          {
            title: "联系电话",
            index: 3,
            textIndex: "phone",
            width: "15%",
          },
          {
            title: "仓库类型",
            index: 4,
            textIndex: "type",
            width: "15%",
          },
          {
            title: "定位",
            index: 5,
            textIndex: "position",
            width: "15%",
          },
        ],
        teamList: [
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356799",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356788",
            type: "专业队伍",
            position: "定位",
          },
        ],
        regionChart: null,
        allChart: null,
      },

      // 应急队伍数据
      emergencyTeam: {
        date: "",
        year: "",
        input: "",
        title: "应急队伍",
        show: false,
        emergencyTeamIndex: 1,
        tableListIndex: 0,
        total: 0,
        currentPage: 1,
        chartData: {},
        list: [
          { type: "图表", key: 1 },
          { type: "列表", key: 2 },
        ],
        tableList: [
          { type: "全部", key: 1 },
          { type: "专业队伍", key: 2 },
          { type: "基层队伍", key: 3 },
          { type: "社会力量", key: 4 },
          { type: "民兵力量", key: 5 },
        ],
        teamHeader: [
          { title: "队伍名称", index: 0, textIndex: "mc", width: "30%" },
          {
            title: "负责人",
            index: 2,
            textIndex: "fzr",
            width: "10%",
          },
          {
            title: "联系电话",
            index: 3,
            textIndex: "fzryddh",
            width: "15%",
          },
          {
            title: "队伍类型",
            index: 4,
            textIndex: "lxmc",
            width: "25%",
          },
          {
            title: "定位",
            index: 5,
            textIndex: "position",
            width: "10%",
          },
          { title: "", index: 0, textIndex: "checked", width: "10%" },
        ],
        teamList: [
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356799",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356788",
            type: "专业队伍",
            position: "定位",
          },
        ],
        regionChart: null,
        allChart: null,
      },

      // 应急场所数据
      emergencySite: {
        date: "",
        input: "",
        total: 0,
        currentPage: 1,
        title: "应急场所",
        show: false,
        emergencySiteIndex: 1,
        tableListIndex: 0,
        list: [
          { type: "图表", key: 1 },
          { type: "列表", key: 2 },
        ],
        tableList: [
          { type: "全部", key: 1 },
          { type: "专业队伍", key: 2 },
          { type: "基层队伍", key: 3 },
          { type: "社会力量", key: 4 },
          { type: "民兵力量", key: 5 },
        ],
        teamHeader: [
          { title: "应急场所名称", index: 0, textIndex: "mc", width: "30%" },
          {
            title: "负责人",
            index: 2,
            textIndex: "fzr",
            width: "15%",
          },
          {
            title: "联系电话",
            index: 3,
            textIndex: "fzryddh",
            width: "15%",
          },
          {
            title: "容纳人数",
            index: 4,
            textIndex: "krnrs",
            width: "10%",
          },
          {
            title: "面积（m²）",
            index: 5,
            textIndex: "mj",
            width: "10%",
          },
          {
            title: "定位",
            index: 6,
            textIndex: "position",
            width: "10%",
          },
          { title: "", index: 0, textIndex: "checked", width: "10%" },
        ],
        teamList: [
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356799",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "XXXXXXXXXXXXXXXXXXXX",
            charge: "负责人",
            phone: "1124356788",
            type: "专业队伍",
            position: "定位",
          },
        ],
        regionChart: null,
        allChart: null,
      },

      // 示范社区
      community: {
        date: "",
        total: 0,
        input: "",
        currentPage: 1,
        title: "示范社区",
        show: false,
        teamHeader: [
          { title: "序号", index: 0, textIndex: "rownum", width: "10%" },
          {
            title: "社区名称",
            index: 2,
            textIndex: "name",
            width: "40%",
          },
          {
            title: "地址",
            index: 3,
            textIndex: "address",
            width: "40%",
          },
          {
            title: "定位",
            index: 4,
            textIndex: "position",
            width: "10%",
          },
        ],
        teamList: [
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
          {
            num: 1,
            name: "广州市越秀区珠光街道杨忠社区",
            address: "xxxxxxxx",
            chat: "李明",
            phone: "1124356766",
          },
        ],
      },

      // 应急专家
      emergencyExpert: {
        date: "",
        year: "",
        input: "",
        total: 0,
        currentPage: 1,
        title: "应急专家",
        show: false,
        emergencyExpertIndex: 1,
        tableListIndex: 0,
        list: [
          { type: "图表", key: 1 },
          { type: "列表", key: 2 },
        ],
        teamHeader: [
          { title: "专家姓名", index: 0, textIndex: "zjxm", width: "30%" },
          {
            title: "联系电话",
            index: 2,
            textIndex: "yddh",
            width: "30%",
          },
          {
            title: "专家专业类型",
            index: 3,
            textIndex: "zjlxmc",
            width: "30%",
          },
          { title: "", index: 0, textIndex: "checked", width: "10%" },
          // {
          //   title: "定位",
          //   index: 4,
          //   textIndex: "position",
          //   width: "15%",
          // },
        ],
        teamList: [
          {
            name: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "负责人",
            phone: "1124356766",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "负责人",
            phone: "11243567",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "负责人",
            phone: "1124356799",
            type: "专业队伍",
            position: "定位",
          },
          {
            name: "负责人",
            phone: "1124356788",
            type: "专业队伍",
            position: "定位",
          },
        ],
        regionChart: null,
        allChart: null,
      },

      // 三大运营商预警发布
      warningRelease: {
        title: "三大运营商预警发布",
        show: false,
        teamHeader: [
          { title: "发布时间", index: 0, textIndex: "time", width: "40%" },
          {
            title: "发送条数",
            index: 2,
            textIndex: "num",
            width: "15%",
          },
          {
            title: "预警内容",
            index: 3,
            textIndex: "content",
            width: "30%",
          },
          {
            title: "预警类型",
            index: 4,
            textIndex: "type",
            width: "15%",
          },
        ],
        teamList: [
          {
            time: "2020-10-09 19:54",
            num: 12450,
            content: "群体性事件警检测到xxxx发生群体性事件",
            type: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            content: "群体性事件警检测到xxxx发生群体性事件",
            type: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            content: "群体性事件警检测到xxxx发生群体性事件",
            type: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            content: "群体性事件警检测到xxxx发生群体性事件",
            type: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            content: "群体性事件警检测到xxxx发生群体性事件",
            type: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            content: "群体性事件警检测到xxxx发生群体性事件",
            type: "xxxx",
          },
        ],
      },

      // 日报 周报 月报
      publicMonitor: [
        { name: "日报", key: 1 },
        { name: "周报", key: 2 },
        { name: "月报", key: 3 },
      ],

      // 舆情监测
      monitor: {
        title: "舆情监测",
        show: false,
        page: 1,
        pageSize: 10,
        total:0,
        monitorClickType:"",
        searchForm:{
          title:null
        },
        teamHeader: [
          { title: "监测时间", index: 0, textIndex: "time", width: "30%" },

          {
            title: "预警内容",
            index: 1,
            textIndex: "title",
            width: "70%",
          },
          // {
          //   title: "来源",
          //   index: 2,
          //   textIndex: "origin",
          //   width: "15%",
          // },
        ],
        teamList: [
          {
            time: "2020-10-09 19:54",
            num: 12450,
            title: "群体性事件警检测到xxxx发生群体性事件",
            origin: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            title: "群体性事件警检测到xxxx发生群体性事件",
            origin: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            title: "群体性事件警检测到xxxx发生群体性事件",
            origin: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            title: "群体性事件警检测到xxxx发生群体性事件",
            origin: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            title: "群体性事件警检测到xxxx发生群体性事件",
            origin: "xxxx",
          },
          {
            time: "2020-10-09 19:54",
            num: 12450,
            title: "群体性事件警检测到xxxx发生群体性事件",
            origin: "xxxx",
          },
        ],
      },

      showPop_bottom: false,
      popTitle_box: "",
      listDatasObj: {},
      addUpList: [
        {
          title: "突发事件总量",
          num: 201,
          bg: require("../../../assets/images/emergencyOverview/bg_btn_blue.png"),
        },
        {
          title: "死亡人数",
          num: 20,
          bg: require("../../../assets/images/emergencyOverview/bg_bt_cyan.png"),
        },
        {
          title: "经济损失",
          num: 25865,
          bg: require("../../../assets/images/emergencyOverview/bg_btn_green.png"),
        },
      ],
      // 历年突发事件总量
      totalBtnList: [
        { name: "近五年", key: 0 },
        { name: "近十年", key: 1 },
      ],
      activeBtnKey: 0,
      //弹窗标题
      popTitle: "",
      timeHorizon: {
        startTime: null,
        endTime: null,
      },
      showPop: false,
      // 历年突发事件死亡人数 和 经济损失
      eventBtnList: [
        { name: "死亡人数", key: 0 },
        { name: "经济损失", key: 1 },
      ],
      activeEventBtnKey: 0,
      totalChartDiv: null, // 历年
      eventDeathDiv: null, // 死亡
      eventEconomicDiv: null,
      // 预警总览
      wraningChart: null,
      // 资源总览
      resourcesList: [
        {
          img: require("../../../assets/images/emergencyOverview/icon_team.png"),
          name: "应急队伍",
          number: 2,
          unit: "队",
          color: "#1ed841",
        },
        {
          img: require("../../../assets/images/emergencyOverview/icon_home.png"),
          name: "应急场所",
          number: 2,
          unit: "个",
          color: "#36dbec",
        },
        {
          img: require("../../../assets/images/emergencyOverview/icon_police.png"),
          name: "应急专家",
          number: 20,
          unit: "人",
          color: "#ff852b",
        },
        {
          img: require("../../../assets/images/emergencyOverview/icon_shop.png"),
          name: "应急仓库",
          number: 0,
          unit: "个",
          color: "#36dbec",
        },
        {
          img: require("../../../assets/images/emergencyOverview/icon_bus.png"),
          name: "示范社区",
          number: 0,
          unit: "个",
          color: "#36dbec",
        },
      ],
      planList: [
        {
          img: require("../../../assets/images/emergencyOverview/icon_plan.png"),
          name: "应急预案",
          number: 0,
          unit: "队",
          color: "#1ed841",
        },
        /* {img:require('../../../assets/images/emergencyOverview/icon_home.png'),name:'应急场所',number:2,unit:'个',color:'#36dbec'},
        {img:require('../../../assets/images/emergencyOverview/icon_police.png'),name:'应急专家',number:2,unit:'个',color:'#ff852b'},
        {img:require('../../../assets/images/emergencyOverview/icon_shop.png'),name:'资源仓库',number:2,unit:'个',color:'#36dbec'},
        {img:require('../../../assets/images/emergencyOverview/icon_bus.png'),name:'示范社区',number:2,unit:'个',color:'#36dbec'}, */
      ],
      data: {
        body: {
          startTime: new Date().getFullYear() - 4,
          endTime: new Date().getFullYear(),
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      },
      emergency: {},
      eventTotalList: [], // 历年突发时间总量
      deathTollList: [], // 历年死亡人数
      warningTotalNum: 0,
      WarningPublish: {},
      getEmergencyOverviewMouth: null,
      dieChartNull: null,
      allChart: null,
    };
  },
  watch: {
    timeHorizon: {
      handler(newObj, oldObj) {
        if (newObj.startTime && newObj.endTime) {
          this.data.body = newObj;
          this.getEventTotalList();
          this.doEventBtn("", this.activeEventBtnKey);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    // 应急资源总览
    this.getResoureList();
    // 应急预案总览
    this.getplanList();
    // 获取历年突发事件总量
    this.getEventTotalList(true);
    // 获取历年死亡人数
    this.getDeathTollList(true);
    // 获取历年经济损失
    this.getFinancialLossList(true);
    // 获取预警次数分类统计
    this.getClassifiedStatistic();
    // 获取当年预警总数
    this.getWarningTotalNum();
    //三大运营商预警发布
    this.getWarningPublish();
    // 应急预案弹窗
    this.getEmergencyTableList();
  },
  computed: {
    beginYearList() {
      let date = new Date().getFullYear();
      let list = [];
      for (let i = 0; i <= 10; i++) {
        list.push(date - i);
      }
      console.log(list);
      return list;
    },
    endYearList() {},
  },
  mounted() {
    this.$nextTick(() => {
      this.newInitChart();
      this.dieChart();
      this.initChart();
    });
  },
  methods: {
    // 应急队伍单选
    checkedClick(record, index) {
      this.emergencyTeam.teamList[index].checked =
        !this.emergencyTeam.teamList[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.emergencyTeam.teamList));
    },
    // 应急队伍全选
    checkedAllClick() {
      let data = this.emergencyTeam.teamList.filter((item) => item.checked);
      console.log("选中了", data);
      this.emergencyTeam.teamList.map((item) => {
        if (data.length === this.emergencyTeam.teamList.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },

    // 应急专家单选
    checkedExpertClick(record, index) {
      this.emergencyExpert.teamList[index].checked =
        !this.emergencyExpert.teamList[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.emergencyExpert.teamList));
    },
    // 应急专家全选
    checkedExpertAllClick() {
      let data = this.emergencyExpert.teamList.filter((item) => item.checked);
      console.log("选中了", data);
      this.emergencyExpert.teamList.map((item) => {
        if (data.length === this.emergencyExpert.teamList.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },
    // 应急场所单选
    checkedSiteClick(record, index) {
      this.emergencySite.teamList[index].checked =
        !this.emergencySite.teamList[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.emergencySite.teamList));
    },
    // 应急场所全选
    checkedSiteAllClick() {
      let data = this.emergencySite.teamList.filter((item) => item.checked);
      console.log("选中了", data);
      this.emergencySite.teamList.map((item) => {
        if (data.length === this.emergencySite.teamList.length) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
    },
    emergencyExpertMobilePhone(item, e) {
      let { zjxm, yddh } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: zjxm,
        phone: yddh,
      });
    },

    emergencyExpertMessage(item, e) {
      let { zjxm, yddh } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: zjxm,
        phone: yddh,
      });
    },
    emergencySiteMobilePhone(item, e) {
      let { fzr, fzryddh } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: fzr,
        phone: fzryddh,
      });
    },

    emergencySiteMessage(item, e) {
      let { fzr, fzryddh } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: fzr,
        phone: fzryddh,
      });
    },

    // 应急队伍打电话
    emergencyTeamMobilePhone(item, e) {
      let { fzr, fzryddh } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: fzr,
        phone: fzryddh,
      });
    },

    // 应急队伍发短信
    emergencyTeamMessage(item, e) {
      let { fzr, fzryddh } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: fzr,
        phone: fzryddh,
      });
    },
    // 获取应急预案的列表
    getEmergencyTableList() {
      getIndicator("INGmWT9L", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("获取应急预案的列表", res);
          this.emergencyPlan.tableList = res.body.data;
          this.emergencyPlan.total = parseInt(res.body.total);
          // this.community.teamList = res.body.data;
          // this.community.total = parseInt(res.body.total);
        }
      });
    },

    communityClick() {
      this.community.currentPage = 1;
      this.defaultParams.page = 1;
      this.defaultParams.body.name = this.community.input;
      this.getTeamListData();
    },

    emergencyTeamInput() {
      this.emergencyTeam.currentPage = 1;
      this.defaultParams.page = 1;
      console.log("input", this.emergencyTeam.input);
      this.defaultParams.body.keywords = this.emergencyTeam.input;
      this.getEmergencyTeamData();
    },

    emergencySiteInput() {
      this.emergencySite.currentPage = 1;
      this.defaultParams.page = 1;
      console.log("input", this.emergencySite.input);
      this.defaultParams.body.keywords = this.emergencySite.input;
      this.getEmergencySiteData();
    },

    emergencyExpertInput() {
      this.emergencyExpert.currentPage = 1;
      this.defaultParams.page = 1;
      console.log("input", this.emergencyExpert.input);
      this.defaultParams.body.keywords = this.emergencyExpert.input;
      this.getEmergencyExpertData();
    },

    // this, materialWarehouseInput
    materialWarehouseInput() {
      this.materialWarehouse.currentPage = 1;
      this.defaultParams.page = 1;
      console.log("input", this.materialWarehouse.input);
      this.defaultParams.body.keywords = this.materialWarehouse.input;
      this.getMaterialWarehouseData();
    },

    emergencyPlanInput() {
      this.emergencyPlan.currentPage = 1;
      this.defaultParams.page = 1;
      // console.log("input", this.materialWarehouse.input);
      this.defaultParams.body.yamc = this.emergencyPlan.input;
      this.getEmergencyTableList();
    },

    clickCommunityChangePages(pages, pageSize) {
      this.community.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      this.getTeamListData();
    },

    clickEmergencyTeamChangePages(pages, pageSize) {
      this.emergencyTeam.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      // this.get;
      this.getEmergencyTeamData();
    },

    clickEmergencySiteChangePages(pages, pageSize) {
      this.emergencySite.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      // this.get;
      this.getEmergencySiteData();
    },

    clickEmergencyExpertChangePages(pages, pageSize) {
      this.emergencyExpert.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      // this.get;
      this.getEmergencyExpertData();
    },

    clickMaterialWarehouseChangePages(pages, pageSize) {
      this.materialWarehouse.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      // this.get;
      this.getMaterialWarehouseData();
    },

    clickEmergencyPlanChangePages(pages, pageSize) {
      this.emergencyPlan.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      this.getEmergencyTableList();
    },

    cityTypeClick() {},
    countyTypeClick() {},
    streetTypeClick() {},
    // 应急预案总览
    emergencyPlanClick(k) {
      if (k == 0) {
        this.emergencyPlan.show = true;
        // this.getEmergencyTableList();
        // console.log("1111");
      }
    },

    // 三大运营商预警发布
    topBottomClick() {
      // return;
      this.warningRelease.show = true;
    },

    // 舆情监测
    publicMonitorClick(name,item) {
      let code = '4mhZEyAg'
      this.monitor.page = 1
      this.monitor.pageSize = 10
      this.monitor.searchForm ={
        title:null
      }
      let sendData ={
          body:{},
          page: this.monitor.page,
          pageSize: this.monitor.pageSize
        }
      const typeObj ={
        '1':'舆情监测-日报',
        '2':'舆情监测-周报',
        '3':'舆情监测-月报',
      }
      this.monitor.teamList = []
      this.monitor.monitorClickType = JSON.parse(JSON.stringify(item))
      sendData.body.type = item.key+''
      this.monitor.title = JSON.parse(JSON.stringify(typeObj[item.key+'']))
      this.getPublicMonitorTypeDatas(code,sendData)
      this.monitor.show = true;
      /* if (name == "日报") {
        sendData.body.type = '1'
        this.monitor.title = JSON.parse(JSON.stringify(typeObj['1']))
        this.getPublicMonitorTypeDatas(code,sendData)
        this.monitor.show = true;
      } else if (name == "周报") {
        sendData.body.type = '2'
        this.monitor.title = JSON.parse(JSON.stringify(typeObj['2']))
        this.getPublicMonitorTypeDatas(code,sendData)
        this.monitor.show = true;
      } else if (name == "月报") {
        sendData.body.type = '3'
        this.monitor.title =  JSON.parse(JSON.stringify(typeObj['3']))
        this.getPublicMonitorTypeDatas(code,sendData)
        this.monitor.show = true;
      } */
    },
    // 舆情监测-日报、周报、月报
    /* 
    *data:{codes:String,type:Object}
    *return null
    */
    getPublicMonitorTypeDatas(dodes='',body={body:{}}){
      getPublicMonitor(dodes,body).then(res=>{
        if(res.success) {
          if(res.body && res.body.data){
            this.monitor.teamList = JSON.parse(JSON.stringify(res.body.data))
            this.monitor.total = parseInt(res.total)
            // this.monitor = JSON.parse(JSON.stringify(this.monitor))
          } else {
            this.monitor.teamList = []
          }
        } else {
          this.monitor.teamList = []
        }
      }).catch((err)=>{
        if(err) {
          this.monitor.teamList = []
        }
      })
    },
    // 舆情监测-搜索
    searchMonitor(){
       let code = '4mhZEyAg'
      this.monitor.page = 1
      this.monitor.pageSize = 10
      let sendData ={
        body:{
          title:this.monitor.searchForm.title,
          type:this.monitor.monitorClickType.key+''
        },
        page: this.monitor.page,
        pageSize: this.monitor.pageSize
      }
      this.getPublicMonitorTypeDatas(code,sendData)
    },
    // 舆情监测-翻页
    monitorChangePages(pages){
      // console.log(pages)
      let code = '4mhZEyAg'
      this.monitor.page = pages.pages
      let sendData ={
        body:{
          title:this.monitor.searchForm.title,
          type:this.monitor.monitorClickType.key+''
        },
        page: this.monitor.page,
        pageSize: this.monitor.pageSize
      }
      this.getPublicMonitorTypeDatas(code,sendData)
    },
    emergencyTeamLocation(record, flag = 10) {
      pGzznCore.teamPowerLocation(record, flag);
    },
    emergencyTeamClick(index) {
      this.emergencyTeam.emergencyTeamIndex = index;
      if (index == 0) {
        this.$nextTick(() => {
          this.getEmergencyTeamAllChart();
          this.getEmergencyTeamRegionChart();
        });
      } else {
      }
    },

    emergencyExpertClick(index) {
      this.emergencyExpert.emergencyExpertIndex = index;
      if (index == 0) {
        this.$nextTick(() => {
          this.getEmergencyExpertAllChart();
        });
      } else {
      }
    },

    materialWarehouseClick(index) {
      this.materialWarehouse.materialWarehouseIndex = index;
    },

    emergencySiteClick(index) {
      this.emergencySite.emergencySiteIndex = index;
      if (index == 0) {
        this.$nextTick(() => {
          this.getEmergencySiteRegionChart();
        });
      } else {
      }
    },

    // 弹框的关闭应急预案
    emergencyClose() {
      this.emergencyPlan.show = false;
    },

    // 获取示范社区的数据
    getTeamListData() {
      getIndicator("PMsBj19l", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("获取示范社区的数据", res);
          this.community.teamList = res.body.data;
          this.community.total = parseInt(res.body.total);
        }
      });
    },

    // 龙舟水-平时-应急队伍列表
    getEmergencyTeamData() {
      getIndicator("1pQeEGzH", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("龙舟水-平时-应急队伍列表", res);
          res.body.data.map((item) => {
            item.checked = false;
          });
          this.emergencyTeam.teamList = res.body.data;
          // this.community.teamList = res.body.data;
          this.emergencyTeam.total = parseInt(res.body.total);
        }
      });
    },

    formatDataListNew(arr, values = "name", otherpush = 0) {
      let returnList = arr.map((item, key) => {
        if (otherpush) {
          return item[values] + otherpush;
        } else {
          return item[values];
        }
      });
      return returnList;
    },

    // lzs-龙舟水-平时-应急队伍数量统计
    getEmergencyTeamAllChart() {
      getIndicator("iFv2ztXJ", this.defaultParams).then((res) => {
        if (res.success) {
          let obj = {
            xAxisList: this.formatDataList(res.body.data, "lxmc"),
            listDatas: this.formatDataList(res.body.data, "zrs"),
          };
          this.emergencyTeam.allChart = this.$echarts.init(
            document.getElementsByClassName("rightChart")[0]
          );

          this.emergencyTeam.allChart.setOption(this.allChartOption(obj));
        }
      });
    },

    handleTeam(list, key) {
      let listData = [];
      list.map((v) => {
        if (listData.findIndex((e) => e[key] == v[key]) > -1) {
          let index = listData.findIndex((e) => e[key] == v[key]);
          listData[index].list.push(v);
        } else {
          listData.push({
            list: [v],
            [key]: v[key],
            teamName: v["teamName"],
            deptName: v["deptName"],
          });
        }
      });
      return listData;
    },

    // lzs-龙舟水-平时-应急队伍区域数量统计
    getEmergencyTeamRegionChart() {
      getIndicator("OnLgUTyv", this.defaultParams).then((res) => {
        if (res.success) {
          let emergencyTeamRegionData = this.handleTeam(res.body.data, "qymc");

          console.log(
            "lzs-龙舟水-平时-应急队伍区域数量统计",
            emergencyTeamRegionData
          );

          this.emergencyTeam.regionChart = this.$echarts.init(
            document.getElementsByClassName("rightChart")[1]
          );

          this.emergencyTeam.regionChart.setOption(
            this.regionChartOption(emergencyTeamRegionData)
          );
        }
      });
    },

    // lzs-龙舟水-平时-应急场所列表
    getEmergencySiteData() {
      getIndicator("GXCvLC4b", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急场所列表", res);
          res.body.data.map((item) => {
            item.checked = false;
          });
          this.emergencySite.teamList = res.body.data;
          // this.community.teamList = res.body.data;
          this.emergencySite.total = parseInt(res.body.total);
        }
      });
    },

    // lzs-龙舟水-平时-应急场所统计图表
    // getEmergencySiteAllChart() {
    //   getIndicator("9WLKDSGR", this.defaultParams).then((res) => {
    //     if (res.success) {
    //       console.log("lzs-龙舟水-平时-应急场所统计图表	", res);

    //       // this.emergencySite.teamList = res.body.data;
    //       // // this.community.teamList = res.body.data;
    //       // this.emergencySite.total = parseInt(res.body.total);
    //     }
    //   });
    // },

    // lzs-龙舟水-平时-应急专家列表
    getEmergencyExpertData() {
      getIndicator("iKJAJFEf", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急专家列表", res);
          res.body.data.map((item) => {
            item.checked = false;
          });
          this.emergencyExpert.teamList = res.body.data;
          // // this.community.teamList = res.body.data;
          this.emergencyExpert.total = parseInt(res.body.total);
        }
      });
    },

    // lzs-龙舟水-平时-物资仓库（仓库列表）
    getMaterialWarehouseData() {
      getIndicator("Vx5JHdvG", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-物资仓库（仓库列表）", res);
          this.materialWarehouse.teamList = res.body.data;
          // // this.community.teamList = res.body.data;
          this.materialWarehouse.total = parseInt(res.body.total);
        }
      });
    },

    // // lzs-龙舟水-平时-应急场所统计图表
    getEmergencySiteRegionChart() {
      getIndicator("9WLKDSGR", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急场所统计图表", res);
          let obj = {
            xAxisList: this.formatDataList(res.body.data, "areaname"),
            listDatas: this.formatDataList(res.body.data, "number"),
          };
          this.emergencySite.regionChart = this.$echarts.init(
            document.getElementsByClassName("rightChart")[2]
          );

          this.emergencySite.regionChart.setOption(
            this.emergencySiteChartOption(obj)
          );
          // let obj = {
          //   xAxisList: this.formatDataList(res.body.data, "lxmc"),
          //   listDatas: this.formatDataList(res.body.data, "zrs"),
          // };
        }
      });
    },

    // lzs-龙舟水-平时-应急专家图表统计
    getEmergencyExpertAllChart() {
      getIndicator("wWBf0M8D", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急专家图表统计", res);
          let obj = {
            xAxisList: this.formatDataList(res.body.data, "zjlxmc"),
            listDatas: this.formatDataList(res.body.data, "number"),
          };
          this.emergencyExpert.allChart = this.$echarts.init(
            document.getElementsByClassName("rightChart")[3]
          );

          this.emergencyExpert.allChart.setOption(
            this.emergencyExpertChartOption(obj)
          );
        }
      });
    },

    // lzs-龙舟水-平时-应急专家更新年度和更新日期
    getEmergencyExpertDate() {
      getIndicator("Olj38Tdx", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急专家更新年度和更新日期", res);
          this.emergencyExpert.date = res.body.data[0].zjgxsj;
          this.emergencyExpert.year = res.body.data[0].year;
        }
      });
    },

    // lzs-龙舟水-平时-应急场所统计图表更新日期
    getEmergencySiteDate() {
      getIndicator("GaEOqCFi", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急场所统计图表更新日期	", res);
          this.emergencySite.date = res.body.data[0].zjgxsj;
        }
      });
    },

    // lzs-龙舟水-平时-应急队伍数量统计年度和更新日期
    getEmergencyTeamDate() {
      getIndicator("hk2Pcif7", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急队伍数量统计年度和更新日期", res);
          this.emergencyTeam.date = res.body.data[0].zjgxsj;
          this.emergencyTeam.year = res.body.data[0].year;
        }
      });
    },

    moment,
    init() {},
    switchCamera(k) {
      if (k == 0) {
        // pGzznCore.addPromiseTeam();
        this.emergencyTeam.show = true;
        this.getEmergencyTeamData();
        this.getEmergencyTeamDate();
      } else if (k == 1) {
        this.emergencySite.show = true;
        this.getEmergencySiteData();
        this.getEmergencySiteDate();
        // pGzznCore.addPromiseShelterNew();
      } else if (k == 2) {
        this.emergencyExpert.show = true;
        this.getEmergencyExpertData();
        // this.showContactModel();
        this.getEmergencyExpertDate();
        // pGzznCore.addPromiseExperts();
      } else if (k == 3) {
        // this.materialWarehouse.show = true;
        // this.getMaterialWarehouseData();
      } else if (k == 4) {
        this.community.show = true;
        this.getTeamListData();
      }
    },

    resourceClose(num) {
      if (num == 0) {
        this.emergencyTeam.show = false;
        this.emergencyTeam.input = "";
        this.defaultParams.body.keywords = "";
        this.emergencyTeam.currentPage = 1;
        this.defaultParams.page = 1;
      } else if (num == 2) {
        this.emergencyExpert.show = false;
        this.emergencyExpert.input = "";
        this.defaultParams.body.keywords = "";
        this.emergencyExpert.currentPage = 1;
        this.defaultParams.page = 1;
      } else if (num == 1) {
        this.emergencySite.show = false;
        this.emergencySite.input = "";
        this.defaultParams.body.keywords = "";
        this.emergencySite.currentPage = 1;
        this.defaultParams.page = 1;
      } else if (num == 3) {
        this.materialWarehouse.show = false;
        this.materialWarehouse.input = "";
        this.defaultParams.body.keywords = "";
        this.materialWarehouse.currentPage = 1;
        this.defaultParams.page = 1;
      } else if (num == 4) {
        this.community.show = false;
        this.community.input = "";
        this.defaultParams.body.name = "";
      } else if (num == 5) {
        this.warningRelease.show = false;
      } else if (num == 6) {
        this.monitor.show = false;
      }
    },
    // 展示融合通信模块
    showContactModel() {
      // Bus.$emit('openConsulting');
      this.$emit("openConsulting");
    },
    /*  */
    formatDataList(arr, values = "name", otherpush = 0) {
      let returnList = arr.map((item, key) => {
        if (otherpush) {
          return item[values] + otherpush;
        } else {
          return item[values];
        }
      });
      return returnList;
    },
    newInitChart(data) {
      let totalChartDataObj = {
        xAxisList: this.formatDataList(data),
        listDatas: this.formatDataList(data, "value"),
      };
      this.getEmergencyOverviewMouth = this.$echarts.init(
        document.querySelector(".chart-event-month")
      );
      this.getEmergencyOverviewMouth.setOption(
        this.totalChartBar1(totalChartDataObj)
      );
    },
    dieChart(data) {
      let totalChartDataObj = {
        xAxisList: this.formatDataList(data),
        listDatas: this.formatDataList(data, "value"),
      };
      this.dieChartNull = this.$echarts.init(
        document.querySelector(".chart-event-die")
      );
      this.dieChartNull.setOption(this.totalChartBar2(totalChartDataObj));
    },

    // 应急预案配置项
    emergencyChartOption(obj = null) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        title: {
          text: "48",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: that.$setFontSize(24),
            color: "#ffffff",
          },
        },
        legend: {
          show: false,
          orient: "vertical",
          icon: "circle",
          x: "left",
          y: "100",
          data: [
            "个人防护用品管理",
            "事故应急预案管理",
            "作业过程中安全巡检管理",
          ],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["35%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "inside",
                textStyle: {
                  fontSize: that.$setFontSize(16),
                  color: "#FFFFFF",
                },
              },
            },
            //             itemStyle:{
            //               normal:{
            //  color: "#ffffff",
            //               }
            //             },
            color: ["#feb513", "#30ca40", "#a147eb"],
            data: [
              { value: 335, name: "个人防护用品管理" },
              { value: 310, name: "事故应急预案管理" },
              { value: 234, name: "作业过程中安全巡检管理" },
            ],
          },
        ],
      };
      return option;
    },

    // 应急队伍上图
    allChartOption(obj) {
      let that = this;
      let option = {
        backgroundColor: "#0b2639",
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        grid: {
          left: "10%",
          top: "20%",
          right: "5%",
          bottom: "10%",
        },
        legend: {
          right: "0",
          top: "5%",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#3d5269",
              width: 1,
            },
          },
          data: obj.xAxisList,
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#02c2d8", //X轴文字颜色
              fontSize: that.$setFontSize(16),
            },
            interval: 0,
            // rotate: 30,
          },
        },
        yAxis: [
          {
            type: "value",
            // interval: 100, // 步长
            // min: 0, // 起始
            // max: 5, // 终止
            // name: "单位(家)",
            color: "#fff",
            nameTextStyle: {
              color: "#fff",
              align: "left",
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              // formatter: "",
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
          // {
          //   type: 'value',
          //   position: 'right',
          //   splitLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: '#396A87',
          //       width: 2,
          //     },
          //   },
          //   axisLabel: {
          //     show: true,
          //     formatter: '{value}', //右侧Y轴文字显示
          //     textStyle: {
          //       color: '#396A87',
          //       fontSize: 14,
          //     },
          //   },
          // },
        ],
        series: [
          {
            // name: "安全生产事故应急救援队",
            type: "bar",
            show: true,
            barWidth: 18,
            itemStyle: {
              normal: {
                color: "#0079fe",
              },
            },
            data: obj.listDatas,
          },
          // {
          //   name: "社会志愿应急救援队",
          //   type: "bar",
          //   show: true,
          //   barWidth: 18,
          //   itemStyle: {
          //     normal: {
          //       color: "#ffcd42",
          //     },
          //   },
          //   // data: [13, 56, 78, 245, 67, 567, 123],
          // },
          // {
          //   name: "自然灾害应急救援队",
          //   type: "bar",
          //   show: true,
          //   barWidth: 18,
          //   itemStyle: {
          //     normal: {
          //       color: "#007aff",
          //     },
          //   },
          //   // data: [13, 56, 78, 245, 67, 567, 123],
          // },
        ],
      };

      return option;
    },

    // 应急队伍下图
    regionChartOption(emergencyTeamRegionData) {
      let array = [];
      let regionArr = [];
      let that = this;

      emergencyTeamRegionData.map((i) => {
        array.push(i.qymc);
        i.list.map((item) => {
          let obj = {
            name: "",
            type: "bar",
            show: true,
            barWidth: 18,
            data: [],
          };
          obj.name = item.lxmc;
          obj.data.push(item.zrs);
          regionArr.push(obj);
        });
      });

      console.log("应急队伍下图的数据", array, regionArr);
      let option = {
        backgroundColor: "#0b2639",
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        grid: {
          left: "10%",
          top: "20%",
          right: "5%",
          bottom: "10%",
        },
        legend: {
          // right: "0",
          top: "3%",
          itemWidth: that.$setFontSize(8),
          itemHeight: that.$setFontSize(8),
          textStyle: {
            color: "#ffffff",
            fontSize: that.$setFontSize(14),
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#3d5269",
              width: 1,
            },
          },
          data: array,
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#02c2d8", //X轴文字颜色
              fontSize: that.$setFontSize(16),
            },
            interval: 0,
            // rotate: 30,
          },
        },
        yAxis: [
          {
            type: "value",
            // interval: 100, // 步长
            // min: 0, // 起始
            // max: 5, // 终止
            color: "#fff",
            nameTextStyle: {
              color: "#fff",
              align: "left",
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              // formatter: "",
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
          // {
          //   type: 'value',
          //   position: 'right',
          //   splitLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: '#396A87',
          //       width: 2,
          //     },
          //   },
          //   axisLabel: {
          //     show: true,
          //     formatter: '{value}', //右侧Y轴文字显示
          //     textStyle: {
          //       color: '#396A87',
          //       fontSize: 14,
          //     },
          //   },
          // },
        ],
        series: regionArr,
      };
      return option;
    },

    //应急专家
    emergencyExpertChartOption(obj) {
      let that = this;
      let option = {
        backgroundColor: "#0b2639",
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        grid: {
          left: "10%",
          top: "10%",
          right: "5%",
          bottom: "20%",
        },
        legend: {
          right: "0",
          top: "5%",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#3d5269",
              width: 1,
            },
          },
          data: obj.xAxisList,
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#02c2d8", //X轴文字颜色
              fontSize: that.$setFontSize(16),
            },
            interval: 0,
            rotate: 30, // 旋转角度
            // rotate: 30,
          },
        },
        yAxis: [
          {
            type: "value",
            // interval: 100, // 步长
            // min: 0, // 起始
            // max: 5, // 终止
            // name: "单位(家)",
            color: "#fff",
            nameTextStyle: {
              color: "#fff",
              align: "left",
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              // formatter: "",
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
          // {
          //   type: 'value',
          //   position: 'right',
          //   splitLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: '#396A87',
          //       width: 2,
          //     },
          //   },
          //   axisLabel: {
          //     show: true,
          //     formatter: '{value}', //右侧Y轴文字显示
          //     textStyle: {
          //       color: '#396A87',
          //       fontSize: 14,
          //     },
          //   },
          // },
        ],
        series: [
          {
            // name: "安全生产事故应急救援队",
            type: "bar",
            show: true,
            barWidth: 18,
            itemStyle: {
              normal: {
                color: "#0079fe",
              },
            },
            data: obj.listDatas,
          },
          // {
          //   name: "社会志愿应急救援队",
          //   type: "bar",
          //   show: true,
          //   barWidth: 18,
          //   itemStyle: {
          //     normal: {
          //       color: "#ffcd42",
          //     },
          //   },
          //   // data: [13, 56, 78, 245, 67, 567, 123],
          // },
          // {
          //   name: "自然灾害应急救援队",
          //   type: "bar",
          //   show: true,
          //   barWidth: 18,
          //   itemStyle: {
          //     normal: {
          //       color: "#007aff",
          //     },
          //   },
          //   // data: [13, 56, 78, 245, 67, 567, 123],
          // },
        ],
      };

      return option;
    },

    // 应急场所 区域图
    emergencySiteChartOption(obj) {
      let that = this;
      let option = {
        backgroundColor: "#0b2639",
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        grid: {
          left: "10%",
          top: "15%",
          right: "5%",
          bottom: "15%",
        },
        legend: {
          right: "0",
          top: "5%",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#3d5269",
              width: 1,
            },
          },
          data: obj.xAxisList,
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#02c2d8", //X轴文字颜色
              fontSize: that.$setFontSize(16),
            },
            interval: 0,
            rotate: 30,
          },
        },
        yAxis: [
          {
            type: "value",
            // interval: 100, // 步长
            // min: 0, // 起始
            // max: 5, // 终止
            // name: "单位(家)",
            color: "#fff",
            nameTextStyle: {
              color: "#fff",
              align: "left",
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              // formatter: "",
              textStyle: {
                color: "#fff",
                fontSize: that.$setFontSize(16),
              },
            },
          },
          // {
          //   type: 'value',
          //   position: 'right',
          //   splitLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: '#396A87',
          //       width: 2,
          //     },
          //   },
          //   axisLabel: {
          //     show: true,
          //     formatter: '{value}', //右侧Y轴文字显示
          //     textStyle: {
          //       color: '#396A87',
          //       fontSize: 14,
          //     },
          //   },
          // },
        ],
        series: [
          {
            // name: "安全生产事故应急救援队",
            type: "bar",
            show: true,
            barWidth: 18,
            itemStyle: {
              normal: {
                color: "#0079fe",
              },
            },
            data: obj.listDatas,
          },
          // {
          //   name: "社会志愿应急救援队",
          //   type: "bar",
          //   show: true,
          //   barWidth: 18,
          //   itemStyle: {
          //     normal: {
          //       color: "#ffcd42",
          //     },
          //   },
          //   // data: [13, 56, 78, 245, 67, 567, 123],
          // },
          // {
          //   name: "自然灾害应急救援队",
          //   type: "bar",
          //   show: true,
          //   barWidth: 18,
          //   itemStyle: {
          //     normal: {
          //       color: "#007aff",
          //     },
          //   },
          //   // data: [13, 56, 78, 245, 67, 567, 123],
          // },
        ],
      };

      return option;
    },

    // 应急仓库
    emergencyWarehouseChart() {
      let option = {
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea",
        ],
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        toolbox: {
          show: true,
        },
        legend: {
          // type: "scroll",
          orient: "horizontal",
          left: "1%",
          align: "left",
          top: "1%",
          textStyle: {
            color: "#ffffff",
          },
          // height: 150,
        },
        series: [
          {
            name: "业务警种",
            type: "pie",
            radius: [0, 100], //可调节饼图的大小
            labelLine: {
              normal: {
                show: false,
              },
            },

            label: {
              normal: {
                show: false,
              },
            },

            data: [
              { value: 20, name: "国宝" },
              { value: 30, name: "治安" },
              { value: 25, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" },
              { value: 35, name: "rose6" },
              { value: 30, name: "rose7" },
              { value: 40, name: "rose8" },
            ],
          },
        ],
      };

      return option;
    },

    initChart(className, obj) {
      this.emergencyChart = this.$echarts.init(
        document.getElementsByClassName("emergencyChart")[0]
      );

      this.emergencyChart.setOption(this.emergencyChartOption());

      // 应急队伍  上图
      // this.emergencyTeam.allChart = this.$echarts.init(
      //   document.getElementsByClassName("rightChart")[0]
      // );

      // this.emergencyTeam.allChart.setOption(this.allChartOption());

      // 应急队伍  下图
      // this.emergencyTeam.regionChart = this.$echarts.init(
      //   document.getElementsByClassName("rightChart")[1]
      // );

      // this.emergencyTeam.regionChart.setOption(this.regionChartOption());

      // 应急场所  柱状图
      // this.emergencySite.regionChart = this.$echarts.init(
      //   document.getElementsByClassName("rightChart")[2]
      // );

      // this.emergencySite.regionChart.setOption(this.allChartOption());

      // this.emergencyExpert.regionChart.setOption(this.regionChartOption());

      // 应急专家 左图
      this.emergencyExpert.allChart = this.$echarts.init(
        document.getElementsByClassName("rightChart")[3]
      );

      // this.emergencyExpert.allChart.setOption(this.allChartOption());

      // 应急专家  右图
      this.emergencyExpert.regionChart = this.$echarts.init(
        document.getElementsByClassName("rightChart")[4]
      );

      // this.emergencyExpert.regionChart.setOption(this.regionChartOption());

      // 应急仓库  上图
      this.materialWarehouse.allChart = this.$echarts.init(
        document.getElementsByClassName("rightChart")[5]
      );

      this.materialWarehouse.allChart.setOption(this.emergencyWarehouseChart());

      // 应急仓库  下图
      // this.materialWarehouse.regionChart = this.$echarts.init(
      //   document.getElementsByClassName("rightChart")[6]
      // );

      // this.materialWarehouse.regionChart.setOption(this.allChartOption());

      const that = this;
      window.onresize = function () {
        that.emergencyTeam.allChart.resize();
        that.emergencyTeam.regionChart.resize();
        that.emergencyExpert.allChart.resize();
        that.emergencyExpert.regionChart.resize();
        this.materialWarehouse.regionChart.resize();
        this.emergencySite.regionChart.resize();
      };

      console.log(this.activeEventBtnKey);
      // console.log('formatDataList',this.formatDataList(listDatas.listData4))

      if (className != ".wraning-chart") {
        // 历年突发事件
        this.totalChartDiv = this.$echarts.init(
          document.querySelector(className)
        );
        let totalChartDataObj = {
          xAxisList: this.formatDataList(obj),
          listDatas: this.formatDataList(obj, "value"),
        };
        this.totalChartDiv.setOption(this.totalChartBar(totalChartDataObj));

        /**
         * @name: shaojie@
         * @Date: 2021-08-06 17:25:04
         * @description:   点击显示图形表
         * @param {*} click
         * @param {*} function
         */
        this.totalChartDiv.on("click", function (params) {
          let coding = "";
          if (className == ".chart-event-total") {
            coding = "IOns6DqV";
            that.showPop = true;
            that.popTitle = `${params.name}突发事件`;
          } else {
            console.log(this.activeEventBtnKey);
            if (that.activeEventBtnKey == 0) {
              coding = "QDTEFphh";
              that.popTitle_box = `${params.name}突发事件死亡人数 `;
            } else {
              coding = "Y3k1rxJM";
              that.popTitle_box = `${params.name} 经济损失  `;
            }
            that.showPop_bottom = true;
          }
          const data = {
            body: {
              year: params.name,
            },
          };
          getIndicator(coding, data).then((res) => {
            if (res.success) {
              const newMouth = [];
              res.body.data.map((e) => {
                newMouth.push({
                  name: e.month,
                  value: e.num,
                });
              });
              if (className == ".chart-event-total") {
                that.newInitChart(newMouth);
              } else {
                that.dieChart(newMouth);
              }
            }
          });
        });
      }

      // 预警总览
      if (className == ".wraning-chart") {
        this.wraningChart = this.$echarts.init(
          document.querySelector(className)
        );
        this.wraningChart.setOption(this.wraningChartPie(obj));
        window.onresize = function () {
          that.eventDeathDiv.resize();
          that.totalChartDiv.resize();
          that.eventEconomicDiv.resize();
          that.wraningChart.resize();
        };
      }
    },

    // 获取历年突发时间总量
    getEventTotalList(status) {
      getIndicator("PYHmVfNy", this.data).then((res) => {
        if (res.success) {
          if (status) {
            this.addUpList[0].num = res.body.data[res.body.data.length - 1].num;
          }
          this.eventTotalList = JSON.parse(
            JSON.stringify(res.body.data)
              .replace(/year/g, "name")
              .replace(/num/g, "value")
          );
          console.log(this.eventTotalList);
          this.initChart(".chart-event-total", this.eventTotalList);
        }
      });
    },
    // 获取历年死亡人数
    getDeathTollList(status) {
      getIndicator("5Di1dQpt", this.data).then((res) => {
        if (res.success) {
          if (status) {
            this.addUpList[1].num = res.body.data[res.body.data.length - 1].num;
          }
          this.deathTollList = JSON.parse(
            JSON.stringify(res.body.data)
              .replace(/year/g, "name")
              .replace(/num/g, "value")
          );
          this.initChart(".chart-event-death", this.deathTollList);
        }
      });
    },
    // 获取历年经济损失
    getFinancialLossList(status) {
      getIndicator("kRgb4780", this.data).then((res) => {
        if (res.success) {
          if (status) {
            this.addUpList[2].num = res.body.data[res.body.data.length - 1].num;
            return;
          }
          this.deathTollList = JSON.parse(
            JSON.stringify(res.body.data)
              .replace(/year/g, "name")
              .replace(/num/g, "value")
          );
          this.initChart(".chart-event-death", this.deathTollList);
        }
      });
    },
    //获取预警次数分类统计
    getClassifiedStatistic() {
      this.data.body = { year: new Date().getFullYear() };
      getIndicator("I9Uvdpwn", this.data).then((res) => {
        if (res.success) {
          this.initChart(
            ".wraning-chart",
            JSON.parse(JSON.stringify(res.body.data).replace(/num/g, "value"))
          );
        }
      });
    },
    //获取当年预警总数
    getWarningTotalNum() {
      this.data.body = { year: new Date().getFullYear() };
      getIndicator("M3I3wzvH", this.data).then((res) => {
        if (res.success) {
          this.warningTotalNum = res.body.data[0].num;
        }
      });
    },

    //三大运营商预警发布
    getWarningPublish() {
      this.data.body = { year: new Date().getFullYear() };
      getIndicator("88KBSK7m", this.data).then((res) => {
        if (res.success) {
          this.WarningPublish = res.body.data[0];
        }
      });
    },

    close() {
      this.showPop = false;
    },
    closeFn() {
      this.showPop_bottom = false;
    },
    // 获取应急资源总览
    getResoureList() {
      getIndicator("scdo38Pn", this.data).then((res) => {
        if (res.success) {
          let saveList = res.body.data;
          if (res.body.data && res.body.data.length) {
            this.resourcesList.map((i, k) => {
              let finds = null;
              finds = saveList.find((item, key) => {
                if (i.name === item.name) {
                  return item;
                }
              });
              if (finds) {
                i.number = finds.oneNum;
              }
            });
          }
        }
      });
    },
    // 获取应急预案总览
    getplanList() {
      getIndicator("8vVN77K3", this.data).then((res) => {
        if (res.success) {
          let saveList = res.body.data;
          if (res.body.data && res.body.data.length) {
            this.planList.map((i, k) => {
              let finds = null;
              finds = saveList.find((item, key) => {
                if (i.name === item.name) {
                  return item;
                }
              });
              if (finds) {
                i.number = finds.num;
              }
            });
          }
        }
      });
    },

    // 事件总量-点解切换按钮
    doActiveBtn(i, k) {
      console.log(i, k);
      this.timeHorizon.startTime = null;
      this.timeHorizon.endTime = null;
      this.activeBtnKey = i.key;
      if (k === 0) {
        this.data.body = {
          startTime: new Date().getFullYear() - 4,
          endTime: new Date().getFullYear(),
        };
      } else if (k === 1) {
        this.data.body = {
          startTime: new Date().getFullYear() - 9,
          endTime: new Date().getFullYear(),
        };
      }
      this.getEventTotalList();
      this.doEventBtn("", this.activeEventBtnKey);
    },
    beginYearChange() {
      this.activeBtnKey = null;
    },
    endYearChange() {
      this.activeBtnKey = null;
    },
    // 历年突发事件死亡人数 和经济损失
    doEventBtn(i, k) {
      this.activeEventBtnKey = k;
      if (this.activeEventBtnKey == 1) {
        this.getFinancialLossList();
      } else {
        this.getDeathTollList();
      }
    },

    // 历年突发事件总量-柱状图
    totalChartBar(obj) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "10%",
          right: "2%",
          left: "8%",
          bottom: "13%",
        },
        xAxis: [
          {
            type: "category",
            data: obj.xAxisList,
            axisLine: {
              lineStyle: {
                color: "#00e4fa",
              },
            },
            axisLabel: {
              color: "#e2e9ff",
              fontSize: that.$setFontSize(16),
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
              color: "#e2e9ff",
              left: "30px",
              fontSize: that.$setFontSize(16),
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0,186,255,.6)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.12)",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: obj.listDatas,
            itemStyle: {
              color: "#0079fe",
              // color:'rgb(248 45 45)'
            },
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                textStyle: {
                  color: "#fff",
                  fontSize: that.$setFontSize(16),
                },
              },
            },
          },
        ],
      };
      return option;
    },
    // 事件总量-柱状图
    totalChartBar1(obj) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
          },
        },

        grid: {
          top: "10%",
          right: "2%",
          left: "8%",
          bottom: "13%",
        },
        xAxis: [
          {
            type: "category",
            data: obj.xAxisList,
            axisLine: {
              lineStyle: {
                color: "#00e4fa",
              },
            },
            axisLabel: {
              color: "#e2e9ff",
              fontSize: that.$setFontSize(16),
            },
            axisTick: {
              show: true,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
              color: "#e2e9ff",
              left: "30px",
              fontSize: that.$setFontSize(16),
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0,186,255,.6)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.12)",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: obj.listDatas,
            itemStyle: {
              color: "#0079fe",
            },
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                textStyle: {
                  color: "#fff",
                  fontSize: that.$setFontSize(16),
                },
              },
            },
          },
        ],
      };
      return option;
    },

    totalChartBar2(obj) {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          axisPointer: {
            type: "shadow",
          },
        },

        grid: {
          top: "10%",
          right: "2%",
          left: "8%",
          bottom: "13%",
        },
        xAxis: [
          {
            type: "category",
            data: obj.xAxisList,
            axisLine: {
              lineStyle: {
                color: "#00e4fa",
              },
            },
            axisLabel: {
              color: "#e2e9ff",
              fontSize: that.$setFontSize(16),
            },
            axisTick: {
              show: true,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
              color: "#e2e9ff",
              left: "30px",
              fontSize: that.$setFontSize(16),
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0,186,255,.6)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.12)",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: obj.listDatas,
            itemStyle: {
              color: "#0079fe",
              // color:'#FF3FDA',
            },
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                textStyle: {
                  color: "#fff",
                },
              },
            },
          },
        ],
      };
      return option;
    },
    // 预警总览
    wraningChartPie(obj) {
      let that = this;
      let option = {
        color: ["#fee17b", "#01e4ff", "#e7468e", "#0179fe"],
        title: {
          text: "2021年预警次数分类统计",
          left: "50%",
          top: "2%",
          textAlign: "center",
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(25),
            // fontWeight: 0,
          },
        },
        grid: {
          left: 100,
          top: 100,
          bottom: 10,
          right: 10,
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
          formatter: "{b} : {c} ({d}%)",
        },
        // legend: {
        //     type: "scroll",
        //     orient: "vartical",
        //     // x: "right",
        //     top: "center",
        //     right: "15",
        //     // bottom: "0%",
        //     itemWidth: 16,
        //     itemHeight: 8,
        //     itemGap: 16,
        //     textStyle: {
        //         color: '#fff',
        //         fontSize: 12,
        //         fontWeight: 0
        //     },
        //     data: ['IDS', 'VPN', '交换机', '防火墙', 'WAF', '堡垒机']
        // },
        polar: {},
        angleAxis: {
          interval: 1,
          type: "category",
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B4A6B",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#fff",
            margin: 8,
            fontSize: that.$setFontSize(16),
          },
        },
        radiusAxis: {
          min: 40,
          max: 120,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B3E5E",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 20, 0],
            color: "#05aac6",
            fontSize: that.$setFontSize(16),
          },
          splitLine: {
            lineStyle: {
              color: "#05aac6",
              width: 2,
              type: "solid",
            },
          },
        },
        calculable: true,
        series: [
          {
            type: "pie",
            radius: ["50%", "50%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 20,
                length2: 55,
              },
              emphasis: {
                show: false,
              },
            },
            name: "",
            data: [
              {
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#0B4A6B",
                    fontSize: that.$setFontSize(16),
                  },
                },
              },
            ],
          },
          {
            stack: "a",
            type: "pie",
            radius: ["20%", "50%"],
            roseType: "area",
            zlevel: 10,
            label: {
              normal: {
                show: true,
                formatter: "{b} : {c} ({d}%)",
                textStyle: {
                  fontSize: that.$setFontSize(16),
                },
                position: "outside",
              },
              emphasis: {
                show: true,
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 55,
              },
              emphasis: {
                show: true,
              },
            },
            data: obj,
          },
        ],
      };
      return option;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
.command-table {
  width: 1500vw * @w;
  height: auto;
  padding: 10vh * @h;
  background-color: #0d3858;
  text-align: center;

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
      }

      & /deep/ .ant-tree-switcher {
        font-size: 18vh * @h;
      }

      & /deep/ .ant-tree-switcher i {
        font-size: 18vh * @h;
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
    }

    .command-table-right {
      flex: 1;
      height: 100%;
      color: #fff;
      overflow-y: auto;

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
    .content-div {
      width: 100%;
      height: 300vh * @h;
      display: flex;
      .text-chart {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 30%;
        font-size: 24vh * @h;
        .title {
          font-size: 24vh * @h;
          text-align: left;
        }
        p {
          text-align: left;
          width: 100%;
          font-size: 13vh * @h;
        }
      }
      .content-list {
        width: 100%;
        height: 100%;

        /deep/.c-tables {
          height: 100%;
          overflow: hidden;

          .list-body {
            background-color: transparent;

            .location {
              padding: 6vh * @h 10vw * @w;
              display: inline-block;
              border: 1vh * @h solid rgb(1, 255, 255);
              cursor: pointer;
            }
          }
        }
      }
    }
    .team_box {
      flex: 1;

      height: 100%;
      .team-chart {
        width: 100%;
        height: 100%;
      }
    }

    .type-switch {
      color: #fff;
      display: flex;
      align-items: center;
      .graph {
        width: 90vw * @w;
        height: 39vh * @h;
        text-align: center;
        border: 1px solid #0066cc;
        cursor: pointer;
      }
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

      > div {
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
    }

    .clist-table-list2 {
      // display: flex;
      max-height: 600vh * @h;
      justify-content: space-between;

      > div {
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
    }
  }

  .mouse-click {
    cursor: pointer;
  }
}

.command-table3 {
  width: 750vw * @w;
}
</style>