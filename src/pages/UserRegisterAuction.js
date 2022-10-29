import React, { Component } from 'react';
import { Layout, Table, Tag, Button } from 'antd';
import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import Container from '../components/Container';
import UpdateStatusAuctionRegister from '../components/auctionregister/UpdateStatusAuctionRegister';
import { loadUserRegisterAuction } from '../actions/userregisterauction';
import {
    updateStatusUserRegisterAuction
} from '../helpers/services';

class UserRegisterAuction extends Component {
    columns = [
        {
            title: 'Họ và Tên',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Số phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'status',
            render: (text, row) => {
                return (
                    <span>
                        <Tag color={row.status === "READY" ? "blue" : "red"} key={text}>
                            {row.status === "READY" ? "Hợp lệ" : "Chưa Hợp lệ"}
                        </Tag>
                    </span>
                )
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button className="mr5"
                        icon="edit"
                        disabled={!this.hasPermissionEdit()}
                        onClick={() => this.showUpdateUserRegisterAuction(true, record)} />
                </div>
            ),
        }
    ];

    state = {
        updateUserRegisterAuction: {
            userId: 0, auctionId: 0, displayName:"", phoneNumber:"", ipLogin:"", isActive:false, createdAt: "", visible: false
        }
    }

    componentDidMount() {
        let auctionId = this.props.match.params.auctionId
        this.props.loadUserRegisterAuction(auctionId, 1, 10);
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        let auctionId = this.props.match.params.auctionId
        this.props.loadUserRegisterAuction(auctionId, current, pageSize);
    }

    showUpdateUserRegisterAuction = (isShow, record) => {
        const { updateUserRegisterAuction } = this.state
        updateUserRegisterAuction.visible = isShow
        if(record){
            updateUserRegisterAuction.displayName = record.displayName
            updateUserRegisterAuction.phoneNumber = record.phoneNumber
            updateUserRegisterAuction.status = record.status
            updateUserRegisterAuction.userId = record.userId
            updateUserRegisterAuction.auctionId = this.props.match.params.auctionId
        }

        this.setState({
            updateUserRegisterAuction: updateUserRegisterAuction
        })
    }

    onUpdateStatus = (data) => {
        const { userId, auctionId, status } = data
        let res = updateStatusUserRegisterAuction(auctionId, userId, status)
        return res
    }

    onUpdateUserComplete = () => {
        this.showUpdateUserRegisterAuction(false, null)
        this.componentDidMount();
    }

    hasPermissionEdit = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("AUCTION_MNG_EDIT")
    }

    render() {
        const { list, loading, total, page, size } = this.props.userregisterauction;
        const { updateUserRegisterAuction } = this.state
        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Auction", "User Register An Auction"]}>
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
                <UpdateStatusAuctionRegister data={updateUserRegisterAuction} onCancel={() => this.showUpdateUserRegisterAuction(false, null)} onUpdateStatus={this.onUpdateStatus} onUpdateUserComplete={this.onUpdateUserComplete}/>
            </Container>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({ 
    userregisterauction: state.userregisterauction,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    loadUserRegisterAuction: (auctionId, page, size) => {    
        dispatch(loadUserRegisterAuction(auctionId, page, size));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterAuction);