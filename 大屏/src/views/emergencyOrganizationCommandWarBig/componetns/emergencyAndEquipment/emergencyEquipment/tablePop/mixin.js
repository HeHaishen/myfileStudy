/*
 * @Description: 拨打电话
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-12 10:09:30
 * @LastEditors: chenmeiqi
 * @LastEditTime: 2021-11-06 14:56:54
 */
import ContactPhone from "@/components/APicture/contactPhone/index.vue";
import MessageSend from "@/components/APicture/messageSend/index.vue";

export default {
  components: { ContactPhone, MessageSend },
  data() {
    return {};
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
        opsition: "btnRight",
        name: contacts,
        phone: phone,
      });
    },

    clickMessage(record, e) {
      console.log(record, "clickMessage");
      let { contacts, phone } = record;

      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "btnRight",
        name: contacts,
        phone: phone,
      });
    },
  },
};
