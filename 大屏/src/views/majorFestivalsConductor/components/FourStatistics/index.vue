<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-10 14:28:39
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-16 15:45:58
-->
<template>
  <div>
    <modelBox title="四馆">
      <template slot="content">
        <div class="FourContent">
        <ul>
          <li
            v-for="(e, i) in FourStatisticsList"
            :key="i"
            :class="e.flag ? 'bg-check' :''"
            @click="FourStatisticsFn(e, i)" >
            <img :src="e.img" alt="" />
            <p>{{ e.title }}</p>
            <span>{{ e.num }}</span>
           <div
            class="selected"
            v-if="e.flag"
          >
            <img
              src="~@/assets/images/majorFestivalsConductor/selected.png"
              alt=""
              srcset=""
            />
          </div>
          </li>
        </ul>
        </div>
      </template>
    </modelBox>
  <!-- 展示ABC背景图 -->
    <pop-up-layer
      :show="show"
      :setStyles="{ width: '68%' }"
      @doClose="close"
      :sendEvent="templateEvent"
      title="展馆"
      opsition="pageRight"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="FourShowbg">
        <div class="FourShow" >
          <div v-for="(e,i) in FourShowList" :key="i"   :class="e.class" @click="FourShowFn(e,i)"></div>
        </div>
        </div>
      </template>
    </pop-up-layer>
