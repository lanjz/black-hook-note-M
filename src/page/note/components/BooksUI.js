import React from 'react'

class BooksUI extends React.Component{
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.BOOK_LIST_GET()
	}
	chooseBook = (item) => {
		this.props.gotoNote(item)
	}
	render() {
		const { books } = this.props
		const list = Object.values(books.list)
		return (
			<div className="layout-padding note-brief-layout">
				{list&&list.length&&list.map((item, index) => (
					<div className="catalogs-layout" key={index}>
						<div
							className={books.curBook === item['_id'] ?
								"flex align-items-center catalogs-item-layout act" : 'flex align-items-center catalogs-item-layout'}
							onClick={this.chooseBook.bind(this, item)}
						>
							<i className="iconfont icon-shuji"></i>
							<div className="catalogs-name line-ellipsis">{item.name}</div>
						</div>
					</div>
				))}
			</div>
		)
	}
}

export default BooksUI
