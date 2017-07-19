import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';

import {WhiteSpace, List, TextareaItem, Toast} from 'antd-mobile';

import constant from '../util/constant';
import storage from '../util/storage';
import http from '../util/http';

class TradeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trade_number: '',
            trade_receiver_name: '',
            trade_receiver_mobile: '',
            trade_receiver_province: '',
            trade_receiver_city: '',
            trade_receiver_area: '',
            trade_receiver_address: '',
            trade_message: '',
            trade_product_quantity: 0,
            trade_product_amount: 0.00,
            trade_express_amount: 0.00,
            trade_discount_amount: 0.00,
            trade_total_amount: 0.00,
            trade_flow: '',
            system_create_time: '',
            trade_product_sku_list: [],
            express_trade_id_list: []
        };
    }

    componentDidMount() {
        document.title = '订单详情';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/trade/find',
            data: {
                trade_id: this.props.params.trade_id
            },
            success: function (data) {
                this.setState({
                    trade_number: data.trade_number,
                    trade_receiver_name: data.trade_receiver_name,
                    trade_receiver_mobile: data.trade_receiver_mobile,
                    trade_receiver_province: data.trade_receiver_province,
                    trade_receiver_city: data.trade_receiver_city,
                    trade_receiver_area: data.trade_receiver_area,
                    trade_receiver_address: data.trade_receiver_address,
                    trade_message: data.trade_message,
                    trade_product_quantity: data.trade_product_quantity,
                    trade_product_amount: data.trade_product_amount,
                    trade_express_amount: data.trade_express_amount,
                    trade_discount_amount: data.trade_discount_amount,
                    trade_total_amount: data.trade_total_amount,
                    trade_flow: data.trade_flow,
                    system_create_time: data.system_create_time,
                    trade_product_sku_list: data.trade_product_sku_list,
                    express_trade_id_list: data.express_trade_id_list
                });

                Toast.hide();
            }.bind(this),
            complete() {

            }
        });
    }

    handlePay() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/trade/pay',
            data: {
                trade_id: this.props.params.trade_id,
                open_id: storage.getOpenId(),
                pay_type: 'WX'
            },
            success: function (data) {
                window.wx.chooseWXPay({
                    timestamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function (res) {
                        if (res.errMsg === "chooseWXPay:ok") {
                            //支付成功
                            this.props.dispatch(routerRedux.push({
                                pathname: '/trade/confirm/' + data.trade_id,
                                query: {}
                            }));
                        } else {
                            //支付失败
                        }
                    }.bind(this),
                    fail: function (res) {
                    },
                    cancel: function (res) {
                    }
                });

                Toast.hide();
            }.bind(this),
            complete() {
            }
        });
    }

    handleTraces(express_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/express/index/' + express_id,
            query: {}
        }));
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;

        return (
            <div>
                {this.state.trade !== {} ?
                    <div>
                        <div>
                            <WhiteSpace size="lg"/>
                            <List>
                                <Item wrap className="item-long-text">
                                    <div className="orange-color">
                                        订单状态： {this.state.trade_flow === "WAIT_PAY" ? "待付款" :
                                        this.state.trade_flow === "WAIT_SEND" ? "待发货" :
                                            this.state.trade_flow === "WAIT_RECEIVE" ? "待收货" :
                                                this.state.trade_flow === "COMPLETE" ? "已完成" : ""}
                                    </div>
                                </Item>
                            </List>
                            {this.state.trade_flow === "WAIT_RECEIVE" || this.state.trade_flow === "COMPLETE" ?
                                <div>
                                    <WhiteSpace size="lg"/>
                                    {this.state.express_trade_id_list.length === 0 ?
                                        <List>
                                            {
                                                this.state.express_trade_id_list.map((item) => {
                                                    return (
                                                        <Item arrow="horizontal"
                                                              wrap className="item-long-text"
                                                              onClick={this.handleTraces.bind(this,item.express_id)}>
                                                            <div className="green-color">
                                                                [{item.express_flow}]{item.AcceptStation}
                                                                <Brief>
                                                                    {item.AcceptTime}
                                                                </Brief>
                                                            </div>
                                                        </Item>
                                                    );
                                                })
                                            }
                                        </List>
                                        :
                                        <List>
                                            <Item>
                                                <Brief>
                                                    暂无物流信息
                                                </Brief>
                                            </Item>
                                        </List>
                                    }
                                </div>
                                :
                                ""
                            }
                            <WhiteSpace size="lg"/>
                            <List>
                                <Item wrap className="item-long-text">
                                    <div>
                                        收货人：{this.state.trade_receiver_name} {this.state.trade_receiver_mobile}
                                        <div>
                                            收货地址：{this.state.trade_receiver_province
                                        + " " + this.state.trade_receiver_city
                                        + " " + this.state.trade_receiver_area
                                        + " " + this.state.trade_receiver_address}
                                        </div>
                                    </div>
                                </Item>
                            </List>
                            <WhiteSpace size="lg"/>
                            <List>
                                {
                                    this.state.trade_product_sku_list.map((item) => {
                                        return (
                                            <Item
                                                key={item.product_sku_id}
                                                extra={'￥' + (item.product_sku_amount).toFixed(2)}
                                            >
                                                <img className="product-list-image"
                                                     src={constant.host + item.product_image} alt=""/>
                                                <div className="product-list-text">
                                                    {item.product_name}
                                                    <div>{(item.product_sku_amount / item.product_sku_quantity).toFixed(2)}
                                                        × {item.product_sku_quantity}</div>
                                                </div>
                                            </Item>
                                        );
                                    })
                                }
                            </List>
                            <WhiteSpace size="lg"/>
                            <List>
                                <Item extra={'￥' + this.state.trade_product_amount.toFixed(2)}>
                                    商品金额
                                </Item>
                                <Item extra={'￥' + this.state.trade_express_amount.toFixed(2)}>
                                    运费
                                </Item>
                                <Item extra={'￥' + this.state.trade_discount_amount.toFixed(2)}>
                                    折扣
                                </Item>
                            </List>
                            <WhiteSpace size="lg"/>
                            <List>
                                <TextareaItem
                                    title="留言"
                                    placeholder={this.state.trade_message}
                                    editable={false}
                                    rows="3"
                                />
                            </List>
                            <WhiteSpace size="lg"/>
                            <List>
                                <Item wrap className="item-long-text">
                                    <Brief>
                                        订单编号：{this.state.trade_number}
                                    </Brief>
                                    <Brief>
                                        创建时间：{this.state.system_create_time}
                                    </Brief>
                                </Item>
                            </List>
                        </div>
                        {this.state.trade_flow === "WAIT_PAY" ?
                            <div className="footer">
                                <div className="footer-total">
                                    <span className="footer-total-text">
                                        总金额: ￥{this.state.trade_total_amount.toFixed(2)}
                                    </span>
                                </div>
                                <div
                                    className="footer-buy"
                                    style={{backgroundColor: '#1AAD19'}}
                                    onClick={this.handlePay.bind(this)}>
                                    立刻支付
                                </div>
                            </div>
                            :
                            ""
                        }
                    </div>
                    :
                    ""
                }
            </div>

        );
    }
}

TradeDetail = createForm()(TradeDetail);

export default connect(() => ({}))(TradeDetail);
