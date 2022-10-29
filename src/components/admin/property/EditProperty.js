import React, {Component} from 'react';
import {Form, Input, Modal} from 'antd';
import {formItemLayout} from '../../../helpers/config/formConfig'
import UploadImage from "../../common/UploadImage";
import UploadFile from "../../common/UploadFile";

const { Item } = Form;

class EditProperty extends Component {

    state = {
        imageFileListChanged: false,
        imageFileList: [],
        registrationFormsFileListChanged: false,
        registrationFormsFileList: [],
        auctionMinutesFileListChanged: false,
        auctionMinutesFileList: [],
        contractsFileListChanged: false,
        contractsFileList: [],
    };

    handleEditProperty = (e) => {
        this.props.form.validateFields((err, values) => {
            const { propertyId } = this.props.data;
            const { name, description } = values;
            let editImages = this.state.imageFileListChanged ? JSON.stringify(this.state.imageFileList) : this.props.data.images
            let editRegistrationForms = this.state.registrationFormsFileListChanged ? JSON.stringify(this.state.registrationFormsFileList) : this.props.data.registrationForms
            let editAuctionMinutes = this.state.auctionMinutesFileListChanged ? JSON.stringify(this.state.auctionMinutesFileList) : this.props.data.auctionMinutes
            let editContracts = this.state.contractsFileListChanged ? JSON.stringify(this.state.contractsFileList) : this.props.data.contracts
            this.setState({
                selectPropertyId: '',
            })
            if (!err) {
                this.props.handleEditProperty(propertyId, name, description, editImages, editRegistrationForms, editAuctionMinutes, editContracts);
            }
        });
    }

    handleUploadImages = (imageFileList) => {
        this.setState({ imageFileListChanged : true});
        this.setState({ imageFileList});
    }

    handleUploadRegistrationForms = (registrationFormsFileList) => {
        this.setState({ registrationFormsFileListChanged : true});
        this.setState({ registrationFormsFileList});
    }

    handleUploadAuctionMinutes = (auctionMinutesFileList) => {
        this.setState({ auctionMinutesFileListChanged : true});
        this.setState({ auctionMinutesFileList});
    }

    handleUploadContracts = (contractsFileList) => {
        this.setState({ contractsFileListChanged : true});
        this.setState({ contractsFileList});
    }

    render() {
        const { data, form } = this.props;
        const { getFieldDecorator } = form;

        const { name, description, images, registrationForms, auctionMinutes, contracts} = data;

        return (<Modal
            title="Cập nhật tài sản"
            visible={this.props.visible}
            onOk={this.handleEditProperty}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Update"
          >
            <Form>
                <Item {...formItemLayout} label='Tên tài sản'>{
                    getFieldDecorator('name', {
                        initialValue: name,
                        rules: [{ required: true, message: 'Vui lòng nhập tên tài sản!' }]
                })(<Input placeholder="Tên tài sản" />)}</Item>
                <Item {...formItemLayout} label='Mô tả tài sản'>{
                    getFieldDecorator('description', {
                        initialValue: description,
                        rules: [{ required: true, message: 'Vui lòng nhập mô tả tài sản!' }]
                })(<Input placeholder="Mô tả tài sản" />)}</Item>
                <Item {...formItemLayout} label='Hình ảnh'>
                    <UploadImage handleUploadImages={this.handleUploadImages} fileList={images === undefined ? [] : JSON.parse(images)} /></Item>
                <Item {...formItemLayout} label='Phiếu đăng ký'>
                    <UploadFile handleUploadFiles={this.handleUploadRegistrationForms} fileList={registrationForms === undefined ? [] : JSON.parse(registrationForms)} /></Item>
                <Item {...formItemLayout} label='Biên bản đấu giá'>
                    <UploadFile handleUploadFiles={this.handleUploadAuctionMinutes} fileList={auctionMinutes === undefined ? [] : JSON.parse(auctionMinutes)} /></Item>
                <Item {...formItemLayout} label='Hợp đồng mua/thuê'>
                    <UploadFile handleUploadFiles={this.handleUploadContracts} fileList={contracts === undefined ? [] : JSON.parse(contracts)} /></Item>

            </Form>
          </Modal>);
    }
}

export default Form.create()(EditProperty);
