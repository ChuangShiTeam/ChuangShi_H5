import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';

import {ActivityIndicator, WhiteSpace, List, TextareaItem, Modal, Toast, Switch} from 'antd-mobile';

import constant from '../../util/constant';
import storage from '../../util/storage';
import http from '../../util/http';

const alert = Modal.alert;

class MemberPurchaseOrderCheck extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            is_pay: false,
            is_warehouse_receive: false,
            is_address: false,
            member_address: {},
            product_sku_list: [],
            member_purchase_order_product_amount: 0,
            member_purchase_order_express_amount: 0,
            member_purchase_order_amount: 0
        };
    }

    componentDidMount() {
        document.title = '填写进货单';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/member/purchase/order/check',
            data: {
                product_sku_list: storage.getProductSkuList()
            },
            success: function (data) {
                let is_pay = true;
                let is_address = false;
                let product_sku_list = data.product_sku_list;
                let member_purchase_order_product_amount = data.member_purchase_order_product_amount;
                let member_purchase_order_express_amount = data.member_purchase_order_express_amount;
                let member_purchase_order_amount = 0;

                if (typeof (data.member_address.member_address_name) === 'undefined') {
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

                member_purchase_order_amount = parseFloat(member_purchase_order_product_amount) + parseFloat(member_purchase_order_express_amount);

                if (!member_purchase_order_product_amount > 0) {
                    is_pay = false;
                }

                this.setState({
                    is_pay: is_pay,
                    is_address: is_address,
                    member_address: member_address,
                    product_sku_list: product_sku_list,
                    member_purchase_order_product_amount: member_purchase_order_product_amount,
                    member_purchase_order_express_amount: member_purchase_order_express_amount,
                    member_purchase_order_amount: member_purchase_order_amount
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
        let member_purchase_order_is_warehouse_receive = this.state.is_warehouse_receive;
        //不是仓库代收必须填写收货地址
        if (!member_purchase_order_is_warehouse_receive) {
            if (typeof (this.state.member_address.member_address_name) === 'undefined') {
                Toast.fail('请选择收货地址', constant.duration);

                return;
            }
        }

        const product_sku_list = [];

        for (let i = 0; i < this.state.product_sku_list.length; i++) {
            product_sku_list.push({
                product_sku_id: this.state.product_sku_list[i].product_sku_id,
                product_sku_quantity: this.state.product_sku_list[i].product_sku_quantity,
            });
        }

        if (product_sku_list.length === 0) {
            Toast.fail('请选购商品', constant.duration);
        }

        Toast.loading('加载中..', 0);
        http.request({
            url: '/member/purchase/order/save',
            data: {
                member_purchase_order_is_warehouse_receive: member_purchase_order_is_warehouse_receive,
                member_purchase_order_receiver_name: this.state.member_address.member_address_name,
                member_purchase_order_receiver_mobile: this.state.member_address.member_address_mobile,
                member_purchase_order_receiver_province: this.state.member_address.member_address_province,
                member_purchase_order_receiver_city: this.state.member_address.member_address_city,
                member_purchase_order_receiver_area: this.state.member_address.member_address_area,
                member_purchase_order_receiver_address: this.state.member_address.member_address_address,
                member_purchase_order_message: this.props.form.getFieldValue('member_purchase_order_message'),
                product_sku_list: product_sku_list,
                open_id: storage.getOpenId()
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
                                pathname: '/member/purchase/order/confirm/' + data.trade_id,
                                query: {},
                            }));
                        } else {
                            //支付失败
                            this.handleConfirmSplitOrder(data.member_level_id);
                        }
                    }.bind(this),
                    fail: function (res) {
                        this.handleConfirmSplitOrder(data.member_level_id);
                    }.bind(this),
                    cancel: function (res) {
                        this.handleConfirmSplitOrder(data.member_level_id);
                    }.bind(this)
                });

                Toast.hide();
            }.bind(this),
            complete() {

            },
        });
    }

    handleConfirmSplitOrder(member_level_id) {
        if (member_level_id == '2b27adef1c594c209289cc9bb8a3764a') {
            alert('提示', '因银行和微信支付限制了您的支付上限，您可能无法一次支付该订单，您可以选择拆分订单来完成支付！', [
                {
                    text: '取消',
                    onPress() {
                        this.props.dispatch(routerRedux.push({
                            pathname: '/member/purchase/order/index/ALL',
                            query: {},
                        }));
                    },
                },
                {
                    text: '拆订单',
                    onPress: this.handleSplitOrder.bind(this)
                }
            ]);
        } else {
            this.props.dispatch(routerRedux.push({
                pathname: '/member/purchase/order/index/ALL',
                query: {},
            }));
        }
    }

    //拆单
    handleSplitOrder() {
        if (!this.state.is_pay) {
            return;
        }
        let member_purchase_order_is_warehouse_receive = this.state.is_warehouse_receive;
        //不是仓库代收必须填写收货地址
        if (!member_purchase_order_is_warehouse_receive) {
            if (typeof (this.state.member_address.member_address_name) === 'undefined') {
                Toast.fail('请选择收货地址', constant.duration);

                return;
            }
        }

        const product_sku_list = [];

        for (let i = 0; i < this.state.product_sku_list.length; i++) {
            product_sku_list.push({
                product_sku_id: this.state.product_sku_list[i].product_sku_id,
                product_sku_quantity: this.state.product_sku_list[i].product_sku_quantity,
            });
        }

        if (product_sku_list.length === 0) {
            Toast.fail('请选购商品', constant.duration);
        }

        Toast.loading('加载中..', 0);
        http.request({
            url: '/member/purchase/order/split',
            data: {
                member_purchase_order_is_warehouse_receive: member_purchase_order_is_warehouse_receive,
                member_purchase_order_receiver_name: this.state.member_address.member_address_name,
                member_purchase_order_receiver_mobile: this.state.member_address.member_address_mobile,
                member_purchase_order_receiver_province: this.state.member_address.member_address_province,
                member_purchase_order_receiver_city: this.state.member_address.member_address_city,
                member_purchase_order_receiver_area: this.state.member_address.member_address_area,
                member_purchase_order_receiver_address: this.state.member_address.member_address_address,
                member_purchase_order_message: this.props.form.getFieldValue('member_purchase_order_message'),
                product_sku_list: product_sku_list,
                open_id: storage.getOpenId()
            },
            success: function (data) {
                this.props.dispatch(routerRedux.push({
                    pathname: '/member/purchase/order/index/ALL',
                    query: {},
                }));
                Toast.hide();
            }.bind(this),
            complete() {

            },
        });
    }

    onChangeWarehouseReceive(checked) {
        this.setState({
            is_warehouse_receive: checked
        })
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
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
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('member_purchase_order_is_warehouse_receive', {
                                    initialValue: false,
                                    valuePropName: 'checked'
                                })}
                                onClick={this.onChangeWarehouseReceive.bind(this)}
                            />}
                        >是否仓库代收</List.Item>
                    </List>
                    {
                        this.state.is_warehouse_receive ?
                            null
                            :
                            <span>
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
                            </span>
                    }
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
                        <Item extra={'￥' + this.state.member_purchase_order_product_amount.toFixed(2)}>
                            商品金额
                        </Item>
                        {
                            this.state.is_warehouse_receive ?
                                null
                                :
                                <Item extra={'￥' + this.state.member_purchase_order_express_amount.toFixed(2)}>
                                    运费
                                </Item>
                        }
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <TextareaItem
                            {...getFieldProps('member_purchase_order_message', {
                                initialValue: '',
                            })}
                            placeholder="请输入进货留言"
                            rows={3}
                            count={100}
                        />
                    </List>
                </div>
                <div className="footer">
                    <div className="footer-total">
                        <span
                            className="footer-total-text">总金额: ￥{this.state.member_purchase_order_amount.toFixed(2)}</span>
                    </div>
                    <div
                        className="footer-buy" style={{backgroundColor: this.state.is_pay ? '#1AAD19' : '#dddddd'}}
                        onClick={this.handlePay.bind(this)}>立刻支付
                    </div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

MemberPurchaseOrderCheck = createForm()(MemberPurchaseOrderCheck);

export default connect(() => ({}))(MemberPurchaseOrderCheck);
