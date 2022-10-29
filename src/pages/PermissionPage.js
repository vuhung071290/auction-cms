import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import PermissionMngPage from './PermissionMngPage';
import GrantPermissionPage from './GrantPermissionPage';
import Page404 from './Page404';

class PermissionPage extends Component {

    render() {
        return (<Layout className="main">
            <Switch>
                <Route exact path="/admin/permission" component={PermissionMngPage} />
                <Route path="/admin/permission/grant/:domainName" component={GrantPermissionPage} />
                <Route path="*" component={Page404} />
            </Switch>
        </Layout>);
    }
}

export default PermissionPage;
