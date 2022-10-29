import React, { Component } from 'react';
import { Button, Popover, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import * as $ from '../helpers/services';

class UserControl extends Component {

    handleLogout =(e) => {
        this.props.history.push("/login");
        this.props.logout();
        $.clearStorage();
    }

    render() {
        const { domainName, displayName, color, backgroundColor, bannerColor } = this.props.auth;

        const menu = (<div className='user-menu'>
            <div className='user-menu-background' style={{ background: bannerColor}}>
                <Avatar className='user-menu-avatar' size={64} style={{ color, backgroundColor }}>{domainName.substr(0,1).toUpperCase()}</Avatar>
            </div>
            <div className='user-menu-info'>
                <div className='domain'>@{domainName}</div>
                <div className='username'>{displayName}</div>
            </div>
            <div className='user-menu-buttons'>
                <Button icon='logout' type='primary' className='red-button' shape="round" onClick={this.handleLogout}>Log out</Button>
            </div>
        </div>);

        return (<Popover className='user-menu-popover' placement='bottom' content={menu} trigger='click'>
                <Button className="red-button" icon='user' shape="round" type="primary">{domainName}</Button>
            </Popover>);
    }
}

const mapStateToProps = (state) => ({ 
    auth: state.auth 
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserControl));
