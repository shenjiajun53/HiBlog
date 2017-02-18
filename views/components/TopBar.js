/**
 * Created by shenjiajun on 2017/1/31.
 */
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Card from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import MyMenu from "./MyMenu";

const ON_TITLE_CLICKED = 111;
const ON_CARE_CLICKED = 112;
const ON_MINE_CLICKED = 113;
const ON_WRITE_CLICKED = 114;
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
            case ON_WRITE_CLICKED:
                if (this.props.hasLogin) {
                    location.pathname = '/WriteBlog';
                } else {
                    location.pathname = '/SignUp';
                }
                break;
            default:
                break;
        }
    }

    render() {
        console.log('topbar render');

        let avatarPath;
        let showAvatar = "none";
        if (this.props.user) {
            if (this.props.user.fileName) {
                avatarPath = "/uploadFiles/avatars/" + this.props.user.fileName;
                showAvatar = "inline";
                // console.log("avatarPath=" + avatarPath);
            }
        }

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


                    <div style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "right",
                    }}>
                    </div>
                    <FlatButton
                        style={{color: "#ffffff", marginRight: "10px"}}
                        onTouchTap={() => this.onTitleClick(ON_WRITE_CLICKED)}>
                        写文章
                    </FlatButton>
                    <Avatar src={avatarPath}
                            style={{
                                display: showAvatar
                            }}/>
                    <MyMenu
                        user={this.props.user}
                        hasLogin={this.props.hasLogin}
                        style={{}}
                        ref="my_menu"/>
                </div>
            </Card>
        );
    }
}
export default TopBar;