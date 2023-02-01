<template>
  <div class="enterprise-risk">
    <ModelBox :title="'企业隐患'" class="enterprise-risk-box">
      <!-- <div slot="content" class="enterprise-risk-echart">

      </div> -->
      <div slot="content" class="enterprise-risk-content">
        <div class="orinary-hidden" @click="ordinaryDetail">
          <img src="../../../../assets/images/majorFestivalsConductor/ordinary-hiddent-icon.png" alt="">
          <span>一般隐患</span>
          <p>{{orinaryNum}}</p>
          <div class="selected" v-if='ordinaryActive'>
            <img src="~@/assets/images/majorFestivalsConductor/selected.png" alt="" srcset="" />
          </div>
        </div>
        <div class="great-hidden" @click='greatDetail'>
          <img src="../../../../assets/images/majorFestivalsConductor/great-hiddent-icon.png" alt="">
          <span>重大隐患</span>
          <p>{{greatNum}}</p>
          <div class="selected" v-if="greatActive">
            <img src="~@/assets/images/majorFestivalsConductor/selected.png" alt="" srcset="" />
          </div>
        </div>
      </div>

    </ModelBox>
    <pop-up-layer v-if='orinaryBol' :show="orinaryBol" :setStyles="{ }" opsition="pageRight" ref="myPopUpLayer" class="ordinary-table" :title="'一般隐患'" @doClose="ordinaryClose">
      <template slot="content">
        <div class="table-content">
          <div class="talbe-search">
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model="query.ordinaryName" />
              <img src="../../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="orinarySearch" />
            </div>
          </div>
          <clist :columns="tableHeaderList" :listData="tabelListData" class="list">
            <template v-for="item in tableHeaderList" :slot="item.textIndex" slot-scope="{ text }">
              <span :title="text" :key="item.textIndex">
                {{ text }}
              </span>
            </template>
            <template slot="number" slot-scope="{ record, text, index }">
              {{ index + 1 }}
            </template>
            <template slot="zrrdh" slot-scope="{ text, record }">
              <div :title="text" class="phone">
                {{ text }}
                <a-icon type="phone" class="icon" @click="clickMobilePhone(record, $event)" v-show="text" />
                <a-icon type="mail" class="icon" @click="clickMessage(record, $event)" v-show="text" />

              </div>
            </template>
            <template slot='position' slot-scope="{ record }">
              <div class="dw" @click="onGPS(record,'1')">
                <svg t="1633855607571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="100%" height="100%">
                  <path d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z" p-id="2762" fill="#1383FE"></path>
                </svg>
              </div>
            </template>
          </clist>
          <div class="list-change-page">
            <ChangePage :total="pagination.orinaryTotal" :currentPage="pagination.orinaryCurrent" @changePages="ordinaryChange" />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <pop-up-layer v-if='greatBol' :show="greatBol" :setStyles="{ }" opsition="pageRight" ref="myPopUpLayer" class="ordinary-table" :title="'重大隐患'" @doClose="greatClose">
      <template slot="content">
        <div class="table-content">
          <div class="talbe-search">
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model="query.greatName" />
              <img src="../../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="greatSearch" />
            </div>
          </div>
          <clist :columns="tableHeaderList" :listData="tabelListData1" class="list">
            <template v-for="item in tableHeaderList" :slot="item.textIndex" slot-scope="{ text }">
              <span :title="text" :key="item.textIndex">
                {{ text }}
              </span>
            </template>
            <template slot="number" slot-scope="{ record, text, index }">
              {{ index + 1 }}
            </template>
            <template slot="zrrdh" slot-scope="{ text, record }">
              <div :title="text" class="phone">
                {{ text }}
                <a-icon type="phone" class="icon" @click="clickMobilePhone(record, $event)" v-show="text" />
                <a-icon type="mail" class="icon" @click="clickMessage(record, $event)" v-show="text" />
              </div>
            </template>
            <template slot='position' slot-scope="{ record }">
              <div class="dw" @click="onGPS(record,'2')">
                <svg t="1633855607571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="100%" height="100%">
                  <path d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z" p-id="2762" fill="#1383FE"></path>
                </svg>
              </div>
            </template>
          </clist>
          <div class="list-change-page">
            <ChangePage :total="pagination.greatTotal" :currentPage="pagination.greatCurrent" @changePages="greatChange" />
          </div>
        </div>
      </template>
    </pop-up-layer>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />

  </div>
</template>

<script>
import ModelBox from '../modelBox/index'
import { getIdsmApi } from "@/api/idsm/index";
import ChangePage from "@/components/APicture/changePage";
import Clist from "@/components/APicture/c-table";
import mixin from "./mixin";

