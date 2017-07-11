import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {WhiteSpace, List, Checkbox} from 'antd-mobile';

import storage from '../util/storage';
import http from '../util/http';

class MemberAddressIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            is_list: false,
            member_address_id: '',
            list: []
        };
    }

    componentDidMount() {
        document.title = '我的地址';

        document.body.scrollTop = 0;

        if (this.props.params.type === 'list') {
            this.setState({
                is_list: true,
            });
        }

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/member/address/list',
            data: {
                page_index: 1,
                page_size: 10,
            },
            success: function (data) {
                this.setState({
                    list: data,
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true,
                });
            }.bind(this),
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleAdd() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/address/add',
            query: {},
        }));
    }

    handleEdit(member_address_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/address/edit/' + this.props.params.type + '/' + member_address_id,
            query: {},
        }));
    }

    handleChange(member_address) {
        this.setState({
            member_address_id: member_address.member_address_id,
        });

        storage.setMemberAddress(member_address);

        setTimeout(() => {
            this.handleBack();
        }, 300);
    }

    render() {
        const Item = List.Item;
        const CheckboxItem = Checkbox.CheckboxItem;

        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.state.list.length > 0 ?
                        <List>
                            {
                                this.state.list.map((item) => {
                                    return (
                                        this.state.is_list ?
                                            <Item
                                                key={item.member_address_id}
                                                arrow={this.state.is_list ? 'horizontal' : 'empty'} wrap
                                                onClick={this.handleEdit.bind(this, item.member_address_id)}
                                            >
                                                <div>{item.member_address_name} {item.member_address_phone}</div>
                                                <div className="member-address-address">{item.member_address_province + item.member_address_city + item.member_address_area + item.member_address_address}</div>
                                            </Item>
                                            :
                                            <CheckboxItem
                                                key={item.member_address_id}
                                                wrap
                                                activeStyle={{
                                                    backgroundColor: '#ffffff',
                                                }}
                                                checked={this.state.member_address_id === item.member_address_id}
                                                onChange={this.handleChange.bind(this, item)}
                                            >
                                                <div>{item.member_address_name} {item.member_address_phone}</div>
                                                <div className="member-address-address">{item.member_address_province + item.member_address_city + item.member_address_area + item.member_address_address}</div>
                                            </CheckboxItem>
                                    );
                                })
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.state.is_load && this.state.list.length === 0 ?
                        <view className="">
                            <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <view className="empty-text">没有数据</view>
                        </view>
                        :
                        ''
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>新建收货地址</div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberAddressIndex);