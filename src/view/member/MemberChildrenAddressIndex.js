import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, List, WhiteSpace} from 'antd-mobile';

import http from '../../util/http';

class MemberTeamAddressIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            list: '',
        };
    }

    componentDidMount() {
        document.title = '代理收货地址';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/member/children/address/list',
            data: {
                member_id: this.props.params.member_id
            },
            success: function (data) {
                this.setState({
                    list: data,
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;

        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.state.list.length > 0 ?
                        <List>
                            {
                                this.state.list.map((item) => {
                                    return (
                                        <Item multipleLine key={item.member_address_id}>
                                            {item.member_address_name} {item.member_address_mobile}
                                            <Brief>
                                                {item.member_address_province
                                                + item.member_address_city
                                                + item.member_address_area
                                                + item.member_address_address}
                                            </Brief>
                                            <a className="address-mobile" href={"tel:" + item.member_address_mobile}>拨打电话</a>
                                        </Item>
                                    );
                                })
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.state.is_load && this.state.list.length === 0 ?
                        <div>
                            <img src={require('../../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <div className="empty-text">没有数据</div>
                        </div>
                        :
                        ''
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '200px'}}></div>
                {
                    this.state.bill_amount > 0 ?
                        <div className="footer">
                            <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>
                                新增
                            </div>
                        </div>
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

export default connect(() => ({}))(MemberTeamAddressIndex);
