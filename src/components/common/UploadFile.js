import React, { Component } from 'react';
import {Upload, Icon, Form, Button} from 'antd';
import {uploadFile} from "../../helpers/services";
import {noti} from "../../helpers/utils";

class UploadFile extends Component {
    state = {
        fileList: [],
        uploading: false,
        progress: 0,
    };

    showUploadList = {
        showPreviewIcon : false,
        showRemoveIcon: true,
        showDownloadIcon: false,
    }

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
            const res = await uploadFile(fmData, config);
            onSuccess(res.data);
            noti.success("Upload file successfully!")
            this.setState({ uploading: false });
        } catch (err) {
            onError({ err });
            console.log(err)
            noti.error("Upload file failed!")
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
            this.props.handleUploadFiles(modifyFileList)
        } else {
            this.setState({ fileList })
            this.props.handleUploadFiles(fileList)
        }
    }

    componentDidMount() {
        const { fileList } = this.props;
        this.setState({ fileList })
    }

    render() {
        const { fileList } = this.state;
        const uploadButton = (
            <Button loading={this.state.uploading}>
                <Icon type="upload" /> Upload
            </Button>
        );
        return (
            <div className="clearfix">
                <Upload
                    customRequest={this.uploadAction}
                    fileList={fileList}
                    onChange={this.handleChange}
                    showUploadList={this.showUploadList}
                    headers={this.headers}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
            </div>
        );
    }
}

export default Form.create()(UploadFile);