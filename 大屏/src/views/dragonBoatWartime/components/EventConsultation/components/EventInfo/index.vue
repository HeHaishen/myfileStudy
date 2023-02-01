<template>
    <div class="event-info">
        <div class="event-info-content">
            <div class="e-i-c-btns">
                <div
                    :class="['btn', active == 1 ? 'active' : '']"
                    @click="onClick(1)"
                >
                    事件概况
                </div>
                <div
                    :class="['btn', active == 2 ? 'active' : '']"
                    @click="onClick(2)"
                >
                    视频监控
                </div>
                <div
                    :class="['btn', active == 3 ? 'active' : '']"
                    @click="onClick(3)"
                >
                    应急预案
                </div>
            </div>
            <div class="e-i-c-content">
               <div class="e-i-c-c-event" v-show="active == 1">

               </div>
               <div class="e-i-c-c-video" v-show="active == 2">
                  <video controls="controls" src="../../media/oceans.mp4" muted autoplay loop></video>
               </div>
               <div class="e-i-c-c-plan" v-show="active == 3">
                  <div class="table-header">
                     <p>预案名称</p>
                     <p>预案类型</p>
                     <p>印发日期</p>
                     <p>牵头单位</p>
                     <p>操作</p>
                  </div>
                  <div class="table-body">
                     <div class="table-body-list" v-for="(item,key) in planList" :key="key">
                        <p>{{ item.reservePlanTitle }}</p>
                        <p>{{ item.reservePlanType }}</p>
                        <p>{{ item.created.split(' ')[0] }}</p>
                        <p>{{ item.leadingUnit }}</p>
                        <p><span @click="onSeePlan(item)">查看</span></p>
                     </div>
                  </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eventType, eventSourceList, eventLevelList, planLevelList, planCategory } from '../../utils';
import { getEmergencyPlan } from "@/api/dragonBoat";

export default {
   name: "",
   props: {},
   components: {},
   data() {
      return {
         active: 1,
         eventInfo: {}, // 事件数据
         eventType,
         eventSourceList,
         eventLevelList,
         planLevelList,
         planCategory,
         eventList:[
            { span: 24, key: 'eventName', label: '事件名称' },
            { span: 24, key: 'eventPlace', label: '事发地点' },
            { span: 12, key: 'eventSource', label: '事件来源' },
            { span: 12, key: 'eventTime', label: '事发时间' },
            { span: 12, key: 'reportedTime', label: '接报时间' },
            { span: 12, key: 'eventType', label: '事件类别' },
            { span: 12, key: 'eventLevel', label: '事件等级' },
            { span: 12, key: 'eventUnit', label: '事发单位' },
            { span: 12, key: 'reporter', label: '上报人' },
            { span: 12, key: 'reporterNum', label: '上报人电话' },
            { span: 24, key: 'eventEconomicloss', label: '经济损失' },
            { span: 24, key: 'eventDiscribe', label: '事件简报' }
         ],
         planList: []
      };
   },
   watch: {},
   computed: {},
   created() {},
   mounted() {
      this.getPlanList()
   },
   methods: {
      onClick(active) {
         if (this.active != active) {
            this.active = active;
         }
      },
      // 获取预案列表
      getPlanList(){
         getEmergencyPlan({ body: { eventId: "2521067874866184192" } }).then(res=>{
            this.planList = res.body;
         })
      },
      onSeePlan(item){}
   },
};
</script>

<style lang='less' scoped>
.event-info {
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   background: url("../../images/bg1.png");
   background-size: 100% 100%;
   background-repeat: no-repeat;
   padding: 3%;
   position: relative;
   color: #fff;
      .event-info-content {
         width: 100%;
         height: 100%;  
         .e-i-c-btns {
            display: flex;
            .btn {
                padding: 16px 22px;
                margin-right: 20px;
                cursor: pointer;
                border: 1px #00ffff solid;
            }
            .active {
                box-shadow: 0 0 20px #01ffff inset;
            }
         }
         .e-i-c-content{
            margin-top: 18px;
            width: 100%;
            height: calc(100% - 80px);
            .e-i-c-c-event{}
            .e-i-c-c-video{
               width: 100%;
               height: 100%;
               video{
                  width: 100%;
                  height: 100%;
                  object-fit: fill;
               }
            }
            .e-i-c-c-plan{
               width: 100%;
               height: 100%;
               .table-header{
                  width: 100%;
                  display: flex;
                  background: #113953;
                  p{
                     text-align: center;
                     width: 20%; 
                     padding: 10px 0;
                  }
               }
               .table-body{
                  height: calc(100% - 50px);
                  overflow: auto;
                  &::-webkit-scrollbar { display:none; }
                  .table-body-list{
                     display: flex;
                     align-items: center;
                     p{
                        text-align: center;
                        width: 20%; 
                        padding: 10px 0;
                        span {
                           display: inline-block;
                           padding: 5px 10px;
                           border: 1px #00fffe solid;
                           cursor: pointer;
                           border-radius: 5px;
                        }
                     }
                  }
               }
            }
         }
      }
}
</style>