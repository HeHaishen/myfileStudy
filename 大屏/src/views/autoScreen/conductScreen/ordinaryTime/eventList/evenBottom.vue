<!--
 * @Author: your name
 * @Date: 2021-06-17 19:39:10
 * @LastEditTime: 2021-06-17 21:08:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-screen-vue\src\views\autoScreen\conductScreen\ordinaryTime\eventList\evenBottom.vue
-->
<template>
  <div class="info-palette-bottom">
    <info-title title="重大危险信息源"></info-title>
    <a-table :columns="columns" :rowKey="(record,index)=>index" :dataSource="dataSource" :bordered="false" :pagination="false">
      <template slot="source" slot-scope="text,record">
        <span class="source" :style="{backgroundColor:levelColor(record.source)}">{{record.source}}</span>
      </template>
    </a-table>
    <div class="event-total">
      <div class="public-title">
        全市重大危险源统计
      </div>
      <div class="total-list">
        <span>重大危险源企业</span>
        <span>20<i>家</i></span>
      </div>
      <div class="total-list">
        <span>涉氨企业</span>
        <span>20<i>家</i></span>
      </div>
      <div class="total-list">
        <span>剧毒化学品</span>
        <span>20<i>家</i></span>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import InfoTitle from './components/infoTitle.vue'
export default {
  name: '',
  props: {},
  components: { vueSeamlessScroll, InfoTitle },
  data() {
    return {
      columns: [{
        title: '区域',
        dataIndex: 'district',
        align: 'center',
        ellipsis: true,
        scopedSlots: { customRender: 'district' }
      }, {
        title: '重大危险源',
        dataIndex: 'source',
        align: 'center',
        ellipsis: true,
        scopedSlots: { customRender: 'source' }
      }, {
        title: '探头',
        dataIndex: 'probe',
        align: 'center',
        ellipsis: true,
        scopedSlots: { customRender: 'probe' }
      },],
      dataSource: [
        {
          'district': '天河区',
          'source': '8',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '15',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '8',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '4',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '33',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '15',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '22',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '20',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '10',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '0',
          'probe': '2个',
        }, {
          'district': '天河区',
          'source': '16',
          'probe': '2个',
        }],
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {
    levelColor(val) {
      if (val <= 10) {
        return 'blue'
      } else if (val <= 20) {
        return 'orange'
      } else {
        return 'red'
      }
    }
  }
}
</script>
<style lang='less' scoped>
@h:100 /3200;
@w:100 /1920;
.info-palette-bottom {
  width: 100%;
  height: 48%;
  background: url('./images/info-border.png') no-repeat;
  background-size: 100% 100%;
  padding: @h*65vh @w*67vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .source {
    display: inline-block;
    width: @w*260vw;
    height: @h*60vh;
    box-sizing: border-box;
  }
  .event-total {
    width: @w*1288vw;
    height: @h*200vw;
    background: url('./images/total-border.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    .public-title {
      position: absolute;
      top: -@h*21vh;
      left: 50%;
      transform: translateX(-50%);
      font-size: @h*42vh;
      font-weight: bold;
      color: #00e9ea;
    }
    .total-list {
      height: 100%;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span {
        color: #00e9ea;
        font-size: @h*30vh;
      }
      span + span {
        margin-top: @h*14vh;
        font-size: @h*28vh;
        i {
          color: #fff;
        }
      }
    }
    .total-list:nth-child(3) {
      width: 20%;
    }
  }
  /deep/.ant-table-tbody > tr {
    cursor: pointer;
  }
  /deep/.ant-table-tbody > tr > td {
    padding: 10px 3px !important;
  }
  /deep/.ant-table-thead
    > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td,
  /deep/.ant-table-tbody
    > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td,
  /deep/.ant-table-thead
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td,
  /deep/.ant-table-tbody
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background: transparent !important;
  }
  /deep/.ant-table-tbody > tr > td {
    border-bottom: none !important;
    height: @h*80vh;
    color: #fff;
    padding: 0px !important;
    font-size: @h*30vh;
  }
  /deep/.ant-table-tbody > tr:nth-of-type(even) {
    background: #223660 !important;
    height: @h*66vh;
  }
  /deep/.ant-table-thead > tr > th {
    border-bottom: none !important;
    background: #223660 !important;
    height: @h*66vh;
    color: #fff;
    padding: 0px !important;
    font-size: @h*30vh;
    font-weight: bold;
  }
  /deep/.ant-table-placeholder {
    background: transparent !important;
    border-bottom: none !important;
  }
  .radio-style {
    margin: 5px 0;
  }
  /deep/.ant-radio-button-wrapper {
    margin: 0 5px;
    &:last-child,
    &:first-child {
      border-radius: 0;
    }
  }
  /deep/.ant-radio-group-solid
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #2056b0;
    border-color: #2056b0;
  }
}
</style>
