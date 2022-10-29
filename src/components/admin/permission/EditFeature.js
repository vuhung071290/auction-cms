import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';
import { formItemLayout } from '../../../helpers/config/formConfig'

const { Item } = Form;
const { TextArea } = Input;

class EditFeature extends Component {

    state = {
        data: {},
        editInfoLoading: false,
    }

    handleEdit = (e) => {
        this.props.form.validateFields((err, values) => {
            const { featureName, description } = values;
            const { data } = this.props;
            if (!err) {
                this.props.handleEdit(data.featureId, featureName, description);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { featureName, description } = this.props.data;

        return (<Modal
            title="Edit Feature Info"
            visible={this.props.visible}
            onOk={this.handleEdit}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Update"
        >
            <Form>
                <Item {...formItemLayout} label='Feature ID'>{this.props.data.featureId}</Item>
                <Item {...formItemLayout} label='Feature Name'>{
                    getFieldDecorator('featureName', {
                        initialValue: featureName,
                        rules: [{ required: true, message: 'Please enter Feature name!' }]
                    })(<Input placeholder="Example: Account Management" />)}</Item>
                <Item {...formItemLayout} label='Description'>{
                    getFieldDecorator('description', {
                        initialValue: description,
                        rules: [{ required: true, message: 'Please enter Description!' }]
                    })(<TextArea rows={3} placeholder="Description" />)}</Item>
            </Form>
        </Modal>);
    }
}

export default Form.create()(EditFeature);
