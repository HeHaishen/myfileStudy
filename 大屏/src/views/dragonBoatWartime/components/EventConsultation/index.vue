<template>
   <div class="event-consultation">
       <div class="e-c-e-i">
           <event-info></event-info>
       </div>
       <div class="e-c-c">
           <consultation></consultation>
       </div>
   </div>
</template>

<script>
import Consultation from './components/Consultation';
import EventInfo from './components/EventInfo';

export default {
   name:"",
   props:{}, 
   components: {
       EventInfo,
       Consultation
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
.event-consultation{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    .e-c-e-i{
        height: 45%;
        width: 100%;
    }
    .e-c-c{
        height: 45%;
        width: 100%;
    }
}
</style>