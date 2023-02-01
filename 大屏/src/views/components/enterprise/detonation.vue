<template>
	<div class="detonation">
		<header class="titler text-liner">事故排行对比分析<span class="timer">更新时间: 2020-10-20 17:50:00</span></header>
		<div class="industryArea" ref="severity">
			<div class="tabs" ref="severityTabs">
				<tabs :tabsParam='tabsParam' @toggleTabs='handleToggleTabs' style="width:30%"></tabs>
			</div> 
			<div class="echartArea">
				<echarts :datas="severityAccidentData" id="severityChart" :height="severityHeight"></echarts>
			</div>
		</div>
		<div class="industryArea generalAccident">
			<div class="tabs">
				<tabs :tabsParam='tabsParam' @toggleTabs='handleToggleTabs' style="width:30%"></tabs>
			</div> 
			<div class="echartArea">
				<echarts :datas="generalAccidentData" id="generalChart" :height="severityHeight"></echarts>
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
				tabsParam:['重大隐患统计','重大事故统计'],
				nowIndex:0,
				severityAccidentDataData: {},
				generalAccidentData:{},
				currentRow:'',
				severityHeight:"",
			}
		},
		created() {
			this.getData();
		},
		mounted() {
			setTimeout(() => {
				let severityHeight = this.$refs.severity.offsetHeight;
				let severityTabsHeight = this.$refs.severityTabs.offsetHeight;
				this.severityHeight = (severityHeight-severityTabsHeight)
			}, 0)
		},
		computed:{
		},
		methods:{
			// tabs 回调
			handleToggleTabs(index){
				console.log('index',index)
			},
			// 图表数据
			getData(){
				this.severityAccidentData={
					tooltip: {
							trigger: 'axis',
							axisPointer: {
									type: 'cross',
									label:{
										backgroundColor: '#6a7985'
									},
									crossStyle: {
											color: '#999'
									}
							}
					},
					grid: {
							left: '1%',
							right: '2%',
							containLabel: true,
					},
					legend: {
						data: ['隐患总数', '已整改', '整改中','逾期未整改','整改率'],
						textStyle:{
							color:'#ffffff',
							fontSize:14,
							padding:10
						}
					},
					xAxis: [
							{
								type: 'category',
								data: ['从化', '黄埔', '增城', '番禺', '南沙', '花都', '白云', '天河', '荔湾', '越秀', '海珠'],
								axisPointer: {
									type: 'shadow'
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: '#02f2f1',
										fontSize : 16,
										padding:2 
									}
								},
								axisLine:{
									lineStyle:{
										color:'#ffffff',
										type:'dashed'
									}
								}
							}
					],
					yAxis: [
							{
								type: 'value',
								name: '总数 (万个)',
								min: 0,
								max: 250,
								interval: 50,
								nameTextStyle:{
									fontSize:14,
									padding:20
								},
								axisLabel: {
									formatter: '{value}',
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
										color: '#ffffff',
										type:'dashed'
									},
								}
							},
							{
								type: 'value',
								name: '整改率 (%)',
								min: 0,
								max: 25,
								interval: 5,
								nameTextStyle:{
									fontSize:14,
									padding:20
								},
								axisLabel: {
									formatter: '{value}',
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
										color: '#ffffff',
										type:'dashed'
									},
								}
							}
					],
					series: [   
							{
									name: '隐患总数',
									type: 'bar',
									data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
									itemStyle:{
										normal:{
											color:'#00ffff',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '已整改',
									type: 'bar',
									data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
									itemStyle:{
										normal:{
											color:'#00c800',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '整改中',
									type: 'bar',
									yAxisIndex: 1,
									data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
									itemStyle:{
										normal:{
											color:'#007aff',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '逾期未整改',
									type: 'bar',
									yAxisIndex: 1,
									data: [],
									itemStyle:{
										normal:{
											color:'#e43395',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '整改率',
									type: 'line',
									yAxisIndex: 1,
									data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
									itemStyle:{
										normal:{
											color:'#e52db1',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							}
					]
				};
				this.generalAccidentData={
					tooltip: {
							trigger: 'axis',
							axisPointer: {
									type: 'cross',
									label:{
										backgroundColor: '#6a7985'
									},
									crossStyle: {
											color: '#999'
									}
							}
					},
					grid: {
							left: '1%',
							right: '2%',
							containLabel: true,
					},
					legend: {
						data: ['隐患总数', '已整改', '整改中','逾期未整改','整改率'],
						textStyle:{
							color:'#ffffff',
							fontSize:14,
							padding:10
						}
					},
					xAxis: [
							{
								type: 'category',
								data: ['从化', '黄埔', '增城', '番禺', '南沙', '花都', '白云', '天河', '荔湾', '越秀', '海珠'],
								axisPointer: {
									type: 'shadow'
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: '#02f2f1',
										fontSize : 16,
										padding:2 
									}
								},
								axisLine:{
									lineStyle:{
										color:'#ffffff',
										type:'dashed'
									}
								}
							}
					],
					yAxis: [
							{
								type: 'value',
								name: '总数 (万个)',
								min: 0,
								max: 250,
								interval: 50,
								nameTextStyle:{
									fontSize:14,
									padding:20
								},
								axisLabel: {
									formatter: '{value}',
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
										color: '#ffffff',
										type:'dashed'
									},
								}
							},
							{
								type: 'value',
								name: '整改率 (%)',
								min: 0,
								max: 25,
								interval: 5,
								nameTextStyle:{
									fontSize:14,
									padding:20
								},
								axisLabel: {
									formatter: '{value}',
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
										color: '#ffffff',
										type:'dashed'
									},
								}
							}
					],
					series: [   
							{
									name: '隐患总数',
									type: 'bar',
									data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
									itemStyle:{
										normal:{
											color:'#00ffff',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '已整改',
									type: 'bar',
									data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
									itemStyle:{
										normal:{
											color:'#00c800',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '整改中',
									type: 'bar',
									yAxisIndex: 1,
									data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
									itemStyle:{
										normal:{
											color:'#007aff',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '逾期未整改',
									type: 'bar',
									yAxisIndex: 1,
									data: [],
									itemStyle:{
										normal:{
											color:'#e43395',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							},
							{
									name: '整改率',
									type: 'line',
									yAxisIndex: 1,
									data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
									itemStyle:{
										normal:{
											color:'#e52db1',
											barBorderRadius:[4, 4, 0, 0]
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
	.detonation{
			height: 100%;
			color: #fff;
			background: #16244B;
			padding: var(--middle-font);
		.titler{
			font-size:  var(--small-font);
			
			.timer{
				font-size: var(--super2-mini-font);
				margin-top: 6px;
				float: right;
			}
		}
		.industryArea{
			height: 45%;
			&.generalAccident{
				
			}

			.tabs{
				margin-top: var(--small-font);
			}
			.industryTab{
				width: 1000px;
			}
			.echartArea{
				margin-top: var(--middle-font);
			}
		}
	}
/deep/.tabs{
	height: 10%;
	// .tabsWrap{
	// 	height: 100%;
	// 	.tabs{
	// 		height: 100%;
	// 		.list{
	// 			font-size: var(--super3-mini-font);
	// 			height: 100%;
	// 			line-height: 200%;
	// 			&::before{
	// 				display: inline-block;
	// 				content: "";
	// 				height: 100%;
	// 				vertical-align: middle;
	// 			}
	// 		}
	// 	}
	// } 
}
 
</style>
