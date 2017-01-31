import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import logo from './logo.svg';
import './css/App.css';
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

import Home from "./components/Home";
import BlogDetail from "./components/BlogDetail";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserCenter from "./components/UserCenter";
import WriteBlog from "./components/WriteBlog";

class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/blog-detail">BlogDetail</Link></li>
                </ul>
                {this.props.children}
                <Home/>
            </div>
        );
    }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}>
        </Route>
        <Route path="/blog-detail" component={BlogDetail}/>
        <Route path="/user-center" component={UserCenter}/>
    </Router>
    , document.getElementById('root')
);

export default App;
