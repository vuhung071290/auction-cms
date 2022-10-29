import React, { Component } from 'react';
import { Modal ,Button } from 'antd';

const { confirm } = Modal;

class DeleteProperty extends Component {

    handleShowConfirm = () => {
        const { onOk, onCancel } = this.props;
        confirm({
            title: 'Bạn đang xóa tài sản ...',
            content: <div>
                <p>Tài sản sẽ bị xóa vĩnh viễn.</p>
                <p>Bạn có chắc muốn xóa tài sản?</p>
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

export default DeleteProperty;
