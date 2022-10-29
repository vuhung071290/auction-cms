import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import UserControl from './UserControl';
import logo from '../resources/images/logo.png';
const { Header } = Layout;
const { SubMenu, Item } = Menu;

class MenuBar extends Component {

    render() {
        return (
            <Header className="header">
                <div className="nav-logo">
                    <Link to="/">
                    <img className="logo" src={logo} alt="" />
                    </Link>
                </div>
                <div className="nav-mid">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <SubMenu title={<span><Icon type="team" />Administration</span>}>
                        <Item key="/admin/activity"><Link to="/admin/activity"><Icon type="history" />Activity Management</Link></Item>
                        <Item key="/admin/account"><Link to="/admin/account"><Icon type="solution" />Account Management</Link></Item>
                        <Item key="/admin/permission"><Link to="/admin/permission"><Icon type="control" />Permission Management</Link></Item>
                        <Item key="/admin/change-log"><Link to="/admin/change-log"><Icon type="bulb" />Change Log</Link></Item>
                    </SubMenu>
                    <SubMenu title={<span><Icon type="team" />Users</span>}>
                        <Item key="/admin/users"><Link to="/admin/users"><Icon type="user" />User Management</Link></Item>
                    </SubMenu>
                    <SubMenu title={<span><Icon type="tool" />Tools</span>}>
                        <Item key="/tools/property"><Link to="/tools/property"><Icon type="gift" />Property Management</Link></Item>
                        <Item key="/tools/auction"><Link to="/tools/auction"><Icon type="gift" />Auction Management</Link></Item>
                    </SubMenu>
                </Menu>
                </div> 
                <div className="nav-right">
                    <UserControl />
                </div> 
            </Header>

        );
    }
}

export default MenuBar;
