<!--
 * @Author: your name
 * @Date: 2021-06-23 17:50:20
 * @LastEditTime: 2021-06-24 09:54:49
 * @LastEditors: Please set LastEditors
 * @Description: 当前物资情况
 * @FilePath: \big-screen-vue\src\views\forestFireWartime\components\MaterialAndTeam\components\materialConditions.vue
-->
<template>
  <div class="material-conditions-content">
    <ul class="left-bottom-material">
      <li v-for="(item,index) in disasterReliefList" :key="index">
        <img class="material-img" :src="item.url" alt="" />
        <div class="material-detail">
          <div style="display: flex;flex-direction: column;justify-content: space-between;">
            <p class="material-detail-type">{{item.materialName}}</p>
            <p class="material-detail-number">{{item.materialNum|conversion}}</p>
          </div>
          <p class="material-detail-unit">{{item.unit}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'materialConditions',
  props: {},
  components: {},
  data() {
    return {
      // 当前救灾物资
      disasterReliefList: [
        {
          url: require('../images/icon_car.png'),
          materialName: '消防车',
          materialNum: 124,
          unit: '辆'
        },
        {
          url: require('../images/icon_annihilator.png'),
          materialName: '灭火器',
          materialNum: 1242,
          unit: '个'
        },
        {
          url: require('../images/icon_helicopter.png'),
          materialName: '直升机',
          materialNum: 123,
          unit: '辆'
        },
        {
          url: require('../images/icon_UAV.png'),
          materialName: '无人机',
          materialNum: 1234,
          unit: '辆'
        },
        {
          url: require('../images/icon_people.png'),
          materialName: '防护服',
          materialNum: 12345,
          unit: '套'
        },
        {
          url: require('../images/icon_spray.png'),
          materialName: '喷雾机',
          materialNum: 12345,
          unit: '台'
        },
        {
          url: require('../images/icon_satellite_phone.png'),
          materialName: '卫星电话',
          materialNum: 12345,
          unit: '台'
        },
        {
          url: require('../images/icon_chain_saw.png'),
          materialName: '油锯',
          materialNum: 12345,
          unit: '台'
        },
        {
          url: require('../images/icon_satellite_phone.png'),
          materialName: '卫星电话',
          materialNum: 12345,
          unit: '台'
        },
        {
          url: require('../images/icon_chain_saw.png'),
          materialName: '油锯',
          materialNum: 12345,
          unit: '台'
        },
      ],
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>
<style lang='less' scoped>
.material-conditions-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 3%;
  &::-webkit-scrollbar {
    display: none;
  }
  /* 救火物资情况 */
  .left-bottom-material {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    li {
      width: 48%;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-bottom: 5%;
      .material-img {
        display: block;
        height: auto;
        width: 60px;
      }
      .material-detail {
        height: 100%;
        flex: 1;
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 2% 0;
        .material-detail-type {
          white-space: nowrap;
          color: white;
          font-size: var(--mini-font);
          line-height: var(--middle-font);
        }
        .material-detail-number {
          white-space: nowrap;
          color: #00ffff;
          font-size: var(--mini-number-font);
          font-weight: bold;
        }
        .material-detail-unit {
          white-space: nowrap;
          color: white;
          font-size: var(--mini-font);
          line-height: var(--middle-font);
          align-self: flex-end;
          // position: absolute;
          // right: -var(--middle-font);
          // bottom: var(--super3-mini-font);
        }
      }
    }
  }
}
</style>