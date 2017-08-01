import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";

import {ActivityIndicator, WhiteSpace, List, TextareaItem, Modal, Toast, Flex, Tabs, Badge} from 'antd-mobile';

import constant from '../../util/constant';
import storage from '../../util/storage';
import http from '../../util/http';

class CertificateIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            certificate: {},
            certificateImageWXList: [],
            certificateImageOtherList: [],
            is_pay: false,
            tab: 'WX'
        }
    }

    componentDidMount() {
        document.title = '我的授权书';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/certificate/find',
            data: {},
            success: function (data) {
                this.setState({
                    certificate: data.certificate,
                    certificateImageWXList: data.certificateImageWXList,
                    certificateImageOtherList: data.certificateImageOtherList
                });
                if (data.certificate !== {} && data.certificate.certificate_is_pay !== undefined) {
                    this.setState({
                        is_pay: data.certificate.certificate_is_pay
                    });
                }
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleTab(tab) {
        this.setState({
            tab: tab
        });
    }


    handleWeChatAdd() {
        this.props.dispatch(routerRedux.push({
            pathname: '/certificate/wechat/add',
            query: {},
        }));
    }

    handleOtherAdd() {
        this.props.dispatch(routerRedux.push({
            pathname: '/certificate/other/add',
            query: {},
        }));
    }

    handleSave() {
        if (this.state.is_pay) {
            return;
        }

        Toast.loading('加载中..', 0);

        http.request({
            url: '/certificate/save',
            data: {
                open_id: storage.getOpenId()
            },
            success: function (data) {
                window.wx.chooseWXPay({
                    timestamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function (res) {
                        if (res.errMsg === "chooseWXPay:ok") {
                            //支付成功
                            this.props.dispatch(routerRedux.push({
                                pathname: '/certificate/confirm/' + data.certificate_id,
                                query: {},
                            }));
                        } else {
                            //支付失败
                        }
                    }.bind(this),
                    fail: function (res) {
                    },
                    cancel: function (res) {
                    }
                });

                Toast.hide();
            }.bind(this),
            complete() {

            }
        });
    }

    handlePay() {
        if (this.state.is_pay) {
            return;
        }

        Toast.loading('加载中..', 0);

        http.request({
            url: '/certificate/pay',
            data: {
                open_id: storage.getOpenId()
            },
            success: function (data) {
                //支付成功
                this.props.dispatch(routerRedux.push({
                    pathname: '/certificate/confirm/' + data.certificate_id,
                    query: {},
                }));

                Toast.hide();
            }.bind(this),
            complete() {

            }
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        const TabPane = Tabs.TabPane;
        const WXListLength = this.state.certificateImageWXList.length;
        const OtherListLength = this.state.certificateImageOtherList.length;

        return (
            <div>
                <Tabs activeKey={this.state.tab} animated={false} onTabClick={this.handleTab.bind(this)}>
                    <TabPane
                        tab={<span>微信平台<Badge text={WXListLength===0?"":WXListLength}/></span>}
                        key="WX">
                    </TabPane>
                    <TabPane
                        tab={<span>其他平台<Badge text={OtherListLength===0?"":OtherListLength}/></span>}
                        key="OTHER">
                    </TabPane>
                </Tabs>
                {
                    this.state.tab === "WX" ?
                        <div>
                            {
                                this.state.is_load && this.state.certificateImageWXList.length === 0 ?
                                    <div>
                                        <img src={require('../../assets/svg/empty.svg')} className="empty-image"
                                             alt=""/>
                                        <div className="empty-text">没有数据</div>
                                    </div>
                                    :
                                    ''
                            }
                            {
                                this.state.certificateImageWXList.map((item, index) => {
                                    return (
                                        <img key={index}
                                             style={{
                                        width: document.documentElement.clientWidth + 'px',
                                        paddingBottom: '30px'
                                     }}
                                             src={constant.host + item.file_original_path} alt=""
                                        />
                                    );
                                })
                            }
                        </div>
                        :
                        ''
                }
                {
                    this.state.tab === "OTHER" ?
                        <div>
                            {
                                this.state.is_load && this.state.certificateImageOtherList.length === 0 ?
                                    <div>
                                        <img src={require('../../assets/svg/empty.svg')} className="empty-image"
                                             alt=""/>
                                        <div className="empty-text">没有数据</div>
                                    </div>
                                    :
                                    ''
                            }
                            {
                                this.state.certificateImageOtherList.map((item, index) => {
                                    return (
                                        <img key={index}
                                             style={{
                                                    width: document.documentElement.clientWidth + 'px',
                                                    paddingBottom: '30px'
                                                 }}
                                             src={constant.host + item.file_original_path} alt=""
                                        />
                                    );
                                })
                            }
                        </div>
                        :
                        ''
                }
                {
                    this.state.is_pay ?
                        <div className="footer">
                            <Flex>
                                {
                                    this.state.certificateImageWXList.length === 0 ?
                                        <Flex.Item style={{backgroundColor: '#1AAD19'}} className="footer-buttom"
                                                   onClick={this.handleWeChatAdd.bind(this)}>
                                            微信授权书
                                        </Flex.Item>
                                        :
                                        ""
                                }
                                <Flex.Item style={{backgroundColor: '#1AAD19'}} className="footer-buttom"
                                           onClick={this.handleOtherAdd.bind(this)}>其它平台授权书</Flex.Item>
                            </Flex>
                        </div>
                        :
                        <div className="footer">
                            <div
                                style={{backgroundColor: '#1AAD19'}}
                                className="footer-buttom"
                                onClick={this.handleSave.bind(this)}
                            >
                                去支付保证金
                            </div>
                        </div>
                }
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(CertificateIndex);
