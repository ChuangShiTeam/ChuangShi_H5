import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';

import {ActivityIndicator, WhiteSpace, List, TextareaItem, Modal, Toast, Switch} from 'antd-mobile';

import constant from '../../util/constant';
import storage from '../../util/storage';
import http from '../../util/http';

const alert = Modal.alert;

class TradeCheck extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            is_pay: false,
            is_address: false,
            member_address: {},
            product_sku_list: [],
            trade_product_amount: 0,
            trade_express_amount: 0,
            trade_amount: 0,
            is_cash_on_deliver: false
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
        http.request({
            url: '/trade/check',
            data: {
                product_sku_list: storage.getProductSkuList()
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

                    alert('提示', '您还没有收货地址，是否新建一个？', [
                        {
                            text: '取消',
                            onPress() {

                            }
                        },
                        {
                            text: '确定',
                            onPress: function () {
                                this.props.dispatch(routerRedux.push({
                                    pathname: '/member/address/index/select',
                                    query: {}
                                }));
                            }.bind(this)
                        }
                    ]);
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
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleMemberAddress() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/address/index/select',
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

        if (this.state.product_sku_list.length === 0) {
            Toast.fail('请选购商品', constant.duration);
        }
        alert('用户须知', '产品非质量问题，不支持退款退货！', [
            {
                text: '取消',
                onPress() {

                }
            },
            {
                text: '我知道了',
                onPress: function () {
                    const product_sku_list = [];

                    for (let i = 0; i < this.state.product_sku_list.length; i++) {
                        product_sku_list.push({
                            product_sku_id: this.state.product_sku_list[i].product_sku_id,
                            product_sku_quantity: this.state.product_sku_list[i].product_sku_quantity
                        });
                    }
                    Toast.loading('加载中..', 0);
                    http.request({
                        url: '/trade/save',
                        data: {
                            trade_receiver_name: this.state.member_address.member_address_name,
                            trade_receiver_mobile: this.state.member_address.member_address_mobile,
                            trade_receiver_province: this.state.member_address.member_address_province,
                            trade_receiver_city: this.state.member_address.member_address_city,
                            trade_receiver_area: this.state.member_address.member_address_area,
                            trade_receiver_address: this.state.member_address.member_address_address,
                            trade_message: this.props.form.getFieldValue('trade_message'),
                            trade_pay_type: 'WECHAT',
                            trade_deliver_pattern: this.state.is_cash_on_deliver?'CASH_ON_DELIVERY':'CASH_BEFORE_DELIVERY',
                            product_sku_list: product_sku_list,
                            open_id: storage.getOpenId(),
                            pay_type: 'H5'
                        },
                        success: function (data) {
                            if (this.state.is_cash_on_deliver) {
                                this.props.dispatch(routerRedux.push({
                                    pathname: '/trade/confirm/' + data.trade_id,
                                    query: {}
                                }));
                            } else {
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
                                                query: {},
                                            }));
                                        } else {
                                            //支付失败
                                            this.props.dispatch(routerRedux.push({
                                                pathname: '/trade/index/ALL',
                                                query: {},
                                            }));
                                        }
                                    }.bind(this),
                                    fail: function (res) {
                                        this.props.dispatch(routerRedux.push({
                                            pathname: '/trade/index/ALL',
                                            query: {},
                                        }));
                                    }.bind(this),
                                    cancel: function (res) {
                                        this.props.dispatch(routerRedux.push({
                                            pathname: '/trade/index/ALL',
                                            query: {},
                                        }));
                                    }.bind(this)
                                });
                            }
                            Toast.hide();
                        }.bind(this),
                        complete() {

                        }
                    });
                }.bind(this)
            }
        ]);
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleChangePayPattern () {
        this.setState({
            is_cash_on_deliver: !this.state.is_cash_on_deliver
        })
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const {getFieldProps} = this.props.form;

        return (
            <div>
                <div>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item arrow="horizontal"
                              extra={typeof (this.state.member_address.member_address_name) === 'undefined' ? '请选择' : ''}
                              wrap
                              className="item-long-text"
                              onClick={this.handleMemberAddress.bind(this)}>
                            {
                                typeof (this.state.member_address.member_address_name) === 'undefined' ?
                                    '收货地址'
                                    :
                                    <div>
                                        {this.state.member_address.member_address_name} {this.state.member_address.member_address_mobile}
                                        <Brief>{this.state.member_address.member_address_province + this.state.member_address.member_address_city + this.state.member_address.member_address_area + this.state.member_address.member_address_address}</Brief>
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
                                        <img className="product-list-image" src={constant.host + item.product_image} alt=""/>
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
                            运费{this.state.trade_product_amount < 100?<span style={{color: 'red'}}>(满100免邮)</span>:null}
                        </Item>
                        <Item
                            extra={<Switch checked={this.state.is_cash_on_deliver} onChange={this.handleChangePayPattern.bind(this)}/>}
                        >货到付款</Item>
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
                        onClick={this.handlePay.bind(this)}>立刻{this.state.is_cash_on_deliver?'下单':'支付'}
                    </div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

TradeCheck = createForm()(TradeCheck);

export default connect(() => ({}))(TradeCheck);
