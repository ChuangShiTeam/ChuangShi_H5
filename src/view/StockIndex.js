import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Tabs, Toast} from 'antd-mobile';

import constant from "../util/constant";
import http from '../util/http';

class StockIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stock_list: []
        }
    }

    componentDidMount() {
        document.title = '我的发货';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/stock/list',
            data: {},
            success: function (data) {

                this.setState({
                    stock_list: data.stock_list,
                    stock: data.stock
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

    handleAdd() {
        this.props.dispatch(routerRedux.push({
            pathname: '/stock/add',
            query: {},
        }));
    }

    handleEdit(edit_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/stock/edit/' + edit_id,
            query: {},
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        multipleLine
                        extra="999"
                        arrow="horizontal"
                    >
                        我的库存
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <div>
                    <List>
                        <Item
                            multipleLine
                            extra="签收"
                            arrow="horizontal"
                            className="item-long-text"
                            onClick={this.handleEdit.bind(this, '123')}
                        >
                            <div>快递单号：德邦 5277817363</div>
                            <div>收货人：xxx 1111111</div>
                            <div className="text-ellipsis">收货地址：北京北京市朝阳区朝阳北路八里庄北里公园1872，3号楼405</div>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                </div>
                {
                    this.state.stock_list.map((item) => {
                        return (
                            <div>
                                <List>
                                    <Item
                                        multipleLine
                                        extra="签收"
                                        arrow="horizontal"
                                        className="item-long-text"
                                        onClick={this.handleEdit.bind(this, '123')}
                                    >
                                        <div>快递单号：德邦 5277817363</div>
                                        <div>收货人：xxx 1111111</div>
                                        <div className="text-ellipsis">收货地址：北京北京市朝阳区朝阳北路八里庄北里公园1872，3号楼405</div>
                                    </Item>
                                </List>
                                <WhiteSpace size="lg"/>
                            </div>
                        );
                    })
                }
                <div style={{height: '100px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>新建发货单</div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(StockIndex);
