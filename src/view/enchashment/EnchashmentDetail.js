import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {createForm} from "rc-form";
import {ActivityIndicator, WhiteSpace, List, InputItem, Toast} from "antd-mobile";

import constant from "../../util/constant";
import http from "../../util/http";

class EnchashmentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            bill_amount: 0.00
        }
    }

    componentDidMount() {
        document.title = '我要提现';

        document.body.scrollTop = 0;

        if (this.props.route.path.indexOf('/edit/') > -1) {
            this.handleLoad();
        } else {
            this.handleLoad();
        }
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/enchashment/find',
            data: {

            },
            success: function (data) {
                this.setState({
                    bill_amount: data.bill_amount
                });

                // data.enchashment_amount = data.bill_amount;
                // delete data.bill_amount;
                // this.props.form.setFieldsValue(data);
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleSubmit() {
        if (this.state.bill_amount === 0) {
            return;
        }

        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                if (values.enchashment_amount > this.state.bill_amount) {
                    Toast.fail('提现金额不能超过余额', constant.duration);

                    return;
                }

                Toast.loading('加载中..', 0);

                let action = 'save';
                if (this.props.route.path.indexOf('/edit/') > -1) {
                    action = 'update';
                }

                http.request({
                    url: '/mobile/enchashment/' + action,
                    data: values,
                    success: function (data) {
                        Toast.hide();

                        this.props.dispatch(routerRedux.push({
                            pathname: '/enchashment/result',
                            query: {}
                        }));
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

    handleEnchashment() {
        this.props.dispatch(routerRedux.push({
            pathname: '/enchashment/index',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item multipleLine
                          extra="提现记录"
                          arrow="horizontal"
                          thumb={require('../../assets/svg/money_bag.svg')}
                          onClick={this.handleEnchashment.bind(this)}
                    >
                        余额: ￥{this.state.bill_amount.toFixed(2)}
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item>
                        提现到微信零钱
                    </Item>
                    <InputItem
                        {...getFieldProps('enchashment_amount', {
                            rules: [{
                                required: true,
                                message: '请输入提现金额',
                            }],
                            initialValue: '',
                        })}
                        type="money"
                        error={!!getFieldError('enchashment_amount')}
                        clear
                        placeholder="请输入提现金额"
                    >提现金额:</InputItem>
                </List>
                <WhiteSpace size="lg"/>
                <div style={{height: '200px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" style={{backgroundColor: this.state.bill_amount > 0 ? '#1AAD19' : '#dddddd'}} onClick={this.handleSubmit.bind(this)}>提现</div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

EnchashmentDetail = createForm()(EnchashmentDetail);

export default connect(() => ({}))(EnchashmentDetail);
