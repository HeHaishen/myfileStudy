<!--
 * @Description: 事件概览
 * @Author: liuxin
 * @Date: 2021-11-01 15:42:26
 * @LastEditTime: 2021-11-04 09:38:23
 * @LastEditors: JiaJun Wu
-->
<template>
  <div class="event-details">
    <div class="public-head">
      {{ title }}
    </div>
    <div class="public-content">
        <div class="content-all">
          <ul class="list">
            <li v-for="(i) in labelObj" :key="i.id" :class="[[4,5,6,7].includes(i.id)? 'li-gird':'']">
              <div class="li-label">
                <label for="">{{ i.label }}</label>
              </div>
              <div class="li-content">
                <div v-if="i.id !== 11">{{ contentObj[i.contentKeys] ? contentObj[i.contentKeys] : "-" }}{{contentObj[i.contentKeys]?i.type:''}}</div>
                <div v-if="i.id == 10">{{ contentObj['fsyy'] ? contentObj['fsyy'] : contentObj['sjms']?contentObj['sjms']:'-'}}</div>
                <!-- 相似事件-当id等于7时展示 -->
                <div v-if="i.id === 11">
                  <p v-if='similarArr!=null&&similarArr.length==0'>
                    无
                  </p>
                  <p v-for='(item,index) in similarArr' :key='item.rownum' @click="similarBtn(index,item)" class="text-btn">
                    {{item.accTitile}}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="detail-btn" @click='eventDetailBtn'>
          详情
        </div> -->
    </div>
    <event-detail :contentObj='contentObj' v-if='eventShow' @eventClose='eventClose'></event-detail>
    <template v-for="item in similarArr.filter(e=>e.show)">
      <similar-event :contentObj='item' :key='item.rownum' @similarClose='similarClose(item)'></similar-event>
    </template>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import { getIdsmApi } from '@/api/idsm/index.js'
