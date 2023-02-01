<!--
 * @Description: 应急综合管理平台
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-03 19:04:06
 * @LastEditTime: 2021-08-04 14:48:15
-->
<template>
  <div class="center-btns-list">
    <ul>
      <li
        v-for="(i, k) in btnsList"
        :key="k"
        :class="[btnActive === k ? 'active' : '']"
        @click="btnClick(i, k)"
      >
        <p>{{ i.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnActive: 0,
      btnsList: [
        {
          name: "平时",
          key: 0,
          pageType:'normal'
        },
        {
          name: "防风",
          key: 1,
           pageType:'wind'
        },
        {
          name: "防爆雨",
          key: 2,
           pageType:'rain'
        },
        {
          name: "防汛",
          key: 3,
           pageType:'floodControl'
        },
        {
          name: "防旱",
          key: 4,
           pageType:'droughtControl'
        },
      ],
    };
  },
  mounted() {},
  methods: {
    btnClick(i, k) {
      this.btnActive = k;
      this.$emit("btnActive", { ...i, index: k });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common";
.center-btns-list {
  width: auto;
  height: 102vh * @h;
  position: fixed;
  top: 243vh * @h;
  left: 50%;
  transform: translateX(-50%);
  z-index:8888;
  ul {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    li {
      height: 92vh * @h;
      line-height: 92vh * @h;
      padding: 0 54vw * @w;
      .box-sizing();
      font-size: 50vh * @h;
      color: white;
      font-weight: bold;
      border: 4vh * @h solid #4a8fee;
      border-image: -webkit-linear-gradient(#4c8deb, #2cb8f5) 1 20;
      border-image: -moz-linear-gradient(#4c8deb, #2cb8f5) 1 20;
      border-image: -o-linear-gradient(#4c8deb, #2cb8f5) 1 20;
      border-image: linear-gradient(#4c8deb, #2cb8f5) 1 20;
      margin-right: 160vw * @w;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    li:last-child {
      margin-right: 0;
    }
    .active {
      background: linear-gradient(to bottom, #4c8deb 0%, #2cb8f5 100%);
    }
  }
}
</style>
