<template>
    <div class="video-module">
        <public-title title="物联点数据实时展示"></public-title>
        <div class="v-m-content">
            <div class="v-m-c-btns">
                <div
                    :class="['btn', selected == 1 ? 'selected' : '']"
                    @click="onChange(1)"
                >
                    图片
                </div>
                <div
                    :class="['btn', selected == 2 ? 'selected' : '']"
                    @click="onChange(2)"
                >
                    视频
                </div>
            </div>
            <div class="v-m-c-content">
                <div class="v-m-c-c-imgs" v-if="selected == 1">
                    <swiper class="swiper" :options="swiperOption"  ref="imgsSwiper">
                        <swiper-slide class="swiper-slide" v-for="(item,key) in imgList" :key="key">
                            <img :src="item.imgsrc" alt="" srcset="">
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
                <div class="v-m-c-c-videos" v-if="selected == 2">
                    <video controls="controls" src="../../media/oceans.mp4" muted autoplay loop></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PublicTitle from "../public/PublicTitle.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
    name: "",
    props: {},
    components: {
        Swiper,
        SwiperSlide,
        PublicTitle,
    },
    data() {
        return {
            selected: 1,
            swiperOption: {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            },
            imgList: [
                { imgsrc: require('../../images/1.jpeg') },
                { imgsrc: require('../../images/1.jpeg') }
            ]
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        onChange(selected) {
            this.selected = selected;
        },
    },
};
</script>
<style lang='less' scoped>

.video-module {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url("../../images/bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 3%;
    position: relative;
    color: #fff;
    .v-m-content {
        width: 100%;
        height: 100%;
        .v-m-c-btns {
            display: flex;
            .btn {
                margin-left: 50px;
                cursor: pointer;
            }
            .selected {
                padding-bottom: 5px;
                color: rgb(4, 228, 232);
                border-bottom: 3px solid rgb(4, 228, 232);
            }
        }
        .v-m-c-content {
            width: 100%;
            height: calc(100% - 56px);
            margin-top: 20px;
            .v-m-c-c-imgs{
                width: 100%;
                height: 100%;
                .swiper{
                    width: 100%;
                    height: 100%;
                    .swiper-slide{
                        width: calc(100% - 100px);
                        padding: 0 50px;
                        height: 100%;
                        box-sizing: border-box;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .swiper-button-prev{
                        color: rgb(4, 228, 232);
                    }
                    .swiper-button-next{
                        color: rgb(4, 228, 232);
                    }
                }
            }
            .v-m-c-c-videos{
                width: 100%;
                height: 100%;
                video{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>