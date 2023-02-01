<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-08-28 12:51:36
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-08-28 13:18:05
-->
<template>
    <div
        class="indetail"  v-if="indetailTitle.length!=0 "    v-show="activeKey || activeKey===0" >
        <div class="indetail_title">
          <ul>
            <li
              v-for="(e, i) in indetailTitle" :key="i" @click="clickLi(e, i)"
              :class="{ 'activeli': activeliKey == i }" >
              {{ e.name }}
            </li>
          </ul>
        </div>
        <div class="indetail_content">
          <div class="water_search">
            <a-input-search placeholder="请输入名称"  @search="doSearch"  v-model="keywords"/>
          </div>
          <div class="table">
            <Table :columns="columns" :listData="listData">
              <template slot="position" slot-scoped="{record,text,index}">
                <span class="location">定位</span>
              </template>
              <!-- <template slot="name" slot-scoped="{record,text,index}">
                <span >{{record.areaname}}</span>
              </template> -->
            </Table>
          </div>
               <getPage
            :total="total"
            :currentPage="currentPage"
            @changePages="changePages"
          />
        </div>
      </div>
</template>

<script>
import Table from "@/components/APicture/c-table.vue";
import getPage from "@/components/APicture/changePage/index.vue";
  export default {
    components: {Table,getPage },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created () {},
  }
</script>
<style  lang='less'    scoped>
 .indetail {
      width: 500px;
      height: 918px;
      position: absolute;
      right: -878px;
      top: 0;
      z-index: 9888;
      display: flex;
      .indetail_title {
        width: 30px;
        height: auto;
        ul {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          text-align: center;
          color: #fff;
          li {
            width: 100%;
            height: auto;
            border: 1px solid rgba(15, 48, 84, 0.6);
            cursor: pointer;
            padding: 5px;
            box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            &:hover {
              background: linear-gradient(to bottom, #77f3ff 0%, #04eaff 100%);
              opacity: 0.8;
            }
          }
        }
      }
      .indetail_content {
        flex: 1;
        background: rgba(15, 48, 84, 0.6);
        padding: 20px;
        width: 100%;
        height: 100%;
        .table {
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  height: calc(100% - 120px);
  .location {
    display: block;
      height: auto;
      width: 80%;
    text-align: center;
    padding: 4px;
    line-height: 30px;
    border: 1px solid rgb(1, 255, 255);
    cursor: pointer;
      box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
  }
}
      }
    }
    .water_search {
  width: 70%;
  height: 36px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  /deep/.ant-input {
    width: 100%;
    height: 100%;
    border: 1px solid #01ffff;
    background-color: transparent;
    color: #fff;
    font-size: 26px;
  }

  /deep/.ant-input-suffix {
    height: 100%;
    font-size: 25px;
    i {
      color: #01ffff;
    }
    /deep/.ant-input-affix-wrapper {
      height: 100%;
    }
  }
}
.activeli {
    background: linear-gradient(to bottom, #77f3ff 0%, #04eaff 100%);
    color: black;
  }
</style>