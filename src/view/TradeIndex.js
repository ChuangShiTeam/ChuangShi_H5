import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Tabs, Toast} from 'antd-mobile';

import constant from "../util/constant";
import http from '../util/http';

class TradeIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            trade_flow: this.props.params.trade_flow,
            trade_list: [],
            list: []
        }
    }

    componentDidMount() {
        document.title = '我的订单';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/trade/list',
            data: {},
            success: function (data) {
                var trade_list = [];

                for (var i = 0; i < data.length; i++) {
                    if (data[i].trade_flow === this.props.params.trade_flow || this.props.params.trade_flow === 'ALL') {
                        trade_list.push(data[i]);
                    }
                }

                this.setState({
                    trade_list: trade_list,
                    list: data
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

    handleTab(trade_flow) {
        var trade_list = [];

        for (var i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].trade_flow === trade_flow || trade_flow === 'ALL') {
                trade_list.push(this.state.list[i]);
            }
        }

        this.setState({
            trade_flow: trade_flow,
            trade_list: trade_list
        });
    }

    render() {
        const Item = List.Item;
        const TabPane = Tabs.TabPane;

        return (
            <div>
                <Tabs activeKey={this.state.trade_flow} animated={false} onTabClick={this.handleTab.bind(this)}>
                    <TabPane tab="全部" key="ALL">
                    </TabPane>
                    <TabPane tab="待付款" key="WAIT_PAY">
                    </TabPane>
                    <TabPane tab="待发货" key="WAIT_SEND">
                    </TabPane>
                    <TabPane tab="待收货" key="WAIT_RECEIVE">
                    </TabPane>
                    <TabPane tab="已完成" key="COMPLETE">
                    </TabPane>
                </Tabs>
                {
                    this.state.trade_list.map((trade) => {
                        return (
                            <div key={trade.trade_id}>
                                <WhiteSpace size="lg"/>
                                <List>
                                    <Item extra={
                                        trade.trade_flow === "WAIT_PAY" ? "待付款" :
                                            trade.trade_flow === "WAIT_SEND" ? "待发货" :
                                                trade.trade_flow === "WAIT_RECEIVE" ? "待收货" :
                                                    trade.trade_flow === "COMPLETE" ? "已完成" : ""
                                    }>
                                        {trade.trade_number}
                                    </Item>
                                    {
                                        trade.trade_product_sku_list.map((product_sku) => {
                                            return (
                                                <Item key={product_sku.product_sku_id}
                                                      extra={'￥' + product_sku.product_sku_amount.toFixed(2) + ' X ' + product_sku.product_sku_quantity}>

                                                    <div className="list-item-image">
                                                        <img src={constant.host + product_sku.product_image} alt=""/>
                                                    </div>
                                                    <div className="list-item-text" style={{top: '10px'}}>
                                                        {product_sku.product_name}
                                                    </div>
                                                    <div className="list-item-brief" style={{top: '35px'}}>
                                                        {product_sku.product_name}
                                                    </div>
                                                </Item>
                                            );
                                        })
                                    }
                                    <Item>
                                        <span
                                            style={{fontSize: '14px'}}>共{trade.trade_product_quantity}件商品，合计：￥{trade.trade_product_amount}</span>
                                    </Item>
                                </List>
                            </div>
                        );
                    })
                }
                <WhiteSpace size="lg"/>
            </div>
        );
    }
}

export default connect(() => ({}))(TradeIndex);
