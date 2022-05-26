import userApi from '../api/user.js'
import UserEntity from '@/entity/User.js'

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
	await userApi.loginPage()
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
		school = '';
	let html = await userApi.accountManager()
	html = html.data
	try {

		let nameReg = /id="messageName">(.*?)<\/p>/mi
		if (nameReg.test(html))
			name = nameReg.exec(html)[1]

		let phoneReg = /id="messagePhone">((\+?0?86\-?)?1[3-9]\d{9})<\/span>/mi
		if (phoneReg.test(html))
			phone = phoneReg.exec(html)[1]

		let avatarReg = /"(http:\/\/photo.chaoxing.com\/p\/.*?)"/mi
		if (avatarReg.test(html))
			avatar = avatarReg.exec(html)[1]

		let schoolReg = /<ul class="listCon" id="messageFid">\s+<li> (\S+)/mi
		if (schoolReg.test(html))
			school = schoolReg.exec(html)[1]

		let sexReg = /value="1"><\/i>(男|女|male|female)\s*<\/span>/mi
		console.log('sexReg.exec(html)', sexReg.exec(html))
		if (sexReg.test(html))
			sex = sexReg.exec(html)[1]
		sex.replace('female', '女').replace('male', '男')

	} catch (e) {
		console.warn(e)
	}

	return new UserEntity({
		name: name.trim(),
		sex: sex.trim(),
		phone: phone.trim(),
		avatar: avatar.trim(),
		school: school.trim()
	})
}

async function getLoginCode() {
	const res = await userApi.getLoginCode()
	const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(res.data)
	console.log("arrayBufferToBase64", base64)
	return base64
}

export default {
	login,
	getUserInfo,
	getLoginCode
}
