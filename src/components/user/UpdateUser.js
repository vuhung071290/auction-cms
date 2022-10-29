import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import {formItemLayout} from '../../helpers/config/formConfig'
import UploadAvatarImage from "../common/UploadAvatarImage";
import { noti } from '../../helpers/utils';
const { Item } = Form;

class UpdateUser extends Component {
    avatarUrl = ""
    isUpdateAvatar = false
    state = {
        imageFileList: []
    }

    handleUpdate = (e) => {
        this.props.form.validateFields((err, values) => {
            const { displayName, address, bankAccount, bankName, identify } = values;
            let avatar = this.avatarUrl
            let userId = this.props.data.userId
            if (!err) {
                let data = {
                    userId: userId,
                    displayName: displayName,
                    avatar: avatar,
                    identify: identify,
                    address: address,
                    bankAccount: bankAccount,
                    bankName: bankName
                }
                let res = this.props.onUpdate(data);
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
    onUploadComplete = (imageFileList) => {
        if(imageFileList.length > 0){
            this.avatarUrl = imageFileList[0].url;
            let newArr = []
            newArr.push(imageFileList[0].url)
            this.isUpdateAvatar = true
            this.setState({ imageFileList:newArr});
        }
    }

    handleUploadImages = (imageFileList) => {
        // this.setState({ imageFileList});
    }

    onUploadRemove = () => {
        this.avatarUrl  = "";
    }

    afterClose = () => {
        this.avatarUrl = ""
        this.isUpdateAvatar = false
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {displayName, phoneNumber, bankAccount, bankName, identify, address, avatar, visible } = this.props.data;
        let listFile = []
        if(!this.isUpdateAvatar){
            if(avatar){
                this.avatarUrl = avatar
                listFile.push(avatar)
            }
        }else{
           const { imageFileList } = this.state
            if(imageFileList.length > 0){
                listFile.push(imageFileList[0])
            }
        }
        return (<Modal
            title={"Cập nhật người dùng"}
            visible={visible}
            confirmLoading={this.props.loading}
            cancelText="Đóng"
            destroyOnClose={true}
            afterClose={this.afterClose}
            onCancel={this.props.onCancel}
            onOk={this.handleUpdate}
            okText="Cập Nhật">
                <Form>
                    <Item {...formItemLayout} label='Ảnh đại diện'>
                        <UploadAvatarImage
                            handleUploadImages={this.handleUploadImages} 
                            onUploadComplete={this.onUploadComplete} 
                            fileList={listFile}
                            onUploadRemove={this.onUploadRemove}
                            editMode={true}
                        />
                    </Item>
                    
                    <Item {...formItemLayout} label='Họ và Tên'>{
                        getFieldDecorator('displayName', {
                            initialValue: displayName,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="displayName" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Số điện thoại'>{
                        getFieldDecorator('phoneNumber', {
                            initialValue: phoneNumber,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="Sô điện thoại" readOnly={true} />)}</Item>

                    <Item {...formItemLayout} label='CMND/CCCD'>{
                        getFieldDecorator('identify', {
                            initialValue: identify,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="CMND/CCCD" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Địa chỉ'>{
                        getFieldDecorator('address', {
                            initialValue: address,
                            rules: [{ required: true, message: '' }]
                    })(<Input placeholder="Địa chỉ" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Số TK ngân hàng'>{
                        getFieldDecorator('bankAccount', {
                            initialValue: bankAccount,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Tài khoản ngân hàng" readOnly={false} />)}</Item>

                    <Item {...formItemLayout} label='Tên ngân hàng'>{
                        getFieldDecorator('bankName', {
                            initialValue: bankName,
                            rules: [{ required: false, message: '' }]
                    })(<Input placeholder="Tên ngân hàng" readOnly={false} />)}</Item>

                </Form>
          </Modal>);
    }

}
export default Form.create()(UpdateUser);