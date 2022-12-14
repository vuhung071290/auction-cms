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
            title="C???p nh???t phi??n ?????u gi??"
            visible={this.props.visible}
            onOk={this.handleEditAuction}
            onCancel={this.handleCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="C???p nh???t"
            cancelText="H???y"
            width={600}
          >
            <Form>
                <Item {...formItemLayout} label="M?? t??i s???n">
                    <Row gutter={8}>
                        <Col span={20}>
                            {getFieldDecorator('propertyId', {
                                initialValue: selectPropertyId === '' ? propertyId : selectPropertyId,
                                rules: [{ required: true, message: 'Vui l??ng ch???n m?? t??i s???n!' }],
                            })(<Input placeholder="M?? t??i s???n" readOnly={true} />)}
                        </Col>
                        <Col span={4}>
                            <Button onClick={this.handleOpenSelectProperty} type="primary" >Ch???n</Button>
                        </Col>
                    </Row>
                    <SelectProperty onCancel={this.handleCloseSelectProperty}
                                    handleSelectProperty={this.handleSelectProperty}
                                    visible={this.state.selectPropertyModalVisible}
                                    loading={this.state.selectPropertyLoading}/>
                </Item>
                <Item {...formItemLayout} label='T??n phi??n ?????u gi??'>{
                    getFieldDecorator('name', {
                        initialValue: name,
                        rules: [{ required: true, message: 'Vui l??ng nh???p t??n phi??n ?????u gi??!' }]
                    })(<Input placeholder="T??n phi??n ?????u gi??" />)}</Item>
                <Item {...formItemLayout} label='M?? t??? phi??n ?????u gi??'>{
                    getFieldDecorator('description', {
                        initialValue: description,
                        rules: [{ required: true, message: 'Vui l??ng nh???p m?? t??? phi??n ?????u gi??!' }]
                    })(<Input placeholder="M?? t??? phi??n ?????u gi??" />)}</Item>
                <Item {...formItemLayout} label='Ph????ng th???c ?????u gi??'>{
                    getFieldDecorator('auctionMethod', {
                        initialValue: auctionMethod + "",
                        rules: [{ required: true, message: 'Vui l??ng ch???n ph????ng th???c ?????u gi??!' }]
                    })(<Select>
                        <Option value="0">Tr??? gi?? l??n v?? li??n t???c</Option>
                        <Option value="1">Tr??? gi?? l??n</Option>
                    </Select>)}</Item>
                <Item {...formItemLayout} label="Ph?? ????ng k??">{
                    getFieldDecorator('registerFee', {
                        initialValue: registerFee,
                        rules: [{ required: true, message: 'Vui l??ng ch???n ph?? ????ng k??!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label="Ph?? ???ng tr?????c">{
                    getFieldDecorator('depositFee', {
                        initialValue: depositFee,
                        rules: [{ required: true, message: 'Vui l??ng ch???n ph?? ????ng k??!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label="Gi?? kh???i ??i???m">{
                    getFieldDecorator('startPrice', {
                        initialValue: startPrice,
                        rules: [{ required: true, message: 'Vui l??ng ch???n gi?? kh???i ??i???m!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label="B?????c gi??">{
                    getFieldDecorator('stepPrice', {
                        initialValue: stepPrice,
                        rules: [{ required: true, message: 'Vui l??ng ch???n b?????c gi??!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label='Th???i gian ????ng k??'>{
                    getFieldDecorator('registerDateRange', {
                        initialValue: [moment(moment(startRegisterDate), dateFormat), moment(moment(endRegisterDate), dateFormat)],
                        rules: [{ required: true, message: 'Vui l??ng ch???n th???i gian ????ng k??!' }]
                    })(<RangePicker onCalendarChange={this.onCalendarChange}
                                    showTime={{format: timeFormat}}
                                    format={dateFormat}
                                    placeholder={['Start Time', 'End Time']} />)}</Item>

            </Form>
          </Modal>);
    }
}

export default Form.create()(EditAuction);
