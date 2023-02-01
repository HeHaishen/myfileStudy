<template>
	<div class="danger-statistics">
			<div class="industryArea" ref="industryArea">
				<div class="industryTab" ref="industryTab">
					<tabs :tabsParam='industryTabsParam' @toggleTabs='handleToggleTabs' type='chartTab' header='header'></tabs>
				</div>
				<div class="tabs" ref="tabs">
					<tabs :tabsParam='tabsParam' @toggleTabs='handleToggleTabs' style="width:90%"></tabs>
				</div>
				<div class="echartArea">
					<echarts :datas="industryData" id="industryChart"  :height="industryHeight"></echarts>
				</div>
			</div>
			<div class="dangerArea" ref="dangerArea">
				<div class="dangerTab" ref="dangerTab">
					<tabs :tabsParam='dangerTabsParam' @toggleTabs='handleToggleTabs' type='chartTab'></tabs>
				</div>
				<a-row class="dangerEchart">
					<a-col :span="12">
						<div class="dangerHeader" ref="dangerHeader">危险化学品存量统计</div>
						<div class="dangerMain">
							<echarts :datas="dangerData" id="dangerChart" :height="dangerHeight"></echarts>
						</div>
					</a-col>
					<a-col :span="12">
						<div class="dangerHeader">危化企业总数:360家</div>
						<div class="dangerMain">
							<a-table
								:columns="columns" 
								:dataSource="datas" 
								:pagination="false"
								:rowClassName="setRowClassName"
								size="middle"
								>
							</a-table>
						</div>
					</a-col>
				</a-row>
			</div>
	</div>
</template>

<script>
import Echarts from '@/views/components/echarts.vue'
import Tabs from '@/views/components/tabs.vue'

