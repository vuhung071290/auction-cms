import React, { Component } from 'react';
import { Layout, Col, Row, Alert, Icon, Typography } from 'antd';
import { connect } from 'react-redux';
import MenuBar from '../components/MenuBar';
import Container from '../components/Container';
import HomeCard from '../components/extras/HomeCard';
import { RecentHomeItems } from '../helpers/config/homeItemsConfig';
import { Link } from 'react-router-dom';
import { wasReadAnnouncement, setReadAnnouncement } from '../helpers/services';

const { Title } = Typography;

class HomePage extends Component {


    isShowAnnouncement = () => {
        const { config } = this.props;
        if (config == null || wasReadAnnouncement(config.version)) {
            return false;
        }
        return true;
    }

    handleCloseAnnouncement = (e) => {
        const { config } = this.props;
        if (config != null) {
            setReadAnnouncement(config.version);
        }
    }

    render() {
        const { config } = this.props;
        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home"]}>
                <Layout className="white">
                    <div>{
                        this.isShowAnnouncement() ? <Alert
                            className="home-announcement"
                            message="New version released!"
                            description={<span>We are very excited to announce that the new version <b>{config.version}</b> has been released. Click <Link to="/admin/change-log">here</Link> to view changes.</span>}
                            onClose={this.handleCloseAnnouncement}
                            type="info"
                            icon={<Icon type="bulb" theme="twoTone" twoToneColor="#FFC53D" />}
                            showIcon
                            closable
                        /> : null
                    }</div>
                    
                    <Title level={4}>Quick Access</Title>
                    
                    <Row gutter={10}>
                        {
                            RecentHomeItems.map((e) => <Col xs={24} sm={12} md={12} lg={8} xl={6} key={e.link} style={{ marginBottom: 10 }} span={8}><HomeCard {...e} /></Col>)
                        }
                    </Row>
                </Layout>
            </Container>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    config: state.config
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
