import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';

import {ActivityIndicator, WhiteSpace, List, TextareaItem, Toast} from 'antd-mobile';

import constant from '../../util/constant';
import storage from '../../util/storage';
import http from '../../util/http';

class MemberDeliveryOrderDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            member_purchase_order_number: '',
            member_purchase_order_receiver_name: '',
            member_purchase_order_receiver_mobile: '',
            member_purchase_order_receiver_province: '',
            member_purchase_order_receiver_city: '',
            member_purchase_order_receiver_area: '',
            member_purchase_order_receiver_address: '',
            member_purchase_order_message: '',
            member_purchase_order_product_quantity: 0,
            member_purchase_order_product_amount: 0.00,
            member_purchase_order_express_amount: 0.00,
            member_purchase_order_amount: 0.00,
            member_purchase_order_flow: '',
            system_create_time: '',
            member_purchase_order_product_sku_list: [],
            express_list: []
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
        http.request({
            url: '/member/delivery/order/find',
            data: {
                member_delivery_order_id: this.props.params.member_delivery_order_id
            },
            success: function (data) {
                this.setState({
                    member_purchase_order_number: data.member_purchase_order_number,
                    member_purchase_order_receiver_name: data.member_purchase_order_receiver_name,
                    member_purchase_order_receiver_mobile: data.member_purchase_order_receiver_mobile,
                    member_purchase_order_receiver_province: data.member_purchase_order_receiver_province,
                    member_purchase_order_receiver_city: data.member_purchase_order_receiver_city,
                    member_purchase_order_receiver_area: data.member_purchase_order_receiver_area,
                    member_purchase_order_receiver_address: data.member_purchase_order_receiver_address,
                    member_purchase_order_message: data.member_purchase_order_message,
                    member_purchase_order_product_quantity: data.member_purchase_order_product_quantity,
                    member_purchase_order_product_amount: data.member_purchase_order_product_amount,
                    member_purchase_order_express_amount: data.member_purchase_order_express_amount,
                    member_purchase_order_amount: data.member_purchase_order_amount,
                    member_purchase_order_flow: data.member_purchase_order_flow,
                    system_create_time: data.system_create_time,
                    member_purchase_order_product_sku_list: data.member_purchase_order_product_sku_list,
                    express_list: data.express_list
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handlePay() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/purchase/order/pay',
            data: {
                member_purchase_order_id: this.props.params.member_purchase_order_id,
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
                                pathname: '/member/purchase/order/confirm/' + data.member_purchase_order_id,
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
                {this.state.member_purchase_order !== {} ?
                    <div>
                        <div>
                            <WhiteSpace size="lg"/>
                            <List>
                                <Item wrap multipleLine className="item-long-text">
                                    <div className="orange-color">
                                        进货状态： {this.state.member_purchase_order_flow === "WAIT_PAY" ? "待付款" :
                                        this.state.member_purchase_order_flow === "WAIT_SEND" ? "待发货" :
                                            this.state.member_purchase_order_flow === "WAIT_RECEIVE" ? "待收货" :
                                                this.state.member_purchase_order_flow === "COMPLETE" ? "已完成" : ""}
                                    </div>
                                </Item>
                            </List>
                            {this.state.member_purchase_order_flow === "WAIT_RECEIVE" || this.state.member_purchase_order_flow === "COMPLETE" ?
                                <div>
                                    <WhiteSpace size="lg"/>
                                    {this.state.express_list.length > 0 ?
                                        <List>
                                            {
                                                this.state.express_list.map((item, index) => {
                                                    return (
                                                        <Item
                                                            key={index}
                                                            arrow="horizontal"
                                                            wrap className="item-long-text"
                                                            onClick={this.handleTraces.bind(this, item.express_id)}>
                                                            <div className="green-color">
                                                                {item.express_flow === '无轨迹' ?
                                                                    <div>[{item.express_flow}]</div>
                                                                    :
                                                                    <div>
                                                                        [{item.express_flow}]{item.express_traces.AcceptStation}
                                                                        <Brief>
                                                                            {item.express_traces.AcceptTime}
                                                                        </Brief>
                                                                    </div>
                                                                }
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
                                        收货人：{this.state.member_purchase_order_receiver_name} {this.state.member_purchase_order_receiver_mobile}
                                        <div>
                                            收货地址：{this.state.member_purchase_order_receiver_province
                                        + " " + this.state.member_purchase_order_receiver_city
                                        + " " + this.state.member_purchase_order_receiver_area
                                        + " " + this.state.member_purchase_order_receiver_address}
                                        </div>
                                    </div>
                                </Item>
                            </List>
                            <WhiteSpace size="lg"/>
                            <List>
                                {
                                    this.state.member_purchase_order_product_sku_list.map((item, index) => {
                                        return (
                                            <Item
                                                key={index}
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
                                <Item extra={'￥' + this.state.member_purchase_order_product_amount.toFixed(2)}>
                                    商品金额
                                </Item>
                                <Item extra={'￥' + this.state.member_purchase_order_express_amount.toFixed(2)}>
                                    运费
                                </Item>
                            </List>
                            <WhiteSpace size="lg"/>
                            <List>
                                <TextareaItem
                                    title="留言"
                                    placeholder={this.state.member_purchase_order_message}
                                    editable={false}
                                    rows="3"
                                />
                            </List>
                            <WhiteSpace size="lg"/>
                            <List>
                                <Item wrap className="item-long-text">
                                    <Brief>
                                        创建时间：{this.state.system_create_time}
                                    </Brief>
                                </Item>
                            </List>
                            <WhiteSpace size="lg"/>
                        </div>
                        {this.state.member_purchase_order_flow === "WAIT_PAY" ?
                            <div className="footer">
                                <div className="footer-total">
                                    <span className="footer-total-text">
                                        总金额: ￥{this.state.member_purchase_order_amount.toFixed(2)}
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
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>

        );
    }
}

MemberDeliveryOrderDetail = createForm()(MemberDeliveryOrderDetail);

export default connect(() => ({}))(MemberDeliveryOrderDetail);
