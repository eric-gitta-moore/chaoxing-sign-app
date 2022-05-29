// const http = uni.$u.http
import Request from '@/js_sdk/luch-request/luch-request/index.js' // 下载的插件
import WeappCookies from 'weapp-cookie'
import Constant from '@/const.js'
const http = new Request();

http.interceptors.request.use((r) => {

	r.header = {
		'user-agent': Constant.APPUA,
		...r.header
	}
	// console.info('http.interceptors.request', r)
	return r
})
http.interceptors.response.use((r) => {
	//let {
	//	hostname
	//} = new URL(r.config.fullPath)
	let domainReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/i;
	let hostname = domainReg.exec(r.config.fullPath)[0]
	// console.log("hostname", hostname)

	// console.info('http.interceptors.response', r, `cookie.dir(${hostname})`, WeappCookies.dir(),
		// 'uni.getStorageInfoSync', uni.getStorageInfoSync())

	if (typeof r.data !== 'string') return r;

	if (r.data.indexOf('<title>用户登录') !== -1 || r.data.indexOf('请重新登录!</a>') !== -1 || r.data.indexOf(
			'<title>新用户注册') !== -1) {
		console.warn(`Promise.reject('登录过期')`, r)
		uni.clearStorage()
		// console.log('uni.getStorageInfoSync', uni.getStorageInfoSync())
		return Promise.reject('登录过期')
	}
	return r
})

export default http
