import request from '@/request/request';

// 应急专家列表
export function expertsFind(data) {
	return request({
		url: '/ers/emergency/experts/find',
		method: 'post',
        headers:{ 'Content-Type' : 'application/json;charset=UTF-8' },
		data
	})
}

// 应急队伍列表
export function teamFind(data) {
	return request({
		url: '/ers/rescue/team/find',
		method: 'post',
        headers:{ 'Content-Type' : 'application/json;charset=UTF-8' },
		data
	})
}