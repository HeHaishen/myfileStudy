<!--
 * @Description: 应急信息
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-10 15:34:21
 * @LastEditTime: 2021-10-27 10:36:12
-->
<template>
  <div>
    <ModelBox :title="title" class="c-mybox-position" style="z-index: 8100">
      <template slot="content">
        <div class="content-all">
          <ul class="list">
            <li
              v-for="(i, k) in list"
              :key="i.id"
              :class="i.click ? 'click-li' : ''"
              @click="doLiClick(i,k)"
            >
              <div class="img_wrap">
                <img :src="i.icon" />
              </div>
              <div class="title_text">{{ i.title }}</div>
            </li>
          </ul>
        </div>
      </template>
    </ModelBox>
  </div>
</template>

<script>
import ModelBox from "@/views/majorFestivalsConductor/components/modelBox/index.vue";

export default {
  components: { ModelBox },
  data() {
    return {
      title: "专题研判",
      list: [
        {
          id: 1,
          title: "灾害事故",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_disasters_accidents.png"),
          checked: false,
          click: false,
        },
        {
          id: 2,
          title: "防风防汛",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_stormf_lood.png"),
          checked: false,
          click: false,
        },
        {
          id: 3,
          title: "森林防火",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_fortes_fire.png"),
          checked: false,
          click: false,
        },
        {
          id: 4,
          title: "地震地灾",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_earthquake.png"),
          checked: false,
          click: false,
        },
        {
          id: 5,
          title: "危化品监管",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_dangerous.png"),
          checked: false,
          click: false,
        },

        {
          id: 6,
          title: "交通人口",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_traffic.png"),
          checked: false,
          click: false,
        },
        {
          id: 7,
          title: "住建人口",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_living.png"),
          checked: false,
          click: false,
        },
        {
          id: 8,
          title: "疫情防控",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_epidemic.png"),
          checked: false,
          click: false,
        },
        {
          id: 9,
          title: "安全执法",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_Security.png"),
          checked: false,
          click: false,
        },
        {
          id: 10,
          title: "矿山监控",
          icon: require("@/assets/images/emergencyOrganizationCommandWar/icon_mining_regulation.png"),
          checked: false,
          click: false,
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    doLiClick(i,k){
      this.list[k].click =  !i.click
      let functionObj = {
        1:"",
        2:"",
        3:"",
        4:"",
        5:"",
        6:"",
        7:"",
        8:"",
        9:"",
        10:"",
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
