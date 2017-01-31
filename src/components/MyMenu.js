/**
 * Created by shenjiajun on 2017/1/31.
 */
import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

let iconMenu;
export default class MyMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false
        }
    }

    open() {
        console.log("on menu tap22 ");
        // iconMenu.open();
        this.setState({
            openMenu: true
        });
    }

    handleOnRequestChange(value){
        this.setState({
            openMenu: value,
        });
    }

    componentDidMount() {
        iconMenu = this.refs.icon_menu;
    }

    render() {
        return (
            <div>
                <IconMenu
                    ref="icon_menu"
                    open={this.state.openMenu}
                    onRequestChange={(value)=>this.handleOnRequestChange(value)}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Refresh"/>
                    <MenuItem primaryText="Send feedback"/>
                    <MenuItem primaryText="Settings"/>
                    <MenuItem primaryText="Help"/>
                    <MenuItem primaryText="Sign out"/>
                </IconMenu>
            </div>
        );
    }
}