import React, { Component } from 'react';
import { Layout, Table, Button, Tooltip, Popconfirm } from 'antd';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import { loadFeatureList, changeFeatureSize, changeFeaturePage } from '../actions/permission';
import { connect } from 'react-redux';
import NewFeature from '../components/admin/permission/NewFeature';
import { createNewFeature, editFeature, deleteFeature, createNewFeatureAction, editFeatureAction } from '../helpers/services';
import { noti } from '../helpers/utils';
import EditFeature from '../components/admin/permission/EditFeature';
import NewFeatureAction from '../components/admin/permission/NewFeatureAction';
import EditFeatureAction from '../components/admin/permission/EditFeatureAction';
import AccessDenied from '../components/extras/AccessDenied';

class PermissionMngPage extends Component {

    state = {
        newFeatureModalVisible: false,
        newFeatureLoading: false,
        editFeatureData: {},
        editFeatureModalVisible: false,
        editFeatureLoading: false,
        newFeatureActionModalVisible: false,
        newFeatureActionLoading: false,
        newFeatureActionFeatureId: null,
        editFeatureActionModalVisible: false,
        editFeatureActionLoading: false,
        editFeatureActionData: {},
    }

    columns = [
        {
            title: 'Feature',
            dataIndex: 'featureName',
            key: 'featureName',
        },
        {
            title: 'Permission Action',
            dataIndex: 'featureActions',
            key: 'featureActions',
            render: (text, record) => <div>{record.featureActions.map((e) => <Tooltip key={e.featureActionId} title="Click to edit">
                <Button className="mr5" onClick={() => { this.handleOpenEditFeatureAction(e); }}>{e.featureActionName}</Button>
            </Tooltip>)}
                <Button type="dashed"
                    icon="plus"
                    disabled={!this.hasPermissionAdd()}
                    onClick={() => { this.handleOpenNewFeatureAction(record.featureId); }}>Add Action</Button>
            </div>
        }, {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <div>
                    <Button className="mr5"
                        icon="edit"
                        disabled={!this.hasPermissionEdit()}
                        onClick={() => { this.handleOpenEditFeature(record); }} />
                    <Popconfirm title="Are you sure to delete this feature?"
                        disabled={!this.hasPermissionDelete()}
                        onConfirm={() => { this.handleDeleteFeature(record.featureId, record.featureName); }}>
                        <Button className="mr5"
                            disabled={!this.hasPermissionDelete()}
                            icon="delete"
                            type="danger" />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    handleOpenNewFeature = (e) => {
        this.setState({
            newFeatureModalVisible: true
        });
    }

    handleCloseNewFeature = (e) => {
        this.setState({
            newFeatureModalVisible: false
        });
    }

    handleCreateNewFeature = (featureId, featureName, description) => {
        this.setState({
            newFeatureLoading: true
        }, async () => {
            try {
                let res = await createNewFeature(featureId, featureName, description);
                noti.success(res.data.message);
                this.setState({ newFeatureLoading: false, newFeatureModalVisible: false });
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ newFeatureLoading: false });
            }
        });
    }

    handleOpenEditFeature = (data) => {
        this.setState({
            editFeatureModalVisible: true,
            editFeatureData: data
        });
    }

    handleCloseEditFeature = () => {
        this.setState({
            editFeatureLoading: false,
            editFeatureModalVisible: false,
            editFeatureData: {}
        });
    }

