/*
 * @Description: 拨打电话
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-12 10:09:30
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-12 11:35:06
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
      let { fzr, fzrbgdh } = record;
      // console.log(record);
      // return false
      this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name: fzr,
        phone: fzrbgdh,
      });
    },
    // 打电话
    clickTeamPhone(vValue) {
      let { fzr, fzrbgdh, event } = vValue;
      console.log(vValue);

      this.$refs.ContactPhone.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name: fzr,
        phone: fzrbgdh,
      });
    },
    // 发短信
    clickTeamMessage(vValue) {
      let { name, phone, event } = vValue;
      console.log(vValue);
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: event,
        opsition: "pageCenter",
        name,
        phone,
      });
    },

    clickMessage(record, e) {
      console.log(record, 'clickMessage');
      let { fzr, fzrbgdh } = record;
      // return
      this.$refs.MessageSend.$emit("show", {
        saveEvent: e,
        opsition: "pageCenter",
        name: fzr,
        phone: fzrbgdh,
      });
    },
  }
}