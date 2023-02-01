<!--
 * @Description: 发送信息使用文档
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-16 15:29:45
 * @LastEditTime: 2021-08-16 20:45:44
-->
### 引入：
 ````js es5 es6
import MessageSend from "@/components/APicture/messageSend/index.vue";
components:{
    MessageSend
}

 ````
### html使用
 ```` html5
<MessageSend ref="MessageSend" />
````
### js调用
````js es5 es6 
 this.$refs.ContactPhone.$emit("show", {
        saveEvent: e,
        opsition: "btnLeft",// 定位的位置，跟popUpLayer说明一致
        name:'张三',
        phone:'15919336666',
      });
````

### 注意事项
如果发现在定位中发现定位位置和配置配置不对是
1、检查页面中是否存在tranfrom属性
如果存在，请通过自定义定位处理，详细可查看popUpLayer说明一致

