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
                window.location.hash = '';
                break;
            case ON_CARE_CLICKED:
                window.location.hash = '/';
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
                        onMouseEnter={this.handleOpenMenu}>
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