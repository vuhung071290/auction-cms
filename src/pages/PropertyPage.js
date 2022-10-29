import React, {Component} from 'react';
import {Button, DatePicker, Input, Layout, Table} from 'antd';
import {connect} from 'react-redux';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import {
    changePropertyDateSearch,
    changePropertyPage,
    changePropertySearch,
    changePropertySize,
    loadPropertyList
} from '../actions/property';
import NewProperty from '../components/admin/property/NewProperty';
import EditProperty from '../components/admin/property/EditProperty';
import ViewProperty from '../components/admin/property/ViewProperty';
import DeleteProperty from '../components/admin/property/DeleteProperty';
import {createNewProperty, deleteProperty, editProperty} from '../helpers/services';
import {noti} from '../helpers/utils';
import moment from 'moment';
import AccessDenied from '../components/extras/AccessDenied';

const { Search } = Input;
const { RangePicker } = DatePicker;

class PropertyPage extends Component {

    state = {
        newPropertyModalVisible: false,
        newPropertyLoading: false,
        viewPropertyData: {},
        viewPropertyModalVisible: false,
        viewPropertyLoading: false,
        editPropertyData: {},
        editPropertyModalVisible: false,
        editPropertyLoading: false,
    }

    columns = [
        {
            title: 'Mã tài sản',
            dataIndex: 'propertyId',
            key: 'propertyId',
        },
        {
            title: 'Tên tài sản',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả tài sản',
            dataIndex: 'description',
            key: 'description',
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
            width: 130,
            render: (text, record) => (
                <div>
                    <Button className="mr5"
                            icon="eye"
                            disabled={!this.hasPermissionView()}
                            onClick={() => { this.handleOpenViewProperty(record); }} />
                    <Button className="mr5"
                        icon="edit"
                        disabled={!this.hasPermissionEdit()}
                        onClick={() => { this.handleOpenEditProperty(record); }} />
                    <DeleteProperty data={record}
                        disabled={!this.hasPermissionDelete()}
                        onOk={() => { this.handleDeleteProperty(record.propertyId); }} />
                </div>
            ),
        },
    ];

    handleOpenNewProperty = (e) => {
        this.setState({
            newPropertyModalVisible: true
        });
    }

    handleCloseNewProperty = (e) => {
        this.setState({
            newPropertyLoading: false,
            newPropertyModalVisible: false
        });
    }

    handleOpenViewProperty = (data) => {
        this.setState({
            viewPropertyModalVisible: true,
            viewPropertyData: data
        });
    }

    handleCloseViewProperty = () => {
        this.setState({
            viewPropertyLoading: false,
            viewPropertyModalVisible: false,
            viewPropertyData: {}
        });
    }

    handleOpenEditProperty = (data) => {
        this.setState({
            editPropertyModalVisible: true,
            editPropertyData: data
        });
    }

    handleCloseEditProperty = () => {
        this.setState({
            editPropertyLoading: false,
            editPropertyModalVisible: false,
            editPropertyData: {}
        });
    }

