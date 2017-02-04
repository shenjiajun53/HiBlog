/**
 * Created by shenjiajun on 2017/1/31.
 */
import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

let iconMenu;
export default class MyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
        }
    }

    open() {
        console.log("on menu tap22 ");
        // iconMenu.open();
        this.setState({
            openMenu: true
        });
    }

    handleOnRequestChange(value) {
        this.setState({
            openMenu: value,
        });
    }

    componentDidMount() {
        iconMenu = this.refs.icon_menu;
    }

    onItemClick(value) {
        switch (value) {
            case "SignUp":
                window.location.pathname = '/SignUp';
                break;
            case "SignIn":
                window.location.pathname = '/SignIn';
                break;
            default:
                break;
        }
    }

    render() {
        if (this.props.hasLogin) {
            return (
                <IconMenu
                    ref="icon_menu"
                    open={this.state.openMenu}
                    onRequestChange={(value) => this.handleOnRequestChange(value)}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="我的主页"/>
                    <MenuItem primaryText="收藏"/>
                    <MenuItem primaryText="设置"/>
                    <MenuItem primaryText="退出"/>
                </IconMenu>
            );
        } else {
            return (
                <IconMenu
                    ref="icon_menu"
                    open={this.state.openMenu}
                    onRequestChange={(value) => this.handleOnRequestChange(value)}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="登录" onTouchTap={() => this.onItemClick("SignIn")}/>
                    <MenuItem primaryText="注册" onTouchTap={() => this.onItemClick("SignUp")}/>
                </IconMenu>
            );
        }

    }
}