    handleEditFeature = (featureId, featureName, description) => {
        this.setState({
            editFeatureLoading: true
        }, async () => {
            try {
                let res = await editFeature(featureId, featureName, description);
                noti.success(res.data.message);
                this.handleCloseEditFeature();
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message, `Can't update feature "${this.state.editFeatureData.featureName}"`);
                this.setState({ editFeatureLoading: false });
            }
        });
    }

    handleDeleteFeature = async (featureId, featureName) => {
        try {
            let res = await deleteFeature(featureId);
            noti.success(res.data.message);
            this.componentDidMount();
        } catch (err) {
            console.log(err.response);
            noti.error(err.response.data.message, `Can't delete feature "${featureName}"`);
        }
    }

    handleOpenNewFeatureAction = (featureId) => {
        this.setState({
            newFeatureActionModalVisible: true,
            newFeatureActionFeatureId: featureId,
        });
    }

    handleCloseNewFeatureAction = (e) => {
        this.setState({
            newFeatureActionModalVisible: false
        });
    }

    handleCreateNewFeatureAction = (featureId, featureActionId, featureActionName, description) => {
        this.setState({
            newFeatureActionLoading: true
        }, async () => {
            try {
                let res = await createNewFeatureAction(featureId, featureActionId, featureActionName, description);
                noti.success(res.data.message);
                this.setState({ newFeatureActionLoading: false, newFeatureActionModalVisible: false });
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ newFeatureActionLoading: false });
            }
        });
    }

    handleOpenEditFeatureAction = (data) => {
        this.setState({
            editFeatureActionModalVisible: true,
            editFeatureActionData: data
        });
    }

    handleCloseEditFeatureAction = () => {
        this.setState({
            editFeatureActionLoading: false,
            editFeatureActionModalVisible: false,
            editFeatureActionData: {}
        });
        this.componentDidMount();
    }

    handleEditFeatureAction = (featureActionId, featureActionName, description) => {
        this.setState({
            editFeatureActionLoading: true
        }, async () => {
            try {
                let res = await editFeatureAction(featureActionId, featureActionName, description);
                noti.success(res.data.message);
                this.handleCloseEditFeatureAction();
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message, `Can't update feature "${this.state.editFeatureActionData.featureActionName}"`);
                this.setState({ editFeatureActionLoading: false });
            }
        });
    }

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        this.props.changeFeaturePage(current);
        this.props.changeFeatureSize(pageSize);
        this.props.loadFeatureList(current, pageSize);
    }

    hasPermissionView = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PERMISSION_MNG_VIEW");
    }

    hasPermissionAdd = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PERMISSION_MNG_ADD");
    }

    hasPermissionEdit = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PERMISSION_MNG_EDIT");
    }

    hasPermissionDelete = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PERMISSION_MNG_DELETE");
    }

    componentDidMount() {
        const { page, size } = this.props.permission;
        if (!this.hasPermissionView()) {
            return;
        }

        this.props.loadFeatureList(page, size);
    }

    render() {
        const { list, page, size, total, loading } = this.props.permission;

        if (!this.hasPermissionView()) {
            return <Layout className="main">
                <MenuBar />
                <Container breadcrumb={["Home", "Administration", "Permission Management"]}>
                    <AccessDenied />
                </Container></Layout>;
        }

        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Administration", "Permission Management"]}>
                <div className="page-bar">
                    <div className="page-bar-right">
                        <Button type="primary"
                            icon="plus"
                            disabled={!this.hasPermissionAdd()}
                            onClick={this.handleOpenNewFeature}>Add Feature</Button>
                        <NewFeature onCancel={this.handleCloseNewFeature}
                            handleCreateNew={this.handleCreateNewFeature}
                            visible={this.state.newFeatureModalVisible}
                            loading={this.state.newFeatureLoading} />
                        <EditFeature data={this.state.editFeatureData}
                            onCancel={this.handleCloseEditFeature}
                            handleEdit={this.handleEditFeature}
                            visible={this.state.editFeatureModalVisible}
                            loading={this.state.editFeatureLoading} />
                        <NewFeatureAction onCancel={this.handleCloseNewFeatureAction}
                            handleCreateNew={this.handleCreateNewFeatureAction}
                            visible={this.state.newFeatureActionModalVisible}
                            loading={this.state.newFeatureActionLoading}
                            featureId={this.state.newFeatureActionFeatureId} />
                        <EditFeatureAction data={this.state.editFeatureActionData}
                            onCancel={this.handleCloseEditFeatureAction}
                            handleEdit={this.handleEditFeatureAction}
                            visible={this.state.editFeatureActionModalVisible}
                            loading={this.state.editFeatureActionLoading} />
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
                        loading={loading}
                        rowKey="featureId"
                        bordered
                    />
                </div>
            </Container>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({
    permission: state.permission,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changeFeaturePage: (page) => dispatch(changeFeaturePage(page)),
    changeFeatureSize: (size) => dispatch(changeFeatureSize(size)),
    loadFeatureList: (page, size, search, field) => dispatch(loadFeatureList(page, size, search, field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionMngPage);
