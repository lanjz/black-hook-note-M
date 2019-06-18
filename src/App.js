import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom'
import './assets/global.less';
import './assets/app.less';
import './assets/components.less';
import Note from "./page/note/Note";
import Header from './components/Header'


class Index extends React.Component{
	constructor(props) {
		super(props)
	}
	componentDidMount() {
	}
	render() {
		return (
			<div>
				<Header {...this.props}></Header>
				<div className="main-content">
					<Switch>
						<Route path="/:bookId/:catalogId/:noteId" component={Note}/>
					</Switch>
				</div>
			</div>
		);
	}
}

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Index}/>
				</Switch>
			</BrowserRouter>
		</div>
	
	);
}

export default App;
