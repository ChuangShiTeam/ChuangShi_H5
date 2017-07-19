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
            is_pay: false,
            is_address: false,
            member_address: {},
            product_sku_list: [],
            trade_product_amount: 0,
            trade_express_amount: 0,
            trade_amount: 0,
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
            url: '/trade/check',
            data: {
                product_sku_list: storage.getProductSkuList(),
            },
            success: function (data) {
                let is_pay = true;
                let is_address = false;
                let product_sku_list = data.product_sku_list;
                let trade_product_amount = data.trade_product_amount;
                let trade_express_amount = data.trade_express_amount;
                let trade_amount = 0;

                if (typeof (data.member_address.member_address_name) === 'undefined') {
                    is_pay = false;
                } else {
                    is_address = true;
                }

                let member_address;

                if (storage.getMemberAddress().member_address_name === '') {
                    member_address = data.member_address;
                } else {
                    member_address = storage.getMemberAddress();
                }

                trade_amount = parseFloat(trade_product_amount) + parseFloat(trade_express_amount);

                if (!trade_product_amount > 0) {
                    is_pay = false;
                }

                this.setState({
                    is_pay: is_pay,
                    is_address: is_address,
                    member_address: member_address,
                    product_sku_list: product_sku_list,
                    trade_product_amount: trade_product_amount,
                    trade_express_amount: trade_express_amount,
                    trade_amount: trade_amount
                });

                Toast.hide();
            }.bind(this),
            complete() {

            },
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

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        const Item = List.Item;
        const {getFieldProps} = this.props.form;

        return (
            <div>
                <div>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item wrap className="item-long-text">
                            <div>
                                收货人：{this.state.member_address.member_address_name} {this.state.member_address.member_address_mobile}
                                <div>
                                    收货地址：{this.state.member_address.member_address_province
                                + " " + this.state.member_address.member_address_city
                                + " " + this.state.member_address.member_address_area
                                + " " + this.state.member_address.member_address_address}
                                </div>
                            </div>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        {
                            this.state.product_sku_list.map((item) => {
                                return (
                                    <Item
                                        key={item.product_sku_id}
                                        extra={'￥' + (item.product_sku_price * item.product_sku_quantity).toFixed(2)}
                                    >
                                        <img className="product-list-image" src={constant.host + item.product_image}
                                             alt=""/>
                                        <div className="product-list-text">
                                            {item.product_name}
                                            <div>{item.product_sku_price.toFixed(2)} × {item.product_sku_quantity}</div>
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
                    </List>

                    <WhiteSpace size="lg"/>
                    <List>
                        <TextareaItem
                            {...getFieldProps('trade_message', {
                                initialValue: '',
                            })}
                            placeholder="请输入买家留言"
                            rows={3}
                            count={100}
                        />
                    </List>
                </div>
                <div className="footer">
                    <div className="footer-total">
                        <span className="footer-total-text">总金额: ￥{this.state.trade_amount.toFixed(2)}</span>
                    </div>
                    <div
                        className="footer-buy" style={{backgroundColor: this.state.is_pay ? '#1AAD19' : '#dddddd'}}
                        onClick={this.handlePay.bind(this)}>立刻支付
                    </div>
                </div>
            </div>
        );
    }
}

TradeDetail = createForm()(TradeDetail);

export default connect(() => ({}))(TradeDetail);
