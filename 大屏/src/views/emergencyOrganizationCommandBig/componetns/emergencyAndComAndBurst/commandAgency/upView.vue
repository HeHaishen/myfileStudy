<!--
 * @Description: 指挥机构
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors:  
 * @Date: 2021-10-11 18:06:36
 * @LastEditTime: 2021-11-03 19:14:16
-->
<template>
  <div class="up_view">
    <div class="tabBarStyle">
      <div v-for="(item, index) in tabBarList" :key="index" class="tabBar-item" :class="{ active: currentIndex == index }" @click="tabBarChange(index,item.value)">
        {{ item.label }}
      </div>
    </div>
    <div class="conditions-search">
      <a-icon type='search' class="conditions-search-icon"></a-icon>
      <input v-model.trim="queryData.keywords" placeholder="输入姓名或联系方式" @keyup.enter="onQuery" @input="onChange" />
    </div>
    <clist class="list" :columns="columns" :listData="listData">

    </clist>
    <div class="pagination">
      <ChangePage :total="total" v-model="currentPage" @changePages="changePages" />
    </div>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import { getIdsmApi } from "@/api/idsm";

export default {
  components: { Clist, ChangePage },
  props: {
    activeKey: {
      type: String,
    },
  },
  data() {
    return {
      columns: [
        { title: "序号", textIndex: "index", width: "8%" },
        { title: "姓名", textIndex: "userName", width: "12%" },
        { title: "单位", textIndex: "unitPosition", width: "21%" },
        { title: "职务", textIndex: "adminPosition", width: "25%" },
        { title: "办公电话", textIndex: "officeTtel", width: "17%" },
        { title: "移动电话", textIndex: "mobile", width: "17%" },
      ],
      listData: [],
      queryData: {
        keywords: '',
      },       
      total: 0,
      currentPage: 1,
      tabBarList: [{ label: "市级指挥机构", value: '1' }, { label: "区级指挥机构", value: '2' }, { label: "镇街级指挥机构", value: '3' }, { label: "村(居)级指挥机构", value: '4' }],
      currentIndex: 0,
      currentKey: ''
    };
  },
  watch: {
    activeKey: {
      immediate: true,
      handler: function (val) {
        console.log("指挥机构", val, this);
        this.currentIndex = val - 1
        this.currentKey = val
        this.doQuery();
      },
    },
  },
  //创建完成 访问当前this实例
  created() {
  },
  //挂载完成 访问DOM元素
  mounted() { },
  //方法集合
  methods: {
    // 切换类型按钮
    tabBarChange(index, currentKey) {
      this.currentIndex = index;
      this.currentPage = 1
      this.currentKey = currentKey
      this.doQuery()
    },
    // 初始化数据
    doQuery() {
      let body = {
        body: {
          orgLevel: this.currentKey,
          ...this.queryData,
        },
        page: this.currentPage,
        pageSize: 10,
        sortName: "sid",
        sortOrder: "desc"
      }
      getIdsmApi("slRca0zi", body)
        .then((res) => {
          if (res.success) {
            res.body.data.map((v, i) => {
              Object.assign(v, {
                index: (this.currentPage - 1) * 10 + (i + 1),
              });
            });
            this.listData = res.body.data;
            this.total = parseInt(res.total);
          } else {
            this.$MyMessage.error(res.message);
          }
        })
    },
    // 分页改变
    changePages(param) {
      this.currentPage = param.pages;
      this.doQuery();
    },
    // 查看事件
    toView(record) {
      this.detailShow = true;
      this.detailObj = record
    },
    // 搜索框
    onQuery() {
      this.currentPage = 1;
      this.doQuery();
    },
    // 搜索框为空初始化加载
    onChange(e) {
      if (!e.target.value || e.target.value.length == 0) {
        this.currentPage = 1;
        this.queryData = {};
        this.doQuery();
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../../common.less';
.up_view {
  height: 1150px;
  width: 1650px;
  // 单选标签按钮样式
  .tabBarStyle {
    display: flex;
    height: 84px;
    width: 100%;
    padding: 0 10px;
    color: #fff;
    font-weight: bold;
    font-size: 36px;
    line-height: 84px;
    cursor: pointer;
    user-select: none;
    .tabBar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      background: #0b3054;
      padding: 20px;
      border: 1px solid #0b3054;
    }
    .active {
      background: #192954;
      border: 1px solid #029ce2;
    }
  }
  // 表格样式
  .list {
    height: calc(100% - 280px);
    margin-bottom: 14px;
    overflow: auto;
    /deep/ .list-header {
      padding: 10px 16px;
      div {
        font-size: 30px;
        color: #2295ff;
      }
    }
    /deep/ .list-body {
      height: auto !important;
      li {
        margin: 0;
        div {
          line-height: 42.5px;
          font-size: 30px;
          padding: 18px 16px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .pagination {
    text-align: center;
  }
  .conditions-search {
    display: flex;
    align-items: center;
    // margin: 15px 0 20px;
    font-size: 24px;
    color: #fff;
    margin: 20px 0;
    position: relative;
    .conditions-search-icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      color: #029ce2;
    }
    .c-select {
      width: 200px !important;
      margin-right: 28px;
      /deep/.ant-select-selection__rendered {
        margin: auto !important;
        height: 40px;
        line-height: 40px;
      }

      /deep/.ant-select-selection {
        // background-color: #036af3;
        background-color: #333333;
        color: white;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        border: 1px solid #4a6894;
        display: flex;
        .box-sizing();
      }

      /deep/.ant-select-arrow {
        display: none;
      }
    }

    .time {
      font-size: 22px;
    }

    > span {
      font-size: 18px;
      color: white;
    }

    > input {
      width: 100%;
      height: 50px;
      line-height: 30px;
      background-color: #0d3960;
      color: #fff;
      padding-left: 35px;
      border: none;
      font-size: 24px;
      border: 1px solid #029ce2;
      &::placeholder {
        color: #eee;
      }
    }

    > button {
      background-color: #169bd5;
      border: none;
      margin-right: 10px;

      &.btn {
        background-color: #169bd5;
        font-size: 18px;
        // line-height: 35px;
        padding: 4px 8px !important;
        .box-sizing();
        border: none;
        margin-right: 10px;
        border-radius: 6px;
        color: white;
        cursor: pointer;
      }
    }
  }
  .event-icon {
    display: block;
    width: 50px;
    float: left;
  }
}
</style>

