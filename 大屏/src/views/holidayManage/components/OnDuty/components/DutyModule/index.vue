<template>
    <div class="duty-module">
        <public-title title="应急局值班值守情况"></public-title>
        <div class="duty-module-content">
            <div class="d-m-c-l">
                <div class="d-m-c-c">
                    <div class="d-m-c-c-item" v-for="(item,key) in cityDutyPerson" :key="key">
                        <div class="item-title">{{ item.title }}</div>
                        <div class="item-content">
                            <div v-for="(item1,key1) in item.personList" class="item-content-item" :key="key1">
                                <input type="checkbox" @change.stop.prevent="onChange(item1)" v-model="item1.checked" class="my_checkbox" />
                                {{ item1.label }} :  <span> {{ item1.name }} ({{ item1.tel }}) </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-m-c-o">
                    <div class="d-m-c-o-item" v-for="(item,key) in otherDutyPerson" :key="key">
                        <div class="item-title">{{ item.title }}</div>
                        <div class="item-list">
                            <div v-for="(item1,key1) in item.organList" class="i-l-item" :key="key1">
                                <div class="i-l-i-title">{{ item1.name }}</div>
                                <div class="i-l-i-persons">
                                    <div class="i-l-i-person" v-for="(item2,key2) in item1.personList" :key="key2">
                                        <div> 
                                            <input type="checkbox" @change.stop.prevent="onChange(item2)" v-model="item2.checked" class="my_checkbox" />
                                            {{ item2.name }} 
                                        </div>
                                        <div> {{ item2.position }} </div>
                                        <div> {{ item2.tel }} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            // 市值班人员
            cityDutyPerson:[
                { 
                    title: '市局值班值守',
                    personList:[
                        { label: '领导', name: '张凯伦', tel: '138******00', checked: false },
                        { label: '总值班长', name: '张凯伦', tel: '138******00', checked: false },
                        { label: '主班', name: '张凯伦', tel: '138******00', checked: false },
                        { label: '副班', name: '张凯伦', tel: '138******00', checked: false },
                        { label: '备勤', name: '张凯伦', tel: '138******00', checked: false },
                        { label: '司机', name: '张凯伦', tel: '138******00', checked: false }
                    ]
                }
            ], 
            // 各区值班人员
            otherDutyPerson:[
                { 
                    title: '各区应急管理局',
                    organList: [
                        { 
                            name: '天河应急管理局',
                            personList:[
                                { position: '区值班长', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                            ]
                        },
                        {
                            name: '番禺区水务局',
                            personList:[
                                { position: '区值班长', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                            ]
                        },
                        {
                            name: '市规划和自然资源局',
                            personList:[
                                { position: '区值班长', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                            ]
                        },
                        {
                            name: '市住房城乡建设局',
                            personList:[
                                { position: '区值班长', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                            ]
                        },
                        {
                            name: '市农业村局',
                            personList:[
                                { position: '区值班长', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                                { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                            ]
                        }
                    ]
                }
            ], 
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        onChange(){}
    },
};
</script>
<style lang='less' scoped>
@import "../../styles/common.less";

.duty-module{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url('../../images/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    color: #fff;
    .duty-module-content{
        width: 100%;
        height: 100%;
        padding: 5%;
        box-sizing: border-box;
        .d-m-c-l{
            width: 100%;
            height: 100%;
            overflow: auto;
            &::-webkit-scrollbar { display:none; }
            .d-m-c-c{
                .d-m-c-c-item{
                    .item-title{
                        font-size: var(--middle-font);
                        margin-bottom: 10px;
                    }
                    .item-content{
                        border: 1px solid #057F96;
                        padding: 10px;
                        display: grid;
                        grid-row-gap: 10px;
                        grid-template-columns: repeat(2, 50%);
                        .item-content-item{
                            span{
                                color: rgb(0,254,254);
                            }
                        }
                        
                    }
                }
            }
            .d-m-c-o{
                .d-m-c-o-item{
                    .item-title{
                        font-size: var(--middle-font);
                        margin: 20px 0;
                    }
                    .item-list{
                        .i-l-item{
                            border: 1px solid #057F96;
                            padding: 10px 0;
                            margin-bottom: 20px;
                            .i-l-i-title{
                                color: rgb(0,254,254);
                                background: linear-gradient(to right, rgba(0,254,254, 0.3), rgba(0,254,254, 0));
                                font-weight: bold;
                                padding: 10px 20px;
                            }
                            .i-l-i-persons{
                                padding: 10px;
                                .i-l-i-person{
                                    display: flex;
                                    justify-content: space-between;
                                    margin-bottom: 10px;
                                    &:last-child{
                                        margin-bottom: 0px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
}
</style>