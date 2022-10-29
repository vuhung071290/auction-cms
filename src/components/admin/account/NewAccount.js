import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';
import { formItemLayout } from '../../../helpers/config/formConfig'

const { Item } = Form;

class NewAccount extends Component {

    handleCreateNew = (e) => {
        this.props.form.validateFields((err, values) => {
            const { domainName, displayName, email } = values;
            if (!err) {
                this.props.handleCreateNew(domainName, displayName, email);
            }
        });
    }

    handleChangeDomainName = (e) => {
        this.props.form.setFieldsValue({
            email: e.target.value + '@vng.com.vn'
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (<Modal
            title="Add New Account"
            visible={this.props.visible}
            onOk={this.handleCreateNew}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Add New"
          >
            <Form>
            <Item {...formItemLayout} label='Domain name'>{
                getFieldDecorator('domainName', {
                    rules: [{ required: true, message: 'Please enter Domain name!' }]
            })(<Input placeholder="Domain name" onChange={this.handleChangeDomainName}/>)}</Item>
            <Item {...formItemLayout} label='Display name'>{
                getFieldDecorator('displayName', {
                    rules: [{ required: true, message: 'Please enter Display name!' }]
            })(<Input placeholder="Display name" />)}</Item>
            <Item {...formItemLayout} label='Email'>{
                getFieldDecorator('email', {
                    rules: [
                        { type: "email", message: "The input is not valid email!" },
                        { required: true, message: 'Please enter Email!' }
                    ]
            })(<Input placeholder="Email" />)}</Item>
            </Form>
          </Modal>);
    }
}

export default Form.create()(NewAccount);
