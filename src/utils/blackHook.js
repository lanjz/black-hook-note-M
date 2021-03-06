import { createBrowserHistory } from 'history'
// console.log('history', history)
export const RouterHistory = createBrowserHistory()

function baseTimestampToTime(stamps, format) {
	if(!stamps){
		return ''
	}
	let fmt=format?format:"YYYY-MM-DD hh:mm:ss"
//                var getDate=stamps==''||!stamps?new Date():new Date(stamps)
	const getDate=new Date(stamps * 1);
	const o = {
		"M+": getDate.getMonth() + 1, //月份
		"D+": getDate.getDate(), //日
		"h+": getDate.getHours(), //小时
		"m+": getDate.getMinutes(), //分
		"s+": getDate.getSeconds(), //秒
		"q+": Math.floor((getDate.getMonth() + 3) / 3), //季度
		"S": getDate.getMilliseconds() //毫秒
	};
	if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

export function timestampToTime(stamps, format) {
	return baseTimestampToTime(stamps, format)
}
export function timestampToBriefTime(stamps, format) {
	const getDate =  baseTimestampToTime(stamps, 'YYYY.MM.DD')
	return getDate ? getDate.substring(2) : ''
}

export function getQuery(key) {
	if(!window) return ''
	const search = window.location.search.slice(1)
	const searchSplit = search.split('&')
	if(!searchSplit.length) return ''
	const data = {}
	searchSplit.forEach(item => {
		const itemSplit = item.split('=')
		data[itemSplit[0]] = itemSplit[1]
	})
	return key ? data[key] : data
	
}
