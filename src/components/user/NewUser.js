import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import {formItemLayout} from '../../helpers/config/formConfig'
import UploadAvatarImage from "../common/UploadAvatarImage";
import { noti } from '../../helpers/utils';
const { Item } = Form;

class NewUser extends Component {
    avatarUrl = ""
    handleCreateNew = (e) => {
        this.props.form.validateFields((err, values) => {
            const { displayName, phoneNumber, address, password, bankAccount, bankName, identity } = values;
            let avatar = this.avatarUrl
            if (!err) {
                let data = {
                    displayName:displayName,
                    phoneNumber:phoneNumber,
                    address:address,
                    avatar:avatar,
                    password:password,
                    bankAccount:bankAccount,
                    bankName:bankName,
                    identity:identity,
                    isActive:true
                }
                let res = this.props.onCreateNew(data);
                res.then(
                    (result) => {
                        if(result.data.status === 200){
                            this.props.onCreateNewComplete()
                            this.props.form.resetFields()
                        }
                    },
                    (error) => { 
                        var mess = ""
                        if(error.response.data.message){
                            mess = error.response.data.message
                        }
                        noti.error("Không thể tạo người dùng. " + mess)
                    }
                )
            }
        });
    }
    
    onUploadComplete = (imageFileList) => {
        if(imageFileList.length > 0){
            this.avatarUrl = imageFileList[0].url;
        }
    }

    handleUploadImages = (imageFileList) => {
        this.setState({ imageFileList});
    }

    onUploadRemove = () => {
        this.avatarUrl  = "";
    }
 
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.props.data;
        return (<Modal
            title={"Tạo người dùng"}
            visible={visible}
            confirmLoading={this.props.loading}
            cancelText="Đóng"
            destroyOnClose={true}
            onCancel={this.props.onCancel}
            onOk={this.handleCreateNew}
            okText="Thêm">
                <Form>
                    <Item {...formItemLayout} label='Ảnh đại diện'>
                        <UploadAvatarImage 
                            handleUploadImages={this.handleUploadImages} 
                            onUploadComplete={this.onUploadComplete} fileList={[]}
                            onUploadRemove={this.onUploadRemove}
                        />
                    </Item>

                    <Item {...formItemLayout} label='Họ và Tên'>{
                        getFieldDecorator('displayName', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Vui lòng nhâp họ tên' }]
                    })(<Input placeholder="displayName" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Số điện thoại'>{
                        getFieldDecorator('phoneNumber', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Vui lòng nhâp số điện thoại' }]
                    })(<Input placeholder="Sô điện thoại" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='CMND/CCCD'>{
                        getFieldDecorator('identity', {
                            initialValue: '',
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="CMND/CCCD" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Địa chỉ'>{
                        getFieldDecorator('address', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Vui lòng nhập địa chỉ' }]
                    })(<Input placeholder="Địa chỉ" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Mật khẩu'>{
                        getFieldDecorator('password', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }]
                    })(<Input.Password placeholder="Mật khẩu" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Số TK ngân hàng'>{
                        getFieldDecorator('bankAccount', {
                            initialValue: '',
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Tài khoản ngân hàng" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Tên ngân hàng'>{
                        getFieldDecorator('bankName', {
                            initialValue: '',
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Tên ngân hàng" readOnly={false} />)}</Item>

                    {/* <Item {...formItemLayout} label='Kích hoạt'>{
                        getFieldDecorator('isActive', {
                            initialValue: true ,
                            rules: [{ required: false, message: '' }]
                    })(<Checkbox defaultChecked={true}>Kích hoạt khi tạo </Checkbox>)}</Item> */}
                </Form>
          </Modal>);
    }

}
export default Form.create()(NewUser);