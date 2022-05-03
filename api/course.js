import http from './http.js'


/**
 * 获取单个课程所有活动
 */
function getActivities(courseId, classId) {
	return http.get('https://mobilelearn.chaoxing.com/v2/apis/active/student/activelist', {
		params: {
			courseId,
			classId,
			fid: 0,
			'_': new Date().getTime()
		}
	})
}

/**
 * 普通签到、手势签到、签到码签到
 */
function generalSign({
	activeId,
	uid,
	fid,
	name
}) {
	return http.get('https://mobilelearn.chaoxing.com/pptSign/stuSignajax', {
		params: {
			activeId,
			uid,
			latitude: -1,
			longitude: -1,
			appType: 15,
			fid,
			name
		}
	})
}

/**
 * 拍照签到
 */
function photoSign({
	activeId,
	uid,
	fid,
	name,
	objectId
}) {
	return http.get('https://mobilelearn.chaoxing.com/pptSign/stuSignajax', {
		params: {
			activeId,
			uid,
			latitude: -1,
			longitude: -1,
			appType: 15,
			fid,
			name,
			objectId
		}
	})
}

/**
 * @description 获取上传超星网盘的token
 */
function getPanToken() {
	return http.get('https://pan-yz.chaoxing.com/api/token/uservalid')
}

/**
 * @description 超星网盘上传文件
 * @param {*} filePath 
 * @param {*} _uid 
 * @param {*} _token 
 */
function chaoxingPanUpload(filePath, _uid, _token) {
	return http.upload('https://pan-yz.chaoxing.com/upload', {
		filePath,
		name: 'file',
		formData: {
			puid: Number(_uid)
		},
		params: {
			_token
		}
	})
}

/**
 * 二维码签到
 */
function QRCodeSign({
	enc,
	activeId,
	uid,
	fid,
	name
}) {
	return http.get('https://mobilelearn.chaoxing.com/pptSign/stuSignajax', {
		params: {
			activeId,
			uid,
			latitude: -1,
			longitude: -1,
			appType: 15,
			fid,
			name,
			enc
		}
	})
}

/**
 * @description 位置签到
 */
function locationSign({
	uf,
	_d,
	vc3,
	name,
	address,
	activeId,
	uid,
	latitude,
	longitude,
	fid
}) {
	return http.get('https://mobilelearn.chaoxing.com/pptSign/stuSignajax', {
		params: {
			name,
			address,
			activeId,
			uid,
			latitude,
			longitude,
			appType: 15,
			ifTiJiao: -1,
			clientip: ''
		}
	})
}

export default {
	getActivities,
	generalSign,
	QRCodeSign,
	locationSign,
	photoSign,
	getPanToken,
	chaoxingPanUpload,
}
