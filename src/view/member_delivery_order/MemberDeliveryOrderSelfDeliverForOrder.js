import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {ActivityIndicator, WhiteSpace, WingBlank, List, InputItem, Button, Picker, Toast} from 'antd-mobile';

import constant from "../../util/constant";
import express_code from "../../util/express_code";
import http from "../../util/http";
import storage from '../../util/storage';

class MemberDeliveryOrderSelfDeliverForOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            action: 'save',
            product_sku_id: '',
            member_address: {},
            express_id: 0,
            express_list: [{
                express_id: 0,
                express_shipper_code: '',
                express_no: '',
                express_cost: '',
                is_allow_delete: false
            }]
        }
    }

    componentDidMount() {
        document.title = '发货单';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                let expres_list = [];
                let is_express_shipper_code = false;
                let is_express_no = false;
                let is_express_cost = false;
                for (let i = 0; i < this.state.express_list.length; i++) {
                    let express_shipper_code = this.props.form.getFieldValue('express_shipper_code_' + this.state.express_list[i].express_id);
                    let express_no = this.props.form.getFieldValue('express_no_' + this.state.express_list[i].express_id);
                    let express_cost = this.props.form.getFieldValue('express_cost_' + this.state.express_list[i].express_id);

                    if (express_shipper_code.length === 0) {
                        is_express_shipper_code = true;
                    }

                    if (is_express_no === '') {
                        is_express_no = true;
                    }

                    if (is_express_cost === '') {
                        is_express_cost = true;
                    }

                    expres_list.push({
                        express_shipper_code: express_shipper_code[0],
                        express_no: express_no,
                        express_cost: express_cost
                    });
                }

                if (is_express_shipper_code) {
                    Toast.fail('请选择完整快递公司', constant.duration);
                    return;
                }

                if (is_express_no) {
                    Toast.fail('请填写完整快递单号', constant.duration);
                    return;
                }

                if (is_express_cost) {
                    Toast.fail('请填写完整运费', constant.duration);
                    return;
                }

                values.member_delivery_order_id = this.props.params.member_delivery_order_id
                values.express_list = expres_list;

                Toast.loading('加载中..', 0);

                http.request({
                    url: '/member/delivery/order/self/deliver',
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

    handleExpressAdd() {
        let express_id = this.state.express_id + 1;
        let express_list = this.state.express_list;

        express_list.push({
            express_id: express_id,
            express_shipper_code: '',
            express_no: '',
            express_cost: '',
            is_allow_delete: true
        });

        this.setState({
            express_id: express_id,
            express_list: express_list
        });
    }

    handleExpressDel(express_id) {
        let express_list = this.state.express_list;

        let list = [];
        for (let i = 0; i < express_list.length; i++) {
            if (express_id !== express_list[i].express_id) {
                list.push(express_list[i]);
            }
        }

        this.setState({
            express_list: list
        });
    }

    handleMemberAddress() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/address/index/select',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
                {
                    this.state.express_list.map((item) => {
                        return (
                            <div key={item.express_id}>
                                <WhiteSpace size="lg"/>
                                <List>
                                    <Picker
                                        cols={1}
                                        data={express_code}
                                        {...getFieldProps('express_shipper_code_' + item.express_id, {
                                        initialValue: [],
                                    })}
                                    >
                                        <Item arrow="horizontal">快递公司:</Item>
                                    </Picker>
                                    <InputItem
                                        {...getFieldProps('express_no_' + item.express_id, {
                                            rules: [{
                                                required: true,
                                                message: '请输入快递单号',
                                            }],
                                            initialValue: '',
                                        })}
                                        error={!!getFieldError('express_no_' + item.express_id)}
                                        clear
                                        placeholder="请输入快递单号"
                                    >快递单号:</InputItem>
                                    <InputItem
                                        {...getFieldProps('express_cost_' + item.express_id, {
                                            rules: [{
                                                required: true,
                                                message: '请输入运费',
                                            }],
                                            initialValue: '',
                                        })}
                                        type="money"
                                        error={!!getFieldError('express_cost_' + item.express_id)}
                                        clear
                                        placeholder="请输入运费"
                                    >运费:</InputItem>
                                    {
                                        item.is_allow_delete ?
                                            <Item>
                                                <Button type="primary"
                                                        size="small"
                                                        inline
                                                        onClick={this.handleExpressDel.bind(this, item.express_id)}
                                                >
                                                    删除该快递单
                                                </Button>
                                            </Item>
                                            :
                                            ''
                                    }
                                </List>
                            </div>
                        );
                    })
                }
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <WingBlank size="md"><Button onClick={this.handleExpressAdd.bind(this)}>新增快递单</Button></WingBlank>
                <WhiteSpace size="lg"/>
                <div style={{height: '200px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleSubmit.bind(this)}>提交</div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

MemberDeliveryOrderSelfDeliverForOrder = createForm()(MemberDeliveryOrderSelfDeliverForOrder);

export default connect(() => ({}))(MemberDeliveryOrderSelfDeliverForOrder);
