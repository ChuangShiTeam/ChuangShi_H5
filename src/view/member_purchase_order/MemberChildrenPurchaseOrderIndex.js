import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {ActivityIndicator, WhiteSpace, List, Tabs, Button, Toast} from "antd-mobile";
import constant from "../../util/constant";
import storage from "../../util/storage";
import http from "../../util/http";

class MemberChildrenPurchaseOrderIndex extends Component {
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
        document.title = '代理的进货订单';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/member/purchase/order/list',
            data: {
                member_id: this.props.params.member_id
            },
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
                                        extra={
                                              <div className="orange-color">
                                                  {member_purchase_order.member_purchase_order_flow === "WAIT_PAY" ? "待付款" :
                                                      member_purchase_order.member_purchase_order_flow === "WAIT_SEND" ? "待发货" :
                                                          member_purchase_order.member_purchase_order_flow === "WAIT_RECEIVE" ? "待收货" :
                                                              member_purchase_order.member_purchase_order_flow === "COMPLETE" ? "已完成" : ""}
                                              </div>
                                          }>
                                        {
                                            member_purchase_order.member_purchase_order_is_warehouse_receive ?
                                                "总仓库代收"
                                                :
                                                <span style={{fontSize: '28px'}}>
                                                    {member_purchase_order.member_purchase_order_receiver_name}

                                                        {member_purchase_order.member_purchase_order_receiver_mobile != "" ?
                                                            "  电话："+member_purchase_order.member_purchase_order_receiver_mobile
                                                            :
                                                            ""
                                                        }
                                                </span>
                                        }
                                    </Item>
                                    {
                                        member_purchase_order.member_purchase_order_product_sku_list.map((product_sku) => {
                                            return (
                                                <Item
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
                                    {(member_purchase_order.member_purchase_order_flow === "WAIT_PAY") ?
                                        <Item>
                                            <span style={{fontSize: '28px'}}>
                                                {member_purchase_order.system_create_time}
                                            </span>
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

export default connect(() => ({}))(MemberChildrenPurchaseOrderIndex);
