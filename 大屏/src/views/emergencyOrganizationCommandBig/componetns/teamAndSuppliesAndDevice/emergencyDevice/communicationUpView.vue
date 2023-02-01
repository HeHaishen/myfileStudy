<!--
 * @Description: 弹出窗口视图
 * @Version: 1.0
 * @Autor: maoweiye
 * @Date: 2021-10-11 10:05:47
 * @LastEditors:  
 * @LastEditTime: 2021-11-02 18:12:08
-->
<!-- 弹出窗口视图 -->
<template>
  <div class="up_view">
    <!-- <div class="conditions-search">
      <span>名称：</span
      ><input v-model="queryData.name" placeholder="名称" />
      <button class="mouse-click btn" @click="onQuery">查询</button>
      <button class="mouse-click btn" @click="onEmpty">清空</button>
      <button class="mouse-click btn" @click="dealData">处理数据</button>
    </div> -->
    <clist class="list" :columns="columns" :listData="listData">
      <template
        v-for="item in columns.filter((e) => e.textIndex != 'dw')"
        :slot="item.textIndex"
        slot-scope="{ text }"
      >
        <span :title="text" :key="item.textIndex">
          <!-- {{ item.textIndex == 'v' ?  `${text}km/h` : text }} -->
          {{ text }}
        </span>
      </template>
      <template slot="dw" slot-scope="{ record }">
        <div class="dw" @click="onGPS(record)">
          <svg
            t="1633855607571"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2761"
            width="100%"
            height="100%"
          >
            <path
              d="M512 943.98c223.99-224.73 335.984-399.578 335.984-524.547C847.984 231.98 697.56 80.02 512 80.02S176.016 231.98 176.016 419.433C176.016 544.4 288.01 719.25 512 943.98z m45.327 45.177c-25.01 25.093-65.645 25.093-90.654 0-235.25-236.027-354.654-422.443-354.654-569.724C112.02 196.78 290.951 16.024 512 16.024s399.98 180.757 399.98 403.409c0 147.281-119.403 333.697-354.653 569.724zM512 544c70.689 0 127.994-57.305 127.994-127.994S582.69 288.01 512 288.01s-127.994 57.305-127.994 127.994S441.31 543.999 512 543.999z m0 63.996c-106.034 0-191.99-85.956-191.99-191.99S405.965 224.014 512 224.014s191.99 85.957 191.99 191.99S618.034 607.996 512 607.996z"
              p-id="2762"
              fill="#1383FE"
            ></path>
          </svg>
        </div>
      </template>
    </clist>
    <div class="pagination">
      <ChangePage
        :total="total"
        :currentPage="currentPage"
        @changePages="changePages"
      />
    </div>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { getIdsmApi } from "@/api/idsm/index";
