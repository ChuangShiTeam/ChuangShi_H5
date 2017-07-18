import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Toast} from 'antd-mobile';

import http from '../util/http';

class StockIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stock_list: [],
            stock_quantity: 0
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
            url: '/member/send/detail',
            data: {
                page_index: 1,
                page_size: 100
            },
            success: function (data) {

                this.setState({
                    stock_list: data.stock_list,
                    stock_quantity: data.stock_quantity
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

    handleEdit(stock_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/stock/edit/' + stock_id,
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
                        extra={this.state.stock_quantity}
                    >
                        我的库存
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                {
                    this.state.stock_list.map((item) => {
                        return (
                            <div key={item.stock_id}>
                                <List>
                                    <Item
                                        multipleLine
                                        extra={item.express_flow === null ? "暂无物流信息" : item.express_flow}
                                        arrow="horizontal"
                                        className="item-long-text"
                                        onClick={this.handleEdit.bind(this, item.stock_id)}
                                    >
                                        <div>
                                            快递单号：{item.express_shipper_code == null ? "暂无" : item.express_shipper_code} {item.express_no}</div>
                                        <div>收货人：{item.stock_receiver_name} {item.stock_receiver_mobile}</div>
                                        <div className="text-ellipsis">
                                            收货地址：
                                            {item.stock_receiver_province
                                            + item.stock_receiver_city
                                            + item.stock_receiver_area
                                            + item.stock_receiver_address}
                                        </div>
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
