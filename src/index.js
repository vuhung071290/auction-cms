import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import 'antd/dist/antd.css';
import './resources/style.css';
import * as serviceWorker from './serviceWorker';
import LoginPage from "./pages/LoginPage";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
window.store = store;

var ui = <BrowserRouter>
    <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/" component={Main} />
    </Switch>
</BrowserRouter>;

ReactDOM.render(<Provider store={store}>{ui}</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
