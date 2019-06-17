import React from 'react'


class TestUI extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			thisMonth: '',
			lastMonth: ''
		};
	}
	componentDidMount() {
		this.props.NOTE_GET_BY_ID({
			id: '5cf4bba93babf46745ae4429'
		})
			.then(res => {
				console.log('res', res)
			})
	}
	render() {
		return (
			<div>1234</div>
		)
	}
}
export default TestUI
