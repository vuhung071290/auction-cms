import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Icon, Layout, Card } from 'antd';
import { login } from '../actions/auth';
import { connect } from 'react-redux';
import { noti } from '../helpers/utils';
import { auth, setStorage, getAuthentication } from '../helpers/services';
import { getAvatarConfig } from '../helpers/config/currentAccountAvatarConfig';
import { loadConfig } from '../actions/config';

const { Item } = Form;

class LoginPage extends Component {

    state = {
        loginLoading: false
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { domainName, password } = values;
            if (!err) {
                this.setState({ loginLoading: true }, async () => {
                    try {
                        let res = await auth(domainName, password);
                        if (res.status === 200) {
                            this.props.login(res.data.data);
                            setStorage(res.data.data);
                        } else {
                            this.setState({ loginLoading: false });
                        }
                    } catch (err) {
                        console.log(err.response);
                        this.setState({ loginLoading: false });
                    }
                });

            }
        });
    }

    componentDidMount() {
        if (this.props.location.search === '?expired') {
            noti.error("Token is expired. Please login again");
        }

        if (this.props.location.search === '?configFailed') {
            noti.error("Can not get config from backend. Please check network connection");
        }

        this.props.loadConfig();

        const { auth } = this.props;
        if (auth == null) {
            const getAuth = getAuthentication();
            if (getAuth.status) {
                const { auth } = getAuth;
                this.props.login({ ...auth, ...getAvatarConfig() });
            } else {
                if (getAuth.notify) {
                    noti.error(getAuth.message);
                }
            }
        }
    }

    render() {
        const { auth, config } = this.props;
        if (auth != null && config != null) {
            return <Redirect to="/" />;
        }

        const { getFieldDecorator } = this.props.form;
        const { loginLoading } = this.state;
        return (
            <Layout style={{ height: "100vh", backgroundColor: "white", overflow: "auto" }}>
                <div style={{ width: 450, margin: "80px auto 0", textAlign: "center" }}>
                    <div style={{ color: 'rgba(24, 144, 255, 1)', fontSize: 32, fontWeight: "600" }}>Đấu Giá CMS</div>
                </div>
                <Card style={{ width: 350, margin: "50px auto 0" }} hoverable>
                    <Form className="login-form">
                        <Item label="Domain name">{getFieldDecorator('domainName', {
                            rules: [{ required: true, message: 'Please input your domain name!' }],
                        })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder={config != null && config.isAuthDebug ? "For sandbox env, type admin" : "Domain Name"}
                        />)}</Item>
                        <Item label="Password">{getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder={config != null && config.isAuthDebug ? "For sandbox env, type any word to login" : "PIN + OTP"}
                        />)}</Item>
                        <Item>
                            <Button type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ width: "100%" }}
                                loading={loginLoading}
                                onClick={this.handleLogin}>Log in</Button>
                        </Item>
                    </Form>
                </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginPage));