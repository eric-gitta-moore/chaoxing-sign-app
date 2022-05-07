import userApi from '../api/user.js'
import UserEntity from '@/entity/User.js'

/**
 * 登录
 * @param {String} account 
 * @param {String} pwd
 */
async function login({
	account,
	pwd
}, raw = false) {
	await userApi.loginPage()
	let r = await userApi.login({
		account,
		pwd
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
		sex.replace('male','男').replace('female','女')

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

export default {
	login,
	getUserInfo
}
