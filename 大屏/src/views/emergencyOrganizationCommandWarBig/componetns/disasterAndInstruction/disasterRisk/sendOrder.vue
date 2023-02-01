<!--
 * @Description: 下达指令
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-11-02 10:16:19
 * @LastEditTime: 2021-11-11 19:02:10
-->
<template>
  <div class="send-order">
    <pop-up-layer
      :show="layerShow"
      @doClose="layerClose"
      :title="title"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="send-order-content">
          <div class="content-detail">
            <p class="form-p" v-if="false">
              <label for="">事件类型：</label>
              <span type="text">8888888</span>
            </p>
            <p class="form-p" v-if="false">
              <label for="">事件等级：</label>
              <span type="text">事件等级</span>
            </p>
            <p class="form-p">
              <label for="">机构名称：</label>
              <input type="text" v-model.trim="sendForm.groupName" />
            </p>
            <p class="btn" @click="toSearch">查询</p>
            <p class="btn" @click="doClearn">清空</p>
            <p
              class="btn"
              :class="{ 'btn-disabled': allIssueLoading }"
              @click="allIssueClick"
            >
              一键下达
            </p>
          </div>
          <div class="content-table-list">
            <Clist class="table-list" :columns="columns" :listData="listData">
              <template slot="groupName" slot-scope="{ text }">
                <div class="line-divs">
                  <p>{{ text }}</p>
                </div>
              </template>
              <template
                slot="authorityMemberName"
                slot-scope="{ text }"
              >
                <div class="line-divs">
                  <p>{{ text.split("_")[0] }}</p>
                </div>
              </template>
              <template slot="xm" slot-scope="{ record, text }">
                <div class="line-divs">
                  <p v-show="!record.editType">{{ text }}</p>
                  <input v-model="record.xm" v-show="record.editType" />
                </div>
              </template>
              <template slot="instructDes" slot-scope="{ record, text }">
                <div class="line-divs">
                  <p v-show="!record.editType">{{ text }}</p>
                  <input
                    v-model="record.instructDes"
                    v-show="record.editType"
                  />
                </div>
              </template>
              <template slot="lxdh" slot-scope="{ record, text }">
                <div class="line-divs">
                  <p v-show="!record.editType">{{ text }}</p>
                  <input v-model="record.lxdh" v-show="record.editType" />
                </div>
              </template>
              <template slot="operation" slot-scope="{ record, index }">
                <div class="operation-divs">
                  <p
                    class="btn-p"
                    :class="{ 'btn-disabled': record.issued }"
                    @click="doSendOrder(record, index)"
                    v-if="!record.editType"
                  >
                    {{ record.issued ? "已下达" : "下达" }}
                  </p>
                  <p
                    class="btn-p"
                    @click="doEdit(record, index)"
                    v-if="!record.editType"
                  >
                    编辑
                  </p>
                  <p
                    class="btn-p"
                    @click="doEditSave(record, index)"
                    v-if="record.editType"
                  >
                    确定
                  </p>
                </div>
              </template>
            </Clist>
          </div>
          <div class="table-pages">
            <ChangePage
              :total="total"
              v-model="currentPage"
              @changePages="changePages"
            />
          </div>
          <div class="sure-send-order" v-if="suerLayerShow">
            <div class="sure-inner">
              <div class="sure-inner-title">
                <p>{{allIssueLoading?'确定一键下达所有指令？':'确定下达该指令？'}}</p>
              </div>
              <div class="sure-inner-btn">
                <p class="btn-p btn-disabled" v-if="sureSendOrderLoading">
                  确定
                </p>
                <p class="btn-p" @click="sureSendOrder" v-else>确定</p>
                <p class="btn-p" @click="cancleSend">取消</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </pop-up-layer>
  </div>
</template>

