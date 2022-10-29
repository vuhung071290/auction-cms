import React, {Component} from 'react';
import {Form, Input, Modal} from 'antd';
import {formItemLayout} from '../../../helpers/config/formConfig'
import ViewImage from "../../common/ViewImage";
import ViewFile from "../../common/ViewFile";

const { Item } = Form;

class ViewProperty extends Component {

    render() {
        const { data, form } = this.props;
        const { getFieldDecorator } = form;

        const { name, description, images, registrationForms, auctionMinutes, contracts} = data;

        return (<Modal
            title="Xem chi tiết tài sản"
            visible={this.props.visible}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            cancelText="Close"
            okButtonProps={{ style: { display: 'none' } }}
          >
            <Form>
                <Item {...formItemLayout} label='Tên tài sản'>{
                    getFieldDecorator('name', {
                        initialValue: name,
                })(<Input readOnly={true} />)}</Item>
                <Item {...formItemLayout} label='Mô tả tài sản'>{
                    getFieldDecorator('description', {
                        initialValue: description,
                })(<Input readOnly={true} />)}</Item>
                {(contracts === undefined || images === "[]") ? "" :
                    <Item {...formItemLayout} label='Hình ảnh'>
                        <ViewImage fileList={images === undefined ? [] : JSON.parse(images)}/></Item>
                }
                {(contracts === undefined || registrationForms === "[]") ? "" :
                    <Item {...formItemLayout} label='Phiếu đăng ký'>
                        <ViewFile
                            fileList={registrationForms === undefined ? [] : JSON.parse(registrationForms)}/></Item>
                }
                {(contracts === undefined || auctionMinutes === "[]") ? "" :
                    <Item {...formItemLayout} label='Biên bản đấu giá'>
                        <ViewFile fileList={auctionMinutes === undefined ? [] : JSON.parse(auctionMinutes)}/></Item>
                }
                {(contracts === undefined || contracts === "[]") ? "" :
                    <Item {...formItemLayout} label='Hợp đồng mua/thuê'>
                        <ViewFile fileList={contracts === undefined ? [] : JSON.parse(contracts)} /></Item>
                }
            </Form>
          </Modal>);
    }
}

export default Form.create()(ViewProperty);
