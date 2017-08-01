import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, Icon, Result, Button, Toast} from 'antd-mobile';

import constant from "../../util/constant";
import http from '../../util/http';

class MemberPurchaseOrderConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            result: 'confirm',
            is_pay: false,
            is_error: false,
            member_purchase_order_total_amount: 0
        }
    }

    componentDidMount() {
        document.title = '交易反馈';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        var member_purchase_order_id = this.props.params.member_purchase_order_id;
        http.request({
            url: '/member/purchase/order/confirm',
            data: {
                member_purchase_order_id: member_purchase_order_id
            },
            success: function (data) {
                if (data.member_purchase_order_is_pay) {
                    this.setState({
                        result: 'success',
                        member_purchase_order_total_amount: data.member_purchase_order_total_amount
                    });
                } else if (this.state.count < 2) {
                    this.setState({
                        count: this.state.count + 1
                    });

                    setTimeout(() => {
                        this.handleLoad();
                    }, 1500);
                } else {
                    this.setState({
                        result: 'error',
                    });
                }

                Toast.hide();
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleIndex() {
        this.props.dispatch(routerRedux.push({
            pathname: constant.index,
            query: {},
        }));
    }

    handleMemberPurchaseOrder() {
        this.props.dispatch(routerRedux.push({
            pathname: 'member/purchase/order/index/ALL',
            query: {},
        }));
    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.state.result === 'confirm' ?
                        <Result
                            img={<img src={require('../../assets/svg/waiting.svg')} style={{ width: '1.2rem', height: '1.2rem' }} alt=""/>}
                            title="等待确认"
                            message="已支付成功，等待平台确认"
                        />
                        :
                        ''
                }
                {
                    this.state.result === 'success' ?
                        <Result
                            img={<Icon
                                type="check-circle"
                                style={{ fill: '#1F90E6', width: '1.2rem', height: '1.2rem' }}
                                alt=""
                            />}
                            title="进货确认成功"
                            message={<div>
                                <div
                                    style={{
                                        fontSize: '0.73rem',
                                        color: '#000',
                                        lineHeight: 1,
                                    }}
                                >
                                    <span style={{ fontSize: '0.64rem' }}>￥</span>{Number(this.state.member_purchase_order_total_amount).toFixed(2)}
                                </div>
                            </div>}
                        />
                        :
                        ''
                }
                {
                    this.state.result === 'error' ?
                        <Result
                            img={<img src={require('../../assets/svg/notice.svg')} style={{ width: '1.2rem', height: '1.2rem' }} alt=""/>}
                            title="网络异常"
                            message="请与平台工作人员确认"
                        />
                        :
                        ''
                }
                <div style={{ margin: '100px 10px 0px 10px' }}>
                    <Button type="primary" onClick={this.handleIndex.bind(this)}>返回首页</Button>
                </div>
                <WhiteSpace size="lg"/>
                <div style={{ margin: '0px 10px 0px 10px' }}>
                    <Button onClick={this.handleMemberPurchaseOrder().bind(this)}>查看进货</Button>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberPurchaseOrderConfirm);
