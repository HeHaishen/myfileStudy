<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-09 11:30:28
-->
<template>
  <div class="emergency-overview-right">
    <div class="layer">
      <layer-consulting ref="LayerConsulting"></layer-consulting>
    </div>
    <div class="watchover">
      <div class="model_box">
        <div class="model-title">应急值守</div>
      </div>
      <div class="model_item1" style="margin-top: 0px">
        <div class="title">
          <span>市局值班值守</span>
          <span>协同会商</span>
        </div>
        <div class="onDuty-content-top">
          <ul class="city-list">
            <li
              class="city-child"
              v-for="(item, index) in cityDutyPerson"
              :key="index"
            >
              <div class="name">
                <i
                  class="i-checked"
                  :class="[item.checked ? 'active-i' : '']"
                  @click="cityChecked(index, item)"
                  >{{ item.checked ? "✔" : "" }}</i
                >
                {{ item.name }}
              </div>
              <div class="unit">{{ item.position }}</div>
              <div class="phone">
                {{ item.phone }}
                <a-icon
                  type="phone"
                  class="icon"
                  @click="clickMobilePhone(item, $event)"
                  v-show="item.phone"
                />
                <a-icon
                  type="mail"
                  class="icon"
                  @click="clickMessage(item, $event)"
                  v-show="item.phone"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="model_item1">
        <div class="title">
          <span>各区应急管理局</span>
        </div>
        <div class="emergency_box_father">
          <div
            class="emergency_box"
            v-for="(item, index) in regionData"
            :key="index"
          >
            <div class="emergency_box_title">
              <span>{{ item.teamName }}-{{ item.deptName }}</span>
            </div>
            <div
              v-for="(item2, key2) in item.list"
              class="item-content-item"
              :key="key2"
            >
              <span>
                <i
                  class="i-checked"
                  :class="[item2.checked ? 'active-i' : '']"
                  @click="regionChecked(item2, key2)"
                  >{{ item2.checked ? "✔" : "" }}</i
                >
                {{ item2.name }}
              </span>
              <span>
                {{ item2.position }}
              </span>

              <span>
                {{ item2.phone }}
                <a-icon
                  type="phone"
                  class="icon"
                  @click="clickMobilePhone(item2, $event)"
                  v-show="item2.phone"
                />
                <a-icon
                  type="mail"
                  class="icon"
                  @click="clickMessage(item2, $event)"
                  v-show="item2.phone"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="model_item1">
        <div class="title">
          <span>成员单位</span>
        </div>
        <div class="emergency_box_father">
          <div
            class="emergency_box"
            v-for="(item, index) in memberUnitData"
            :key="index"
          >
            <div class="emergency_box_title">
              <span>{{ item.teamName }}</span>
            </div>
            <div
              v-for="(item2, key2) in item.list"
              class="item-content-item"
              :key="key2"
            >
              <span>
                <i
                  class="i-checked"
                  :class="[item2.checked ? 'active-i' : '']"
                  @click="memberChecked(item2, key2)"
                  >{{ item2.checked ? "✔" : "" }}</i
                >
                {{ item2.name }}
              </span>
              <span>
                {{ item2.position }}
              </span>
              <span>
                {{ item2.phone }}
                <a-icon
                  type="phone"
                  class="icon"
                  @click="clickMobilePhone(item2, $event)"
                  v-show="item2.phone"
                />
                <a-icon
                  type="mail"
                  class="icon"
                  @click="clickMessage(item2, $event)"
                  v-show="item2.phone"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="command">
      <div class="model_box">
        <div class="model-title">应急指挥</div>
      </div>
      <div class="command_item">
        <div class="command_title">指挥机构</div>
        <div class="command_content">
          <ul>
            <li
              v-for="(e, i) in command"
              :key="i"
              @click="
                popType = 1;
                riskTitle = '指挥机构';
              "
            >
              <img :src="e.lowUrl" alt="" />
              <span class="text">
                <img :src="e.icon" alt="" />
                <span>{{ e.title }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="command_item">
        <div class="command_title">三防责任人台账</div>
        <div class="command_content">
          <ul>
            <li v-for="(e, i) in duty" :key="i" @click="dutyFn(e, i)">
              <img :src="e.lowUrl" alt="" />
              <span class="text">
                <img :src="e.icon" alt="" />
                <span>{{ e.title }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="command_item_center">
        <div class="command_title">应急资源</div>
        <ul>
          <li v-for="(e, i) in resource" :key="i" @click="switchCamera(i)">
            <img :src="e.lowUrl" alt="" />

            <div class="child">
              {{ e.label }}
              <span class="command_num">{{ e.num }}</span>
              {{ e.unit }}
            </div>
          </li>
        </ul>
      </div>
      <div class="command_item_center">
        <div class="command_title">资料库</div>
        <ul>
          <li
            v-for="(e, i) in dataBank"
            :key="i"
            @click="ClickdataBankFn(e, i)"
          >
            <img :src="e.lowUrl" alt="" />

            <div class="child">
              {{ e.label }}
              <span class="command_num">{{ e.num }}</span>
              个
            </div>
          </li>
        </ul>

        <!-- 典型案例 -->
        <temp-pop
          v-if="showPop"
          :show="showPop"
          ref="myPopUpLayer"
          :setStyles="{ left: '70%', top: '50%' }"
          class="command-table command-table3 leftTable"
          :title="popTitle"
          @doClose="close('3')"
        >
          <template slot="content">
            <div class="water_search">
              <a-input-search
                placeholder="请输入关键字"
                v-model="searchWord"
                @search="inputSearch"
              />
            </div>
            <div class="table-list">
              <Table :columns="columns" :listData="tableData">
                <template slot="index" slot-scope="{ record, text, index }">
                  <span>{{ index + 1 }}</span>
                </template>
              </Table>
            </div>
            <div class="list-change-page">
              <ChangePage
                :total="symbol.total"
                :currentPage="symbol.currentPage"
                @changePages="clickSymbolPlanChangePages"
              />
            </div>
          </template>
        </temp-pop>

        <!--应急队伍  -->
        <tempPop
          title="应急队伍"
          :show="team"
          :setStyles="{ left: '81%', top: '50%' }"
          class="command-table commom_left command-table4"
          @doClose="close('5')"
          ref="myPopUpLayer"
        >
          <template slot="title">
            <div class="title_box">
              <span
                @click="teamlist1 = 1"
                :class="teamlist1 == 1 ? 'title_active' : ''"
                >图形</span
              >
              <span
                @click="teamlist1 = 2"
                :class="teamlist1 == 2 ? 'title_active' : ''"
                >列表</span
              >
            </div>
          </template>

          <template slot="content">
            <div class="clist-table" v-show="teamlist1 == 2">
              <div class="conditions-search search">
                <span class="time">更新：{{ curMonth }}</span>
                <div class="search-icon">
                  <input type="text" />
                  <div
                    class="icon-container"
                    @click="doSearch"
                    @keydown="doSearch"
                  >
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>

              <div class="clist-table-list">
                <div>
                  <div class="listTitle">
                    <span
                      v-for="(e, i) in teamTitlelist"
                      :key="i"
                      @click="SearchSelectedTeam(e, i)"
                      :class="TeamNum == i ? 'active' : ''"
                    >
                      {{ e.name }}
                    </span>
                  </div>
                  <Table :columns="columnsTeam" :listData="tableteam"> </Table>
                </div>
              </div>
            </div>
            <div class="clist-table" v-show="teamlist1 == 1">
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">内涝黑点及正施工整治统计</p>
                    <p>更新：{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box">
                  <div class="team-chart"></div>
                </div>
              </div>
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">内涝黑点及正施工整治统计</p>
                    <p>更新：{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
            </div>
          </template>
        </tempPop>
        <!-- 危险人群 -->
        <pop-up-layer
          title="危险人群"
          :show="hazardousAreaShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table2"
          @doClose="close('2')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="clist-table">
              <div class="danger">
                <div class="conditions-search">
                  <!-- <span>区域：</span
                  ><input
                    v-model="formData.areaName"
                    placeholder="请输入区域"
                  /> -->
                  <span>名称：</span
                  ><input
                    v-model="formData.reservoirName"
                    placeholder="请输入转移人姓名"
                  />
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
                  <button class="mouse-click btn" @click="onSubmit(3)">
                    查询
                  </button>
                  <button class="mouse-click btn" @click="onEmpty">清空</button>
                </div>
                <div class="c-function">
                  <button class="mouse-click btn video">视频会商</button>
                  <button
                    class="mouse-click btn all-checked"
                    @click="checkedAllDangerClick"
                    v-show="tabelListData3.length != 0"
                  >
                    全选
                  </button>
                </div>
              </div>

              <div class="clist-table-list2">
                <div class="list-table">
                  <Table :columns="tableHeaderList3" :listData="tabelListData3">
                    <template
                      slot="checked"
                      slot-scope="{ record, text, index }"
                    >
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
                  </Table>
                </div>
                <div
                  class="list-pagination"
                  v-show="tabelListData3.length != 0"
                >
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
          title="三本台账"
          :show="parameterListShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table2"
          @doClose="close('1')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="clist-table">
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

              <div class="conditions-search">
                <span>区域：</span
                ><input v-model="formData.areaName" placeholder="请输入区域" />
                <span>名称：</span
                ><input
                  v-model="formData.subjectName"
                  placeholder="请输入名称"
                />
                <span>管理单位：</span
                ><input
                  v-model="formData.managementUnit"
                  placeholder="请输入管理单位"
                />
                <button class="mouse-click btn" @click="onSubmit(4)">
                  查询
                </button>
                <button class="mouse-click btn" @click="onEmpty">清空</button>
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
                  <Table :columns="tableHeaderList4" :listData="tabelListData4">
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
                            administrationMobileMobilePhone(
                              record,
                              $event,
                              text
                            )
                          "
                          v-show="text != '--'"
                        />
                        <a-icon
                          type="mail"
                          class="icon"
                          @click="
                            administrationMobileMessage(record, $event, text)
                          "
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
                            technologyMobilePhonMobilePhone(
                              record,
                              $event,
                              text
                            )
                          "
                          v-show="text != '--'"
                        />
                        <a-icon
                          type="mail"
                          class="icon"
                          @click="
                            technologyMobilePhonMessage(record, $event, text)
                          "
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
                          @click="
                            patrolMobilePhoneMessage(record, $event, text)
                          "
                          v-show="text != '--'"
                        />
                      </div>
                    </template>
                  </Table>
                </div>
                <div
                  class="list-pagination"
                  v-show="tabelListData4.length != 0"
                >
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

        <!--  防汛责任人  -->
        <pop-up-layer
          title="防汛责任人"
          :show="dutyFloodShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table2"
          @doClose="close('4')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="clist-table">
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
                <!-- <span>区域：</span
                ><input v-model="formData.address" placeholder="请输入区域" /> -->
                <button class="mouse-click btn" @click="onSubmit(2)">
                  查询
                </button>
                <button class="mouse-click btn" @click="onEmpty">清空</button>
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
                  <Table :columns="tableHeaderList2" :listData="tabelListData2">
                    <template
                      slot="dutyPhone"
                      slot-scope="{ record, text, index }"
                    >
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
                            administrationOfficeMobilePhone(
                              record,
                              $event,
                              text
                            )
                          "
                          v-show="text != '--'"
                        />
                        <a-icon
                          type="mail"
                          class="icon"
                          @click="
                            administrationOfficeMessage(record, $event, text)
                          "
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
                          @click="
                            administrationMobilePhone(record, $event, text)
                          "
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
                          @click="
                            technologyOfficeMobilePhone(record, $event, text)
                          "
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
                  </Table>
                </div>
                <div
                  class="list-pagination"
                  v-show="tabelListData2.length != 0"
                >
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

        <!--  三防风险点  -->
        <tempPop
          title="三防风险点"
          :show="threeRisk"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table4"
          @doClose="close('6')"
          ref="myPopUpLayer"
        >
          <template slot="content">
            <div class="right-right">
              <div class="main-risk">
                主要风险隐患处<span>{{ riskNum }}</span
                >处
              </div>
              <div class="main-risk-content">
                <div class="main-risk-tab">
                  <p
                    v-for="(item, index) in riskTab"
                    :key="item.key"
                    :style="{ backgroundColor: item.bcg }"
                    @click="riskBtn(item, index)"
                  >
                    <span>{{ item.name }}</span
                    ><span :style="{ color: item.color }">{{ item.num }}</span>
                  </p>
                </div>
                <div class="mian-risk-title">
                  <div class="risk-small-tab">
                    <span class="spantab">
                      {{ tabTitle }}
                    </span>

                    <div
                      v-for="(item, index) in tabBtn"
                      :key="index"
                      :class="[tabBtnIndex == index ? 'chose-btn-active' : '']"
                      @click="tabBtnClick(item, index)"
                      v-show="riskTabIndex != 2"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div
                    class="center-left-search"
                    v-show="tabBtnIndex != 0 || riskTabIndex == 2"
                  >
                    <input
                      class="c-input"
                      placeholder="输入关键字"
                      type="text"
                      v-model="listKey"
                    />
                    <img
                      src="../../../assets/images/emergencyOverview/icon_search.png"
                      alt=""
                      @click="searchList"
                    />
                  </div>
                </div>
                <div class="content-div">
                  <div
                    class="text-chart"
                    v-if="tabBtnIndex != 1 && riskTabIndex != 2"
                  >
                    <div>
                      <p class="title">内涝黑点及正施工整治统计</p>
                      <p class="update-time">更新：{{ curMonth }}</p>
                    </div>
                  </div>
                  <div
                    class="ponding-chart"
                    v-show="riskTabIndex == 0 && tabBtnIndex == 0"
                  ></div>
                  <div
                    class="geology-chart"
                    v-show="riskTabIndex == 1 && tabBtnIndex == 0"
                  ></div>
                  <div
                    class="content-list"
                    v-show="tabBtnIndex == 1 || riskTabIndex == 2"
                  >
                    <Table
                      v-show="riskTabIndex == 0 && tabBtnIndex == 1"
                      :columns="pondingHeaderList"
                      :listData="riskTabelListData"
                      @tableTdClick="tableTdClick"
                    >
                      <template
                        slot="index"
                        slot-scope="{ record, text, index }"
                        >{{ index + 1 }}</template
                      >
                      <template
                        slot="administrationPhone"
                        slot-scope="{ record, text, index }"
                      >
                        {{ record.administrationName
                        }}{{ text ? "--" + text : "" }}
                        <div class="wrap-center">
                          <a-icon
                            type="phone"
                            class="icon"
                            @click="riskPointsMobilePhone(record, $event, text)"
                            v-show="text"
                          />
                          <a-icon
                            type="mail"
                            class="icon"
                            @click="riskPointsMessage(record, $event, text)"
                            v-show="text"
                          />
                        </div>
                      </template>
                      <template
                        slot="technologyPhone"
                        slot-scope="{ record, text, index }"
                      >
                        {{ record.technologyName }}-{{ text ? "-" + text : "" }}
                        <div class="wrap-center">
                          <a-icon
                            type="phone"
                            class="icon"
                            @click="
                              riskPointsOneMobilePhone(record, $event, text)
                            "
                            v-show="text"
                          />
                          <a-icon
                            type="mail"
                            class="icon"
                            @click="riskPointsOneMessage(record, $event, text)"
                            v-show="text"
                          />
                        </div>
                      </template>
                      <template
                        slot="patrolPhone"
                        slot-scope="{ record, text, index }"
                      >
                        {{ record.patrolName }}{{ text ? "--" + text : "" }}
                        <div class="wrap-center">
                          <a-icon
                            type="phone"
                            class="icon"
                            @click="
                              riskPointsTwoMobilePhone(record, $event, text)
                            "
                            v-show="text"
                          />
                          <a-icon
                            type="mail"
                            class="icon"
                            @click="riskPointsTwoMessage(record, $event, text)"
                            v-show="text"
                          />
                        </div>
                      </template>
                    </Table>

                    <!-- 积水内涝风险点 -->
                    <div
                      class="list-change-page"
                      v-show="riskTabIndex == 0 && tabBtnIndex == 1"
                    >
                      <ChangePage
                        :total="riskPoints.total"
                        :currentPage="riskPoints.currentPage"
                        @changePages="clickRiskPointsPlanChangePages"
                      />
                    </div>
                    <Table
                      v-show="riskTabIndex == 1 && tabBtnIndex == 1"
                      :columns="geologyHeaderList"
                      :listData="geologyTabelListData"
                      @tableTdClick="tableTdClick"
                    >
                      <template
                        slot="index"
                        slot-scope="{ record, text, index }"
                        >{{ index + 1 }}</template
                      >

                      <template
                        slot="position"
                        slot-scope="{ record, text, index }"
                      >
                        <span
                          class="location"
                          @click="emergencyTeamLocation(record)"
                          >定位</span
                        ></template
                      >

                      <template
                        slot="responsible"
                        slot-scope="{ record, text, index }"
                      >
                        {{ text }}
                        <div class="wrap-center">
                          <a-icon
                            type="phone"
                            class="icon"
                            @click="
                              hiddenDangerMobilePhone(record, $event, text)
                            "
                            v-show="text"
                          />
                          <a-icon
                            type="mail"
                            class="icon"
                            @click="hiddenDangerMessage(record, $event, text)"
                            v-show="text"
                          />
                        </div>
                      </template>
                    </Table>

                    <!-- 地质灾害隐患 -->
                    <div
                      class="list-change-page"
                      v-show="riskTabIndex == 1 && tabBtnIndex == 1"
                    >
                      <ChangePage
                        :total="hiddenDanger.total"
                        :currentPage="hiddenDanger.currentPage"
                        @changePages="clickHiddenDangerPlanChangePages"
                      />
                    </div>

                    <Table
                      v-show="riskTabIndex == 2"
                      :columns="tableHeaderList"
                      :listData="tabelListData"
                      @tableTdClick="tableTdClick"
                    >
                    </Table>
                    <!-- 水利工程隐患 -->
                    <div class="list-change-page" v-show="riskTabIndex == 2">
                      <ChangePage
                        :total="hydraulic.total"
                        :currentPage="hydraulic.currentPage"
                        @changePages="clickHydraulicPlanChangePages"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </tempPop>
        <!--指挥机构 -->
        <pop-up-layer
          title="指挥机构"
          :show="commandAuthorityShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table"
          @doClose="close('7')"
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
                  @select="onSelectTree"
                />
              </div>
              <div class="command-table-right">
                <div v-for="item in authorityList" :key="item.id">
                  <p><img :src="item.imgUrl" alt="" />{{ item.postName }}</p>
                  <div class="command-table-right-list">
                    <div v-for="item in item.children" :key="item.id">
                      <input type="checkbox" v-model="item.checked" id="ch" />
                      <span>{{ item.name }}</span>
                      <span>{{ item.depaName }}</span>
                      <span>{{ item.phone }}</span>
                    </div>
                  </div>
                </div>
                <div class="no-datatips" v-show="authorityList.length == 0">
                  暂无人员信息
                </div>
              </div>
            </div>
          </template>
        </pop-up-layer>

        <!-- shaojie -->
        <!-- 应急装备 -->
        <tempPop
          title="应急装备"
          :show="equipmentShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table4"
          @doClose="close('8')"
          ref="myPopUpLayer"
        >
          <template slot="title">
            <div class="title_box">
              <span
                @click="teamlist2 = 1"
                :class="teamlist2 == 1 ? 'title_active' : ''"
                >图形</span
              >
              <span
                @click="teamlist2 = 2"
                :class="teamlist2 == 2 ? 'title_active' : ''"
                >列表</span
              >
            </div>
          </template>
          <template slot="content">
            <div class="clist-table" v-show="teamlist2 == 2">
              <div class="conditions-search search">
                <span class="time">更新：{{ curMonth }}</span>
                <div class="search-icon">
                  <input type="text" />
                  <div class="icon-container">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>

              <div class="clist-table-list">
                <div>
                  <div class="listTitle">
                    <span
                      v-for="(e, i) in teamTitlelist1"
                      :key="i"
                      @click="SearchSelectedTeam(e, i)"
                      :class="TeamNum == i ? 'active' : ''"
                    >
                      {{ e.name }}
                    </span>
                  </div>
                  <Table :columns="equipmentList" :listData="tableteam">
                  </Table>
                </div>
              </div>
            </div>
            <div class="clist-table" v-show="teamlist2 == 1">
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">2019年与2020年装备数量对比</p>
                    <p>更新：{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">2020年各区装备数量统计</p>
                    <p>更新：{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
            </div>
          </template>
        </tempPop>
        <!-- 应急专家 -->
        <tempPop
          title="应急专家"
          :show="specialistShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table4"
          @doClose="close('9')"
          ref="myPopUpLayer"
        >
          <template slot="title">
            <div class="title_box">
              <span
                @click="specialistClick(index)"
                v-for="(item, index) in typeList"
                :class="[activeIndex3 == index ? 'title_active' : '']"
                :key="item.key"
              >
                {{ item.name }}
              </span>
            </div>
          </template>
          <template slot="content">
            <div class="clist-table" v-show="activeIndex3 == 1">
              <div class="search">
                <span class="time">更新：{{ curMonth }}</span>
                <div class="search-icon">
                  <input type="text" v-model="specialInput" />
                  <div class="icon-container" @click="specialClick">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>

              <div class="clist-table-list">
                <div>
                  <!-- <div class="listTitle">
                    <span
                      v-for="(e, i) in teamTitlelist1"
                      :key="i"
                      @click="SearchSelectedTeam(e, i)"
                      :class="TeamNum == i ? 'active' : ''"
                    >
                      {{ e.name }}
                    </span>
                  </div> -->
                  <Table :columns="specialistColumn" :listData="specialistData">
                    <template slot="position" slot-scope="{ record, text }">
                      <p
                        class="position-border"
                        @click="emergencyTeamLocation(record)"
                      >
                        定位
                      </p>
                    </template>
                  </Table>
                </div>
              </div>
            </div>
            <div class="clist-table" v-show="activeIndex3 == 0">
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">2020年应急专家数量统计</p>
                    <p>更新:{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">2020年各区应急专家数量统计</p>
                    <p>更新:{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
            </div>
          </template>
        </tempPop>
        <!--应急场所 -->
        <tempPop
          title="应急场所"
          :show="siteShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table4"
          @doClose="close('10')"
          ref="myPopUpLayer"
        >
          <template slot="title">
            <div class="title_box">
              <span
                @click="teamlist4 = 1"
                :class="teamlist4 == 1 ? 'title_active' : ''"
                >图形</span
              >
              <span
                @click="teamlist4 = 2"
                :class="teamlist4 == 2 ? 'title_active' : ''"
                >列表</span
              >
            </div>
          </template>
          <template slot="content">
            <div class="clist-table" v-show="teamlist4 == 2">
              <div class="clist-table-list">
                <div>
                  <div class="listTitle">
                    <span
                      v-for="(e, i) in teamTitlelist1"
                      :key="i"
                      @click="SearchSelectedTeam(e, i)"
                      :class="TeamNum == i ? 'active' : ''"
                    >
                      {{ e.name }}
                    </span>
                  </div>
                  <Table :columns="sitelist" :listData="tableteam"> </Table>
                </div>
              </div>
            </div>
            <div class="clist-table" v-show="teamlist4 == 1">
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">内涝黑点及正施工整治统计</p>
                    <p>更新: {{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
            </div>
          </template>
        </tempPop>
        <!-- 物资仓库 -->
        <tempPop
          title="物资仓库"
          :show="warehouseShow"
          :setStyles="{ left: '74%', top: '50%' }"
          class="command-table command-table4"
          @doClose="close('11')"
          ref="myPopUpLayer"
        >
          <template slot="title">
            <div class="title_box">
              <span
                @click="warehouseClick(index)"
                v-for="(item, index) in typeList"
                :class="[activeIndex3 == index ? 'title_active' : '']"
                :key="item.key"
              >
                {{ item.name }}
              </span>
            </div>
          </template>
          <template slot="content">
            <div class="clist-table" v-show="activeIndex5 == 1">
              <div class="conditions-search search">
                <span class="time">更新：{{ curMonth }}</span>
                <div class="search-icon">
                  <input type="text" />
                  <div class="icon-container">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
              </div>

              <div class="clist-table-list">
                <div>
                  <Table :columns="warehouseColumn" :listData="warehouseData">
                  </Table>
                </div>
              </div>
            </div>
            <div class="clist-table" v-show="activeIndex5 == 0">
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">物资类型占比统计</p>
                    <p>更新：{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
              <div class="content-div">
                <div class="text-chart">
                  <div>
                    <p class="title">物资仓库各区数量统计</p>
                    <p>更新：{{ curMonth }}</p>
                  </div>
                </div>
                <div class="team_box"><div class="team-chart"></div></div>
              </div>
            </div>
          </template>
        </tempPop>
        <!-- shaojie -->

        <!--  应急预案  -->
        <tempPop
          :title="emergencyPlan.title"
          :show="emergencyPlan.show"
          :v-show="emergencyPlan.show"
          :setStyles="{ left: '84%', top: '60%' }"
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
                <!-- <select v-model="cityType" @change="cityTypeClick">
                  <option :value="i.name" v-for="i in cityList" :key="i.key">
                    {{ i.name }}
                  </option>
                </select>

                <select v-model="countyType" @change="countyTypeClick">
                  <option :value="i.name" v-for="i in countyList" :key="i.key">
                    {{ i.name }}
                  </option>
                </select>
                <select v-model="streetType" @change="streetTypeClick">
                  <option :value="i.name" v-for="i in streetList" :key="i.key">
                    {{ i.name }}
                  </option>
                </select> -->
                <div class="search-icon">
                  <input type="text" v-model="emergencyPlan.input" />
                  <div class="icon-container" @click="emergencyPlanInput">
                    <img :src="iconSearch" alt="" class="img" />
                  </div>
                </div>
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
      </div>

      <!-- 应急队伍 -->
      <tempPop
        :title="emergencyTeam.title"
        :show="emergencyTeam.show"
        :v-show="emergencyTeam.show"
        :setStyles="{ left: '80%', top: '60%' }"
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
            <div v-show="emergencyTeam.emergencyTeamIndex == 1">
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

      <!-- 应急专家 -->
      <tempPop
        :title="emergencyExpert.title"
        :show="emergencyExpert.show"
        :v-show="emergencyExpert.show"
        :setStyles="{ left: '85%', top: '65%' }"
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
                  emergencyExpert.emergencyExpertIndex == index ? 'active' : ''
                "
                @click="emergencyExpertClick(index)"
              >
                {{ item.type }}
              </li>
            </ul>
            <div v-show="emergencyExpert.emergencyExpertIndex == 1">
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

      <!-- 应急场所 -->
      <tempPop
        :title="emergencySite.title"
        :show="emergencySite.show"
        :v-show="emergencySite.show"
        :setStyles="{ left: '88%', top: '68%' }"
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
            <div v-show="emergencySite.emergencySiteIndex == 1">
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
    </div>

    <right-pop
      :popType="popType"
      @clickClose="popType = 0"
      :riskTitle="riskTitle"
    ></right-pop>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import moment from "moment";
import popUpLayer from "@/components/APicture/popUpLayer/index.vue";
import ChangePage from "@/components/APicture/changePage";
import listDatas from "../utils/datas";
import lowUrl_left from "@/assets/images/dragonBoatNormal/bg_small.png";
import lowUrl_center from "@/assets/images/dragonBoatNormal/bg_small_center.png";
import lowUrl_right from "@/assets/images/dragonBoatNormal/bg_small_right.png";
import { indicatorCodes } from "@/api/dragonBoatNormal";
import Table from "@/components/APicture/c-table.vue";
import tempPop from "@/views/dragonBoatNormal/components/pop.vue";
import LayerConsulting from "@/components/layerInfo/LayerConsulting.vue"; // 会商
import RightPop from "./RightPop.vue";
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";
// import {indicatorCodes} from "@/api/"
export default {
  components: {
    popUpLayer,
    Table,
    tempPop,
    LayerConsulting,
    RightPop,
    ContactPhone,
    MessageSend,
    ChangePage,
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

      // 三本台账
      tabelListData4: [],

      // 水利工程隐患
      hydraulic: {
        total: 0,
        currentPage: 1,
      },
      // 地质灾害隐患
      hiddenDanger: {
        total: 0,
        currentPage: 1,
      },
      // 积水内涝风险点
      riskPoints: {
        total: 0,
        currentPage: 1,
      },
      memberUnitData: [],
      // 典型案例
      symbol: {
        total: 0,
        currentPage: 1,
        input: "",
      },
      name: "",
      defaultParams: {
        body: {
          name: "",
          keywords: "",
          yjjCode: "",
          albt: "",
          reservoirName: "",
          accountType: "城市易涝点",
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc",
      },
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
          { title: "应急场所名称", index: 0, textIndex: "mc", width: "40%" },
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

      emergencyChart: null,
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
            index: 2,
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

      specialInput: "",
      equipmentList: [],
      curMonth: moment(new Date()).format("YYYY年MM月"),
      typeList: [
        { name: "图形", key: 1 },
        { name: "列表", key: 2 },
      ],
      activeIndex1: 0,
      activeIndex2: 0,
      activeIndex3: 0,
      activeIndex4: 0,
      activeIndex5: 0,
      popType: 0, // 弹窗类型
      riskTitle: "", //弹窗标题
      iconSearch: require("../../../assets/images/dragonBoatNormal/u43.svg"),

      warehouseShow: false,
      siteShow: false,
      specialistShow: false,
      equipmentShow: false,
      // 积水echart
      commandAuthorityShow: false,
      pondingDiv: null,
      // 水利工程隐患
      tabelListData: [],
      // 积水内涝风险点
      riskTabelListData: [],
      // 地质灾害列表
      geologyTabelListData: [],
      tabBtnIndex: "0",
      riskNum: 428,
      listKey: undefined,
      tabBtn: [
        { key: "0", name: "图表" },
        { key: "1", name: "列表" },
      ],
      riskTab: [
        {
          name: "积水内涝风险点",
          num: "36",
          key: 0,
          bcg: "#063E62",
          color: "#33CCFF",
        },
        {
          name: "地质灾害隐患",
          num: "377",
          key: 1,
          bcg: "#332C3E",
          color: "#FFCC66",
        },
        {
          name: "水利工程隐患",
          num: "14",
          key: 2,
          bcg: "#21473E",
          color: "#66FF66",
        },
      ],
      tableHeaderList: [
        {
          title: "隐患说明",
          index: 3,
          textIndex: "hiddenExplain",
          width: "50%",
        },
      ],
      geologyHeaderList: [
        { title: "序号", index: 0, textIndex: "index", width: "10%" },
        { title: "隐患点名称", index: 1, textIndex: "name", width: "10%" },
        {
          title: "风险源隐患点面临主要灾害类型",
          index: 2,
          textIndex: "type",
          width: "15%",
        },
        {
          title: "管理单位",
          index: 3,
          textIndex: "managementUnit",
          width: "25%",
        },
        { title: "负责人", index: 4, textIndex: "responsible", width: "30%" },
        { title: "定位", index: 5, textIndex: "position", width: "10%" },
      ],
      riskTabIndex: "0",
      threeRisk: false,
      team: false,
      parameterListShow: false,
      dutyFloodShow: false,
      risk: false,
      // defaultParams: {
      //   body: {
      //     yjjCode: "",
      //   },
      //   page: 1,
      //   pageSize: 20,
      //   sortName: "sid",
      //   sortOrder: "desc",
      // },
      // 应急专家的内容
      specialistData: [],
      // 应急专家图表的内容
      specialistChart: [],
      // 物资仓库的内容
      warehouseData: [],
      warehouseColumn: [
        { textIndex: "rownum", title: "仓库名称" },
        { textIndex: "teamName", title: "负责人" },
        { textIndex: "person", title: "联系电话" },
        { textIndex: "phone", title: "仓库类型" },
        { textIndex: "position", title: "定位" },
      ],
      specialistColumn: [
        { textIndex: "zjxm", title: "专家姓名" },
        { textIndex: "yddh", title: "联系电话" },
        { textIndex: "zjlxmc", title: "专家专业/类型" },
        { textIndex: "position", title: "定位" },
      ],
      sitelist: [
        { textIndex: "rownum", title: "应急场所名称" },
        { textIndex: "teamName", title: "负责人" },
        { textIndex: "person", title: "联系电话" },
        { textIndex: "phone", title: "面积(m)" },
        { textIndex: "person1", title: "容纳人数" },
        { textIndex: "phone", title: "位置" },
        { textIndex: "phone", title: "定位" },
      ],
      tableteam: [],
      pondingHeaderList: [
        { title: "序号", index: 0, textIndex: "index", width: "10%" },
        { title: "属地", index: 1, textIndex: "territory", width: "10%" },
        {
          title: "积水、内涝点名称",
          index: 2,
          textIndex: "name",
          width: "15%",
        },
        { title: "积水、内涝等级", index: 3, textIndex: "level", width: "10%" },
        {
          title: "责任单位",
          index: 4,
          textIndex: "responsibleUnit",
          width: "15%",
        },
        {
          title: "行政责任人及联系电话",
          index: 5,
          textIndex: "administrationPhone",
          width: "20%",
        },
        {
          title: "技术责任人及联系电话",
          index: 6,
          textIndex: "technologyPhone",
          width: "20%",
        },
        {
          title: "日常管养责任人及联系电话",
          index: 7,
          textIndex: "patrolPhone",
          width: "20%",
        },
        {
          title: "治理进展情况",
          index: 8,
          textIndex: "governanceProgress",
          width: "20%",
        },
      ],
      columnsTeam: [
        { textIndex: "rownum", title: "序号", width: "10%" },
        { textIndex: "teamName", title: "队伍名称", width: "55%" },
        { textIndex: "person", title: "负责人", width: "15%" },
        { textIndex: "phone", title: "联系电话", width: "20%" },
      ],
      teamTitlelist: [
        { name: "全部" },
        { name: "专业队伍" },
        { name: "基层队伍" },

        { name: "社会力量" },
        { name: "民兵基干力量" },
      ],
      teamTitlelist1: [
        { name: "全部" },
        { name: "装备分类" },
        { name: "装备分类" },

        { name: "装备分类" },
        { name: "装备分类" },
      ],
      teamTitlelist2: [{ name: "仓库" }, { name: "物资" }],
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
      ],
      tableTitleList: [
        { name: "行政责任人", index: 0 },
        { name: "行政责任人", index: 1 },
        { name: "技术责任人", index: 2 },
        { name: "巡查责任人", index: 3 },
      ],
      tabelListData2: [],
      // 三本台账 表格标题
      tableHeaderList4: [
        { title: "水库名称", index: 1, textIndex: "subjectName" },
        { title: "辖区", index: 0, textIndex: "areaName" },
        { title: "所在位置", index: 2, textIndex: "address" },
        { title: "管理单位", index: 3, textIndex: "managementUnit" },

        { title: "职务", index: 3, textIndex: "administrationPost" },
        { title: "姓名", index: 3, textIndex: "administrationName" },
        { title: "手机", index: 3, textIndex: "administrationMobile" },

        { title: "职务", index: 3, textIndex: "technologyPost" },
        { title: "姓名", index: 3, textIndex: "technologyName" },
        { title: "手机", index: 3, textIndex: "technologyMobilePhon" },

        { title: "职务", index: 3, textIndex: "patrolPost" },
        { title: "姓名", index: 3, textIndex: "patrolName" },
        { title: "手机", index: 3, textIndex: "patrolMobilePhone" },
      ],
      // 三本台账 数据筛选
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
      columns: [
        { textIndex: "index", title: "序号", width: "10%" },
        { textIndex: "typename", title: "名称", width: "20%" },
        { textIndex: "levelname", title: "事故类别", width: "20%" },
        { textIndex: "sjkssj", title: "事故发生时间", width: "20%" },
        { textIndex: "albt", title: "事故内容", width: "30%" },
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
      tabelListData3: [],
      cityDutyPerson: [],
      emergencyPerson: [
        {
          label: "区值班长",
          name: "陈凯生",
          tel: "138******00",
          checked: false,
        },
        {
          label: "区值班长",
          name: "陈凯生",
          tel: "138******00",
          checked: false,
        },
        {
          label: "区值班长",
          name: "陈凯生",
          tel: "138******00",
          checked: false,
        },
      ],

      command: [
        {
          lowUrl: lowUrl_left,
          icon: require("@/assets/images/dragonBoatNormal/icon_city.png"),
          title: "市级指挥机构",
          checked: false,
        },
        {
          lowUrl: lowUrl_center,
          icon: require("@/assets/images/dragonBoatNormal/icon_district.png"),
          title: "区级指挥中心",
          checked: false,
        },
        {
          lowUrl: lowUrl_right,
          icon: require("@/assets/images/dragonBoatNormal/icon_street.png"),
          title: "街镇级指挥中心",
          checked: false,
        },
      ],
      duty: [
        {
          lowUrl: lowUrl_left,
          icon: require("@/assets/images/dragonBoatNormal/icon_person.png"),
          title: "防汛责任人",
          checked: false,
        },
        {
          lowUrl: lowUrl_center,
          icon: require("@/assets/images/dragonBoatNormal/icon_danger.png"),
          title: "危险区域人群",
          checked: false,
        },
        {
          lowUrl: lowUrl_right,
          icon: require("@/assets/images/dragonBoatNormal/icon_directions.png"),
          title: "三本台账",
          checked: false,
        },
      ],
      // 指挥机构人员信息数据
      authorityList: [],
      formData: {
        reservoirName: "",
        dikeName: "",
        subjectName: "",
        name: "",
        accountType: "",
      },
      searchWord: "",
      //应急资源
      resource: [
        {
          lowUrl: lowUrl_left,
          num: "133",
          label: "应急队伍",
          unit: "队",
        },
        {
          lowUrl: lowUrl_center,
          num: "465",
          label: "应急装备",
          unit: "件",
        },
        {
          lowUrl: lowUrl_right,
          num: "182",
          label: "应急专家",
          unit: "人",
        },
        {
          lowUrl: lowUrl_left,
          num: "35",
          label: "应急场所",
          unit: "个",
        },
        {
          lowUrl: lowUrl_center,
          num: "67",
          label: "物资仓库",
          unit: "个",
        },
      ],
      //资料库
      dataBank: [
        {
          lowUrl: lowUrl_left,
          num: "25",
          label: "应急预案",
        },
        {
          lowUrl: lowUrl_center,
          num: "465",
          label: "典型案例",
        },
        {
          lowUrl: lowUrl_right,
          num: "182",
          label: "三防风险点",
        },
      ],
      popTitle: "",
      showPop: false,
      tableData: [],
      popnum: 0,
      hazardousAreaShow: false,
      parameterActive: 1,
      dutyFloodIndex: 0,
      teamlist1: 1,
      teamlist2: 1,
      teamlist3: 1,
      teamlist4: 1,
      teamlist5: 1,

      TeamNum: 0,
      tabTitle: " 积水内涝风险点 ",
      geologyDiv: null,
      treeData: [],
      teamchart: null,
      teamchart1: null,
      teamchart2: null,
      teamchart3: null,
      teamchart4: null,
      teamchart5: null,
      teamchart6: null,
      teamchart7: null,
      teamchart8: null,
      area: [],
      regionData: [],
    };
  },

  // computed: {
  //   ,
  // },
  created() {},

  mounted() {
    // 指挥机构
    this.conductInstitution("440000000000");
    this.watchOver();
    this.dataBankFn();
    this.municipalDuty();

    this.$nextTick(() => {
      this.initChart();
    });
    this.getDistrictEmergency();
    this.getMemberUnit();
  },
  methods: {
    keyThreeChangePages(page) {
      this.defaultParams.page = page.pages;
      this.three.currentPage = page.pages;
      // this.threeParameter();
      this.theTree();
    },
    //  危险区域人群  单选
    checkedDangerClick(record, index) {
      this.tabelListData3[index].checked = !this.tabelListData3[index].checked;
      console.log("点击选中", record);
      JSON.parse(JSON.stringify(this.tabelListData3));
    },

    //  危险区域人群  分页器
    keyHazardousChangePages(page) {
      this.defaultParams.page = page.pages;
      this.hazardous.currentPage = page.pages;
      this.riskZonePopulation();
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
    // 防汛责任人 分页器
    keyFloodChangePages(page) {
      console.log("防汛责任人", page);
      this.defaultParams.page = page.pages;
      this.flood.currentPage = page.pages;
      if (this.flood.active === 0) {
        this.reservoirFlood("CESlAEHl");
      } else {
        this.reservoirFlood("l3gdmA46");
      }
    },
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
    // 地质隐患
    hiddenDangerMobilePhone(item, e, text) {
      let { responsible } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: responsible.split("1")[0],
        phone: responsible.substring(responsible.length - 11),
      });
    },

    hiddenDangerMessage(item, e, text) {
      let { responsible } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: responsible.split("1")[0],
        phone: responsible.substring(responsible.length - 11),
      });
    },

    // 积水内涝
    riskPointsTwoMobilePhone(item, e, text) {
      let { patrolName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: text,
      });
    },
    riskPointsTwoMessage(item, e, text) {
      let { patrolName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: patrolName,
        phone: text,
      });
    },
    riskPointsOneMobilePhone(item, e, text) {
      let { technologyName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: technologyName,
        phone: text,
      });
    },
    riskPointsOneMessage(item, e, text) {
      let { technologyName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: technologyName,
        phone: text,
      });
    },
    riskPointsMobilePhone(item, e, text) {
      let { administrationName } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: text,
      });
    },
    riskPointsMessage(item, e, text) {
      let { administrationName } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: administrationName,
        phone: text,
      });
    },

    // 应急场所
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
    // lzs-龙舟水-平时-应急队伍数量统计年度和更新日期
    getEmergencyTeamDate() {
      indicatorCodes("hk2Pcif7", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急队伍数量统计年度和更新日期", res);
          this.emergencyTeam.date = res.body.data[0].zjgxsj;
          this.emergencyTeam.year = res.body.data[0].year;
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
    // 获取各区应急管理局
    getDistrictEmergency() {
      indicatorCodes("FH2uG6ol", {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      }).then((res) => {
        if (res.success) {
          // console.log("获取各区应急管理局");
          // console.log("获取各区应急管理局", res);
          this.regionData = this.handleTeam(res.body.data, "deptCode");
          console.group("获取各区应急管理局");
          console.log(this.regionData, "---");
          console.groupEnd();
        }
      });
    },

    // 获取成员单位
    getMemberUnit() {
      indicatorCodes("UE4OkCJ4", {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      }).then((res) => {
        if (res.success) {
          // console.log("获取各区应急管理局");
          // console.log("获取各区应急管理局", res);
          this.memberUnitData = this.handleTeam(res.body.data, "deptCode");
          this.memberUnitData.map((i) => {
            i.list.map((item) => {
              item.checked = false;
            });
          });
          console.group("获取成员单位", this.memberUnitData);
          console.log(this.memberUnitData, "---");
          console.groupEnd();
        }
      });
    },

    // 获取应急预案的列表
    getEmergencyTableList() {
      indicatorCodes("INGmWT9L", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("获取应急预案的列表", res);
          this.emergencyPlan.tableList = res.body.data;
          this.emergencyPlan.total = parseInt(res.body.total);
          // this.community.teamList = res.body.data;
          // this.community.total = parseInt(res.body.total);
        }
      });
    },

    emergencyPlanInput() {
      this.emergencyPlan.currentPage = 1;
      this.defaultParams.page = 1;
      // console.log("input", this.materialWarehouse.input);
      this.defaultParams.body.yamc = this.emergencyPlan.input;
      this.getEmergencyTableList();
    },

    clickEmergencyPlanChangePages(pages, pageSize) {
      this.emergencyPlan.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      this.getEmergencyTableList();
    },

    clickDutyFloodPlanChangePages(pages, pageSize) {
      this.emergencyPlan.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      this.getEmergencyTableList();
    },

    clickHiddenDangerPlanChangePages(pages, pageSize) {
      this.hiddenDanger.currentPage = parseInt(pages.pages);
      this.defaultParams.page = pages.pages;
      this.geologyList();
    },

    clickHydraulicPlanChangePages(pages, pageSize) {
      this.hydraulic.currentPage = parseInt(pages.pages);
      this.defaultParams.page = pages.pages;
      // this.geologyList();
      this.ProjectListDatas();
    },

    clickSymbolPlanChangePages(pages, pageSize) {
      this.symbol.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      this.caseFn();
    },

    clickRiskPointsPlanChangePages(pages, pageSize) {
      this.riskPoints.currentPage = parseInt(pages.pages);
      console.log("切换分页", pages);
      this.defaultParams.page = pages.pages;
      this.PondingList();
    },

    // 弹框的关闭应急预案
    emergencyClose() {
      this.emergencyPlan.show = false;
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
    // 关闭弹窗
    resourceClose(num) {
      if (num == 0) {
        this.emergencyTeam.show = false;
        this.emergencyTeam.input = "";
        this.defaultParams.body.keywords = "";
      } else if (num == 2) {
        this.emergencyExpert.show = false;
        this.emergencyExpert.input = "";
        this.defaultParams.body.keywords = "";
      } else if (num == 1) {
        this.emergencySite.show = false;
        this.emergencySite.input = "";
        this.defaultParams.body.keywords = "";
      } else if (num == 3) {
        this.materialWarehouse.show = false;
        this.materialWarehouse.input = "";
        this.defaultParams.body.keywords = "";
      }
    },

    // 应急资源切换
    switchCamera(k) {
      if (k == 0) {
        // pGzznCore.addPromiseTeam();
        this.emergencyTeam.show = true;
        this.getEmergencyTeamData();
        this.getEmergencyTeamDate();
      } else if (k == 2) {
        this.emergencyExpert.show = true;
        this.getEmergencyExpertData();
        // this.showContactModel();
        this.getEmergencyExpertDate();
        // pGzznCore.addPromiseExperts();
      } else if (k == 3) {
        this.emergencySite.show = true;
        this.getEmergencySiteData();
        this.getEmergencySiteDate();
        // pGzznCore.addPromiseShelterNew();
        // }
        // this.materialWarehouse.show = true;
        // this.getMaterialWarehouseData();
      }
      // else if (k == 4) {
      //   this.community.show = true;
      //   this.getTeamListData();
      // }
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

    emergencySiteClick(index) {
      this.emergencySite.emergencySiteIndex = index;
      if (index == 0) {
        this.$nextTick(() => {
          this.getEmergencySiteRegionChart();
        });
      } else {
      }
    },

    // 龙舟水-平时-应急队伍列表
    getEmergencyTeamData() {
      indicatorCodes("1pQeEGzH", this.defaultParams).then((res) => {
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

    // lzs-龙舟水-平时-应急队伍数量统计
    getEmergencyTeamAllChart() {
      indicatorCodes("iFv2ztXJ", this.defaultParams).then((res) => {
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

    // lzs-龙舟水-平时-应急队伍区域数量统计
    getEmergencyTeamRegionChart() {
      indicatorCodes("OnLgUTyv", this.defaultParams).then((res) => {
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
      indicatorCodes("GXCvLC4b", this.defaultParams).then((res) => {
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

    // lzs-龙舟水-平时-应急专家更新年度和更新日期
    getEmergencyExpertDate() {
      indicatorCodes("Olj38Tdx", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急专家更新年度和更新日期", res);
          this.emergencyExpert.date = res.body.data[0].zjgxsj;
          this.emergencyExpert.year = res.body.data[0].year;
        }
      });
    },

    // lzs-龙舟水-平时-应急专家列表
    getEmergencyExpertData() {
      indicatorCodes("iKJAJFEf", this.defaultParams).then((res) => {
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

    // lzs-龙舟水-平时-应急专家图表统计
    getEmergencyExpertAllChart() {
      indicatorCodes("wWBf0M8D", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急专家图表统计", res);
          let obj = {
            xAxisList: this.formatDataList(res.body.data, "zjlxmc"),
            listDatas: this.formatDataList(res.body.data, "number"),
          };
          this.emergencyExpert.allChart = this.$echarts.init(
            document.getElementsByClassName("rightChart")[2]
          );

          this.emergencyExpert.allChart.setOption(
            this.emergencyExpertChartOption(obj)
          );
        }
      });
    },

    // lzs-龙舟水-平时-应急场所统计图表更新日期
    getEmergencySiteDate() {
      indicatorCodes("GaEOqCFi", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急场所统计图表更新日期	", res);
          this.emergencySite.date = res.body.data[0].zjgxsj;
        }
      });
    },

    // // lzs-龙舟水-平时-应急场所统计图表
    getEmergencySiteRegionChart() {
      indicatorCodes("9WLKDSGR", this.defaultParams).then((res) => {
        if (res.success) {
          console.log("lzs-龙舟水-平时-应急场所统计图表", res);
          let obj = {
            xAxisList: this.formatDataList(res.body.data, "areaname"),
            listDatas: this.formatDataList(res.body.data, "number"),
          };
          this.emergencySite.regionChart = this.$echarts.init(
            document.getElementsByClassName("rightChart")[3]
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

    emergencyTeamMobilePhone(item, e) {
      let { name, fzryddh } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone: fzryddh,
      });
    },

    emergencyTeamMessage(item, e) {
      console.log("11111");
      let { name, fzryddh } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone: fzryddh,
      });
    },

    clickMobilePhone(item, e) {
      let { name, phone } = item;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    clickMessage(item, e) {
      let { name, phone } = item;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name,
        phone,
      });
    },
    // 应急专家搜索框
    specialClick() {
      // console.log("", this.specialInput);
      indicatorCodes("iKJAJFEf", {
        body: {
          queries: this.specialInput,
        },
      }).then((res) => {
        if (res.body && res.body.data && res.body.data.length) {
          console.log("应急专家输入框", res);
          this.specialistData = res.body.data;
        }
      });
    },

    // 应急专家的列表
    getSpecialistList(orgCode) {
      this.defaultParams.body = { orgCode };
      indicatorCodes("iKJAJFEf", this.defaultParams).then((res) => {
        console.log("应急专家的列表", res);
        if (res.body && res.body.data && res.body.data.length) {
          this.specialistData = res.body.data;
        }
      });
    },

    // 应急专家的图表
    getSpecialistChart(orgCode) {
      this.defaultParams.body = { orgCode };
      indicatorCodes("wWBf0M8D", this.defaultParams).then((res) => {
        console.log("应急专家的图表", res);
        if (res.body && res.body.data && res.body.data.length) {
          this.teamchart4.setOption({
            dataset: {
              dimensions: ["zjlxmc"],
              source: res.body,
            },
          });
          this.specialistData = res.body.data;
          this.specialistChart = [];
          res.body.data.map((i, index) => {
            this.specialistChart[index].name = i.zjlxmc;
            this.specialistChart[index].value = i.number;
            this.specialistChart.push({
              name: i.zjlxmc,
              value: i.number,
            });
          });

          this.team;
          console.log("应急专家的图表", this.specialistChart);
        }
      });
    },

    specialistClick(index) {
      this.activeIndex3 = index;
      if (index == 0) {
        // this.getSpecialistChart("wWBf0M8D");
      } else {
        this.getSpecialistList("iKJAJFEf");
      }
    },

    // 物资仓库
    getWarehouseList(orgCode) {
      this.defaultParams.body = { orgCode };
      indicatorCodes("Vx5JHdvG", this.defaultParams).then((res) => {
        console.log("物资仓库", res);
        if (res.body && res.body.data && res.body.data.length) {
          this.warehouseData = res.body.data;
        }
      });
    },

    warehouseClick(index) {
      this.activeIndex5 = index;
      if (index == 0) {
      } else {
        this.getWarehouseList("Vx5JHdvG");
      }
    },
    moment,
    onSelectTree(treeNode) {
      if (treeNode.length === 0) return;
      this.commanderInformation(treeNode[0]);
    },
    // 获取全市三防-指挥人员信息
    commanderInformation(orgCode) {
      //cPErOBpT
      this.defaultParams.body = { orgCode };
      indicatorCodes("cPErOBpT", this.defaultParams).then((res) => {
        if (res.success) {
          this.authorityList = [
            {
              id: 0,
              imgUrl: require("../../../assets/images/theCityThreeProofing/wjx.png"),
              postName: "总指挥",
              children: [],
            },
            {
              id: 1,
              imgUrl: require("../../../assets/images/theCityThreeProofing/wjx.png"),
              postName: "副指挥",
              children: [],
            },
            {
              id: 2,
              imgUrl: require("../../../assets/images/theCityThreeProofing/chengyuan.png"),
              postName: "成员",
              children: [],
            },
          ];
          let _this = this;
          let obj = {};
          res.body.data.map((val) => {
            obj[val.postType] = true;
          });
          let data = this.treeDataProcessing(
            obj,
            "postType",
            "postName",
            res.body.data
          );
          data.map((val) => {
            if (obj[val.id])
              val.imgUrl = _this.authorityList[val.id - 1].imgUrl;
          });
          this.authorityList = data;
        }
      });
    },

    //市局值班值守
    municipalDuty() {
      this.defaultParams.body.yjjCode = "SYJGLJ";
      indicatorCodes("d0d4EEqp", this.defaultParams).then((res) => {
        console.log("市局值班值守", res);
        if (res.body && res.body.data && res.body.data.length) {
          this.cityDutyPerson = res.body.data;
          this.cityDutyPerson.map((item) => {
            item.checked = false;
          });
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
    // 加载监控资源树
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        this.defaultParams.body = { pn: treeNode.eventKey };
        indicatorCodes("E72TxYux", this.defaultParams).then((res) => {
          if (res.success) {
            if (res.body.data.length === 0) return;
            res.body.data = JSON.parse(
              JSON.stringify(res.body.data)
                .replace(/sn/g, "key")
                .replace(/name/g, "title")
            );
            treeNode.dataRef.children = [...res.body.data];
            this.treeData = [...this.treeData];
            resolve();
          }
        });
      });
    },
    // 获取全市三防-指挥机构
    conductInstitution(pn) {
      this.defaultParams.body = { pn };
      indicatorCodes("E72TxYux", this.defaultParams).then((res) => {
        if (res.success && res.body.data) {
          this.treeData = [
            { title: res.body.data[0].name, key: res.body.data[0].sn },
          ];
        }
      });
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

    //获取地质灾害列表
    geologyList() {
      this.defaultParams.body.name = this.listKey;
      indicatorCodes("tlVsBH1w", this.defaultParams).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            this.geologyTabelListData = res.body.data;
            this.hiddenDanger.total = parseInt(res.body.total);
            console.group("获取地质灾害列表", res.body.data);
          }
        }
      });
    },

    // 水利工程隐患
    ProjectListDatas() {
      this.defaultParams.body.name = this.listKey;
      indicatorCodes("fLbHj70g", this.defaultParams).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            console.log("水利工程隐患", res.body);
            this.tabelListData = res.body.data;
            this.hydraulic.total = parseInt(res.body.total);
          }
        }
      });
    },
    initChart() {
      //应急队伍
      this.teamchart = this.$echarts.init(
        document.getElementsByClassName("team-chart")[0]
      );
      //应急队伍
      this.teamchart1 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[1]
      );

      //应急装备
      this.teamchart2 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[2]
      );
      //应急装备
      this.teamchart3 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[3]
      );
      //应急专家
      this.teamchart4 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[4]
      );
      //应急专家
      this.teamchart5 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[5]
      );
      //应急场所
      this.teamchart6 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[6]
      );
      //物资仓库
      this.teamchart7 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[7]
      );
      //物资仓库
      this.teamchart8 = this.$echarts.init(
        document.getElementsByClassName("team-chart")[8]
      );
      //////111111111111111111111111111111111111111111111111
      this.emergencyChart = this.$echarts.init(
        document.getElementsByClassName("emergencyChart")[0]
      );
      //三防风险点
      this.pondingDiv = this.$echarts.init(
        document.getElementsByClassName("ponding-chart")[0]
      );
      //三防风险点
      this.geologyDiv = this.$echarts.init(
        document.getElementsByClassName("geology-chart")[0]
      );
      this.pondingDiv.setOption(this.pondingChartOption());
      this.teamchart.setOption(this.TeamChartOption());
      this.teamchart1.setOption(this.pondingChartOption());
      this.teamchart2.setOption(this.TeamChartOption());
      this.teamchart3.setOption(this.teamchart3Option());
      this.teamchart4.setOption(this.TeamChartOption());
      this.teamchart5.setOption(this.teamchart5Option());
      this.teamchart6.setOption(this.TeamChartOption());
      this.teamchart7.setOption(this.TeamChartOption());
      this.teamchart8.setOption(this.TeamChartOption());
      this.emergencyChart.setOption(this.emergencyChartOption());
      this.PodingEchart();

      // this.teamchart.setOption(this.geologyChartOption());
      this.geologyDiv.setOption(this.geologyChartOption());
      let that = this;

      window.onresize = function () {
        that.geologyDiv.resize();
        that.pondingDiv.resize();
        that.teamchart.resize();
        that.teamchart1.resize();
        that.teamchart2.resize();
        that.teamchart3.resize();
        that.teamchart4.resize();
        that.teamchart5.resize();
        that.teamchart6.resize();
        that.teamchart7.resize();
        that.teamchart8.resize();
        that.emergencyChart.resize();
      };
    },
    //nTOpFrxN
    PodingEchart() {
      indicatorCodes("nTOpFrxN", this.defaultParams).then((res) => {
        if (res.success) {
          res.body.data.map((e) => {
            this.area.push(e.areaName);
          });
          this.pondingDiv.setOption({
            dataset: {
              dimensions: ["areaName", "total", "noComplete"],
              source: res.body.data,
            },
          });
          this.teamchart1.setOption({
            dataset: {
              dimensions: ["areaName", "total", "noComplete"],
              source: res.body.data,
            },
          });
          this.teamchart5.setOption({
            dataset: {
              dimensions: ["areaName", "total", "noComplete"],
              source: res.body.data,
            },
          });
        }
      });
    },
    teamchart3Option() {
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: true,
          orient: "vertical",
          left: "left",
          top: "10%",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
        opts: {
          width: "auto",
          height: "auto",
        },
      };

      return option;
    },

    TeamChartOption() {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["专业队伍", "基层队伍", "社会力量", "民兵基干力量"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334],
          },
        ],
      };

      return option;
    },

    teamchart5Option() {
      let option = {
        legend: {
          show: true,
          orient: "horizontal",
          left: "right",
          top: "1%",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "12%",
          top: "16%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: 14,
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          name: "总数(个)",
          nameTextStyle: {
            padding: [0, 0, 15, 20],
            color: "#fff",
          },
          type: "value",
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: 14,
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
            name: "类型1",
            type: "bar",
            color: "rgb(91, 155, 213)",
          },
          {
            name: "类型2",
            type: "bar",
            color: "rgb(237,125,49)",
          },
          {
            name: "类型3",
            type: "bar",
            color: "rgb(165,165,165)",
          },
          {
            name: "类型4",
            type: "bar",
            color: "rgb(255,192,0)",
          },
        ],
      };
      return option;
    },

    // 地质灾害
    geologyChartOption() {
      let that = this;
      let option = {
        legend: {
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
          left: "right",
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "12%",
          top: "16%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(16),
              color: "#fff",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(16),
              color: "#fff",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
            name: "地质灾害隐患点数量",
            type: "bar",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 12,
                  },
                },
              },
            },

            color: "rgb(91,155,213)",
          },
          {
            name: "大型隐患点",
            type: "bar",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 12,
                  },
                },
              },
            },
            color: "rgb(192,0,0)",
          },
        ],
      };
      return option;
    },

    // 积水内涝风险点
    pondingChartOption(obj = null) {
      let that = this;
      let option = {
        tooltip: {
          textStyle: {
            fontSize: that.$setFontSize(16),
          },
        },
        legend: {
          show: true,
          orient: "horizontal",
          left: "right",
          top: "1%",
          itemWidth: that.$setFontSize(12),
          itemHeight: that.$setFontSize(12),
          itemGap: that.$setFontSize(20),
          textStyle: {
            color: "#fff",
            fontSize: that.$setFontSize(16),
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "12%",
          top: "16%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(16),
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          name: "总数(个)",
          nameTextStyle: {
            fontSize: that.$setFontSize(16),
            padding: [0, 0, 15, 20],
            color: "#fff",
          },
          type: "value",
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: that.$setFontSize(16),
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
            name: "内涝黑点",
            type: "bar",
          },
          {
            name: "正施工整治点",
            type: "bar",
            color: "rgb(1,255,255)",
          },
        ],
      };
      return option;
    },

    teamchart1Fn(obj = null) {
      let option = {
        legend: {
          show: true,
          orient: "horizontal",
          left: "right",
          top: "1%",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "12%",
          top: "16%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: 14,
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        yAxis: {
          name: "总数(个)",
          nameTextStyle: {
            padding: [0, 0, 15, 20],
            color: "#fff",
          },
          type: "value",
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          axisLabel: {
            // 控制显示隐藏
            //   show:false,
            textStyle: {
              //   color: '#d7d7d7', //x轴字体颜色
              fontSize: 14,
              color: "rgb(1, 208, 226)",
            },
            interval: 0, //设置成 0 强制显示所有标签
          },
        },
        series: [
          {
            name: "专业队伍",
            type: "bar",
          },
          {
            name: "基层队伍",
            type: "bar",
          },
          {
            name: "社会力量",
            type: "bar",
          },
          {
            name: "民兵基干力量",
            type: "bar",
            color: "rgb(1,255,255)",
          },
        ],
      };
      return option;
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

    doSearch() {
      console.log(1);
      this.Teamtable();
    },
    // tab切换按钮
    riskBtn(item, index) {
      this.tabTitle = item.name;
      this.riskTabIndex = index;
      this.tabBtnIndex = 0;
      this.listKey = "";
      this.defaultParams.body.name = "";
      this.$nextTick(() => {
        this.geologyDiv.resize();
        this.pondingDiv.resize();
      });
      if (this.riskTabIndex == 0 && this.tabBtnIndex == 0) {
      } else if (this.riskTabIndex == 1 && this.tabBtnIndex == 0) {
        this.geologyEchart();
      } else if (this.riskTabIndex == 2) {
        this.ProjectListDatas();
      }
    },
    searchList() {
      if (this.riskTabIndex == 0) {
        this.PondingList();
      } else if (this.riskTabIndex == 1) {
        this.geologyList();
      } else if (this.riskTabIndex == 2) {
        this.ProjectListDatas();
      }
    },
    tabBtnClick(item, index) {
      this.tabBtnIndex = index;
      this.listKey = "";
      if (this.riskTabIndex == 0 && this.tabBtnIndex == 1) {
        this.PondingList();
        this.pondingDiv.resize();
      } else if (this.riskTabIndex == 1 && this.tabBtnIndex == 1) {
        this.geologyList();
      }
    },
    //获取地质灾害echart
    geologyEchart() {
      indicatorCodes("64K46QmB", this.defaultParams).then((res) => {
        if (res.success) {
          this.geologyDiv.setOption({
            dataset: {
              dimensions: ["areaName", "geologicHazard", "largeHidden"],
              source: res.body.data,
            },
          });
        }
      });
    },

    PondingList() {
      this.defaultParams.body.name = this.listKey;
      // 积水内涝风险点
      indicatorCodes("yaEmD59r", this.defaultParams).then((res) => {
        if (res.success) {
          if (res.body.data.length > 0 && res.body.data != null) {
            this.riskPoints.total = parseInt(res.body.total);
            this.riskTabelListData = res.body.data;
          }
        }
      });
    },
    tableTdClick() {},
    SearchSelectedTeam(e, i) {
      this.TeamNum = i;
      console.log(e);
      this.defaultParams.body.type = e.name;
      this.Teamtable();
    },
    //应急资源
    emergencyChange(e, i) {
      let _this = this;

      console.log(e, i);
      if (i == 0) {
        setTimeout(() => {
          _this.$nextTick(() => {
            _this.teamchart.resize();
            _this.teamchart1.resize();
          });
        }, 0);

        _this.team = true;
        //EwbN8mBD
        _this.Teamtable();
      } else if (i == 1) {
        setTimeout(() => {
          _this.$nextTick(() => {
            _this.teamchart2.resize();
            _this.teamchart3.resize();
          });
        }, 0);

        _this.equipmentShow = true;
      } else if (i == 2) {
        _this.getSpecialistChart("wWBf0M8D");
        setTimeout(() => {
          _this.$nextTick(() => {
            _this.teamchart4.resize();
            _this.teamchart5.resize();
          });
        });

        _this.specialistShow = true;
      } else if (i == 3) {
        setTimeout(() => {
          _this.$nextTick(() => {
            _this.teamchart6.resize();
          });
        });

        _this.siteShow = true;
      } else if (i == 4) {
        setTimeout(() => {
          _this.$nextTick(() => {
            _this.teamchart7.resize();
            _this.teamchart8.resize();
          });
        });

        _this.warehouseShow = true;
      }
    },
    Teamtable() {
      indicatorCodes("EwbN8mBD", this.defaultParams).then((res) => {
        if (res.success) {
          this.tableteam = res.body.data;
        }
      });
    },
    reservoirFlood(data) {
      this.defaultParams.body.reservoirName = this.formData.reservoirName;
      indicatorCodes(data, this.defaultParams).then((res) => {
        this.formData = {};
        if (res.success) {
          this.flood.total = parseInt(res.body.total);
          this.tabelListData2 = this.objDataProcessing2(res.body.data);
          this.dutyFloodShow = true;
        }
      });
    },

    // 切换-防汛责任人0水库1堤围
    dutyFloodCkick(index) {
      this.dutyFloodIndex = index;
      this.defaultParams.page = 1;
      this.flood.currentPage = 1;
      this.defaultParams.body = this.formData;
      if (index === 0) {
        this.tableHeaderList2[0] = {
          title: "水库名称",
          index: 1,
          textIndex: "reservoirName",
        };
        this.formData.dikeName = "";
        this.flood.active = 0;
        this.reservoirFlood("CESlAEHl");
      } else {
        this.tableHeaderList2[0] = {
          title: "堤围名称",
          index: 0,
          textIndex: "dikeName",
        };
        this.flood.active = 1;
        this.formData.reservoirName = "";
        this.reservoirFlood("l3gdmA46");
      }
    },
    close(i) {
      console.log(i);
      if (i == "1") {
        this.parameterListShow = false;
      } else if (i == "2") {
        this.hazardousAreaShow = false;
      } else if (i == "3") {
        this.showPop = false;
        this.symbol.currentPage = 1;
        this.defaultParams.page = 1;
      } else if (i == "0") {
        this.dutyFloodShow = false;
      } else if (i == "4") {
        this.dutyFloodShow = false;
      } else if (i == "5") {
        this.team = false;
      } else if (i == "6") {
        this.threeRisk = false;
      } else if (i == "7") {
        this.commandAuthorityShow = false;
      } else if (i == "8") {
        this.equipmentShow = false;
      } else if (i == "9") {
        this.specialistShow = false;
        this.specialInput = "";
      } else if (i == "10") {
        this.siteShow = false;
      } else if (i == "11") {
        this.warehouseShow = false;
      } else if (i == "12") {
        this.emergencyShow = false;
      }
    },

    riskZonePopulation() {
      this.defaultParams.body = this.formData;
      indicatorCodes("9ROu7265", this.defaultParams).then((res) => {
        this.formData = {};
        if (res.success) {
          console.group("危险人群区域", res.body.total);
          this.tabelListData3 = this.objDataProcessing2(res.body.data);
          this.hazardousAreaShow = true;
          this.hazardous.total = parseInt(res.body.total);
        }
      });
    },

    // onSelect(item, key) {
    //   console.log(item, key);
    //   this.cityDutyPerson[key].checked = !this.cityDutyPerson[key].checked;
    // },
    emergencyFn(item, key) {
      this.emergencyPerson[key].checked = !this.emergencyPerson[key].checked;
    },

    regionChecked(item, index) {
      this.regionData.map((i) => {
        // console.log("------",i);
        if (i.deptCode == item.deptCode) {
          console.log("------");
          i.list[index].checked = !i.list[index].checked;
        }
      });
      this.memberUnitData = JSON.parse(JSON.stringify(this.memberUnitData));
    },

    memberChecked(item, index) {
      console.log("=====", this.memberUnitData, item, index);
      this.memberUnitData.map((i) => {
        // console.log("------",i);
        if (i.deptCode == item.deptCode) {
          console.log("------");
          i.list[index].checked = !i.list[index].checked;
        }
      });
      this.memberUnitData = JSON.parse(JSON.stringify(this.memberUnitData));
    },

    cityChecked(index, item) {
      //  JSON.parse(JSON.stringify(this.cityDutyPerson));
      // this.cityDutyPerson.map((i) => {
      //   if (i == item) {
      //     i.checked = !i.checked;
      //   }
      // });
      // console.log(this.cityDutyPerson);
      // JSON.parse(JSON.stringify(this.cityDutyPerson));
      // console.log("1111", index, checked);
      this.cityDutyPerson[index].checked = !this.cityDutyPerson[index].checked;
      this.cityDutyPerson = JSON.parse(JSON.stringify(this.cityDutyPerson));
    },
    //应急值守
    watchOver() {
      indicatorCodes("lvueDz9j", { body: {} }).then((res) => {
        console.log(res);
      });
    },
    onEmpty() {
      this.formData = {};
    },
    parameterClick(item) {
      // console.log("aaaaaa");
      this.parameterActive = item.id;
      this.tableHeaderList4[0].title = `${item.name}名称`;
      this.defaultParams.body.accountType = item.name;
      // this.defaultParams.body.subjectName = "";
      this.formData.subjectName = "";
      this.defaultParams.page = 1;
      this.three.currentPage = 1;
      this.theTree();
    },
    // threeParameter() {
    //   this.defaultParams.body = {
    //     accountType: this.parameterActive,
    //   };
    //   this.defaultParams.body = {
    //     ...this.defaultParams.body,
    //     ...this.formData,
    //   };
    //   indicatorCodes("Z3MD26UZ", this.defaultParams).then((res) => {
    //     this.formData = {};
    //     if (res.success) {
    //       this.tabelListData4 = this.objDataProcessing2(res.body.data);
    //       this.parameterListShow = true;
    //       this.three.total = parseInt(res.body.total);
    //     }
    //   });
    // },
    graphClick() {},
    //资料库

    dataBankFn() {
      indicatorCodes("UUqDgkw4", { body: {} }).then((res) => {
        if (res.success) {
          this.dataBank[0].num = res.body.data[0].classicCase;
          this.dataBank[1].num = res.body.data[0].drp;
          this.dataBank[2].num = res.body.data[0].threeRiskPoints;
        }
      });
    },
    ClickdataBankFn(e, i) {
      this.popnum = i;
      this.popTitle = e.label;
      let params = JSON.parse(JSON.stringify(this.defaultParams));
      console.log(e, i);
      if (i == 1) {
        this.showPop = true;
        params.name = this.searchWord;
        // indicatorCodes("OYqMWSWy", params).then((res) => {
        //   if (res.success) {
        //     this.tableData = res.body.data;
        //   }
        // });
        this.caseFn();
      } else if (i == 2) {
        this.threeRisk = true;
        this.$nextTick(() => {
          this.geologyDiv.resize();
          this.pondingDiv.resize();
        });
      } else if (i == 0) {
        this.emergencyPlan.show = true;
        this.getEmergencyTableList();
        this.$nextTick(() => {
          // this.geologyDiv.resize();
          // this.pondingDiv.resize();
        });
      }
    },
    //典型案例
    caseFn() {
      this.defaultParams.body.albt = this.searchWord;
      indicatorCodes("YVjNQj3y", this.defaultParams).then((res) => {
        if (res.success) {
          this.tableData = res.body.data;
          this.symbol.total = parseInt(res.body.total);
        }
      });
    },
    inputSearch() {
      // let params = JSON.parse(JSON.stringify(this.defaultParams));
      this.caseFn();
      if (this.popnum == 1) {
        // params.albt = this.searchWord;
      }
    },

    // 防汛责任人
    // diskchange() {
    //   let params = JSON.parse(JSON.stringify(this.defaultParams));
    //   params.name = this.searchWord;
    //   indicatorCodes("9ROu7265", params).then((res) => {
    //     if (res.success) {
    //       console.log("防汛责任人", res.body.data);
    //       this.tabelListData3 = this.objDataProcessing2(res.body.data);
    //     }
    //   });
    // },
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
    emergencyTeamLocation(record, flag = 10) {
      pGzznCore.teamPowerLocation(record, flag);
    },
    theTree() {
      this.defaultParams.body = this.formData;
      indicatorCodes("Z3MD26UZ", this.defaultParams).then((res) => {
        if (res.success) {
          // this.formData = {};
          this.tabelListData4 = this.objDataProcessing2(res.body.data);
          this.parameterListShow = true;
          this.three.total = parseInt(res.body.total);
        }
      });
    },
    /**
     * @name: shaojie@
     * @Date: 2021-08-10 18:07:32
     * @description: search
     * @param {*} index
     */
    onSubmit(index) {
      console.log(index);
      if (index === 2) {
        this.dutyFloodCkick(this.dutyFloodIndex);
      } else if (index === 3) {
        this.riskZonePopulation();
      } else if (index === 4) {
        this.theTree();
      }
    },
    dutyFn(e, i) {
      this.popTitle = e.title;
      console.log(e, i);
      if (i == 1) {
        this.riskZonePopulation();
        this.hazardousAreaShow = true;
      } else if (i == 2) {
        this.theTree();
      } else if (i == 0) {
        this.reservoirFlood("CESlAEHl");
      }
    },
    // conductFn(e, i) {
    //   this.popTitle = e.title;
    //   console.log(e, i);
    //   if (i == 0) {
    //     this.commandAuthorityShow = true;
    //   }
    // },

    cityTypeClick() {},
    countyTypeClick() {},
    streetTypeClick() {},
  },
};
</script>

