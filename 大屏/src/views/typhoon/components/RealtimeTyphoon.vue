<template>
  <div class="five-minutes">
    <div class="search-box">
      <div class="search-row">
        <label class="title" for="">实战场景：</label>
        <a-radio-group :value="radioDefaultScene" class="radio-style" size="small" button-style="solid" @change="dataChange">
          <a-radio-button v-for="item in radioDataScene"  :key="item.value" :value="item.value" @click="onChange(item)">
            {{item.title}}
          </a-radio-button>
        </a-radio-group>
      </div>
      <div class="search-row">
        <label class="title" for="">风速选择：</label>
        <a-radio-group :value="radioDefaultSpeed" class="radio-style" size="small" button-style="solid" @change="dataChangeSpeed">
          <a-radio-button v-for="item in radioDataSpeed"  :key="item.value" :value="item.value" @click="onChangeSpeed(item)">
            {{item.title}}
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <div class="five-date">{{moment().format('YYYY-MM-DD HH:mm:ss')}}至{{moment().format('YYYY-MM-DD HH:mm:ss')}}</div>
    <div class="list-th">
      <span class="grade">排名</span>
      <span class="district">站点</span>
      <span class="date">当前风速风向</span>
    </div>
    <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="grade">
            <span class="grade-box">{{index+1}}</span>
          </span>
          <span class="district" v-text="item.district"></span>
          <span class="date" v-text="item.date"></span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import moment from 'moment'
export default {
  name: 'echartsTable',
  props: {},
  components: { vueSeamlessScroll },
  data() {
    return {
      listData: [
        {
          'district': '海珠大岗镇新联一村',
          'grade': '1',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '南沙大岗镇新联一村',
          'grade': '2',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '荔湾大岗镇新联一村',
          'grade': '3',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '天河大岗镇新联一村',
          'grade': '2',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '花都大岗镇新联一村',
          'grade': '3',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '越秀大岗镇新联一村',
          'grade': '0',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '1',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '2',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '3',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '0',
          'date': '7.6m/s(4级)东南',
        }, {
          'district': '海珠大岗镇新联一村',
          'grade': '0',
          'date': '7.6m/s(4级)东南',
        }],
      classOption: {
        step: 0.5
      },
      moment,
      radioDefaultScene:'0',
      radioDataScene: [
        { title: '风情', value: '0', image: '' }, 
        { title: '雨情', value: '1', image: '' }
      ],
      radioDefaultSpeed:'0',
      radioDataSpeed: [
        { title: '瞬时风速', value: '0', image: '' }, 
        { title: '极大风速', value: '1', image: '' }
      ],
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {
    onChange(value) {
      console.log(value);
    },
    // 切换数据按钮
    dataChange(e) {
      e.preventDefault()
      this.radioDefaultScene = e.target.value
    },
    onChangeSpeed(value) {
      console.log(value);
    },
    // 切换数据按钮
    dataChangeSpeed(e) {
      e.preventDefault()
      this.radioDefaultSpeed = e.target.value
    },
  },
}
</script>
<style lang='less' scoped>
.search-box {
  width: 100%;
  .search-row {
    .title {
      color: #fff;
      font-size: var(--super-mini-font);
    }
  }
}

.five-minutes {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .five-date {
    color: #ffffffcc;
  }
}
.list-th {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: var(--super-mini-font);
  background: linear-gradient(#166499, #104b98);
  color: #fff;
  padding: 5px 0;

  span {
    text-align: center;
  }
}
.warp {
  width: 100%;
  flex: 1;
  margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li {
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      span {
        text-align: center;
        font-size: var(--super-mini-font);
      }
    }
  }
  .date {
    color: #00ebff;
  }
}
.grade {
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .grade-box {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #00ffff;
    background-color: #3168ab;
    width: var(--mini-font);
    height: var(--mini-font);
    border-radius: 50%;
  }
}
.district {
  width: calc(75% - 60px);
}
.date {
  width: 25%;
}
</style>