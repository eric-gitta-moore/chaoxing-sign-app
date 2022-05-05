// const http = uni.$u.http
import Request from '@/js_sdk/luch-request/luch-request/index.js' // 下载的插件
const http = new Request();

http.interceptors.request.use((r) => {
	r.header = {
		...r.header,
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'
	}
	console.info('http.interceptors.request', r)
	return r
})
http.interceptors.response.use((r) => {
	let needLoginReg = /<title>用户登录<\/title>/;
	if (needLoginReg.test(r.data)) {
		console.log(`Promise.reject('需要登录')`, r)
		return Promise.reject('需要登录')
	}
	console.info('http.interceptors.response', r)
	return r
})

export default http