import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { createForm } from 'rc-form';
import {Toast, Modal, WhiteSpace, List, InputItem, Picker, Switch, Button} from 'antd-mobile';

import china from '../util/china';

class AddressDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        document.title = '我要进货';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    handleAdd() {

    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <InputItem
                        {...getFieldProps('delivery_name', {
                            rules: [{
                                required: true,
                                message: '请输入收货人',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('delivery_name')}
                        clear
                        placeholder="请输入收货人"
                    >收货人:</InputItem>
                    <InputItem
                        {...getFieldProps('delivery_phone', {
                            rules: [{
                                required: true,
                                message: '请输入手机号码',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('delivery_phone')}
                        clear
                        placeholder="请输入手机号码"
                    >手机号码:</InputItem>
                    <Picker
                        data={china} {...getFieldProps('delivery_province_city_area', {
                        initialValue: [],
                    })}
                    >
                        <List.Item arrow="horizontal">省市区:</List.Item>
                    </Picker>
                    <InputItem
                        {...getFieldProps('delivery_street', {
                            rules: [{
                                required: true,
                                message: '请输入详细地址',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('delivery_street')}
                        clear
                        placeholder="请输入详细地址"
                    >详细地址:</InputItem>
                </List>
                <WhiteSpace size="lg" />
                <List>
                    <List.Item
                        extra={<Switch
                            {...getFieldProps('delivery_is_default', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })}
                        />}
                    >设为默认地址</List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>新建收货地址</div>
                </div>
            </div>
        );
    }
}

AddressDetail = createForm()(AddressDetail);

export default connect(({}) => ({}))(AddressDetail);
