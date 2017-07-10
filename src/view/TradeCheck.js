import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';

import {WhiteSpace, List, TextareaItem, Modal, Toast} from 'antd-mobile';

import constant from '../util/constant';
import storage from '../util/storage';
import http from '../util/http';

const alert = Modal.alert;

class TradeCheck extends Component {
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
        document.title = '填写订单';

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
                var is_pay = true;
                var is_address = false;
                var product_sku_list = data.product_sku_list;
                var trade_product_amount = 0;
                var trade_express_amount = data.trade_express_amount;
                var trade_amount = 0;

                if (data.member_address.member_address_name === '') {
                    is_pay = false;

                    alert('提示', '您还没有收货地址，是否新建一个？', [
                        {
                            text: '取消',
                            onPress() {

                            },
                        },
                        {
                            text: '确定',
                            onPress: function () {
                                this.props.dispatch(routerRedux.push({
                                    pathname: '/address/index',
                                    query: {},
                                }));
                            }.bind(this),
                        },
                    ]);
                } else {
                    is_address = true;
                }

                var member_address;

                if (storage.getMemberAddress().member_address_name === '') {
                    member_address = data.member_address;
                } else {
                    member_address = storage.getMemberAddress();
                }

                for (var i = 0; i < product_sku_list.length; i++) {
                    var product_sku = product_sku_list[i];

                    var product_amount = product_sku.product_sku_price * product_sku.product_sku_quantity;

                    trade_product_amount += product_amount;
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

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleDelivery() {
        this.props.dispatch(routerRedux.push({
            pathname: '/delivery/index/order_check_' + this.props.params.type,
            query: {}
        }));
    }

    handlePay() {
        if (!this.state.is_pay) {
            return;
        }

        if (typeof (this.state.member_address.member_address_name) === 'undefined') {
            Toast.fail('请选择收货地址', constant.duration);

            return;
        }

        const product_list = [];

        for (var i = 0; i < this.state.product_list.length; i++) {
            product_list.push({
                sku_id: this.state.product_list[i].sku_id,
                product_quantity: this.state.product_list[i].product_quantity,
            });
        }

        if (product_list.length === 0) {
            Toast.fail('请选购商品', constant.duration);
        }

        http.request({
            url: '/order/save',
            data: {
                order_delivery_name: this.state.delivery.delivery_name,
                order_delivery_phone: this.state.delivery.delivery_phone,
                order_delivery_address: this.state.delivery.delivery_address,
                order_message: this.props.form.getFieldValue('order_message'),
                order_pay_type: 'WECHAT_PAY',
                product_list: product_list,
                open_id: storage.getOpenId(),
                pay_type: 'H5',
            },
            success: function (data) {
                if (typeof WeixinJSBridge === 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data), false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data));
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data));
                    }
                } else {
                    this.onBridgeReady(data);
                }
            }.bind(this),
            complete() {

            },
        });
    }

    onBridgeReady(data) {
        // WeixinJSBridge.invoke(
        //     'getBrandWCPayRequest', {
        //         appId: data.appId,
        //         timeStamp: data.timeStamp,
        //         nonceStr: data.nonceStr,
        //         package: data.package,
        //         signType: data.signType,
        //         paySign: data.paySign,
        //     },
        //     (res) => {
        //         storage.setProduct([]);
        //         storage.removeDelivery();
        //
        //         if (res.err_msg == 'get_brand_wcpay_request:ok') {
        //             this.props.dispatch(routerRedux.push({
        //                 pathname: '/order/result/check/' + data.orderId,
        //                 query: {},
        //             }));
        //         } else {
        //             this.props.dispatch(routerRedux.push({
        //                 pathname: '/order/detail/ALL/' + data.orderId,
        //                 query: {},
        //             }));
        //         }
        //     },
        // );
    }

    render() {
        const Item = List.Item;
        const {getFieldProps} = this.props.form;

        return (
            <div>
                <div>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item arrow="horizontal" extra={typeof (this.state.member_address.member_address_name) === 'undefined' ? '请选择' : ''} wrap onClick={this.handleDelivery.bind(this)}>
                            {
                                typeof (this.state.member_address.member_address_name) === 'undefined' ?
                                    '收货地址'
                                    :
                                    <div>
                                        <div>{this.state.member_address.member_address_name} {this.state.member_address.member_address_mobile}</div>
                                        <div className="trade-address">{this.state.member_address.member_address_province + this.state.member_address.member_address_city + this.state.member_address.member_address_area + this.state.member_address.member_address_address}</div>
                                    </div>
                            }
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
                                        />
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
                        <Item extra={'￥' + this.state.trade_product_amount}>
                            商品金额
                        </Item>
                        <Item extra={'￥' + this.state.trade_express_amount}>
                            运费
                        </Item>
                    </List>

                    <WhiteSpace size="lg"/>
                    <List>
                        <TextareaItem
                            {...getFieldProps('order_message', {
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
                        <span className="footer-total-text">总金额: ￥{this.state.trade_amount}</span>
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

TradeCheck = createForm()(TradeCheck);

export default connect(({}) => ({}))(TradeCheck);
