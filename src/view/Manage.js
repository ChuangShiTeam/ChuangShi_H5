import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Badge, Toast} from 'antd-mobile';

import http from '../util/http';
import constant from "../util/constant";

class Manage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '管理中心';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/my/find',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'my/fetch',
                    data: data
                });

                Toast.hide();
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleTrade(trade_flow) {
        this.props.dispatch(routerRedux.push({
            pathname: '/trade/index/' + trade_flow,
            query: {}
        }));
    }

    handleStock() {
        this.props.dispatch(routerRedux.push({
            pathname: '/stock/index',
            query: {}
        }));
    }

    handleMemberAddress() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/address/index/list',
            query: {}
        }));
    }

    handleQrcode() {
        this.props.dispatch(routerRedux.push({
            pathname: '/qrcode',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        const data = Array.from(new Array(4)).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: `name${i}`,
        }));

        return (
            <div>
                <div className="manage-member">
                    <div className="manage-member-avatar">
                        <img src={this.props.my.user_avatar} alt=""/>
                    </div>
                    <div className="manage-member-name">
                        {this.props.my.user_name}
                    </div>
                </div>
                <List className="no-padding-list">
                    <Item
                    >
                        <div className="manage-item" onClick={this.handleTrade.bind(this, 'WAIT_PAY')}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/pay.svg')} alt=""/>
                            </Badge>
                            <div className="order-item-text">订单管理</div>
                        </div>
                        <div className="manage-item" onClick={this.handleTrade.bind(this, 'WAIT_PAY')}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/pay.svg')} alt=""/>
                            </Badge>
                            <div className="order-item-text">发货管理</div>
                        </div>
                    </Item>
                    <Item
                    >
                        <div className="manage-item" onClick={this.handleTrade.bind(this, 'WAIT_PAY')}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/pay.svg')} alt=""/>
                            </Badge>
                            <div className="order-item-text">我的代理</div>
                        </div>
                        <div className="manage-item" onClick={this.handleTrade.bind(this, 'WAIT_PAY')}>
                            <img src={require('../assets/svg/pay.svg')} alt=""/>
                            <div className="order-item-text">授权书</div>
                        </div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        thumb={require('../assets/svg/location.svg')} arrow="horizontal"
                        onClick={this.handleMemberAddress.bind(this)}
                    >
                        我的地址
                    </Item>
                    {
                        this.props.my.member_status ?
                            <Item
                                thumb={require('../assets/svg/qr_code.svg')} arrow="horizontal"
                                onClick={this.handleQrcode.bind(this)}
                            >
                                我的二维码
                            </Item>
                            :
                            ''
                    }
                </List>
                <WhiteSpace size="lg"/>
            </div>
        );
    }
}

export default connect(({my}) => ({my}))(Manage);
