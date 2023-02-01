<!--
 * @Description: 时间轴
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-05 16:06:34
 * @LastEditTime: 2021-07-06 12:39:41
-->
<template>
  <div class="flex-time-wrap" :style="{width:timmerLineObj.width}">
    <div class="time-inner">
      <div class="time-line">
        <!-- 刻度 -->
        <div class="calibration" :style="{width:timmerLineObj.innerWidth}">
          <div style="height: 86px">
            <p class="calibration-hours">{{ 0 }}小时</p>
            <p class="calibration-time">
              {{ beginTime.toLocaleTimeString().slice(2, -3) }}
            </p>
          </div>
          <div
            class="calibration-inner"
            v-for="(item, key) in timmerLineObj.nodeNum"
            :key="item"
            :style="item % 5 === 0 ? 'height:86px' : ''"
          >
            <p v-if="item % 5 === 0 ? true : false" class="calibration-hours">
              {{ item / 5 }}小时
            </p>
            <p v-if="item % 5 === 0 ? true : false" class="calibration-time">
              {{
                new Date(beginTime.getTime() + (item / 5) * 60 * 1000 * 60)
                  .toTimeString()
                  .slice(0, 5)
              }}
            </p>
            <p
              v-if="
                new Date(beginTime.getTime() + (item / 5) * 60 * 1000 * 60)
                  .toTimeString()
                  .slice(0, 3) === '00:' && item % 5 === 0
              "
              class="calibration-time"
              style="
                top: 122px;
                color: white;
                width: auto;
                white-space: nowrap;
                word-break: keep-all;
              "
            >
              {{
                new Date(beginTime.getTime() + (item / 5) * 60 * 1000 * 60)
                  .toJSON()
                  .slice(0, 10)
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="hour-number" v-if="false">
        <!-- <p v-for="(item,key) in 25" :key="item">
          {{key < 10 ?'0':''}}{{key}}
        </p> -->
      </div>
      <div class="time-line-green" :style="{width:timmerLineObj.startPoint}">
        <div class="time-modle"></div>
      </div>
    </div>
    <div class="time-period" v-if="sixTimeModelList.length">
      <p
        v-for="(item, index) in sixTimeModelList"
        :key="index"
        :class="[timePointActive === index ? 'point-active' : '']"
        @click="timePointChange(item, index)"
      >
        时间段:{{ new Date(item).toLocaleString("chinese", { hour12: false }) }}
      </p>
    </div>
    <div class="time-long-show">
      <!-- <p>事件发生时长:<label v-if="saveTimeLong">{{(saveTimeLong - new Date(beginTime).getTime())/6000 }}</label></p> -->
      <p>
        事件发生时长:<label v-if="saveTimeLong">{{ showTimeLong() }}</label>
      </p>
    </div>
    <div class="time-begin-btn" v-if="!isAutoMove" @click="doAutoMove">▶</div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            saveMoveTime:0,
            beginTime:new Date(),
            currentMoveTime:0,// 时间轴改变的时间搓
            //时间轴配置
            timmerLineObj:{
                // 默认 24小时-120个节点，1px=32000毫秒,每个节点12分钟
                // 8小时-40个节点，1px=10666.7毫秒,每个节点12分钟
                // 6小时-30个节点，1px=8000毫秒,每个节点12分钟
                showHours: 6, //展示小时-120个节点
                nodeNum: 30,// 节点数
                onePxSecond: 8000,// 1px的毫秒数
                width:'2990px',
                innerWidth:'2700px',
                startPoint:130
            },
            lineIsDown:false,
            //  保存时长
            saveTimeLong: 0,
            sixTimeModelList:[],//时间段数组
            timePointActive:0,
            isAutoMove:true,
            timeOut: null
        }
    },
    props:{
        lineWrapWidth:{// 整个时间轴的宽度
            default:2990,
            type:Number,
            required:false
        },
        lineWidth:{// 绿色时间轴的宽度
            default:2700,
            required:false,
            type:Number
        },
        showHours:{ // 显示的时间长度
             default:6,
            required:false,
            type:Number
        }
    },
    watch:{
        lineIsDown:function(newVal,oldVal){
            if(oldVal === true && !newVal){
                let isMoveTime = new Date(this.beginTime).getTime() + this.saveMoveTime
                if(this.getNowTimeAbleMobe(isMoveTime) && this.isCurrentWidth()!=='tooSmall') {// 是否允许拖动到此点
                    this.currentMoveTime = new Date(this.beginTime).getTime() + this.saveMoveTime
                } else {
                    this.$message.warning('无法滑动到未开始时间')
                    this.initDateGreenLine() //回到当前时间点
                    this.timeLineTimoutOut() // 重新开启计算市场移动时间轴
                    this.isAutoMove = true// 
                }
            }
            console.log('watch',newVal,oldVal,this)
        }
    },
    created () {
        this.createdInit()
    },
    mounted () {
        this.$nextTick(()=>{
            this.initTimeLine()
            this.timeLineMove()
            if(this.timmerLineObj && this.timmerLineObj.showHours){
                this.timeLineTimoutOut()
            } else {
                this.$message.warning('计算错误')
                return false
            }
        })
    },
    methods: {
        //传值初始化 
        async createdInit(){
            let styleObj = {
                width: await this.lineWrapWidth + 'px',
                innerWidth: await this.lineWidth + 'px',
                startPoint:await (this.lineWrapWidth - this.lineWidth)/2 - (this.lineWidth/(this.showHours * 5)/12*2),// 起点位置
                nodeNum:await this.showHours * 5, // 节点数
                onePxSecond:await (this.showHours*1000*60*60)/this.lineWidth, //每px所代表的几秒
                showHours: this.showHours// 显示的时间长度
            }
            this.timmerLineObj = JSON.parse(JSON.stringify(styleObj))
            // this.timmerLineObj = {...styleObj}
            console.log('styleObj',styleObj,this.timmerLineObj,(this.showHours*1000*60*60))
            return styleObj
        },
        //初始化时间轴
        initTimeLine (){
            this.beginTime =  new Date() // 获取第二模块初始时间
            this.sixTimeModelList.push(this.beginTime) // 增加模块
            const greenLine = document.querySelector('.time-line-green')
            greenLine.style.width = this.timmerLineObj.startPoint;
        }, 
         // 时间轴的拖动
        timeLineMove () {
            const that = this
            let x = null
            let y = null
            let mx = null
            let my = null
            let isDown = false
            // let saveMoveTime = 0
            const greenLine = document.querySelector('.time-line-green')
            const moveModel = document.querySelector('.time-modle')
            moveModel.onmousedown = function (e) {
                that.isAutoMove = false
                isDown  = true
                if(that.timeOut){
                clearTimeout(that.timeOut)
                }
                that.lineIsDown = true
                x = e.offsetX
                y = e.offsetY
                console.log('点击的位置',x)
            }
            window.onmousemove = function (e) {
                if(!isDown) {
                return false
                }
                mx = e.offsetX
                my = e.offsetY
                
                let nl = moveModel.offsetLeft + (mx - x)
                greenLine.style.width =  nl + 'px'
                // that.saveMoveTime = ((nl - 110) * 32000) - 640000
                that.saveMoveTime = (nl - this.timmerLineObj.startPoint) * that.timmerLineObj.onePxSecond
            
                console.log('that.saveMoveTime',that.saveMoveTime)
            }
            window.onmouseup = function() {
                    //开关关闭
                    isDown = false;
                    that.lineIsDown = false
            }
            moveModel.onmouseleave = function (e) {
                isDown = false
                that.lineIsDown = false
            }
        },
        // 时间轴-时间自动滑动
        timeLineTimoutOut () {
            let second = this.timmerLineObj.onePxSecond
            let oneSecondPx =  1/second
            const greenLine = document.querySelector('.time-line-green')
            const moveModel = document.querySelector('.time-modle')
            if(this.timeOut) {
                clearTimeout(this.timeOut)
            }
            let that = this
            this.timeOut = setTimeout(()=>{
                console.log('greenLine',parseFloat(greenLine.style.width),greenLine.offsetWidth,oneSecondPx)
                // alert(333)
                this.currentMoveStep = parseFloat(greenLine.style.width);
                greenLine.style.width = parseInt((greenLine.style.width).replace('px','')) + 1 +'px'
                this.saveTimeLong =  (parseInt((greenLine.style.width).replace('px','')) - this.timmerLineObj.startPoint) * second + new Date(this.beginTime).getTime()
                clearTimeout(this.timeOut)
                // console.log('istimeout3',6666,this.timeOut)
                this.timeLineTimoutOut()
            },second)
                this.isCurrentWidth()
        },
         // 当绿色时间轴大于 2700 || 小于130 时触发
        isCurrentWidth () {
            const greenLine = document.querySelector('.time-line-green')
            let gWidth = parseInt((greenLine.style.width).replace('px',''))
            if(gWidth >= this.timmerLineObj.innerWidth){// 大于 2700 
                this.initTimeLine()
                return 'tooBig'
            } else if(gWidth < this.timmerLineObj.startPoint) { // 小于130
                return 'tooSmall'
            } else {
                return true
            }
        },
        // 暂停后重新自动播放
        doAutoMove () {
            this.isAutoMove = true
            this.beginTime= this.sixTimeModelList[this.sixTimeModelList.length-1]
            this.initDateGreenLine() //回到当前时间点
            this.timeLineTimoutOut()
        },
         //获取当前，判断是否允许拖动
        getNowTimeAbleMobe (isMoveTime) {
            let nowTime = new Date().getTime()
            if(isMoveTime < nowTime) {
                return true
            } else {
                return false
            }
        },
         // 获取时长
        showTimeLong () {
            let betweenNum = this.saveTimeLong - new Date(this.sixTimeModelList[0]).getTime()
            let second = parseInt((betweenNum/1000/60)%60) // 分钟
            let hours = parseInt((betweenNum/1000/60/60)%24)// 小时
            let datas= parseInt(betweenNum/1000/3600/24)//天
            this.isCurrentWidth()
            return `${datas>10 ? datas:'0'+ datas}天${hours>10?hours:'0'+hours}小时${second>10?second:'0'+second}分钟`
        },
        // 回到当前时间点
         initDateGreenLine(){
            let defaultPx = this.timmerLineObj.startPoint
            let pxOne = this.timmerLineObj.onePxSecond
            const greenLine = document.querySelector('.time-line-green')
            let currentTime = new Date().getTime()
            let beginNum = (this.beginTime).getTime()
            // console.log("=============>>99",defaultPx + (( currentTime - beginNum )/pxOne))
            greenLine.style.width = (defaultPx + ((currentTime - beginNum)/pxOne)) +'px'
            return false
            // let oneSecondPx =  1/second
        },
    },
    beforeDestroy() {
        this.timeOut = null
    }
}
</script>

