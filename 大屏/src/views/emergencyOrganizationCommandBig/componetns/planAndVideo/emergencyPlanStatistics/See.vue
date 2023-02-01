<template>
	<div class="plans-manage-see">
		<div class="title"> {{itemObj.planName}}应急预案 </div>
		<div class="content">
			<div class="content-list">
				<div class="document-number">文号：{{itemObj.documentNumber}}</div>
				<div class="c-l-title">一、预案基本信息</div>
				<div class="c-l-describe">
					<a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
						<a-row :span="24" :getter="24">
							<a-col :span="12" v-if="itemObj.planCategory">
								<a-form-item label="预案类型">
									<a-input :value="planCategory[itemObj.planCategory]" placeholder="--" disabled style="width: 100%" />
								</a-form-item>
							</a-col>
							<a-col :span="12" v-if="itemObj.preparationDepartment">
								<a-form-item label="编制部门">
									<a-input v-model="itemObj.preparationDepartment" placeholder="--" disabled style="width: 100%" />
								</a-form-item>
							</a-col>
							<a-col :span="12" v-if="itemObj.eventType">
								<a-form-item label="事件类型" >
									<a-select v-model="itemObj.eventType" placeholder="--" disabled style="width: 100%">
										<a-select-opt-group :label="index" v-for="(item,index) in eventList" :key="index">
											<a-select-option :value="item1.value" v-for="(item1,index1) in item" :key="index1"> {{ item1.text }} </a-select-option>
										</a-select-opt-group>
									</a-select>
								</a-form-item>
							</a-col>
							<a-col :span="12" v-if="itemObj.releaseTime">
								<a-form-item label="发布日期" >
									<a-input v-model="itemObj.releaseTime" placeholder="--" disabled style="width: 100%" />
								</a-form-item>
							</a-col>
							<a-col :span="12" v-if="itemObj.issueTime">
								<a-form-item label="印发日期" >
									<a-input v-model="itemObj.issueTime" placeholder="--" disabled style="width: 100%" />
								</a-form-item>
							</a-col>
							<a-col :span="12" v-if="itemObj.issuingDepartment">
								<a-form-item label="印发部门" >
									<a-input v-model="itemObj.issuingDepartment" placeholder="--" disabled style="width: 100%" />
								</a-form-item>
							</a-col>
							<a-col :span="12" v-if="location">
								<a-form-item label="行政区划" >
									<a-input v-model="location" placeholder="--" disabled style="width: 100%" />
								</a-form-item>
							</a-col>
						</a-row>
					</a-form>
					<!-- <p>事故类型 : {{ eventTypeStr }}</p>
					<p>危害程度 : {{ eventLevel[itemObj.eventLevel] }} </p> -->
				</div>
			</div>
			<div class="content-list">
				<!-- <div class="c-l-title">2、应急处置基本原则</div>
				<div class="c-l-describe">
					<p>(1)以人为本，安全第一。把保障人民群众的生命安全和身体健康、最大限度预防和减少安全生产事故造成的人员伤亡作为首要任务。</p>
					<p>(2)统一领导，分级负责。办事处主任统一领导，街安委会组织协调，各部门各司其责，生产经营企业认真履行安全生产责任主体的职责，建立安全生产应急预案和应急机制。</p>
					<p>(3)应急处置，属地为主。事故现场应急处置由办事处主任领导，有关部门密切配合，充分发挥企业抢险团队和消防专业队伍的救援作用。</p>	
					<p>(4)预防为主，战备结合。落实“安全第一，预防为主”的方针，坚持事故应急与预防工作相结合，做好预防、预测、预警和预报工作,做好常态下的风险评估、物资储备、队伍建设、完善装备、预案演练等工作。</p>
				</div> -->
				<div class="c-l-title">二、总则</div>
				<div class="c-l-describe">{{itemObj.planThe||'暂无数据'}}</div>
			</div>
			<div class="content-list">
				<div class="c-l-title">三、组织体系</div>
				<div class="c-l-content">
					<div class="office-select">
						<div class="office-select-title">
							指挥部办公室：{{itemObj.headquartersOffice}}
						</div>
						<div>
							<a-select :default-value="planEventLevelList[0].key" style="width: 200px" @change="handleChange">
								<a-select-option :value="item.value" v-for="item in planEventLevelList" :key="item.value">
									{{item.key}}
								</a-select-option>
							</a-select>
						</div>
					</div>
					<div class="c-l-c-g">
						<a-table
							:rowKey="(record,index)=>record.sid" 
							:columns="columnsOrgan" 
							size="middle"
							:data-source="organData">
							<span slot="authorityMemberList" slot-scope='text,record'>
								<div v-for="(item1,index1) in record.authorityMemberList" :key="index1">{{ item1.authorityMemberName }}</div>
							</span>
							<span slot="eventLevel" slot-scope='text,record'>
								<div>
									<a-tag 
										color="pink" 
										style="margin-bottom: 10px;" 
										v-for="(item1,index1) in record.eventLevel.split(',')" 
										:key="index1"> 
											{{ eventLevel[item1] }} 
									</a-tag>
								</div>
							</span>
						</a-table>
					</div>
					<!-- <div class="c-l-c-m">
						<a-table
							:rowKey="(record,index)=>record.sid" 
							:columns="columnsOrganMan" 
							size="middle"
							:data-source="organManData">
							<span slot="userType" slot-scope='text,record'>
								{{ record.userType == 1?'组长':'组员' }}
							</span>
						</a-table>
					</div> -->
				</div>
			</div>
			<div class="content-list">
				<div class="c-l-title">四、预警报告</div>
				<div class="c-l-describe">
					<p>{{itemObj.earlywarningReport||'暂无数据'}}</p>
				</div>
			</div>
			<div class="content-list">
				<div class="c-l-title">五、应急处置</div>
				<!-- <div class="c-l-describe"> -->
					<a-collapse @change="changeActivekey" expand-icon-position="right" accordion>
						<template #expandIcon="props">
							<a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
						</template>
						<a-collapse-panel :header="item.key" v-for="item in planEventLevelList" :key="item.value">
							<a-table
								:rowKey="(record,index)=>record.sid" 
								:columns="columnsDispose" 
								size="middle"
								:data-source="disposeList">
								
								<span slot="instructType" slot-scope='text,record' >
									<div> {{ instructType[record.instructType] }} </div>
								</span>
							</a-table>
						</a-collapse-panel>
					</a-collapse>
				<!-- </div> -->
			</div>
			<div class="content-list">
				<div class="c-l-title">六、应急保障</div>
				<div class="c-l-describe">
					<p>{{itemObj.emergencySupport||'暂无数据'}}</p>
				</div>
			</div>
			<div class="content-list">
				<div class="c-l-title">七、后期处置</div>
				<div class="c-l-describe">{{itemObj.postDisposal||'暂无数据'}}</div>
			</div>
			<div class="content-list">
				<div class="c-l-title">八、预案流程</div>
				<!-- <z-file
					class="file-none"
					ref="z-file2"
					appCode="contingencyplans"
					:ownerId="itemObj.sid"
					name="chartflie"
					:asyncUpload="true"
					v-model="fileList"
				/> -->
				<div class="c-l-describe">
					<!-- <div class="canvas" id="pCanvas" ref="pCanvas" :style="{'background-image':config.bg}"></div> -->
					<img :src="imgUrl" alt="" width="100%">
				</div>
				<!-- <div class="c-l-title"></div> -->
				<br>
				<div class="c-l-describe">
					<div class="file-pdf">
						<iframe :src="`./pdf/web/viewer.html?file=${fileUrl}`" frameborder="0" style="width:100%;height:100%"> </iframe>
					</div>
					<!-- <img :src="imgUrl" alt="" width="100%">	 -->
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	// import ZEditor from 'ZEditor'
	// import nodes from '@/utils/nodes'
	// import edges from '@/utils/edges'
	// import bgImg from '@/assets/images/bg.jpg'
	import { eventList,planCategory,eventLevel,eventType,planEventLevelList,instructType } from '@/utils'
	import { planGroupFind,planGroupsUsers,planGradeFind,planDisposeFind,getEquipment,getMaterials,getareaList } from '@/api/reservePlan/plansManage'
	const columnsOrgan = [
		{
			title: "序号",
			customRender: (text, record, index) => `${index + 1}`,
			align: "center",
			width: "50px"
		},
		{
			title: '专项指挥机构',
			dataIndex: 'groupName',
			key: 'groupName',
			// width:'200px'
		},
		{
			title: '专项指挥机构成员',
			dataIndex: 'authorityMemberList',
			key: 'authorityMemberList',
			// width:'200px',
			scopedSlots: { customRender: 'authorityMemberList' },
		},
		{
			title: '事件等级',
			dataIndex: 'eventLevel',
			key: 'eventLevel',
			width:'200px',
			scopedSlots: { customRender: 'eventLevel' },
		},
		{
			title: '职责',
			dataIndex: 'groupDes',
			key: 'groupDes'
		}
	]
	const columnsDispose = [
		{
			title: "序号",
			customRender: (text, record, index) => `${index + 1}`,
			align: "center",
			width: "50px"
		},
		{
			title: '专项指挥机构名称',
			dataIndex: 'groupgName',
			key: 'groupgName',
		},
		{
			title: '指令类型',
			dataIndex: 'instructType',
			key: 'instructType',
			scopedSlots: { customRender: 'instructType' },
		},
		{
			title: '指令内容',
			dataIndex: 'instructDes',
			key: 'instructDes'
		}
	]
	const columnsMaterials = [
		{
			title: "序号",
			customRender: (text, record, index) => `${index + 1}`,
			align: "center",
			width: "50px"
		},
		{
			title: '装备种类',
			dataIndex: 'kindName',
			key: 'kindName',
		},
		{
			title: '数量',
			dataIndex: 'quantity',
			key: 'quantity',
			scopedSlots: { customRender: 'quantity' },
		},
		{
			title: '存储地点',
			dataIndex: 'storageLocation',
			key: 'storageLocation'
		},
		{
			title: '联系人',
			dataIndex: 'linkman',
			key: 'linkman',
		},
		{
			title: '联系电话',
			dataIndex: 'tel',
			key: 'tel',
		}
	]
	
	export default{
		props:{
			itemObj:{
				type:Object,
				default:{}
			}
		},
		components:{},
		data(){
			return{
				planEventLevelList,
				eventList,
				planCategory,
				// nodes,
				// edges,
				fileList:[],
				imgUrl:'',
				fileUrl:'/doc/api/store/preview/1453661405931782144',
				options: [
					{
						value: '440100000000',
						label: '广州市',
						isLeaf: false,
					},
				],
				location:'111',
      			activeKey: ['1'],
				// zEditor:null,
				// srcImg:require('@/assets/imgs/u51551.png'),
				// config:{ bg:'url('+bgImg+')' },
				columnsOrgan,
				columnsMaterials,
				organData:[],
				materialsData:[],
				equipmentData:[],
				groupKey:{},
				levelList:[],
				columnsDispose,
				instructType,
				disposeList:[],
				eventLevel,
				eventType,
				eventTypeStr:'',
				setting:{
				  fill: '#FFFFFF',
				  lineColor: '#B3B3B3',
				  lineWidth: 2,
				  lineType: 'z-line',
				  lineStyle: 'solid',
				},
				preview:{
				  width:1000,
				  height:600
				},
			}
		},
		watch:{
			fileList:{
				handler(newValue){
					console.log(newValue);
					this.imgUrl = './doc/api/store/preview/' + newValue[0].sid
				},
				deep:true
			}
		},
		created() {
			let that = this
			if(this.itemObj){
				let eventType = this.itemObj.eventType.split(',');
				let eventTypeStr = '';
				eventType.map(item=>{
					if(eventTypeStr){
						eventTypeStr += '、'+that.eventType[item]
					}else{
						eventTypeStr = that.eventType[item]
					}
				})
				this.eventTypeStr = eventTypeStr
			}
			
			// this.nodes.forEach(n=>{
			//   ZEditor.configNode(n.children);
			// })
			// ZEditor.configEdge(this.edges);
			
			this.getOrganList()
			this.getLevelList()
			this.getDisposeList()
			this.getEquipmentList(this.itemObj.sid)
			this.getMaterialsList(this.itemObj.sid)
			this.echoAreaList(this.itemObj.location)
		},
		mounted() {
			// this.getProcessInfo()
		},
		methods:{
			// 打开风琴的列项
			changeActivekey(key) {
				this.disposeList = []
				this.getDisposeList(key)
			},
			// 获取组织列表
			getOrganList(leveltype=4){
				let data={ body:{ 
					basicInformationId:this.itemObj.sid,
					eventLevel:leveltype
				 },page: 1,pageSize: 1000}
				planGroupFind(data).then(res=>{
					this.organData = res.body
					let list = []
					res.body.map(item=>{
						this.groupKey[item.sid] = item.groupName
						list.push(item.sid)
					})
					// this.getOrganManList(list)
				})
			},
			// 获取组织人员列表
			// getOrganManList(list=[]){
			// 	if(list.length){
			// 		let groupKey = this.groupKey
			// 		planGroupsUsers({body:list}).then(res=>{
			// 			let userType=['组员','组长']
			// 			res.body.map(item=>{
			// 				item.groupName = groupKey[item.planGroupId]
			// 				return item
			// 			})
			// 			this.organManData = res.body
			// 		})
			// 	}
			// },
			// 获取等级列表
			getLevelList(){
				let data={ body:{ basicInformationId:this.itemObj.sid },page: 1,pageSize: 1000}
				planGradeFind(data).then(res=>{
					this.levelList = res.body
				})
			},
			// 获取指令列表
			getDisposeList(leveltype=4){
				let data={ body:{ 
						basicInformationId:this.itemObj.sid,
						eventLevel:leveltype
					},page: 1,pageSize: 1000}
				planDisposeFind(data).then(res=>{
					this.disposeList = res.body
				})
			},
			// 获取流程信息
			// getProcessInfo(){
			// 	if(this.itemObj.modelJson){
			// 		let modelJson = JSON.parse(this.itemObj.modelJson);
			// 		let preViewEditor=new ZEditor(this.$refs.pCanvas,{
			// 		  width:this.preview.width,   //编辑器宽高不设置，则自动计算（为了能获取到画布宽高，所以延迟100毫秒）
			// 		  height:this.preview.height,
			// 		  setting:this.setting,
			// 		  model:'preview'
			// 		})
			// 		preViewEditor.read(modelJson.json_xml.flowModel);
			// 		preViewEditor.run('fitSize');
			// 		preViewEditor.on('node:click', (evt) => {
			// 			//console.log(evt.item._cfg.id);
			// 		})
			// 	}
			// },
			// 获取预案装备列表
			getEquipmentList(sid){
				getEquipment(sid).then(res=>{
					this.equipmentData = res.body
				})
			},
			// 获取预案物资列表
			getMaterialsList(sid){
				getMaterials(sid).then(res=>{
					this.materialsData = res.body
				})
			},
			handleChange(index,index2,index3){
				console.log(index);
				this.getOrganList(index)

			},
			// 回显表单区域数据
			echoAreaList(sid) {
				if(sid == '440100000000'){
					this.location = '广州市'
				}else{
					getareaList({ sid:'440100000000' }).then((res) => {
						if (res.success) {
							res.body.map((val) => {
								if(val.sn == sid){
									this.location = `广州市/${val.name}`
								}
							})
						}
					})
				}
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
	.plans-manage-see{
		max-height: 800px;
		overflow-y: auto;
		&::-webkit-scrollbar{
			display: none;
		}
		
		.title{
			font-size: 30px;
			font-weight: bold;
			text-align: center;
			color: #fff;

		}
		.content{
			color: #fff;
			.content-list{
				.document-number{
					font-size: 16px;
					text-align: right;
					font-weight: bold;
				}
				.c-l-title{
					position: relative;
					padding: 10px 15px;
					font-size: 20px;
					font-weight: bold;
					&::before {
						content: '';
						width: 6px;
						height: 23px;
						background: #086dd9;
						left: 0;
						top: 0;
						-webkit-transform: translate(3px, 13px);
						transform: translate(3px, 13px);
						border-radius: 3px;
						position: absolute;
					}
				}
				.c-l-describe{
					padding: 10px;
					border-radius: 5px;
					border: 1px solid #d9d9d9;
					line-height: 25px;
				}
				.c-l-content{
					padding: 10px;
					border-radius: 5px;
					border: 1px solid #d9d9d9;
					.c-l-c-img{
						text-align: center;
					}
					.c-l-c-g{
						padding: 10px 0;
					}
					// .c-l-c-m{
						
					// }
					.office-select{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.office-select-title{
							font-weight: bold;
						}
					}
				}
			}
		}
	}
	/deep/.ant-input[disabled] {
    	color: rgba(0, 0, 0, 0.8);
    	background-color: #f5f5f5;
    	cursor: not-allowed;
    	opacity: 1;
	}
	/deep/.ant-select-disabled {
   		 color: rgba(0, 0, 0, 0.8);
	}
	/deep/.ant-form-item-label > label{
		color: #fff;
	}
	.ant-form-item{
		margin: 0;
	}
	.file-none{
		opacity: 0;
		height: 0;
	}
	.file-pdf{
		width: 100%;
		height: 500px;
	}
</style>
