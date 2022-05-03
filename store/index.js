import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import course from './modules/course'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		course
	},
	strict:true
})

export default store