<style lang="less" scoped>
/* 事件轴 */
.flex-time-wrap {
  width: 2990px;
  height: 227px;
  background: url("../../../assets/images/bg_time_scroll_03.png") no-repeat
    no-repeat center;
  background-size: 100% 100%;
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  padding: 13px 15px 12px 12px;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .time-inner {
    width: 100%;
    height: 100%;
    border-radius: 30px 30px;
    display: flex;
    align-items: center;
    position:relative;
    .time-line {
      width: 100%;
      height: 12px;
      background: #01ffff;
    }
    .calibration{
      // width:2772px;
      width:2700px;
      height:auto;
      position:absolute;
      // background:yellow;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      display:flex;
      justify-content:space-between ;
      align-items: center;
      div{
        width:2px;
        height:54px;
        background:#01ffff;
        position:relative;
        .calibration-hours{
          flex-shrink: 0;
          height:100%;
          line-height: 26px;
          color:#00ffff;
          font-size:26px;
          width:120px;
          text-align: left;
          position:absolute;
          top: -36px;
          left: -30px;
          width: 120px;
          height: 26px;
        }
        .calibration-time{
            flex-shrink: 0;
            height:100%;
            line-height: 26px;
            color:#00ffff;
            font-size:26px;
            width:120px;
            text-align: left;
            position:absolute;
            bottom: -36px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 26px;
            text-align: center;
        }
        
      }
    }
    .time-line-green{
      width: 20%;
      height: 12px;
      background:#58fa44;
      position:absolute;
      left: 0;
      top:50%;
      transform: translateY(-50%;);
      .time-modle{
        width:48px;
        height:140px;
        background:url("../../../assets/images/forestFire/bg_timmer_btn_06.png");
        background-size:100% 100%;
        position:absolute;
        right:-48px;
        top:50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
    .hour-number{
      width:2772px;
      height:26px;
      position:absolute;
      left:50%;
      top:20px;
      transform: translateX(-50%);
      display:flex;
      justify-content: space-around;
      p{
        flex-shrink: 0;
        height:100%;
        line-height: 26px;
        color:#00ffff;
        font-size:26px;
        width:120px;
        text-align: center;
      }
    }
  }
  .time-period{
    max-width:2900px;
    width:auto;
    height:46px;
    border-top:1px solid #00fefc;
    border-left:1px solid #00fefc;
    border-right:1px solid #00fefc;
    position:absolute;
    top:-46px;
    left:46px;
    display:flex;
    p{
      height:100%;
      line-height: 46px;
      color:white;
      font-size:24px;
      padding:0 16px;
      cursor: pointer;  
      word-break:keep-all;       
      white-space:nowrap;        /* 不换行 */
    }
    p:hover{
      box-shadow: 0 0 12px #00fefc inset;
    }
    .point-active{
      box-shadow: 0 0 12px #00fefc inset;
    }
  }
  .time-long-show{
    width:auto;
    height:72px;
    position:absolute;
    top:-103px;
    left:50%;
    transform: translateX(-50%);
    p{
      color:#00ffff;
      font-size:32px;
      line-height: 72px;
    }
  }
}
 .time-begin-btn{
    width:80px;
    height:80px;
    border-radius: 50% 50%;
    border:1px #00fefc solid;
    box-shadow: 0 0 18px #00fefc inset;
    position: absolute;
    top:-140px;
    left:50%;
    transform:translateX(-50%);
    color:white;
    text-align: center;
    font-size:46px;
    line-height:80px;
    cursor: pointer;
  }
</style>
