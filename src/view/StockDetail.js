import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {WhiteSpace, List, InputItem, Picker, Steps} from 'antd-mobile';

import china from "../util/china";

class StockDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: 'save'
        }
    }

    componentDidMount() {
        document.title = '发货单';

        document.body.scrollTop = 0;

        if (this.props.route.path.indexOf('/edit/') > -1) {
            this.setState({
                action: 'update'
            });
        }
    }

    componentWillUnmount() {

    }

    handleAdd() {

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
                            ]} {...getFieldProps('stock_pay_type', {
                            initialValue: [],
                        })}
                        >
                            <Item arrow="horizontal">支付方式:</Item>
                        </Picker>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            {...getFieldProps('member_address_name', {
                                rules: [{
                                    required: true,
                                    message: '请输入收货人',
                                }],
                                initialValue: '',
                            })}
                            error={!!getFieldError('member_address_name')}
                            clear
                            placeholder="请输入收货人"
                        >收货人:</InputItem>
                        <InputItem
                            {...getFieldProps('member_address_mobile', {
                                rules: [{
                                    required: true,
                                    message: '请输入手机号码',
                                }],
                                initialValue: '',
                            })}
                            error={!!getFieldError('member_address_mobile')}
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
                            {...getFieldProps('address_street', {
                                rules: [{
                                    required: true,
                                    message: '请输入详细地址',
                                }],
                                initialValue: '',
                            })}
                            error={!!getFieldError('address_street')}
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
                        <Item extra="签收">
                            物流状态
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra="123">
                            爆水丸数量
                        </Item>
                        <Item extra="到付">
                            支付方式
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra="zyq">
                            收货人
                        </Item>
                        <Item extra="13162999586">
                            手机号码
                        </Item>
                        <Item extra="13162999586">
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
