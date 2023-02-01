<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-02 10:52:31
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-03 18:03:10
-->
<template>
  <div class="quickReport">
    <div class="title" style="margin-top: 14px">地震等级</div>
    <div class="titlebox">
      <ul>
        <li v-for="(e, i) in titleboxList" :key="i">
          {{ e.title }}
          <img src="@/assets/images/dragonBoat/icon/u790.svg" alt=""  v-show="e.flag"  />
        </li>
      </ul>
    </div>
    <div class="title" style="margin-top: 18px">发震时刻</div>
    <div class="picker">
      <a-range-picker
        :local="{ locale }"
        size="small"
        format="YYYY-MM-DD HH:mm:ss"
        :placeholder="['开始日期时间', '结束日期时间']"
        dropdownClassName='dropdownClassName'
      >
        <a-icon slot="suffixIcon" type="calendar" />
      </a-range-picker>
    </div>
    <div class="table">
      <mytable :columns="columns" :listData="listData"> </mytable>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import mytable from "./mytable.vue";
export default {
  components: { mytable },
  data() {
    return {
      locale,
    
      titleboxList: [
        { title: "全部", flag: false },
        { title: "三级以下", flag: false },
        { title: "3-4.9级", flag: false },
        { title: "5-6.9级", flag: false },
        { title: "大于等于7级", flag: false },
      ],
      columns: [
        {
          title: "发震位置",
          textIndex: "name",
        },
        {
          title: "发震时间",
          textIndex: "parentName",
        },
        {
          title: "震级",
          textIndex: "position",
        },
        {
          title: "震源深（km）",
          textIndex: "position",
        },
      ],
      listData:[]
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
};
</script>
<style lang='less' scoped>
@import "../common.less";
/deep/.global{
  background-color: red;
  .ant-calendar{
   background-color: rgba(15, 48, 84, 0.9);
   border: 1px solid #00ffff;
}
}
.quickReport {
  .title {
    padding-left: 15px;
    color: #fff;
    font-size: 14px;
  }
  .titlebox {
    padding: 0 15px;
    .box-sizing();
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
        margin-left: 0;
        min-width: 80px;
        height: 30px;
        border: 1px solid #02a7f0;
        padding: 8px;
        cursor: pointer;
        .box-sizing();
        color: #fff;
        position: relative;
        font-size: 14px;
        img {
          position: absolute;
          display: block;
          width: 15px;
          height: 15px;
          top: -7px;
          right: -5px;
        }
      }
    }
  }
  .picker {
    padding: 0 15px;
    .box-sizing();
    margin-top: 10px;
  }
  .table {
    margin-top: 13px;
  }
}
/deep/ .ant-calendar-picker-input.ant-input {
  background: none;
  height: 100%;
  border-color: rgba(0, 255, 255, 1);
  border-radius: 5px;
  input {
    color: white;
    font-size: 14px;
  }
  span {
    color: white;
    font-size: 14px;
  }
  // .anticon-close-circle,
  // .ant-calendar-picker-clear {
  //   font-size: 20vh * @h;
  //   color: white;
  //   right: 20vw * @w;
  //   top: 50%;
  //   color: black;
  //   background: rgba(0, 0, 0, 0);
  // }
  .ant-calendar-picker-icon {
    color: #fff;
  }
}
.dropdownClassName{
  background-color: red;
}

</style>