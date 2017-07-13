import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Toast} from 'antd-mobile';

import http from '../util/http';

const Item = List.Item;

class TeamIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '我的团队';

        document.body.scrollTop = this.props.team.scroll_top;

        this.handleLoad();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'team/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/team/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'team/fetch',
                    data: {
                        list: data
                    }
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

    handleButton(member_id) {
        let list = this.props.team.list;

        this.handleCheck(list, member_id);

        this.props.dispatch({
            type: 'team/fetch',
            data: {
                list: list
            }
        });
    }

    handleCheck(list, member_id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].member_id === member_id) {
                list[i].is_show = !list[i].is_show;
            }

            if (typeof (list[i].children) !== 'undefined') {
                this.handleCheck(list[i].children, member_id);
            }
        }
    }

    handleItem(member_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/index/' + member_id,
            query: {}
        }));
    }

    handleGenerate(list) {
        let html = [];

        for (let i = 0; i < list.length; i++) {
            let item = list[i];

            html.push(
                <div key={item.member_id}>
                    <Item
                        multipleLine
                        arrow="horizontal"
                    >
                        <div className="list-item" onClick={this.handleItem.bind(this, item.member_id)}>
                            <div className="list-item-image">
                                <img src={item.user_avatar} alt=""/>
                            </div>
                            <div className="list-item-text" style={{right: '100px'}}>
                                {item.user_name}
                            </div>
                            <div className="list-item-brief">
                                {
                                    item.member_level_name === '' ?
                                        <span style={{color: '#a72025'}}>待审核</span>
                                        :
                                        item.member_level_name
                                }
                            </div>
                        </div>
                        {
                            typeof (item.children) === 'undefined' ?
                                ''
                                :
                                <div className="list-item-button"
                                     onClick={this.handleButton.bind(this, item.member_id)}>
                                    <div className="list-item-button-number">
                                        {item.is_show ? '-' : '+'} {item.children.length}个下级{item.aaa}</div>
                                </div>
                        }
                    </Item>
                    {
                        typeof (item.children) !== 'undefined' ?
                            <div style={{marginLeft: '25px', display: item.is_show ? 'block' : 'none'}}>
                                {
                                    this.handleGenerate(item.children)
                                }
                            </div>
                            :
                            ''

                    }
                </div>
            )
        }

        return html;
    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.props.team.list.length > 0 ?
                        <List>
                            {
                                this.handleGenerate(this.props.team.list)
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.state.is_load && this.props.team.list.length === 0 ?
                        <view>
                            <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <view className="empty-text">没有数据</view>
                        </view>
                        :
                        ''
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '50px'}}></div>
            </div>
        );
    }
}

export default connect(({team}) => ({team}))(TeamIndex);
