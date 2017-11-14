import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, Icon, Result, Button, Toast} from 'antd-mobile';

import constant from "../../util/constant";
import http from '../../util/http';

class TradeConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            result: 'confirm',
            is_pay: false,
            is_error: false,
            trade_total_amount: 0
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

        var trade_id = this.props.params.trade_id;
        http.request({
            url: '/trade/confirm',
            data: {
                trade_id: trade_id
            },
            success: function (data) {
                if (data.trade_deliver_pattern && data.trade_deliver_pattern === 'CASH_ON_DELIVERY') {
                    this.setState({
                        result: 'success',
                        trade_total_amount: data.trade_total_amount
                    });
                } else {
                    if (data.trade_is_pay) {
                        this.setState({
                            result: 'success',
                            trade_total_amount: data.trade_total_amount
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
                            result: 'error'
                        });
                    }
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
            query: {}
        }));
    }

    handleTrade() {
        this.props.dispatch(routerRedux.push({
            pathname: '/trade/index/ALL',
            query: {}
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
                            message="已操作成功，等待平台确认"
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
                            title="订单确认成功"
                            message={<div>
                                <div
                                    style={{
                                        fontSize: '0.73rem',
                                        color: '#000',
                                        lineHeight: 1
                                    }}
                                >
                                    <span style={{ fontSize: '0.64rem' }}>￥</span>{Number(this.state.trade_total_amount).toFixed(2)}
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
                    <Button onClick={this.handleTrade.bind(this)}>查看订单</Button>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(TradeConfirm);
