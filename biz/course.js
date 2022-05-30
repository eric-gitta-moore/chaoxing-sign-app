import userApi from '../api/user.js'
import CourseEntity from '../entity/Course.js'
import CourseApi from '../api/course.js'
import ActivityEntity from '../entity/Activity.js'
import {
	gcj02tobd09
} from '@/util/CoordinateSystemHelper.js'

/**
 * 获取根目录下所有课程
 */
async function getCourse() {
	let courseArr = []
	// for (let item of [...(new Array(10)).keys()]) {
	// 	item = item + ''
	// 	courseArr.push(new CourseEntity({
	// 		name: item,
	// 		courseId: item,
	// 		classId: item,
	// 		className: item,
	// 		img: item,
	// 		summary: item,
	// 		teacher: item,
	// 	}))
	// }
	// return courseArr
	let r = null;
	try {
		r = await userApi.getCourse()
	} catch (e) {
		return []
	}
	let html = r.data

	let nameRex = /class="course-name overHidden2" title="(?<name>.*?)"/g
	let courseIdClassIdRex = /id="course_(?<courseId>\d+)_(?<classId>\d+)"/g
	let imgRex = /<img\s*?src="(?<img>https\S+\.\w{3,4})">/g
	let summaryRex = /<p class="margint10 line2" title="(?<summary>.*?)">/g
	let teacherRex = /<p class="line2" title="(?<teacher>.*?)">/g
	let classNameRex = /<p class="overHidden1">(?<className>.*?)<\/p>/g
	while (1) {
		let nameMatch = nameRex.exec(html)?.groups
		if (!nameMatch)
			break;
		let {
			name
		} = nameMatch
		// console.log(name)
		let {
			courseId,
			classId
		} = courseIdClassIdRex.exec(html).groups
		let {
			img
		} = imgRex.exec(html).groups
		let {
			summary
		} = summaryRex.exec(html).groups
		let {
			teacher
		} = teacherRex.exec(html).groups
		let {
			className
		} = classNameRex.exec(html).groups
		courseArr.push(new CourseEntity({
			name,
			courseId,
			classId,
			className,
			img,
			summary,
			teacher
		}))
	}
	return courseArr
}

/**
 * 获取单个课程所有活动
 */
async function getActivities(courseId, classId) {
	let r = await CourseApi.getActivities(courseId, classId)
	let arr = []
	for (let item of r.data.data?.activeList) {
		arr.push(new ActivityEntity({
			userStatus: item.userStatus,
			nameTwo: item.nameTwo,
			groupId: item.groupId,
			isLook: item.isLook,
			type_: item.type_,
			releaseNum: item.releaseNum,
			attendNum: item.attendNum,
			activeType: item.activeType,
			logo: item.logo,
			nameOne: item.nameOne,
			startTime: item.startTime,
			id: item.id,
			endTime: item.endTime,
			status: item.status,
			nameFour: item.nameFour,
			extraInfo: item?.extraInfo,
			otherId: item?.otherId,
			source: item?.source,
		}))
	}
	return arr;
}

/**
 * 普通签到、手势签到、签到码签到
 * @param context vue组件上下文
 * @param {ActivityEntity} activity
 */
async function generalSign(context, activity) {
	let r = await CourseApi.generalSign({
		activeId: activity.id,
		uid: context.$store.state.user.loginParams._uid,
		fid: context.$store.state.user.loginParams.fid,
		name: context.$store.state.user.name,
	})
	if (r.data === 'success')
		return true
	else if (r.data === '非法请求') {
		return `服务器返回：${r.data}\n表示签到已经结束`
	}
	return r.data
}

/**
 * 拍照签到
 * @param context vue组件上下文
 * @param objectId 图片在超星云盘中的id
 */
async function photoSign(context, activity, objectId) {
	let r = await CourseApi.photoSign({
		activeId: activity.id,
		uid: context.$store.state.user.loginParams._uid,
		fid: context.$store.state.user.loginParams.fid,
		name: context.$store.state.user.name,
		objectId
	})
	if (r.data === 'success')
		return true
	return r.data
}

/**
 * 二维码签到
 * @param context vue组件上下文
 */
async function QRCodeSign(context, activity, enc) {
	let r = await CourseApi.QRCodeSign({
		enc,
		activeId: activity.id,
		uid: context.$store.state.user.loginParams._uid,
		fid: context.$store.state.user.loginParams.fid,
		name: context.$store.state.user.name,
	})
	if (r.data === 'success')
		return true
	return r.data
}

/**
 * 位置签到
 * @param context vue组件上下文
 * @param {ActivityEntity} activity
 */
async function locationSign(context, activity, {
	address,
	latitude,
	longitude
}) {
	let decode = gcj02tobd09(longitude, latitude)
	let lon = decode[0],
		lan = decode[1]
	let r = await CourseApi.locationSign({
		activeId: activity.id,
		uid: context.$store.state.user.loginParams._uid,
		fid: context.$store.state.user.loginParams.fid,
		name: context.$store.state.user.name,
		uf: context.$store.state.user.uf,
		_d: context.$store.state.user._d,
		vc3: context.$store.state.user.vc3,
		address,
		latitude: lan,
		longitude: lon,
	})
	console.log(r)
	if (r.data === 'success')
		return true
	return r.data
}

/**
 * @description 上传文件到超星云盘
 * @param {*} filePath 
 */
async function chaoxingPanUpload(context, activity, filePath) {
	let tokenResponse = await CourseApi.getPanToken()
	let _token = tokenResponse.data._token
	let uploadResponse = await CourseApi.chaoxingPanUpload(filePath,
		context.$store.state.user.loginParams._uid, _token)
	if (uploadResponse.data.msg === 'success') {
		return {
			objectId: uploadResponse.data.data.objectId,
			previewUrl: uploadResponse.data.data.previewUrl,
		}
	}
	return null
}



export default {
	getCourse,
	getActivities,
	generalSign,
	photoSign,
	locationSign,
	QRCodeSign,
	chaoxingPanUpload,

}
