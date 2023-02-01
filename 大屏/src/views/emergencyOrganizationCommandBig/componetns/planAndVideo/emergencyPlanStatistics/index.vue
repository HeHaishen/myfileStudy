<!--
 * @Description: 应急预案统计
 * @Author: liuxin
 * @Date: 2021-11-01 15:30:48
 * @LastEditors:  
 * @LastEditTime: 2021-11-03 15:20:38
-->
<template>
  <div class="emergency_plan_statistics">
    <div class="public-head">应急预案统计</div>
    <div class="public-content">
      <div class="plan-box">
        <div v-for="(value,key) in planCategory" :key="key" class="plan-item" @click="planClick(key)">
          <div class="plan-content">
            <div class="plan-left">
              <img :src="imgObj[key]" alt="">
            </div>
            <div class="plan-right">
              <div class="plan-num">{{value}}</div>
              <div class="plan-title">{{key|transKey}}</div>
            </div>
          </div>
          <div class="plan-angel lt"></div>
          <div class="plan-angel rt"></div>
          <div class="plan-angel lb"></div>
          <div class="plan-angel rb"></div>
        </div>
      </div>
    </div>
    <pop-up-layer v-if="planShow" :show="planShow" @doClose="planClose" opsition="pageCenter" :title="activeKey|transKey" ref="myPopUpLayer">
      <div slot="content" class="upLayer_content">
        <UpView :activeKey='activeKey' />
      </div>
    </pop-up-layer>
    <div class="angel lt"></div>
    <div class="angel rt"></div>
    <div class="angel lb"></div>
    <div class="angel rb"></div>
  </div>
</template>

<script>
import { planBasicInformationFindPlanCategoryList } from '@/api/reservePlan/plansManage'
import UpView from "./upView.vue";

export default {
  name: "",
  props: {},
  components: { UpView },
  data() {
    return {
      planCategory: {},//预案类型 1.总体 2.专项 3.部门 4.单位和基层组织 5.其他
      planShow: false,
      activeKey: '',
      imgObj: {
        '1': require("@/assets/images/majorFestivalsConductor/ztya.png"),
        '2': require("@/assets/images/majorFestivalsConductor/zxya.png"),
        '3': require("@/assets/images/majorFestivalsConductor/bmya.png"),
        '4': require("@/assets/images/majorFestivalsConductor/dwjcya.png"),
        '5': require("@/assets/images/majorFestivalsConductor/qtya.png"),
      },
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
    this.doQuery()
  },
  filters: {
    transKey(value) {
      switch (String(value)) {
        case '1':
          return '总体预案';
        case '2':
          return '专项预案';
        case '3':
          return '部门预案';
        case '4':
          return '单位和基层组织预案';
        case '5':
          return '其他预案';
      }
    }
  },
  methods: {
    // 查询初始化
    async doQuery() {
      const res = await planBasicInformationFindPlanCategoryList()
      if (res.success) {
        this.planCategory = res.body
        this.planCategory[5] = 0
      }
    },
    // 当前选择的预案分类 点击事件
    async planClick(type) {
      console.log('当前选择的预案分类', type);
      this.activeKey = type
      this.planShow = true;
    },
    /** 关闭更多页面 */
    planClose() {
      this.planShow = false;
    },
  },
};
</script>
<style lang='less' scoped>
@import '../../../common.less';
.emergency_plan_statistics {
  border: 2px solid #015ebd;
  width: 100%;
  height: 580px;
  position: relative;
  background-color: #001941;
  .plan-box {
    display: flex;
    flex-wrap: wrap;
    .plan-item {
      color: #fff;
      font-size: 30px;
      width: 352px;
      height: 186px;
      margin: 0 20px;
      position: relative;
      border: 1px solid #2894ff94;
      &:nth-of-type(-n + 3) {
        margin-bottom: 40px;
      }
      &:nth-of-type(3n) {
        margin-right: 0px;
      }

      .plan-angel {
        position: absolute;
        width: 10px;
        height: 10px;
        &.lt {
          left: -1px;
          top: -1px;
          border-top: 3px solid #2892ff;
          border-left: 3px solid #2892ff;
        }
        &.rt {
          right: -1px;
          top: -1px;
          border-top: 3px solid #2892ff;
          border-right: 3px solid #2892ff;
        }
        &.rb {
          bottom: -1px;
          right: -1px;
          border-bottom: 3px solid #2892ff;
          border-right: 3px solid #2892ff;
        }
        &.lb {
          bottom: -1px;
          left: -1px;
          border-bottom: 3px solid #2892ff;
          border-left: 3px solid #2892ff;
        }
      }
      &:nth-of-type(even) {
        border: 1px solid #fbff2894;
        .plan-angel {
          &.lt {
            border-top: 3px solid #fbff28;
            border-left: 3px solid #fbff28;
          }
          &.rt {
            border-top: 3px solid #fbff28;
            border-right: 3px solid #fbff28;
          }
          &.rb {
            border-bottom: 3px solid #fbff28;
            border-right: 3px solid #fbff28;
          }
          &.lb {
            border-bottom: 3px solid #fbff28;
            border-left: 3px solid #fbff28;
          }
        }
      }
      &:nth-of-type(3n) {
        border: 1px solid #00ea9b94;
        .plan-angel {
          &.lt {
            border-top: 3px solid #00ea9b;
            border-left: 3px solid #00ea9b;
          }
          &.rt {
            border-top: 3px solid #00ea9b;
            border-right: 3px solid #00ea9b;
          }
          &.rb {
            border-bottom: 3px solid #00ea9b;
            border-right: 3px solid #00ea9b;
          }
          &.lb {
            border-bottom: 3px solid #00ea9b;
            border-left: 3px solid #00ea9b;
          }
        }
      }
      &:nth-of-type(4n) {
        border: 1px solid #00d5ff94;
        .plan-angel {
          &.lt {
            border-top: 3px solid #00d5ff;
            border-left: 3px solid #00d5ff;
          }
          &.rt {
            border-top: 3px solid #00d5ff;
            border-right: 3px solid #00d5ff;
          }
          &.rb {
            border-bottom: 3px solid #00d5ff;
            border-right: 3px solid #00d5ff;
          }
          &.lb {
            border-bottom: 3px solid #00d5ff;
            border-left: 3px solid #00d5ff;
          }
        }
      }
      .plan-content {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 100%;
        height: 100%;
        .plan-left {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            display: block;
            width: 88px;
            height: 84px;
          }
        }
        .plan-right {
          // flex: 1;
          width: 200px;
          // margin-left: 20px;
          overflow: hidden;
          .plan-title {
            color: #ffffff;
            font-size: 34px;
            font-weight: bold;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
          }
          .plan-num {
            color: #ffffffcc;
            font-size: 34px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>