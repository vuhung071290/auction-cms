import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import UserRegisterAuction from './UserRegisterAuction';
import { loadConfig } from '../actions/config';
import { getAuthentication } from '../helpers/services';
import { login } from '../actions/auth';
import { getAvatarConfig } from '../helpers/config/currentAccountAvatarConfig';
import Page404 from './Page404';
import ToolsPage from './ToolsPage';
import AuctionHistorical from './AuctionHistorical';

class Main extends Component {

    render() {
        const { auth, config } = this.props;
        if (config == null) {
            this.props.loadConfig();
        }

        if (auth == null) {
            const getAuth = getAuthentication();
            if (getAuth.status) {
                const { auth } = getAuth;
                this.props.login({ ...auth, ...getAvatarConfig() });
            } else {
                return <Redirect to="/login" />;
            }
        }

        return (<Layout>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/tools" component={ToolsPage} />
                <Route path="/:auctionId/user-register-auction" component={UserRegisterAuction} />
                <Route path="/:auctionId/auction-historical" component={AuctionHistorical} />
                <Route path="*" component={Page404} />
            </Switch>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    config: state.config
});

const mapDispatchToProps = (dispatch) => ({
    login: (authObj) => dispatch(login(authObj)),
    loadConfig: () => dispatch(loadConfig())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
