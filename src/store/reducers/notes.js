import fetch from '../../utils/fetch/fetch.js'
import constKey from '../../utils/const.js'
import * as MUTATIONS from "../const/mutaions";

const defaultState = {
	list: {},
	curNote: "",
	notesMap: {},
	curNoteContent: {},
}

export default (state = defaultState,  { type, payload }) => {
	if(type === MUTATIONS.NOTE_LIST_SAVE) {
		const  { data, start, key } = payload
		const list = JSON.parse(JSON.stringify(state.list))
		const notesMap = JSON.parse(JSON.stringify(state.list))
		list[key] = data
		data.forEach(item => {
			notesMap[item._id] = item
		})
		return {
			...state,
			list,
			notesMap
		}
	}
	if(type === MUTATIONS.NOTE_CUR_UPDATE) {
		const data = payload
		return {
			...state,
			curNote: data
		}
	}
	if(type === MUTATIONS.NOTE_MAP_SAVE) {
		const { data, id } = payload
		return {
			...state,
			notesMap: {
				...state.notesMap,
				[id]: data
			}
		}
	}
	if(type === MUTATIONS.NOTE_CUR_CONTENT_UPDATE) {
		const data = payload
		return {
			...state,
			curNoteContent: data
		}
	}
	return state
}

export function NOTES_GET(arg = {}) {
	return async (dispatch, getState) => {
		const { limit = 0, start = 0, force = false } = arg
		const rootState = getState()
		const state = rootState.notes
		const bookId = rootState.books.curBook
		const catalogId = rootState.catalogs.curCatalog
		const key = `${bookId}_${catalogId}`
		if(!force && state.list[key]){
			return { err: null, data: { list: state.list[key] } }
		}
		
		const result = await fetch({
			url: '/api/notes',
			data: {
				limit,
				start,
				bookId,
				catalogId: catalogId.indexOf('root') > -1 ? 'root' : catalogId
			}
		})
		const { err, data } = result
		if(!err) {
			dispatch({
				type: MUTATIONS.NOTE_LIST_SAVE,
				payload: { data: data.list, start, key }
			})
		}
		return result
	}
}


export function NOTE_DES_GET(arg = {}) {
	return async (dispatch, getState) => {
		const { id, force = false } = arg
		const rootState = getState()
		const state = rootState.notes
		if(!force && state.notesMap[id]){
			return { err: null, data: state.notesMap[id] }
		}
		const result = await fetch({
			url: `/api/note/${id}`,
		})
		const { err, data } = result
		if(!err) {
			dispatch({
				type: MUTATIONS.NOTE_MAP_SAVE,
				payload: { data, id }
			})
		}
		return result
	}
}

export function NOTE_GET_BY_ID(arg = {}) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		const { id, bookId, catalogId } = arg
		const key = `${bookId}_${catalogId}`
		const rootState = getState()
		const state = rootState.notes
		console.log('state', state)
		if(state.list[key]){
			resolve ({ err: null, data: { list: state.list[key] }})
		}
		const result = await fetch({
			url: `/api/notes/${id}`,
			data: {
				bookId,
				catalogId
			}
		})
		const { err, data } = result
		if(!err) {
			dispatch({
				type: MUTATIONS.NOTE_LIST_SAVE,
				payload: { data: data.list, start: 0, key }
			})
			if(data.extend && data.extend.user) {
				dispatch({
					type: MUTATIONS.CUR_USER_INFO_SAVE,
					payload: data.extend.user
				})
			}
			if(data.extend && data.extend.books) {
				dispatch({
					type: MUTATIONS.BOOK_LIST_SAVE,
					payload: {
						data: data.extend.books,
						start: 0
					}
				})
			}
		}
		resolve(result)
	})
}

export function NOTES_RECENTLY_GET(arg = {}) {
	return async (dispatch, getState) => {
		const { force = false } = arg
		const rootState = getState()
		const state = rootState.notes
		const key = rootState.books.curBook+'_'+constKey.recentlyNoteKey
		if(!force && state.list[key]){
			return { err: null, data: { list: state.list[key] } }
		}
		const result = await fetch({
			url: '/api/recently_notes',
			method: 'get',
			data: {
				bookId: rootState.books.curBook
			}
		})
		const { err, data } = result
		if(!err) {
			dispatch({
				type: MUTATIONS.NOTE_LIST_SAVE,
				payload: { data, key }
			})
		}
		return { err: null, data: { list: data } }
	}
}

export function NOTE_CUR_UPDATE(data) {
	return async dispatch => {
		dispatch({
			type: MUTATIONS.NOTE_CUR_UPDATE,
			payload: data
		})
	}
}

