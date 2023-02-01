<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-10 14:28:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-05 14:52:15
-->
<template>
  <div>
    <modelBox title="指挥机构" class="four-statistics">
      <template slot="content">
        <div class="FourContent">
          <ul>
            <li
              v-for="(e, i) in FourStatisticsList"
              :key="i"
              :class="e.flag ? 'bg-check' : ''"
              @click="FourStatisticsFn(e, i)"
            >
              <img :src="e.img" alt="" />
              <p>{{ e.title }}</p>
              <span>{{ e.num }}{{ e.unit }}</span>
              <div class="selected" v-if="e.flag">
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

    <commandPop ref="cityCommand" @doClose="allCommandClose" />
    <commandPop ref="areaCommand" @doClose="allCommandClose" />
    <commandPop ref="townCommand" @doClose="allCommandClose" />
    <commandPop ref="streeCommand" @doClose="allCommandClose" />
  </div>
</template>

<script>
import modelBox from "../modelBox/index.vue";
import { FourStatisticsApi } from "@/api/FourStatistics/FourStatistics";
import commandPop from "./commandPop.vue";
export default {
  components: { modelBox, commandPop },
  data() {
    return {
      //图标
      FourStatisticsList: [
        {
          title: "市级指挥机构",
          id: 1,
          img: require("@/assets/images/majorFestivalsConductor/Four1.png"),
          num: "3",
          flag: false,
          bgShow: true,
        },
        {
          title: "区级指挥机构",
          id: 2,
          img: require("@/assets/images/majorFestivalsConductor/Four2.png"),
          num: "14",
          flag: false,
          bgShow: true,
        },
        {
          title: "镇级指挥机构",
          id: 3,
          img: require("@/assets/images/majorFestivalsConductor/Four3.png"),
          num: "1",
          flag: false,
          bgShow: true,
        },
        {
          title: "村(居)级指挥机构",
          id: 4,
          img: require("@/assets/images/emergencyOrganizationCommand/icon_village.png"),
          num: "40",
          flag: false,
          bgShow: true,
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
      FourShow: false,
      popType: null,
      popTitle: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    //图标点击事件
    FourStatisticsFn(e, i) {
      e.flag = !e.flag;
      const typeObj = {
        1: "cityCommand",
        2: "areaCommand",
        3: "townCommand",
        4: "streeCommand",
      };
      this.$refs[typeObj[e.id]].$emit('show',{...e})
     /*  this.$refs[typeObj[e.id]].commandShow = e.flag;
      this.$refs[typeObj[e.id]].title = e.title; */
      //  pGzznCore.setPointLayerToMap(items, objs);
    },
    //图标请求数据
    getFourStatisticsList() {
      FourStatisticsApi("utm2wk4H", { body: {} }).then((res) => {
        if (res.success) {
          this.FourStatisticsList.map((item, index) => {
            let obj = res.body.data.find((i, k) => {
              if (item.id === parseInt(i.rownum)) {
                return i;
              }
            });
            Object.assign(this.FourStatisticsList[index], obj);
            /*  res.body.data.map((e, i) => {
              if (e.typeName == item.name) {
                item.num = e.num;
                item.type = e.type;
                item.rownum = e.rownum;
                item.unit = e.unit
              }
            }); */
          });
        }
      });
    },
    allCommandClose(title) {
      this.FourStatisticsList.find((i, k) => {
        console.log(8888,i.title,title.typeName)
        if (i.title === title.typeName) {
          this.FourStatisticsList[k].flag = false;
        }
      });
    },
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
.four-statistics {
  left: unset;
  right: 32vw * @w;
  top: 575vh * @h;
}
.FourShowbg {
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

.FourShowImg {
  width: 100%;
  height: 95vh;
  background-color: #fff;
  margin: auto;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.bg-check {
}
</style>
