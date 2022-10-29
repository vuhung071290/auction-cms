import React, { Component } from 'react';
import {Upload, Modal, Form} from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class ViewImage extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    showUploadList = {
        showPreviewIcon : true,
        showRemoveIcon: false,
        showDownloadIcon: false,
    }

    handleCancel = () => {this.setState({ previewVisible: false });}

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    componentDidMount() {
        const { fileList } = this.props;
        this.setState({ fileList })
    }

    render() {
        const { previewVisible, previewImage } = this.state;
        const { fileList } = this.props;
        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    showUploadList={this.showUploadList}
                >
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default Form.create()(ViewImage);