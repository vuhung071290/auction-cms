import React, { Component } from 'react';
import { Layout, Tag, Button, Table, Input, DatePicker } from 'antd';
import { connect } from 'react-redux';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import {
    loadAuctionList,
    changeAuctionPage,
    changeAuctionSearch,
    changeAuctionDateSearch,
    changeAuctionSize
} from '../actions/auction';
import NewAuction from '../components/admin/auction/NewAuction';
import EditAuction from '../components/admin/auction/EditAuction';
import ViewAuction from '../components/admin/auction/ViewAuction';
import DeleteAuction from '../components/admin/auction/DeleteAuction';
import {
    createNewAuction,
    editAuction,
    deleteAuction,
    getProperty, updateStatusAuction
} from '../helpers/services';
import { noti } from '../helpers/utils';
import moment from 'moment';
import AccessDenied from '../components/extras/AccessDenied';
import ViewProperty from "../components/admin/property/ViewProperty";

const { Search } = Input;
const { RangePicker } = DatePicker;
const ButtonGroup = Button.Group;

class AuctionPage extends Component {

    state = {
        viewPropertyData: {},
        viewPropertyModalVisible: false,
        viewPropertyLoading: false,
        newAuctionModalVisible: false,
        newAuctionLoading: false,
        viewAuctionData: {},
        viewAuctionModalVisible: false,
        viewAuctionLoading: false,
        editAuctionData: {},
        editAuctionModalVisible: false,
        editAuctionLoading: false,
        updateAuctionStatusLoading: {},
    }

    getColorStatus = (status) => {
        if(status === 0) return "gray"
        if(status === 1) return "blue"
        if(status === 2) return "gold"
        if(status === 3) return "green"
        if(status === 4) return "red"
    }

    getTextStatus = (status) => {
        if(status === 0) return "Chưa đấu giá"
        if(status === 1) return "Đã lên lịch đấu giá"
        if(status === 2) return "Đang đấu giá"
        if(status === 3) return "Đã hoàn thành đấu giá"
        if(status === 4) return "Đã hủy đấu giá"
    }

