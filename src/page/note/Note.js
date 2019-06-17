import React from 'react'
import { connect } from 'react-redux'
import NoteUI from './NoteUI'
import {
	NOTES_GET,
	NOTE_DES_GET,
	NOTE_GET_BY_ID,
	NOTES_RECENTLY_GET,
	NOTE_CUR_UPDATE
} from '../../store/reducers/notes'
import { CATALOGS_CUR_SAVE } from '../../store/reducers/catalogs'
import { BOOK_CUR_UPDATE } from '../../store/reducers/books'

const mapStateToProps = state => ({
	notes: {
		...state.notes
	}
})
const mapDispatchToProps = dispatch => ({
	NOTES_GET(arg) {
		return dispatch(NOTES_GET(arg))
	},
	NOTE_DES_GET(arg) {
		return dispatch(NOTE_DES_GET(arg))
	},
	NOTE_GET_BY_ID(arg) {
		return dispatch(NOTE_GET_BY_ID(arg))
	},
	NOTES_RECENTLY_GET(arg) {
		return dispatch(NOTES_RECENTLY_GET(arg))
	},
	NOTE_CUR_UPDATE(arg) {
		return dispatch(NOTE_CUR_UPDATE(arg))
	},
	CATALOGS_CUR_SAVE(arg) {
		return dispatch(CATALOGS_CUR_SAVE(arg))
	},
	BOOK_CUR_UPDATE(arg) {
		return dispatch(BOOK_CUR_UPDATE(arg))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteUI)
