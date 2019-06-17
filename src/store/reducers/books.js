import fetch from '../../utils/fetch/fetch.js'
import constKey from '../../utils/const.js'
import * as MUTATIONS from '../const/mutaions'

const defaultBook = {
	default:{
		_id: 'default',
		name: '默认'
	}
}

const defaultState = {
	list: defaultBook,
	curBook: 'default'
}

export default (state = defaultState, { type = '', payload = {} }) => {
	if(type === MUTATIONS.BOOK_LIST_SAVE) {
		const { data, start } = payload
		const newMap = start ? state.list : { ...defaultBook }
		data.forEach((item) => {
			newMap[item._id] = item
		})
		return {
			...state,
			list: newMap
		}
	}
	if(type === MUTATIONS.BOOK_LIST_UPDATE) {
		const data = payload
		return {
			...state,
			list: {
				...state.list,
				[data._id] : data
			}
		}
	}
	if(type === MUTATIONS.BOOK_CUR_UPDATE) {
		const data = payload
		return {
			...state,
			curBook: data
		}
	}
	return state
}

export function BOOK_LIST_GET(arg = {}) {
	return async (dispatch, getState) => {
		const rootState = getState()
		const state = rootState.books
		const { limit = 0, start = 0, force = false } = arg
		if(!force && Object.keys(state.list).length > 1){
			return { err: null, data: { list: state.list } }
		}
		const result = await fetch({
			url: '/api/books',
			data: {
				limit,
				start
			}
		})
		const { err, data } = result
		if(!err) {
			dispatch({
				type: MUTATIONS.BOOK_LIST_SAVE,
				payload: { data: data.list, start }
			})
		}
		return result
	}
}

export function BOOK_CUR_UPDATE(data) {
	return async dispatch => {
		dispatch({
			type: MUTATIONS.BOOK_CUR_UPDATE,
			payload: data
		})
	}
}
