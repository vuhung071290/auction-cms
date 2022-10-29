import React, { Component } from 'react';
import { Layout, Result, Button } from 'antd';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

class Page404 extends Component {

    render() {
        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Page Not Found"]}>
                <Result
                    status="404"
                    title="Page Not Found"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to="/"><Button type="primary">Home</Button></Link>}
                />
            </Container>
        </Layout>);
    }
}

export default Page404;