    handleCreateNewProperty = (name, description, images, registrationForms, auctionMinutes, contracts) => {
        this.setState({
            newPropertyLoading: true
        }, async () => {
            try {
                const createdUser = this.props.auth.domainName;
                let res = await createNewProperty(name, description, images, registrationForms, auctionMinutes, contracts, createdUser);
                noti.success(res.data.message);
                this.handleCloseNewProperty();
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ newPropertyLoading: false });
            }
        });

    }

    handleEditProperty = (propertyId, name, description, images, registrationForms, auctionMinutes, contracts) => {
        this.setState({
            editPropertyLoading: true
        }, async () => {
            try {
                let res = await editProperty(propertyId, name, description, images, registrationForms, auctionMinutes, contracts);
                noti.success(res.data.message);
                this.handleCloseEditProperty();
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.message, `Can't update property ${name}`);
                this.setState({ editPropertyLoading: false });
            }
        });
    }

    handleSearch = (e) => {
        const { field, size, startDateSearch, endDateSearch } = this.props.property;
        this.props.changePropertySearch(e);
        this.props.loadPropertyList(1, size, e, field, startDateSearch, endDateSearch);
    }

    // disabledDate = (end)  => {
    //     return end.isAfter(moment().endOf('day'))
    // }

    onCalendarChange = (dates) => {
        if(dates.length > 1) {
            // let startDateMonth = dates[0].clone().startOf("month").unix()
            // let endDateMonth = dates[1].clone().startOf("month").unix()
            // if(startDateMonth === endDateMonth){
                const { size, search, field  } = this.props.property;
                let startDateSearch = dates[0].clone().unix()*1000;
                let endDateSearch = dates[1].clone().unix()*1000;
                this.props.changePropertyDateSearch(startDateSearch, endDateSearch);
                this.props.loadPropertyList(1, size, search, field, startDateSearch, endDateSearch);
            // } else {
            //     noti.error("Start - End Days should be same month!")
            //     dates[1] = dates[0].endOf("day")
            // }
        }
    }

    handleDeleteProperty = async (propertyId) => {
        try {
            let res = await deleteProperty(propertyId);
            noti.success(res.data.message);
            this.componentDidMount();
        } catch (err) {
            console.log(err.response);
            noti.error(err.response.data.message, `Can't delete property`);
        }
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        const { search, field , startDateSearch, endDateSearch} = this.props.property;
        this.props.changePropertyPage(current);
        this.props.changePropertySize(pageSize);
        this.props.loadPropertyList(current, pageSize, search, field, startDateSearch, endDateSearch);
    }

    hasPermissionView = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PROPERTY_MNG_VIEW")
    }

    hasPermissionAdd = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PROPERTY_MNG_ADD")
    }

    hasPermissionEdit = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PROPERTY_MNG_EDIT")
    }

    hasPermissionDelete = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PROPERTY_MNG_DELETE")
    }

    componentDidMount() {
        const { page, size, search, field, startDateSearch, endDateSearch } = this.props.property;
        if (this.hasPermissionView()) {
            this.props.loadPropertyList(page, size, search, field, startDateSearch, endDateSearch);
        }
    }

    render() {
        const { list, total, page, size, loading } = this.props.property;
        const dateFormat = 'DD/MM/YYYY';
        let startDefaultDate = moment(moment().add(-90, 'days').startOf("day"), dateFormat)
        let endDefaultDate = moment(moment().endOf("day"), dateFormat)

        if (!this.hasPermissionView()) {
            return <Layout className="main">
                <MenuBar />
                <Container breadcrumb={["Home", "Tools", "Property Management"]}>
                    <AccessDenied />
                </Container></Layout>;
        }

        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Tools", "Property Management"]}>
                <div className="page-bar">
                    <div className="page-bar-left" >
                        <RangePicker className="mr5"
                                     // disabledDate={this.disabledDate}
                                     onCalendarChange={this.onCalendarChange}
                                     defaultValue={[startDefaultDate, endDefaultDate]}
                                     format={dateFormat} />
                        <Search
                            placeholder="Tìm kiếm theo tên tài sản"
                            onSearch={this.handleSearch}
                            onChange={(e) => { this.handleSearch(e.target.value); }}
                            style={{ width: 250 }}
                        />
                    </div>
                    <div className="page-bar-right">
                        <Button type="primary"
                            icon="plus"
                            disabled={!this.hasPermissionAdd()}
                            onClick={this.handleOpenNewProperty}>Thêm mới</Button>
                        <NewProperty onCancel={this.handleCloseNewProperty}
                            handleCreateNew={this.handleCreateNewProperty}
                            visible={this.state.newPropertyModalVisible}
                            loading={this.state.newPropertyLoading} />
                        <ViewProperty data={this.state.viewPropertyData}
                                      onCancel={this.handleCloseViewProperty}
                                      visible={this.state.viewPropertyModalVisible}
                                      loading={this.state.viewPropertyLoading} />
                        <EditProperty data={this.state.editPropertyData}
                            onCancel={this.handleCloseEditProperty}
                            handleEditProperty={this.handleEditProperty}
                            visible={this.state.editPropertyModalVisible}
                            loading={this.state.editPropertyLoading} />
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
                        rowKey="propertyId"
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
    property: state.property,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changePropertyPage: (page) => dispatch(changePropertyPage(page)),
    changePropertySearch: (search) => dispatch(changePropertySearch(search)),
    changePropertyDateSearch: (startDateSearch, endDateSearch) => dispatch(changePropertyDateSearch(startDateSearch, endDateSearch)),
    changePropertySize: (size) => dispatch(changePropertySize(size)),
    loadPropertyList: (page, size, search, field, startDateSearch, endDateSearch) => dispatch(loadPropertyList(page, size, search, field, startDateSearch, endDateSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage);
