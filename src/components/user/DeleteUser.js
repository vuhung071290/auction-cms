import React, { Component } from 'react';
import { Modal ,Button } from 'antd';

const { confirm } = Modal;

class DeleteUser extends Component {

    handleShowConfirm = () => {
        const { onOk, onCancel, data } = this.props;
        confirm({
            title: 'Bạn muốn xoá người dùng ' + data.displayName,
            content: <div>
                <p>Tất cả thông tin của <b>{data.displayName}</b> sẽ bị mất</p>
                <p>Bạn chắc chắn muốn xoá <b>{data.displayName}</b>?</p>
            </div>,
            onOk,
            onCancel,
            okButtonProps: { type: "danger", icon: "delete" },
            okText: "Delete"
          });
    }

    render() {
        return (<Button className="mr5" icon="delete" type="danger" disabled={this.props.disabled} onClick={this.handleShowConfirm} />);
    }
}

export default DeleteUser;
