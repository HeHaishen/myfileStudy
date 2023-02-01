<!--
 * @Description: 三防首页-雨量色斑
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-09-17 11:01:15
 * @LastEditTime: 2021-09-22 10:30:09
-->
<template>
  <div class="threeproofing-home-pages">
    <Header />
    <div class="threeproofing-content">
      <div class="threeproofing-content-inner">
        <ul class="list">
          <li
            class="list-li"
            v-for="(i, k) in listData"
            :key="k"
            @click="clickToLink(i, k)"
            @mouseover="itemsMouseover($event)"
            @mouseleave="itemsMouseleave($event)"
          >
            <div class="center-icon">
              <img :src="i.icon" alt="" />
            </div>
            <div class="pages-name">{{ i.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/APicture/threeProofingComponents/header/index.vue";
export default {
  components: { Header },
  data() {
    return {
      listData: [
        {
          name: "雨量色斑图",
          key: 0,
          icon: require("../../assets/images/threeProofingHomePages/rain_color_icon.png"),
          toLink: "/threeProoingRainfallColor",
        },
        {
          name: "雨量数据表",
          key: 1,
          icon: require("../../assets/images/threeProofingHomePages/rain_datas_icon.png"),
          toLink: "/threeProoingRainfallDatas",
        },
        {
          name: "风情数据表",
          key: 2,
          icon: require("../../assets/images/threeProofingHomePages/wind_datas_icon.png"),
          toLink: "/threeProoingWindDatas",
        },

        {
          name: "气象预警",
          key: 3,
          icon: require("../../assets/images/threeProofingHomePages/weater_wraining_icon.png"),
        },
        {
          name: "三防响应",
          key: 4,
          icon: require("../../assets/images/threeProofingHomePages/three_Proofing_respone_icon.png"),
        },
        {
          name: "潮位图",
          key: 5,
          icon: require("../../assets/images/threeProofingHomePages/tide_icon.png"),
        },

        {
          name: "台风路径",
          key: 6,
          icon: require("../../assets/images/threeProofingHomePages/typhoon_icon.png"),
        },
        {
          name: "雷达回波表",
          key: 7,
          icon: require("../../assets/images/threeProofingHomePages/radar_icon.png"),
        },
        {
          name: "水位查询",
          key: 8,
          icon: require("../../assets/images/threeProofingHomePages/water_level_icon.png"),
        },
      ],
    };
  },
  methods: {
    clickToLink(item, keys) {
      if (item.toLink) {
        let sendQuery = item.query ? item.query : {};
        this.$router.push({
          path: item.toLink ? item.toLink : "/",
          query: sendQuery,
        });
      } else {
        this.$MyMessage.warning("此功能暂未开放！");
      }
    },
    itemsMouseover(e) {
      e.currentTarget.classList.add("hover-items");
    },
    itemsMouseleave(e) {
      e.currentTarget.classList.remove("hover-items");
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
