<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-11-01 21:07:13
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-02 10:33:45
-->
<template>
  <div class="signal">
    <ul>
      <li
        v-for="(e, i) in responseList"
        :key="i"
        :style="{ background: e.color }"
      >
        {{ e.title }}
      </li>
    </ul>
    <div class="table">
      <mytable :columns="columns" :listData="listData">
        <template slot="theName" slot-scope="{ record, text }">
          <a-icon type="caret-down" />
        </template>
        <template slot="slotbox">
          <div class="area" v-show="areaShow">
            <ul>
              <li v-for="(e, i) in detectionarea" :key="i">
                {{ e.title }}
              </li>
            </ul>
          </div>
        </template>
      </mytable>
    </div>
  </div>
</template>

<script>
import mytable from "./mytable.vue";
export default {
  components: { mytable },
  data() {
    return {
      responseList: [
        { title: "一级响应", color: "#5E1A33" },
        { title: "二级响应", color: "#8A6C41" },
        { title: "三级响应", color: "#8A9829" },
        { title: "四级响应", color: "#0A98A7" },
      ],
      columns: [
        {
          title: "名称",
          textIndex: "name",
          width: "40%",
          soltIndex: "theName",
        },
        {
          title: "等级",
          textIndex: "parentName",
          width: "40%",
        },
        {
          title: "区县",
          textIndex: "position",
        },
      ],
      detectionarea: [
        { title: "广州市" },
        { title: "珠海区" },
        { title: "天河区" },
        { title: "番禺区" },
        { title: "荔湾区" },
        { title: "白云区" },
        { title: "黄浦区" },
        { title: "花都区" },
        { title: "南沙区" },
        { title: "从化区" },
        { title: "增城区" },
        { title: "越秀区" },
      ],
      listData: [],
      areaShow: true,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
};
</script>
<style  lang='less'   scoped>
.signal {
  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    color: #fff;
    li {
      width: 130px;
      height: 40px;
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .table {
    margin-top: 25px;
  }
}
.area {
  width: 100%;
  position: absolute;
  background: #015478;
  padding: 5px;
  top: 30px;
  left: 0;
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 21%;
      margin-bottom: 10px;
      margin-top: 5px;
      border: 1px solid #fefe7f;
      color: #fefe7f;
      height: 30px;
      border-radius: 5px;
      font-weight: 600;
      line-height: 30px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>