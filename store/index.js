import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import course from './modules/course'
import userManagement from './modules/userManagement'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		course,
		userManagement,
	},
	strict:true
})

export default store