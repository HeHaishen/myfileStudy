<!--
 * @Description: 三防菜单
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-17 14:34:22
 * @LastEditTime: 2021-09-17 15:56:51
-->
<template>
  <div class="threeProofing-menus">
    <ul class="threeProofing-menus-ul" v-if='false'>
      <li v-for="(i, k) in menusList" :key="k" @click="doLink(i, k)" :class="$route.path === i.toLink ? 'current-router' : ''">
        {{ i.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menusList: [
        {
          name: "雨量色斑图",
          key: "0",
          toLink: "/threeProoingRainfallColor",
        },
        {
          name: "雨量数据表",
          key: "1",
          toLink: "/threeProoingRainfallDatas",
        },
        {
          name: "风情数据表",
          key: "2",
          toLink: "/threeProoingWindDatas",
        },
      ],
    };
  },
  methods: {
    doLink(item, keys) {
      let sendQuery = item.query ? item.query : {};
      this.$router.push({
        path: item.toLink ? item.toLink : "/",
        query: sendQuery,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '../index.less';
.threeProofing-menus {
  width: 100%;
  height: 100%;
  overflow: auto;
  .threeProofing-menus-ul {
    width: auto;
    height: 65vh * @h;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      height: auto;
      padding: 8vh * @h 24vw * @w 8vh * @h 21vw * @w;
      .box-sizing();
      color: white;
      font-size: 16vh * @h;
      cursor: pointer;
    }
    li:hover {
      color: #00ffff;
    }
    .current-router {
      color: #00ffff;
    }
  }
}
</style>
