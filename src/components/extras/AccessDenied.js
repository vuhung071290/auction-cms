import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

class AccessDenied extends Component {
    render() {
        return (<Result
            status="403"
            title="You don't have enough permission to access this feature"
            subTitle="Please contact the development team or an authorized user for permission."
            extra={<Link to="/"><Button type="primary">Home</Button></Link>}
        />);
    }
}
export default AccessDenied;
