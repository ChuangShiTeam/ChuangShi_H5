import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List, Flex, Tabs, Button} from 'antd-mobile';

import http from '../../util/http';
import storage from "../../util/storage";
import constant from '../../util/constant';

class MemberDeliveryOrderIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            member_delivery_order_flow: 'ALL',
            member_delivery_order_list: [],
            stock_quantity: 0,
            list: []
        }
    }

    componentDidMount() {
        document.title = '我的发货';

        document.body.scrollTop = 0;

        this.handleStockLoad();

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleStockLoad() {
        http.request({
            url: '/mobile/stock/member/list',
            data: {},
            success: function (data) {
                this.setState({
                    stock_quantity: data
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleLoad() {
        http.request({
            url: '/member/delivery/order/list',
            data: {},
            success: function (data) {
                let member_delivery_order_list = [];

                if (storage.getMemberDeliveryOrderFlow() !== null && storage.getMemberDeliveryOrderFlow() !== '') {
                    this.setState({
                        member_delivery_order_flow: storage.getMemberDeliveryOrderFlow()
                    });
                }

                for (let i = 0; i < data.length; i++) {
                    if (data[i].member_delivery_order_flow === this.state.member_delivery_order_flow || this.state.member_delivery_order_flow === 'ALL') {
                        member_delivery_order_list.push(data[i]);
                    }
                }

                this.setState({
                    member_delivery_order_list: member_delivery_order_list,
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

    handleTab(member_delivery_order_flow) {
        let member_delivery_order_list = [];

        for (let i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].member_delivery_order_flow === member_delivery_order_flow || member_delivery_order_flow === 'ALL') {
                member_delivery_order_list.push(this.state.list[i]);
            }
        }
        storage.setMemberDeliveryOrderFlow(member_delivery_order_flow);
        this.setState({
            member_delivery_order_flow: member_delivery_order_flow,
            member_delivery_order_list: member_delivery_order_list
        });
    }

    handleDeliver() {

    }

    handleSlefDeliverAdd() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/delivery/order/slef/deliver',
            query: {},
        }));
    }

    handleWarehouseReplaceDeliverAdd() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/delivery/order/warehouse/replace/deliver',
            query: {},
        }));
    }


    handleWarehouseReplaceDeliver(member_delivery_order_id) {
        http.request({
            url: '/member/delivery/order/warehouse/replace/deliver',
            data: {
                member_delivery_order_id: member_delivery_order_id
            },
            success: function (data) {
                this.handleStockLoad();

                this.handleLoad();
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleView(member_delivery_order_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/delivery/order/edit/' + member_delivery_order_id,
            query: {},
        }));
    }

    render() {
        const Item = List.Item;
        const TabPane = Tabs.TabPane;
        console.log(this.state.member_delivery_order_list);
        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item multipleLine
                          extra={this.state.stock_quantity}
                          thumb={require('../../assets/svg/safe.svg')}
                    >
                        我的总仓库存
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <Tabs activeKey={this.state.member_delivery_order_flow} animated={false}
                      onTabClick={this.handleTab.bind(this)}>
                    <TabPane tab="全部" key="ALL">
                    </TabPane>
                    <TabPane tab="待发货" key="WAIT_SEND">
                    </TabPane>
                    <TabPane tab="待总仓库发货" key="WAIT_WAREHOUSE_SEND">
                    </TabPane>
                    <TabPane tab="待收货" key="WAIT_RECEIVE">
                    </TabPane>
                    <TabPane tab="已完成" key="COMPLETE">
                    </TabPane>
                </Tabs>
                {
                    this.state.member_delivery_order_list.map((member_delivery_order) => {
                        return (
                            <div key={member_delivery_order.member_delivery_order_id}>
                                <WhiteSpace size="lg"/>
                                <List>
                                    <Item
                                        onClick={this.handleView.bind(this, member_delivery_order.member_delivery_order_id)}
                                        extra={
                                            <div className="orange-color">
                                                {member_delivery_order.member_delivery_order_flow === "WAIT_SEND" ? "待发货" :
                                                    member_delivery_order.member_delivery_order_flow === "WAIT_WAREHOUSE_SEND" ? "待总仓库发货" :
                                                        member_delivery_order.member_delivery_order_flow === "WAIT_RECEIVE" ? "待收货" :
                                                            member_delivery_order.member_delivery_order_flow === "COMPLETE" ? "已完成" : ""}
                                            </div>
                                        }>
                                        {
                                            member_delivery_order.member_delivery_order_is_warehouse_deliver ?
                                                "总仓库代发"
                                                :
                                                <div>
                                                    <img style={{width: "60px", height: "60px"}}
                                                         src={member_delivery_order.user_avatar} alt=""/>
                                                    <span style={{fontSize: '28px', marginLeft: '20px'}}>
                                                     {member_delivery_order.user_name}
                                                    </span>
                                                </div>
                                        }
                                    </Item>
                                    {
                                        member_delivery_order.member_delivery_order_product_sku_list.map((product_sku) => {
                                            return (
                                                <Item
                                                    onClick={this.handleView.bind(this, member_delivery_order.member_delivery_order_id)}
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
                                            共{member_delivery_order.member_delivery_order_total_quantity}件商品，合计：￥{member_delivery_order.member_delivery_order_amount}
                                        </span>
                                    </Item>
                                    <Item
                                        extra={
                                            <span style={{fontSize: '28px'}}>
                                                {member_delivery_order.system_create_time}
                                            </span>
                                        }
                                    >
                                        <span style={{fontSize: '28px'}}>
                                            {member_delivery_order.member_delivery_order_receiver_name}

                                            {member_delivery_order.member_delivery_order_receiver_mobile != "" ?
                                                (member_delivery_order.member_delivery_order_receiver_mobile)
                                                :
                                                ""
                                            }
                                        </span>
                                    </Item>
                                    {(member_delivery_order.member_delivery_order_flow === "WAIT_SEND") ?
                                        <Item extra={
                                            <div>
                                                <Button style={{marginRight: '0.08rem'}}
                                                        type="primary"
                                                        size="small"
                                                        inline
                                                        onClick={this.handleWarehouseReplaceDeliver.bind(this, member_delivery_order.member_delivery_order_id)}>
                                                    总仓库代发
                                                </Button>
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
                <div style={{height: '200px'}}></div>
                <div className="footer">
                    <Flex>
                        <Flex.Item>
                            <div className="footer-buttom" onClick={this.handleSlefDeliverAdd.bind(this)}>自己发货</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="footer-buttom" onClick={this.handleWarehouseReplaceDeliverAdd.bind(this)}>总仓库代发</div>
                        </Flex.Item>
                    </Flex>

                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberDeliveryOrderIndex);
