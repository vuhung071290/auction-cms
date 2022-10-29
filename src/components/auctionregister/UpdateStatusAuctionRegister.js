import React, { Component } from 'react';
import { Modal, Form, Input, Switch } from 'antd';
import {formItemLayout} from '../../helpers/config/formConfig'
import { noti } from '../../helpers/utils';
const { Item } = Form;

class UpdateStatusAuctionRegister extends Component {

    handleUpdate = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // onUpdateStatus
                const { status } = values;
                let statusStr = 'PROGRESS'
                if (status){
                    statusStr = 'READY'
                }
                let data = {
                    userId: this.props.data.userId,
                    auctionId:this.props.data.auctionId,
                    status: statusStr
                }
                let res = this.props.onUpdateStatus(data);
                res.then(
                    (result) => {
                        if(result.data.status === 200){
                            this.props.onUpdateUserComplete()
                            this.props.form.resetFields()
                        }
                    },
                    (error) => { 
                        var mess = ""
                        if(error.response.data.message){
                            mess = error.response.data.message
                        }
                        noti.error("Không thể cập nhật người dùng. " + mess)
                    }
                )
            }
        })
    }

    afterClose = () => {
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { displayName, phoneNumber, status, visible } = this.props.data;

        return (<Modal
            title={"Cập nhật trạng thái đăng kí phiên đấu giá"}
            visible={visible}
            confirmLoading={this.props.loading}
            cancelText="Đóng"
            destroyOnClose={true}
            afterClose={this.afterClose}
            onCancel={this.props.onCancel}
            onOk={this.handleUpdate}
            okText="Cập Nhật">
                <Form>
                    <Item {...formItemLayout} label='Họ và Tên'>{
                        getFieldDecorator('displayName', {
                            initialValue: displayName,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="Họ và Tên" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Số điện thoại'>{
                        getFieldDecorator('phoneNumber', {
                            initialValue: phoneNumber,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="Sô điện thoại" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Trạng thái'>{
                        getFieldDecorator('status', {
                            rules: [{ required: true, message: 'Cập nhật giá trị' }]
                    })(<Switch defaultChecked={'READY'===status} />)}</Item>

                </Form>
          </Modal>);
    }

}
export default Form.create()(UpdateStatusAuctionRegister);