export default {
  components: {
    Clist,
    ModelBox,
    ChangePage,
  },
  mixins: [mixin],

  data() {
    return {
      //危化品Echart
      enterpriseRriskDiv: null,
      orinaryNum: 0,
      greatNum: 0,
      // 分页
      pagination: {
        orinaryCurrent: 1,
        orinaryTotal: 0,
        greatCurrent: 1,
        greatTotal: undefined,
      },
      orinaryBol: false,
      greatBol: false,
      query: {
        ordinaryName: '',
        greatName: ''
      },
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "number", width: "10%" },
        { title: "填报人", index: 1, textIndex: "tbr", width: "20%" },
        { title: "隐患描述", index: 2, textIndex: "yhms", width: "20%" },
        { title: "整改责任人", index: 3, textIndex: "zrr", width: "15%" },
        {
          title: "整改责任人电话",
          index: 4,
          textIndex: "zrrdh",
          width: "20%",
        },
        {
          title: "定位",
          index: 5,
          textIndex: "position",
          width: "15%",
        },
      ],
      tabelListData: [],
      tabelListData1: [],
      ordinaryActive: false,
      greatActive: false
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    //   初始化
    init() {
      // this.getEchartData()
      // this.$nextTick(() => {
      //   this.initEchart();
      // });
      this.getOrdinary(true)
      this.getGreat(true)
    },
    initEchart() {
      this.enterpriseRriskDiv = this.$echarts.init(document.getElementsByClassName('enterprise-risk-echart')[0])
      window.onresize = () => {
        this.enterpriseRriskDiv.resize();
      };
    },
    //echart 图表配置
    enterpriseRrisEchartOption(data = null) {
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false,
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '企业隐患',
            type: 'pie',
            radius: ['35%', '65%'],
            label: {
              show: true,
              textStyle: {
                fontSize: this.$setFontSize(26),
                color: "#fff",
              },
              formatter: `{d}%`,
            },
            labelLine: {
              show: true,//数据标签引导线
              length: 4,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            color: ['rgb(0,250,251)', 'rgb(255,132,50)', 'rgb(0,238,156)', 'rgb(40,146,255)', 'rgb(254,75,75)'],

            data: data,
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: 'rgba(8,30,57)'
              }
            }
          }
        ]
      };
      return option
    },
    //echart数据
    getEchartData() {
      let code = 'zZnhl6ZH'
      let data = {
        body: {},
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then(res => {
        if (res.success) {
          let dataEchart = res.body.data.map(e => {
            return { value: e.count, name: e.industryTwoName }
          })
          this.enterpriseRriskDiv.setOption(this.enterpriseRrisEchartOption(dataEchart));
        }
      })
    },
    //获取一般隐患
    getOrdinary(isFlag,pageSize) {
      let code = 'w1lo1leA'
      let data = {
        body: {
          YHFJ: 1,
          tbr: this.query.ordinaryName
        },
        page: this.pagination.orinaryCurrent,
        pageSize: pageSize ? pageSize : 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then(res => {
        if (res.success) {
          this.orinaryNum = +res.total
          this.pagination.orinaryTotal = +res.total
          this.tabelListData = res.body.data
          if (!isFlag && pageSize) {
            this.setLayerToMap(res.body.data, "defaultTypeqyyh1", "1",this.orinaryBol,true);
          }

        }
      })
    },
    // 获取重大隐患
    getGreat(isFlag,pageSize) {
      let code = 'w1lo1leA'
      let data = {
        body: {
          YHFJ: 2,
          tbr: this.query.greatName

        },
        page: this.pagination.greatCurrent,
        pageSize: pageSize ? pageSize : 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then(res => {
        if (res.success) {
          this.greatNum = res.total
          this.pagination.greatTotal = +res.total
          this.tabelListData1 = res.body.data
          if (!isFlag && pageSize) {
            this.setLayerToMap(res.body.data, "defaultTypeqyyh2", "2",this.greatBol,true);
          }
        }
      })
    },
    // 一般隐患弹窗分页事件
    ordinaryChange(pages, pageSize) {
      this.pagination.orinaryCurrent = +pages.pages;
      this.getOrdinary();
    },
    //一般隐患弹窗
    ordinaryDetail() {
      if (+this.orinaryNum) {
        //打钩状态
        this.ordinaryActive = !this.ordinaryActive
        // 当为打钩状态时 弹窗出现 请求列表
        if (this.ordinaryActive) {
          this.orinaryBol = true
          this.getOrdinary();
          this.getOrdinary(false,-1);
        } else {
          this.orinaryBol = false;
          pGzznCore.pointLayerRemove({ type: "defaultTypeqyyh1",isFlag:true});
        }
      }

    },
    //关闭一般隐患弹窗
    ordinaryClose() {
      this.pagination.orinaryCurrent = 1
      this.query.ordinaryName = ''
      this.orinaryBol = false
      this.tabelListData = []
    },
    //一般隐患搜索
    orinarySearch() {
      this.pagination.orinaryCurrent = 1
      this.getOrdinary()

    },
    // 重大弹窗分页事件
    greatChange(pages, pageSize) {
      this.pagination.greatCurrent = +pages.pages;
      this.getGreat();
    },
    //重大隐患弹窗
    greatDetail() {
      if (parseInt(this.greatNum)) {
        this.greatActive = !this.greatActive
        // 当为打钩状态时 弹窗出现 请求列表
        if (this.greatActive) {
          this.greatBol = true
          this.getGreat();
          this.getGreat(false,-1);
        } else {
          this.greatBol = false;
          pGzznCore.pointLayerRemove({ type: "defaultTypeqyyh2",isFlag:true});
        }
      }
    },
    //关闭重大隐患弹窗
    greatClose() {
      this.pagination.greatCurrent = 1
      this.query.greatName = ''
      this.greatBol = false
      this.tabelListData1 = []
    },
    //重大隐患搜索
    greatSearch() {
      this.pagination.greatCurrent = 1
      this.getGreat()
    },
    setLayerToMap(list, typeStr, imgNum,isFlag=false) {
      let items = pGzznCore.deepClone(list);
      let columns = this.tableHeaderList.filter((e) => e.textIndex != "position" && e.textIndex != "number");
      if(isFlag){
        pGzznCore.pointLayerRemove({ type: typeStr,isFlag:isFlag});
      }     
      if(!this.ordinaryActive){
         return;
      }
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/qyyh" + imgNum + ".png",       
        imgSize: { width: 32, height: 32 },
        type: typeStr,
        layerName: "企业隐患",
        info: columns,
        phoneInfo: { phone: "zrrdh", name: "zrr" },
        isFlagPopule:true
      };
      if(parseInt(imgNum) == 1){
          objs.imgUrlObj = {keys:"riskLevel",start:'gzznGIS/Image/gjh/qyyh'+imgNum,end:'.png'};
      }
      if(isFlag){
        pGzznCore.setPointLayerToMap(items, objs);
      }else{
        objs.data = items;
        pGzznCore.flyToPoint({x:items[0].lon,y:items[0].lat,z:13673},objs)
      }
      
    },
    
    //定位
    onGPS(item, types) {
      this.setLayerToMap([item], "defaultTypeqyyh"+types, types);
    },
  },
}
</script>

