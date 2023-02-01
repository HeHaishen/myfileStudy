<template>
  <div class="dangerous-supervise">
    <ModelBox :title="'危化品监管分布'" class="dangerous-supervise-box">
      <div slot="content" class="hazardous-chemicals-echart">

      </div>
    </ModelBox>
    <pop-up-layer v-if='listBol' :show="listBol" :setStyles="{ }" opsition="pageRight" ref="myPopUpLayer" class="ordinary-table" :title="tableTitle" @doClose="tableClose">
      <template slot="content">
        <div class="table-content">
          <div class="talbe-search">
            <div class="center-search">
              <input class="c-input" placeholder="输入关键字" type="text" v-model="searchName" />
              <img src="../../../../assets/images/emergencyOverview/icon_search.png" alt="" @click="onSearch" />
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
            <template slot="phone" slot-scope="{ text, record }">
              <div :title="text" class="phone">
                {{ text }}
                <a-icon type="phone" class="icon" @click="clickMobilePhone(record, $event)" v-show="text" />
                <a-icon type="mail" class="icon" @click="clickMessage(record, $event)" v-show="text" />
              </div>
            </template>
            <template slot='position' slot-scope="{ record }">
              <div class="dw" @click="onGPS(record)">
                <svg t="1633855607571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="100%" height="100%">
                  <path d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z" p-id="2762" fill="#1383FE"></path>
                </svg>
              </div>
            </template>
          </clist>
          <div class="list-change-page">
            <ChangePage :total="pagination.total" :currentPage="pagination.current" @changePages="pageChange" />
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
    ModelBox, ChangePage, Clist
  },
  mixins: [mixin],

  data() {
    return {
      //危化品Echart
      hazardousDiv: null,
      listBol: false,
      searchName: '',
      pagination: {
        total: 0,
        current: 1,
      },
      tagCode: null,
      tableHeaderList: [
        { title: "序号", index: 0, textIndex: "number", width: "10%" },
        { title: "名称", index: 1, textIndex: "name", width: "20%" },
        { title: "地址", index: 2, textIndex: "address", width: "20%" },
        { title: "所在区", index: 3, textIndex: "areaName", width: "20%" },
        { title: "风险等级", index: 4, textIndex: "level", width: "10%" },
        {
          title: "类型",
          index: 4,
          textIndex: "typeName",
          width: "10%",
        },
        {
          title: "定位",
          index: 5,
          textIndex: "position",
          width: "10%",
        },
      ],
      tabelListData: [],
      tableTitle: '',
      type: '',
      titleNum: {
        "加油站": 1,
        "储存": 2,
        "生产": 3,
        "使用": 4,
        "危化品零售企业": 5,
        "许可使用": 6
      },
      clickToMap: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
      code: '',
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    //   初始化
    init() {
      this.getEchartData()
      this.$nextTick(() => {
        this.initEchart();
      });
    },
    //初始化图表
    initEchart() {
      this.hazardousDiv = this.$echarts.init(document.getElementsByClassName('hazardous-chemicals-echart')[0])
      const that = this
      //图形点击    
      this.hazardousDiv.on("click", (params) => {
        this.clickToMap[this.titleNum[params.name]] = !this.clickToMap[this.titleNum[params.name]];
        console.log(params, 'params');
        // if (params.name == "重点监管化工工艺企业") {
        //   this.tagCode = 'ZDJGHGGYQY'
        //   this.tableTitle = "重点监管化工工艺企业"
        // } else if (params.name == "重大危险源企业") {
        //   this.tagCode = 'ZDWXYQY'
        //   this.tableTitle = "重大危险源企业"
        // } else if (params.name == "涉氨企业") {
        //   this.tagCode = 'QSYH_SAZL'
        //   this.tableTitle = "涉氨企业"
        // } else if (params.name == '加油站') {
        //   this.tableTitle = "加油站"
        //   this.tagCode = ''
        //   this.pagination.current = 1
        //   this.pagination.total = 0
        //   this.searchName = ''
        //   this.tabelListData = []
        //   //获取加油站信息
        //   this.getPetrolStation()
        // } else if (params.name == '重点监管危险化学品企业') {
        //   this.tableTitle = "重点监管危险化学品企业"
        //   this.tagCode = ''
        //   this.pagination.current = 1
        //   this.pagination.total = 0
        //   this.searchName = ''
        //   this.tabelListData = []
        //   this.type = 2
        //   this.getKeyWacherData();
        //   this.getKeyWacherData(-1);
        // } else if (params.name == '剧毒化学品') {
        //   this.tableTitle = "剧毒化学品"
        //   this.tagCode = ''
        //   this.pagination.current = 1
        //   this.pagination.total = 0
        //   this.searchName = ''
        //   this.tabelListData = []
        //   this.type = 1
        //   this.getKeyWacherData();
        //   this.getKeyWacherData(-1);
        // } else {
        //   this.$MyMessage.error('暂无数据')
        //   return
        // }
        // //获取企业信息
        // if (this.tagCode) {
        //   this.pagination.current = 1
        //   this.pagination.total = 0
        //   this.searchName = ''
        //   this.tabelListData = []
        //   this.getEchartList();
        //   this.getEchartList(-1);
        // }
        if (params.name == "加油站") {
          this.code = 1
          this.tableTitle = "加油站"
        } else if (params.name == "储存") {
          this.code = 2
          this.tableTitle = "储存"
        } else if (params.name == "生产") {
          this.code = 3
          this.tableTitle = "生产"
        } else if (params.name == '使用') {
          this.code = 4
          this.tableTitle = "使用"
        } else if (params.name == '危化品零售企业') {
          this.code = 5
          this.tableTitle = "危化品零售企业"
        } else if (params.name == '许可使用') {
          this.code = 6
          this.tableTitle = "许可使用"
        } else {
          this.$MyMessage.error('暂无数据')
          return
        }

        //获取企业信息
        if (this.code) {
          this.pagination.current = 1
          this.pagination.total = 0
          this.searchName = ''
          this.tabelListData = []
          this.NewgetEchartList();
          this.NewgetEchartList(-1);
          // this.getEchartList(-1);
        }
        this.listBol = true

      });
      window.onresize = () => {
        this.hazardousDiv.resize();
      };
    },
    //echart 图表配置
    hazardousEchartOption(data = null) {
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: true,
          bottom: '5%',
          left: 'left',
          textStyle: {
            color: '#fff',
            fontSize: this.$setFontSize(20),
          },
          itemWidth: this.$setFontSize(20),
          itemHeight: this.$setFontSize(20),
          formatter: function (name) {
            return name.length > 4 ? name.substr(0, 4) + '...' : name
          },
          //开启tooltip
          tooltip: {
            show: true
          }
        },
        series: [
          {
            name: '危化品监管分布',
            type: 'pie',
            radius: ['30%', '60%'],
            top: '-10%%',
            label: {
              show: true,
              textStyle: {
                fontSize: this.$setFontSize(26),
                color: "#fff",
              },
              formatter: '{d}%',
            },
            labelLine: {
              show: true,//数据标签引导线
              length: 2,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            color: ['rgb(254,75,75)', 'rgb(255,132,50)', 'rgb(0,238,156)', 'rgb(40,146,255)', 'rgb(2,100,142)', 'rgb(0,250,251)'],
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

    getEchartData() {
      let code = 'JwjlCii9'
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
            return { value: e.num, name: e.name }
          })
          this.hazardousDiv.setOption(this.hazardousEchartOption(dataEchart));
        }
      })
    },

    //表格数据
    getEchartList(pageSize = 10) {
      if (pageSize == -1 && !this.clickToMap[this.titleNum[this.tableTitle]]) {
        pGzznCore.pointLayerRemove({ type: "defaultTypewxpjgfb" + this.titleNum[this.tableTitle], isFlag: true });
        return;
      }
      let code = 'b2qAFMeN'
      let data = {
        body: {
          tagCode: this.tagCode,
          name: this.searchName
        },
        page: this.pagination.current,
        pageSize: pageSize,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then((res) => {
        if (res.success) {
          console.log(res);
          if (pageSize == -1) {
            this.setLayerToMap(res.body.data, "defaultTypewxpjgfb" + this.titleNum[this.tableTitle], true);
          } else {
            this.tabelListData = res.body.data
            this.pagination.total = +res.total
          }
        }
      });
    },

    //表格数据
    NewgetEchartList(pageSize = 10) {
      if (pageSize == -1 && !this.clickToMap[this.code]) {
        pGzznCore.pointLayerRemove({ type: "defaultTypewxpjgfb" + this.code, isFlag: true });
        return;
      }
      let code = 'kOK0XWzL'
      let data = {
        body: {
          type: this.code,
          name: this.searchName
        },
        page: this.pagination.current,
        pageSize: pageSize,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then((res) => {
        if (res.success) {
          console.log(res);
          if (pageSize == -1) {
            this.setLayerToMap(res.body.data, "defaultTypewxpjgfb" + this.code, true);
          } else {
            this.tabelListData = res.body.data
            this.pagination.total = +res.total
          }
        }
      });
    },
    //加油站数据
    getPetrolStation(pageSize = 10) {
      if (pageSize == -1 && !this.clickToMap[this.titleNum[this.tableTitle]]) {
        pGzznCore.pointLayerRemove({ type: "defaultTypewxpjgfb" + this.titleNum[this.tableTitle], isFlag: true });
        return;
      }
      let code = 'CDubQsGk'
      let data = {
        body: {
          type: 1,
          name: this.searchName
        },
        page: this.pagination.current,
        pageSize: pageSize,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then((res) => {
        if (res.success) {
          console.log(res);
          if (pageSize == -1) {
            this.setLayerToMap(res.body.data, "defaultTypewxpjgfb" + this.titleNum[this.tableTitle], true);
          } else {
            this.tabelListData = res.body.data
            this.pagination.total = +res.total
          }

        }
      });
    },
    //加油站数据
    getKeyWacherData(pageSize = 10) {
      if (pageSize == -1 && !this.clickToMap[this.titleNum[this.tableTitle]]) {
        pGzznCore.pointLayerRemove({ type: "defaultTypewxpjgfb" + this.titleNum[this.tableTitle], isFlag: true });
        return;
      }
      let code = 'kOK0XWzL'
      let data = {
        body: {
          type: this.type,
          name: this.searchName
        },
        page: this.pagination.current,
        pageSize: pageSize,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then((res) => {
        if (res.success) {
          console.log(res);
          this.tabelListData = res.body.data
          this.pagination.total = +res.total
          if (pageSize == -1) {
            this.setLayerToMap(res.body.data, "defaultTypewxpjgfb" + this.titleNum[this.tableTitle], true);
          }
        }
      });
    },

    //搜索
    onSearch() {
      this.pagination.current = 1
      // if (this.tableTitle == '加油站') {
      //   this.getPetrolStation()
      // } else if (this.tableTitle == '剧毒化学品' || this.tableTitle == '重点监管危险化学品企业') {
      //   this.getKeyWacherData()
      // }
      // else {
      //   this.getEchartList();
      // }
      this.NewgetEchartList();
    },

    //关闭表格
    tableClose() {
      this.listBol = false
      this.pagination.current = 1
      this.pagination.total = 0
      this.searchName = ''
      this.type = ''
      this.tabelListData = []
    },

    //表格分页跳转
    pageChange(pages, pageSize) {
      this.pagination.current = +pages.pages;
      // if (this.tableTitle == '加油站') {
      //   this.getPetrolStation()
      // } else if (this.tableTitle == '剧毒化学品' || this.tableTitle == '重点监管危险化学品企业') {
      //   this.getKeyWacherData()
      // } else {
      //   this.getEchartList();
      // }
      this.NewgetEchartList();

    },
    // 定位
    onGPS(item) {
      console.log(item);

      this.setLayerToMap([item], "defaultTypewxpjgfb" + this.titleNum[this.tableTitle]);
    },

    setLayerToMap(list, typeStr, isFlag = false) {
      let items = pGzznCore.deepClone(list);
      let columns = this.tableHeaderList.filter((e) => e.textIndex != "position" && e.textIndex != "number");
      if(isFlag){
        pGzznCore.pointLayerRemove({ type: typeStr, isFlag: isFlag });
      }  
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/wxpjgfb.svg",
        imgSize: { width: 32, height: 32 },
        type: typeStr,
        layerName: "危化品监管分布",
        info: columns,
        phoneInfo: { phone: "phone", name: "contact" },
        isFlagPopule:true
      };
      if(parseFloat(this.code)  != 1){
          objs.imgUrlObj = { keys: "level", start: "gzznGIS/Image/gjh/wxpjgfb", end: '.svg' };
      }else if(parseFloat(this.code)  == 1){
          objs.imgUrl = "gzznGIS/Image/gjh/gas_station.svg";
      }
      if(isFlag){
        pGzznCore.setPointLayerToMap(items, objs);
      }else{
        objs.data = items;
        pGzznCore.flyToPoint({x:items[0].lon,y:items[0].lat,z:13673},objs)
      }
      
    },
  },
}
</script>

<style lang='less' scoped>
@import '../../common.less';
@import './mixin.less';

.dangerous-supervise {
  .dangerous-supervise-box {
    left: 2815vw * @w;
    top: 1721vh * @h;
  }
  .dw {
    width: 50vw * @w;
    height: 100%;
    cursor: pointer;
  }
  .c-model-box {
    width: 528vw * @w;
    /deep/.model-header {
      width: 500vw * @w;
      margin: 0 auto;
    }
  }
  .hazardous-chemicals-echart {
    width: 528vw * @w;
    height: 347vh * @h;
  }
  .ordinary-table {
    width: 1100vw * @w;
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
</style>