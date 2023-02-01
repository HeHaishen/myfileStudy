<template>
    <div class="holiday-left">
        <div class="holiday-left-left">
            <div class="shine-model-title">
                联合值班各部门到岗情况
            </div>
            <div class="arrive-content">
                <div class="arrive-top">
                    <div class="should-arrive">应到 : <span>{{ allNum }}</span> 个 </div>
                    <div class="real-arrive">实到 : <span>{{ arriveNum }}</span> 个 </div>
                </div>
                <div class="arrive-bottom">
                    <div v-for="(item,key) in list" class="arrive-item" :key="key">
                        <div>{{ item.name }}</div>
                        <div :class="[item.flag?'arrive-green':'arrive-red']">{{ item.flag?'已签到':'未签到' }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="holiday-left-right">
            <div class="shine-model-title">
                应急局值班值守情况
            </div>
            <div class="onDuty-content">
                <div class="onDuty-top" v-for='(item,key) in cityDutyPerson' :key='key'>
                    <div class="onDuty-title">{{item.title}}</div>
                    <div class="onDuty-content-top">
                        <div v-for="(item1,key1) in item.personList" class="item-content-item" :key="key1">
                            <i :class="[item1.checked ? 'active-i' : '' ]"
                                @click='onSelect(item1,key1)'>{{ item1.checked ? "✔" : "" }}</i>

                            {{ item1.label }} : <span> {{ item1.name }} ({{ item1.tel }}) </span>
                        </div>
                    </div>
                </div>
                <div class="onDuty-bottom" v-for='(item,key) in otherDutyPerson' :key='key'>
                    <div class="onDuty-title">{{item.title}}</div>
                    <div class="bottom-item" v-for='(citem,ckey) in item.organList' :key='ckey'>
                        <div class="item-title">{{citem.name}}</div>
                        <p v-for=''></p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                allNum: 40,
                arriveNum: 36,
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
                ],
                // 市值班人员
                cityDutyPerson: [
                    {
                        title: '市局值班值守',
                        personList: [
                            { label: '领导', name: '张凯伦', tel: '138******00', checked: false },
                            { label: '总值班长', name: '张凯伦', tel: '138******00', checked: false },
                            { label: '主班', name: '张凯伦', tel: '138******00', checked: false },
                            { label: '副班', name: '张凯伦', tel: '138******00', checked: false },
                            { label: '备勤', name: '张凯伦', tel: '138******00', checked: false },
                            { label: '司机', name: '张凯伦', tel: '138******00', checked: false }
                        ]
                    }
                ],
                otherDutyPerson: [
                    {
                        title: '各区应急管理局',
                        organList: [
                            {
                                name: '天河应急管理局',
                                personList: [
                                    { position: '区值班长', name: '张凯伦', tel: '138******00', checked: false },
                                    { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                                    { position: '区值人员', name: '张凯伦', tel: '138******00', checked: false },
                                ]
                            }
                        ]
                    },
                ]
            }
        },
        methods: {
            onSelect(item, key) {
                this.cityDutyPerson[0].personList[key].checked = !this.cityDutyPerson[0].personList[key].checked
            }
        }
    }
</script>
<style lang='less' scoped>
    @import '../index.less';
</style>