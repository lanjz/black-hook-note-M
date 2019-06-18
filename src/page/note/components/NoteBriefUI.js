import React from 'react'
import { connect } from 'react-redux'
import { timestampToBriefTime } from '../../../utils/blackHook'
const mapStateToProps = state => ({
	notes: {
		...state.notes
	},
	catalogs: {
		...state.catalogs
	},
	books: {
		...state.books
	}
})
const mapDispatchToProps = dispatch => ({
})

class NoteUI extends React.Component{
	constructor(props) {
		super(props)
	}
	componentDidMount() {
	}
	getBookName = (id, bookList) => {
		return bookList[id] ? bookList[id].name : ''
	}
	render() {
		const { books, catalogs } = this.props
		const list = this.props.notes.list[`${books.curBook}_${catalogs.curCatalog}`]
		const curNote = this.props.notes.curNode
		return (
			<div className="layout-padding note-brief-layout">
				{books&&list&&list.map((item, index) => (
					<div className={ item._id === curNote ? "note-item act" : "note-item"} key={index}>
						<div className="note-item-title">{item.title}</div>
						<div className="note-label">
							<span className="note-label-item">{this.getBookName(item.bookId, books.list)}</span>
						</div>
						<div className="note-item-mark">{timestampToBriefTime(item.createTime)}~{timestampToBriefTime(item.updateTime)}</div>
					</div>
				))}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteUI)