<style lang="less" scoped>
@import "../index.less";
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
    .danger {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

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
          font-size: 28vh * @h;
          text-align: center;
          line-height: 40vh * @h;
          margin-bottom: 5vh * @h;
          font-weight: 700;
        }
        p {
          text-align: center;
          font-weight: 700;
          width: 100%;
          font-size: 20vh * @h;
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
          display: flex;
          justify-content: center;
        }

        li.active {
          background-color: #0066cc;
        }
      }
    }

    .position-border {
      border: 2vh * @h solid #00fffe;
      width: 60vw * @w;
      height: 40vh * @h;
      text-align: center;
      line-height: 40vh * @h;
    }

    .conditions-search {
      display: flex;
      align-items: center;
      // margin: 15vh * @h 0 20vh * @h;
      margin-bottom: 20vh * @h;

      .time {
        font-size: 22vh * @h;
      }

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
        float: right;
      }
    }

    .clist-table-list2 {
      // display: flex;
      max-height: 600vh * @h;
      justify-content: space-between;

      .icon {
        color: #00ccff;
        margin-left: 6vh * @h;
      }

      .checked {
        width: 20vh * @h;
        height: 20vh * @h;
        border: 1px solid #00ccff;
      }

      .wrap-center {
        display: block;
      }

      /deep/.list-body li div {
        flex-direction: column;
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
        float: right;
      }
    }
  }

  .mouse-click {
    cursor: pointer;
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

  // pengyuanzhen
  // .team-list {
  //   display: flex;
  //   height: 40vh * @h;
  //   margin-bottom: 20vh * @h;
  //   margin-left: 20vw * @w;
  //   .tabs {
  //     color: white;
  //     width: 90vw * @w;
  //     text-align: center;
  //     line-height: 40vh * @h;
  //     height: 40vh * @h;
  //     border: 2vh * @h solid #0152a5;
  //     font-size: 20vh * @h;
  //     margin-top: 10vh * @h;
  //     margin-bottom: 10vh * @h;
  //   }

  //   .active {
  //     background: #0152a5;
  //   }
  // }

  // .search-row {
  //   display: flex;
  //   justify-content: space-between;
  //   height: 40vh * @h;
  //   align-items: center;
  //   margin-left: 20vw * @w;
  //   margin-top: 20vh * @h;
  //   margin-bottom: 20vh * @h;

  //   .search-icon {
  //     // padding: 0 0 0 20vw * @w;
  //     // margin: 20vh * @h 0;
  //     .box-sizing();
  //     display: flex;
  //     // input:-webkit-autofill {
  //     //   box-shadow: 0 0 0px 1000px #333333 inset !important;
  //     // }
  //     input {
  //       background-color: #333;
  //       border-color: #003366;
  //       height: 40vh * @h;
  //       width: 320vw * @w;
  //       padding-left: 20vw * @w;
  //       flex: 1;
  //       color: white;
  //     }

  //     .icon-container {
  //       background-color: #6c6c6d;
  //       height: 40vh * @h;
  //       // padding-top: 17vh * @h;
  //       width: 40vw * @w;
  //       display: flex;
  //       justify-content: center;
  //       padding-top: 10vh * @h;

  //       .img {
  //         width: 16vw * @w;
  //         height: 19vh * @h;
  //       }
  //     }
  //   }
  //   .time {
  //     color: white;
  //     font-size: 20vh * @h;
  //   }
  // }

  // .emergency-team-list {
  //   .search-row {
  //     display: flex;
  //     justify-content: space-between;
  //     height: 40vh * @h;
  //     align-items: center;
  //     margin-left: 20vw * @w;
  //     margin-top: 20vh * @h;
  //     margin-bottom: 20vh * @h;

  //     .search-icon {
  //       // padding: 0 0 0 20vw * @w;
  //       // margin: 20vh * @h 0;
  //       .box-sizing();
  //       display: flex;
  //       // input:-webkit-autofill {
  //       //   box-shadow: 0 0 0px 1000px #333333 inset !important;
  //       // }
  //       input {
  //         background-color: #333;
  //         border-color: #003366;
  //         height: 40vh * @h;
  //         width: 320vw * @w;
  //         padding-left: 20vw * @w;
  //         flex: 1;
  //         color: white;
  //       }

  //       .icon-container {
  //         background-color: #6c6c6d;
  //         height: 40vh * @h;
  //         // padding-top: 17vh * @h;
  //         width: 40vw * @w;
  //         display: flex;
  //         justify-content: center;
  //         padding-top: 10vh * @h;

  //         .img {
  //           width: 16vw * @w;
  //           height: 19vh * @h;
  //         }
  //       }
  //     }
  //     .time {
  //       color: white;
  //       font-size: 20vh * @h;
  //     }
  //   }
  //   .table-list {
  //     margin-top: 20vh * @h;
  //     display: flex;
  //     height: 40vh * @h;
  //     align-items: 40vh * @h;
  //     color: white;
  //     font-size: 20vh * @h;
  //     .table-child {
  //       flex: 1;
  //       text-align: center;
  //       border: 2vh * @h solid #0d3858;
  //       background-color: #042851;
  //       .box-sizing();
  //     }
  //     .active {
  //       background-color: #0d3858;
  //       border: 2vh * @h solid #0d3858;
  //     }
  //   }
  // }

  // .emergency-team-table {
  //   // height: 400vh * @h;
  //   .border {
  //     border: 2vh * @h solid #00ccff;
  //     width: 56vw * @w;
  //     height: 28vh * @h;
  //     line-height: 28vh * @h;
  //     text-align: center;
  //   }
  // }

  // .list-change-page {
  //   text-align: right;
  //   margin-top: 20vh * @h;
  //   height: 50vh * @h;
  // }

  // .emergency-team-chart {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;

  //   .sum-chart {
  //     color: white;
  //     display: flex;
  //     height: 300vh * @h;
  //     align-items: center;
  //     width: 100%;
  //     margin-bottom: 20vh * @h;

  //     .left {
  //       width: 40%;
  //       margin-right: 2%;
  //     }
  //     .title {
  //       font-size: 28vh * @h;
  //     }

  //     .time {
  //       font-size: 20vh * @h;
  //     }

  //     .rightChart {
  //       width: 435vw * @w;
  //       height: 300vh * @h;
  //     }
  //   }

  //   .region-chart {
  //     color: white;
  //     display: flex;
  //     height: 300vh * @h;
  //     align-items: center;
  //     width: 100%;

  //     .left {
  //       width: 40%;
  //       margin-right: 2%;
  //     }
  //     .title {
  //       font-size: 28vh * @h;
  //     }

  //     .time {
  //       font-size: 20vh * @h;
  //     }

  //     .rightChart {
  //       width: 435vw * @w;
  //       height: 300vh * @h;
  //     }
  //   }
  // }

  // pengyuanzhen
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
.search {
  display: flex;
  justify-content: space-between;
  height: 50vh * @h;
  align-items: center;
  margin-bottom: 20vh * @h;
  .time {
    font-size: 22vh * @h;
  }
}

/deep/ .list-body {
  max-height: 86% !important;
}
.search-icon {
  // padding: 0 0 0 20vw * @w;
  // margin: 20vh * @h 0;
  .box-sizing();
  display: flex;
  // input:-webkit-autofill {
  //   box-shadow: 0 0 0px 1000px #333333 inset !important;
  // }
  input {
    background-color: #333;
    border-color: #003366;
    height: 50vh * @h;
    width: 300vw * @w;
    padding-left: 20vw * @w;
    flex: 1;
    color: white;
  }

  .icon-container {
    background-color: #6c6c6d;
    height: 50vh * @h;
    // padding-top: 17vh * @h;
    width: 40vw * @w;
    display: flex;
    justify-content: center;
    padding-top: 15vh * @h;

    .img {
      width: 16vw * @w;
      height: 19vh * @h;
    }
  }
}
.listTitle {
  display: flex;
  background: #0d3858;
  justify-content: space-between;
  align-items: center;

  span {
    height: 40vh * @h;
    width: 20%;
    line-height: 40vh * @h;
    text-align: center;
    cursor: pointer;
    background: #042851;
  }
  .active {
    background: #0d3858;
  }
}
.commom_left {
  text-align: left;
}
.title_box {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10vw * @w;
  .title_active {
    background: #0066cc;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6vh * @h 10vw * @w;
    display: inline-block;
    border: 1vh * @h solid rgb(1, 255, 255);
    cursor: pointer;
    margin-right: 10vw * @w;
    font-size: 14vh * @h;
    text-align: center;
  }

  li.active {
    background-color: #0066cc;
  }
}
</style>
