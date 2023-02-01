<!--  -->
<template>
  <div class="depart-ment">
    <!-- <div class="duty-content"></div> -->
    <ModelBox :title="'广州市应急管理局'" class="depart-ment-box">
      <div slot="content" class="depart-ment-content">
        <div class="title">领导：{{ departMentObj.leader }}</div>
        <ul>
          <li v-for="(item, index) in departMentArr" :key="index">
            <span class="leader-img">
              <img
                src="../../../../assets/images/emergencyOrganizationCommand/leader_icon.png"
                alt=""
              />
            </span>
            <div class="info">
              <p class="post">{{ item.post }}</p>
              <p class="phone-message">
                {{ item.name
                }}<span @click="clickMobilePhone(item, $event)">
                  <img
                    src="../../../../assets/images/emergencyOrganizationCommand/phone_icon.png"
                    alt="" /></span
                ><span @click="clickMessage(item, $event)"
                  ><img
                    src="../../../../assets/images/emergencyOrganizationCommand/message_icon.png"
                    alt=""
                /></span>
              </p>
              <p>{{ item.phone }}</p>
            </div>
          </li>
        </ul>
      </div>
    </ModelBox>
    <ContactPhone ref="ContactPhone" />
    <MessageSend ref="MessageSend" />
  </div>
</template>

<script>
import ModelBox from "../modelBox/index";
import { getIdsmApi } from "@/api/idsm/index";
import moment from "moment";
import mixin from "./mixin";

export default {
  components: {
    ModelBox,
  },
  mixins: [mixin],

  data() {
    return {
      departMentObj: {},
      departMentArr: [
        {
          post: "总值班长",
          name: undefined,
          phone: undefined,
        },
        {
          post: "值班长",
          name: undefined,
          phone: undefined,
        },
        {
          post: "主班",

          name: undefined,
          phone: undefined,
        },
        {
          post: "副班",

          name: undefined,
          phone: undefined,
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.doQuery();
    },
    doQuery() {
      let code = "RZSXx61s";
      let time = moment().format("YYYY-MM-DD");
      let newTime = time.replace(/\-/g, "/");
      let data = {
        body: {
          date: newTime,
        },
        page: 1,
        pageSize: -1,
        sortName: "sid",
        sortOrder: "desc",
      };
      getIdsmApi(code, data).then((res) => {
        if (res.success) {
          console.log(res, "resres");
          this.departMentObj = res.body.data[0];
          const {
            dutyChief,
            dutyChiefTel,
            mainDuty,
            mainDutyTel,
            viceDuty,
            viceDutyTel,
            dutyLeader,
            dutyLeaderTel,
          } = this.departMentObj || {};
          this.departMentArr[0].name = dutyChief;
          this.departMentArr[0].phone = dutyChiefTel ? dutyChiefTel : "-";
          this.departMentArr[1].name = dutyLeader;
          this.departMentArr[1].phone = dutyLeaderTel ? dutyLeaderTel : "-";
          this.departMentArr[2].name = mainDuty;
          this.departMentArr[2].phone = mainDutyTel ? mainDutyTel : "-";
          this.departMentArr[3].name = viceDuty;
          this.departMentArr[3].phone = viceDutyTel ? viceDutyTel : "-";
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
@import "../../common.less";
@import "./mixin.less";

.depart-ment-box {
  top: 465vh * @h;
  color: #fff;
  .depart-ment-content {
    width: 980vw * @w;
    height: 260vh * @h;
    .title {
      width: 220vw * @w;
      height: 40vh * @h;
      display: flex;
      align-items: center;
      font-size: 24vh * @h;
      background-color: rgb(235, 143, 14);
      color: #fff;
      justify-content: center;
      border-radius: 15vh * @h;
      margin: 15vh * @h 15vw * @w;
    }
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: calc(100% - (70vh * @h));
      li {
        display: flex;
        justify-content: space-between;
        width: 30%;
        .leader-img {
          display: flex;
          width: 28%;
          justify-content: center;
        }
        img {
          width: 50vh * @h;
          height: 50vh * @h;
        }
        .info {
          width: 67%;
          font-size: 26vh * @h;
          .phone-message {
            display: flex;
            align-items: center;
            span {
              margin: 4vh * @h 4vw * @w;
              cursor: pointer;
            }
          }
          img {
            width: 25vh * @h;
            height: 25vh * @h;
          }
        }
        .post {
          font-size: 32vh * @h;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
