import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {WhiteSpace, List, InputItem, Picker, Steps, Toast} from 'antd-mobile';

import constant from "../util/constant";
import validate from "../util/validate";
import china from "../util/china";
import http from "../util/http";
import storage from '../util/storage';

class StockDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: 'save',
            product_sku_id: '',
            stock: {},
            member_address: {},
            express_traces: []
        }
    }

    componentDidMount() {
        document.title = '发货单';

        document.body.scrollTop = 0;

        if (this.props.route.path.indexOf('/edit/') > -1) {
            this.setState({
                action: 'update'
            });
            this.handleLoadStock();
        }

        this.handleLoadProduct();
    }

    componentWillUnmount() {

    }

    handleLoadStock() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/stock/find',
            data: {
                stock_id: this.props.params.stock_id
            },
            success: function (data) {
                this.setState({
                    stock: data
                });

                if (data.express_traces !== null) {
                    this.setState({
                        express_traces: data.express_traces
                    });
                }

                Toast.hide();
            }.bind(this),
            complete() {

            }
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

                values.stock_receiver_name = this.state.member_address.member_address_name;
                values.stock_receiver_mobile = this.state.member_address.member_address_mobile;
                values.stock_receiver_province = this.state.member_address.member_address_province;
                values.stock_receiver_city = this.state.member_address.member_address_city;
                values.stock_receiver_area = this.state.member_address.member_address_area;
                values.stock_receiver_address = this.state.member_address.member_address_address;

                var stock_product_sku_list = [];
                var map = {};
                map.product_sku_quantity = values.product_sku_quantity;
                map.product_sku_id = this.state.product_sku_id;
                stock_product_sku_list.push(map);
                values.stock_product_sku_list = stock_product_sku_list;
                delete values.product_sku_quantity;

                values.stock_express_pay_way = values.stock_express_pay_way[0];

                Toast.loading('加载中..', 0);

                let action = 'save';
                if (this.props.route.path.indexOf('/edit/') > -1) {
                    action = 'update';

                    values.stock_id = this.props.params.stock_id;
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

    render() {
        const Item = List.Item;
        const Step = Steps.Step;
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
                            ]} {...getFieldProps('stock_express_pay_way', {
                            initialValue: [],
                        })}
                        >
                            <Item arrow="horizontal">支付方式:</Item>
                        </Picker>
                    </List>
                    <WhiteSpace size="lg"/>
                    <div style={{height: '100px'}}></div>
                    <div className="footer">
                        <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>提交</div>
                    </div>
                </div>
                :
                <div>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra={this.state.stock.express_flow == null ? "暂无" : this.state.stock.express_flow}>
                            物流状态
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra={this.state.stock.stock_quantity}>
                            爆水丸数量
                        </Item>
                        <Item extra={this.state.stock.stock_express_pay_way}>
                            支付方式
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra={this.state.stock.stock_receiver_name}>
                            收货人
                        </Item>
                        <Item extra={this.state.stock.stock_receiver_mobile}>
                            手机号码
                        </Item>
                        <Item multipleLine="true"
                              wrap="true"
                              extra={this.state.stock.stock_receiver_province
                                    + this.state.stock.stock_receiver_city
                                    + this.state.stock.stock_receiver_area
                                    + this.state.stock.stock_receiver_address}>
                            详细地址
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item>
                            {this.state.express_traces.length === 0 ?
                                "暂无物流信息"
                                :
                                <Steps>
                                    {
                                        this.state.express_traces.map((item, index) => {
                                            return (
                                                <Step
                                                    key={index}
                                                    icon={index === 0 ? "check-circle-o":""}
                                                    title={
                                                    <div className="traces-item-content">
                                                        {item.AcceptStation}
                                                    </div>
                                                }
                                                    description={item.AcceptTime}
                                                />
                                            );
                                        })
                                    }
                                </Steps>}
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                </div>
        );
    }
}

StockDetail = createForm()(StockDetail);

export default connect(() => ({}))(StockDetail);
