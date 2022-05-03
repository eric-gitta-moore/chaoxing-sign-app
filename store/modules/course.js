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
		activities
	}) {
		for (let course of state.courseList) {
			if (course.courseId === courseId) {
				course.activities = activities
			}
		}
	}
}

const actions = {
	/**
	 * 获取课程列表
	 */
	async getCourseList(context, forceRefresh = false) {
		let courseList = context.state.courseList
		if (courseList.length === 0) {
			let storage = await uni.getStorage({
				key: Constant.courseList
			})
			// debugger
			if (storage.length === 2) {
				courseList = []
				for (let item of storage[1].data) {
					courseList.push(new CourseEntity(item))
				}
			}
		}
		if (courseList.length === 0 || forceRefresh) {
			courseList = await courseBiz.getCourse()
			// debugger
			uni.setStorage({
				key: Constant.courseList,
				data: courseList
			})
		}
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
		return arr.flat()
	},
	oneActivities: (state, getters) => (courseId) => {
		for (let item of state.courseList) {
			if (Number(item.courseId) === Number(courseId)) {
				return item.activities
			}
		}
		return null
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
