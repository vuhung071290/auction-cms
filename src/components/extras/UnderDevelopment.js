import React, { Component } from 'react';
import { Result } from 'antd';

class UnderDevelopment extends Component {
    render() {
        return (<Result
            status="500"
            title="Feature is under development"
            subTitle="This feature is currently under development and will be released soon."
        />);
    }
}
export default UnderDevelopment;
