import App from './App'
import WeappCookies from 'weapp-cookie'

import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

//只能在初始化uView完成之后才能加载store，因为这里用到了uni.$u.http
import store from './store'

// 初始化z-paging
import zConfig from '@/uni_modules/z-paging/components/z-paging/js/z-paging-config'
zConfig.setConfig(null)
zConfig.setConfig({
	'loading-more-title-custom-style': {
		'font-size': '14px'
	}
})

const app = new Vue({
	...App,
	store
})
app.$mount()
