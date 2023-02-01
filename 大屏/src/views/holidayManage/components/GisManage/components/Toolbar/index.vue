<template>
    <div class="toolbar">
        <div :class="['toolbar-content', isOpen ? '' : 'move-left']">
            <!-- 右边按钮 -->
            <div class="toolbar-right" @click="onClickBtns">
                <img :src="isOpen ? closeImg : openImg" />
            </div>

            <div class="toolbar-search">
                <a-input-search
                    allowClear
                    placeholder="输入关键字"
                    class="t-s-input"
                    v-model="searchText"
                    style="width: 100%"
                    @search="onSearch"
                />
            </div>
            <div class="toolbar-lists">
                <div
                    class="toolbar-list"
                    v-for="(item, key) in list"
                    :key="key"
                >
                    <div class="t-l-title">{{ item.title }}</div>
                    <div class="t-l-content">
                        <div
                            class="t-l-c-item"
                            v-for="(item1, key1) in item.dataList"
                            :key="key1"
                        >
                            <div>{{ item1.name }}</div>
                            <div>
                                <input
                                    type="checkbox"
                                    @change.stop.prevent="onChange(item1)"
                                    v-model="item1.checked"
                                    class="my_checkbox"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    props: {},
    components: {},
    data() {
        return {
            isOpen: true,
            openImg: require("../../images/open.png"),
            closeImg: require("../../images/close.png"),
            searchText: "",
            list: [
                {
                    title: "水利",
                    dataList: [
                        { name: "水库", checked: false },
                        { name: "堤防", checked: false },
                        { name: "闸坝", checked: false },
                    ],
                },
                {
                    title: "易涝点",
                    dataList: [
                        { name: "水浸点", checked: false },
                        { name: "涵隧", checked: false },
                        //{ name: "隧道", checked: false },
                    ],
                },
                {
                    title: "监测站点",
                    dataList: [
                        { name: "雨量站", checked: false },
                        { name: "水位站", checked: false },
                    ],
                },
                {
                    title: "全市隐患企业分布",
                    dataList: [
                        { name: "逾期未整改企业", checked: false },
                        { name: "储罐区(储罐)", checked: false },
                    ],
                },
                {
                    title: "重大危险源分布",
                    dataList: [
                        { name: "库区(库)", checked: false },
                        { name: "生产场所", checked: false },
                    ],
                },
                {
                    title: "危险源等级分布",
                    dataList: [
                        { name: "一般危险", checked: false },
                        { name: "较大危险源", checked: false },
                        { name: "重大危险源", checked: false },
                        { name: "特大危险源", checked: false },
                    ],
                },
            ],
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        onChange(item) {
			if(item.name=="水库"){
			  pGzznCore.addPromiseReservoirs(item.checked);
			}
			else if(item.name=="堤防"){
			  pGzznCore.addPromiseBeware(item.checked);
			}
			else if(item.name=="水浸点"){
			  pGzznCore.addPromiseWaterloggingPoint(item.checked);
			}
			else if(item.name=="雨量站"){
			  pGzznCore.addPromiseRainfallStation(item.checked);
			}
			else if(item.name=="水位站"){
			  pGzznCore.addPromiseWaterLevel(item.checked);
			}
			else if(item.name=="涵隧"){
			  pGzznCore.addPromiseTunnel(item.checked);
			}
		},
        onClickBtns() {
            this.isOpen = !this.isOpen;
        },
        onSearch() {},
    },
};
</script>
<style lang='less' scoped>
@import "../../styles/common.less";
.toolbar {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    pointer-events: none;
    color: #fff;
    .move-left {
        transform: translateX(-100%);
    }
    .toolbar-content {
        width: calc(100% - 20px);
        height: 100%;
        border: 1px solid rgb(0, 254, 254);
        background-color: rgba(30, 46, 69, 0.6);
        transition: 0.5s;
        pointer-events: auto;
        position: relative;
        .toolbar-right {
            position: absolute;
            right: -20px;
            top: 50%;
            width: 20px;
            height: 80px;
            cursor: pointer;
            transform: translateY(-50%);
            img {
                width: 100%;
                height: 100%;
            }
        }
        .toolbar-search {
            padding: 20px;
            /deep/ .t-s-input {
                .ant-input {
                    color: #fff;
                    background-color: transparent;
                    border-color: rgb(0, 254, 254);
                }
                .ant-input-search-icon {
                    color: rgb(0, 254, 254);
                }
            }
        }
        .toolbar-lists {
            width: 100%;
            height: calc(100% - 75px);
            overflow: auto;
            &::-webkit-scrollbar {
                display: none;
            }
            .toolbar-list {
                .t-l-title {
                    color: rgb(0,254,254);
                    background: linear-gradient(to right, rgba(0,254,254, 0.3), rgba(0,254,254, 0));
                    font-weight: bold;
                    padding: 10px 20px;
                }
                .t-l-content{
                    padding: 20px;
                    .t-l-c-item{
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
</style>