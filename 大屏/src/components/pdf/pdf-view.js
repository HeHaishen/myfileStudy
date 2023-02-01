/*
 * @Description: pdf渲染
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-06-28 10:13:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-10 18:54:28
 */
import Pdf from "vue-pdf";
import Pagination from "ant-design-vue/es/pagination";
import Button from "ant-design-vue/es/button";
import Icon from "ant-design-vue/es/icon";
import axios from "axios";
import Vue from "vue";

export default {
  name: "pdf-view",
  components: {
    Pdf,
  },
  props: {
    pdfUrl: {
      type: String,
      default: () => null,
    },
    /** 附件数据 */
    recordData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: 1,
      total: 0, // 最大页数
    };
  },
  created() {},
  watch: {
    pdfUrl: {
      deep: true,
      immediate: true,
      handler: function (val) {
        // console.log(val);
        this.page = 1;
        let src = Pdf.createLoadingTask(val);
        console.log(src);
        src.promise.then((pdf) => {
          this.total = pdf.numPages;
        });
      },
    },
  },
  methods: {
    onChange(page) {
      this.page = page;
    },

    /** 下载附件 */
    async download() {
     

      let res = await axios({
        url: this.pdfUrl,
        method: "get",
        responseType: "blob",

      })
        .then((res) => res)
        .catch((err) => {
          this.$message.error(err);
        });
      const reader = new FileReader();
      reader.readAsDataURL(res.data);
      reader.onload = (e) => {
        const a = document.createElement("a");
        a.download = this.recordData.title;
        // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
        a.href = e.target.result;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    },
  },
  render() {
    return (
      <div class="pdf-view">
        <div class="pdf">
          <Pdf
            {...{
              attrs: {
                src: this.pdfUrl,
                page: this.page,
              },
            }}
          ></Pdf>
        </div>
        <div class="btns">
          <Button
            style="position: absolute;top: 3px;left: 5px;"
            {...{
              props: {
                size: 'small',
              },
              on: {
                click: this.download
              }
            }}> <Icon type="download" /> 附件下载 </Button>
          <Pagination
            style="text-align: center;padding-top: 3px;"
            {...{
              props: {
                total: this.total,
                pageSize: 1,
                size: "small",
                showQuickJumper: true,
                current: this.page,
              },
              on: {
                change: this.onChange,
              },
            }}
          />
        </div>
      </div>
    );
  },
};