export default {
  components: { Clist, ChangePage },
  props: {
    communicationShow: {
      type: Boolean,
    },
    communicationActive: {
      type: Boolean,
    },
    PlistData: {
      type: Array,
    },
  },
  data() {
    return {
      columns: [
        { title: "设备名称", textIndex: "name" },
        { title: "设备编号", textIndex: "code" },
        { title: "定位", textIndex: "dw" },
      ],
      listData: [],
      queryData: {},
      total: 1,
      currentPage: 1,
      oldPoint: {},
    };
  },
  watch: {
    communicationShow: {
      handler(newVal) {},
    },
    pushData: {
      handler(newVal, oldVal) {
        if (newVal.cmd) {
          let cmdCode = newVal.cmd;
          switch (cmdCode) {
            case "vEt9KkOc":
              this.dealData(newVal.data);
              break;
            default:
              break;
          }
        }
      },
      deep: true,
    },
    PlistData: {
      deep: true,
      immediate: true,
      handler(val) {
        if (!val) {
          return;
        }
        val.map((v) => {
          this.oldPoint[v.code] = v;
        });
      },
    },
    communicationActive:{
      handler(val){
        if(!val){
          this.lineLayerRemove()
          //this.$EventBus.$emit("communicationUpView")
        }
      }
    }
  },
  computed: {
    pushData() {
      return this.$store.getters.responeData;
    },
  },
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {
    this.doQuery();
  },
  //方法集合
  methods: {
    doQuery() {
      let body = {
        body: {},
        page: this.currentPage,
      };
      getIdsmApi("cwXzq0wf", body).then((res) => {
        if (res.success) {
          if (res.body.data) {
            this.listData = res.body.data;
            this.total = parseInt(res.total);
          } else {
            this.listData = [];
          }
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    // 处理sorket数据
    dealData(record) {
      if (!this.communicationActive) return;

      if (this.oldPoint[record.issi]&&!this.oldPoint[record.issi].hasOwnProperty("lng")) {
        this.oldPoint[record.issi].lng = this.oldPoint[record.issi].lon;
        this.oldPoint[record.issi].la = this.oldPoint[record.issi].lat;
      }

      let items = pGzznCore.deepClone(record);
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/yjzhjtx12.png",
        // isFlagRange: false,
        RangeNum: 3000,
        info: this.columns.filter((e) => e.textIndex != "dw"),
      };
      let lists = [
        {
          name: record.issi,
          lat: items.la,
          lon: items.lng,
          sid: record.issi,
          code: record.issi,
          id: record.issi,
        },
      ];
      if (this.oldPoint[record.issi]) {
        pGzznCore.pointLayerRemove({ type: record.issi + "defaultTypepointImgEnd" });
        pGzznCore.drawLineToMap(
          [
            this.oldPoint[record.issi].lng,
            this.oldPoint[record.issi].la,
            items.lng,
            items.la,
          ],
          [0, 255, 255, 1],
          false,
          {type:"drawLineToMap"}
        );
        objs.type = record.issi + "defaultTypepointImgEnd";
        objs.layerName = "终点";
      } else {
        objs.type = record.issi + "defaultTypepointImgStart";
        objs.layerName = "起点";
        return false
      }

      pGzznCore.setPointLayerToMap(lists, objs);
      this.oldPoint[record.issi] = record;
    },
    changePages(param) {
      this.currentPage = param.pages;
      this.doQuery();
    },
    // 800M
    onGPS(record) {
      this.setLayerToMap([record], "defaultTypeyjzhjtx12",true);
    },
    onQuery() {
      this.currentPage = 1;
      this.doQuery();
    },
    onEmpty() {
      this.currentPage = 1;
      this.queryData = {};
      this.doQuery();
    },
    setLayerToMap(list, typeStr,flyto) {
      let items = pGzznCore.deepClone(list);
      let columns = this.columns.filter((e) => e.textIndex != "dw");
      if(!flyto){
        pGzznCore.pointLayerRemove({ type: typeStr });
      }
      
      var objs = {
        imgUrl: "gzznGIS/Image/gjh/yjzhjtx12.png",
        imgSize: { width: 40, height: 36 },
        type: typeStr,
        layerName: "800M通信",
        info: columns,
        lonLat: { lon: "lng", lat: "la" },
        isFlagPopule:true
      };

      
      if(flyto){
        objs.data = items;
        pGzznCore.flyToPoint({x:items[0].lon,y:items[0].lat,z:13673},objs)
      }else{
        pGzznCore.setPointLayerToMap(items, objs);
      }
      
    },
    lineLayerRemove(){
      pGzznCore.drawLineRemove({type:"drawLineToMap"});
      this.PlistData.map(v=>{
        pGzznCore.pointLayerRemove({ type: `${v.code}defaultTypepointImgEnd` });
       pGzznCore.pointLayerRemove({ type: `${v.code}defaultTypepointImgStart` });
      })
       
       
    }
  },
};
</script>
<style lang='less' scoped>
@import "../../../common.less";
.up_view {
  min-width: 1000px;
  .btns {
    width: 100%;
    overflow: hidden;
    margin: 5px 0;
    .btn {
      cursor: pointer;
      display: inline-block;
      background: rgba(10, 42, 100, 1);
      // background: #02648e;
      margin-right: 5px;
      color: white;
      padding: 10px 30px;
      font-size: 11px;
      border: 2px #1d4fa2 solid;

      &.active {
        background: #02648e;
        border-color: #0275a1;
      }
    }
  }

  .list {
    max-height: 800px;
    overflow: auto;
    margin: 20px 0;
    .dw {
      width: 50px;
      height: 100%;
      cursor: pointer;
    }

    /deep/ .list-header {
      padding: 14px 0;
      div {
        font-size: 18px;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        div {
          font-size: 18px;
          padding: 0 10px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .phone {
          .icon {
            margin: 0 10px;
            color: #00ffff;
            cursor: pointer;
          }
        }
      }
    }
  }
  .conditions-search {
    display: flex;
    align-items: center;
    // margin: 15px 0 20px;
    margin: 20px;

    .time {
      font-size: 22px;
    }

    > span {
      font-size: 18px;
      color: white;
    }

    > input {
      width: 200px;
      height: 35px;
      line-height: 30px;
      background-color: #333333;
      color: #fff;
      padding-left: 20px;
      border: none;
      margin-right: 30px;
      font-size: 16px;

      &::placeholder {
        color: #eee;
      }
    }

    > button {
      background-color: #169bd5;
      border: none;
      margin-right: 10px;

      &.btn {
        background-color: #169bd5;
        font-size: 18px;
        // line-height: 35px;
        padding: 4px 8px !important;
        .box-sizing();
        border: none;
        margin-right: 10px;
        border-radius: 6px;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>