// 事件类别
export const eventType = {
	'10001':'水旱灾害',
	'10002':'气象灾害',
	'10003':'地震灾害',
	'10004':'地质灾害',
	'10005':'海洋灾害',
	'10006':'生物灾害',
	'10007':'森林火灾',
	'10008':'其他',
	'20001':'企业安全事故',
	'20002':'交通运输事故',
	'20003':'公共设施和设备事故',
	'20004':'环境污染',
	'20005':'生态破坏事件',
	'20006':'物体打击',
	'20007':'车辆伤害',
	'20008':'机械伤害',
	'20009':'起重伤害',
	'20010':'触电',
	'20011':'淹溺',
	'20012':'灼烫',
	'20013':'火灾',
	'20014':'高处坠落',
	'20015':'坍塌',
	'20016':'冒顶片帮',
	'20017':'透水',
	'20018':'放炮',
	'20019':'火药爆炸',
	'20020':'瓦斯爆炸',
	'20021':'容器爆炸',
	'20022':'其他爆炸',
	'20023':'中毒和窒息',
	'20024':'其他伤害',
	'20025':'管线事故',
}

// 事件来源
export const eventSourceList = ['','移动终端','邮件','短信','电话','其它','设备预警','AI预警'];
// 事件等级
export const eventLevelList = ['','I级','II级','III级','IV级'];
// 预案等级
export const planLevelList = ['','特别严重(I级)','严重(II级)','较大事故(III级)','一般事故(IV级)'];
// 预案类别
export const planCategory = ['','综合类应急预案','专项应急预案','现场应急预案','单项应急预案'];

// 预案状态列表
export const instructType=['','调用物资','调用装备','现场处置']
export const instructTypeList = [
	{ key: '调用物资',value: '1' },
	{ key: '调用装备',value: '2' },
	{ key: '现场处置',value: '3' },
]
// 事件等级
export const planEventLevelList = [
	{key:'重大、特别重大级别突发事件',value:1,checked:false},
	{key:'较大级别及敏感突发事件',value:2,checked:false},
	{key:'较大临界突发事件',value:3,checked:false},
	{key:'一般级别突发事件',value:4,checked:false},
]
export const eventLevel = ['','重大、特别重大级别突发事件','较大级别及敏感突发事件','较大临界突发事件','一般级别突发事件']
// 事件类别
export const eventList = {
	'自然灾害':[
		{ text: '自然灾害',value:'27' },
		{ text: '地质伤害',value:'26' },
		{ text: '森林火灾',value:'25' },
		{ text: '车辆伤害',value:'6' },
		{ text: '其他',value:'28' },
		// { text: '水旱灾害',value:'10001' },
		// { text: '气象灾害',value:'10002' },
		// { text: '地震灾害',value:'10003' },
		// { text: '地质灾害',value:'10004' },
		// { text: '海洋灾害',value:'10005' },
		// { text: '生物灾害',value:'10006' },
		// { text: '森林草原火灾',value:'10007' },、
		// { text: '其他',value:'10008' }
	],
	'事故灾难':[
		{ text: '道路交通',value:'3' },
		{ text: '水上交通',value:'4' },
		{ text: '物体打击',value:'5' },
		{ text: '车辆伤害',value:'6' },
		{ text: '机械伤害',value:'7' },
		{ text: '矿工企业',value:'1' },
		{ text: '火灾',value:'2' },
		{ text: '触电',value:'9' },
		{ text: '中毒和窒息',value:'23' },
		{ text: '坍塌',value:'14' },
		{ text: '灼烫',value:'11' },
		{ text: '容器爆炸',value:'21' },
		{ text: '起重伤害',value:'8' },
		{ text: '锅炉爆炸',value:'20' },
		{ text: '其他爆炸',value:'22' },
		{ text: '淹溺',value:'10' },
		{ text: '危化事故',value:'12' },
		{ text: '其他伤害',value:'24' },



		// { text: '企业安全事故',value:'20001' },
		// { text: '工矿商贸等企业的各类安全事故',value:'20001' },
		// { text: '公共设施和设备事故',value:'20003' },
		// { text: '环境污染',value:'20004' },
		// { text: '生态破坏事件',value:'20005' },
		// { text: '物体打击',value:'20006' },
		// { text: '车辆伤害',value:'20007' },
		// { text: '机械伤害',value:'20008' },
		// { text: '起重伤害',value:'20009' },
		// { text: '触电',value:'20010' },
		// { text: '淹溺',value:'20011' },
		// { text: '灼烫',value:'20012' },
		// { text: '火灾',value:'20013' },
		// { text: '高处坠落',value:'20014' },
		// { text: '坍塌',value:'20015' },
		// { text: '冒顶片帮',value:'20016' },
		// { text: '透水',value:'20017' },
		// { text: '放炮',value:'20018' },
		// { text: '火药爆炸',value:'20019' },
		// { text: '瓦斯爆炸',value:'20020' },
		// { text: '容器爆炸',value:'20021' },
		// { text: '其他爆炸',value:'20022' },
		// { text: '中毒和窒息',value:'20023' },
		// { text: '其他伤害',value:'20024' },
		// { text: '管线事故',value:'20025' }
	]
}