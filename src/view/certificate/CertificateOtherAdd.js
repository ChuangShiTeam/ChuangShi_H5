import React, {Component} from "react";
import {connect} from "dva";
import {createForm} from "rc-form";
import {routerRedux} from "dva/router";
import {ActivityIndicator, List, InputItem, Toast, Picker} from "antd-mobile";

import http from "../../util/http";
import constant from "../../util/constant";
import validate from "../../util/validate";

class CertificateOtherAdd extends Component {
    constructor(props) {
        super(props);


        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '其他平台授权书';

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

                if (values.certificate_type.length === 0) {
                    Toast.fail('请选择授权平台', constant.duration);

                    return;
                }

                if (!validate.isMobile(values.certificate_people_mobile)) {
                    Toast.fail('手机号码格式不对', constant.duration);

                    return;
                }

                values.certificate_type = values.certificate_type[0];

                Toast.loading('加载中..', 0);

                http.request({
                    url: '/certificate/image/other/save',
                    data: values,
                    success: function (data) {
                        Toast.hide();

                        this.handleBack();
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

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        const district = [
            {
                label: '淘宝',
                value: '淘宝'
            },
            {
                label: '天猫',
                value: '天猫'
            },
            {
                label: '咸鱼',
                value: '咸鱼'
            },
            {
                label: '京东',
                value: '京东'
            }
        ];

        return (
            <div>
                <List>
                    <Picker
                        cols={1}
                        data={district} {...getFieldProps('certificate_type', {
                        initialValue: [],
                    })}
                    >
                        <List.Item arrow="horizontal">授权平台</List.Item>
                    </Picker>
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
                    <InputItem
                        {...getFieldProps('certificate_people_wx', {
                            rules: [{
                                required: true,
                                message: '微信号',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('certificate_people_wx')}
                        clear
                        placeholder="请输入微信号"
                    >微信号:</InputItem>
                    <InputItem
                        {...getFieldProps('certificate_shop_name', {
                            rules: [{
                                required: true,
                                message: 'certificate_shop_name',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('certificate_shop_name')}
                        clear
                        placeholder="请输入店铺名称"
                    >店铺名称:</InputItem>
                    <InputItem
                        {...getFieldProps('certificate_shop_url', {
                            rules: [{
                                required: true,
                                message: 'certificate_shop_url',
                            }],
                            initialValue: '',
                        })}
                        error={!!getFieldError('certificate_shop_url')}
                        clear
                        placeholder="请输入店铺地址"
                    >店铺地址:</InputItem>
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

CertificateOtherAdd = createForm()(CertificateOtherAdd);

export default connect(() => ({}))(CertificateOtherAdd);
