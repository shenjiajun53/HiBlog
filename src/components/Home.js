/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TopBar from "./TopBar";

// injectTapEventPlugin();
class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <RaisedButton label="Default"/>
            </div>
        );
    }
}
export default Home;