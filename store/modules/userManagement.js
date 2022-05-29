const state = {
	/**
	 * @type {Array.<Object>}
	 * acount
	 * pwd
	 * name
	 */
	userList: [

	],
	__isInit: false,
	__localStorageKey: '__userManagement__'
}

const mutations = {
	SET_ACCOUNT(state, arr) {
		if (!(arr instanceof Array)) arr = [arr]
		// 关联数组
		arr = arr.reduce((prev, cur, index) => {
			prev[cur.account] = cur
			return prev
		}, {})
		// 更新密码
		let userList = state.userList.reduce((prev, cur, index) => {
			if (arr[cur.account] !== undefined) {
				prev.push(arr[cur.account])
				delete arr[cur.account]
			} else
				prev.push(cur)
			return prev
		}, [])
		// debugger
		let newAccount = Object.values(arr)
		userList = newAccount.concat(userList)
		// arr.filter(e => e?.pwd !== undefined && e?.pwd !== '').forEach(e => {
		// 	console.log('state.userList.splice', e)
		// 	state.userList.splice(state.userList.length, 0, {
		// 		account: e.account,
		// 		pwd: e.pwd,
		// 		name: e.name
		// 	})
		// })
		state.userList = userList
	},
	SET_INIT_DONE(state) {
		state.__initOnce = true
	}
}


const actions = {
	async appendAccount(context, arr) {
		if (!(arr instanceof Array)) arr = [arr]
		context.dispatch('__initOnce')
		context.commit('SET_ACCOUNT', arr)
		uni.setStorage({
			data: context.state.userList,
			key: context.state.__localStorageKey
		})
		console.log('appendAccount.context.state.userList', arr, context.state.userList)
	},

	__initOnce(context) {
		if (context.state.__isInit) return false;
		let list = uni.getStorageSync(context.state.__localStorageKey)
		console.log("__userManagement__.__initOnce", list, context.state.userList)
		if (list.length !== 0)
			context.commit('SET_ACCOUNT', list)
		context.commit('SET_INIT_DONE')
	},

	async clearAllAccount(context) {
		try {
			uni.removeStorageSync(context.state.__localStorageKey)
			return true
		} catch (e) {}
		return false
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
