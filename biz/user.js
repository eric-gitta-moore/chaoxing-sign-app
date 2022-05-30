import userApi from '../api/user.js'
import UserEntity from '@/entity/User.js'
import WeappCookie from 'weapp-cookie'

/**
 * 登录
 * @param {String} account 
 * @param {String} pwd
 * @param {String} validateCode
 */
async function login({
	account,
	pwd,
	validateCode
}, raw = false) {
	// await userApi.loginPage()

	console.log(`WeappCookie.dir()`, WeappCookie.getCookies())
	WeappCookie.clearCookies()
	console.log(`%c loginAs.UserBiz.doLogin`, `color:skyblue`, {
		account,
		pwd
	}, WeappCookie.getCookies())
	let r = await userApi.login({
		account,
		pwd,
		validateCode
	})
	if (raw) return r
	return r.data
}

/**
 * 获取账号信息
 */
async function getUserInfo() {
	let name = '',
		sex = '',
		phone = '',
		avatar = '',
		numberCard = '',
		school = '';
	let html = await userApi.accountManager()
	html = html.data
	try {
		/**
		 * PC UA正则匹配
		 */
		let nameReg = /id="messageName">(.*?)<\/p>/mi
		if (nameReg.test(html))
			name = nameReg.exec(html)[1]

		let phoneReg = /id="messagePhone">((\+?0?86\-?)?1[3-9]\d{9})<\/span>/mi
		if (phoneReg.test(html))
			phone = phoneReg.exec(html)[1]

		let numberCardReg = /xuehao.*?:(\d+)<\/p>/mi
		if (numberCardReg.test(html))
			numberCard = numberCardReg.exec(html)[1]

		let avatarReg = /"(http:\/\/photo.chaoxing.com\/p\/.*?)"/mi
		if (avatarReg.test(html))
			avatar = avatarReg.exec(html)[1]

		let schoolReg = /<ul class="listCon" id="messageFid">\s+<li> (\S+)/mi
		if (schoolReg.test(html))
			school = schoolReg.exec(html)[1]

		let sexReg = /checked"\s*?value="\d{1}"><\/i>(男|女|male|female)\s*<\/span>/mi
		console.log('%c sexReg.exec(html)', 'color:orange', sexReg.exec(html))
		if (sexReg.test(html))
			sex = sexReg.exec(html)[1]

	} catch (e) {
		console.warn(e)
	}

	let entity = new UserEntity({
		name: name.trim(),
		sex: sex.trim().replace('female', '女').replace('male', '男'),
		phone: phone.trim(),
		numberCard: numberCard.trim(),
		avatar: avatar.trim(),
		school: school.trim()
	})
	console.log("UserEntity", entity)
	return entity;
}

async function getLoginCode() {
	const res = await userApi.getLoginCode()
	const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(res.data)
	return base64
}

async function doLogin(context, {
	account,
	pwd
}) {
	let r = await context.$store.dispatch('user/login', {
		userInfo: {
			account,
			pwd
		}
	})
	if (r?.status === false) {
		plus.nativeUI.toast(r.msg2, {
			verticalAlign: 'center',
		})
		return false;
	}
	let user = await context.$store.dispatch('user/getUserInfo', true)
	let appendAccount = {
		account,
		pwd,
		name: user.name
	}
	console.log('appendAccount', appendAccount)
	context.$store.dispatch('userManagement/appendAccount', appendAccount)

	// setTimeout(() => {
	// 	async function a() {
	// 		await context.$store.dispatch('user/getUserInfo')
	// 		await context.$store.dispatch('user/getLoginParams')
	// 		await context.$store.dispatch('course/getCourseList', true)
	// 		await context.$store.dispatch('course/refreshActivitiesOfAllCourse')


	// 		uni.unPreloadPage({
	// 			url: "/pages/activity/activity"
	// 		})
	// 		uni.unPreloadPage({
	// 			url: "/pages/user/user"
	// 		})
	// 		uni.preloadPage({
	// 			url: "/pages/activity/activity"
	// 		});
	// 		uni.preloadPage({
	// 			url: "/pages/user/user"
	// 		});

	// 	}
	// 	a()
	// }, 0)

	return user
}

export default {
	login,
	getUserInfo,
	getLoginCode,
	doLogin
}
