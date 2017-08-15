import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List, Badge} from 'antd-mobile';

import constant from '../../util/constant';
import http from '../../util/http';

const Item = List.Item;

class TeamIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.team_index.is_load,
            is_first: false
        }
    }

    componentDidMount() {
        let is_first = false;

        if (typeof (this.props.routes[1]) !== 'undefined') {
            if (this.props.routes[1].path === '/team/first/index') {
                is_first = true;
            }
        }

        if (typeof (this.props.routes[2]) !== 'undefined') {
            if (this.props.routes[2].path === '/team/first/index') {
                is_first = true;
            }
        }

        if (is_first) {
            document.title = '直属代理';
        } else {
            document.title = '我的代理';
        }

        if (constant.app_id === 'df2078d6c9eb46babb0df957127273ab') {
            document.title = '个人中心';
        }

        this.setState({
            is_first: is_first
        });

        document.body.scrollTop = this.props.team_index.scroll_top;

        this.handleLoad();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'team_index/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleLoad() {
        http.request({
            url: '/member/team/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'team_index/fetch',
                    data: {
                        list: data
                    }
                });
            }.bind(this),
            complete: function () {
                this.props.dispatch({
                    type: 'team_index/fetch',
                    data: {
                        is_load: true
                    }
                });
            }.bind(this)
        });
    }

    handleButton(member_id) {
        let list = this.props.team_index.list;

        this.handleCheck(list, member_id);

        this.props.dispatch({
            type: 'team_index/fetch',
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

    handleGenerate(list, index) {
        let html = [];

        for (let i = 0; i < list.length; i++) {
            let item = list[i];

            html.push(
                <div key={item.member_id}>
                    <Item
                        multipleLine
                    >
                        <div className="list-item" onClick={this.handleItem.bind(this, item.member_id)}>
                            <div className="list-item-image">
                                <img src={item.user_avatar} alt=""/>
                            </div>
                            <div className="list-item-text" style={{right: '125px'}}>
                                {item.user_name}
                            </div>
                            <div className="list-item-brief">
                                {
                                    item.member_status ?
                                        <span>
                                            {item.member_level_name}
                                            {
                                                index === 0 ?
                                                    <span style={{
                                                        with: '100px',
                                                        backgroundColor: '#a72025',
                                                        color: '#ffffff',
                                                        marginLeft: '20px',
                                                        paddingLeft: '20px',
                                                        paddingRight: '20px',
                                                        fontSize: '28px'
                                                    }}>直属</span>
                                                    :
                                                    ''
                                            }
                                        </span>
                                        :
                                        <span style={{color: '#a72025'}}>待审核</span>
                                }
                            </div>
                        </div>
                        {
                            typeof (item.children) !== 'undefined' && !this.state.is_first ?
                                <div className="list-item-button"
                                     style={{paddingTop: '40px'}}
                                     onClick={this.handleButton.bind(this, item.member_id)}>
                                    <Badge overflowCount={999} text={item.children.length}>
                                        <span className="list-item-button-number">{item.is_show ? '-' : '+'}</span>
                                    </Badge>
                                </div>
                                :
                                ''
                        }
                    </Item>
                    {
                        typeof (item.children) !== 'undefined' && !this.state.is_first ?
                            <div style={{marginLeft: '50px', display: item.is_show ? 'block' : 'none'}}>
                                {
                                    this.handleGenerate(item.children, 1)
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
                    this.props.team_index.list.length > 0 ?
                        <List>
                            {
                                this.handleGenerate(this.props.team_index.list, 0)
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.props.team_index.is_load && this.props.team_index.list.length === 0 ?
                        <div>
                            <img src={require('../../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <div className="empty-text">没有数据</div>
                        </div>
                        :
                        ''
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.props.team_index.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({team_index}) => ({team_index}))(TeamIndex);
