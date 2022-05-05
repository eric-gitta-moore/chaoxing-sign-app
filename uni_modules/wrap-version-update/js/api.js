export function getVersion() {
	uni.hideLoading();
	return new Promise((RES, REJ) => {
		// 如果是app才检测
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			RES(inf.version);
		})
		// #endif
		// #ifndef APP-PLUS
		console.log('非app环境,不进行版本检测')
		// #endif
	})
}
export function checkUpdate(version, config) {
	return new Promise((RES, REJ) => {
		let flag = true
		let loading = false;
		setTimeout(() => {
			if (flag && config.loading) {
				loading = true;
				uni.showLoading({
					title: config.loadingText,
					mask: config.loadingMask
				})
			}
		}, config.loadingDelay)

		uni.request({
			url: `${config.apiUrl}?id=${config.id}&version=${version}`,
			success: (res) => {
				flag = false
				if (loading) {
					uni.hideLoading();
				}
				if (res.statusCode === 200) {
					if (res.data.code === 0) {
						RES(res.data.data);
					} else {
						REJ(res.data.msg);
					}
				} else {
					console.err('res err:', res.data)
					REJ('未知错误')
				}
			},
			fail: (err) => {
				flag = false
				if (loading) {
					uni.hideLoading();
				}
				uni.getNetworkType({
					complete: res => {
						let networkType = res.networkType || 'none';
						if (networkType === 'none') {
							REJ('当前无网络,请检查您的网络连接')
						} else {
							console.err('err:', err)
							REJ('未知错误')
						}
					}
				});
			}
		})
	})
}


export function restart() {
	// #ifdef APP-PLUS
	if (plus.os.name.toLowerCase() === 'android') {
		plus.runtime.quit();
	} else {
		const threadClass = plus.ios.importClass("NSThread");
		const mainThread = plus.ios.invoke(threadClass, "mainThread");
		plus.ios.invoke(mainThread, "exit");
	}
	// #endif
}


//style转化为通用
export function styleInto(str) {
	let styleObject = '';
	for (let i in str) {
		styleObject += i.replace(/([A-Z])/g, "-$1").toLowerCase() + ':' + str[i] + ';'
	}
	return styleObject;
}
let tempFilePath
export function downloadFile({
	url,
	success,
	fail,
	progress
}) {
	if (tempFilePath) {
		progress(100)
		success(tempFilePath)
	} else {
		let percent = 0
		uni.downloadFile({
			url: url,
			success: (res) => {
				if (res.statusCode === 200) {
					progress(100)
					tempFilePath = res.tempFilePath
					success(res.tempFilePath)
				} else {
					fail()
					plus.nativeUI.toast('下载失败,请重试')
				}
			},
			fail: () => {
				fail()
				plus.nativeUI.toast('下载失败,请重试')
			}
		}).onProgressUpdate((res) => {
			if (percent !== res.progress) {
				percent = res.progress
				progress(res.progress)
			}
		});
	}
}
