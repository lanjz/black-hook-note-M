import React from 'react'
import { timestampToBriefTime } from '../../../utils/blackHook'
class NoteBriefUI extends React.Component{
	constructor(props) {
		super(props)
	}
	componentDidMount() {
	}
	getBookName = (id, bookList) => {
		return bookList[id] ? bookList[id].name : ''
	}
	gotoNote = (item) => {
		this.props.gotoNote(item)
	}
	render() {
		const { books, catalogs } = this.props
		const list = this.props.notes.list[`${books.curBook}_${catalogs.curCatalog}`]
		const curNote = this.props.notes.curNote
		return (
			<div className="layout-padding note-brief-layout">
				<div className="note-layout-input-box align-items-center">
					<input type="text" className="note-layout-input"/>
					<i className="iconfont icon-sousuo"></i>
				</div>
				<div className="flex-1 relative">
					<div className="absolute-full article-item-box" id="article-item-box">
						{books&&list&&list.map((item, index) => (
							<div className={ item._id === curNote ? "note-item act" : "note-item"} key={index} onClick={this.gotoNote.bind(this, item)}>
								<div className="note-item-title">{item.title}</div>
								<div className="note-label">
									<span className="note-label-item">{this.getBookName(item.bookId, books.list)}</span>
								</div>
								<div className="note-item-mark">{timestampToBriefTime(item.createTime)}~{timestampToBriefTime(item.updateTime)}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default NoteBriefUI
