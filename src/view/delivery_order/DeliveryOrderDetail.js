import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {ActivityIndicator, WhiteSpace, List, InputItem, Picker, Toast} from 'antd-mobile';

import constant from "../../util/constant";
import validate from "../../util/validate";
import http from "../../util/http";
import storage from '../../util/storage';

class DeliveryOrderDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            action: 'save',
            product_sku_id: '',
            delivery_order: {},
            member_address: {},
            express_list: []
        }
    }

    componentDidMount() {
        document.title = '发货单';

        document.body.scrollTop = 0;

        if (this.props.route.path.indexOf('/edit/') > -1) {
            this.setState({
                action: 'update'
            });
            this.handleLoadDeliveryOrder();
        } else {
            this.setState({
                is_load: true
            });
        }

        this.handleLoadProduct();
    }

    componentWillUnmount() {

    }

    handleLoadDeliveryOrder() {
        http.request({
            url: '/delivery/order/find',
            data: {
                delivery_order_id: this.props.params.delivery_order_id
            },
            success: function (data) {
                this.setState({
                    delivery_order: data.delivery_order,
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

    handleLoadProduct() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/product/find',
            data: {
                product_id: "76537999b6c6428d9a78d47739c08fa5"
            },
            success: function (data) {
                this.setState({
                    member_address: storage.getMemberAddress(),
                    product_sku_id: data.product_sku_id
                });
                Toast.hide();
            }.bind(this),
            complete() {

            }
        });
    }

    handleAdd() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                if (typeof (this.state.member_address.member_address_name) === 'undefined') {
                    Toast.fail('请选择收货地址', constant.duration);

                    return;
                }

                if (!validate.isMobile(this.state.member_address.member_address_mobile)) {
                    Toast.fail('手机号码格式不对', constant.duration);

                    return;
                }

                values.delivery_order_receiver_name = this.state.member_address.member_address_name;
                values.delivery_order_receiver_mobile = this.state.member_address.member_address_mobile;
                values.delivery_order_receiver_province = this.state.member_address.member_address_province;
                values.delivery_order_receiver_city = this.state.member_address.member_address_city;
                values.delivery_order_receiver_area = this.state.member_address.member_address_area;
                values.delivery_order_receiver_address = this.state.member_address.member_address_address;

                var delivery_order_product_sku_list = [];
                var map = {};
                map.product_sku_quantity = values.product_sku_quantity;
                map.product_sku_id = this.state.product_sku_id;
                delivery_order_product_sku_list.push(map);
                values.delivery_order_product_sku_list = delivery_order_product_sku_list;
                delete values.product_sku_quantity;

                values.delivery_order_express_pay_way = values.delivery_order_express_pay_way[0];

                Toast.loading('加载中..', 0);

                if (this.props.route.path.indexOf('/edit/') > -1) {
                    values.delivery_order_id = this.props.params.delivery_order_id;
                }

                http.request({
                    url: '/member/send',
                    data: values,
                    success: function (data) {
                        Toast.hide();
                        if (data) {
                            storage.removeMemberAddress();
                            this.handleBack();
                        }
                    }.bind(this),
                    complete() {

                    }
                });
            }
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleMemberAddress() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/address/index/select',
            query: {}
        }));
    }

    handleTraces(express_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/express/index/' + express_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;

        const {getFieldProps, getFieldError} = this.props.form;

        return (
            this.state.action === 'save' ?
                <div>
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
                        <InputItem
                            {...getFieldProps('product_sku_quantity', {
                                rules: [{
                                    required: true,
                                    message: '请输入爆水丸数量',
                                }],
                                initialValue: '',
                            })}
                            error={!!getFieldError('product_sku_quantity')}
                            clear
                            placeholder="请输入爆水丸数量"
                        >爆水丸数量:</InputItem>
                        <Picker
                            data={[
                                {
                                    label: '到付',
                                    value: '到付',
                                },
                                {
                                    label: '自己付',
                                    value: '自己付',
                                },
                            ]} {...getFieldProps('delivery_order_express_pay_way', {
                            initialValue: [],
                        })}
                        >
                            <Item arrow="horizontal">支付方式:</Item>
                        </Picker>
                    </List>
                    <WhiteSpace size="lg"/>
                    <div style={{height: '200px'}}></div>
                    <div className="footer">
                        <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>提交</div>
                    </div>
                    <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                        <div className="loading"><ActivityIndicator/></div>
                    </div>
                </div>
                :
                <div>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra={this.state.delivery_order.delivery_order_flow === null ? "暂无发货信息" : this.state.delivery_order.express_flow}>
                            <div className="orange-color">
                                发货状态： {
                                this.state.delivery_order.delivery_order_flow === "WAIT_SEND" ? "待发货" :
                                    this.state.delivery_order.delivery_order_flow === "WAIT_RECEIVE" ? "待收货" :
                                        this.state.delivery_order.delivery_order_flow === "COMPLETE" ? "已完成" : ""}
                            </div>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra={this.state.delivery_order.delivery_order_total_quantity}>
                            爆水丸数量
                        </Item>
                        <Item extra={this.state.delivery_order.delivery_order_express_pay_way}>
                            支付方式
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra={this.state.delivery_order.delivery_order_receiver_name}>
                            收货人
                        </Item>
                        <Item extra={this.state.delivery_order.delivery_order_receiver_mobile}>
                            手机号码
                        </Item>
                        <Item multipleLine="true"
                              wrap="true"
                              extra={this.state.delivery_order.delivery_order_receiver_province
                              + this.state.delivery_order.delivery_order_receiver_city
                              + this.state.delivery_order.delivery_order_receiver_area
                              + this.state.delivery_order.delivery_order_receiver_address}>
                            详细地址
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    {
                        this.state.delivery_order.delivery_order_flow === "WAIT_RECEIVE" || this.state.delivery_order.delivery_order_flow === "COMPLETE" ?
                            this.state.express_list.length === 0 ?
                                null
                                :
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
                                                                        [{item.express_flow}]{item.express_traces[item.express_traces.length - 1].AcceptStation}
                                                                        <Brief>
                                                                            {item.express_traces[item.express_traces.length - 1].AcceptTime}
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
                                </div>:null
                    }
                    <WhiteSpace size="lg"/>
                    <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                        <div className="loading"><ActivityIndicator/></div>
                    </div>
                </div>
        );
    }
}

DeliveryOrderDetail = createForm()(DeliveryOrderDetail);

export default connect(() => ({}))(DeliveryOrderDetail);
