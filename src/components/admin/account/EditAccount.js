import React, { Component } from 'react';
import { Modal, Input, Form, Radio } from 'antd';
import { isUndefined } from 'util';
import { formItemLayout } from '../../../helpers/config/formConfig';

const { Item } = Form;

class EditAccount extends Component {

    state = {
        getInfoLoading: false,
        data: {},
        editInfoLoading: false,
        active: undefined,
    }

    handleChangeActive = (e) => {
        this.setState({
            active: e.target.value
        });
    }

    handleEditAccount = (e) => {
        this.props.form.validateFields((err, values) => {
            const { displayName, email } = values;
            const { active } = this.state;
            const { data } = this.props;
            if (!err) {
                this.props.handleEditAccount(data.domainName, displayName, email, 
                    isUndefined(active) ? data.isActive : active);
            }
        });
    }

    render() {

        const { data, form } = this.props;
        const { displayName, email } = data;
        const { getFieldDecorator } = form; 

        return (<Modal
            title="Edit Account"
            visible={this.props.visible}
            onOk={this.handleEditAccount}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Update"
          >
            <Form>
            <Item {...formItemLayout} label='Domain name'>
            {data.domainName}
            </Item>
            <Item {...formItemLayout} label='Display name'>{
                getFieldDecorator('displayName', {
                    initialValue: displayName,
                    rules: [{ required: true, message: 'Please enter Display name!' }]
            })(<Input placeholder="Display name" />)}</Item>
            <Item {...formItemLayout} label='Email'>{
                getFieldDecorator('email', {
                    initialValue: email,
                    rules: [
                        { type: "email", message: "The input is not valid email!" },
                        { required: true, message: 'Please enter Email!' }
                    ]
            })(<Input placeholder="Email" />)}</Item>
            <Item {...formItemLayout} label='Status'>
            <Radio.Group buttonStyle="solid" defaultValue={data.isActive} onChange={this.handleChangeActive}>
                <Radio.Button value={true}>Active</Radio.Button>
                <Radio.Button value={false}>Inactive</Radio.Button>
            </Radio.Group>    
            </Item>
            </Form>

          </Modal>);
    }
}

export default Form.create()(EditAccount);
