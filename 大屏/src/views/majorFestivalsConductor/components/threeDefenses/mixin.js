/*
 * @Description: 拨打电话
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-12 10:09:30
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 13:44:24
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
      // console.log(record);
      // return false
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name: this.activeKey == 1 ? record.name : record.username,
        phone: this.activeKey == 1 ? record.phone : record.mobile,
      });
    },
    // 打电话
    clickTeamPhone(vValue) {
      let { event } = vValue;

      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name: this.activeKey == 1 ? record.name : record.username,
        phone: this.activeKey == 1 ? record.phone : record.mobile,
      });
    },
    // 发短信
    clickTeamMessage(vValue) {
      let { event } = vValue;
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name: this.activeKey == 1 ? record.name : record.username,
        phone: this.activeKey == 1 ? record.phone : record.mobile,
      });
    },

    clickMessage(record, e) {
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name: this.activeKey == 1 ? record.name : record.username,
        phone: this.activeKey == 1 ? record.phone : record.mobile,
      });
    },
  }
}