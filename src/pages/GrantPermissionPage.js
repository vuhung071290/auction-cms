import React, { Component } from 'react';
import { Layout, Descriptions, Button, Checkbox, Spin, Tooltip, message } from 'antd';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import { getFeatureList, getPermissionGranted, saveAccountPermission } from '../helpers/services';
import { noti } from '../helpers/utils';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessDenied from '../components/extras/AccessDenied';

const { Item } = Descriptions

class GrantPermissionPage extends Component {

    state = {
        permissionLoading: false,
        permissionList: [],
        permissionMap: {},
        permissionUser: {},
        permissionUserAdd: {},
        permissionUserRemove: {},
        saveLoading: false
    }

    convertToUserPermissionMap = (list) => {
        let map = {};
        list.forEach((e) => {
            map[e.featureActionId] = e;
        });
        return map;
    }

    convertToListPermissionMap = (list) => {
        let map = {};
        list.forEach((e) => {
            e.featureActions.forEach((f) => {
                map[f.featureActionId] = f;
            });
        });
        return map;
    }

    handleUserChangePermission = (e, key) => {
        const { permissionUser, permissionMap, permissionUserAdd, permissionUserRemove } = this.state;
        let userCheck = e.target.checked;
        let newPermissionUserAdd = { ...permissionUserAdd };
        let newPermissionUserRemove = { ...permissionUserRemove };
        if (userCheck) {
            if (permissionUser[key] !== undefined) {
                delete newPermissionUserAdd[key];
                delete newPermissionUserRemove[key];
            } else {
                newPermissionUserAdd[key] = { ...permissionMap[key] };
                delete newPermissionUserRemove[key];
            }
        } else {
            if (permissionUser[key] !== undefined) {
                newPermissionUserRemove[key] = { ...permissionMap[key] };
                delete newPermissionUserAdd[key];
            } else {
                delete newPermissionUserAdd[key];
                delete newPermissionUserRemove[key];
            }
        }
        this.setState({
            permissionUserAdd: newPermissionUserAdd,
            permissionUserRemove: newPermissionUserRemove
        });
    }

    isChanged = (key) => {
        const { permissionUserAdd, permissionUserRemove } = this.state;
        return permissionUserAdd[key] !== undefined || permissionUserRemove[key] !== undefined;
    }

    isChecked = (key) => {
        const { permissionUser, permissionUserAdd, permissionUserRemove } = this.state;
        if (permissionUserRemove[key] !== undefined) {
            return false;
        }
        return permissionUser[key] !== undefined || permissionUserAdd[key] !== undefined;
    }

    handleSelectAll = () => {
        const { permissionMap, permissionUser } = this.state;
        let newPermissionUserAdd = { ...permissionMap };
        Object.keys(permissionUser).forEach((e) => {
            delete newPermissionUserAdd[e];
        });
        this.setState({
            permissionUserAdd: newPermissionUserAdd,
            permissionUserRemove: {}
        });
    }

    handleSelectNone = () => {
        const { permissionUser } = this.state;
        this.setState({
            permissionUserAdd: {},
            permissionUserRemove: { ...permissionUser }
        });
    }

    convertMapToList = (map) => {
        return Object.keys(map).map((e) => map[e]);
    }

    handleSaveAccountPermission = () => {
        const { permissionUserAdd, permissionUserRemove } = this.state;
        const { domainName } = this.props.match.params;
        console.log(permissionUserAdd);
        let permissionUserAddList = Object.keys(permissionUserAdd);
        let permissionUserRemoveList = Object.keys(permissionUserRemove);

        if (permissionUserAddList.length === 0
            && permissionUserRemoveList.length === 0) {
            message.warn("You haven't change anything yet");
            return;
        }

        this.setState({
            saveLoading: true
        }, async () => {
            try {
                let res = await saveAccountPermission(domainName, permissionUserAddList, permissionUserRemoveList);
                noti.success(res.data.message);
                this.setState({
                    saveLoading: false,
                    permissionUserAdd: {},
                    permissionUserRemove: {}
                });
                this.componentDidMount();
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ saveLoading: false });
            }
        });
    }

    hasPermissionView = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PERMISSION_MNG_VIEW")
    }

    hasPermissionGrant = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PERMISSION_MNG_GRANT")
    }


    componentDidMount() {
        const { domainName } = this.props.match.params;
        if (!this.hasPermissionView()) {
            return;
        }

        this.setState({
            permissionLoading: true
        }, async () => {
            try {
                let res = await getFeatureList();
                this.setState({
                    permissionList: res.data.data.list,
                    permissionMap: this.convertToListPermissionMap(res.data.data.list)
                }, async () => {
                    try {
                        let res = await getPermissionGranted(domainName);
                        this.setState({
                            permissionUser: this.convertToUserPermissionMap(res.data.data.list),
                            permissionLoading: false
                        });
                    } catch (err) {
                        console.log(err.response);
                        noti.error(err.response.data.message);
                        this.setState({ permissionLoading: false });
                    }
                });
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ permissionLoading: false });
            }
        });
    }

    render() {
        const { permissionLoading, permissionList, saveLoading } = this.state;
        const { domainName } = this.props.match.params;

        if (!this.hasPermissionView()) {
            return <Layout className="main">
                <MenuBar />
                <Container breadcrumb={["Home", "Administration", "Permission Management", "Grant Permission"]}>
                    <AccessDenied />
                </Container></Layout>;
        }

        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Administration", "Permission Management", "Grant Permission"]}>
                <div className="page-bar">
                    <h2 className="page-bar-left">Grant permission for {domainName}</h2>
                    {
                        this.hasPermissionGrant() ? <div className="page-bar-right">
                            <Button className="mr5" type="primary" icon="check-square" onClick={this.handleSelectAll}>Select All</Button>
                            <Button type="primary" icon="border-outer" onClick={this.handleSelectNone}>Select None</Button>
                        </div> : null
                    }

                </div>
                <Spin spinning={permissionLoading}>
                    <Descriptions bordered>{
                        permissionList.map((e) => <Item key={e.featureId} label={<Tooltip title={e.description}>{e.featureName}</Tooltip>} span={3}>
                            {
                                e.featureActions.map((f) => <Tooltip title={f.description}>
                                    <Button key={f.featureActionId}
                                        className="mr5"
                                        disabled={!this.hasPermissionGrant()}
                                        type={this.isChanged(f.featureActionId) ? "primary" : "default"}>
                                        <Checkbox key={f.featureActionId}
                                            checked={this.isChecked(f.featureActionId)}
                                            onChange={(e) => { this.handleUserChangePermission(e, f.featureActionId); }}
                                            disabled={!this.hasPermissionGrant()}>
                                            {f.featureActionName}</Checkbox>
                                    </Button></Tooltip>)
                            }
                        </Item>)}
                    </Descriptions>
                    <div className="page-bar mt20">
                        <div className="page-bar-right">
                            <Button type="primary"
                                icon="save"
                                disabled={!this.hasPermissionGrant()}
                                loading={saveLoading}
                                onClick={this.handleSaveAccountPermission}>Save</Button>
                        </div>
                    </div>
                </Spin>
            </Container>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GrantPermissionPage));
