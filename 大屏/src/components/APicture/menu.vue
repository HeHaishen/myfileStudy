<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-06-08 10:46:22
 * @LastEditTime: 2021-08-05 15:38:11
-->
<template>
  <div
    class="c-menus"
    :style="{ width: showType ? '186px' : '0px' }"
    :class="[isScale ? '' : 'c-no-scale']"
  >
    <ul v-if="showType">
      <li
        v-for="(item, index) in dataList"
        :key="index"
        @click="changeRouter(item)"
        :class="active === item.toLink ? 'active' : ''"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- <div @click="changeModel" class="c-menus-icon">{{showType?">":"<"}}</div> -->
    <div @click="changeModel" class="c-menus-icon"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        { key: 0, name: "一张图", toLink: "/" },
        { key: 1, name: "防火平时", toLink: "/forestFire?isScale=true" },
        {
          key: 2,
          name: "防火战时",
          toLink: "/floodPreventionWar?isScale=true",
        },
        { key: 3, name: "龙舟战时", toLink: "/dragonBoat?isScale=true" },
      ],
      showType: true,
      active: null,
      isScale: false,
    };
  },
  props: {},
  mounted() {
    this.active = this.$route.path;
    const cMenus = document.querySelector(".c-menus");
    let queryData = null;
    queryData = this.$route.query;
    if (queryData && queryData.isScale) {
      // 如果缩放
      this.isScale = true;
    }
    //    console.log(78965555555,this.$route.query)
  },
  methods: {
    changeModel() {
      this.showType = !this.showType;
    },
    changeRouter(i) {
      this.active = i.toLink;
      if (this.$route.path === i.toLink) {
        return false;
      } else {
        this.$router.push(i.toLink);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.c-menus {
  width: 186px;
  height: auto;
  background: url("../../assets/images/bg_menu.png") no-repeat no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  // top:50%;
  right: 0;
  // transform: translateY(-50%);
  // border:2px #01fefc solid;
  border-right: 0px;
  z-index: 99999;
  ul {
    width: 100%;
    height: auto;
    padding: 110px 0;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    li {
      width: 48px;
      height: auto;
      color: white;
      font-size: 47px;
      padding: 20px 0;
      margin: 0 auto;
      cursor: pointer;
    }
    li:hover {
      opacity: 0.6;
    }
    .active {
      // box-shadow: 0 0 20px #01fefc inset;
    }
  }
  .c-menus-icon {
    width: 21px;
    height: 118px;
    background: url("../../assets/images/bg_menu_icon.png") no-repeat no-repeat
      center;
    background-size: 100% 100%;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: -21px;
    transform: translateY(-50%);
    color: white;
    text-align: center;
    font-size: 23px;
    line-height: 118px;
  }
}
.c-no-scale {
  top: 50%;
  transform: translateY(-50%);
}
</style>
