import React from 'react'
import './assets/header.less'
class Header extends React.Component{
	constructor(props) {
		super(props)
	}
	openCom = (arg, e) => {
		console.log('e', e)
		this.props.openCom(arg)
		e.stopPropagation()
	}
	render() {
		return (
			<div className="header-layout  flex align-items-center layout-padding" ref={this.toggleContainer}>
				<div className="icon-layout">
					<i className="iconfont icon-shuji"></i>
				</div>
				<div className="icon-layout" onClick={this.openCom.bind(this, 'openCatalogs')}>
					<i className="iconfont icon-neirong" ></i>
				</div>
				<div className="icon-layout" onClick={this.openCom.bind(this, 'openBrief')}>
					<i className="iconfont icon-shujia1"></i>
				</div>
				<div className="logo">Black Hook Note</div>
			</div>
		)
	}
}

export default Header
