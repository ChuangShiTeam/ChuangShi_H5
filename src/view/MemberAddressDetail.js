import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { createForm } from 'rc-form';
import {WhiteSpace, List, InputItem, Picker, Switch, Toast} from 'antd-mobile';

import constant from '../util/constant';
import validate from '../util/validate';
import china from '../util/china';
import http from '../util/http';

class MemberAddressDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        document.title = '我的地址';

        document.body.scrollTop = 0;

        if (this.props.route.path.indexOf('/edit/') > -1) {
            this.handleLoad();
        }
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/member/address/find',
            data: {
                member_address_id: this.props.params.member_address_id,
            },
            success: function (data) {
                data.member_address_province_city_area = [data.member_address_province, data.member_address_city, data.member_address_area];

                this.props.form.setFieldsValue(data);
            }.bind(this),
            complete() {

            },
        });
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                if (!validate.isMobile(values.member_address_mobile)) {
                    Toast.fail('手机号码格式不对', constant.duration);

                    return;
                }

                if (values.member_address_province_city_area.length === 0) {
                    Toast.fail('请选择省市区', constant.duration);

                    return;
                }

                values.member_address_province = values.member_address_province_city_area[0];
                values.member_address_city = values.member_address_province_city_area[1];
                values.member_address_area = values.member_address_province_city_area[2];

                let province = '';
                let city = '';
                let area = '';
                let cityList = [];
                let areaList = [];

                for (let i = 0; i < china.length; i++) {
                    if (china[i].value === values.member_address_province) {
                        province = china[i].label;

                        cityList = china[i].children;

                        break;
                    }
                }

                for (let i = 0; i < cityList.length; i++) {
                    if (cityList[i].value === values.member_address_city) {
                        city = cityList[i].label;

                        areaList = cityList[i].children;

                        break;
                    }
                }

                for (let i = 0; i < areaList.length; i++) {
                    if (areaList[i].value === values.member_address_area) {
                        area = areaList[i].label;

                        break;
                    }
                }

                values.member_address_address = province + city + area + values.address_street;

                Toast.loading('加载中..', 0);

                let action = 'save';
                if (this.props.route.path.indexOf('/edit/') > -1) {
                    action = 'update';

                    values.member_address_id = this.props.params.member_address_id;
                }

                http.request({
                    url: '/member/address/' + action,
                    data: values,
                    success: function (data) {
                        Toast.hide();

                        this.handleBack();
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

        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
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
                <WhiteSpace size="lg" />
                <List>
                    <Item
                        extra={<Switch
                            {...getFieldProps('address_is_default', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })}
                        />}
                    >设为默认地址</Item>
                </List>
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleSubmit.bind(this)}>提交</div>
                </div>
            </div>
        );
    }
}

MemberAddressDetail = createForm()(MemberAddressDetail);

export default connect(() => ({}))(MemberAddressDetail);
