import React, { Component } from 'react';
import { Modal, Form, Input, Row, Button, Col, Avatar } from 'antd';
import {formItemLayout} from '../../helpers/config/formConfig'
const { Item } = Form;

class ViewUser extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const {displayName, phoneNumber, bankAccount, bankName, lastLogin,
            ipLogin, createdAt, isActive, visible, identify, address, avatar } = this.props.data;
        return (<Modal
            title={"Thông tin người dùng " + displayName}
            visible={visible}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            onCancel={this.props.onCancel}
            footer={<Button onClick={this.props.onCancel}>Ok</Button>}>
                <Form>
                    <Col style={{ marginLeft: '28px' }}>
                        <Row type="flex" justify="center" align="middle" style={{height: '100%', width:'100%'}}>
                            <Avatar size={128} icon="user" src={avatar} />
                        </Row>
                    </Col>
                    
                    <Item {...formItemLayout} label='Họ và Tên'>{
                        getFieldDecorator('displayName', {
                            initialValue: displayName,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="displayName" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Số điện thoại'>{
                        getFieldDecorator('phoneNumber', {
                            initialValue: phoneNumber,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="Sô điện thoại" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='CMND/CCCD'>{
                        getFieldDecorator('identify', {
                            initialValue: identify,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="CMND/CCCD" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Địa chỉ'>{
                        getFieldDecorator('address', {
                            initialValue: address,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Địa chỉ" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Số TK ngân hàng'>{
                        getFieldDecorator('bankAccount', {
                            initialValue: bankAccount,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Tài khoản ngân hàng" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Tên ngân hàng'>{
                        getFieldDecorator('bankName', {
                            initialValue: bankName,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Tên ngân hàng" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Ngày tạo'>{
                        getFieldDecorator('createdAt', {
                            initialValue: createdAt,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Ngày tạo" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Lần cuối đăng nhập'>{
                        getFieldDecorator('lastLogin', {
                            initialValue: lastLogin,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Lần cuối đăng nhập" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='IP'>{
                        getFieldDecorator('ipLogin', {
                            initialValue: ipLogin,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Ip" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='Kích hoạt'>{
                        getFieldDecorator('isActive', {
                            initialValue: isActive ? "Đã kích hoạt" : "Chưa kích hoạt" ,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Kích hoạt" readOnly={true} />)}</Item>
                </Form>
          </Modal>);
    }

}
export default Form.create()(ViewUser);