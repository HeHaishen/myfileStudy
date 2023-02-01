<!--  -->
<template>
  <div class="duty-detail">
    <div>
      <p class="title">事故单位追责情况</p>
      <ul>
        <li v-for="(i) in dutyObj" :key="i.id">
          <div class="li-label">
            <label for="">{{ i.label }}</label>
          </div>
          <div class="li-content">
            <div>{{ contentObj[i.contentKeys] ? contentObj[i.contentKeys] : "-" }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getIdsmApi } from '@/api/idsm/index.js'

export default {
  props: {
    sid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dutyObj: [
        {
          id: 1,
          label: "事故单位违法行为：",
          contentKeys: "illegalActivities",
        },
        {
          id: 2,
          label: "承担责任：",
          contentKeys: "bearDuty",
        },
        {
          id: 3,
          label: "处罚依据：",
          contentKeys: "punishBasis",
        },
      ],
      contentObj: {
        illegalActivities: '成立调查组时间',
        punishBasis: '',
        bearDuty: '',
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  },
  watch: {
    sid: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.doQuery()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取数据
    doQuery() {
      let data = 'h6pue8dg'
      let code = {
        body: {
          "sid": this.sid
        },
        page: 1,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi(data, code).then(res => {
        if (res.success) {
          this.contentObj = res.body.data[0]
        }
      })
    }
  }
}
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
@import '../../../../common.less';
.duty-detail {
  .title {
    background-color: rgb(43, 90, 160);
    color: #fff;
    font-size: 32px;
    padding: 15px 15px;
  }
  ul {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 100%;
      height: auto;
      display: flex;
      padding: 13px 32px 13px 0;
      color: white;
      .li-label {
        width: 270px;
        flex-shrink: 0;
        label {
          display: inline-block;
          width: 100%;
          text-align: right;
          font-size: 31px;
        }
      }
      .li-content {
        font-size: 31px;
      }
    }
  }
}
</style>