import React, { Fragment } from 'react'
import './assets/header.less'
import NoteBriefUI from '../page/note/components/NoteBriefUI'
class Header extends React.Component{
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
		console.log('this.props', this.props)
		window.addEventListener('click', this.onClickOutsideHandler);
	}
	componentWillUnmount() {
		window.removeEventListener('click', this.onClickOutsideHandler);
	}
	onClickOutsideHandler= (event) => {
		if ((this.state.openBrief || this.state.openBook || this.state.openCatalogs)
			&& !this.toggleContainer.current.contains(event.target)) {
			this.setState({
				openBrief: false,
				openBook: false,
				openCatalogs: false,
			});
		}
	}
	openCom = (arg) => {
		this.setState({
			openBrief: false,
			openBook: false,
			openCatalogs: false,
		});
		this.setState({
			[arg]: true
		})
	}
	render() {
		return (
			<div ref={this.toggleContainer}>
				<div className="header-layout  flex align-items-center layout-padding" ref={this.toggleContainer}>
					<div className="icon-layout">
						<i className="iconfont icon-shuji"></i>
					</div>
					<div className="icon-layout">
						<i className="iconfont icon-neirong"></i>
					</div>
					<div className="icon-layout" onClick={this.openCom.bind(this, 'openBrief')}>
						<i className="iconfont icon-shujia1"></i>
					</div>
					<div className="logo">Black Hook Note</div>
				</div>
				<div>
					{this.state.openBrief&&<NoteBriefUI></NoteBriefUI>}
				</div>
				
			</div>
		)
	}
}

export default Header
