import React, { Component } from 'react';
import { Modal ,Button } from 'antd';

const { confirm } = Modal;

class DeleteAccount extends Component {

    handleShowConfirm = () => {
        const { onOk, onCancel, data } = this.props;
        confirm({
            title: 'You are about permanently deleting an account ...',
            content: <div>
                <p>All infomation of this account will be deleted except:</p>
                <ul>
                    <li>Account Activity</li>
                </ul>
            <p>If you want to prevent <b>{data.domainName}</b> from using this tool only, consider to make <b>{data.domainName}</b> inactive.</p>
            <p>Are you sure to delete this account?</p>
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

export default DeleteAccount;
