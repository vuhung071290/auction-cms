import React, { Component } from 'react';
import { Layout, Card, Tag, Timeline, Icon } from 'antd';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import { ChangeLogConfig } from '../helpers/config/changeLogConfig';
const { Item } = Timeline;

class ChangeLogPage extends Component {

    render() {
        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Administration", "Change Log"]}>
                <div className="change-log-container">
                    <Timeline className="change-log-content">
                        {
                            ChangeLogConfig.map((e) => e.latest
                                ? <Item dot={<Icon type="check-circle" />} color="green">
                                    <Card style={{ marginTop: 10 }}
                                        title={<span>{e.version} <Tag color="#2db7f5">LATEST</Tag></span>}
                                        hoverable={true} key={e.version}>{e.content}</Card>
                                </Item>
                                : <Item><Card style={{ marginTop: 10 }}
                                    title={e.version} hoverable={true} key={e.version}>{e.content}</Card></Item>)
                        }
                    </Timeline>

                </div>
            </Container>
        </Layout>);
    }
}

export default ChangeLogPage;
