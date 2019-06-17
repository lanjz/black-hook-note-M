import { createStore, compose, applyMiddleware } from 'redux'
import thunkmiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/index'

const devTools = require('remote-redux-devtools').default

let store
if (process.env.NODE_ENV === 'development') {
	store = createStore(
		reducer,
		
		compose(
			applyMiddleware(thunkmiddleware),
			composeWithDevTools(),
		/*	devTools({
				hostname: 'localhost',
				port: 5678,
				secure: false
			})*/
		)
	)
} else {
	store = createStore(reducer, applyMiddleware(thunkmiddleware))
}

export default store
