import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

class ServiceUnavailable extends Component {
    render() {
        const { title, description } = this.props;
        return (<Result
            status="500"
            title={ title || "Service Unavailable"}
            subTitle={description || "Please check with administrator and try again later."}
            extra={<Link to="/"><Button type="primary">Home</Button></Link>}
        />);
    }
}
export default ServiceUnavailable;
