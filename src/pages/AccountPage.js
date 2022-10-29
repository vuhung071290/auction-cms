import React, { Component } from 'react';
import { Layout, Tag, Button, Table, Input } from 'antd';
import { connect } from 'react-redux';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import {
    loadAccountList,
    changeAccountPage,
    changeAccountSearch,
    changeAccountSize
} from '../actions/account';
import NewAccount from '../components/admin/account/NewAccount';
import EditAccount from '../components/admin/account/EditAccount';
import {
    createNewAccount,
    editAccount,
    deleteAccount
} from '../helpers/services';
import { noti } from '../helpers/utils';
import DeleteAccount from '../components/admin/account/DeleteAccount';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AccessDenied from '../components/extras/AccessDenied';

const { Search } = Input;

class AccountPage extends Component {

    state = {
        newAccountModalVisible: false,
        newAccountLoading: false,
        editAccountData: {},
        editAccountModalVisible: false,
        editAccountLoading: false
    }

    columns = [
        {
            title: 'Domain Name',
            dataIndex: 'domainName',
            key: 'domainName',
        },
        {
            title: 'Display Name',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            key: 'isActive',
            dataIndex: 'isActive',
            render: (text, row) => {
                return (
                    <span>
                        <Tag color={row.isActive ? "blue" : "red"} key={text}>
                            {row.isActive ? "ACTIVE" : "INACTIVE"}
                        </Tag>
                    </span>
                )
            },
        }, {
            title: 'IP Login',
            dataIndex: 'ipLogin',
            key: 'ipLogin',
        }, {
            title: 'Last Login',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            render: (text, row) => <span>{moment(row.lastLogin).format("DD/MM/YYYY HH:mm:ss")}</span>
        }, {
            title: 'Updated Date',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
            render: (text, row) => <span>{moment(row.updatedDate).format("DD/MM/YYYY HH:mm:ss")}</span>
        }, {
            title: 'Action',
            key: 'action',
            width: 270,
            render: (text, record) => (
                <div>
                    <Button className="mr5"
                        icon="edit"
                        disabled={!this.hasPermissionEdit()}
                        onClick={() => { this.handleOpenEditAccount(record); }} />
                    <DeleteAccount data={record}
                        disabled={!this.hasPermissionDelete()}
                        onOk={() => { this.handleDeleteAccount(record.domainName); }} />
                    <Link to={`/admin/permission/grant/${record.domainName}`}><Button icon="usergroup-add" type="primary">Grant Permission</Button></Link>
                </div>
            ),
        },
    ];

    handleOpenNewAccount = (e) => {
        this.setState({
            newAccountModalVisible: true
        });
    }

    handleCloseNewAccount = (e) => {
        this.setState({
            newAccountModalVisible: false
        });
    }

    handleOpenEditAccount = (data) => {
        this.setState({
            editAccountModalVisible: true,
            editAccountData: data
        });
    }

    handleCloseEditAccount = () => {
        this.setState({
            editAccountLoading: false,
            editAccountModalVisible: false,
            editAccountData: {}
        });
    }

    handleCreateNewAccount = (domainName, displayName, email) => {
        this.setState({
            newAccountLoading: true
        }, async () => {
            try {
                let res = await createNewAccount(domainName, displayName, email);
                noti.success(res.data.message);
                this.setState({ newAccountLoading: false, newAccountModalVisible: false });
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ newAccountLoading: false });
            }
        });

    }

    handleEditAccount = (domain, displayName, email, isActive) => {
        this.setState({
            editAccountLoading: true
        }, async () => {
            try {
                let res = await editAccount(domain, displayName, email, isActive);
                noti.success(res.data.message);
                this.handleCloseEditAccount();
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.message, `Can't update @${domain}`);
                this.setState({ editAccountLoading: false });
            }
        });

    }

    handleSearch = (e) => {
        const { field, size } = this.props.account;
        this.props.changeAccountSearch(e);
        this.props.loadAccountList(1, size, e, field);
    }

    handleDeleteAccount = async (domainName) => {
        try {
            let res = await deleteAccount(domainName);
            noti.success(res.data.message);
            this.componentDidMount();
        } catch (err) {
            console.log(err.response);
            noti.error(err.response.data.message, `Can't delete @${domainName}`);
        }
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        const { search, field } = this.props.account;
        this.props.changeAccountPage(current);
        this.props.changeAccountSize(pageSize);
        this.props.loadAccountList(current, pageSize, search, field);
    }

    hasPermissionView = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("ACCOUNT_MNG_VIEW")
    }

    hasPermissionAdd = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("ACCOUNT_MNG_ADD")
    }

    hasPermissionEdit = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("ACCOUNT_MNG_EDIT")
    }

    hasPermissionDelete = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("ACCOUNT_MNG_DELETE")
    }

    componentDidMount() {
        const { page, size } = this.props.account;
        if (this.hasPermissionView()) {
            this.props.loadAccountList(page, size);
        }
    }

    render() {
        const { list, total, page, size, loading } = this.props.account;

        if (!this.hasPermissionView()) {
            return <Layout className="main">
                <MenuBar />
                <Container breadcrumb={["Home", "Administration", "Account Management"]}>
                    <AccessDenied />
                </Container></Layout>;
        }

        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Administration", "Account Management"]}>
                <div className="page-bar">
                    <div className="page-bar-left">
                        <Search
                            placeholder="Search for domain"
                            onSearch={this.handleSearch}
                            onChange={(e) => { this.handleSearch(e.target.value); }}
                            style={{ width: 250 }}
                        />
                    </div>
                    <div className="page-bar-right">
                        <Button type="primary"
                            icon="plus"
                            disabled={!this.hasPermissionAdd()}
                            onClick={this.handleOpenNewAccount}>Add new</Button>
                        <NewAccount onCancel={this.handleCloseNewAccount}
                            handleCreateNew={this.handleCreateNewAccount}
                            visible={this.state.newAccountModalVisible}
                            loading={this.state.newAccountLoading} />
                        <EditAccount data={this.state.editAccountData}
                            onCancel={this.handleCloseEditAccount}
                            handleEditAccount={this.handleEditAccount}
                            visible={this.state.editAccountModalVisible}
                            loading={this.state.editAccountLoading} />
                    </div>
                </div>
                <div>
                    <Table columns={this.columns}
                        dataSource={list}
                        onChange={this.handleTableChange}
                        pagination={{
                            total,
                            size: "large",
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            pageSize: size,
                            current: page
                        }}
                        rowKey="domainName"
                        loading={loading}
                        size="small"
                        bordered
                    />
                </div>
            </Container>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({
    account: state.account,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changeAccountPage: (page) => dispatch(changeAccountPage(page)),
    changeAccountSearch: (search) => dispatch(changeAccountSearch(search)),
    changeAccountSize: (size) => dispatch(changeAccountSize(size)),
    loadAccountList: (page, size, search, field) => dispatch(loadAccountList(page, size, search, field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
