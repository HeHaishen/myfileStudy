<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-08-20 11:29:59
 * @LastEditTime: 2021-11-05 16:14:27
-->
<template>
  <a-pagination
    class="mycurrent"
    v-model="current"
    :total="total"
    :pageSize="pageSize"
    @change="changePage"
  />
</template>
<script>
export default {
  data() {
    return {
      current: 1,
    };
  },
  props: {
    total: {
      require: true,
      type: Number,
      default: 0,
    },
    currentPage: {
      require: false,
      type: Number,
      default: 1,
    },
    pageSize:{
      require: false,
      type: Number,
      default: 10,
    },
  },
  model: {
    prop: "currentPage",
    // event: "changePages",
  },
  watch: {
    currentPage: {
      handler: function (newVal) {
        this.current = newVal;
      },
    },
  },
  methods: {
    changePage(pages, size) {
      this.current = pages;
      this.$emit("changePages", { pages, size });
    },
  },
};
</script>
<style lang="less" >
@import "../common.less";
.mycurrent {
    .ant-pagination-prev {
        min-width:12px;
        height:25px;
        line-height: 25px;
      .ant-pagination-item-link {
        color: white;
        background-color: rgba(2, 14, 35, 0.8);
        font-size: 14px;
      
      }
     
    }
    .ant-pagination-item {
        background: rgba(2, 14, 35, 0.8);
        font-size: 14px;
        min-width:12px;
        height:25px;
        line-height: 25px;
        a {
          color:#ffffff;
        }
    }
   
  
    .ant-pagination-next {
        min-width:12px;
        height:25px;
        line-height: 25px;
        .ant-pagination-item-link {
          color:#ffffff;
            background-color: rgba(2, 14, 35, 0.8);
            font-size: 14px;
          }
    }
    .ant-pagination-jump-next{
      font-size: 14px;
      color:#ffffff;
      .ant-pagination-item-link{
        .ant-pagination-item-container{
          font-size: 14px;
          color:#ffffff;
          i{
            font-size: 14px;
            color:#ffffff;
          }
          span{
            font-size: 14px;
            color:#ffffff;
          }
        }
      }
    }
    .ant-pagination-jump-prev{
      font-size: 14px;
      color:white;
      .ant-pagination-item-link{
        .ant-pagination-item-container{
          font-size: 14px;
          color:#ffffff;
          i{
            font-size: 14px;
            color:#ffffff;          
;
          }
          span{
            font-size: 14px;
            color:#ffffff;
          }
        }
      }
    }

    .ant-pagination-jump-next-custom-icon{
      .ant-pagination-item-link{
        .ant-pagination-item-container{
          .ant-pagination-item-ellipsis{
            color:white;
            font-size: 14px;
          }
        }
      }
    }
  }
  /deep/ .ant-pagination-item-ellipsis{
    color:white;
    font-size:14px;
  }
  /deep/ .ant-pagination-item-container i{
    font-size: 14px;
    color:#ffffff;
  }
  /deep/ .ant-pagination-item-container .ant-pagination-item-ellipsis {
    font-size: 14px;
    color:#ffffff;
  }
  /deep/ .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis,/deep/ .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis{
    color:white;
    font-size: 14px;

  }

</style>
