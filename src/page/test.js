import React from 'react'
import { connect } from 'react-redux';
import { NOTE_GET_BY_ID } from '../store/reducers/notes'
import TestUI from './TestUI'

const mapStateToProps = state => ({
	PHPRank: state.notes,
})

const mapDispatchToProps = dispatch => ({
	NOTE_GET_BY_ID(arg) {
		return dispatch(NOTE_GET_BY_ID(arg))
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(TestUI)
