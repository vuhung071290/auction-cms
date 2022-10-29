import React, { Component } from 'react';
import { Modal ,Button } from 'antd';

const { confirm } = Modal;

class SendSmsOTP extends Component {

    handleShowConfirm = () => {
        const { onOk, onCancel, data } = this.props;
        confirm({
            title: 'Active Người Dùng',
            content: <div>
                <p>Bạn muốn gởi OTP SMS để <b>{data.userName}</b> active phải không? </p>
            </div>,
            onOk,
            onCancel,
            okButtonProps: { type: "primary", icon: "caret-right" },
            okText: "Gởi",
            cancelText: "Huỷ"
          });
    }

    render() {
        return (<Button className="mr5" icon="caret-right" type="primary" disabled={this.props.disabled} onClick={this.handleShowConfirm}> Gởi OTP </Button>);
    }
}

export default SendSmsOTP;
