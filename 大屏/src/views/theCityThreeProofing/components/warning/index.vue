<template>
  <!-- 气象预警 -->
  <div class="manage">
    <div class="list-table">
      <warn-chart v-if="modelType == 1"></warn-chart>
      <a-table
        v-else
        :columns="columns"
        :dataSource="listData"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :rowKey="(record, index) => index"
      >
      </a-table>
    </div>
  </div>
</template>

<script>
import warnChart from "./chart.vue";
const imagesContext = require.context("./images", false, /\.png$/);
import { meteorologicalWarningTable } from "@/api/theCityThreeProofing";
export default {
  name: "",
  props: {},

  components: { warnChart },
  data() {
    return {
      modelList: [
        { label: "地图", value: 1 },
        { label: "列表", value: 2 },
      ],
      currentDateIndex: 0, //选中的周期索引  默认为第一条数据
      modelType: "1",
      images: {},
      columns: [
        {
          title: "预警级别",
          dataIndex: "yjzldj",
          align: "center",
          ellipsis: true,
          customRender: (text, record) => {
            const h = this.$createElement;
            imagesContext.keys().map((file) => {
              const images = imagesContext(file); //base64文件
              const imagesName = file.split("/")[1];
              const saveName = imagesName.slice(0, -4); //图片名称
              this.images[saveName] = images;
            });
            return h("img", {
              style: { width: "30px", height: "30px" },
              attrs: {
                src: this.images[text],
                title: text,
                alt: text,
              },
            });
          },
        },
        {
          title: "预警信息",
          dataIndex: "alarmInfo",
          align: "center",
          ellipsis: true,
        },
        {
          title: "预警信号",
          dataIndex: "alarmKind",
          align: "center",
          ellipsis: true,
        },
        {
          title: "发布时间",
          dataIndex: "issueTime",
          align: "center",
          ellipsis: true,
        },
      ],
      pagination: { current: 1, pageSize: 10, total: 0 },
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.doQuery();
  },
  methods: {
    // 查询数据
    doQuery() {
      const data = {
        body: {},
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        sortName: "sid",
        sortOrder: "desc",
      };
      meteorologicalWarningTable(data)
        .then((res) => {
          if (res.success) {
            this.listData = res.body.data;
            this.pagination.total = res.body.total * 1;
          } else {
            this.$message.err("请求错误");
          }
          // console.log(this.listData);
        })
        .catch((err) => {
          if (err) {
            this.$message.err("处理错误！");
          }
        });
      // this.listData = [{ area: '天河', data: "暂无", level: '0' }, { area: '黄埔', data: "暴雨黄色预警", level: '1' }, { area: '海珠', data: "台风预警", level: '2' }, { area: '南沙', data: "暂无", level: '0' }, { area: '越秀', data: "暂无", level: '0' }, { area: '天河', data: "暂无", level: '0' }, { area: '天河', data: "暂无", level: '0' }]
      // console.log("请求头数据====>", this.modelType);
    },
    // 模式选择回调
    radioDateChange(index, value) {
      this.currentDateIndex = index;
      this.modelType = value;
      this.pagination.current = 1;
      this.doQuery();
    },
  },
};
</script>
<style lang="less" scoped>
// 分页器居中样式ccc
/deep/.ant-table-pagination.ant-pagination {
  text-align: center;
  float: none;
  width: 100%;
}
.manage {
  padding: 0 16px;
  width: 100%;
  height: 100%;
  .list-table {
    width: 100%;
    height: 100%;
    // height: calc(100vh - 180px);
    box-shadow: 0 0 10px #c5c5c5;
    // overflow: hidden;
    border-radius: 5px;
    margin-top: 20px;
    padding: 10px;
  }
  // 搜索栏
  .andvance {
    // 时间周期
    .radio-style {
      float: left;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 5px;
      .radio-item {
        width: auto;
        margin: 0 10px 5px 0;
        padding: 4px 15px;
        color: #fff;
        background: #adadad;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        cursor: pointer;
      }
      .active {
        color: #fff;
        background: #3060a0;
        border: 1px solid #3060a0;
      }
    }
  }
}
</style>
