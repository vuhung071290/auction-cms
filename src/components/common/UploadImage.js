import React, { Component } from 'react';
import {Upload, Icon, Modal, Form, Button} from 'antd';
import {uploadImage} from "../../helpers/services";
import {noti} from "../../helpers/utils";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class UploadImage extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        uploading: false,
        progress: 0,
    };

    showUploadList = {
        showPreviewIcon : true,
        showRemoveIcon: true,
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

    uploadAction = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        this.setState({ uploading: true });
        const fmData = new FormData();
        fmData.append("file", file);
        const config = {
            // headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                this.setState({progress: percent});
                if (percent === 100) {
                    setTimeout(() => this.setState({progress: 0}), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };

        try {
            const res = await uploadImage(fmData, config);
            onSuccess(res.data);
            noti.success("Upload image successfully!")
            this.setState({ uploading: false });
        } catch (err) {
            onError({ err });
            console.log(err)
            noti.error("Upload image failed!")
            this.setState({ uploading: false });
        }
    };

    handleChange = ({ file, fileList}) => {
        if(file.status === "done"){
            let modifyFileList = fileList.filter(ele => ele.uid !== file.uid)
            modifyFileList.push({
                uid: file.response.uid,
                name: file.name,
                status: file.status,
                url: file.response.link
            })
            this.setState({ fileList: modifyFileList })
            this.props.handleUploadImages(modifyFileList)
        } else {
            this.setState({ fileList })
            this.props.handleUploadImages(fileList)
        }
    }

    componentDidMount() {
        const { fileList } = this.props;
        this.setState({ fileList })
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <Button loading={this.state.uploading}>
                <Icon type="upload" /> Upload
            </Button>
        );
        return (
            <div className="clearfix">
                <Upload
                    accept="image/*"
                    customRequest={this.uploadAction}
                    listType="picture"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    showUploadList={this.showUploadList}
                    disabled={this.state.uploading}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default Form.create()(UploadImage);