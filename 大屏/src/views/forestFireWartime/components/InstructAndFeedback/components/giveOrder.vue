<!--
 * @Author: liuxin
 * @Date: 2021-06-23 16:00:06
 * @LastEditTime: 2021-06-23 17:24:40
 * @LastEditors: Please set LastEditors
 * @Description: 下达指令
 * @FilePath: \big-screen-vue\src\views\forestFireWartime\components\InstructAndFeedback\components\giveOrder.vue
-->
<template>
  <div class="give-order-content">
    <div class="right-right-content">
      <ul v-if="eventDataList.length">
        <li v-for="(item, index) in eventDataList" :key="index">
          <div class="li-event-title">
            <p>
              <!-- <img :src="item.iconUrl" alt="" /> -->
              <span>{{ item.position }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.operatorTime.slice(8, 10) }}日</span>
              <span>{{
                    item.operatorTime.slice(11, item.operatorTime.length)
                  }}</span>
            </p>
            <label :class="[item.type === '1' ? 'green' : 'blue']" for="">{{
                  item.operatorType
                }}</label>
          </div>
          <div v-if="item.content" class="li-event-detail" :class="[item.type === '1' ? 'bg-task' : 'bg-trouble']">
            {{ item.content }}
          </div>
          <div class="li-icon-task"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'giveOrder',
  props: {},
  components: {},
  data() {
    return {
      eventDataList: []
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
    this.getLeftEventDetail()
  },
  methods: {
    // 事件跟踪记录
    getLeftEventDetail(item) {
      this.eventDataList = [
        {
          "sid": "2485243370113337136",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-17 19:00:07",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "任务下达内容描述",
          "contentTitle": "领导再次下达指令",
          "iconUrl": null
        },
        {
          "sid": "2485242719425791792",
          "eventId": "2712883158710632478",
          "operatorType": "【任务上报】",
          "operator": "1",
          "operatorTime": "2020-04-17 18:50:01",
          "contentType": "2",
          "postName": "局领导",
          "name": "梁处",
          "content": "任务反馈",
          "contentTitle": "相关人员反馈问题",
          "iconUrl": null
        },
        {
          "sid": "2485241317118968624",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-17 18:28:15",
          "contentType": "1",
          "postName": "局领导",
          "name": "张局",
          "content": "任务下达报",
          "contentTitle": "领导亲临视察",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480594",
          "eventId": "2712883158710632478",
          "operatorType": "【任务上报】",
          "operator": "1",
          "operatorTime": "2020-04-17 18:16:05",
          "contentType": "0",
          "postName": "局领导",
          "name": "梁处",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "处理任务",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480593",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-07 19:21:51",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "安排任务",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480593",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-07 19:21:51",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "安排任务",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480593",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-07 19:21:51",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "安排任务",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480593",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-07 19:21:51",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "安排任务",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480593",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-07 19:21:51",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "安排任务",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480593",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-07 19:21:51",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "安排任务",
          "iconUrl": null
        },
        {
          "sid": "2484317058410480593",
          "eventId": "2712883158710632478",
          "operatorType": "【任务下达】",
          "operator": "1",
          "operatorTime": "2020-04-07 19:21:51",
          "contentType": "0",
          "postName": "局领导",
          "name": "张局",
          "content": "安排现场人员进行现场处置任务",
          "contentTitle": "安排任务",
          "iconUrl": null
        }
      ];
    },
  },
}
</script>
<style lang='less' scoped>
.give-order-content {
  width: 100%;
  height: 100%;
  .right-right-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-left: 24px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      width: 100%;
      border-left: 2px #1f4e84 solid;
      li {
        width: 100%;
        height: auto;
        padding-left: 23px;
        padding-bottom: 24px;
        box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
        .li-event-title {
          width: 100%;
          height: 42px;
          color: white;
          display: flex;
          align-items: center;
          p {
            width: auto;
            color: white;
            font-size: 23px;
            display: flex;
            align-items: center;
            img {
              display: block;
              width: 32px;
              height: 32px;
              margin-top: 5px;
              margin-right: 7px;
            }
            span {
              display: block;
              margin-right: 20px;
            }
          }
          label {
            font-size: 23px;
          }
          .green {
            color: #46e777;
          }
          .blue {
            color: #03cff2;
          }
        }
        .li-event-detail {
          width: 100%;
          height: auto;
          //   background-size: 100% 100%;
          color: white;
          font-size: 23px;
          padding: 22px 26px;
          box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        .bg-task {
          border: 1px #2dc86c solid;
          border-radius: 10px;
          // background: url("../../assets/images/dragonBoat/bg_task.png")
          //   no-repeat no-repeat center;
          // background-size: 100% 100%;
        }
        .bg-trouble {
          border: 1px #05c4fb solid;
          border-radius: 10px;
          // background: url("../../assets/images/dragonBoat/bg_trouble.png")
          //   no-repeat no-repeat center;
          // background-size: 100% 100%;
        }
        .li-icon-task {
          border-radius: 50%;
          width: 18px;
          height: 18px;
          position: absolute;
          top: 12.5px;
          left: -10px;
          background: #05c4fb;
          background-image: radial-gradient(#064f78cc 32%, #05c4fb 60%);
          box-shadow: 0 0 15px #00ffff;
        }
      }
    }
  }
}
</style>
