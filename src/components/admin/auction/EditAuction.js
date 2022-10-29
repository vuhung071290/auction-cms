import React, { Component } from 'react';
import {Modal, Input, Form, InputNumber, Select, DatePicker, Row, Col, Button} from 'antd';
import {formItemLayout} from '../../../helpers/config/formConfig'
import moment from 'moment';
import SelectProperty from "../property/SelectProperty";

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

class EditAuction extends Component {

    state = {
        selectPropertyModalVisible: false,
        selectPropertyLoading: false,
        selectPropertyId: '',
    }

    handleOpenSelectProperty = (e) => {
        this.setState({
            selectPropertyModalVisible: true
        });
    }

    handleCloseSelectProperty = (e) => {
        this.setState({
            selectPropertyLoading: false,
            selectPropertyModalVisible: false
        });
    }

    handleSelectProperty = (selectPropertyId) => {
        this.setState({
            selectPropertyId: selectPropertyId,
            selectPropertyLoading: false,
            selectPropertyModalVisible: false
        });
    }

    handleEditAuction = (e) => {
        this.props.form.validateFields((err, values) => {
            const { auctionId } = this.props.data;
            const { propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, registerDateRange } = values;
            let startRegisterDate = registerDateRange[0].unix()*1000
            let endRegisterDate = registerDateRange[1].unix()*1000
            if (!err) {
                this.props.handleEditAuction(auctionId, propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate);
            }
        });
    }

    handleCancel = (e) => {
        this.setState({
            selectPropertyId: '',
        })
        this.props.onCancel()
    }

    render() {
        const { data, form } = this.props;
        const { getFieldDecorator } = form;
        const dateFormat = 'DD/MM/YYYY HH:mm';
        const timeFormat = 'HH:mm';
        const { propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate } = data;
        const { selectPropertyId  } =  this.state;
        return (<Modal
            title="Cập nhật phiên đấu giá"
            visible={this.props.visible}
            onOk={this.handleEditAuction}
            onCancel={this.handleCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Cập nhật"
            cancelText="Hủy"
            width={600}
          >
            <Form>
                <Item {...formItemLayout} label="Mã tài sản">
                    <Row gutter={8}>
                        <Col span={20}>
                            {getFieldDecorator('propertyId', {
                                initialValue: selectPropertyId === '' ? propertyId : selectPropertyId,
                                rules: [{ required: true, message: 'Vui lòng chọn mã tài sản!' }],
                            })(<Input placeholder="Mã tài sản" readOnly={true} />)}
                        </Col>
                        <Col span={4}>
                            <Button onClick={this.handleOpenSelectProperty} type="primary" >Chọn</Button>
                        </Col>
                    </Row>
                    <SelectProperty onCancel={this.handleCloseSelectProperty}
                                    handleSelectProperty={this.handleSelectProperty}
                                    visible={this.state.selectPropertyModalVisible}
                                    loading={this.state.selectPropertyLoading}/>
                </Item>
                <Item {...formItemLayout} label='Tên phiên đấu giá'>{
                    getFieldDecorator('name', {
                        initialValue: name,
                        rules: [{ required: true, message: 'Vui lòng nhập tên phiên đấu giá!' }]
                    })(<Input placeholder="Tên phiên đấu giá" />)}</Item>
                <Item {...formItemLayout} label='Mô tả phiên đấu giá'>{
                    getFieldDecorator('description', {
                        initialValue: description,
                        rules: [{ required: true, message: 'Vui lòng nhập mô tả phiên đấu giá!' }]
                    })(<Input placeholder="Mô tả phiên đấu giá" />)}</Item>
                <Item {...formItemLayout} label='Phương thức đấu giá'>{
                    getFieldDecorator('auctionMethod', {
                        initialValue: auctionMethod + "",
                        rules: [{ required: true, message: 'Vui lòng chọn phương thức đấu giá!' }]
                    })(<Select>
                        <Option value="0">Trả giá lên và liên tục</Option>
                        <Option value="1">Trả giá lên</Option>
                    </Select>)}</Item>
                <Item {...formItemLayout} label="Phí đăng ký">{
                    getFieldDecorator('registerFee', {
                        initialValue: registerFee,
                        rules: [{ required: true, message: 'Vui lòng chọn phí đăng ký!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label="Phí ứng trước">{
                    getFieldDecorator('depositFee', {
                        initialValue: depositFee,
                        rules: [{ required: true, message: 'Vui lòng chọn phí đăng ký!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label="Giá khởi điểm">{
                    getFieldDecorator('startPrice', {
                        initialValue: startPrice,
                        rules: [{ required: true, message: 'Vui lòng chọn giá khởi điểm!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label="Bước giá">{
                    getFieldDecorator('stepPrice', {
                        initialValue: stepPrice,
                        rules: [{ required: true, message: 'Vui lòng chọn bước giá!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label='Thời gian đăng ký'>{
                    getFieldDecorator('registerDateRange', {
                        initialValue: [moment(moment(startRegisterDate), dateFormat), moment(moment(endRegisterDate), dateFormat)],
                        rules: [{ required: true, message: 'Vui lòng chọn thời gian đăng ký!' }]
                    })(<RangePicker onCalendarChange={this.onCalendarChange}
                                    showTime={{format: timeFormat}}
                                    format={dateFormat}
                                    placeholder={['Start Time', 'End Time']} />)}</Item>

            </Form>
          </Modal>);
    }
}

export default Form.create()(EditAuction);
