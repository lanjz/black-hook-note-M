import React from 'react'
import NoteDes from './components/NoteDes'
import Header from "../../components/Header";
import NoteBriefUI from '../note/components/NoteBriefUI'
import CatalogsUI from '../note/components/CatalogsUI'

class NoteUI extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openBrief: false,
			openBook: false,
			openCatalogs: false,
		}
		this.toggleContainer = React.createRef();
	}
	
	componentDidMount() {
		window.addEventListener('click', this.onClickOutsideHandler);
		this.init()
	}
	
	componentWillUnmount() {
		window.removeEventListener('click', this.onClickOutsideHandler);
	}
	
	onClickOutsideHandler = (event) => {
		if((this.state.openBrief || this.state.openBook || this.state.openCatalogs)
			&& !this.toggleContainer.current.contains(event.target)) {
			this.setState({
				openBrief: false,
				openBook: false,
				openCatalogs: false,
				noData: false
			});
		}
	}
	closeCom = () => {
		this.setState({
			openBrief: false,
			openBook: false,
			openCatalogs: false,
		});
	}
	openCom = (arg) => {
		this.closeCom()
		this.setState({
			[arg]: true
		})
	}
	
	init() {
		const { bookId, catalogId, noteId } = this.props.match.params
		if(noteId === 'none') {
			this.setState(
				{
					noData: true
				}
			)
			return
		}
		this.props.BOOK_CUR_UPDATE(bookId)
		this.props.CATALOGS_CUR_SAVE(catalogId)
		this.props.NOTE_CUR_UPDATE(noteId)
		if(this.props.notes.list[`${bookId}_${catalogId}`]) {
			return
		}
		this.props.NOTE_GET_BY_ID({ id: noteId, bookId, catalogId })
	}
	
	gotoNoteFromNote = (item) => {
		const { bookId, catalogId, noteId } = this.props.match.params
		this.props.history.push(`/${bookId}/${catalogId}/${item._id}`)
		this.props.NOTE_CUR_UPDATE(item._id)
		this.closeCom()
	}
	gotoNoteFromCatalogs = async (item) => {
		const { notes, catalogs } = this.props
		const { bookId } = this.props.match.params
		if(catalogs.curCatalog === item._id) return
		this.props.history.push(`/${bookId}/${item._id}`)
	}
	
	render() {
		const curNote = this.props.notes.curNote ? this.props.notes.notesMap[this.props.notes.curNote] : ''
		return (
			<div ref={this.toggleContainer}>
				<Header openCom={this.openCom}></Header>
				{
					this.state.noData ?
						<div className="no-data flex direction-column justify-content-center align-items-center absolute-full">
							<i className="iconfont icon-wushuju"></i>
							<div>还没任何有笔记</div>
						</div> :
						<div className="main-content">
							<div className="layout-padding">
								{curNote && <NoteDes curNote={curNote}></NoteDes>}
							</div>
						</div>
				}
				<div>
					{this.state.openBrief &&
					<NoteBriefUI {...this.props} gotoNote={this.gotoNoteFromNote}></NoteBriefUI>}
				</div>
				<div>
					{this.state.openCatalogs &&
					<CatalogsUI {...this.props} gotoNote={this.gotoNoteFromCatalogs}></CatalogsUI>}
				</div>
			</div>
		
		)
	}
}

export default NoteUI
