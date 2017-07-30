import React, {Component} from "react";
import {connect} from "dva";
import {createForm} from "rc-form";
import {routerRedux} from "dva/router";
import {ActivityIndicator, WhiteSpace, List, InputItem, Item, DatePicker, Toast} from "antd-mobile";
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import constant from "../../util/constant";
import validate from "../../util/validate";
import http from "../../util/http";

class CertificateWechatAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '微信授权书';

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

                Toast.loading('加载中..', 0);

                values.certificate_start_date = values['certificate_start_date'].format('YYYY-MM-DD');
                values.certificate_end_date = values['certificate_end_date'].format('YYYY-MM-DD');
                values.certificate_type = '微信';

                http.request({
                    url: '/certificate/image/save',
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
        const maxDate = moment('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
        const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <InputItem
                        {...getFieldProps('certificate_people_name', {
                            rules: [{
                                required: true,
                                message: '姓名',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('certificate_people_name')}
                        clear
                        placeholder="请输入姓名"
                    >姓名:</InputItem>
                    <InputItem
                        {...getFieldProps('certificate_people_mobile', {
                            rules: [{
                                required: true,
                                message: '手机号码',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('certificate_people_mobile')}
                        clear
                        placeholder="请输入手机号码"
                    >手机号码:</InputItem>
                    <InputItem
                        {...getFieldProps('certificate_people_id_card', {
                            rules: [{
                                required: true,
                                message: '身份证',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('certificate_people_id_card')}
                        clear
                        placeholder="请输入身份证"
                    >身份证:</InputItem>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra=""
                        {...getFieldProps('certificate_start_date', {})}
                        minDate={minDate}
                        maxDate={maxDate}
                    >
                        <List.Item arrow="horizontal">授权开始日期</List.Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra=""
                        {...getFieldProps('certificate_end_date', {})}
                        minDate={minDate}
                        maxDate={maxDate}
                    >
                        <List.Item arrow="horizontal">授权结束日期</List.Item>
                    </DatePicker>
                </List>

                <div className="footer">
                    <div
                        className="footer-buttom"
                        onClick={this.handleSubmit.bind(this)}>
                        新增
                    </div>
                </div>

                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

CertificateWechatAdd = createForm()(CertificateWechatAdd);

export default connect(() => ({}))(CertificateWechatAdd);
