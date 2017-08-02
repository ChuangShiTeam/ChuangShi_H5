import React, {Component} from "react";
import {connect} from "dva";
import {createForm} from "rc-form";
import {routerRedux} from "dva/router";
import {ActivityIndicator, List, InputItem, Toast} from "antd-mobile";
import 'moment/locale/zh-cn';

import http from "../../util/http";
import constant from "../../util/constant";
import validate from "../../util/validate";

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

                if (!validate.isMobile(values.certificate_people_mobile)) {
                    Toast.fail('手机号码格式不对', constant.duration);

                    return;
                }

                values.certificate_type = '微信';

                Toast.loading('加载中..', 0);

                http.request({
                    url: '/certificate/image/wx/save',
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
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
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
