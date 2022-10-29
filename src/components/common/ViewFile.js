import React, { Component } from 'react';
import {Upload, Form} from 'antd';

class ViewFile extends Component {
    state = {
        fileList: [],
    };

    showUploadList = {
        showPreviewIcon : false,
        showRemoveIcon: false,
        showDownloadIcon: false,
    }

    componentDidMount() {
        const { fileList } = this.props;
        this.setState({ fileList })
    }

    render() {
        const { fileList } = this.props;
        return (
            <div className="clearfix">
                <Upload
                    fileList={fileList}
                    showUploadList={this.showUploadList}
                >
                </Upload>
            </div>
        );
    }
}

export default Form.create()(ViewFile);