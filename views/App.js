import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import './css/App.css';
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserCenter from "./components/UserCenter";
import MyFollow from "./components/MyFollow";
import WriteBlog from "./components/WriteBlog";
import TopBar from "./components/TopBar";
import BlogDetail from "./components/BlogDetail";
import Settings from "./components/Settings";
import Favorites from "./components/Favorites";
import MyBlogs from "./components/MyBlogs";

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
            user: null
        }
    }

    componentWillMount() {
        let url = "/api/getUserInfo";
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
                        hasLogin: json.result.hasLogin,
                        user: json.result.user
                    });
                }
                // console.log("state=" + this.state.hasLogin);
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        console.log('app render');
        // console.log('chileren=' + this.props.children.name);
        return (
            <MuiThemeProvider>
                <div>

                    <TopBar hasLogin={this.state.hasLogin} user={this.state.user}/>
                    {React.cloneElement(this.props.children, {user: this.state.user})}
                </div>
            </MuiThemeProvider>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="SignUp" component={SignUp}/>
            <Route path="SignIn" component={SignIn}/>
            <Route path="UserCenter" component={UserCenter}/>
            <Route path="MyFollow" component={MyFollow}/>
            <Route path="WriteBlog" component={WriteBlog}/>
            <Route path="BlogDetail/:blogId" component={BlogDetail}/>
            <Route path="Settings" component={Settings}/>
            <Route path="Favorites" component={Favorites}/>
            <Route path="MyBlogs" component={MyBlogs}/>
        </Route>
    </Router>
    ,
    document.getElementById('root')
)
;

export default App;
