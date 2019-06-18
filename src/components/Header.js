import React, { Fragment } from 'react'
import './assets/header.less'
import NoteBriefUI from '../page/note/components/NoteBriefUI'
class Header extends React.Component{
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Fragment>
				<div className="header-layout  flex align-items-center layout-padding">
					<div className="icon-layout">
						<i className="iconfont icon-shuji"></i>
					</div>
					<div className="icon-layout">
						<i className="iconfont icon-neirong"></i>
					</div>
					<div className="icon-layout">
						<i className="iconfont icon-shujia1"></i>
					</div>
					<div className="logo">Black Hook Note</div>
				</div>
				<NoteBriefUI></NoteBriefUI>
			</Fragment>
		)
	}
}

export default Header
