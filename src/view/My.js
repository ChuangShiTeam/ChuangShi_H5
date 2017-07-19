import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Badge, Toast} from 'antd-mobile';

import http from '../util/http';

class My extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '个人中心';

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

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        multipleLine
                    >
                        <div className="list-item-image">
                            <img src={this.props.my.user_avatar} alt=""/>
                        </div>
                        <div className="list-item-text">
                            {this.props.my.user_name}
                        </div>
                        <div className="list-item-brief">
                            {
                                this.props.my.member_level_name === '' ?
                                    <span style={{color: '#a72025'}}>待审核</span>
                                    :
                                    this.props.my.member_level_name
                            }
                        </div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        thumb={require('../assets/svg/form.svg')}
                        extra="查看全部"
                        arrow="horizontal"
                        onClick={this.handleTrade.bind(this, 'ALL')}
                    >
                        我的订单
                    </Item>
                    <Item style={{paddingLeft: '60px'}}>
                        <div className="order-item" onClick={this.handleTrade.bind(this, 'WAIT_PAY')}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/pay.svg')} alt=""/>
                            </Badge>
                            <div className="order-item-text">待付款</div>
                        </div>
                        <div className="order-item" onClick={this.handleTrade.bind(this, 'WAIT_SEND')}>
                            <Badge text={this.props.my.member_wait_send}>
                                <img src={require('../assets/svg/send.svg')} alt=""/>
                            </Badge>
                            <div className="order-item-text">待发货</div>
                        </div>
                        <div className="order-item" onClick={this.handleTrade.bind(this, 'WAIT_RECEIVE')}>
                            <Badge text={this.props.my.member_wait_receive}>
                                <img src={require('../assets/svg/deliver.svg')} alt=""/>
                            </Badge>
                            <div className="order-item-text">待收货</div>
                        </div>
                        <div className="order-item" onClick={this.handleTrade.bind(this, 'COMPLETE')}>
                            <img src={require('../assets/svg/comment.svg')} alt=""/>
                            <div className="order-item-text">已完成</div>
                        </div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        thumb={require('../assets/svg/shop.svg')} arrow="horizontal"
                        onClick={this.handleStock.bind(this)}
                    >
                        我的发货
                    </Item>
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
            </div>
        );
    }
}

export default connect(({my}) => ({my}))(My);
