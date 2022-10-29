import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Page404 from './Page404';
import PropertyPage from './PropertyPage';
import AuctionPage from './AuctionPage';

class ToolsPage extends Component {

    render() {
        return (
            <Layout className="main">
                <Switch>
                    <Route exact path="/tools" component={PropertyPage} />
                    <Route path="/tools/property" component={PropertyPage} />
                    <Route path="/tools/auction" component={AuctionPage} />
                    <Route path="*" component={Page404} />
                </Switch>
            </Layout>
        );
    }
}

export default ToolsPage;
