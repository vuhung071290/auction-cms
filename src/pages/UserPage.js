import React, { Component } from 'react';
import { Layout, Input, Table, Tag, Button } from 'antd';
import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import Container from '../components/Container';
import moment from 'moment';
import { loadListUser } from '../actions/user';
import ViewUser from '../components/user/ViewUser';
import NewUser from '../components/user/NewUser';
import UpdateUser from '../components/user/UpdateUser';
import { noti } from '../helpers/utils';
import DeleteUser from '../components/user/DeleteUser';
import {
    sendOtpSms, deleteUser, createUser, updateUser
} from '../helpers/services';

const { Search } = Input;
class UserPage extends Component {
    columns = [
        {
            title: 'Họ và Tên',
            dataIndex: 'displayName',
            key: 'displayName',
            width: 150,
        },
        {
            title: 'Số phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 170,
            render: (text, record) => <span>{moment(record.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 170,
            render: (text, row) => {
                return (
                    <span>
                        <Tag color={row.isActive ? "blue" : "red"} key={text}>
                            {row.isActive ? "Đã kích hoạt" : "Chưa kích hoạt"}
                        </Tag>
                    </span>
                )
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 130,
            render: (text, record) => (
                <div>
                    <Button className="mr5" icon="eye" onClick={() => this.showViewUser(true, record)}></Button>
                    <Button className="mr5"
                        icon="edit"
                        disabled={!this.hasPermissionEdit()}
                        onClick={() => { this.showUpdateUser(true,record); }} />
                    <DeleteUser data={record}
                        disabled={!this.hasPermissionDelete()}
                        onOk={() => { this.handleDeleteUser(record.userId, record.displayName);}} />
                </div>
            ),
        }
    ];
    state = {
        viewUser: {
            userName:"", displayName:"", avatar:"", ipLogin:"", isActive:false, createdAt: "", visible: false
        },
        newUser: {
            visible: false
        },
        updateUser: {
            userId: 0, userName:"", displayName:"", avatar:"", ipLogin:"", isActive:false, createdAt: "", visible: false
        }
    }
    
    handleSearch = (e) => {
        const { size } = this.props.users;
        this.props.loadListUser(1, size, e);
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        const { search } = this.props.users;
        this.props.loadListUser(current, pageSize, search);
    }

    handleDeleteUser = async (userId, displayName) => {
        try {
            let res = await deleteUser(userId);
            noti.success(res.data.status);
            this.componentDidMount();
        } catch (err) {
            console.log(err.response);
            noti.error(err.response.data.message, `Can't delete ${displayName}`);
        }
    }

    onCreateNew = (data) => {
        const {displayName,
            phoneNumber,
            address,
            avatar,
            password,
            bankAccount,
            bankName,
            identity,
            isActive} = data
        let res =  createUser(displayName,phoneNumber,address,avatar,password,bankAccount,bankName,identity,isActive);
        return res
    }

    onUpdate = (data) => {
        const { userId, displayName, avatar, identify, address, bankAccount, bankName } = data
        let res = updateUser(userId, displayName, avatar, identify, address, bankAccount, bankName);
        return res
    }

    onCreateNewComplete = () => {
        this.showNewUser(false)
        this.componentDidMount();
    }

    onUpdateUserComplete = () => {
        this.showUpdateUser(false, null)
        this.componentDidMount();
    }

    hasPermissionDelete = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("USER_MANAGEMENT_DELETE")
    }

    hasPermissionAdd = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("USER_MANAGEMENT_CREATE")
    }

    hasPermissionEdit = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("USER_MANAGEMENT_UPDATE")
    }

    showViewUser = (isShow, record) => {
        const { viewUser } = this.state
        viewUser.visible = isShow
        if(record){
            viewUser.displayName = record.displayName
            viewUser.phoneNumber = record.phoneNumber
            viewUser.ipLogin = record.ipLogin
            viewUser.isActive = record.isActive
            viewUser.address = record.address
            viewUser.bankAccount = record.bankAccount
            viewUser.bankName = record.bankName
            viewUser.identify = record.identify
            viewUser.avatar = record.avatar
            viewUser.lastLogin =  moment(record.lastLogin).format("DD/MM/YYYY HH:mm:ss")
            viewUser.createdAt = moment(record.createdAt).format("DD/MM/YYYY HH:mm:ss")
        }

        this.setState({
            viewUser: viewUser
        })
    }

    showUpdateUser = (isShow,record) => {
        const { updateUser } = this.state
        updateUser.visible = isShow
        if(record){
            updateUser.displayName = record.displayName
            updateUser.phoneNumber = record.phoneNumber
            updateUser.address = record.address
            updateUser.bankAccount = record.bankAccount
            updateUser.bankName = record.bankName
            updateUser.identify = record.identify
            updateUser.avatar = record.avatar
            updateUser.userId = record.userId
        }

        this.setState({
            updateUser: updateUser
        })
    }

    showNewUser = (isShow) => {
        const { newUser } = this.state
        newUser.visible = isShow
        this.setState({
            newUser: newUser
        })
    }

    sendOtpSms = async (userId) => {
        try{
            let res = await sendOtpSms(userId);
            if(res.data.status === 200){
                noti.success("Gởi OTP Thành Công.")
            }else{
                noti.success("Gởi sms lỗi.")
            }
        }catch(err){
            var mess = ""
            if(err.response.data.message){
                mess = err.response.data.message
            }
            noti.error("Gởi sms lỗi. " + mess)
        }
    }

    componentDidMount() {
        this.props.loadListUser(1, 10, '');
    }
    render() {
        const { list, loading, total, page, size } = this.props.users;
        const { viewUser, newUser, updateUser } = this.state
        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "User", "User Management"]}>
                <div className="page-bar">
                    <div className="page-bar-left">
                        <div className="page-bar-left">
                            <Search
                                placeholder="Search for domain"
                                onSearch={this.handleSearch}
                                onChange={(e) => { this.handleSearch(e.target.value); }}
                                style={{ width: 250 }}
                            />
                        </div> 
                    </div>
                    <div className="page-bar-right">
                        <Button 
                            type="primary"
                            icon="plus"
                            disabled={!this.hasPermissionAdd()}
                            onClick={() => this.showNewUser(true)}>Add new</Button>
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
                            scroll: { x: 2000},
                            current: page
                        }} 
                        loading={loading}
                        size="small"
                        rowKey={(record) => record.id}
                        bordered 
                    />
                </div>
            <ViewUser data={viewUser} onCancel={() => this.showViewUser(false)}/>
            <NewUser data={newUser} onCancel={() => this.showNewUser(false)} onCreateNew={this.onCreateNew} onCreateNewComplete={this.onCreateNewComplete}/>
            <UpdateUser data={updateUser} onCancel={() => this.showUpdateUser(false, null)} onUpdate={this.onUpdate} onUpdateUserComplete={this.onUpdateUserComplete}/>
            </Container>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({ 
    users: state.users,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    loadListUser: (page, size, search) => {    
        dispatch(loadListUser(page, size, search));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);