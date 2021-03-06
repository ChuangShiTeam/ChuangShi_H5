import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {ActivityIndicator, WhiteSpace, List, Tabs, Button, Toast} from "antd-mobile";
import constant from "../../util/constant";
import storage from "../../util/storage";
import http from "../../util/http";

class MemberPurchaseOrderIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            member_purchase_order_flow: 'ALL',
            member_purchase_order_list: [],
            list: []
        }
    }

    componentDidMount() {
        document.title = '我的进货';

        this.handleLoad();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'member_purchase_order/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleLoad() {
        http.request({
            url: '/mobile/member/purchase/order/list',
            data: {},
            success: function (data) {
                let member_purchase_order_list = [];

                if (storage.getMemberPurchaseOrderFlow() !== null && storage.getMemberPurchaseOrderFlow() !== '') {
                    this.setState({
                        member_purchase_order_flow: storage.getMemberPurchaseOrderFlow()
                    });
                }

                for (let i = 0; i < data.length; i++) {
                    if (data[i].member_purchase_order_flow === this.state.member_purchase_order_flow || this.state.member_purchase_order_flow === 'ALL') {
                        member_purchase_order_list.push(data[i]);
                    }
                }

                this.setState({
                    member_purchase_order_list: member_purchase_order_list,
                    list: data
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });

                document.body.scrollTop = this.props.member_purchase_order.scroll_top;
            }.bind(this)
        });
    }

    handleTab(member_purchase_order_flow) {
        let member_purchase_order_list = [];

        for (let i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].member_purchase_order_flow === member_purchase_order_flow || member_purchase_order_flow === 'ALL') {
                member_purchase_order_list.push(this.state.list[i]);
            }
        }
        storage.setMemberPurchaseOrderFlow(member_purchase_order_flow);
        this.setState({
            member_purchase_order_flow: member_purchase_order_flow,
            member_purchase_order_list: member_purchase_order_list
        });
    }

    handlePay(member_purchase_order_id) {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/purchase/order/pay',
            data: {
                member_purchase_order_id: member_purchase_order_id,
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
                                pathname: '/member/purchase/order/confirm/' + data.trade_id,
                                query: {}
                            }));
                            storage.setMemberPurchaseOrderFlow(this.state.member_purchase_order_flow);
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

    handlePaySuccess(member_purchase_order_id) {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/wechat/pay/success',
            data: {
                member_purchase_order_id: member_purchase_order_id
            },
            success: function (data) {
                console.log(data);
                Toast.hide();
            },
            complete() {

            }
        });
    }

    handleEdit(member_purchase_order_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/purchase/order/edit/' + member_purchase_order_id,
            query: {}
        }));
        storage.setMemberPurchaseOrderFlow(this.state.member_purchase_order_flow);
    }

    render() {
        const Item = List.Item;
        const TabPane = Tabs.TabPane;

        return (
            <div>
                <Tabs activeKey={this.state.member_purchase_order_flow} animated={false}
                      onTabClick={this.handleTab.bind(this)}>
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
                    this.state.member_purchase_order_list.map((member_purchase_order) => {
                        return (
                            <div key={member_purchase_order.member_purchase_order_id}>
                                <WhiteSpace size="lg"/>
                                <List>
                                    <Item
                                        onClick={this.handleEdit.bind(this, member_purchase_order.member_purchase_order_id)}
                                        extra={
                                              <div className="orange-color">
                                                  {member_purchase_order.member_purchase_order_flow === "WAIT_PAY" ? "待付款" :
                                                      member_purchase_order.member_purchase_order_flow === "WAIT_SEND" ? "待发货" :
                                                          member_purchase_order.member_purchase_order_flow === "WAIT_RECEIVE" ? "待收货" :
                                                              member_purchase_order.member_purchase_order_flow === "COMPLETE" ? "已完成" : ""}
                                              </div>
                                          }>
                                        <div>
                                            <img style={{width: "60px", height: "60px"}}
                                                 src={member_purchase_order.user_avatar} alt=""/>
                                            <span style={{fontSize: '28px', marginLeft: '20px'}}>
                                                     {member_purchase_order.user_name}
                                                    </span>
                                        </div>
                                    </Item>
                                    {
                                        member_purchase_order.member_purchase_order_product_sku_list.map((product_sku) => {
                                            return (
                                                <Item
                                                    onClick={this.handleEdit.bind(this, member_purchase_order.member_purchase_order_id)}
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
                                            共{member_purchase_order.member_purchase_order_total_quantity}件商品，合计：￥{member_purchase_order.member_purchase_order_product_amount}
                                        </span>
                                    </Item>
                                    <Item
                                        extra={
                                            <span style={{fontSize: '28px'}}>
                                                {member_purchase_order.system_create_time}
                                            </span>
                                        }
                                    >
                                        {
                                            member_purchase_order.member_purchase_order_is_warehouse_receive ?
                                                "总仓库代收"
                                                :
                                                <span style={{fontSize: '28px'}}>
                                                    {member_purchase_order.member_purchase_order_receiver_name}

                                                    {member_purchase_order.member_purchase_order_receiver_mobile !== "" ?
                                                        "  电话："+member_purchase_order.member_purchase_order_receiver_mobile
                                                        :
                                                        ""
                                                    }
                                                </span>
                                        }
                                    </Item>
                                    <Item extra={
                                        member_purchase_order.member_purchase_order_flow === "WAIT_PAY" ?
                                            <Button style={{marginRight: '0.08rem'}}
                                                    type="primary"
                                                    size="small"
                                                    inline
                                                    onClick={this.handlePay.bind(this, member_purchase_order.member_purchase_order_id)}>
                                                立即付款
                                            </Button>
                                            :
                                            ''
                                    }
                                    >
                                    </Item>
                                </List>
                            </div>
                        );
                    })
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({member_purchase_order}) => ({member_purchase_order}))(MemberPurchaseOrderIndex);
