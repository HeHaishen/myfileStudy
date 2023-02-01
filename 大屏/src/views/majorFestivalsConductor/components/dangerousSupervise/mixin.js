/*
 * @Description: 拨打电话
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-12 10:09:30
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 11:01:12
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
      let { contact, phone } = record;
      console.log(e,'e');
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name: contact,
        phone: phone,
      });
    },

    clickMessage(record, e) {
      console.log(record, 'clickMessage');
      let { contact, phone } = record;
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",
        name: contact,
        phone: phone,
      });
    },
  }
}