<style lang='less' scoped>
@import './mixin.less';

@import '../../common.less';
.enterprise-risk {
  .enterprise-risk-box {
    left: 3364vw * @w;
    top: 1721vh * @h;
  }
  .c-model-box {
    width: 438vw * @w;
    /deep/.model-header {
      width: 400vw * @w;
      margin: 0 auto;
    }
  }

  .enterprise-risk-echart,
  .enterprise-risk-content {
    width: 438vw * @w;
    height: 347vh * @h;
  }
  .enterprise-risk-content {
    display: flex;
    justify-content: space-around;
    width: 428vw * @w;
    align-items: center;
    div {
      width: 45%;
      height: 80%;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      padding-top: 60vh * @h;
      align-items: center;
      cursor: pointer;
      box-sizing: border-box;
      span {
        color: #ffffff;
        font-size: 20vh * @h;
        padding: 10vh * @h 0;
      }
      img {
        width: 120vw * @w;
        height: 120vh * @h;
      }
    }
    div:first-child {
      background-image: url('../../../../assets/images/majorFestivalsConductor/Fourbg1.png');
      color: rgb(40, 146, 255);
      font-size: 32vh * @h;
      font-weight: bolder;
    }
    .great-hidden {
      background-image: url('../../../../assets/images/majorFestivalsConductor/Fourbg3.png');
      font-size: 32vh * @h;
      color: rgb(0, 253, 162);
      font-weight: bolder;
    }
  }
  .ordinary-table {
    width: 1200vw * @w;
  }
  .table-content {
    width: 100%;
    height: 100%;
  }
  // 搜索
  .center-search {
    height: 60vh * @h;
    margin-bottom: 10vh * @h;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
    .c-input {
      width: 300vw * @w;
      height: 100%;
      border: 1px rgb(1, 210, 233) solid;
      background-color: rgb(20, 38, 78);

      font-size: 14vh * @h;
      display: flex;
      align-items: center;
      padding-left: 10vw * @w;
      .box-sizing();
    }

    img {
      display: block;
      width: 23vh * @h;
      height: 23vh * @h;
      position: absolute;
      right: 1%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .list {
    max-height: 800vh * @h;
    overflow: auto;
    margin-bottom: 3px;
    .dw {
      width: 50vw * @w;
      height: 100%;
      cursor: pointer;
    }

    /deep/ .list-header {
      padding: 14vh * @h 0;
      div {
        font-size: 18vh * @h;
      }
    }
    /deep/ .list-body {
      li {
        div {
          font-size: 18vh * @h;
          padding: 0 10vw * @w;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .phone {
        .icon {
          margin: 0 10vw * @w;
          color: #00ffff;
          cursor: pointer;
        }
      }
    }
  }
  .orinary-hidden,
  .great-hidden {
    position: relative;
    .selected {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      img {
        width: 150vw * @w;
        height: 150vh * @h;
      }
    }
  }
}
</style>