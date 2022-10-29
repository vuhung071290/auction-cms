import React, {Component} from 'react';
import {Layout, Table} from 'antd';
import {connect} from 'react-redux';
import {
    changeAuctionHistoricalDateSearch,
    changeAuctionHistoricalPage,
    changeAuctionHistoricalSearch,
    changeAuctionHistoricalSize,
    loadAuctionHistoricalList
} from '../actions/auctionhistorical';
import moment from "moment";
import MenuBar from "../components/MenuBar";
import Container from "../components/Container";

class AuctionHistorical extends Component {

    columns = [
        {
            title: 'Mã người đấu giá',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Tên người đấu giá',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Giá đã đấu',
            dataIndex: 'bidPrice',
            key: 'bidPrice',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text, row) => <span>{moment(row.createdDate).format("DD/MM/YYYY HH:mm:ss")}</span>
        },
    ];

    handleTableChange = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination;
        let auctionId = this.props.match.params.auctionId
        this.props.changeAuctionHistoricalPage(current);
        this.props.changeAuctionHistoricalSize(pageSize);
        this.props.loadAuctionHistoricalList(auctionId, current, pageSize);
    }

    hasPermissionView = () => {
        const {permissionSet} = this.props.auth;
        return permissionSet.has("AUCTION_MNG_VIEW")
    }

    componentDidMount() {
        const {page, size} = this.props.auctionhistorical;
        let auctionId = this.props.match.params.auctionId
        this.props.loadAuctionHistoricalList(auctionId, page, size);
    }

    render() {
        const { list, loading, total, page, size } = this.props.auctionhistorical;

        return (<Layout className="main">
            <MenuBar />
            <Container breadcrumb={["Home", "Auction", "Auction Historical"]}>
                <div>
                    <Table columns={this.columns}
                           dataSource={list}
                           onChange={this.handleTableChange}
                           pagination={{
                               total,
                               size: "large",
                               showSizeChanger: true,
                               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                               pageSize: size,
                               scroll: { x: 2000},
                               current: page
                           }}
                           loading={loading}
                           size="small"
                           rowKey={(record) => record.auctionHistoricalId}
                           bordered
                    />
                </div>
            </Container>
        </Layout>);
    }
}

const mapStateToProps = (state) => ({
    auctionhistorical: state.auctionhistorical,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changeAuctionHistoricalPage: (page) => dispatch(changeAuctionHistoricalPage(page)),
    changeAuctionHistoricalSearch: (search) => dispatch(changeAuctionHistoricalSearch(search)),
    changeAuctionHistoricalDateSearch: (startDateSearch, endDateSearch) => dispatch(changeAuctionHistoricalDateSearch(startDateSearch, endDateSearch)),
    changeAuctionHistoricalSize: (size) => dispatch(changeAuctionHistoricalSize(size)),
    loadAuctionHistoricalList: (auctionId, page, size) => dispatch(loadAuctionHistoricalList(auctionId, page, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuctionHistorical);
