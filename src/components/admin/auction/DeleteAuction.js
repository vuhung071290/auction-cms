import React, { Component } from 'react';
import { Modal ,Button } from 'antd';

const { confirm } = Modal;

class DeleteAuction extends Component {

    handleShowConfirm = () => {
        const { onOk, onCancel } = this.props;
        confirm({
            title: 'Bạn đang xóa phiên đấu giá ...',
            content: <div>
                <p>Phiên đấu giá sẽ bị xóa vĩnh viễn.</p>
                <p>Bạn có chắc muốn xóa phiên đấu giá?</p>
            </div>,
            onOk,
            onCancel,
            okButtonProps: { type: "danger", icon: "delete" },
            okText: "Xóa",
            cancelText: "Hủy"
          });
    }

    render() {
        return (<Button className="mr5" icon="delete" type="danger" disabled={this.props.disabled} onClick={this.handleShowConfirm} />);
    }
}

export default DeleteAuction;
