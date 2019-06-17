import fetch from '../../utils/fetch/fetch.js'
import constKey from '../../utils/const.js'
import * as MUTATIONS from "../const/mutaions";
const defaultState = {
	userInfo: {},
	curUserInfo: {},
	userInfoStatus: '' // info:个人信息，modify:修改，reg:注册，login：登录
}


export default (state = defaultState,  { type, payload }) => {
	if(type === MUTATIONS.USER_SAVE) {
		const  data = payload
		return {
			...state,
			userInfo: {
				...data
			}
		}
	}
	if(type === MUTATIONS.CUR_USER_INFO_SAVE) {
		const info = payload
		return {
			...state,
			curUserInfo: { ...info }
		}
	}
	if(type === MUTATIONS.CUR_USER_LAYOUT_SAVE) {
		const info = payload
		return {
			...state,
			userInfoStatus: { ...info }
		}
	}
	return state
}

export function login(data) {
	return async (dispatch, getState) => {
		const result = await fetch({
			url: '/api/login',
			method: 'post',
			data,
			notAlert: true
		})
		if(!result.err) {
			dispatch({
				type: MUTATIONS.USER_SAVE,
				payload: result.data
			})
		}
		return result
	}
}

export function USER_INFO_GET(data) {
	return async (dispatch, getState) => {
		const rootState = getState()
		const state = rootState.user
		if(state.userInfo.username) {
			return {
				err: null,
				data: state.userInfo
			}
		}
		const result = await fetch({
			url: '/api/getUserInfo'
		})
		if(!result.err) {
			dispatch({
				type: MUTATIONS.USER_SAVE,
				payload: result.data
			})
		}
		return result
	}
}
