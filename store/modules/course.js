import courseBiz from '../../biz/course.js';
import CourseEntity from '../../entity/Course.js'
import Constant from '../../const.js'

const state = {
	/**
	 * @property {Array.<CourseEntity>}
	 */
	courseList: [],

}

const mutations = {
	SET_LIST(state, courseList) {
		state.courseList = courseList
	},
	SET_ACTIVITIES(state, {
		courseId,
		classId,
		activities
	}) {
		for (let course of state.courseList) {
			if (Number(course.courseId) === Number(courseId) && Number(course.classId) == Number(classId)) {
				course.activities = activities
				return state.courseList
			}
		}
	}
}

const actions = {
	/**
	 * 获取课程列表
	 */
	async getCourseList(context, forceRefresh = true) {
		let courseList = context.state.courseList
		// if (courseList.length === 0) {
		// 	let storage = await uni.getStorage({
		// 		key: Constant.courseList
		// 	})
		// 	// debugger
		// 	if (storage.length === 2) {
		// 		courseList = []
		// 		for (let item of storage[1].data) {
		// 			courseList.push(new CourseEntity(item))
		// 		}
		// 	}
		// }
		// if (courseList.length === 0 || forceRefresh) {
		// 	courseList = await courseBiz.getCourse()
		// 	// debugger
		// 	uni.setStorage({
		// 		key: Constant.courseList,
		// 		data: courseList
		// 	})
		// }
		courseList = await courseBiz.getCourse()
		// console.warn(courseList, forceRefresh)
		context.commit('SET_LIST', courseList)
		return courseList
	},
	async getActivitiesOfOneCourse(context, {
		courseId,
		classId
	}) {
		let activities = await courseBiz.getActivities(courseId, classId)
		context.commit('SET_ACTIVITIES', {
			courseId,
			classId,
			activities
		})
		return activities
	},
	async refreshActivitiesOfAllCourse(context) {
		for (let course of context.state.courseList) {
			let activities = await context.dispatch('getActivitiesOfOneCourse', {
				courseId: course.courseId,
				classId: course.classId
			})
			context.commit('SET_ACTIVITIES', {
				courseId: course.courseId,
				classId: course.classId,
				activities
			})
		}
		return context.getters.allActivities
	}
}

const getters = {
	allActivities(state) {
		let arr = []
		for (let item of state.courseList) {
			let pushOne = uni.$u.deepClone(item.activities)
			for (let s of pushOne) {
				s[Constant.courseInfo] = item
			}
			arr.push(pushOne)
		}
		let list = arr.flat()

		// let list = this.$store.getters['course/allActivities']
		// debugger
		let active = list.filter(a => (a.endTime === '' || Number(a.endTime) - new Date()
			.getTime() > 0))
		let unactive = list.filter(a => !(a.endTime === '' ||
			Number(a.endTime) - new Date().getTime() > 0))
		active.sort((a, b) => Number(b.startTime) - Number(a.startTime))
		unactive.sort((a, b) => Number(b.startTime) - Number(a.startTime))

		return active.concat(unactive)
	},
	oneActivities: (state, getters) => (courseId, classId) => {
		for (let item of state.courseList) {
			if (Number(item.courseId) === Number(courseId) && Number(item.classId) == Number(classId)) {
				return item.activities
			}
		}
		return null
	},
	activitiesByCourseId: (state, getters) => (courseId, classId = 0) => {
		if (courseId == 0) {
			return getters.allActivities
		}
		return getters.oneActivities(courseId, classId)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
