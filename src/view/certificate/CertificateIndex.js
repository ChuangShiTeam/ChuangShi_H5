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
            certificateImageList: [],
            certificateImageWXList: [],
            certificateImageOtherList: [],
            is_pay: false,
            is_agree: true,
            tab: 'WX',
            total_fee: 0.00
        }
    }

    componentDidMount() {
        document.title = '我的授权书';

        document.body.scrollTop = 0;

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
                    certificateImageList: data.certificateImageList,
                    certificateImageWXList: data.certificateImageWXList,
                    certificateImageOtherList: data.certificateImageOtherList,
                    total_fee: data.total_fee
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
                            {
                                this.state.certificateImageList.map((item, index) => {
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
                            <WhiteSpace size="lg"/>
                            <div style={{height: '100px'}}></div>
                            <div className="footer">
                                {
                                    this.state.certificateImageWXList.length === 0 ?
                                        <div>
                                            <div className="footer-buttom certificateIndex-add-button"
                                                 onClick={this.handleWeChatAdd.bind(this)}>
                                                微信授权书
                                            </div>
                                            <div className="footer-buttom certificateIndex-add-button certificateIndex-add-button-left"
                                                 onClick={this.handleOtherAdd.bind(this)}>其它平台授权书</div>
                                        </div>
                                        :
                                        <div className="footer-buttom"
                                             onClick={this.handleOtherAdd.bind(this)}>
                                            其它平台授权书
                                        </div>
                                }
                            </div>
                        </div>
                        :
                        <div>
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
                                        等级: {
                                            this.props.my.member_level_name === '' ?
                                                <span style={{color: '#a72025'}}>待审核</span>
                                                :
                                                <span>{this.props.my.member_level_name}</span>
                                        }
                                    </div>
                                </WingBlank>
                                <WhiteSpace size="lg"/>
                                <WingBlank>
                                    <div className="certificate-item">
                                        需交保证金: ￥{this.state.total_fee}
                                    </div>
                                </WingBlank>
                                <WhiteSpace size="lg"/>
                                <WingBlank>
                                    {
                                        this.state.is_agree ?
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
                                        V+Lab 控价协议
                                    </AgreeItem>
                                </WingBlank>
                                <WingBlank>
                                    <div className="certificate-agreement">
                                        <p>V+Lab经销商控价承诺：</p>
                                        <p>为规范V+Lab市场秩序，本人郑重作出以下承诺：</p>
                                        <p>1、不利用公司名义从事非法活动，不利用公司从事未授权的活动；</p>
                                        <p>2、不销售非从公司采购的该品牌产品，不销售假货；</p>
                                        <p>3、无论在任何平台，不私自降价销售所有V+Lab产品；</p>
                                        <p>4、不损毫消费者合法权益并造成消费者损失；</p>
                                        <p>5、不参与任何不正当竞争活动。</p>
                                        <p>如本人有以上行为，本人许可公司罚没控价保证金，并取消本人的V+Lab代理资格，一切损失由本人自行承担。</p>
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
