<!--  -->
<template>
  <div class="survey-status">
    <div>
      <p class="title">处理时间节点</p>
      <ul>
        <li v-for="(i, k) in statusObj" :key="i.id">
          <div class="li-label">
            <label for="">{{ i.label }}</label>
          </div>
          <div class="li-content">
            <div>{{ contentObj[i.contentKeys] ? contentObj[i.contentKeys] : "-" }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div>
      <p class="title">事故原因和性质</p>
      <ul>
        <li>
          <div class="li-label">
            <label for="">直接原因：</label>
          </div>
          <div class="li-content">
            <div>
              {{contentObj['directCause']?contentObj['directCause']:"-"}}
            </div>
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
      statusObj: [
        {
          id: 1,
          label: "成立调查组时间：",
          contentKeys: "investigateTime",
        },
        {
          id: 2,
          label: "调查说明：",
          contentKeys: "investigateRemark",
        },
      ],
      contentObj: {
        investigateTime: '-',
        investigateRemark: '-',
        directCause: '-',
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
      let data = 'MGnmHdUA'
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
@import '../../../common.less';
.survey-status {
  .title {
    background-color: rgb(43, 90, 160);
    color: #fff;
    font-size: 30vh * @h;
    padding: 15vh * @h 15vw * @w;
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
      padding: 13vh * @h 32vw * @w 13vh * @h 0;
      color: white;
      .li-label {
        width: 210vw * @w;
        flex-shrink: 0;
        label {
          display: inline-block;
          width: 100%;
          text-align: right;
          font-size: 29vh * @h;
        }
      }
      .li-content {
        font-size: 29vh * @h;
      }
    }
  }
}
</style>