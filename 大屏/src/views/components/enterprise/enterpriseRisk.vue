<template>
	<div class="enterprise-risk">
			<div class="tabArea">
				<tabs :tabsParam='tabsParam' @toggleTabs='handleToggleTabs'></tabs>
			</div>
			<div class="echartArea">
				<div class="statistics border-linear">
					<header class="titler text-liner">事故总数各等级分布</header>
					<div class="s-main">
						<a-row class="rowArea">
							<a-col :span="12">
								<div class="num">2175</div>
								<div class="type">一般事故</div>
							</a-col>
							<a-col :span="12">
								<div class="num">345</div>
								<div class="type">较大事故</div>
							</a-col>
							<a-col :span="12">
								<div class="num">2175</div>
								<div class="type">一般事故</div>
							</a-col>
							<a-col :span="12">
								<div class="num">345</div>
								<div class="type">较大事故</div>
							</a-col>
						</a-row>
					</div>
				</div>
				<div class="ranking border-linear" ref="rankingArea">
					<header class="titler text-liner" ref="rankingTitler">事故排行对比分析</header>
					<div class="rankingTabs" ref="rankingTabs">
						<tabs :tabsParam='rankingTabsParam' @toggleTabs='handleToggleTabs' type='chartTab'></tabs>
					</div>
					<div class="s-main">
						<echarts :datas="rankingData" id="rankingChart" :height="rankingAreaHeight"></echarts>
					</div>
				</div>
				<div class="distribution border-linear" ref="distributionArea">
					<header class="titler text-liner" ref="distributionTitler">事故总数行业分布情况</header>
					<div class="s-main">
						<echarts :datas="distributionData" id="distributionChart" :height="distributionAreaHeight"></echarts>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
import Echarts from '@/views/components/echarts.vue'
import Tabs from '@/views/components/tabs.vue'
	export default{
		props:{},
		components:{
			Echarts,
			Tabs
		},
		data(){
			return{
				tabsParam:['全部','冶金','有色','建材','机械','轻工','纺织','烟草','商贸'],
				rankingTabsParam:['按行业事故统计','按区域统计'],
				nowIndex:0,
				rankingData: {},
				distributionData:{},
				distributionAreaHeight:'',
				rankingAreaHeight:''
			}
		},
		created() {
			this.getData();
		},
		mounted() {
			setTimeout(()=>{
				let distributionAreaHeight = this.$refs.distributionArea.offsetHeight;
				let distributionTitlerHeight = this.$refs.distributionTitler.offsetHeight;
				let rankingArea = this.$refs.rankingArea.offsetHeight;
				let rankingTitler = this.$refs.rankingTitler.offsetHeight;
				let rankingTabs = this.$refs.rankingTabs.offsetHeight;
				this.distributionAreaHeight = distributionAreaHeight -distributionTitlerHeight -96
				this.rankingAreaHeight = rankingArea - rankingTitler - rankingTabs -96
			},0)
		},
		methods:{
			handleToggleTabs(index){
				console.log('index',index)
			},
			getData(){
				this.rankingData ={
					tooltip: {
						trigger: 'item'
					},
					legend: {
						show:false
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['40%', '60%'],
							label:{
								normal:{
									show:true,
									textStyle:{
										color:'#fff',
										fontSize:12
									}
								}
							},
							data: [
								{value: 1048, name: '交通运输',itemStyle:{normal:{color:'#ffdb4c'}}},
								{value: 735, name: '森林火灾',itemStyle:{normal:{color:'#0bc3ff'}}},
								{value: 300, name: '其他',itemStyle:{normal:{color:'#ab9aff'}}},
								{value: 484, name: '建筑施工',itemStyle:{normal:{color:'#4fff80'}}},
								{value: 580, name: '工业制造',itemStyle:{normal:{color:'#4ea1ff'}}},
							
								
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				};

				this.distributionData ={
					tooltip: {
							trigger: 'axis',
							axisPointer: {            // 坐标轴指示器，坐标轴触发有效
									type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
					},
					legend: {
							data:[{
								name:'企业总数',
							},{
								name:'检查企业数',
							},{
								name:'检查次数',
							}],
							textStyle:{
								color:'#ffffff'
							},
							x:'right',
							padding:20
					},
					grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: ['机械行业', '纺织行业', '非煤行业', '有色行业', '商贸行业', '建材行业', '冶金行业','烟草行业'],
							axisLine:{
								lineStyle:{
									color:'#ffffff',
									width:2
								}
      				},
							axisLabel: {
								interval: 0,
								textStyle: {
									color: '#fff',
									fontSize : 12,
									padding:10
								}
							},
						}
					],
					yAxis: [
						{
							type: 'value',
							axisLabel: {
								textStyle: {
									color: '#fff',
									fontSize : 14,
								}
							},
							axisLine: {
								lineStyle: {
									color: '#ffffff',
								},
							},
							splitLine: {
								lineStyle: {
									color: '#26345b',
								},
							}
						}
					],
					series: [
							{
									name: '企业总数',
									type: 'bar',
									stack: 'total',
									label: {
										show: true
									},
									emphasis: {
											focus: 'series'
									},
									barWidth:30,
									data: [320, 332, 301, 334, 390, 330, 320,300],
									itemStyle:{
										normal:{
											color:'#2474ef',
										}
									}
							},
							{
									name: '检查企业数',
									type: 'bar',
									stack: 'total',
									label: {
										show: true
									},
									emphasis: {
											focus: 'series'
									},
									barWidth:30,
									data: [120, 132, 101, 134, 90, 230, 210,320],
									itemStyle:{
										normal:{
											color:'#2c5aa8',
										}
									}
							},
							{
									name: '检查次数',
									type: 'bar',
									stack: 'total',
									label: {
										show: true
									},
									emphasis: {
											focus: 'series'
									},
									data: [220, 182, 191, 234, 290, 330, 310,260],
									barWidth:30,
									itemStyle:{
										normal:{
											color:'#304878',
										}
									}
							}
					]
			};
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.enterprise-risk{
		height: 100%;
		background: #16244B;
		padding: var(--small-font);
		.echartArea{
			height: 90%;
			padding: 58px 0 0 0;
			display: flex;
			.statistics{
				width: 30%;
				height: 100%;
				margin-right: 57px;
				padding: 48px 40px 48px 40px;
				position: relative;
				.titler{
					font-size: var(--middle-font);

				}
				.s-main{
					text-align: center;
					margin-top: 36px;
					height: 420px;
					background: url('../../../assets/images/enterprise/area_bg.png') center center;
					background-size: 100% 100%;
					position: absolute;
					width: 90%;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					.num{
						font-size: 40px;
						color: #00ffff;
						font-weight: bold;
						text-shadow: 0 0 30px rgba(0,255,255,0.9);
						margin-top: 73px;
					}
					.type{
						font-size: 24px;
						margin-top: 26px;
					}
				}
			}
			.ranking{
				width: 30%;
				height: 100%;
				margin-right: 57px;
				padding: 48px 40px 48px 40px;
				.titler{
					font-size: 36px;

				}
				.rankingTabs{
					margin-top: 30px;
				}
			}
			.distribution{
				width: 40%;
				height: 100%;
				padding: 48px 40px 48px 40px;
				.titler{
					font-size: 36px;

				}
			}
		}
	}
	/deep/.tabArea{
		height: 10%;
			.tabs{
				.list{
					font-size: var(--middle-font) !important;
					&:last-child{
						margin-right:0 !important;
					}
				}
			}
		}
</style>

