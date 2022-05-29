// const http = uni.$u.http
import Request from '@/js_sdk/luch-request/luch-request/index.js' // 下载的插件
import WeappCookies from 'weapp-cookie'
const http = new Request();

http.interceptors.request.use((r) => {

	r.header = {
		...r.header,
		'user-agent': 'Mozilla/5.0 (Linux; Android 11; M2012K11AC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36 (device:M2012K11AC) Language/zh_CN com.chaoxing.mobile/ChaoXingStudy_3_5.2.4_android_phone_854_81 (@Kalimdor)_a2cc0509b70a496cbdd39154e22c0882',
		// 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'
	}
	console.info('http.interceptors.request', r)
	return r
})
http.interceptors.response.use((r) => {
	let {
		hostname
	} = new URL(r.config.fullPath)
	console.info('http.interceptors.response', r, `cookie.dir(${hostname})`, WeappCookies.dir())

	if (r.data instanceof ArrayBuffer) return r;
	
	if (r.data.indexOf('用户登录') !== -1 || r.data.indexOf('重新登录') !== -1 || r.data.indexOf('新用户注册') !== -1) {
		console.warn(`Promise.reject('登录过期')`, r)
		uni.clearStorage()
		console.log('uni.getStorageInfoSync',uni.getStorageInfoSync())
		return Promise.reject('登录过期')
	}
	return r
})

export default http
