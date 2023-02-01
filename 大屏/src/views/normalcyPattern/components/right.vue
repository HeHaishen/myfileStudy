<template>
    <div class="normalcy-right">
        <div class="normalcy-right-top">
            <div class="shine-model-title">事件信息滚动上报</div>
            <clist :columns="inforHeaderList" :listData="inforListData">
                <template slot="level" slot-scope="{record,text}">
                    <span> {{levelText(text)}}
                    </span>
                </template>
            </clist>

        </div>
        <div class="normalcy-right-bottom">
            <div class="shine-model-title">重大危险源信息</div>
            <clist :columns="dangerHeaderList" :listData="dangerListData">
            </clist>
            <div class="danger-statistics">
                <div class="danger-statistics-title">
                    全市重大危险源统计
                </div>
                <ul>
                    <li v-for='item in dangerArr' :key='item'>
                        <div class="firm">{{item.name}}</div>
                        <div class="firmNum"><span>{{item.number}}</span><i>{{item.unit}}</i></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Clist from '@/components/APicture/c-table'
    export default {
        components: {
            Clist
        },
        data() {
            return {
                inforHeaderList: [
                    { title: '发生时间', index: 0, textIndex: 'time', width: '15%' },
                    { title: '内容', index: 1, textIndex: 'content', width: '40%' },
                    { title: '区域', index: 2, textIndex: 'area', width: '15%' },
                    { title: '事件等级', index: 3, textIndex: 'level', width: '15%' },
                    { title: '事件等级', index: 4, textIndex: 'resource', width: '15%' },
                ],
                inforListData: [
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                    { time: '2021-05-13', content: '天河区天河东路发生内涝事故', area: '天河区', level: 1, resource: '天河区', index: 0 },
                ],
                dangerHeaderList: [
                    { title: '区域', index: 0, textIndex: 'area', width: '30%' },
                    { title: '重大危险源', index: 1, textIndex: 'dangerResource', width: '40%' },
                    { title: '探头', index: 2, textIndex: 'probe', width: '30%' },
                ],
                dangerListData: [
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 0 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 1 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 2 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 0 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 1 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 2 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 0 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 1 },
                    { area: '天河区', dangerResource: '15', probe: '2个', index: 2 },
                ],
                dangerArr: [
                    {
                        name: '重大危险源企业',
                        number: '50',
                        unit: '家'
                    },
                    {
                        name: '涉氨企业',
                        number: '66',
                        unit: '家'
                    },
                    {
                        name: '剧毒化学品',
                        number: '20',
                        unit: '家'
                    },
                ]
            }

        },
        methods: {
            levelText(text) {
                if (text == 1) {
                    return '一般事故'
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    @import '../index.less';
</style>