import EventDetail from './detail/index.vue'
import similarEvent from './similarEvent/index.vue'
export default {
  components: { EventDetail, similarEvent },
  props: {
    eventData: {
      type: Object,
      default: () => { return { } }
    }
  },
  data() {
    return {
      title: "事件概览",
      routeData: {
        sid: '1000201703251009283467762'
      },
      labelObj: [
        {
          id: 1,
          label: "事件标题：",
          contentKeys: "xxbt",
        },
        {
          id: 2,
          label: "接报时间：",
          contentKeys: "jbsj",
        },
        {
          id: 3,
          label: "发生地点：",
          contentKeys: "sfdd",
        },
        {
          id: 4,
          label: "事件类型：",
          contentKeys: "sjlxdm",
        },
        {
          id: 5,
          label: "事件等级：",
          contentKeys: "sjdjdm",
        },
        {
          id: 6,
          label: "死亡人数：",
          contentKeys: "swrs",
          type: "人",
        },
        {
          id: 7,
          label: "受伤人数：",
          contentKeys: "ssrs",
          type: "人",
        },
        {
          id: 8,
          label: "失踪人数：",
          contentKeys: "zjjjss",
          type: "人",
        },
        {
          id: 9,
          label: "直接经济损失：",
          contentKeys: "zjjjss",
          type: "元",
        },
        
        {
          id: 10,
          label: "事件概述：",
          contentKeys: "sjms",
        },
        {
          id: 11,
          label: "相似事件：",
          contentKeys: "xssj",
          children: []
        },
      ],
      contentObj: {
        1: "10月22日召开的华为开发者大会上",
        2: "10月22日召开的华为开发者大会上",
        3: "10月22日召开的华为开发者大会上",
        4: "10月22日召开的华为开发者大会上",
        5: "10月22日召开的华为开发者大会上10月22日召开的华为开发者大会上",
        6: "10月22日召开的华为开发者大会上10月22日召开的华为开发者大会上10月22日召开的华为开发者大会上10月22日召开的华为开发者大会上",
        7: "开的华为开发者大会开的华为开发者大会",
        8: "开的华为开发者大会开的华为开发者大会",
        9: "开的华为开发者大会开的华为开发者大会",
      },
      similarArr: [],
      eventShow: false,
      similarShow: false
    };
  },
  watch:{
    "$route.query":{
      handler(newVal,oldVal){
        this.doQuery(newVal.jbbh)
      },
      deep:true
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.routeData = this.$route.query.sid
      this.init()
    });
  },
  methods: {
    init() {
      this.doQuery(this.eventData.jbbh)
    },
    // 查询事件概览
    doQuery(sid) {
      let code = '8qddPGf8'
      let data = {
        body: {
          jbbh: sid
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then(async res => {
        if (res.success) {
          console.log(res, 'res---------------');
          this.contentObj = res.body.data[0]
          //获取对应的区域名称
          var areaCode = this.contentObj['sfxzhq']
          let number = this.contentObj['sfxzhq']
          if (areaCode.length < 12) {
            for (var i = 1; i <= (12 - number.length); i++) {
              areaCode = areaCode + '0'
            }
          }
          // 需要转中文 然后获取相似事件

          await this.getText(areaCode)
          await this.doDict("ZHDP_EVENT_LEVEL", this.contentObj[this.labelObj[4].contentKeys])
          await this.doDict("ZHDP_EVENT_TYPE", this.contentObj[this.labelObj[3].contentKeys])

          //需要根据详情的数据获取相似的事件
          this.getEvent()

        }
      })
    },
    //获取相似事件
    getEvent() {
      let code = 'Ycso3ftQ'
      let data = {
        body: {
          accLevel: this.contentObj.sjdjdm,
          accType: this.contentObj.sjlxdm,
          areas: this.contentObj.sfxzhq.split('区')[0]
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(code, data).then(res => {
        if (res.success) {
          res.body.data.map(e => {
            e.show = false
          })
          this.labelObj[this.labelObj.length - 1].children = res.body.data
          this.similarArr = res.body.data
        }
      })
    },
    //通过区域获取中文
    getText(area) {
      return new Promise((resolve, reject) => {
        let code = 'mHclJOht'
        let data = {
          body: {
            sn: area
          }
        }
        getIdsmApi(code, data).then(res => {
          if (res.success) {
            this.contentObj.sfxzhq = res.body.data[0].name
            resolve(res)
          } else {
            reject(res)
          }
        })
      })

    },
    // 查询字典
    doDict(type, num) {
      return new Promise((resolve, reject) => {
        let code = '9GO8HDzz'
        let data = {
          body: {
            dictName: type,
            dictKey: num
          },
          page: 1,
          pageSize: 10,
          sortName: "sid",
          sortOrder: "desc"
        }
        getIdsmApi(code, data).then(res => {
          if (res.success) {
            if (res.body.data.length) {
              if (type == "ZHDP_EVENT_LEVEL") {
                this.contentObj.sjdjdm = res.body.data[0].dictValue
              } else {
                this.contentObj.sjlxdm = res.body.data[0].dictValue
              }
              resolve(res)
            }

          } else {
            reject(res)
          }
        })
      })


    },
    //事件详情
    eventDetailBtn() {
      this.eventShow = true
    },
    eventClose() {
      this.eventShow = false
    },
    similarBtn(index, item) {
      Object.assign(item, {
        show: true
      })
      // console.log(1);
      // let list = this.similarArr
      // list[index].show = true
      // list.find(e => e.rownum == item.rownum).show = true

      // this.similarArr = JSON.parse(JSON.stringify(list))
      // this.labelObj[index].children[i].show = true
      // this.$set(this.similarArr[index], 'show', true)
      // let obj = item
      // obj.show = true
      // // this.labelObj[index].children[i] = JSON.parse(JSON.stringify(obj))
      // this.labelObj[index].children.splice(i, 1, obj)
    },
    similarClose(item) {
      Object.assign(item, {
        show: false
      })
      // let list = this.similarArr
      // list.find(e => e.rownum == item.rownum).show = false
      // this.similarArr = JSON.parse(JSON.stringify(list))
    }
  },
};
</script>
<style lang='less' scoped>
@import '../../../common.less';
@import './index.less';
</style>
