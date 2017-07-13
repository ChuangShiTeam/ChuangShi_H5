import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Toast} from 'antd-mobile';

import http from '../util/http';

class MemberIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            member: {
                user_name: '',
                user_avatar: '',
                member_level_name: '',
            }
        }
    }

    componentDidMount() {
        document.title = '团队信息';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/team/find',
            data: {
                member_id: this.props.params.member_id
            },
            success: function (data) {
                this.setState({
                    user_name: data.user_name,
                    user_avatar: data.user_avatar,
                    member_level_name: data.member_level_name
                });

                Toast.hide();
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleMemberTrade() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/trade/index/' + this.props.params.member_id,
            query: {}
        }));
    }

    handleMemberStock() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/stock/index/' + this.props.params.member_id,
            query: {}
        }));
    }

    handleMemberBill() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/bill/index/' + this.props.params.member_id,
            query: {}
        }));
    }

    handleMemberLevel() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/level/' + this.props.params.member_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <List.Item
                        multipleLine
                    >
                        <div className="list-item-image">
                            <img src={this.state.user_avatar} alt=""/>
                        </div>
                        <div className="list-item-text">
                            {this.state.user_name}
                        </div>
                        <div className="list-item-brief">
                            {
                                this.state.member_level_name === '' ?
                                    <span style={{color: '#a72025'}}>待审核</span>
                                    :
                                    this.state.member_level_name
                            }
                        </div>
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item arrow="horizontal" onClick={this.handleMemberTrade.bind(this)}>
                        TA的订单
                    </Item>
                    <Item arrow="horizontal" onClick={this.handleMemberStock.bind(this)}>
                        TA的发货单
                    </Item>
                    <Item arrow="horizontal" onClick={this.handleMemberBill.bind(this)}>
                        TA的账单流水
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item arrow="horizontal" onClick={this.handleMemberLevel.bind(this)}>
                        重设等级
                    </Item>
                </List>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberIndex);
