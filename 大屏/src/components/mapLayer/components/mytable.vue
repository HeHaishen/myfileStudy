<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-30 17:57:10
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-11-08 18:39:32
-->
<template>
  <div class="c-tables" ref="cTable">
    <div class="list-header" ref="cTableHeader">
      <div
        v-for="(i, k) in columns"
        :key="k"
        :style="{
          width: i.width ? i.width : 100 / columns.length + '%',
        }"
        class="listdiv"
      >
        <p>
          <slot :name="i.soltIndex" :record="i" :text="i.soltIndex" >
             {{ i.title }}
          </slot>
        </p>
      </div>
    </div>

    <ul class="list-body" ref="cTableBody">
      <slot name="slotbox"></slot>
      <li
        v-for="(i, k) in listData"
        :key="k"
        :class="[k % 2 === 0 ? 'double-columns' : '']"
      >
        <div
          v-for="(item, keys) in columns"
          :key="keys"
          :style="{
            width: item.width ? item.width : 100 / columns.length + '%',
          }"
        >
          <slot
            :name="item.textIndex"
            :record="i"
            :text="i[item.textIndex]"
            :index="k"
          >
            <span @click="tableTdClick(i, k, item, keys)" :title="i[item.textIndex]">{{
              i[item.textIndex]
            }}</span>
          </slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    columns: {
      // 表头数组
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    listData: {
      // 展示数据数组
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    areaShow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      tableList: [],
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
    };
  },
  computed: {},
  watch: {},
  methods: {
      tableTdClick(i, k, item, keys) {
      this.$emit("tableTdClick", {
        lineItem: i,
        lineKey: k,
        columnsItem: item,
        columnsKeys: keys,
      });
    },
  },
  created() {},
};
</script>
<style lang='less' scoped>
.box-sizing() {
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.c-tables {
  width: 100%;
  height: 100%;
  //   overflow: auto;
  position: relative;
  .list-header {
    width: 100%;
    height: auto;
    display: flex;
    min-height: 30px;
    background: #103053;
    position: relative;
    .box-sizing();
    align-items: center;
    .listdiv {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      font-size: 15px;
      color: white;
      font-weight: 600;
      p {
        width: auto;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .list-body {
    width: 100%;
    height: auto;
    background: #103053;
    overflow-y: auto;
    position: relative;
    li {
      height: auto;
      flex-wrap: nowrap;
       background: #103053;
      display: flex;
      justify-content: flex-start;
      div {
        color: white;
         font-size: 14px;
        .box-sizing();
        text-align: center;
        line-height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
           overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
      }
    }
    .double-columns {
      background: #015478;
    }
  }
}
*::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  box-shadow: inset 0 0 1px rgba(44, 152, 255, 0.2);
  background: #2c98ff;
}
*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 1px rgba(44, 152, 255, 0.2);
  border-radius: 2px;
  background: #030c22;
}
.double-columns {
  background: #192d50;
}
</style>