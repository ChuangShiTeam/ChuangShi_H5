import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";

import {ActivityIndicator, Toast, Flex, Tabs, Badge, WingBlank, WhiteSpace, Checkbox} from 'antd-mobile';

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
            is_agree: true,
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

    handleAgree = (val) => {
        console.log(val);
        this.setState({
            is_agree: val.target.checked
        });
    }

    render() {
        const TabPane = Tabs.TabPane;
        const WXListLength = this.state.certificateImageWXList.length;
        const OtherListLength = this.state.certificateImageOtherList.length;
        const AgreeItem = Checkbox.AgreeItem;

        return (
            <div>
                {
                    this.state.is_pay ?
                        <div>
                            <Tabs activeKey={this.state.tab} animated={false} onTabClick={this.handleTab.bind(this)}>
                                <TabPane
                                    tab={<span>微信平台<Badge text={WXListLength === 0 ? "" : WXListLength}/></span>}
                                    key="WX">
                                </TabPane>
                                <TabPane
                                    tab={<span>其他平台<Badge text={OtherListLength === 0 ? "" : OtherListLength}/></span>}
                                    key="OTHER">
                                </TabPane>
                            </Tabs>
                            {
                                this.state.tab === "WX" ?
                                    <div>
                                        {
                                            this.state.is_load && this.state.certificateImageWXList.length === 0 ?
                                                <div>
                                                    <img src={require('../../assets/svg/empty.svg')}
                                                         className="empty-image"
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
                                                    <img src={require('../../assets/svg/empty.svg')}
                                                         className="empty-image"
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
                            <div className="footer">
                                <Flex>
                                    {
                                        this.state.certificateImageWXList.length === 0 ?
                                            <Flex.Item style={{backgroundColor: '#c81623'}}
                                                       className="footer-buttom"
                                                       onClick={this.handleWeChatAdd.bind(this)}>
                                                微信授权书
                                            </Flex.Item>
                                            :
                                            ""
                                    }
                                    <Flex.Item style={{backgroundColor: '#c81623'}} className="footer-buttom"
                                               onClick={this.handleOtherAdd.bind(this)}>其它平台授权书</Flex.Item>
                                </Flex>
                            </div>
                        </div>
                        :

                        <div>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <div style={{padding: '0.3rem 0.3rem'}}>
                                <WhiteSpace size="lg"/>
                                <WingBlank>
                                    <div className="certificate-item">
                                        名字: {this.props.my.user_name}
                                    </div>
                                </WingBlank>
                                <WhiteSpace size="lg"/>
                                <WingBlank>
                                    <div className="certificate-item">
                                        {
                                            this.props.my.member_level_name === '' ?
                                                <span style={{color: '#a72025'}}>等级: 待审核</span>
                                                :
                                                <span>等级: {this.props.my.member_level_name}</span>
                                        }
                                    </div>
                                </WingBlank>
                                <WhiteSpace size="lg"/>
                                <WingBlank>
                                    <div className="certificate-item">
                                        需交保证金: ￥2000
                                    </div>
                                </WingBlank>
                                <WhiteSpace size="lg"/>
                                <WingBlank>
                                    {
                                        this.state.is_agree?
                                            <div
                                                style={{backgroundColor: '#1AAD19'}}
                                                className="footer-buttom"
                                                onClick={this.handleSave.bind(this)}
                                            >
                                                去支付保证金
                                            </div>
                                            :
                                            <div
                                                style={{backgroundColor: '#666'}}
                                                className="footer-buttom"
                                            >
                                                去支付保证金
                                            </div>
                                    }
                                </WingBlank>
                                <WhiteSpace size="lg"/>
                                <WingBlank>
                                    <AgreeItem defaultChecked data-seed="logId"
                                               onChange={this.handleAgree.bind(this)}>
                                        V+Lab <a>控价协议</a>
                                    </AgreeItem>
                                </WingBlank>
                                <WingBlank>
                                    <div className="certificate-agreement">
                                        本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担
                                    </div>
                                </WingBlank>
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

export default connect(({my}) => ({my}))(CertificateIndex);
