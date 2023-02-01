<!--
 * @Description: 基础信息
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-27 14:11:37
 * @LastEditTime: 2021-10-27 15:08:05
-->
<template>
  <div class="base-message">
    <div class="people">
      <ul>
        <li v-for="(i, k) in peopleList" :key="i.id">
          <div class="icon-img">
            <img :src="i.icon" alt="" />
          </div>
          <div>{{ i.title }}</div>
          <div>
            <span>{{ i.number }}</span
            ><label>{{ i.unit }}</label>
          </div>
        </li>
      </ul>
    </div>
    <div class="message">
      <ul>
        <li v-for="(i, k) in messageList" :key="i.id">
          <div class="li-title">{{i.title}}</div>
          <div class="li-num">{{i.num}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      peopleList: [
        {
          id: 1,
          title: "人口",
          number: 10000,
          unit: "人",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_people.png"),
        },
        {
          id: 2,
          title: "人口密度",
          number: 5600,
          unit: "人/km",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_people_more.png"),
        },
      ],
      messageList: [
        {
          id: 1,
          title: "取水点",
          num: "0",
        },
        {
          id: 2,
          title: "人员密集场所",
          num: "0",
        },
        {
          id: 3,
          title: "交通情况",
          num: "0",
        },
        {
          id: 4,
          title: "高危企业",
          num: "0",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
