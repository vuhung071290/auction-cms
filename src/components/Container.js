import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
const { Item } = Breadcrumb;

class Container extends Component {

    render() {
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {
                            this.props.breadcrumb.map(e => <Item key={e}>{e}</Item>)
                        }
                    </Breadcrumb>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                        }}
                    >
                        {
                            this.props.children
                        }
                    </Content>
                </Layout>

        );
    }
}

export default Container;
