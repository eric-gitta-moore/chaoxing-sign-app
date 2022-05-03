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
 * @param {String} fid 
 * @param {String} t 
 * @param {String} refer 
 */
function login({
	account,
	pwd,
}) {
	let passwd = btoa(pwd);
	return http.post('http://passport2.chaoxing.com/fanyalogin', {
		uname: account,
		password: passwd,
		t: 'true',
		fid: '-1',
		refer: 'http://i.chaoxing.com'
	}, {
		header: {
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

export default {
	loginPage,
	login,
	accountManager,
	getCourse
}
