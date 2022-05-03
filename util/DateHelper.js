/**
 * @description
 *  将 Date 转化为指定格式的String
 *  月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {Date} date 要格式化的日期时间对象
 * @param {String} fmt 描述格式的字符串
 * @returns {String} 格式化后的日期字符串
 * @see https://www.haorooms.com/post/js_date_format_func
 * @example
 *  (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *  (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
function format(date, fmt) {
	var o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds() //毫秒
	}
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
	return fmt
}

/**
 * @description 传入两个毫秒数得到相隔天数（传入的毫秒数无大小顺序）
 * @param {Number} timeA 传入的毫秒数A
 * @param {Number} timeB 传入的毫秒数B
 * @returns {Number} 相隔天数
 */
// function getGapDate(timeA, timeB) {
//   if (!(timeA && timeB)) {
//     return
//   }
//   let absTime = Math.abs(timeA - timeB)
//   return parseInt(absTime / 1000 / 60 / 60 / 24)
// }

/**
 * @description 传入两个时间得到相隔时长
 * @param {Date} startTime 传入的开始时间
 * @param {Date} endTime 传入的结束时间
 * @param {number} pointLength 小数点后的位数(默认0位)
 * @returns {string} 时间间隔，返回：如 1天/3分钟/2秒；如果endTime小于startTime，时间间隔将会是负数
 */
function formatDateGap(startTime, endTime, pointLength = 0) {
	const units = [{
		unit: "毫秒",
		multiple: 1000
	}, {
		unit: "秒",
		multiple: 60
	}, {
		unit: "分钟",
		multiple: 60
	}, {
		unit: "小时",
		multiple: 24
	}, {
		unit: "天"
	}];
	let firstUnit = units[0].unit;
	let gap = endTime - startTime;
	if (gap === 0) return 0;

	let item;
	while ((item = units.shift()) && item.multiple && gap > item.multiple) {
		gap = gap / item.multiple;
	}
	return (item.unit === firstUnit ? gap : gap.toFixed(pointLength)) + item.unit;
}

/**
 * @description 获取某年某月的总天数
 * @param {Number} year 年份
 * @param {Number} month 月份
 */
function getDaysInOneMonth(year, month) {
	// month = parseInt(month, 10);
	var d = new Date(year, month, 0)
	return d.getDate()
}

/**
 * @description 验证是否为时间戳
 * @param {Number} time 时间戳
 */
function timeRules(time) {
	if (parseInt(time) && time.toString().length === 13) {
		return true
	} else {
		return false
	}
}

/**
 * @description 获取当天时间0点的时间戳
 * @param {Number} time 时间戳
 */
function setHour0(time) {
	return new Date(new Date(time).setHours(0, 0, 0, 0)).getTime()
}

/**
 * @description 获取当天时间24点的时间戳
 * @param {Number} time 时间戳
 */
function setHour24(time) {
	return new Date(new Date(time).setHours(23, 59, 59, 999)).getTime()
}

export default {
	format,
	// getGapDate,
	formatDateGap,
	getDaysInOneMonth,
	timeRules,
	setHour0,
	setHour24
}
