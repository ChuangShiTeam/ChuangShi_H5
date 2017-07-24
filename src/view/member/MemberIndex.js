import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List} from 'antd-mobile';

import http from '../../util/http';

class MemberIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            user_name: '',
            user_avatar: '',
            member_level_name: '',
            member_status: false,
            is_children: false
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
        http.request({
            url: '/member/team/find',
            data: {
                member_id: this.props.params.member_id
            },
            success: function (data) {
                this.setState({
                    user_name: data.user_name,
                    user_avatar: data.user_avatar,
                    member_level_name: data.member_level_name,
                    member_status: data.member_status,
                    is_children: data.is_children
                });
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

    handleMemberDeliveryOrder() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/delivery/order/index/' + this.props.params.member_id,
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
                                this.state.member_status ?
                                    this.state.member_level_name
                                    :
                                    <span style={{color: '#a72025'}}>待审核</span>
                            }
                        </div>
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item arrow="horizontal" onClick={this.handleMemberTrade.bind(this)}>
                        TA的订单
                    </Item>
                    {/*<Item arrow="horizontal" onClick={this.handleMemberDeliveryOrder.bind(this)}>*/}
                        {/*TA的发货单*/}
                    {/*</Item>*/}
                    {/*<Item arrow="horizontal" onClick={this.handleMemberBill.bind(this)}>*/}
                        {/*TA的账单流水*/}
                    {/*</Item>*/}
                </List>
                <WhiteSpace size="lg"/>
                {
                    this.state.is_children ?
                        <List>
                            <Item arrow="horizontal" onClick={this.handleMemberLevel.bind(this)}>
                                重设等级
                            </Item>
                        </List>
                        :
                        ''
                }
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberIndex);
