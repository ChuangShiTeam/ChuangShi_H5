import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List, Flex} from 'antd-mobile';
import constant from "../../util/constant";
import http from "../../util/http";

class CertificateIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            certificate: {},
            certificateImageWXList: [],
            certificateImageOtherList: [],
            is_pay: false
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
                })
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
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

    handlePlay() {

    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <List style={{marginBottom: '80px'}}>
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
                </List>
                {
                    this.state.is_pay ?
                        <div className="footer">
                            <Flex>
                                <Flex.Item style={{backgroundColor: '#1AAD19'}} className="footer-buttom"
                                           onClick={this.handleWeChatAdd.bind(this)}>微信授权书</Flex.Item>
                                <Flex.Item style={{backgroundColor: '#1AAD19'}} className="footer-buttom"
                                           onClick={this.handleOtherAdd.bind(this)}>其它平台授权书</Flex.Item>
                            </Flex>
                        </div>
                        :
                        <div className="footer">
                            <div
                                style={{backgroundColor: '#1AAD19'}}
                                className="footer-buttom"
                                onClick={this.handlePlay.bind(this)}
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