<script>
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import {
  usePlanIdGetOrderApi,
  sendOrders,
  sendOrdersAll
} from "@/api/emergencyOrganizationCommandWar";
export default {
  components: {
    Clist,
    ChangePage,
  },
  data() {
    return {
      allIssueLoading: false,
      sureSendOrderLoading: false,
      title: "下达指令",
      layerShow: false,
      parentDatas: {},
      sendForm: {
        sendForm: null,
      },
      columns: [
        { title: "序号", textIndex: "indeKey", width: "8%" },
        { title: "工作组", textIndex: "groupName", width: "15%" },
        { title: "指令内容", textIndex: "instructDes", width: "20%" },
        // { title: "事发时间", textIndex: "sfsj", width: "20%" },
        { title: "机构", textIndex: "authorityMemberName", width: "10%" },
        { title: "联系人", textIndex: "xm", width: "12%" },
        { title: "联系电话", textIndex: "lxdh", width: "15%" },
        { title: "操作", textIndex: "operation", width: "20%" },
      ],
      listData: [],
      total: 0,
      currentPage: 1,
      /*确定框 */
      suerLayerShow: false,
      sendOrderObj: {},
    };
  },
  mounted() {
    this.$on("show", (item) => {
      this.parentDatas = item;
      this.layerShow = true;
      this.init();
    });
  },
  methods: {
    init() {
      this.doUsePlanIdGetOrderApi();
    },
    /* 根据预案获取指令 */
    doUsePlanIdGetOrderApi() {
      let parentObj = this.parentDatas;
      let sendObj = {
        basicInformationId: parentObj.sid, // 预案id
        eventLevel: parentObj.eventDatas.sjdjdm, // 事件级别
        ...this.sendForm,
      };
      usePlanIdGetOrderApi({
        body: this.$filterParams({ ...sendObj }),
        pageSize: "10",
        page: this.currentPage,
      }).then((res) => {
        if (res.success) {
          this.listData = res.body;
          this.total = parseInt(res.total);
          this.listData.map((i, k) => {
            let obj = {
              ...i,
              indeKey:
                this.currentPage === 1
                  ? k + 1
                  : (this.currentPage - 1) * 10 + (k + 1),
              editType: false,
              issued: false,
            };
            this.listData[k] = obj;
          });
        } else {
          this.$MyMessage.error(res.message);
        }
      });
    },
    layerClose() {
      this.layerShow = false;
    },
    /* 下达指令 */
    doSendOrder(item,index) {
      console.log(index);
      if(this.allIssueLoading)return;
      if(item.issued){return}
      this.transmitIndex = index
      this.suerLayerShow = true;
      this.sendOrderObj = item;
    },
    /* 翻页 */
    changePages(pages) {
      console.log(pages);
      this.currentPage = pages.page;
      this.doUsePlanIdGetOrderApi();
    },
    toSearch() {
      this.currentPage = 1;
      this.doUsePlanIdGetOrderApi();
    },
    doClearn() {
      this.sendForm.groupName = null;
      this.doUsePlanIdGetOrderApi();
    },
    doEdit(record, key) {
      console.log(key);
      this.listData[key]["editType"] = true;
      this.listData = JSON.parse(JSON.stringify(this.listData));
    },
    doEditSave(record, key) {
      console.log(key);
      this.listData[key]["editType"] = false;
      this.listData = JSON.parse(JSON.stringify(this.listData));
      // record.editType = false
    },
    sureSendOrder() {
      this.sureSendOrderLoading = true
      if(this.allIssueLoading){
        this.setSendOrdersAll()
        return
      }


      let sendObj = {
        title: this.parentDatas.eventDatas.xxbt,
        type: "1",
        eventId: this.parentDatas.eventDatas.jbbh,
        planId: this.parentDatas.sid,
        disposeId: this.sendOrderObj.sid,
        content: this.sendOrderObj.instructDes,
        executor: this.sendOrderObj.xm,
        executorTel: this.sendOrderObj.lxdh,
      };
      this.setSendOrders(sendObj)
      
    },
    setSendOrders(sendObj){
      sendOrders(sendObj).then((res) => {
          this.sureSendOrderLoading = false;
          if (res.success) {
            this.$MyMessage.success("发送指令成功！");

            let data = JSON.parse(JSON.stringify(this.listData));
            this.$set(data[this.transmitIndex], "issued", true);
            this.listData = data;

            this.suerLayerShow = false;
          } else {
            this.$MyMessage.error(res.message);
            this.suerLayerShow = false;
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error(error);
            this.suerLayerShow = false;
          }
        });
    },
    setSendOrdersAll(){
      sendOrdersAll({planId:this.parentDatas.sid,eventLevel:this.parentDatas.eventDatas.sjdjdm}).then((res) => {
          this.sureSendOrderLoading = false;


          //使下达按钮慢慢致灰
          let data = JSON.parse(JSON.stringify(this.listData));
          for (let i = 0; i < data.length; i++) {
            ((i) => {
              //自执行函数，获取i
              setTimeout(() => {
                this.$set(data[i], "issued", true);
                this.listData = data;
                if (i == data.length - 1) this.allIssueLoading = false;
              }, i * 500);
            })(i);
          }

          if (res.success) {
            this.$MyMessage.success("一键发送指令成功！");
            this.suerLayerShow = false;
          } else {
            this.$MyMessage.error(res.message);
            this.suerLayerShow = false;
          }
        })
        .catch((error) => {
          if (error) {
            this.$MyMessage.error(error);
            this.suerLayerShow = false;
            this.allIssueLoading = false;
          }
        });
    },
    cancleSend() {
      this.suerLayerShow = false;
      this.allIssueLoading = false
    },
    allIssueClick() {
      this.allIssueLoading = true;
      this.suerLayerShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../common.less";
.send-order {
  /deep/ .send-order-content {
    width: 1820px;
    height: 900px;
  }
  .content-detail {
    width: 100%;
    height: 70px;
    display: flex;
    .form-p {
      display: flex;
      color: white;
      font-size: 26px;
      margin-right: 32px;
      align-items: center;
      input {
        display: block;
        height: 62px;
        width: 320px;
        background: rgba(0, 0, 0, 0.8);
        border: rgba(18, 150, 219, 1);
        border: 1px solid rgb(13, 93, 136);
      }
      span {
      }
    }
    .btn,.btn-disabled {
      width: 180px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      // padding: 8px 24px;
      .box-sizing();
      background: rgba(18, 150, 219, 1);
      color: white;
      font-size: 26px;
      cursor: pointer;
      border-radius: 8px 8px;
      -o-border-radius: 8px 8px;
      -ms-border-radius: 8px 8px;
      -moz-border-radius: 8px 8px;
      -webkit-border-radius: 8px 8px;
      white-space: nowrap;
      margin-right: 32px;
    }
    
    .btn-disabled{
      cursor: not-allowed;
      border: 1px solid #999;
      color: #eee;
      background-color: #999;

    }
  }
  .content-table-list {
    height: calc(100% - 150px);
    width: 100%;
    margin-bottom: 14px;
    overflow: auto;
    /deep/ .list-header {
      padding: 14px 0;
      div {
        font-size: 32px;
      }
    }
    /deep/ .list-body {
      li {
        div {
          font-size: 30px;
          padding: 0 10px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    /deep/ .line-divs {
      width: 100%;
      height: auto;
      input {
        display: block;
        height: 62px;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        border: rgba(18, 150, 219, 1);
        border: 1px solid rgb(13, 93, 136);
        text-align: center;
      }
    }
    /deep/ .operation-divs {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      .btn-p,.btn-disabled {
        border: 1px solid rgba(18, 150, 219, 1);
        padding: 2px 24px;
        .box-sizing();
        color: white;
        font-size: 26px;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 32px;
      }
      .btn-p:hover {
        color: rgba(18, 150, 219, 1);
      }
      .btn-disabled{
        cursor: not-allowed;
        border: 1px solid #999;
        color: #eee;
        background-color: #999;
        transition: all .3s;

      }
      .btn-disabled:hover {
        color: #eee;
      }
    }
  }
  .table-pages {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
  }
}
.sure-send-order {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  .sure-inner {
    width: 60%;
    height: 60%;
    background: rgba(10, 10, 50, 1);
    .sure-inner-title {
      width: 100%;
      height: 80%;
      text-align: center;
      line-height: 80%;
      color: white;
      font-size: 62px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
      }
    }
    .sure-inner-btn {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn-p,.btn-disabled{
        border: 1px solid rgba(18, 150, 219, 1);
        padding: 2px 24px 2px 24px;
        height: auto;
        .box-sizing();
        color: white;
        font-size: 26px;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 32px;
      }
      .btn-p:hover {
        color: rgba(18, 150, 219, 1);
      }
      .btn-disabled{
        cursor: not-allowed;
        border: 1px solid #999;
        color: #eee;
        background-color: #999;

      }
      .btn-disabled:hover {
        color: #eee;
      }
    }
  }
}

</style>
