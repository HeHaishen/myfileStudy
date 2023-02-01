import request from '@/request/request';

// 获取通讯录组织
export function getGroupFind(data) {
	return request({
		url: '/abs/abs/group/find',
		method: 'post',
		headers:{ 'Content-Type' : 'application/json;charset=UTF-8' },
		data
	})
}

// 获取通讯录人员
export function getContactsFind(data) {
	return request({
		url: '/abs/abs/contacts/findAbsContactsByGroupId',
		method: 'post',
		headers:{ 'Content-Type' : 'application/json;charset=UTF-8' },
		data
	})
}