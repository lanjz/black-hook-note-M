import React from 'react'
import { getQuery } from '../../utils/blackHook'


class LoginUI extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			errMsg: '',
		}
	}
	
	componentDidMount() {
		console.log('this.pros', this.props)
	}
	
	componentWillUnmount() {
	}
	
	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	todoLogin = () => {
		if(!this.state.username || !this.state.password) {
			return
		}
		this.props.login({
			username: this.state.username,
			password: this.state.password
		})
			.then(res => {
				if(res.err) {
					alert(res.err.message)
				} else {
					if(getQuery('back')) {
						window.history.back()
					} else {
						window.location = ''
					}
				}
			})
	}
	
	render() {
		return (
			<div className="login-bg">
				<div className="avatar-layout flex-all-center">
					<img src="http://s2.sinaimg.cn/mw690/006VYTdfzy7pano0kENd1&690" />
				</div>
				<div className="flex flex-1 form-bg bg-fff login-layout">
					<div className="form-layout">
						<div className="form-group flex">
							<div className="form-label-layout">
								用户名：
							</div>
							<div className="padding-input flex flex-1 align-items-center">
								<input className="form-input" type="text" value={this.state.username} name="username"
									   onChange={this.handleInputChange}/>
							</div>
						</div>
						<div className="form-group flex">
							<div className="form-label-layout">
								密码：
							</div>
							<div className="padding-input flex flex-1 align-items-center">
								<input className="form-input" type="text" value={this.state.password} name="password"
									   onChange={this.handleInputChange}/>
							</div>
						</div>
						<div className="form-group login-btn-layout">
							<div className={(!this.state.username || !this.state.password) ? "login-btn disable" : "login-btn"} onClick={this.todoLogin}>登录</div>
						</div>
					</div>
				</div>
			</div>
		
		)
	}
}

export default LoginUI