<!-- 切换图片 -->
    <pop-up-layer
      :show="FourShow"
      :setStyles="{ width: '55%' }"
      @doClose="FourShow=false"
      :sendEvent="templateEvent"
      :title="FourShowTitle"
      opsition="pageRight"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="FourShowImg">
         
        <img :src="FourShowImg" alt=""  />
        </div>
      </template>
    </pop-up-layer>
     <!-- 宾馆 -->
     <hotel  ref="hotel" />
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import modelBox from "../modelBox/index.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { FourStatisticsApi } from "@/api/FourStatistics/FourStatistics";
import popUpLayer from "@/components/APicture/popUpLayer/index.vue";
import  hotel from './hotel.vue'
export default {
  components: { modelBox, popUpLayer ,Clist,ChangePage,hotel},
  data() {
    return {
      //图标
      FourStatisticsList: [
        {
          title: "展馆",
          id: 1,
          img: require("@/assets/images/majorFestivalsConductor/Four1.png"),
          num: "3",
          flag:false,
          bgShow:true,
        },
        {
          title: "宾馆",
          id: 2,
          img: require("@/assets/images/majorFestivalsConductor/Four2.png"),
          num: "14",
            flag:false,
               bgShow:true,
        },
        {
          title: "会馆",
          id: 3,
          img: require("@/assets/images/majorFestivalsConductor/Four3.png"),
          num: "1",
            flag:false,
               bgShow:true,
        },
        {
          title: "餐馆",
          id: 4,
          img: require("@/assets/images/majorFestivalsConductor/Four4.png"),
          num: "40",
          flag:false,
           bgShow:true,
        },
      ],
      // defaultParams: {
      //   body: {},
      //   page: 1,
      //   pageSize: 10,
      //   sortName: "sid",
      //   sortOrder: "desc",
      // },
      show: false,
      templateEvent: null,
      FourShow: false,
      FourShowImg: null,
      //展馆图片
      FourShowList: [
        {
          class: "FourShowA",
          img: require("@/assets/images/majorFestivalsConductor/a-zgsyt.png"),
          id: 1,
          title:'A区展馆'
        },
        {
          class: "FourShowB",
          img: require("@/assets/images/majorFestivalsConductor/b-zgsyt.png"),
          id: 2,
            title:'B区展馆'
        },
        {
          class: "FourShowC",
          img: require("@/assets/images/majorFestivalsConductor/c-zgsyt.png"),
          id: 3,
            title:'C区展馆'
        },
      ],
      FourShowTitle:null,
      hotelShow:false,
      result:null,
      clickShowMap:{1:false,2:false,3:false,4:false},
      columns1: [
        { title: "宾馆名称", textIndex: "name",width:'15%' },
        { title: "宾馆地址", textIndex: "addr",width:'20%' },
        { title: "联系电话", textIndex: "telephone",width:'15%'},
         {title:'酒店联系人',textIndex:'contacts',width:'5%'},
        {title:'所在区',  textIndex:'area',width:'5%'   },
        { title: "入住交易团及人数", textIndex: "peopleNum",width:'10%'},
        { title: "交易团联系人", textIndex: "peopleName" ,width:'10%'},
        { title: "预计总人数", textIndex: "estimateNum",width:'5%' },       
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
  
    //图标点击事件
  FourStatisticsFn(e, i) {
    e.flag =!e.flag
    e.bgShow =!e.bgShow
    this.clickShowMap[e.type] = !this.clickShowMap[e.type];
       if (e.id == 1 ) {
         if(e.flag){
             this.show = true;
         }else{
           this.show=false
         }
       
      }else if(e.id==2 ){
        this.$nextTick(()=>{
              if(e.flag){
            this.$refs.hotel.hotelShow = true;
            this.$refs.hotel.getListData(e.type)
         }else{
          this.$refs.hotel.hotelShow=false
         }
        })
      }
   let params = {
        body:{type:e.type},
        page: 1,
        pageSize: -1,
      }
      //console.log(e, i);
      FourStatisticsApi("sZRJ7Hf8", params).then((res) => {
         if(res.code == 200){    
            let items = res.body.data;
            if (items.length>0 && e.type==1) {
              Object.assign(items[0],{
                devInfo: "数量（2）、联系人（王玺/18588926317）",
                devInfoTo: "数量（1）、联系人（王玺/18588926317）",
              })
            }
            pGzznCore.pointLayerRemove({type:"defaultTypesg"+e.type,isFlag:true})
            if(!this.clickShowMap[e.type]){
               return;
            }
            var infos =  [
                { title: "名称", textIndex: "name" },
                { title: "类型", textIndex: "typeName" },
                { title: "电话", textIndex: "telephone" },
                { title: "地址", textIndex: "addr" },
              ];
            if(parseFloat(e.type) == 4){
              infos = this.columns1;
            }
            
            if(parseInt(e.type) == 1){
               infos.push({ title: "小鱼易联", textIndex: "devInfo" });
               infos.push({ title: "布控球", textIndex: "devInfoTo" });     
            }
            // if(parseFloat(e.type) == 4){
            //    infos.push({ title: "交易团联系人", textIndex: "peopleName" });
            //    infos.push({ title: "入住交易团及人数", textIndex: "peopleNum" });             
            // }
            var objs = {
              imgUrl: 'gzznGIS/Image/gjh/sgtj'+e.type+'.png',
              imgUrlObj:{keys:"level",start:'gzznGIS/Image/gjh/sgtj'+e.type,end:'.png'},
              imgSize:{width:32,height:32},
              type: "defaultTypesg"+e.type,
              layerName: "四馆",
              info:infos,
              phoneInfo:{phone:"telephone",name:"name"}
            };

            if(parseFloat(e.type) ==4){
              objs.video ={keys:"name",start:"/big-screen/#/moreVideos?name=",end:""};
            }
            
            pGzznCore.setPointLayerToMap(items, objs)
         }
      })
   
    },
    
    //IONhl3nT
    //图标请求数据
    getFourStatisticsList() {
      FourStatisticsApi("lONhI3nT", {body:{}}).then((res) => {
        if (res.success) {
          this.FourStatisticsList.map((item, index) => {
            res.body.data.map((e, i) => {
              if (e.typeName == item.title) {
                item.num = e.num;
                item.type = e.type;
                item.rownum = e.rownum;
              }
            });
          });
          console.log(this.FourStatisticsList);
        }
      });
    },
    //切换图片
    FourShowFn(e,i) {
      this.FourShow=true,
      this.FourShowImg=e.img
      this.FourShowTitle=e.title
      console.log(e,i);    
    },
    // 点击关闭
    close() {
      this.show = false;
    },
    changePages(){},
  },
  created() {},
  mounted() {
    this.getFourStatisticsList();
  },
};
</script>
<style lang="less" scoped>
// @import "../../common.less";
@import "./index.less";
// /deep/.layer-contents {
//   background: #fff !important;
// }

.FourShowbg{
  background: #fff;
    .FourShow {
      
  width: 100%;
  height: 95vh;
  background: url(../../../../assets/images/majorFestivalsConductor/zgdt.png)
  no-repeat center;
  background-size: 100% 110%;
  position: relative;
 
  .FourShowA {
  position: absolute;
    top: 12%;
    left: 11%;
    width: 31%;
    height: 30%;
    cursor: pointer;
  }
  .FourShowB {
   position: absolute;
     top: 12%;
    right: 20%;
    width: 31%;
    height: 30%;
    cursor: pointer;
  }
  .FourShowC {
    position: absolute;
   left: 13%;
    bottom: 27%;
    width: 31%;
    height: 30%;
     cursor: pointer;
  }
}
}

.FourShowImg{
  width: 100%;
  height:95vh;
  background-color: #fff;
  margin: auto;
  img{
    display: block;
  width: 100%;
  height: 100%;
  }
}
.bg-check{

}
</style>