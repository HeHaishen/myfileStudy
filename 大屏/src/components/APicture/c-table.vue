<!--
 * @Description: 自定义table组件
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-20 20:35:19
 * @LastEditTime: 2021-08-25 21:40:23
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
      >
        <p>{{ i.title }}</p>
      </div>
    </div>
    <ul class="list-body" ref="cTableBody">
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
            <span @click="tableTdClick(i, k, item, keys)">{{
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
  data() {
    return {};
  },
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
  },
  watch: {
    listData: {
      handler: function (newVal, oldVal) {
        this.init();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      // let tables = document.querySelector(".c-tables");
      // let headDiv = document.querySelector(".list-header");
      // let bodyDiv = document.querySelector(".list-body");
      // console.log("list-header", headDiv.clientHeight, bodyDiv.clientHeight);
      // bodyDiv.style.height = tables.clientHeight - headDiv.clientHeight + "px";
      // console.log(this.$refs.cTable.clientHeight,
      // this.$refs.cTableHeader.clientHeight,
      // this.$refs.cTableBody,)
      this.$nextTick(() => {
        if (
          this.$refs.cTable.clientHeight -
            this.$refs.cTableHeader.clientHeight ===
          0
        ) {
          this.$refs.cTableBody.style.height = "auto";
          this.$refs.cTableBody.style.maxHeight = "88%";
        } else {
          this.$refs.cTableBody.style.height =
            this.$refs.cTable.clientHeight -
            this.$refs.cTableHeader.clientHeight +
            "px";
        }
      });
    },
    // 表格每个单元格点击
    tableTdClick(i, k, item, keys) {
      this.$emit("tableTdClick", {
        lineItem: i,
        lineKey: k,
        columnsItem: item,
        columnsKeys: keys,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@w:100 /5760;
// @h:100 /1079;
@h:100 /1080;
.box-sizing() {
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.border-radisu(@x, @y) {
  border-radius: @x @y;
  -o-border-radius: @x @y;
  -ms-border-radius: @x @y;
  -moz-border-radius: @x @y;
  -webkit-border-radius: @x @y;
}
.box-shadow() {
  box-shadow: 0 0 10vh * @h #00eaff inset;
  -o-box-shadow: 0 0 10vh * @h #00eaff inset;
  -ms-box-shadow: 0 0 10vh * @h #00eaff inset;
  -moz-box-shadow: 0 0 10vh * @h #00eaff inset;
  -webkit-box-shadow: 0 0 10vh * @h #00eaff inset;
}
.c-tables {
  width: 100%;
  height: 100%;
  //   overflow: auto;
  .list-header {
    width: 100%;
    // min-height:64vh*@h;
    height: auto;
    display: flex;
    padding: 19vh * @h 0;
    background: #213e5c;
    .box-sizing();
    align-items: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      font-size: 17vh * @h;
      color: white;
      font-weight: bold;
      p {
        width: auto;
        height: auto;
      }
    }
  }
  .list-body {
    width: 100%;
    height: auto;
    background: #11213a;
    overflow: auto;
    li {
      height: auto;
      flex-wrap: nowrap;
      margin: 4vh * @h 0;
      background: #162741;
      display: flex;
      justify-content: flex-start;
      div {
        color: white;
        font-size: 17vh * @h;
        padding: 9vh * @h 4vw * @w;
        .box-sizing();
        text-align: center;
        line-height: 28vh * @h;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
        }
      }
    }
    .double-columns {
      background: #192d50;
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
</style>
