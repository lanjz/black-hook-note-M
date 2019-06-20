import React from 'react'
import { connect } from 'react-redux'
import LoginUI from './LoginUI'

import {
	login
} from '../../store/reducers/user'
const mapStateToProps = state => ({
	user: {
		...state.user
	}
})

const mapDispatchToProps = dispatch => ({
	login(arg) {
		return dispatch(login(arg))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUI)
