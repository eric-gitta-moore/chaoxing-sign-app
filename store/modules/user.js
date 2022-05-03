import UserBiz from '@/biz/user.js'
import UserEntity from '@/entity/User.js'
import Constant from '@/const.js'
import user from '../../api/user'

const state = {
	name: '',
	sex: '',
	avatar: '',
	phone: '',
	school: '',
	account: '',
	pwd: '',
	loginParams: {
		fid: '',
		_uid: '',
		uf: '',
		_d: '',
		vc3: '',
	},
	cookies: [],

}

const mutations = {
	SET_NAME(state, name) {
		state.name = name
	},
	SET_SEX(state, sex) {
		state.sex = sex
	},
	SET_AVATAR(state, avatar) {
		state.avatar = avatar
	},
	SET_PHONE(state, phone) {
		state.phone = phone
	},
	SET_SCHOOL(state, school) {
		state.school = school
	},
	SET_ACCOUNT(state, account) {
		state.account = account
	},
	SET_PWD(state, pwd) {
		state.pwd = pwd
	},
	SET_INFO(state, info) {
		state.name = info.name
		state.sex = info.sex
		state.avatar = info.avatar
		state.phone = info.phone
		state.school = info.school
	},
	SET_COOKIES(state, cookies) {
		state.cookies = cookies
	},
	SET_LOGINPARAMS(state, p) {
		state.loginParams.fid = p.fid
		state.loginParams._uid = p._uid
		state.loginParams.uf = p.uf
		state.loginParams._d = p._d
		state.loginParams.vc3 = p.vc3
	}
}

const actions = {
	/**
	 * 登录
	 * @param {Object} context
	 * @param {Object} userInfo
	 */
	async login(context, userInfo) {
		console.log(userInfo)
		let r = await UserBiz.login(userInfo, true)
		// console.log('什么情况', r)
		if (r.data.status === true) {
			context.commit('SET_ACCOUNT', userInfo.account)
			context.commit('SET_PWD', userInfo.pwd)
			context.commit('SET_COOKIES', r.cookies)
			uni.setStorage({
				key: Constant.loginCookies,
				data: r.cookies
			})
			//匹配需要的cookie
			let fidReg = /fid=(.*?);/,
				fid = ""
			let _uidReg = /_uid=(.*?);/,
				_uid = ""
			let ufReg = /uf=(.*?);/,
				uf = ""
			let _dReg = /_d=(.*?);/,
				_d = ""
			let vc3Reg = /vc3=(.*?);/,
				vc3 = ""
			try {
				for (let s of r.cookies) {
					console.log(s)
					if (fidReg.test(s))
						fid = fidReg.exec(s)[1]
					else if (_uidReg.test(s))
						_uid = _uidReg.exec(s)[1]
					else if (ufReg.test(s))
						uf = ufReg.exec(s)[1]
					else if (_dReg.test(s))
						_d = _dReg.exec(s)[1]
					else if (vc3Reg.test(s))
						vc3 = vc3Reg.exec(s)[1]
				}
				let params = {
					fid,
					_uid,
					uf,
					_d,
					vc3,
				}
				context.commit('SET_LOGINPARAMS', params)
				uni.setStorage({
					key: Constant.loginParams,
					data: params,
					success: function() {
						console.log('success');
					}
				})
			} catch (e) {
				console.log(e, {
					fid,
					_uid,
					uf,
					_d,
					vc3,
				})
			}
		}
		console.log('SET_LOGINPARAMS', context.state.loginParams)
		return r.data
	},

	/**
	 * @description 获取登录时候取得的各种参数
	 * @param {Object} context
	 */
	async getLoginParams(context) {
		if (context.state.loginParams._uid !== '')
			return context.state.loginParams
		let params = uni.getStorageSync(Constant.loginParams)
		let cookies = uni.getStorageSync(Constant.loginCookies)
		if (params && cookies) {
			context.commit('SET_LOGINPARAMS', params)
			context.commit('SET_COOKIES', cookies)
			return context.state.loginParams
		}
		uni.removeStorage({
			key: Constant.loginParams,
		})
		uni.removeStorage({
			key: Constant.loginCookies,
		})
		return null
	},

	/**
	 * 获取用户信息，并自动缓存
	 * @param {Object} context
	 */
	async getUserInfo(context, forceRefesh = false) {
		let userEntity = context.getters.userEntity
		if (userEntity.phone === '') {
			let storage = await uni.getStorage({
				key: Constant.userInfo,
			})
			if (storage.length === 2)
				userEntity = new UserEntity(storage[1].data)
			else
				uni.removeStorage({
					key: Constant.userInfo
				})
		}
		if (userEntity.phone === '' || forceRefesh) {
			uni.removeStorage({
				key: Constant.userInfo
			})
			userEntity = await UserBiz.getUserInfo()
		}
		uni.setStorage({
			key: Constant.userInfo,
			data: userEntity
		})
		context.commit('SET_INFO', userEntity)
		return userEntity
	}
}

const getters = {
	userEntity(state) {
		return new UserEntity({
			name: state.name,
			sex: state.sex,
			phone: state.phone,
			avatar: state.avatar,
			school: state.school
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
