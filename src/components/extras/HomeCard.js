import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
class HomeCard extends Component {

    render() {
        const { icon, title, description, color, link } = this.props;
        return (<Link to={link}><Card className="home-card" hoverable>
            <Meta avatar={<Avatar icon={icon} 
                    size={64} 
                    style={{ background: color }} />} 
                title={title}
                description={description} />
        </Card></Link>);
    }
}

export default HomeCard;
