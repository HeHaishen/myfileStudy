<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-09 11:28:13
 * @LastEditTime: 2021-07-14 17:01:11
-->
<template>
  <div class="city-hidden-danger-left">
    <div class="shine-model-title">企业信息隐患统计</div>
    <!-- 企业总数 -->
    <div class="left-top">
      <ul>
        <li v-for="(item,index) in firmArr" :key='index' @click='industryInfor(item,index)' :class='[index==0?"cursor-five":""]'>
          <div class="top-title"><span></span>{{item.name}}</div>
          <div class="top-desc">{{item.value}}</div>
        </li>
      </ul>
    </div>
    <!-- 企业总数结束 -->

    <!-- 企业隐患分类统计开始 -->
    <div class="left-center">
      <div class="left-box-title">
        企业隐患分类统计
      </div>
      <div class="center-content" v-if='dangerClassify!=null'>
        <div class="center-content-left">
          <p>隐患总数</p>
          <p>{{dangerClassify.allCount}} <i>条</i></p>
        </div>
        <div class="center-content-center  cursor-five" @click='ordinary'>
          <p>一般隐患<span>{{dangerClassify.commonCount}}</span><i>条</i></p>
          <p>
            <span>逾期未整改<span class="number">{{dangerClassify.commonNoAlter}}</span><i>条</i></span>
            <span>整改中: <span class="number">{{dangerClassify.commonAltering}}</span></span>
          </p>
          <p>
            <span>已整改:<span class="number">{{dangerClassify.commonAltered}}</span><i>条</i></span>
            <span>整改率<span class="number">{{dangerClassify.commonAlterRate}}</span></span>
          </p>
        </div>
        <div class="center-content-center-right cursor-five" @click='great'>
          <p>重大隐患<span>{{dangerClassify.greatCount}}</span><i>条</i></p>
          <p>
            <span>逾期未整改<span class="number">{{dangerClassify.greatNoAlter}}</span><i>条</i></span>
            <span>整改中: <span class="number">{{dangerClassify.greatAltering}}</span></span>
          </p>
          <p>
            <span>已整改:<span class="number">{{dangerClassify.greatAltered}}</span><i>条</i></span>
            <span>整改率<span class="number">{{dangerClassify.greatAlterRate}}</span></span>
          </p>
        </div>
      </div>

    </div>
    <!-- 企业隐患分类统计结束 -->

    <!-- 企业隐患上报排名开始 -->
    <div class="left-right">
      <div class="left-right-title">
        <div class="left-box-title">
          企业隐患上报排名
        </div>
        <div class="class-btn">
          <a v-for='(item,index) in classLevel' :key='index' @click='classBtn(item,index)' :class="[classIndex == index ? 'btn-active-type' : '']">{{item}}</a>
        </div>
      </div>
      <div class=" class-content">
        <div style="width:100%" v-if="classIndex==0">
          <a-carousel :slidesToShow="8" :slidesToScroll="1" :autoplay="true" :autoplaySpeed="5000" :draggable="true" :dots="false" ref="circle">
            <div class="circle" v-for='(item,index) in areaArr' :key='index'>
              <div class="circle-top">
                {{item.count}}
              </div>
              <div class="circle-text">
                {{item.areaName}}
              </div>
            </div>
          </a-carousel>
          <p class="left-btn" @click="handlePrev"></p>
          <p class="right-btn" @click="handleNext"></p>
        </div>
        <div class="circle" v-for='(item,index) in eightArr' :key='index' v-show='classIndex==1'>
          <div class="circle-top">
            {{item.count}}
          </div>
          <div class="circle-text">
            {{item.industryName}}
          </div>
        </div>

      </div>
    </div>
    <!-- 企业隐患上报排名结束 -->
    <pop-up-layer v-if='tableShow' :show="tableShow" :setStyles="{'left':'13%','top':'50%'}" ref="myPopUpLayer" class="leftTable" :title="popTitle" @doClose="close">
      <template slot="content">
        <div class="industry-content">
          <div class="talbe-search">
            <div class="industry-type">
              <span>行业分类：</span>
              <select v-model="industryType" @change='industryTypeClick'>
                <option :value=i.name v-for="i in industryList" :key=i.key>{{i.name}}</option>
              </select>
            </div>
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model="query.enterpriseName" />
              <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" @click='enterprisSearch' />
            </div>
          </div>
          <div class="table">
            <clist :columns="tableHeaderList" :listData="tabelListData" @tableTdClick="tableTdClick">
              <template slot="number" slot-scope='{record,text,index}'>
                {{index+1}}
              </template>
            </clist>
          </div>
          <div class="list-change-page">
            <ChangePage :total="enterprisePagination.total" :currentPage="enterprisePagination.currentPage" @changePages="enterpriseChange" />
          </div>
        </div>

      </template>
    </pop-up-layer>
    <!-- 企业隐患上报排名结束 -->
    <pop-up-layer v-if='ordinaryShow' :show="ordinaryShow" :setStyles="{'left':'13%','top':'50%'}" ref="myPopUpLayer" class="leftTable" :title="'一般隐患'" @doClose="ordinaryClose">
      <template slot="content">
        <div class="ordinary-content">
          <div class="talbe-search">
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model="query.ordinaryName" />
              <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" @click='ordinarySearch' />
            </div>
          </div>
          <div class="table">
            <clist :columns="ordinaryHeaderList" :listData="ordinaryListData" @tableTdClick="tableTdClick">
              <template slot="number" slot-scope='{record,text,index}'>
                {{index+1}}
              </template>
            </clist>
          </div>
          <div class="list-change-page">
            <ChangePage :total="ordinaryPagination.total" :currentPage="ordinaryPagination.currentPage" @changePages="ordinaryChange" />
          </div>

        </div>

      </template>great
    </pop-up-layer>
    <pop-up-layer v-if='greatShow' :show="greatShow" :setStyles="{'left':'13%','top':'50%'}" ref="myPopUpLayer" class="leftTable" :title="'重大隐患'" @doClose="greatShowClose">
      <template slot="content">
        <div class="ordinary-content">
          <div class="talbe-search">
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model='query.greatName' />
              <img src="../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="greatSearch" />
            </div>
          </div>
          <div class="table">
            <clist :columns="greatHeaderList" :listData="greatListData" @tableTdClick="tableTdClick">
              <template slot="number" slot-scope='{record,text,index}'>
                {{index+1}}
              </template>
            </clist>
          </div>
          <div class="list-change-page">
            <ChangePage :total="greatPagination.total" :currentPage="greatPagination.currentPage" @changePages="greatChange" />
          </div>

        </div>

      </template>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from '@/components/APicture/c-table'
