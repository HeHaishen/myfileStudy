<!--
 * @Description: 预案详情
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: Aidam_Bo
 * @Date: 2021-11-02 11:05:22
 * @LastEditTime: 2021-11-11 18:56:28
-->
<template>
  <div class="plan-detail">
    <pop-up-layer
      :show="layerShow"
      @doClose="layerClose"
      :title="title"
      ref="myPopUpLayer"
    >
      <template slot="content">
        <div class="plan-content-detail">
          <div class="see-title">
            <div class="see-file" >
              <a
                :download="item.title"
                :href="`./doc/api/store/preview/${item.sid}`" 
                :title="item.title" 
                v-for="item in fileList" 
                :key="item.sid"
              >{{item.title }}</a>
              <div v-if="fileList.length">（点击文件可下载查看）</div>
            </div>
            <a-button type="primary" @click="checkEmergency" style="font-size:20px">查看应急通信录</a-button>
          </div>

          <div class="detail-title">{{ detaiDatas.planName }}</div>
          <div class="document-number">{{ detaiDatas.documentNumber }}</div>
          <div class="box-title">一、预案基本信息</div>
          <div class="base-message">
            <ul>
              <li v-for="(i, k) in baseMSGList" :key="i.id">
                <div>{{ i.name }}</div>
                <div>{{ i.content }}</div>
              </li>
            </ul>
          </div>
          <div class="box-title">二、总则</div>
          <div class="general-box">
            {{ detaiDatas.planThe ? detaiDatas.planThe : "" }}
          </div>
          <div class="box-title">三、组织体系</div>
          <div class="organization-system">
            <div class="form-top">
              <div>指挥部办公室：{{ detaiDatas.headquartersOffice ? detaiDatas.headquartersOffice : "" }}</div>
              <div>
                <select name="" id="">
                  <option v-for="(i, k) in organizationSystem" :key="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="table-list-wrap">
              <Clist
                :columns="systemColumns"
                :listData="systemListData"
                class="table-list"
              ></Clist>
            </div>
          </div>
          <div class="box-title">四、预警报告</div>
          <div class="general-box">
            {{
              detaiDatas.earlywarningReport ? detaiDatas.earlywarningReport : ""
            }}
          </div>

          <div class="box-title">五、应急处置</div>
          <div class="emergency-disposal">
            <ul class="emergency-disposal-list">
              <li>
                <div class="list-open-li">
                  <div>重大、特别重大级别突发事件</div>
                  <div>▶</div>
                </div>
                <div class="list-open-content">
                  <Clist
                    :columns="systemColumns"
                    :listData="systemListData"
                    class="table-list"
                  ></Clist>
                </div>
              </li>
            </ul>
          </div>

          <div class="box-title">六、应急保障</div>
          <div class="general-box">
            {{ detaiDatas.emergencySupport ? detaiDatas.emergencySupport : "" }}
          </div>

          <div class="box-title">七、后期处置</div>
          <div class="general-box">
            {{ detaiDatas.postDisposal ? detaiDatas.postDisposal : "" }}
          </div>

          <div class="box-title">八、预案流程</div>
          <div class="general-box">
            <img :src="imgUrl" alt="" width="100%" />
          </div>

          <div class="box-title"></div>
          <div class="show-pdf">
            <iframe
              v-if="pdfUrlData"
              style="width: 100%; height: 100%"
              :src="`./pdf/web/viewer.html?file=${pdfUrlData}`"
            ></iframe>
          </div>
        </div>
      </template>
    </pop-up-layer>
    <pop-up-layer
      :show="memberInfoShow"
      @doClose="layerClose('memberInfoShow')"
      title="通讯录信息"
    >
    <template slot="content">
      <div class="memberInfo-table-list">
        <div class="content-table-list">
          <Clist class="table-list" :columns="memberInfoHeader" :listData="memberInfoData">
            <template slot="institution" slot-scope="{ record, text }">
              <span>{{text}}（{{record.xzzw}}）</span>
            </template>
          </Clist>
        </div>
        <div class="table-pages">
          <ChangePage
            :total="bookPagination.total"
            v-model="bookPagination.currentPage"
            @changePages="changePages"
          />
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
  planDetaisUseId,
  getFileUrl,
  queryFindAddressBook
} from "@/api/emergencyOrganizationCommandWar";
// 通讯录
const memberInfoHeader = [
		{
      title: "序号",
      textIndex: 'index',
      key: 'index',
      align: "center",
      width: "5%"
    },
    {
      title: '单位',
      textIndex: 'institution',
      key: 'institution',
      align: "center",
      width:'30%'
    },
    {
      title: '姓名',
      textIndex: 'xm',
      key: 'xm',
      align: "center",
      // width:'200px'
    },
    {
      title: '座机',
      textIndex: 'bgdh',
      key: 'bgdh',
      align: "center",
      // width:'200px',
    },
    {
      title: '手机号码',
      textIndex: 'lxdh',
      key: 'lxdh',
      align: "center",
      // width:'200px',
    },
	]
