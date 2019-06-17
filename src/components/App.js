import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom'
// import './App.css';
/*import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'*/
import Note from '../page/note/Note'
import Test from '../page/test'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				{/*<Route path="/" component={Home}/>*/}
				<Route path="/:bookId/:catalogId/:noteId"  component={Note}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
