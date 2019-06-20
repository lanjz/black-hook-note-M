import fetch from '../../utils/fetch/fetch.js'
import constKey from '../../utils/const.js'
import * as MUTATIONS from "../const/mutaions";
const defaultState = {
	list: {
		root: {
			_id: 'root',
			parentId: '',
			bookId: 'default'
		}
	},
	curCatalog: constKey.recentlyArticlesKey,
	isOpen: []
}

export default (state = defaultState,  { type, payload }) => {
	if(type === MUTATIONS.CATALOGS_SAVE) {
		console.log('payload', payload)
		const { curNode, data, bookId } = payload
		const key = curNode.parentId === 'root' ? bookId+'_root' : curNode.parentId
		const list = {
			...{ [key]: {
					...state.list[curNode.parentId],
					updateTime: (new Date()).getTime(),
					childNodes: data
				} }
		}
		data.forEach((item) => {
			list[item._id] = {
				...item
			}
		})
		return {
			...state,
			list: {
				...state.list,
				...list
			}
		}
	}
	if(type === MUTATIONS.CATALOGS_CUR_SAVE) {
		const id = payload
		return {
			...state,
			curCatalog: id
		}
	}
	if(type === MUTATIONS.CATALOGS_TEMPLATE_CREATE) {
		const id = payload
		const newDir = {
			name: '新建文件夹',
			isNew: true,
			parentId: id
		}
		// 将临时目录插入到目标文件夹最前面，并更新state
		const getCatalog = state.list[id] ? state.list[id] : []
		const addCatalog = [ newDir, ...getCatalog ]
		return {
			...state,
			list: {
				...state.list,
				...{ [id]: addCatalog }
			}
		}
	}
	if(type === MUTATIONS.CATALOGS_OPEN_TOGGLE) {
		const  { id, force } = payload
		let isOpen = [ ...state.isOpen ]
		const findInd = isOpen.indexOf(id)
		if(findInd < 0) {
			isOpen = [ ...isOpen, id]
		} else if(!force && findInd > -1 ){
			isOpen.splice(findInd, 1)
		}
		return {
			...state,
			isOpen
		}
	}
	if(type === MUTATIONS.CATALOGS_OPEN_RESET) {
		return {
			...state,
			isOpen: []
		}
	}
	return state
}

export function CATALOGS_GET( params = {}) {
	return async (dispatch, getState) => {
		const rootState = getState()
		const state = rootState.catalogs
		params.parentId = params.parentId || rootState.books.curBook+'_root'
		params.bookId = params.bookId || rootState.books.curBook
		let { force = false, parentId, bookId} = params
		if(!force && state.list[params.parentId] && state.list[params.parentId].childNodes) {
			return {
				err: null,
				data: state.list[params.parentId]
			}
		}
		const result = await fetch({
			url: '/api/catalogs',
			data: {
				parentId: parentId.indexOf('root') > 0 ?  'root' : parentId,
				bookId
			}
		})
		const { err, data } = result
		if(!err) {
			dispatch({
				type: MUTATIONS.CATALOGS_SAVE,
				payload: { curNode: params, data: data, bookId: rootState.books.curBook }
			})
			data.forEach(item => {
				if(item.hasChild) {
					CATALOGS_GET(
						{
							parentId: item._id,
							bookId: item.bookId,
							force
						}
					)
				}
			})
		}
		return result
	}
}

export function CATALOGS_CUR_SAVE(data) {
	return async dispatch => {
		dispatch({
			type: MUTATIONS.CATALOGS_CUR_SAVE,
			payload: data
		})
	}

}

