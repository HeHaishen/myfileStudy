/*
 * @Description: 
 * @Version: 1.0
 * @Autor: hehaishen
 * @LastEditors: hehaishen
 * @Date: 2021-07-22 19:53:34
 * @LastEditTime: 2021-07-23 09:51:52
 */
import request from '@/request/request';

// 获取会议用户
export function getMeetingUsers(data) {
	return request({
		url: '/direct/emergency/equipmentManage/find',
		method: 'post',
		data
	})
}

// 发起视频会议
export function launchMeeting(data) {
	return request({
		url: '/rcsm/consult/initiateVideoConference',
		method: 'post',
		data
	})
}


// 邀请加入会议
export function inviteMembers(data) {
	return request({
		url: '/rcsm/consult/inviteMembers',
		method: 'post',
		data
	})
}

// 关闭视频会议
export function closeVideoConference(data) {
	return request({
		url: '/rcsm/consult/closeVideoConference',
		method: 'delete',
		data
	})
}

// 获取视频会议状态
export function getConferenceStatus(data) {
	return request({
		url: '/rcsm/consult/getConferenceStatus',
		method: 'post',
		data
	})
}

// 视频会议会场踢出成员
export function kickOutPhoneMembers(data) {
	return request({
		url: '/rcsm/consult/kickOutPhoneMembers',
		method: 'post',
		data
	})
}

// 视频会议会场成员禁言
export function shutupPhoneMembers(data) {
	return request({
		url: '/rcsm/consult/shutupPhoneMembers',
		method: 'post',
		data
	})
}

// 视频会议会场成员禁言恢复
export function shutupResumePhoneMembers(data) {
	return request({
		url: '/rcsm/consult/shutupResumePhoneMembers',
		method: 'post',
		data
	})
}