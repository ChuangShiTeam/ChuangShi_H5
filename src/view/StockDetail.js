import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {WhiteSpace, List, InputItem, Picker, Steps, Toast} from 'antd-mobile';

import constant from "../util/constant";
import validate from "../util/validate";
import china from "../util/china";
import http from "../util/http";

class StockDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: 'save',
            product_sku_id: '',
            stock: {}
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
                stock_id: this.props.params.stock_id,
            },
            success: function (data) {
                this.setState({
                    stock: data
                });

                Toast.hide();
            }.bind(this),
            complete() {

            },
        });
    }

    handleLoadProduct() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/product/find',
            data: {
                product_id: "76537999b6c6428d9a78d47739c08fa5",
            },
            success: function (data) {
                this.setState({
                    product_sku_id: data.product_sku_id
                });

                Toast.hide();
            }.bind(this),
            complete() {

            },
        });
    }

    handleAdd() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                if (!validate.isMobile(values.stock_receiver_mobile)) {
                    Toast.fail('手机号码格式不对', constant.duration);

                    return;
                }

                if (values.member_address_province_city_area.length === 0) {
                    Toast.fail('请选择省市区', constant.duration);

                    return;
                }

                values.stock_receiver_province = values.member_address_province_city_area[0];
                values.stock_receiver_city = values.member_address_province_city_area[1];
                values.stock_receiver_area = values.member_address_province_city_area[2];

                let province = '';
                let city = '';
                let area = '';
                let cityList = [];
                let areaList = [];

                for (let i = 0; i < china.length; i++) {
                    if (china[i].value === values.stock_receiver_province) {
                        province = china[i].label;

                        cityList = china[i].children;

                        break;
                    }
                }

                for (let i = 0; i < cityList.length; i++) {
                    if (cityList[i].value === values.stock_receiver_city) {
                        city = cityList[i].label;

                        areaList = cityList[i].children;

                        break;
                    }
                }

                for (let i = 0; i < areaList.length; i++) {
                    if (areaList[i].value === values.stock_receiver_area) {
                        area = areaList[i].label;

                        break;
                    }
                }
                values.stock_receiver_province = province;
                values.stock_receiver_city = city;
                values.stock_receiver_area = area;
                delete values.member_address_province_city_area;

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
                            this.handleBack();
                        }
                    }.bind(this),
                    complete() {

                    },
                });
            }
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        const Item = List.Item;
        const Step = Steps.Step;

        const {getFieldProps, getFieldError} = this.props.form;

        return (
            this.state.action === 'save' ?
                <div>
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
                    <List>
                        <InputItem
                            {...getFieldProps('stock_receiver_name', {
                                rules: [{
                                    required: true,
                                    message: '请输入收货人',
                                }],
                                initialValue: '',
                            })}
                            error={!!getFieldError('stock_receiver_name')}
                            clear
                            placeholder="请输入收货人"
                        >收货人:</InputItem>
                        <InputItem
                            {...getFieldProps('stock_receiver_mobile', {
                                rules: [{
                                    required: true,
                                    message: '请输入手机号码',
                                }],
                                initialValue: '',
                            })}
                            error={!!getFieldError('stock_receiver_mobile')}
                            clear
                            placeholder="请输入手机号码"
                        >手机号码:</InputItem>
                        <Picker
                            data={china} {...getFieldProps('member_address_province_city_area', {
                            initialValue: [],
                        })}
                        >
                            <Item arrow="horizontal">省市区:</Item>
                        </Picker>
                        <InputItem
                            {...getFieldProps('stock_receiver_address', {
                                rules: [{
                                    required: true,
                                    message: '请输入详细地址',
                                }],
                                initialValue: '',
                            })}
                            error={!!getFieldError('stock_receiver_address')}
                            clear
                            placeholder="请输入详细地址"
                        >详细地址:</InputItem>
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
                        <Item extra={this.state.stock.express_flow ? "暂无" : this.state.stock.express_flow}>
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
                        <Item
                            extra={this.state.stock.stock_receiver_province + this.state.stock.stock_receiver_city + this.state.stock.stock_receiver_area + this.state.stock.stock_receiver_address}>
                            详细地址
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item>
                            <WhiteSpace size="lg"/>
                            <Steps size="small" current={1}>
                                <Step title="Finished" description="This is description"/>
                                <Step title="In Progress" description="This is description"/>
                                <Step title="Waiting" description="This is description"/>
                            </Steps>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                </div>
        );
    }
}

StockDetail = createForm()(StockDetail);

export default connect(() => ({}))(StockDetail);