import * as echarts from 'echarts';
	export default{
		props:{},
		components:{
			Echarts,
			Tabs
		},
		data(){
			return{
				tabsParam:['全部','冶金','有色','建材','机械','轻工','纺织','烟草','商贸'],
				industryTabsParam:['八大行业统计展现总数','四个专项统计展现总数'],
				dangerTabsParam:['危化品监管','烟花炮竹监管','事故电子档案','调查惩处'],
				nowIndex:0,
				industryData: {},
				industryHeight:'',
				dangerHeight:'',
				dangerData:{},
				currentRow:'',
				columns:[  {
					title: '定位',
					dataIndex: 'location',
					key: 'location'
				},
				{
					title: '企业名称',
					dataIndex: 'name',
					key: 'name'
				},
				{
					title: '所在区域',
					dataIndex: 'area',
					key: 'area'
				},
				{
					title: '企业负责人',
					dataIndex: 'enterpriseName',
					key: 'enterpriseName'
				},
				{
					title: '手机',
					dataIndex: 'phone',
					key: 'phone'
				},
				{
					title: '风险等级',
					dataIndex: 'rank',
					key: 'rank'
				}],
				datas:[{
					key: '1',
					location:'1',
					name: 'aaa科技有限公司',
					area: '从化',
					enterpriseName: '吴生',
					phone: '8888888888',
					rank:'黄'
				},
				{
					key: '2',
					location:'2',
					name: 'aaa科技有限公司',
					area: '从化',
					enterpriseName: '吴生',
					phone: '8888888888',
					rank:'黄'
				},
				{
					key: '3',
					location:'2',
					name: 'aaa科技有限公司',
					area: '从化',
					enterpriseName: '吴生',
					phone: '8888888888',
					rank:'黄'
				}]
			}
		},
		created() {
			this.getData();
		},
		mounted() {
			setTimeout(() => {
				let industryAreaHeight = this.$refs.industryArea.offsetHeight;
				let industryTabHeight = this.$refs.industryTab.offsetHeight;
				let tabsHeight = this.$refs.tabs.offsetHeight;
				let dangerTabHeight = this.$refs.dangerTab.offsetHeight;
				let dangerAreaHeight = this.$refs.dangerArea.offsetHeight;
				let dangerHeaderHeight = this.$refs.dangerHeader.offsetHeight;
				this.industryHeight = (industryAreaHeight - industryTabHeight - tabsHeight)
				this.dangerHeight = (dangerAreaHeight - dangerTabHeight - dangerHeaderHeight - 40)
			}, 0)
		},
		computed:{
		},
		methods:{
			// 表格单双行样式处理
			setRowClassName(record, index) {
				let rowColor = (index % 2 === 1) ? 'light-row' : 'dark-row';
				return rowColor
			},
			// tabs 回调
			handleToggleTabs(index){
				console.log('index',index)
			},
			barBgLinear(startCol,endCol){
				return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: startCol
				}, {
						offset: 1,
						color: endCol
				}])
			},
			// 图表数据
			getData(){
				this.industryData={
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
							containLabel: true
					},
					legend: {
						data: ['隐患总数', '已整改', '整改中','逾期未整改','整改率'],
						textStyle:{
							color:'#ffffff',
							fontSize:14
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
								name: '总数 (个)',
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
										color: '#26345b'
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
											color:this.barBgLinear('#47ddf6','#2589a9'),
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
											color:this.barBgLinear('#48f6bb','#249a80'),
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
											color:this.barBgLinear('#46a1f4','#2565af'),
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
											color:this.barBgLinear('#46a1f4','#2565af'),
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
											color:'#ff3845',
											barBorderRadius:[4, 4, 0, 0]
										}
									}
							}
					]
				};

				this.dangerData={
					legend: {
						x:'right',
						padding:30,
						textStyle:{
							color:'#ffffff',
							fontSize:14
						}
					},
					tooltip: {},
					dataset: {
							source: [
									['product', '流入量', '流出量', '存量'],
									['天河', 43.3, 85.8, 93.7],
									['越秀', 83.1, 73.4, 55.1],
									['黄埔', 86.4, 65.2, 82.5],
									['增城', 72.4, 53.9, 39.1],
									['海珠', 72.4, 53.9, 39.1],
									['番禺', 72.4, 53.9, 39.1],
									['南沙', 72.4, 53.9, 39.1]
							]
					},
					grid: {
							left: '1%',
							right: '3%',
							containLabel: true
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize : 14,
								padding:10
							}
						},
					splitLine: {
						lineStyle: {
							color: '#ffffff',
							type:'dashed',
						},
					}
					},
					yAxis: {
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize : 12,
								padding:10
							}
						},
						axisLine:{
							lineStyle:{
								color:'#ffffff',
								width:2
							}
						},
						splitLine: {
							lineStyle: {
								color: '#ffffff',
								type:'dashed',
							},
						}
					},
					series: [{
							type: 'bar',
							itemStyle:{
								normal:{
									color:this.barBgLinear('#0bc3ff','#0c6188'),
									barBorderRadius:[4, 4, 0, 0]
								}
							}
						},{
							type: 'bar',
							itemStyle:{
								normal:{
									color:this.barBgLinear('#f6d56e','#636246'),
									barBorderRadius:[4, 4, 0, 0]
								}
							}
						},{
							type: 'bar',
							itemStyle:{
								normal:{
									color:this.barBgLinear('#4fff80','#25714d'),
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
	.danger-statistics{
		height: 100%;
		color: #fff;
		background: #16244B;
		padding: var(--middle-font);
		.industryArea{
			height: 50%;
			.tabs{
				height: 10%;
				margin-top: var(--middle-font);
			}
			.industryTab{
				height: 10%;
				width: 60%;
			}
			.echartArea{
				margin-top: 40px;
			}
		}
		.dangerArea{
			padding-top: 20px;
			height: 50%;
			.dangerTab{
				width: 60%;
			}
			.dangerEchart{
				margin-top: 20px;
				.dangerHeader{
					font-size: 20px;
					color: #00f5f8;
				}
				.dangerMain{
					margin-top: 20px;
				}
			}
		}
		/deep/.ant-table{
			font-size: 14px;
			color: #fff;
		}
		/deep/.ant-table-thead > tr > th{
			background:#1b3359;
			border-bottom: 1px solid #102343;
			color: #fff;
			font-size: 14px;
		}
		/deep/.ant-table-tbody > tr > td{
			border: none;
		}
		/deep/.ant-table-tbody>tr:hover>td {
				background: #727477 !important
			}
	}

</style>
<style>
.light-row {background-color: #192e4d;margin-top: 2px;}
.dark-row {background-color: #132442;margin-top: 2px;}
</style>
