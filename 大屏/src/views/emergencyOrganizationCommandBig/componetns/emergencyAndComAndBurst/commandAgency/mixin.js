/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-10-13 14:25:48
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2021-10-13 14:29:44
 */

import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";

export default {
  components: { ContactPhone, MessageSend },
  data() {
    return {}
  },
  mounted() {
    window.clickTeamMessage = this.clickTeamMessage;
    window.clickTeamPhone = this.clickTeamPhone;
  },
  methods: {
    clickMobilePhone(record, e) {
      console.log(record);
      // return false
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name:  record.name ,
        phone: record.telephone,
      });
    },
    // 打电话
    clickTeamPhone(vValue) {
      let { event } = vValue;
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name:  record.name ,
        phone: record.telephone,
      });
    },
    // 发短信
    clickTeamMessage(vValue) {
      let { event } = vValue;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name:  record.name ,
        phone: record.telephone,
      });
    },

    clickMessage(record, e) {
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name:  record.name ,
        phone: record.telephone,
      });
    },
  }
}