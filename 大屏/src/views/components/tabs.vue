<template>
    <div class="tabsWrap">
      <ul class="tabs">
        <li class="list border-type" 
          v-for="(item,index) in tabsParam"
          :key="index"
          @click="toggleTabs(index)"
          :class="{'border-checked':index == nowIndex,'tab-bg':type =='chartTab','tab-checked':index != nowIndex,'tab-header':header== 'header' }"
          >{{item}}</li>
      </ul>
    </div>
</template>

<script>

export default {
    name: "tabs",
    components: {

    },
    props:{
      tabsParam:{
        type:Array,
        default:[]
      },
      type:{
        type:String
      },
      fontSize:{
        type:String
      },
      header:{
        type:String
      }
    },
    data() {
      return {
        nowIndex:0,
      }
    },
    beforeDestroy() {},
    created() {},
    mounted(){},
    methods: {
      toggleTabs(index){
        this.$emit('toggleTabs',index)
				this.nowIndex=index;
			},
    },
};
</script>

<style lang="less" scoped>
    .tabsWrap{
      height: 100%;
			.tabs{
				display: flex;
        height: 100%;
				.list{
					font-size: var(--super3-mini-font);
					display: inline-block;
          flex: 1;
				  height: 100%;
				  line-height: 200%;
					margin-right: 13px;
          cursor: pointer;
          &::before{
            display: inline-block;
            content: "";
            height: 100%;
            vertical-align: middle;
				  }
					&:last-child{
						margin-right:0 !important;
					}
          &.tab-bg{
            font-size: 23px;
            font-weight: bold;
            color: #01fefc;
            background: url('../../assets/images/enterprise/tabs_bg.png') 0 10px no-repeat;
            background-size: 100% 70%;
            border: none;
            box-shadow:none;
            height: 55px;
            line-height: 43px;
            flex: 1;
          }
          &.tab-checked{
            font-weight: normal;
            color: #fff;
            background: none;
          }
          &.tab-header{
            background-size: 70% 76%;
            font-size: var(--middle-font);
            // height: 70px;
          }
				}
			}
    }
</style>