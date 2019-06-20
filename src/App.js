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
import Catalog from "./page/catalog/Catalog";
import Login from "./page/login/Login";


function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Switch>
					<Route path="/:bookId/:catalogId/:noteId" component={Note}/>
					<Route path="/:bookId/:catalogId" component={Catalog}/>
					<Route path="/login" component={Login}/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
