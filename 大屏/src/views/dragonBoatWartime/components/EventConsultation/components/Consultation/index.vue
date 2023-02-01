<template>
    <div class="consultation">
        <public-title title="视频会商"></public-title>
        <div class="consultation-content">
            <div v-for="(item,key) in list" class="c-c-list" :key="key">
                <div class="c-c-l-top">
                    <div class="c-c-l-t-bg">
                        <img :src="item.imgSrc">
                    </div>
                    <div :class="['c-c-l-t-o',item.onLine?'green':'red']">
                        <template v-if="item.onLine"> <a-icon type="check" /> </template>
                        <template v-else> <a-icon type="minus" /> </template>
                    </div>
                </div>
                <div class="c-c-l-bottom">{{ item.name }}</div>
            </div>
            <div class="c-c-list">
                <div class="c-c-l-top">
                    <div class="c-c-l-t-bg">
                        <a-icon type="plus" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PublicTitle from "../public/PublicTitle.vue";
export default {
    name: "",
    props: {},
    components: {
        PublicTitle
    },
    data() {
        return {
            list: [
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: false, imgSrc: require('../../images/icon_user.png') },
                { name: '张明明', onLine: true, imgSrc: require('../../images/icon_user.png') },
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
.consultation {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url("../../images/bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 3%;
    position: relative;
    color: #fff;
    .consultation-content{
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        overflow: auto;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        &::-webkit-scrollbar { display:none; }
        .c-c-list{
            .c-c-l-top{
                position: relative;
                .c-c-l-t-bg{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background-color: rgb(47,102,203);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: var(--large-font);
                }
                .c-c-l-t-o{
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .green{
                    background-color: rgb(125,228,85);
                }
                .red{
                    background-color: rgb(250,44,44);
                }
            }
            .c-c-l-bottom{
                text-align: center;
                padding: 10px 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>