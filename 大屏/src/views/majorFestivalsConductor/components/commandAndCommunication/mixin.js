/*
 * @Description: 拨打电话
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-12 10:09:30
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 11:31:51
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
      let { contacts, phone } = record;
      // console.dir(e,'e');
      // return
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name: contacts,
        phone: phone,
      });
    },
    // 打电话
    clickTeamPhone(vValue) {
      let { contacts, phone, event } = vValue;
      console.log(vValue);

      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name: contacts,
        phone: phone,
      });
    },
    // 发短信
    clickTeamMessage(vValue) {
      let { contacts, phone, event } = vValue;
      console.log(vValue);
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name: contacts,
        phone: phone,
      });
    },

    clickMessage(record, e) {
      console.log(record, 'clickMessage');
      let { contacts, phone } = record;
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name: contacts,
        phone: phone,
      });
    },
  }
}