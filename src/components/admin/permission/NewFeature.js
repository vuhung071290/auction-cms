import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';
import { formItemLayout } from '../../../helpers/config/formConfig'
import TextArea from 'antd/lib/input/TextArea';

const { Item } = Form;

class NewFeature extends Component {

    handleCreateNew = (e) => {
        this.props.form.validateFields((err, values) => {
            const { featureId, featureName, description } = values;
            if (!err) {
                this.props.handleCreateNew(featureId, featureName, description);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (<Modal
            title="Add New Feature"
            visible={this.props.visible}
            onOk={this.handleCreateNew}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Add New"
          >
            <Form>
            <Item {...formItemLayout} label='Feature ID'>{
                getFieldDecorator('featureId', {
                    rules: [{ required: true, message: 'Please enter Feature Id!' }]
            })(<Input placeholder="Example: ACCOUNT_MNG" />)}</Item>
            <Item {...formItemLayout} label='Feature Name'>{
                getFieldDecorator('featureName', {
                    rules: [{ required: true, message: 'Please enter Feature name!' }]
            })(<Input placeholder="Example: Account Management" />)}</Item>
            <Item {...formItemLayout} label='Description'>{
                getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please enter Description!' }]
            })(<TextArea rows={3} placeholder="Description" />)}</Item>
            </Form>
          </Modal>);
    }
}

export default Form.create()(NewFeature);
