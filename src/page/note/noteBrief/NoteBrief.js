import React from 'react'
import { connect } from 'react-redux'
import NoteUI from './NoteBriefUI'

const mapStateToProps = state => ({
	notes: {
		...state.notes
	}
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteUI)
