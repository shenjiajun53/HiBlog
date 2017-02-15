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
import MyFollow from "./components/MyFollow";
import WriteBlog from "./components/WriteBlog";
import TopBar from "./components/TopBar";

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false
        }
    }

    componentWillMount() {
        let url = "/api/checkLogin";
        fetch(url, {
            method: "post",
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                console.log(JSON.stringify(json));
                if (json.result) {
                    this.setState({
                        hasLogin: json.result.hasLogin
                    });
                }
                console.log("state=" + this.state.hasLogin);
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <TopBar hasLogin={this.state.hasLogin}/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="BlogDetail/:blogId" component={BlogDetail}/>
            <Route path="SignUp" component={SignUp}/>
            <Route path="SignIn" component={SignIn}/>
            <Route path="UserCenter" component={UserCenter}/>
            <Route path="MyFollow" component={MyFollow}/>
            <Route path="WriteBlog" component={WriteBlog}/>
        </Route>
    </Router>
    ,
    document.getElementById('root')
)
;

export default App;
