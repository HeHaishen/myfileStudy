<!--
 * @Description: 菜单栏
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: JiaJun Wu
 * @Date: 2021-10-28 09:32:47
 * @LastEditTime: 2021-11-08 10:52:57
-->
<template>
  <div class="menus">
    <div class="menus-inner" ref="menuInner">
      <ul class="menus-list" ref="menuList">
        <li v-for="(i, k) in menusList" :key="i.id" @click="liClick(i, k)" class="li-list">
          <div class="menus-img">
            <img :src="choseObj.id === i.id ? choseObj.icon : i.icon" alt="" />
          </div>
          <div class="hidden-text">{{ i.title }}</div>
          <div class="menus-text">{{ i.title }}</div>
        </li>
      </ul>
    </div>
    <div class="btn-opation press-btn" @click="pressClick">︿</div>
    <div class="btn-opation next-btn" @click="nextClick">﹀</div>
  </div>
</template>

<script>
const defaultIcon = require("@/assets/images/emergencyOrganizationCommandWar/img_menus.png");
const choseIcon = require("@/assets/images/emergencyOrganizationCommandWar/img_chose_menus.png");
export default {
  data() {
    return {
      choseObj: {
        id: 1,
        title: "指令下达",
        icon: choseIcon,
        link: "",
      },
      menusList: [
        {
          id: 1,
          title: "指令下达",
          icon: defaultIcon,
          link: "",
        },
        {
          id: 2,
          title: "指令跟踪",
          icon: defaultIcon,
          link: "",
        },
        {
          id: 3,
          title: "进展情况",
          icon: defaultIcon,
          link: "",
        },
        // {
        //   id: 4,
        //   title: "风险隐患",
        //   icon: defaultIcon,
        //   link: "",
        // },
        // {
        //   id: 4,
        //   title: "队伍调度",
        //   icon: defaultIcon,
        //   link: "",
        // },
        // {
        //   id: 5,
        //   title: "物质情况",
        //   icon: defaultIcon,
        //   link: "",
        // },
      ],
    };
  },
  created() {
    this.$emit("clickMenu", { choseObj: { ...this.choseObj } });
  },
  methods: {
    liClick(i, k) {
      this.choseObj = JSON.parse(JSON.stringify(i));
      this.choseObj.icon = choseIcon;
      this.$emit("clickMenu", { choseObj: { ...this.choseObj } });
    },
    pressClick() {
      console.log(
        this.$refs.menuInner.clientHeight,
        window.getComputedStyle(this.$refs.menuInner).top
      );
      console.log(
        this.$refs.menuList.clientHeight,
        window.getComputedStyle(this.$refs.menuInner).getPropertyValue("top")

      );
    },
    nextClick() {
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
