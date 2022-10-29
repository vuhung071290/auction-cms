import React, { Component } from 'react';
import { Modal, Input, Form, Button, Popconfirm } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../../../helpers/config/formConfig'
import TextArea from 'antd/lib/input/TextArea';
import { deleteFeatureAction } from '../../../helpers/services';
import { noti } from '../../../helpers/utils';
import { connect } from 'react-redux';

const { Item } = Form;

class EditFeatureAction extends Component {

    state = {
        data: {},
        editInfoLoading: false,
        deleteLoading: false
    }

    handleEdit = (e) => {
        this.props.form.validateFields((err, values) => {
            const { featureActionName, description } = values;
            const { featureActionId } = this.props.data;
            if (!err) {
                this.props.handleEdit(featureActionId, featureActionName, description);
            }
        });
    }

    handleDelete = (featureActionId) => {
        this.setState({
            deleteLoading: true
        }, async () => {
            try {
                let res = await deleteFeatureAction(featureActionId);
                this.setState({ deleteLoading: false });
                noti.success(res.data.message);
                this.props.onCancel();
            } catch (err) {
                this.setState({ deleteLoading: false });
                noti.error(err.response.data.message, `Can't delete feature action`);
            }
        });
    }

    hasPermissionDelete = () => {
        const { permissionSet } = this.props.auth;
        return permissionSet.has("PERMISSION_MNG_DELETE");
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { featureId, featureActionId, featureActionName, description } = this.props.data;

        return (<Modal
            title="Edit Feature Action"
            visible={this.props.visible}
            onOk={this.handleEdit}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            okButtonProps={{ disabled: !this.hasPermissionDelete()}}
            okText="Update"
            destroyOnClose={true}
        >
            <Form>
                <Item {...formItemLayout} label='Feature ID'>{featureId}</Item>
                <Item {...formItemLayout} label='Action ID'>{featureActionId}</Item>
                <Item {...formItemLayout} label='Action Name'>{
                    getFieldDecorator('featureActionName', {
                        initialValue: featureActionName,
                        rules: [{ required: true, message: 'Please enter Feature Action name!' }]
                    })(<Input placeholder="Example: Add" />)}</Item>
                <Item {...formItemLayout} label='Description'>{
                    getFieldDecorator('description', {
                        initialValue: description,
                        rules: [{ required: true, message: 'Please enter Description!' }]
                    })(<TextArea rows={3} placeholder="Description" />)}</Item>
                <Item {...tailFormItemLayout} label="">
                    <Popconfirm title="Are you sure to delete this action?" 
                        disabled={!this.hasPermissionDelete()}
                        onConfirm={() => { this.handleDelete(featureActionId); }}>
                        <Button type="danger" 
                            icon="delete" 
                            disabled={!this.hasPermissionDelete()}
                            loading={this.state.deleteLoading}>Delete this action</Button>
                    </Popconfirm>
                </Item>
            </Form>
        </Modal>);
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditFeatureAction));
