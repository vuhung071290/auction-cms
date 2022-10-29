import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';
import { formItemLayout } from '../../../helpers/config/formConfig'
import TextArea from 'antd/lib/input/TextArea';

const { Item } = Form;

class NewFeatureAction extends Component {

    handleCreateNew = (e) => {
        this.props.form.validateFields((err, values) => {
            const { featureActionId, featureActionName, description } = values;
            const { featureId } = this.props;
            if (!err) {
                this.props.handleCreateNew(featureId, featureActionId, featureActionName, description);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { featureId } = this.props;

        return (<Modal
            title="Add New Feature Action"
            visible={this.props.visible}
            onOk={this.handleCreateNew}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Add New"
          >
            <Form>
            <Item {...formItemLayout} label='Feature ID'>{featureId}</Item>
            <Item {...formItemLayout} label='Action ID'>{
                getFieldDecorator('featureActionId', {
                    initialValue: featureId + "_",
                    rules: [{ required: true, message: 'Please enter Feature Action Id!' }]
            })(<Input placeholder="Example: ACCOUNT_MNG_ADD" />)}</Item>
            <Item {...formItemLayout} label='Action Name'>{
                getFieldDecorator('featureActionName', {
                    rules: [{ required: true, message: 'Please enter Feature Action name!' }]
            })(<Input placeholder="Example: Add" />)}</Item>
            <Item {...formItemLayout} label='Description'>{
                getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please enter Description!' }]
            })(<TextArea rows={3} placeholder="Description" />)}</Item>
            </Form>
          </Modal>);
    }
}

export default Form.create()(NewFeatureAction);
