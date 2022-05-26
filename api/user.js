import http from './http.js'

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
	validateCode
}) {
	// let passwd = btoa(pwd);
	return http.post('http://passport2.chaoxing.com/mlogin?refer=http%3A%2F%2Fi.mooc.chaoxing.com', {
		uname: account,
		password: pwd,
		t: 'true',
		fid: '-1',
		numcode: validateCode,
		isCheckNumCode: 1,
		allowJoin: 0,
		pidName: "",
		fidName: "",
	}, {
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
	return http.get('http://passport2.chaoxing.com/mooc/accountManage')
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
