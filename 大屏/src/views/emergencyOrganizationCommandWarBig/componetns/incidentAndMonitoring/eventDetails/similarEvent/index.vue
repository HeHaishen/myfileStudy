<template>
  <div class="similar-event">
    <pop-up-layer :show="true" :setStyles="{}" @doClose="close" opsition="pageRight" :title="contentObj.accTitile" ref="myPopUpLayer" class="similar-pop">
      <template slot="content">
        <div class="content">

          <div class="similar-info">
            <ul>
              <li v-for="(i) in labelObj" :key="i.id">
                <div class="li-label">
                  <label for="">{{ i.label }}</label>
                </div>
                <div class="li-content">
                  <div>{{ contentObj[i.contentKeys] ? contentObj[i.contentKeys] : "-" }}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="similar-tab">
            <p v-for="(item,index) in similarTab" :key='index' :class="[similarIndex==index?'similar-btn':'']" @click='similarBtn(index)'>
              {{item.name}}
            </p>
          </div>
          <div class="overview-event" v-show='similarIndex==0'>
            <ul>
              <li v-for="(i) in overviewObgj" :key="i.id">
                <div class="li-label">
                  <label for="">{{ i.label }}</label>
                </div>
                <div class="li-content">
                  <div>{{ contentObj[i.contentKeys] ? contentObj[i.contentKeys] : "-" }}</div>
                </div>
              </li>
            </ul>
          </div>

          <survey-status v-show='similarIndex==1' :sid='contentObj.sid'></survey-status>
          <duty-detail v-show='similarIndex==2' :sid='contentObj.sid'></duty-detail>
        </div>

      </template>
    </pop-up-layer>
  </div>
</template>

<script>
import surveyStatus from '../surveyStatus/index'
import dutyDetail from '../dutyDetail/index'

export default {
  props: {
    similarShow: {
      type: Boolean,
      default: false
    },
    contentObj: {
      type: Object,
      default: () => { { } }
    },
  },
  components: {
    surveyStatus, dutyDetail
  },
  data() {
    return {
      eventShow: true,
      title: '事件详情',
      labelObj: [
        {
          id: 1,
          label: "事件时间：",
          contentKeys: "accDate",
        },
        {
          id: 2,
          label: "事发地点：",
          contentKeys: "accPlace",
        },
        {
          id: 3,
          label: "事故类型：",
          contentKeys: "accType",
        },
        {
          id: 4,
          label: "事故等级：",
          contentKeys: "accLevel",
        },
        {
          id: 5,
          label: "事故单位：",
          contentKeys: "accCompany",
        },
        {
          id: 6,
          label: "死亡人数：",
          contentKeys: "deathNum",
        },
        {
          id: 7,
          label: "直接经济损失：",
          contentKeys: "economyLoss",
        },
      ],
      similarTab: [
        {
          id: 1,
          name: '事件概览',
        },
        {
          id: 2,
          name: '调查情况详情',
        },
        {
          id: 3,
          name: '追责情况详情',
        },
      ],
      similarIndex: 0,
      overviewObgj: [
        {
          id: 1,
          label: "档案编号：",
          contentKeys: "fileNum",
        },
        {
          id: 2,
          label: "事故编号：",
          contentKeys: "accNum",
        },
        {
          id: 3,
          label: "事故标题：",
          contentKeys: "accTitile",
        },
        {
          id: 4,
          label: "事故单位：",
          contentKeys: "accCompany",
        },
        {
          id: 5,
          label: "所属行业：",
          contentKeys: "trades",
        },
        {
          id: 6,
          label: "所属区域：",
          contentKeys: "areas",
        },
        {
          id: 7,
          label: "事故发生时间：",
          contentKeys: "accDate",
        },
        {
          id: 8,
          label: "事故发生地点：",
          contentKeys: "accPlace",
        },
        {
          id: 9,
          label: "死亡人数：",
          contentKeys: "deathNum",
        },
        {
          id: 10,
          label: "受伤人数：",
          contentKeys: "injuredNum",
        },
        {
          id: 11,
          label: "伤亡人数：",
          contentKeys: "injuredDeathNum",
        },
        {
          id: 12,
          label: "事故类型：",
          contentKeys: "accType",
        },
        {
          id: 13,
          label: "事故等级：",
          contentKeys: "accLevel",
        },
      ]
    }
  },
  mounted() {
    console.log(this.detailObj);
  },
  methods: {
    close() {
      console.log(11111);
      this.$emit('similarClose')
      //   this.similarShow = false
    },
    similarBtn(index) {
      this.similarIndex = index
    }
  }
}
</script>

<style lang='less' scope>
@import '../../../../common.less';

.similar-event {
  .similar-pop {
    width: 1600px;
  }
  .similar-info,
  .overview-event {
    ul {
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        height: auto;
        display: flex;
        padding: 13px 32px 13px 0;
        color: white;
        .li-label {
          width: 270px;
          flex-shrink: 0;
          label {
            display: inline-block;
            width: 100%;
            text-align: right;
            font-size: 31px;
          }
        }
        .li-content {
          font-size: 31px;
        }
      }
    }
  }

  .similar-tab {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    p {
      font-size: 30px;
      padding: 10px 15px;
      border: 1px solid rgb(1, 251, 251);
      margin-right: 15px;
      color: #fff;
      cursor: pointer;
    }
    .similar-btn {
      background-color: rgb(2, 83, 133);
    }
  }
}
</style>