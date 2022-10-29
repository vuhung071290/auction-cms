import React, {Component} from 'react';
import {Form, Input, Modal} from 'antd';
import {formItemLayout} from '../../../helpers/config/formConfig'
import UploadImage from "../../common/UploadImage";
import UploadFile from "../../common/UploadFile";

const { Item } = Form;

class NewProperty extends Component {

    state = {
        imageFileList: [],
        registrationFormsFileList: [],
        auctionMinutesFileList: [],
        contractsFileList: [],
    };

    handleCreateNew = (e) => {
        this.props.form.validateFields((err, values) => {
            const { name, description } = values;
            const { imageFileList, registrationFormsFileList, auctionMinutesFileList, contractsFileList } = this.state;
            let images = JSON.stringify(imageFileList)
            let registrationForms = JSON.stringify(registrationFormsFileList)
            let auctionMinutes = JSON.stringify(auctionMinutesFileList)
            let contracts = JSON.stringify(contractsFileList)
            if (!err) {
                this.setState({
                    imageFileList : [],
                    registrationFormsFileList: [],
                    auctionMinutesFileList: [],
                    contractsFileList: [],
                });
                this.props.handleCreateNew(name, description, images, registrationForms, auctionMinutes, contracts);
            }
        });
    }

    handleUploadImages = (imageFileList) => {
        this.setState({ imageFileList});
    }

    handleUploadRegistrationForms = (registrationFormsFileList) => {
        this.setState({ registrationFormsFileList});
    }

    handleUploadAuctionMinutes = (auctionMinutesFileList) => {
        this.setState({ auctionMinutesFileList});
    }

    handleUploadContracts = (contractsFileList) => {
        this.setState({ contractsFileList});
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (<Modal
            title="Thêm mới tài sản"
            visible={this.props.visible}
            onOk={this.handleCreateNew}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Thêm mới"
            cancelText="Hủy"
            width={600}
          >
            <Form>
                <Item {...formItemLayout} label='Tên tài sản'>{
                    getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Vui lòng nhập tên tài sản!' }]
                })(<Input placeholder="Tên tài sản" />)}</Item>
                <Item {...formItemLayout} label='Mô tả tài sản'>{
                    getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Vui lòng nhập mô tả tài sản!' }]
                })(<Input placeholder="Mô tả tài sản" />)}</Item>
                <Item {...formItemLayout} label='Hình ảnh'>
                    <UploadImage handleUploadImages={this.handleUploadImages} fileList={[]}/></Item>
                <Item {...formItemLayout} label='Phiếu đăng ký'>
                    <UploadFile handleUploadFiles={this.handleUploadRegistrationForms} fileList={[]}/></Item>
                <Item {...formItemLayout} label='Biên bản đấu giá'>
                    <UploadFile handleUploadFiles={this.handleUploadAuctionMinutes} fileList={[]} /></Item>
                <Item {...formItemLayout} label='Hợp đồng mua/thuê'>
                    <UploadFile handleUploadFiles={this.handleUploadContracts} fileList={[]} /></Item>

            </Form>
          </Modal>);
    }
}

export default Form.create()(NewProperty);