    columns = [
        {
            title: 'Mã tài sản',
            dataIndex: 'propertyId',
            key: 'propertyId',
            render: (text, row) => {
                return (<Button style={{ padding: '0px 0px 0px 0px', }} type="link" onClick={() => { this.handleOpenViewProperty(row.propertyId); }}>{row.propertyId}</Button>)
            },
        },
        {
            title: 'Mã phiên đấu giá',
            dataIndex: 'auctionId',
            key: 'auctionId',
        },
        {
            title: 'Tên phiên đấu giá',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái đấu giá',
            key: 'status',
            dataIndex: 'status',
            render: (text, row) => {
                return (
                    <span>
                        <Tag color={this.getColorStatus(row.status)} key={text}>
                            {this.getTextStatus(row.status)}
                        </Tag>
                    </span>
                )
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text, row) => <span>{moment(row.createdDate).format("DD/MM/YYYY HH:mm:ss")}</span>
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>

                    <ButtonGroup className="mr5">
                        <Button icon="play-square" disabled={!this.hasPermissionEdit()} loading={this.state.updateAuctionStatusLoading[record.auctionId]} onClick={() => { this.handleUpdateStatus(record, 2,); }} >Bắt Đầu</Button>
                        <Button icon="close-square" disabled={!this.hasPermissionEdit()} loading={this.state.updateAuctionStatusLoading[record.auctionId]} onClick={() => { this.handleUpdateStatus(record, 4); }} >Hủy</Button>
                    </ButtonGroup>

                    <Button className="mr5"
                            icon="eye"
                            disabled={!this.hasPermissionView()}
                            onClick={() => { this.handleOpenViewAuction(record); }} />

                    <Button className="mr5"
                            icon="edit"
                            disabled={!this.hasPermissionEdit()}
                            onClick={() => { this.handleOpenEditAuction(record); }} />

                    <Button className="mr5"
                            icon="user"
                            disabled={!this.hasPermissionEdit()}
                            onClick={() => { this.gotoRegisterAuction(record.auctionId) }} />

                    <Button className="mr5"
                            icon="history"
                            disabled={!this.hasPermissionView()}
                            onClick={() => { this.gotoAuctionHistorical(record.auctionId) }} />

                    <DeleteAuction data={record} className="mr5"
                                   disabled={!this.hasPermissionDelete()}
                                   onOk={() => { this.handleDeleteAuction(record.auctionId); }} />
                </div>
            ),
        },
    ];
    
    gotoRegisterAuction = (auctionId) =>{ 
        let path =  "/" + auctionId + "/user-register-auction";
        this.props.history.push(path);
    }

    gotoAuctionHistorical = (auctionId) =>{
        let path =  "/" + auctionId + "/auction-historical";
        this.props.history.push(path);
    }

    handleOpenViewProperty = (propertyId) => {
        this.setState({
            viewPropertyLoading: true
        }, async () => {
            try {
                let res = await getProperty(propertyId);
                this.setState({
                    viewPropertyLoading: false,
                    viewPropertyModalVisible: true,
                    viewPropertyData: res.data.data,
                });
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ viewPropertyLoading: false });
            }
        });
    }

    handleCloseViewProperty = () => {
        this.setState({
            viewPropertyLoading: false,
            viewPropertyModalVisible: false,
            viewPropertyData: {}
        });
    }

    handleOpenNewAuction = (e) => {
        this.setState({
            newAuctionModalVisible: true
        });
    }

    handleCloseNewAuction = (e) => {
        this.setState({
            newAuctionLoading: false,
            newAuctionModalVisible: false
        });
    }

    handleOpenViewAuction = (data) => {
        this.setState({
            viewAuctionModalVisible: true,
            viewAuctionData: data
        });
    }

    handleCloseViewAuction = () => {
        this.setState({
            viewAuctionLoading: false,
            viewAuctionModalVisible: false,
            viewAuctionData: {}
        });
    }

    handleOpenEditAuction = (data) => {
        this.setState({
            editAuctionModalVisible: true,
            editAuctionData: data
        });
    }

    handleCloseEditAuction = () => {
        this.setState({
            editAuctionLoading: false,
            editAuctionModalVisible: false,
            editAuctionData: {}
        });
    }

    handleCreateNewAuction = (auctionId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate) => {
        this.setState({
            newAuctionLoading: true
        }, async () => {
            try {
                const createdUser = this.props.auth.domainName;
                console.log(createdUser)
                let res = await createNewAuction(auctionId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate, createdUser);
                noti.success(res.data.message);
                this.handleCloseNewAuction();
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ newAuctionLoading: false });
            }
        });

    }

    handleUpdateStatus = (record, status) => {
        const { auctionId, name } = record;
        let loadingMap = {}
        loadingMap[auctionId] = true
        this.setState({
            updateAuctionStatusLoading : loadingMap,
        }, async () => {
            try {
                let res = await updateStatusAuction(auctionId, status);
                noti.success(res.data.message);
                loadingMap[auctionId] = false
                this.setState({ updateAuctionStatusLoading: loadingMap });
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.message, `Can't update status auction ${name}`);
                loadingMap[auctionId] = false
                this.setState({ updateAuctionStatusLoading: loadingMap });
            }
        });
    }

    handleEditAuction = (auctionId, propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate) => {
        this.setState({
            editAuctionLoading: true
        }, async () => {
            try {
                let res = await editAuction(auctionId, propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate);
                noti.success(res.data.message);
                this.handleCloseEditAuction();
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.message, `Can't update auction ${name}`);
                this.setState({ editAuctionLoading: false });
            }
        });
    }

    handleSearch = (e) => {
        const { field, size, startDateSearch, endDateSearch } = this.props.auction;
        this.props.changeAuctionSearch(e);
        this.props.loadAuctionList(1, size, e, field, startDateSearch, endDateSearch);
    }

    // disabledDate = (end)  => {
    //     return end.isAfter(moment().endOf('day'))
    // }

    onCalendarChange = (dates) => {
        if(dates.length > 1) {
            // let startDateMonth = dates[0].clone().startOf("month").unix()
            // let endDateMonth = dates[1].clone().startOf("month").unix()
            // if(startDateMonth === endDateMonth){
                const { size, search, field  } = this.props.auction;
                let startDateSearch = dates[0].clone().unix()*1000;
                let endDateSearch = dates[1].clone().unix()*1000;
                this.props.changeAuctionDateSearch(startDateSearch, endDateSearch);
                this.props.loadAuctionList(1, size, search, field, startDateSearch, endDateSearch);
            // } else {
            //     noti.error("Start - End Days should be same month!")
            //     dates[1] = dates[0].endOf("day")
            // }
        }
    }

    handleDeleteAuction = async (auctionId) => {
        try {
            let res = await deleteAuction(auctionId);
            noti.success(res.data.message);
            this.componentDidMount();
        } catch (err) {
            console.log(err.response);
            noti.error(err.response.data.message, `Can't delete auction`);
        }
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        const { search, field , startDateSearch, endDateSearch} = this.props.auction;
        this.props.changeAuctionPage(current);
        this.props.changeAuctionSize(pageSize);
        this.props.loadAuctionList(current, pageSize, search, field, startDateSearch, endDateSearch);
    }

    hasPermissionView = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("AUCTION_MNG_VIEW")
    }

    hasPermissionAdd = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("AUCTION_MNG_ADD")
    }

    hasPermissionEdit = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("AUCTION_MNG_EDIT")
    }

    hasPermissionDelete = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("AUCTION_MNG_DELETE")
    }

    componentDidMount() {
        const { page, size, search, field, startDateSearch, endDateSearch } = this.props.auction;
        if (this.hasPermissionView()) {
            this.props.loadAuctionList(page, size, search, field, startDateSearch, endDateSearch);
        }
    }

    render() {
        const { list, total, page, size, loading } = this.props.auction;
        const dateFormat = 'DD/MM/YYYY';
        let startDefaultDate = moment(moment().add(-90, 'days').startOf("day"), dateFormat)
        let endDefaultDate = moment(moment().endOf("day"), dateFormat)

        if (!this.hasPermissionView()) {
            return <Layout className="main">
                <MenuBar />
                <Container breadcrumb={["Home", "Tools", "Auction Management"]}>
                    <AccessDenied />
                </Container></Layout>;
        }

        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Tools", "Auction Management"]}>
                <div className="page-bar">
                    <div className="page-bar-left" >
                        <RangePicker className="mr5"
                                     // disabledDate={this.disabledDate}
                                     onCalendarChange={this.onCalendarChange}
                                     defaultValue={[startDefaultDate, endDefaultDate]}
                                     format={dateFormat} />
                        <Search
                            placeholder="Tìm theo tên phiên đấu giá"
                            onSearch={this.handleSearch}
                            onChange={(e) => { this.handleSearch(e.target.value); }}
                            style={{ width: 250 }}
                        />
                    </div>
                    <div className="page-bar-right">
                        <Button type="primary"
                                icon="plus"
                                disabled={!this.hasPermissionAdd()}
                                onClick={this.handleOpenNewAuction}>Thêm mới</Button>
                        <NewAuction onCancel={this.handleCloseNewAuction}
                                    handleCreateNew={this.handleCreateNewAuction}
                                    visible={this.state.newAuctionModalVisible}
                                    loading={this.state.newAuctionLoading}/>
                        <ViewAuction data={this.state.viewAuctionData}
                                     onCancel={this.handleCloseViewAuction}
                                     visible={this.state.viewAuctionModalVisible}
                                     loading={this.state.viewAuctionLoading}/>
                        <EditAuction data={this.state.editAuctionData}
                                     onCancel={this.handleCloseEditAuction}
                                     handleEditAuction={this.handleEditAuction}
                                     visible={this.state.editAuctionModalVisible}
                                     loading={this.state.editAuctionLoading}/>
                        <ViewProperty data={this.state.viewPropertyData}
                                      onCancel={this.handleCloseViewProperty}
                                      visible={this.state.viewPropertyModalVisible}
                                      loading={this.state.viewPropertyLoading}/>
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
                        rowKey="auctionId"
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
    auction: state.auction,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changeAuctionPage: (page) => dispatch(changeAuctionPage(page)),
    changeAuctionSearch: (search) => dispatch(changeAuctionSearch(search)),
    changeAuctionDateSearch: (startDateSearch, endDateSearch) => dispatch(changeAuctionDateSearch(startDateSearch, endDateSearch)),
    changeAuctionSize: (size) => dispatch(changeAuctionSize(size)),
    loadAuctionList: (page, size, search, field, startDateSearch, endDateSearch) => dispatch(loadAuctionList(page, size, search, field, startDateSearch, endDateSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPage);
