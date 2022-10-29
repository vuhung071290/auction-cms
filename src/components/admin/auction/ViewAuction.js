import React, {Component} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Select, Button} from 'antd';
import {formItemLayout} from '../../../helpers/config/formConfig'
import moment from 'moment';
import {getProperty} from "../../../helpers/services";
import {noti} from "../../../helpers/utils";
import ViewProperty from "../property/ViewProperty";

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

class ViewAuction extends Component {

    state = {
        viewPropertyData: {},
        viewPropertyModalVisible: false,
        viewPropertyLoading: false,
    }

    handleOpenViewProperty = (row) => {
        this.setState({
            viewPropertyLoading: true
        }, async () => {
            try {
                let res = await getProperty(row.propertyId);
                this.setState({
                    viewPropertyLoading: false,
                    viewPropertyModalVisible: true,
                    viewPropertyData: res.data.data,
                });
            } catch (err) {
                console.log(err.response);
                noti.error(err.response.data.message);
                this.setState({ viewPropertyLoading: false });
            }
        });
    }

    handleCloseViewProperty = () => {
        this.setState({
            viewPropertyLoading: false,
            viewPropertyModalVisible: false,
            viewPropertyData: {}
        });
    }

    render() {
        const { data, form } = this.props;

        const { getFieldDecorator } = form;
        const dateFormat = 'DD/MM/YYYY HH:mm';
        const timeFormat = 'HH:mm';
        const { propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate, startAuctionDate, endAuctionDate, status} = data;
        return (<Modal
            title="Xem chi tiết phiên đấu giá"
            visible={this.props.visible}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            cancelText="Đóng"
            okButtonProps={{ style: { display: 'none' } }}
            width={600}
          >
            <Form>
                <Item {...formItemLayout} label='Mã tài sản'>{
                    getFieldDecorator('propertyId', {
                        initialValue: propertyId,
                    })(<Button style={{ padding: '0px 0px 0px 0px', }} type="link" onClick={() => { this.handleOpenViewProperty({propertyId}); }}>{propertyId}</Button>)}</Item>
                <Item {...formItemLayout} label='Tên phiên đấu giá'>{
                    getFieldDecorator('name', {
                        initialValue: name,
                    })(<Input placeholder="Name" readOnly={true} />)}</Item>
                <Item {...formItemLayout} label='Mô tả phiên đấu giá'>{
                    getFieldDecorator('description', {
                        initialValue: description,
                    })(<Input placeholder="Description" readOnly={true} />)}</Item>
                <Item {...formItemLayout} label='Phương thức đấu giá'>{
                    getFieldDecorator('auctionMethod', {
                        initialValue: auctionMethod + "",
                    })(<Select open={false}>
                        <Option value="0">Trả giá lên và liên tục</Option>
                        <Option value="1">Trả giá lên</Option>
                    </Select>)}</Item>
                <Item {...formItemLayout} label="Phí đăng ký">{
                    getFieldDecorator('registerFee', {
                        initialValue: registerFee,
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} readOnly={true} />)}</Item>

                <Item {...formItemLayout} label="Phí ứng trước">{
                    getFieldDecorator('depositFee', {
                        initialValue: depositFee,
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} readOnly={true} />)}</Item>

                <Item {...formItemLayout} label="Giá khởi điểm">{
                    getFieldDecorator('startPrice', {
                        initialValue: startPrice,
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} readOnly={true} />)}</Item>
                <Item {...formItemLayout} label="Bước giá">{
                    getFieldDecorator('stepPrice', {
                        initialValue: stepPrice,
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} readOnly={true} />)}</Item>
                <Item {...formItemLayout} label='Thời gian đăng ký'>{
                    getFieldDecorator('registerDateRange', {
                        initialValue: [moment(moment(startRegisterDate), dateFormat), moment(moment(endRegisterDate), dateFormat)]
                    })(<RangePicker onCalendarChange={this.onCalendarChange}
                                    showTime={{format: timeFormat}}
                                    format={dateFormat}
                                    placeholder={['Start Time', 'End Time']} open={false} />)}</Item>
                <Item {...formItemLayout} label='Thời gian đấu giá'>{
                    getFieldDecorator('auctionDateRange', {
                        initialValue: [moment(moment(startAuctionDate), dateFormat), moment(moment(endAuctionDate), dateFormat)]
                    })(<RangePicker onCalendarChange={this.onCalendarChange}
                                    showTime={{format: timeFormat}}
                                    format={dateFormat}
                                    placeholder={['Start Time', 'End Time']} open={false} />)}</Item>
                <Item {...formItemLayout} label='Trạng thái đấu giá'>{
                    getFieldDecorator('status', {
                        initialValue: status + "",
                    })(<Select  open={false}>
                        <Option value="0">Chưa đấu giá</Option>
                        <Option value="1">Đã lên lịch đấu giá</Option>
                        <Option value="2">Đang đấu giá</Option>
                        <Option value="3">Đã hoàn thành đấu giá</Option>
                        <Option value="4">Đã hủy đấu giá</Option>
                    </Select>)}</Item>
                <ViewProperty data={this.state.viewPropertyData}
                              onCancel={this.handleCloseViewProperty}
                              visible={this.state.viewPropertyModalVisible}
                              loading={this.state.viewPropertyLoading}/>
            </Form>
          </Modal>);
    }
}

export default Form.create()(ViewAuction);