export default {
  components: {
    Clist,
    ChangePage,
  },
  data() {
    return {
      memberInfoHeader,
      memberInfoData:[],
      memberInfoShow:false,
      bookPagination:{
        total:0,
        currentPage:1,
      },
      title: "预案详情",
      fileList:[],
      layerShow: false,
      parentDatas: {},
      detaiDatas: {
        planName: "",
        documentNumber: "",
      },
      typeObj: {},
      levelObj: {},
      planTypeObj: {},
      cityAreaObj: {},
      baseMSGList: [
        {
          id: 1,
          name: "预案类型:",
          indexKey: "planCategory",
          content: "",
        },
        {
          id: 2,
          name: "编制部门:",
          indexKey: "preparationDepartment",
          content: "",
        },
        {
          id: 3,
          name: "事件类型:",
          indexKey: "eventTypeName",
          content: "",
        },
        {
          id: 4,
          name: "发布日期:",
          indexKey: "releaseTime",
          content: "",
        },
        {
          id: 5,
          name: "印发日期:",
          indexKey: "issueTime",
          content: "",
        },
        {
          id: 6,
          name: "印发部门:",
          indexKey: "issuingDepartment",
          content: "",
        },
        {
          id: 7,
          name: "行政区划:",
          indexKey: "location",
          content: "",
        },
      ],
      /* 组织体系 */
      organizationSystem: [
        {
          id: 1,
          name: "重大、特别重大级别突发事件",
        },
        {
          id: 2,
          name: " 较大级别及敏感突发事件 ",
        },
        {
          id: 3,
          name: "较大临界突发事件",
        },
        {
          id: 4,
          name: "一般级别突发事件",
        },
      ],
      systemColumns: [
        { title: "序号", textIndex: "indeKey", width: "8%" },
        { title: "专项指挥机构", textIndex: "name", width: "28%" },
        { title: "专项指挥机构成员", textIndex: "type", width: "28%" },
        // { title: "事发时间", textIndex: "sfsj", width: "20%" },
        { title: "事件等级", textIndex: "level", width: "18%" },
        { title: "职责", textIndex: "contactName", width: "18%" },
      ],
      systemListData: [],
      /* pdf */
      pdfUrlData: null, // /doc/api/store/preview/1447553120744914944
      imgUrl: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$on("show", (item) => {
        console.log("item", item, this.cityAreaObj);
        this.parentDatas = item;
        this.layerShow = true;
        this.init(item);
      });
    });
  },
  methods: {
    init(item) {
      this.doPlanDetaisUseId(item);
    },
    doPlanDetaisUseId(item) {
      let sendObj = { sid: item.sid };
      planDetaisUseId(sendObj).then((res) => {
        if (res.success) {
          this.detaiDatas = res.body;
          this.pdfUrlData = `/doc/api/store/preview/1453661405931782144`;
          this.detaiDatas.eventTypeName = res.body.eventType
            ? res.body.eventType.split(",")
            : [];
          console.log("详情", res.body);
          this.initDetai(this.detaiDatas);
          this.doGetFileUrl(this.detaiDatas);
          this.doGetFileList(this.detaiDatas)
        }
      });
    },
    initDetai(item) {
      this.baseMSGList.map((i, k) => {
        if (i.indexKey === "eventTypeName") {
          this.baseMSGList[k].content = "";
          item["eventTypeName"].map((ie, ke) => {
            this.baseMSGList[k].content =
              this.baseMSGList[k].content +
              this.typeObj[ie] +
              (item["eventTypeName"].length - 1 === ke ? "" : "、");
          });
        } else if (i.indexKey === "planCategory") {
          this.baseMSGList[k].content = item.planCategory
            ? this.planTypeObj[item.planCategory]
            : "";
        } else if (i.indexKey === "location") {
          this.baseMSGList[k].content = item.location
            ? this.cityAreaObj[item.location]
            : "";
        } else {
          this.baseMSGList[k].content = item[this.baseMSGList[k].indexKey];
        }
      });
    },
    /* 获取 */
    doGetFileUrl(item) {
      getFileUrl({ body: { name: "chartflie", ownerId: item.sid } }).then(
        (res) => {
          if (res.success) {
            console.log("获取文件", res);
            this.imgUrl = "./doc/api/store/preview/" + res.body[0]&&res.body[0].sid;
          }
        }
      );
    },
    /* 获取附件 */
    doGetFileList(item) {
      getFileUrl({ body: { name: "basicInfo", ownerId: item.sid } }).then(
        (res) => {
          if (res.success) {
            this.fileList = res.body
          }
        }
      );
    },
    checkEmergency(){
      this.memberInfoShow = true
      queryFindAddressBook({
					body:this.detaiDatas.sid,
          page:this.bookPagination.currentPage,
          pageSize: 10,
					sortName: "sid",
					sortOrder: "desc",
				}).then(res=>{
					console.log(res);
          res.body.data.map((val,k)=>{
            val.index = this.bookPagination.currentPage === 1
                    ? k + 1
                    : (this.bookPagination.currentPage - 1) * 10 + (k + 1);
          })
					this.memberInfoData = res.body.data
					this.bookPagination.total = Number(res.body.total)
				})
    },
    // 分页
    changePages(pages) {
      console.log(pages);
      this.bookPagination.currentPage = pages.pages;
      this.checkEmergency();
    },
    layerClose(type='0') {
      if(type=='0')return this.layerShow = false;
      this.memberInfoShow = false
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../common.less";
.boxBorder(@x) {
  border: @x solid #66a7eb;
}
.setPadding(@y,@x) {
  padding: @y @x;
  .box-sizing();
}
.plan-detail {
  .plan-content-detail {
    width: 1820px;
    height: 1600px;
    overflow: auto;
    padding: 20px 30px;
    .box-sizing();
    .see-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      .see-file{
        display: inline-block;
        >a{
          color: #fff;
          &:hover{
            color: #1d87f4;
          }
        }
        >div{
          margin-top: 20px;
          font-size: 30px;
          color: #ff4d4f;
        }
      }
    }
    .box-title {
      height: 100px;
      color: white;
      font-size: 42px;
      line-height: 100px;
      position: relative;
      padding-left: 24px;
      .box-sizing();
      &::before {
        content: "";
        width: 12px;
        height: 46px;
        background: #086dd9;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        border-radius: 2px 4px;
      }
    }
    .detail-title {
      width: 100%;
      height: 90px;
      text-align: center;
      color: white;
      font-size: 62px;
      font-weight: bold;
    }
    .document-number {
      width: 100%;
      height: 48px;
      line-height: 18px;
      font-size: 34px;
      color: white;
      text-align: right;
    }
    .base-message {
      width: 100%;
      min-height: 384px;
      height: auto;
      //   border: 1px solid #66a7eb;
      .boxBorder(1px);
      overflow: auto;
      padding: 24px 0;
      .box-sizing();
      ul {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          width: 45%;
          min-height: 80px;
          height: auto;
          display: flex;
          justify-content: flex-start;
          font-size: 30px;
          div:nth-child(1) {
            flex-shrink: 0;
            width: 233px;
            height: auto;
            padding: 8px 18px;
            .box-sizing();
            color: white;
            text-align: right;
          }
          div:nth-child(2) {
            width: calc(100% - 78px);
            height: auto;
            padding: 8px 18px;
            .box-sizing();
            color: white;
          }
        }
      }
    }
    .general-box {
      width: 100%;
      min-height: 94px;
      height: auto;
      .boxBorder(1px);
      .setPadding(24px,14px);
      font-size: 30px;
      color: white;
    }
    .organization-system {
      width: 100%;
      min-height: 574px;
      height: auto;
      .boxBorder(1px);
      .setPadding(24px,14px);
      .form-top {
        width: 100%;
        height: 64px;
        display: flex;
        justify-content: space-around;
        div {
          width: 50%;
          height: 100%;
          line-height: 64px;
          color: white;
          font-size: 34px;
          display: flex;
          justify-content: flex-end;
          text-align: center;
          select {
            background: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 34px;
          }
        }
      }
      .table-list-wrap {
        width: 100%;
        height: calc(100% - 64px);
      }
    }
    .emergency-disposal {
      width: 100%;
      height: auto;
      .emergency-disposal-list {
        width: 100%;
        height: auto;
        li {
          width: 100%;
          height: auto;
          .list-open-li {
            width: 100%;
            height: 92px;
            background: #25578b;
            color: white;
            font-size: 34px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .setPadding(0,24px);
            div:nth-child(2) {
              cursor: pointer;
            }
          }
          .list-open-content {
            .setPadding(24px,24px);
          }
        }
      }
    }
    .show-pdf {
      width: 100%;
      height: 1044px;
      background: white;
    }
  }
  .memberInfo-table-list{
    width: 1820px;
    height: 1600px;
    overflow: auto;
    padding: 20px 30px;
    .box-sizing();
  }
  .table-pages{
    width:100%;
    height:80px;
    margin-top: 20px;
    display:flex;
    justify-content: center;
}
}
.table-list{
  .list-header{
    div{
      font-size: 30px;
    }
  }
  .list-body{
    li{
      div{
    font-size: 28px;

      }
    }
  }
}
</style>
