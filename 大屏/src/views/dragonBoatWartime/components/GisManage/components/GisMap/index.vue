<template>
    <div class="gis-map" id="gis-map"></div>
</template>

<script>
import { CustomOverlay } from './utils';
import { eventStr } from './utils/str.js';

export default {
    name: "",
    props: {},
    components: {},
    data() {
        return {
            map: null,
            center: { lat:23.176895, lng:113.4983 },
            eventLevel: {
                1: require("../../images/eventLevel/iEvent1.png"),
                2: require("../../images/eventLevel/iEvent2.png"),
                3: require("../../images/eventLevel/iEvent3.png"),
            },
            anchor: window.qq && new qq.maps.Point(16, 32),
            size: window.qq && new qq.maps.Size(32, 32),
            origin: window.qq && new qq.maps.Point(0, 0),
            markers: [],
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
            const that = this;
            if(window.qq){
                that.map = new qq.maps.Map(document.getElementById("gis-map"), {
                    zoom: 13,
                    mapTypeId: qq.maps.MapTypeId.HYBRID, 
                    disableDefaultUI: true, //禁止所有控件
                    // 地图的中心地理坐标。
                    center: new qq.maps.LatLng(that.center.lat,that.center.lng)
                });

                // 初始化地图弹窗
                that.customPopup = new CustomOverlay(42, 'rgb(29,179,179)');
                that.customPopup.setMap(that.map);

                //添加dom监听事件
                qq.maps.event.addDomListener(that.map, 'click', function(event) {
                    that.addMarker(event.latLng);
                });
            }
        },
        // 添加标记
        addMarker(location){
            const that = this;
            // 随机等级
            let level = ((new Date()).valueOf() % 3 + 1);
            let customData = {};
            
            let icon = new qq.maps.MarkerImage(that.eventLevel[level], that.size, that.origin, that.anchor);
            if(level == 1){
                customData = {
                    level: level,
                    name: '京广高速水浸点',
                    data: {
                        keyList: [
                            { key:'内涝点分类 : ', value:'水浸点' },
                            { key:'程度 : ', value:'中度内涝' },
                            { key:'情况 : ', value:'2020年积水次数为1次,积水时间约15分钟,积水尝试5cm,积水面积约30㎡' }
                        ],
                        imgList: [
                            require('../../images/1.jpeg'),
                            require('../../images/1.jpeg'),
                            require('../../images/1.jpeg')
                        ]
                    }
                }
            }else if(level == 2){
                customData = {
                    level: level,
                    name: '海珠区官洲街北山村北山边坡',
                    data: {
                        keyList: [
                            { key:'所在地 : ', value:'海珠区官洲街' },
                            { key:'灾害类型 : ', value:'基雨' },
                            { key:'管理单位 : ', value:'海珠区官州街道办事处' },
                            { key:'隐患整治责任主体单位 : ', value:'广州市规划和白然资源局海珠区分局/华州街道办事处' },
                            { key:'责任人 : ', value:'陈晚华/陈海中' },
                            { key:'联系电话 : ', value:'13924297966/3760823706' },
                        ],
                        imgList: [
                            require('../../images/1.jpeg'),
                            require('../../images/1.jpeg'),
                            require('../../images/1.jpeg')
                        ]
                    }
                }
            } else if(level == 3){
                customData = {
                    level: level,
                    name: '广州中冠安泰石油化工有限公司',
                    data: {
                        keyList: [
                            { key:'生产经营地址 : ', value:'黄域区建东街首点客牛栏园1号,黄域区文冲街道广州石化厂内' },
                            { key:'企业注册地址 : ', value:'广州市黄城区文冲街道石化路振兴街18号' },
                            { key:'主要负责人 : ', value:'杨坤林' },
                            { key:'负责人联系电话: ', value:'13800138000' },
                            { key:'企业状态: ', value:'正常' },
                            { key:'风险评估级别信息: ', value:'橙色' },
                            { key:'企业分类与属性: ', value:'[带储存设施经营][重大危险源企业][石油库][安全公告企业][二点监管危险化学品][石油化工企业][瑞区企业][危险化学品管道]' },
                        ],
                        btnList: ['危险物品实时保有量7种','存量总数32吨','实时监控13台'],
                        monitorList: [
                            { time: '2021-05-13 13:30', content:'[红色预警]监测到xxoxxoxxxxw企业ox设备容器温度达到55C', level: 1, levelStr: '红色预警', source: 'xxxxw企业' },
                            { time: '2021-05-13 13:30', content:'[黄色预警]监测到xxoxxoxxxxw企业ox设备容器温度达到55C', level: 2, levelStr: '黄色预警', source: 'xxxxw企业' },
                            { time: '2021-05-13 13:30', content:'[蓝色预警]监测到xxoxxoxxxxw企业ox设备容器温度达到55C', level: 3, levelStr: '蓝色预警', source: 'xxxxw企业' },
                            { time: '2021-05-13 13:30', content:'[蓝色预警]监测到xxoxxoxxxxw企业ox设备容器温度达到55C', level: 3, levelStr: '蓝色预警', source: 'xxxxw企业' }
                        ]
                    }
                }
            }
            
            let marker = new qq.maps.Marker({
                position: location,
                map: that.map,
                icon: icon,
                customData: customData
            });
            that.markers.push(marker);
            that.addMarkerClick(marker);
        },
        // 标记添加点击事件
        addMarkerClick(marker){
            const that = this;
            qq.maps.event.addListener(marker, 'click', function(event) {
                that.customPopup.open();
                let temp = eventStr(event.target.customData);
                that.customPopup.setContent(event.latLng, temp);
            });
        }
    },
};
</script>
<style lang='less' scoped>
.gis-map{
    width: 100%;
    height: 100%;

    /deep/ .eventStr1{
        color: #FFFFFF;
        padding: 20px;
        border-radius: 5px;
        background-color: rgba(30, 46, 69, 0.6);
        position: relative;
        border: 2px solid rgb(29,179,179);
        width: 500px;
        height: 400px;
        overflow: auto;
        box-sizing: border-box;
        &::-webkit-scrollbar { display:none; }
        .eventStr1__title{
            .eventStr1__title_left{
                width: 5px;
                height: 20px;
                margin-right: 10px;
                display: inline-block;
                background-color: rgb(0,255,255);
                transform: translateY(2px);
            }
        }
        .eventStr1__content{
            .eventStr1__content_items{
                margin: 10px 0;
                .eventStr1__content_item{
                    margin-bottom: 10px;
                }
            }
            .eventStr1__content_imgs{
                display: grid;
                grid-column-gap: 1.33%;
                grid-template-columns: repeat(3, 32%);
                .eventStr1__content_img{
                    width: 100%;
                    height: 100%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

    /deep/ .eventStr2{
			color: #FFFFFF;
			padding: 20px;
			border-radius: 5px;
			background-color: rgba(30, 46, 69, 0.6);
			position: relative;
            border: 2px solid rgb(29,179,179);
            width: 500px;
            height: 500px;
            overflow: auto;
            box-sizing: border-box;
            &::-webkit-scrollbar { display:none; }
            .eventStr2__title{
				.eventStr2__title_left{
                    width: 5px;
                    height: 20px;
                    margin-right: 10px;
                    display: inline-block;
                    background-color: rgb(0,255,255);
                    transform: translateY(2px);
                }
			}
			.eventStr2__content{
				.eventStr2__content_items{
                    margin: 10px 0;
                    .eventStr2__content_item{
                        margin-bottom: 10px;
                    }
                }
                .eventStr2__content_imgs{
                    display: grid;
                    grid-column-gap: 1.33%;
                    grid-template-columns: repeat(3, 32%);
                    .eventStr2__content_img{
                        width: 100%;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
			}
		}

    /deep/ .eventStr3{
        color: #FFFFFF;
        padding: 20px;
        border-radius: 5px;
        background-color: rgba(30, 46, 69, 0.6);
        position: relative;
        border: 2px solid rgb(29,179,179);
        width: 600px;
        height: 900px;
        overflow: auto;
        box-sizing: border-box;
        pointer-events:auto;
        .eventStr3__title{
            .eventStr3__title_left{
                width: 5px;
                height: 20px;
                margin-right: 10px;
                display: inline-block;
                background-color: rgb(0,255,255);
                transform: translateY(2px);
            }
        }
        .eventStr3__content{
            .eventStr3__content_items{
                margin: 10px 0;
                .eventStr3__content_item{
                    margin-bottom: 10px;
                }
            }
            .eventStr3__content_btns{
                display: grid;
                grid-column-gap: 1.33%;
                grid-template-columns: repeat(3, 32%);
                .eventStr3__content_btn{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                    border-radius: 5px;
                    background-color: rgb(237,80,36);
                }
            }
            .eventStr3__content_lists{
                .eventStr3__content_list{
                    display: grid;
                    grid-template-columns: repeat(4, 25%);
                    &:nth-child(even){
                        background-color: rgba(19, 45, 92, 0.5);
                    }
                    .color1{ padding: 10px;border-radius: 5px; background-color: rgba(250,61,61); } 
                    .color2{ padding: 10px;border-radius: 5px; background-color: rgba(233,200,44); } 
                    .color3{ padding: 10px;border-radius: 5px; background-color: rgba(22,90,245); } 
                    div{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 10px 0;
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>