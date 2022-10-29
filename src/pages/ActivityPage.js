import React, { Component } from 'react';
import { Layout, Input, Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { ActivityType } from '../helpers/config/activityConfig';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import { 
    loadActivityList, 
    changeActivitySearch, 
    changeActivityPage, 
    changeActivitySize 
} from '../actions/activity';
import moment from 'moment';
import AccessDenied from '../components/extras/AccessDenied';
import ActivityDescription from '../components/admin/activity/ActivityDescription';

const { Search } = Input;

class ActivityPage extends Component {

    columns = [
        {
            title: 'Domain Name',
            dataIndex: 'domainName',
            key: 'domainName',
            width: 150,
            fixed: 'left'
        },
        {
            title: 'Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            width: 170,
            render: (text, record) => <span>{moment(record.timestamp).format("DD/MM/YYYY HH:mm:ss")}</span>
        },
        {
            title: 'Action',
            dataIndex: 'actionCode',
            key: 'actionCode',
            width: 300,
            render: (text, record) => <Tag color={ActivityType[record.actionCode] !== undefined ? ActivityType[record.actionCode].color : 'red'}>
                {ActivityType[record.actionCode] !== undefined ? ActivityType[record.actionCode].name : 'UNKNOWN ACTION ' + record.actionCode}
                </Tag>
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            render: (text, record) => <ActivityDescription data={record.description} />
        }
    ];

    handleSearch = (e) => {
        const { field, size } = this.props.activity;
        this.props.changeActivitySearch(e);
        this.props.loadActivityList(1, size, e, field);
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        const { search, field } = this.props.activity;
        this.props.changeActivityPage(current);
        this.props.changeActivitySize(pageSize);
        this.props.loadActivityList(current, pageSize, search, field);
    }

    hasPermissionView = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("ACCOUNT_ACTIVITY_VIEW");
    }

    componentDidMount() {
        const { page, size } = this.props.activity;
        if (!this.hasPermissionView()) {
            return;
        }

        this.props.loadActivityList(page, size);
    }

    render() {
        const { list, total, page, size, loading } = this.props.activity;

        if (!this.hasPermissionView()) {
            return <Layout className="main">
                <MenuBar />
                <Container breadcrumb={["Home", "Administration", "Activity Management"]}>
                    <AccessDenied />
                </Container></Layout>;
        }

        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Administration", "Activity Management" ]}>
            <div className="page-bar">
                <div className="page-bar-left">
                    <Search
                        placeholder="Search for domain"
                        onSearch={this.handleSearch}
                        onChange={(e) => { this.handleSearch(e.target.value); }}
                        style={{ width: 250 }}
                    />
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
                    rowKey={(record) => record.id}
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
    activity: state.activity,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changeActivityPage: (page) => dispatch(changeActivityPage(page)),
    changeActivitySize: (size) => dispatch(changeActivitySize(size)),
    changeActivitySearch: (search) => dispatch(changeActivitySearch(search)),
    loadActivityList: (page, size, search, field) => dispatch(loadActivityList(page, size, search, field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);

