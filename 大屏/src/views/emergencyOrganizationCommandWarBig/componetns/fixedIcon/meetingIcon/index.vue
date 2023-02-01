<!--
 * @Description: 视频会商联系人
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-10-29 16:52:18
 * @LastEditTime: 2021-11-11 22:56:11
-->
<template>
  <div class="all-icons-box meeting-icon">
    <div
      style="width: 100%; height: 100%"
      title="视频会商"
      @click="iconClick($event)"
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="38px"
        height="35px"
        viewBox="0 0 38 35"
        enable-background="new 0 0 38 35"
        xml:space="preserve"
      >
        <image
          id="image0"
          width="38"
          height="35"
          x="0"
          y="0"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAjCAQAAABS+bCWAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
    RQflCh4PNhzmapKbAAADeUlEQVRIx62WT2gcZRjGf9/MbDabNWXXlqhNbUwN1EDR/vXQRntRwZwU
    /yDSBgTBi0LRUzE3TyJCUw+CPVhBbx5EMf5boxWKjYamWloTWqtEEdNsYpo2+zc7j4ed2Z3Z2c1W
    8NnTfN/7Pvu+z/fM+41RkhGOkKaIIQoRZ55nWeADdnMdi2ZwKHOSMYfDHKOD9RHDpocUqXViRrEt
    jrSlchGwRjs8Z3Fr26CbhkW+iU5u27xqtWGUnAbZxXm+ocBOhki2ICpyhh+JMcRO7MC6QXOqw9WE
    9guh2zSmG97q39qlXk17TwW9q21CaI8+0Vogey5MNqdhoWG9oI3q0bjcJmSntU0JHdYTQgc0E8x2
    Qg3MMsUdvMZuXE4wxUPEInpe4AqP8A7LXGaaWbbXN8NkWxhkmu/IMsMmBppatI/N/EGGZRYYZGtw
    y2kI7OcUo8RZ4l7uC8nrizxAP6cZocIKD3B32Bp15DnBOFW/wwxj/B4h+4vjnAMcbCDD21wPiuAf
    QEXvK62YXtK4Mjqm7UIvalHSfO0AlnVUjnr1ur7WZzqqlLr1lgrR07ykg0KjuiZJKulj3aUufShX
    C9qlXp2TNKEebdR7XvoNvSFHO3TWJ/PbFBeY4n4OsQGAGMM8Ro5J8p6tLcqc4SoP8zRxAJI8w4Nc
    5GcqYc1clsjTx+Za/zZ3Arnaq2UoMw/soLMWk6YXl98oNh6AwSIRmiAOpsEcLsarvIoOuoCi/57W
    rWFj8QPHSZPDJU6cCdRgDhvxOZ1UKGBIUOInwPjV18kSpLjEq7VpYBBOoCVhsYEYX5IJTBXRySaf
    xfEasdnPK1ymu0ZmkSfB4yR9RejkKUosc4svOLBKP0+S8DK0qHZY0R5t0WzbuEWHL0jXGotC2CyS
    Jc+3/EmpRUwV/xglAyI3Tk/jWSIHdBFDLWK8s3bY6lmwWW3y9ExgyLHmkTevCypG39NNe6hpg2Gs
    GhXbXnU3DYuT/xcVnxoN8CZDpNA60rZSyYdNnrO8bAR9HOR2CFixijXKTYhikXvBYLPCKS4aVR+d
    Jv/Y6oPAiZBBBReMaIlHGcamFFjpQHzFR60SnNZcDPG8Z9R6DWWu/ReyOHsZpIDFPjoil51hLyO4
    JPmFydoIqCva8LtHGa0qq2ztogijoKyyWtWkDjTmRitb4lf2IcpkW3RjYQHzXG3c+BffLD6vvDdz
    +QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0zMFQxMjo1NDoyOCswMzowMMvZ3AEAAAAldEVY
    dGRhdGU6bW9kaWZ5ADIwMjEtMTAtMzBUMTI6NTQ6MjgrMDM6MDC6hGS9AAAAAElFTkSuQmCC"
        />
      </svg>
    </div>
    <div>
      <pop-up-layer
        :show="listShow"
        :setStyles="{}"
        @doClose="listClose"
        title="视频会商联系人"
        opsition="btnRight"
        ref="myPopUpLayer"
      >
        <template slot="content" class="upLayer_content">
          <div class="content-list">
            <div class="content-opation">
              <p>发起会商</p>
            </div>
            <ul class="contact-list">
              <li
                v-for="(i, k) in contactList"
                :key="i.id"
                @click="choseLiPeople(i, k)"
              >
                <div class="img-icon">
                  <p v-html="i.icon"></p>
                </div>
                <div class="text-name">{{ i.name }}</div>
                <div
                  class="icon-type"
                  v-html="i.chosed ? currentIcon : errorIcon"
                ></div>
              </li>
            </ul>
          </div>
        </template>
      </pop-up-layer>
    </div>
  </div>
</template>
<script>
import iconObjSvg from "./icon.js";
import { useEventIdFindContact } from "@/api/emergencyOrganizationCommandWar";
export default {
  data() {
    return {
      parentDatas: {},
      currentIcon: iconObjSvg.current,
      errorIcon: iconObjSvg.error,
      listShow: false,
      contactList: [
        {
          id: 1,
          icon: iconObjSvg.header,
          name: "李世杰",
          chosed: false,
        },
      ],
    };
  },
  methods: {
    iconClick(e) {
      this.listShow = !this.listShow;
      this.$emit("iconClick", { showType: this.listShow });
      if (this.listShow) {
        this.$refs.myPopUpLayer.saveEvent = e;
        let sendObj = this.parentDatas.jbbh;
        this.dogetContactList({ body: sendObj, pageSize: 1000, page: 1 });
      } else {
        this.$refs.myPopUpLayer.saveEvent = null;
      }
    },
    // 获取联系人
    dogetContactList(item) {
      useEventIdFindContact(item).then((res) => {
        this.contactList = [];
        if (res.success) {
          if (res.body && res.body.data && res.body.data.length) {
            res.body.data.map((i, k) => {
              this.contactList.push({
                id: 1 + i.lxdh,
                icon: iconObjSvg.header,
                name: i.xm,
                chosed: false,
                lxdh: i.lxdh,
                ...i
              });
            });
          } else {
            this.$MyMessage.warning("无相关预案联系人，或未绑定相关预案！");
          }
          console.log(res);
        } else {
          this.$MyMessage.warning(res.message);
        }
      });
    },
    // 获取
    // 关闭弹出层
    listClose() {
      this.listShow = false;
    },
    // 选中人员
    choseLiPeople(i, k) {
      i.chosed = !i.chosed;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.meeting-icon {
  /* top: 238vh * @h;
  right: 1029vw * @w; */
  top:0px;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
