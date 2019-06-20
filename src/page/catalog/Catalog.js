import { connectMid } from '../note/Note'
import React from "react";
import constKey from "../../utils/const";

class CatalogPageUI extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			showPage: false,
		};
	}
	async componentDidMount() {
		const { bookId, catalogId } = this.props.match.params
		this.props.CATALOGS_CUR_SAVE(catalogId)
		const getCatalogId = catalogId.indexOf('root') > -1 ? 'root' : catalogId
		const getData = catalogId === constKey.recentlyNoteKey ? this.props.NOTES_RECENTLY_GET : this.props.NOTES_GET
		const getNotes = this.props.notes[`${bookId}_${getCatalogId}`] || await getData()
		const { err, data } = getNotes
		if(!err) {
			if(data.list && data.list.length) {
				const noteId = data.list[0]._id
				this.props.history.push(`/${bookId}/${catalogId}/${noteId}`)
			} else {
				this.props.history.push(`/${bookId}/${catalogId}/none`)
			}
		} else{
			this.setState({
				showPage: true
			})
		}
	}
	render() {
		return (
			<div>{this.state.showPage &&'发生了未知错误'}</div>
		)
	}
}

export default connectMid(CatalogPageUI)
