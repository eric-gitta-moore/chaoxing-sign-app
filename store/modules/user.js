import UserBiz from '@/biz/user.js'
import UserEntity from '@/entity/User.js'
import Constant from '@/const.js'
import user from '../../api/user'

const state = {
	name: '',
	sex: '',
	avatar: '',
	phone: '',
	numberCard: '',
	school: '',
	account: '',
	pwd: '',

	/**
	 * @deprecated
	 */
	loginParams: {
		fid: '',
		_uid: '',
		uf: '',
		_d: '',
		vc3: '',
	},
}

const mutations = {
	SET_INFO(state, info) {
		// state.name = info.name
		// state.sex = info.sex
		// state.avatar = info.avatar
		// state.phone = info.phone
		// state.school = info.school
		console.log(`%c info`, 'color:green', info, Object.keys(info))
		for (let key of Object.keys(info)) {
			console.log(',Object.keys(info)', key)
			state[key] = info[key]
		}
	},

	/**
	 * @param {Object} state
	 * @param {Object} p
	 * @deprecated
	 */
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
	 * @param {Object} userInfoObj
	 */
	async login(context, userInfoObj) {
		console.log(userInfoObj)
		let userInfo = userInfoObj.userInfo;
		let r = await UserBiz.login({
			account: userInfoObj.userInfo.account,
			pwd: userInfoObj.userInfo.pwd,
			validateCode: userInfoObj.code
		}, true)
		return r.data
	},

	/**
	 * @description 获取登录时候取得的各种参数
	 * @param {Object} context
	 * @deprecated
	 */
	async getLoginParams(context) {
		if (context.state.loginParams._uid !== '')
			return context.state.loginParams
		let params = uni.getStorageSync(Constant.loginParams)
		let cookies = uni.getStorageSync(Constant.loginCookies)
		if (params && cookies) {
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
			school: state.school,
			numberCard: state.numberCard
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
