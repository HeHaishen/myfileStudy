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