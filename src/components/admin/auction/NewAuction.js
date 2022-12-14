import React, {Component} from 'react';
import {Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select} from 'antd';
import {formItemLayout} from '../../../helpers/config/formConfig'
import moment from 'moment';
import SelectProperty from '../../../components/admin/property/SelectProperty';

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

class NewAuction extends Component {

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

    handleCreateNew = (e) => {
        this.props.form.validateFields((err, values) => {
            const { propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, registerDateRange } = values;
            let startRegisterDate = registerDateRange[0].unix()*1000
            let endRegisterDate = registerDateRange[1].unix()*1000
            this.setState({
                selectPropertyId: '',
            })
            if (!err) {
                this.props.handleCreateNew(propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate);
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
        const { getFieldDecorator } = this.props.form;
        const { selectPropertyId  } =  this.state;
        const dateFormat = 'DD/MM/YYYY HH:mm';
        const timeFormat = 'HH:mm';
        let defaultStartRegisterDate = moment(moment().utc(true).format(dateFormat), dateFormat)
        let defaultEndRegisterDate = moment(moment().utc(true).add(1, 'days').format(dateFormat), dateFormat)

        return (<Modal
            title="Th??m m???i phi??n ?????u gi??"
            visible={this.props.visible}
            onOk={this.handleCreateNew}
            onCancel={this.handleCancel}
            confirmLoading={this.props.loading}
            destroyOnClose={true}
            okText="Th??m m???i"
            cancelText="H???y"
            width={600}
          >
            <Form>
                <Item {...formItemLayout} label="M?? t??i s???n">
                    <Row gutter={8}>
                        <Col span={20}>
                            {getFieldDecorator('propertyId', {
                                initialValue: selectPropertyId,
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
                        rules: [{ required: true, message: 'Vui l??ng nh???p t??n phi??n ?????u gi??!' }]
                })(<Input placeholder="T??n phi??n ?????u gi??" />)}</Item>
                <Item {...formItemLayout} label='M?? t??? phi??n ?????u gi??'>{
                    getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Vui l??ng nh???p m?? t??? phi??n ?????u gi??!' }]
                })(<Input placeholder="M?? t??? phi??n ?????u gi??" />)}</Item>
                <Item {...formItemLayout} label='Ph????ng th???c ?????u gi??'>{
                    getFieldDecorator('auctionMethod', {
                        initialValue: "0",
                        rules: [{ required: true, message: 'Vui l??ng ch???n ph????ng th???c ?????u gi??!' }]
                    })(<Select>
                        <Option value="0">Tr??? gi?? l??n v?? li??n t???c</Option>
                        <Option value="1">Tr??? gi?? l??n</Option>
                    </Select>)}</Item>
                <Item {...formItemLayout} label="Ph?? ????ng k??">{
                    getFieldDecorator('registerFee', {
                        initialValue: 100000,
                        rules: [{ required: true, message: 'Vui l??ng ch???n ph?? ????ng k??!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>

                <Item {...formItemLayout} label="Ph?? ???ng tr?????c">{
                    getFieldDecorator('depositFee', {
                        initialValue: 100000,
                        rules: [{ required: true, message: 'Vui l??ng ch???n ph?? ???ng tr?????c!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>

                <Item {...formItemLayout} label="Gi?? kh???i ??i???m">{
                    getFieldDecorator('startPrice', {
                        initialValue: 100000,
                        rules: [{ required: true, message: 'Vui l??ng ch???n gi?? kh???i ??i???m!' }]
                })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label="B?????c gi??">{
                    getFieldDecorator('stepPrice', {
                        initialValue: 100000,
                        rules: [{ required: true, message: 'Vui l??ng ch???n b?????c gi??!' }]
                    })(<InputNumber min={100000} step={100000} style={{ width: 140 }} />)}</Item>
                <Item {...formItemLayout} label='Th???i gian ????ng k??'>{
                    getFieldDecorator('registerDateRange', {
                        initialValue: [defaultStartRegisterDate, defaultEndRegisterDate],
                        rules: [{ required: true, message: 'Vui l??ng ch???n th???i gian ????ng k??!' }]
                    })(<RangePicker onCalendarChange={this.onCalendarChange}
                                    showTime={{format: timeFormat}}
                                    format={dateFormat}
                                    placeholder={['Start Time', 'End Time']} />)}</Item>

            </Form>
          </Modal>);
    }
}

export default Form.create()(NewAuction);
