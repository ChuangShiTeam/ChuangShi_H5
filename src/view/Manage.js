import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {ActivityIndicator, WhiteSpace, List, Badge} from "antd-mobile";
import http from "../util/http";
import storage from "../util/storage";

class Manage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.my.is_load
        }
    }

    componentDidMount() {
        document.title = '管理中心';

        document.body.scrollTop = 0;

        this.handleLoad();
        
        storage.removeTradeFlow();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/member/my/find',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'my/fetch',
                    data: data
                });
            }.bind(this),
            complete: function () {
                this.props.dispatch({
                    type: 'my/fetch',
                    data: {
                        is_load: true
                    }
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

    handleDeliveryOrder() {
        this.props.dispatch(routerRedux.push({
            pathname: '/delivery/order/index',
            query: {}
        }));
    }

    handleTeam() {
        this.props.dispatch(routerRedux.push({
            pathname: '/team/index',
            query: {}
        }));
    }

    handleCertificate() {
        this.props.dispatch(routerRedux.push({
            pathname: '/certificate/index',
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
                <div className="manage-member">
                    <div className="manage-member-avatar">
                        <img src={this.props.my.user_avatar} alt=""/>
                    </div>
                    <div className="manage-member-name">
                        {this.props.my.user_name}
                    </div>
                    <div className="manage-member-level">
                        {
                            this.props.my.member_level_name === '' ?
                                <span style={{color: '#a72025'}}>待审核</span>
                                :
                                <span>等级: {this.props.my.member_level_name}</span>
                        }
                    </div>
                    <div className="manage-member-price">
                        保证金: ￥0.00
                    </div>
                </div>
                <WhiteSpace size="lg"/>
                <List className="no-padding-list">
                    <Item multipleLine>
                        <div className="manage-item" onClick={this.handleTrade.bind(this, 'ALL')}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/form.svg')} alt=""/>
                            </Badge>
                            <div className="manage-item-text">订单管理</div>
                        </div>
                        <div className="manage-item manage-item-left" onClick={this.handleDeliveryOrder.bind(this)}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/shop.svg')} alt=""/>
                            </Badge>
                            <div className="manage-item-text">发货管理</div>
                        </div>
                    </Item>
                    <Item multipleLine>
                        <div className="manage-item" onClick={this.handleTeam.bind(this)}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/friend_normal.svg')} alt=""/>
                            </Badge>
                            <div className="manage-item-text">我的代理</div>
                        </div>
                        <div className="manage-item manage-item-left" onClick={this.handleCertificate.bind(this)}>
                            <img src={require('../assets/svg/medal.svg')} alt=""/>
                            <div className="manage-item-text">我的授权书</div>
                        </div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        thumb={require('../assets/svg/location.svg')} arrow="horizontal"
                        onClick={this.handleMemberAddress.bind(this)}
                    >
                        收货地址
                    </Item>
                    <Item
                        thumb={require('../assets/svg/friend_normal.svg')} arrow="horizontal"
                        onClick={this.handleTeam.bind(this)}
                    >
                        直属代理
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
                <div style={{height: '100px'}}></div>
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.props.my.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({my}) => ({my}))(Manage);
