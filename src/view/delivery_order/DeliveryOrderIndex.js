import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List, Flex} from 'antd-mobile';

import http from '../../util/http';
import constant from '../../util/constant';

class DeliveryOrderIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            delivery_order_list: [],
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
        http.request({
            url: '/member/send/detail',
            data: {
                page_index: 1,
                page_size: 100
            },
            success: function (data) {

                this.setState({
                    delivery_order_list: data.delivery_order_list,
                    stock_quantity: data.stock_quantity
                });
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
            pathname: '/delivery/order/add',
            query: {},
        }));
    }

    handleEdit(delivery_order_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/delivery/order/edit/' + delivery_order_id,
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
                    this.state.delivery_order_list.map((item) => {
                        return (
                            <div key={item.delivery_order_id}>
                                <List>
                                    <Item
                                        multipleLine
                                        arrow="horizontal"
                                        className="item-long-text"
                                        onClick={this.handleEdit.bind(this, item.delivery_order_id)}
                                    >
                                        <div className="stock-express text-ellipsis">
                                            收货人：{item.delivery_order_receiver_name} {item.delivery_order_receiver_mobile} {item.delivery_order_receiver_province + item.delivery_order_receiver_city + item.delivery_order_receiver_area + item.delivery_order_receiver_address}
                                        </div>
                                        <Flex justify="center" className="item-flow-text">
                                            <Flex.Item>
                                                <div className="item-flow-province">
                                                    上海
                                                </div>
                                                <div className="item-flow-name">
                                                    {constant.name}
                                                </div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <div className="item-flow-status">
                                                    {
                                                        item.delivery_order_flow === null ? "暂无" :
                                                        item.delivery_order_flow === "WAIT_SEND" ? "待发货" :
                                                        item.delivery_order_flow === "WAIT_RECEIVE" ? "待收货" :
                                                        item.delivery_order_flow === "COMPLETE" ? "已完成" : ""
                                                    }
                                                </div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <div className="item-flow-province">
                                                    {item.delivery_order_receiver_province}
                                                </div>
                                                <div className="item-flow-name">
                                                    {item.delivery_order_receiver_name}
                                                </div>
                                            </Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                                <WhiteSpace size="lg"/>
                            </div>
                        );
                    })
                }
                <div style={{height: '200px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>新建发货单</div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(DeliveryOrderIndex);
