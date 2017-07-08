import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Badge} from 'antd-mobile';

class My extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        document.title = '个人中心';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    handleOrder(order_status) {

    }

    handleStock() {
        this.props.dispatch(routerRedux.push({
            pathname: '/stock/index',
            query: {}
        }));
    }

    handleAddress() {
        this.props.dispatch(routerRedux.push({
            pathname: '/address/index',
            query: {}
        }));
    }

    handleQrcode() {

    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <List.Item
                        multipleLine
                    >
                        <div className="list-item">
                            <div className="list-item-image">

                            </div>
                            <div className="list-item-text">

                            </div>
                            <div className="list-item-brief">

                            </div>
                        </div>
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <List.Item
                        thumb={require('../assets/svg/form.svg')}
                        extra="查看全部" arrow="horizontal"
                        onClick={this.handleOrder.bind(this, 'ALL')}
                    >
                        我的订单
                    </List.Item>
                    <List.Item style={{paddingLeft: '60px'}}>
                        <div className="order-item" onClick={this.handleOrder.bind(this, 'WAIT_PAY')}>
                            <Badge text={this.props.my.member_wait_pay}>
                                <img src={require('../assets/svg/pay.svg')}/>
                            </Badge>
                            <div className="order-item-text">待付款</div>
                        </div>
                        <div className="order-item" onClick={this.handleOrder.bind(this, 'WAIT_SEND')}>
                            <Badge text={this.props.my.member_wait_send}>
                                <img src={require('../assets/svg/send.svg')}/>
                            </Badge>
                            <div className="order-item-text">待发货</div>
                        </div>
                        <div className="order-item" onClick={this.handleOrder.bind(this, 'WAIT_RECEIVE')}>
                            <Badge text={this.props.my.member_wait_receive}>
                                <img src={require('../assets/svg/deliver.svg')}/>
                            </Badge>
                            <div className="order-item-text">待收货</div>
                        </div>
                        <div className="order-item" onClick={this.handleOrder.bind(this, 'FINISH')}>
                            <img src={require('../assets/svg/comment.svg')}/>
                            <div className="order-item-text">已完成</div>
                        </div>
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <List.Item
                        thumb={require('../assets/svg/shop.svg')} arrow="horizontal"
                        onClick={this.handleStock.bind(this)}
                    >
                        我的库存
                    </List.Item>
                    <List.Item
                        thumb={require('../assets/svg/location.svg')} arrow="horizontal"
                        onClick={this.handleAddress.bind(this)}
                    >
                        我的地址
                    </List.Item>
                    {
                        this.props.my.member_status ?
                            <List.Item
                                thumb={require('../assets/svg/qr_code.svg')} arrow="horizontal"
                                onClick={this.handleQrcode.bind(this)}
                            >
                                我的二维码
                            </List.Item>
                            :
                            ''
                    }
                </List>
            </div>
        );
    }
}

export default connect(({my}) => ({my}))(My);
