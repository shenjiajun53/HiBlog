/**
 * Created by shenjiajun on 2017/1/31.
 */
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Card, FlatButton} from "material-ui";
import MyMenu from "./MyMenu";

let myMenu;
class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        myMenu = this.refs.my_menu;
    }

    handleOpenMenu(){
        console.log("on menu tap");
        myMenu.open();
    }


    render() {
        return (
            <Card style={{
                display: "flex",
                flex: 1,
                height: "48px",
                backgroundColor: "#E91E63",
                justifyContent: "left",
                alignItems: "center",
                flexDirection: "row",
                paddingLeft: "1em",
                paddingRight: "1em",
            }}>
                <FlatButton style={{color: "#ffffff", marginRight: "10px"}}>发现</FlatButton>
                <FlatButton style={{color: "#ffffff", marginRight: "10px"}}>关注</FlatButton>
                <FlatButton style={{color: "#ffffff", marginRight: "10px"}}
                            onTouchTap={this.handleOpenMenu}>我的</FlatButton>
                <MyMenu style={{}} ref="my_menu"/>

            </Card>
        );
    }
}
export default TopBar;