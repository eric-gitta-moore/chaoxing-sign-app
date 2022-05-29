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
		// debugger
		// 更新密码
		let userList = state.userList.reduce((prev, cur, index) => {
			if (arr[cur.account] !== undefined && arr[cur.account].pwd !== '') {
				// 更新
				prev.push(arr[cur.account])
				delete arr[cur.account]
			} else if (arr[cur.account] === undefined) {
				// 新增
				prev.push(cur)
			} else {
				// 密码置空就是删除
				
			}
			return prev
		}, [])
		// debugger
		let newAccount = Object.values(arr)
		newAccount = newAccount.filter(e => e.pwd !== '')

		userList = newAccount.concat(userList)
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
		context.dispatch('__dispatch_set_account_with_storage',arr)
		console.log('appendAccount.context.state.userList', arr, context.state.userList)
	},
	
	__dispatch_set_account_with_storage(context,arr)
	{
		context.commit('SET_ACCOUNT', arr)
		uni.setStorage({
			data: context.state.userList,
			key: context.state.__localStorageKey
		})
	},

	__initOnce(context) {
		if (context.state.__isInit) return false;
		let list = uni.getStorageSync(context.state.__localStorageKey)
		console.log("__userManagement__.__initOnce", list, context.state.userList)
		if (list.length !== 0)
			context.commit('SET_ACCOUNT', list)
		context.commit('SET_INIT_DONE')
	},

	async deleteAccounts(context, accountList) {
		let list = accountList.map(e => {
			return {
				account: e.account,
				pwd: ''
			}
		})
		context.dispatch('__dispatch_set_account_with_storage',list)
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
