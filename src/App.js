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
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>App</h1>
                    <ul>
                        <li><Link to="/UserCenter">UserCenter</Link></li>
                        <li><Link to="/SignUp">SignUp</Link></li>
                    </ul>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="BlogDetail/:blogId" component={BlogDetail}/>
            <Route path="SignUp" component={SignUp}/>
            <Route path="SignIn" component={SignIn}/>
            <Route path="UserCenter" component={UserCenter}/>
        </Route>
    </Router>
    ,
    document.getElementById('root')
)
;

export default App;
