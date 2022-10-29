import React, { Component } from 'react';

class ActivityDescription extends Component {

    render() {
        const { data } = this.props;
        if (typeof data === 'object') {
            let obj = JSON.parse(data);
            let keys = Object.keys(obj);
            return (<div>
                {
                    keys.map(e => <div><b>{e}</b>: {
                        Array.isArray(obj[e])
                        ? obj[e].join(", ")
                        : typeof obj[e] === 'object' && obj[e] !== null
                        ? JSON.stringify(obj[e])
                        : obj[e]
                    }</div>)
                }
            </div>);
        } else {
            return (<div>{data}</div>);
        }
    }
}
export default ActivityDescription;
