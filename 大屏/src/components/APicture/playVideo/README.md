<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-08-24 21:22:11
 * @LastEditTime: 2021-09-02 14:17:14
-->
## 分页组件使用说明
### 参数说明
  - 1.viedoUrl:传入的页数--默认0
  - 2.saveEvent:如果要用到点击位置的，使用
### 引入
``` ecmascript 6
    import PlayVideo from '@/components/APicture/playVideo'
    data(){
        return {
        }
    },
    componts:{PlayVideo}
    methods:{
        doPlay(){
           this.$refs.PlayVideo.$emit('show',{viedoUrl:'',saveEvent:"",deviceId:'',id:''})
        },
    }

```

### 页面中模板使用
``` html 
<div @click="doPlay"></div> 
 <PlayVideo ref="PlayVideo" />
```
