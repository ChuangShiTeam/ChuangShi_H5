import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {ActivityIndicator, WhiteSpace, List, Tabs, Button, Toast} from "antd-mobile";
import constant from "../../util/constant";
import storage from "../../util/storage";
import http from "../../util/http";

class TradeIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            trade_flow: 'ALL',
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
        http.request({
            url: '/trade/list',
            data: {},
            success: function (data) {
                var trade_list = [];

                if (storage.getTradeFlow() !== null && storage.getTradeFlow() !== '') {
                    this.setState({
                        trade_flow: storage.getTradeFlow()
                    });
                }

                for (var i = 0; i < data.length; i++) {
                    if (data[i].trade_flow === this.state.trade_flow || this.state.trade_flow === 'ALL') {
                        trade_list.push(data[i]);
                    }
                }

                this.setState({
                    trade_list: trade_list,
                    list: data
                });
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
        storage.setTradeFlow(trade_flow);
        this.setState({
            trade_flow: trade_flow,
            trade_list: trade_list
        });
    }

    handlePay(trade_id) {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/trade/pay',
            data: {
                trade_id: trade_id,
                open_id: storage.getOpenId(),
                pay_type: 'WX'
            },
            success: function (data) {
                window.wx.chooseWXPay({
                    timestamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function (res) {
                        if (res.errMsg === "chooseWXPay:ok") {
                            //支付成功
                            this.props.dispatch(routerRedux.push({
                                pathname: '/trade/confirm/' + data.trade_id,
                                query: {}
                            }));
                            storage.setTradeFlow(this.state.trade_flow);
                        } else {
                            //支付失败
                        }
                    }.bind(this),
                    fail: function (res) {
                    },
                    cancel: function (res) {
                    }
                });

                Toast.hide();
            }.bind(this),
            complete() {

            }
        });
    }

    handleEdit(trade_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/trade/edit/' + trade_id,
            query: {}
        }));
        storage.setTradeFlow(this.state.trade_flow);
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
                                    <Item onClick={this.handleEdit.bind(this, trade.trade_id)}
                                          extra={
                                              <div className="orange-color">
                                                  {trade.trade_flow === "WAIT_PAY" ? "待付款" :
                                                      trade.trade_flow === "WAIT_SEND" ? "待发货" :
                                                          trade.trade_flow === "WAIT_RECEIVE" ? "待收货" :
                                                              trade.trade_flow === "COMPLETE" ? "已完成" : ""}
                                              </div>
                                          }>
                                        {trade.trade_number}
                                    </Item>
                                    {
                                        trade.trade_product_sku_list.map((product_sku) => {
                                            return (
                                                <Item onClick={this.handleEdit.bind(this, trade.trade_id)}
                                                      key={product_sku.product_sku_id}
                                                      extra={'￥' + (product_sku.product_sku_amount).toFixed(2)}
                                                >
                                                    <img className="product-list-image"
                                                         src={constant.host + product_sku.product_image} alt=""/>
                                                    <div className="product-list-text">
                                                        {product_sku.product_name}
                                                        <div>{(product_sku.product_sku_amount / product_sku.product_sku_quantity).toFixed(2)}
                                                            × {product_sku.product_sku_quantity}</div>
                                                    </div>
                                                </Item>
                                            );
                                        })
                                    }
                                    <Item>
                                        <span style={{fontSize: '28px'}}>
                                            共{trade.trade_product_quantity}件商品，合计：￥{trade.trade_product_amount}
                                        </span>
                                    </Item>
                                    {(trade.trade_flow === "WAIT_PAY") ?
                                        <Item extra={
                                                  <div>
                                                      {
                                                          trade.trade_flow === "WAIT_PAY" ?
                                                              <Button style={{marginRight: '0.08rem'}}
                                                                      type="primary"
                                                                      size="small"
                                                                      inline
                                                                      onClick={this.handlePay.bind(this, trade.trade_id)}>
                                                                  立即付款
                                                              </Button>
                                                              :
                                                              ""
                                                      }
                                                  </div>
                                              }
                                        >
                                            {""}
                                        </Item>
                                        :
                                        ""
                                    }
                                </List>
                            </div>
                        );
                    })
                }
                <WhiteSpace size="lg"/>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(TradeIndex);
