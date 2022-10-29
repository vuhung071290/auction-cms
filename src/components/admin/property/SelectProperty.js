import React, {Component} from 'react';
import {Button, Modal, Table} from 'antd';
import {connect} from 'react-redux';
import {
    changePropertyDateSearch,
    changePropertyPage,
    changePropertySearch,
    changePropertySize,
    loadPropertyList
} from '../../../actions/property';

class SelectProperty extends Component {

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
            title: '',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button disabled={false} onClick={() => { this.handleSelectProperty(record); }} type="primary">Chọn</Button>
                </div>
            ),
        },
    ];

    handleSelectProperty = (e) => {
        this.props.handleSelectProperty(e.propertyId)
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        const { search, field , startDateSearch, endDateSearch} = this.props.property;
        this.props.changePropertyPage(current);
        this.props.changePropertySize(pageSize);
        this.props.loadPropertyList(current, pageSize, search, field, startDateSearch, endDateSearch);
    }

    hasPermissionView = () => {
        const {permissionSet} = this.props.auth;
        return permissionSet.has("PROPERTY_MNG_VIEW")
    }

    componentDidMount() {
        const { page, size, search, field, startDateSearch, endDateSearch } = this.props.property;
        if (this.hasPermissionView()) {
            this.props.loadPropertyList(page, size, search, field, startDateSearch, endDateSearch);
        }
    }

    render() {
        const { list, total, page, size, loading } = this.props.property;

        return (<Modal
            title="Chọn tài sản đấu giá"
            visible={this.props.visible}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            cancelText="Đóng"
            okButtonProps={{ style: { display: 'none' } }}
        >
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
                   rowKey="name"
                   loading={loading}
                   size="small"
                   bordered
            />
        </Modal>);
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectProperty);
