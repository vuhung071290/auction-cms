import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import ActivityPage from './ActivityPage';
import AccountPage from './AccountPage';
import PermissionPage from './PermissionPage';
import ChangeLogPage from './ChangeLogPage';
import UserPage from './UserPage';
import Page404 from './Page404';

class AdminPage extends Component {

    render() {
        return (<Layout className="main">
            <Switch>
                <Route exact path="/admin/" component={ActivityPage} />
                <Route path="/admin/activity" component={ActivityPage} />
                <Route path="/admin/account" component={AccountPage} />
                <Route path="/admin/permission" component={PermissionPage} />
                <Route path="/admin/change-log" component={ChangeLogPage} />
                <Route path="/admin/users" component={UserPage} />
                <Route path="*" component={Page404} />
            </Switch>
        </Layout>);
    }
}

export default AdminPage;
