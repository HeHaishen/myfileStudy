<template>
   <div class="slopes-and-video">
       <div class="s-a-v-s">
           <slopes-module></slopes-module>
       </div>
       <div class="s-a-v-v">
           <video-module></video-module>
       </div>
   </div>
</template>

<script>
import SlopesModule from './components/SlopesModule';
import VideoModule from './components/VideoModule';

export default {
   name:"",
   props:{}, 
   components: {
       SlopesModule,
       VideoModule
   },
   data () {
       return {};
   },
   watch: {}, 
   computed: {}, 
   created(){}, 
   mounted(){}, 
   methods: {}, 
}
</script>
<style lang='less' scoped>
.slopes-and-video{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    .s-a-v-s{
        height: 45%;
        width: 100%;
    }
    .s-a-v-v{
        height: 45%;
        width: 100%;
    }
}
</style>