import http from './http.js'
import {
	encryptByDES
} from '@/util/encrypteHelper.js'

/**
 * 
 * 登录页面HTML
 */
function loginPage() {
	return http.get('http://passport2.chaoxing.com/mlogin?fid=&newversion=true&refer=http%3A%2F%2Fi.chaoxing.com')

}

/**
 * 登录API
 * @param {String} account 
 * @param {String} pwd 
 * @param {String} validateCode 
 */
function login({
	account,
	pwd,
	validateCode = ''
}) {
	// let passwd = btoa(pwd);
	var transferKey = "u2oh6Vu^HWe40fj";
	let v1 = `http://passport2.chaoxing.com/mlogin?refer=http%3A%2F%2Fi.mooc.chaoxing.com`,
		v1Data = {
			uname: account,
			password: pwd,
			t: 'true',
			fid: '-1',
			numcode: validateCode,
			isCheckNumCode: 1,
			allowJoin: 0,
			pidName: "",
			fidName: "",
		},
		v2 = `http://passport2.chaoxing.com/fanyalogin`,
		v2Data = {
			fid: -1,
			uname: account,
			password: encryptByDES(pwd, transferKey),
			refer: `http%3A%2F%2Fi.chaoxing.com`,
			t: `true`
		}
	// console.warn(`encryptByDES(pwd, transferKey)`,encryptByDES(pwd, transferKey))
	return http.post(v2, v2Data, {
		header: {
			'Referer': 'http://passport2.chaoxing.com/mlogin?refer=http%3A%2F%2Fi.mooc.chaoxing.com',
			'content-type': 'application/x-www-form-urlencoded'
		},
	})
}

/**
 * 账号信息页面
 */
function accountManager() {
	return http.get('http://passport2.chaoxing.com/mooc/accountManage', {
		header: {
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'
		}
	})
}

/**
 * 课程列表页面
 */
function getCourse() {
	return http.post('http://mooc1-1.chaoxing.com/visit/courselistdata', {
		courseType: '1',
		courseFolderId: '0',
		courseFolderSize: '0',
	}, {
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	})
}

function getLoginCode() {
	return http.get(`http://passport2.chaoxing.com/num/code?${new Date().getTime()}`, {
		responseType: 'arraybuffer',
	})
}

export default {
	loginPage,
	login,
	accountManager,
	getCourse,
	getLoginCode
}
