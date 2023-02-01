<template>
    <div class="sign-module">
        <public-title title="联合值班各部门到岗情况"></public-title>
        <div class="sign-module-content">
            <div class="s-m-c-top">
                <div class="s-m-c-t-all">应到 : <span>{{ allNum }}</span> 个 </div>
                <div class="s-m-c-t-arrive">实到 : <span>{{ arriveNum }}</span> 个 </div>
            </div>
            <div class="s-m-c-bottom">
                <div v-for="(item,key) in list" class="s-m-c-b-item" :key="key">
                    <div>{{ item.name }}</div>
                    <div :class="[item.flag?'green':'red']">{{ item.flag?'已签到':'未签到' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PublicTitle from '../public/PublicTitle.vue';

export default {
    name: "",
    props: {},
    components: {
        PublicTitle
    },
    data() {
        return {
            allNum: 40, // 应到
            arriveNum: 36, // 实到
            list: [
                { name: '市发展改革委', flag: true },
                { name: '市公安局', flag: false },
                { name: '市规划和自然资源局', flag: true },
                { name: '市住房城乡建设局', flag: false },
                { name: '市水务局', flag: true },
                { name: '市农业村局', flag: false },
                { name: '市城市管理综合执法局', flag: true },
                { name: '市港务局', flag: false },
                { name: '市林业园林局', flag: true },
                { name: '市气象局', flag: false },
                { name: '省水文局广州水文分局', flag: true },
                { name: '市住房城乡建设局', flag: false },
                { name: '市水务局', flag: true },
                { name: '市农业村局', flag: false },
                { name: '省水文局广州水文分局', flag: true },
                { name: '市住房城乡建设局', flag: false },
                { name: '市水务局', flag: true },
                { name: '市农业村局', flag: false },
            ]
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang='less' scoped>
.sign-module{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url('../../images/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    color: #fff;
    .sign-module-content{
        width: 100%;
        height: 100%;
        padding: 5%;
        .s-m-c-top{
            display: flex;
            height: 50px;
            line-height: 50px;
            margin-bottom: 20px;
            .s-m-c-t-all{
                margin-right: 100px;
                span{
                    color: rgb(0,254,254);
                    font-weight: bold;
                    font-size: var(--mini-number-font);
                }
            }
            .s-m-c-t-arrive{
                span{
                    color: rgb(100,236,86);
                    font-weight: bold;
                    font-size: var(--mini-number-font);
                }
            }
        }
        .s-m-c-bottom{
            height: calc(100% - 70px);
            overflow: auto;
            &::-webkit-scrollbar { display:none; }
            .s-m-c-b-item{
                padding: 10px 0;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(234, 238, 251, .2);
                .green{
                    color: #5CDA54;
                }
                .red{
                    color: #ED3E3E;
                }
            }
            
        }
    }
}
</style>