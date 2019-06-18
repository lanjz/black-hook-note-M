import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom'
import '../assets/global.less';
import '../assets/app.less';
import '../assets/components.less';
import Note from '../page/note/Note'
import Header from '../components/Header'

function App() {
	return (
		<div className="app">
			<Header></Header>
			<div className="main-content">
				<BrowserRouter>
					<Switch>
						<Route path="/:bookId/:catalogId/:noteId"  component={Note}/>
						{/*<Route path="/" component={Home}/>*/}
					
					</Switch>
				</BrowserRouter>
			</div>
		</div>
		
	);
}

export default App;
