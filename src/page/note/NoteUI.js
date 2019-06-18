import React from 'react'
import NoteDes from './components/NoteDes'

class NoteUI extends React.Component{
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.init()
	}
	init() {
		console.log('this.props33', this.props)
		const { bookId, catalogId, noteId } = this.props.match.params
		this.props.BOOK_CUR_UPDATE(bookId)
		this.props.CATALOGS_CUR_SAVE(catalogId)
		this.props.NOTE_CUR_UPDATE(noteId)
		if(this.props.notes.list[`${bookId}_${catalogId}`]) {
			return
		}
		this.props.NOTE_GET_BY_ID({id: noteId, bookId, catalogId})
	}
	render() {
		const curNote = this.props.notes.curNote ? this.props.notes.notesMap[this.props.notes.curNote] : ''
		return (
			<div className="layout-padding">
				{curNote && <NoteDes curNote={curNote}></NoteDes>}
			</div>
		)
	}
}

export default NoteUI