import moment from "moment";
import listData from '../utils/Datas'
import ChangePage from "@/components/APicture/changePage";

import { getRegisterData, getclassifyData, getLevelEight, getLevelArea, getEnterpriseInforList, commonApi } from '../../../api/cityHiddenDanger/index.js'
export default {
  components: {
    Clist, ChangePage
  },
  data() {
    return {
      //按区排名
      listData,
      // 按八大行业排名
      // 注册信息
      firmArr: [
        {
          firmText: '注册总数',
          firmNumber: '120',
        },
        {
          firmText: '新注册数',
          firmNumber: '90'
        },
        {
          firmText: '上报隐患家',
          firmNumber: '850'
        },
        {
          firmText: '未上报隐患家',
          firmNumber: '50'
        },
      ],
      // 排名数据
      areaArr: [],
      //排名按钮
      classLevel: ['按区排名', '按八大行业排名'],
      classIndex: '0',
      popBtnArr: [{ name: '图表', key: 1 }, { name: '列表', key: 2 }],
      popBtnIndex: '0',
      popChartDiv: null,
      tableShow: false,
      // 一般隐患弹窗
      ordinaryShow: false,
      greatShow: false,
      tableHeaderList: [
        { title: '序号', index: 0, textIndex: 'number', width: '10%' },
        { title: '企业名称', index: 1, textIndex: 'companyName', width: '20%' },
        { title: '所属辖区', index: 2, textIndex: 'popedom', width: '15%' },
        { title: '地址', index: 3, textIndex: 'address', width: '25%' },
        { title: '行业类别', index: 4, textIndex: 'industryClasses', width: '15%' },
        { title: '八大行业', index: 5, textIndex: 'industryType', width: '15%' },
      ],
      tabelListData: [
      ],
      ordinaryHeaderList: [
        { title: '序号', index: 0, textIndex: 'number', width: '10%' },
        { title: '上报单位', index: 1, textIndex: 'companyName', width: '20%' },
        { title: '隐患类别', index: 2, textIndex: 'hiddenClassify', width: '15%' },
        { title: '行业类别', index: 3, textIndex: 'industryClassify', width: '25%' },
        { title: '隐患级别', index: 4, textIndex: 'hiddenLevel', width: '15%' },
        { title: '隐患方式', index: 5, textIndex: 'discoverType', width: '15%' },
        { title: '隐患发生区域', index: 6, textIndex: 'hiddenArea', width: '15%' },
        { title: '企业所属区域', index: 7, textIndex: 'companyArea', width: '15%' },
        { title: '上报日期', index: 7, textIndex: 'reportTime', width: '15%' },
        { title: '整改状态', index: 8, textIndex: 'rectifyStatus', width: '15%' },
      ],
      ordinaryListData: [
      ],
      greatHeaderList: [
        { title: '序号', index: 0, textIndex: 'number', width: '10%' },
        { title: '上报单位', index: 1, textIndex: 'companyName', width: '20%' },
        { title: '隐患类别', index: 2, textIndex: 'hiddenClassify', width: '15%' },
        { title: '行业类别', index: 3, textIndex: 'industryClassify', width: '25%' },
        { title: '隐患级别', index: 4, textIndex: 'hiddenLevel', width: '15%' },
        { title: '隐患方式', index: 5, textIndex: 'discoverType', width: '15%' },
        { title: '隐患发生区域', index: 6, textIndex: 'hiddenArea', width: '15%' },
        { title: '企业所属区域', index: 7, textIndex: 'companyArea', width: '15%' },
        { title: '上报日期', index: 7, textIndex: 'reportTime', width: '15%' },
        { title: '整改状态', index: 8, textIndex: 'rectifyStatus', width: '15%' },
      ],
      greatListData: [
      ],


      industry: [{ name: '冶金', key: 1 }, { name: '有色', key: 2 }, { name: '建材', key: 3 }, { name: '机械', key: 4 }, { name: '轻工', key: 5 }, { name: '纺织', key: 6 }, { name: '烟草', key: 7 }, { name: '商贸', key: 8 },],
      leftDatas: null,
      // 企业隐患分类
      dangerClassify: null,
      //企业排名-八大行业
      eightArr: [],
      // 弹窗标题
      popTitle: '',
      // 企业下拉框信息
      industryList: [
        { name: '全部', key: 0 },
        { name: '冶金', key: 1 },
        { name: '有色', key: 2 },
        { name: '建材', key: 3 },
        { name: '机械', key: 4 },
        { name: '轻工', key: 5 },
        { name: '纺织', key: 6 },
        { name: '烟草', key: 7 },
        { name: '商贸', key: 8 },
      ],
      //获取的行业
      industryType: '全部',
      query: {
        enterpriseName: undefined,
        ordinaryName: undefined,
        greatName: undefined
      },
      // 分页
      //注册分页
      enterprisePagination: {
        total: undefined,
        currentPage: 1
      },
      //注册分页
      ordinaryPagination: {
        total: undefined,
        currentPage: 1
      },
      //注册分页
      greatPagination: {
        total: undefined,
        currentPage: 1
      },
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getRegister()
      this.getClassify()
      this.levelArea()

      this.$nextTick(() => {
        this.initChart()
      })
    },

    // 获取注册数据
    getRegister() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getRegisterData(data).then(res => {
        if (res.success) {
          let arr = res.body.data
          arr[0].name = '注册总数'
          arr[1].name = '新注册数'
          arr[2].name = '上报隐患企业家'
          arr[3].name = '未上报隐患企业家'
          this.firmArr = JSON.parse(JSON.stringify(arr))
          console.log(this.firmArr);

        }
      })
    },

    // 获取企业隐患分类
    getClassify() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getclassifyData(data).then(res => {
        if (res.success) {
          this.dangerClassify = JSON.parse(JSON.stringify(res.body.data[0]))
          console.log(this.dangerClassify);

        }
      })
    },

    //获取企业排名-八大行业
    levelEight() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getLevelEight(data).then(res => {
        if (res.success) {
          this.eightArr = JSON.parse(JSON.stringify(res.body.data))
        }
      })
    },

    //获取企业排名-按区
    levelArea() {
      let data = {
        body: {},
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getLevelArea(data).then(res => {
        if (res.success) {
          this.areaArr = JSON.parse(JSON.stringify(res.body.data))
        }
      })
    },

    //echart 数据处理
    formatDataList(arr, values = 'name', otherpush = 0) {
      let returnList = arr.map((item, key) => {
        return item[values]
      })
      return returnList
    },
    // echart初始化
    initChart() {
      // this.popChartDiv = this.$echarts.init(document.getElementsByClassName('pop-chart')[0])
      // this.popChartDiv.setOption(this.popChartOption())

      // window.onresize = function () {
      //   this.popChartDiv.resize();
      // }
    },
    // 弹窗图表
    popChartOption(obj = null) {
      let option = {
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: '5%'
        },

        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
            dataZoom: { show: true }
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '65%',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },

        ]
      }
      return option
    },

    // 排名按钮
    classBtn(item, index) {
      this.classIndex = index
      if (index = 0) {
        this.levelArea()
      } else if (index = 1) {
        this.levelEight()
      }
    },
    //按区排名 左按钮
    handlePrev() {
      this.$refs.circle.prev();
    },
    //按区排名 右按钮
    handleNext() {
      this.$refs.circle.next();
    },

    //获取注册企业列表弹窗
    enterpriseInforList() {
      let data = {
        body: {
          industryType: this.industryType == '全部' ? '' : this.industryType,
          companyName: this.query.enterpriseName
        },
        page: this.enterprisePagination.currentPage,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getEnterpriseInforList(data).then(res => {
        if (res.success) {
          this.tabelListData = res.body.data
          this.enterprisePagination.total = +res.total
        }
      })
    },

    //企业隐患信息弹窗
    industryInfor(item, index) {
      if (index != 0) return
      this.tableShow = true
      //获取注册企业列表 - 弹窗
      this.enterpriseInforList()
      this.popTitle = '企业注册总数八大行业统计'
    },

    industryTypeClick() {
      this.enterpriseInforList()
    },


    //获取一般隐患列表/重大隐患列表
    getOrdinaryList(item) {
      let code = 'VVtxoHLx'
      let data = {
        body: {
          hiddenLevel: item,
          companyName: item == '一般隐患' ? this.query.ordinaryName : this.query.greatName,
        },
        page: item == '一般隐患' ? this.ordinaryPagination.currentPage : this.greatPagination.currentPage,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      commonApi(code, data).then(res => {
        if (res.success) {
          if (item == '一般隐患') {
            this.ordinaryListData = res.body.data
            this.ordinaryPagination.total = +res.total
          } else if (item == '重大隐患') {
            this.greatListData = res.body.data
            this.greatPagination.total = +res.total
          }
        }
      })
    },

    // 一般隐患
    ordinary() {
      this.ordinaryShow = true
      this.getOrdinaryList('一般隐患')
    },
    ordinaryClose() {
      this.ordinaryShow = false
      this.query.ordinaryName = undefined
      this.ordinaryPagination.currentPage = 1
    },

    // 重大隐患
    great() {
      this.greatShow = true
      this.getOrdinaryList('重大隐患')
    },
    greatShowClose() {
      this.greatShow = false
      this.query.greatName = undefined
      this.greatPagination.currentPage = 1
    },

    close() {
      this.tableShow = false
      this.query.enterpriseName = undefined
      this.enterprisePagination.currentPage = 1
      this.industryType = '全部'
    },

    tableTdClick() {
    },

    // 弹窗组件内按钮
    popBtn(item, index) {
      this.popBtnIndex = index
      if (index = 0) {
        this.popChartDiv.resize();
      }

    },

    //注册行业搜索
    enterprisSearch() {
      this.enterprisePagination.currentPage = 1
      this.enterpriseInforList()
    },
    enterpriseChange(pages, pageSize) {
      this.enterprisePagination.currentPage = +pages.pages
      this.enterpriseInforList()
    },
    // 一般隐患搜索
    ordinarySearch() {
      this.ordinaryPagination.currentPage = 1
      this.getOrdinaryList('一般隐患')
    },
    ordinaryChange(pages, pageSize) {
      this.ordinaryPagination.currentPage = +pages.pages
      this.getOrdinaryList('一般隐患')
    },
    // 重大隐患搜索
    greatSearch() {
      this.greatPagination.currentPage = 1
      this.getOrdinaryList('重大隐患')
    },
    greatChange(pages, pageSize) {
      this.greatPagination.currentPage = +pages.pages
      this.getOrdinaryList('重大隐患')
    },
  }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>