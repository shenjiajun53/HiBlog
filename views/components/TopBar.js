/**
 * Created by shenjiajun on 2017/1/31.
 */
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Card from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import MyMenu from "./MyMenu";

const ON_TITLE_CLICKED = 111;
const ON_CARE_CLICKED = 112;
const ON_MINE_CLICKED = 113;
let myMenu;
class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        myMenu = this.refs.my_menu;
    }

    handleOpenMenu() {
        console.log("on menu tap");
        myMenu.open();
    }

    onTitleClick(value) {
        switch (value) {
            case ON_TITLE_CLICKED:
                console.log("hostname=" + window.location.hostname +
                    " hash=" + window.location.hash +
                    " href=" + window.location.href +
                    " host=" + window.location.host +
                    " pathname=" + window.location.pathname);
                location.pathname = '/';
                break;
            case ON_CARE_CLICKED:
                location.pathname = '/MyFollow';
                break;
            case ON_MINE_CLICKED:
                location.pathname = '/UserCenter';
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Card >
                <div style={{
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
                    <FlatButton
                        style={{color: "#ffffff", marginRight: "10px"}}
                        onTouchTap={() => this.onTitleClick(ON_TITLE_CLICKED)}>
                        HiBlog
                    </FlatButton>
                    <FlatButton
                        style={{color: "#ffffff", marginRight: "10px"}}
                        onTouchTap={() => this.onTitleClick(ON_CARE_CLICKED)}>
                        关注
                    </FlatButton>
                    <FlatButton
                        style={{color: "#ffffff", marginRight: "10px"}}
                        onTouchTap={() => this.onTitleClick(ON_MINE_CLICKED)}>
                        我的
                    </FlatButton>
                    <div style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "right",
                    }}>
                        <span style={{flex: 1}}/>
                        <MyMenu style={{}} ref="my_menu"/>
                    </div>
                </div>
            </Card>
        );
    }
}
export default TopBar;