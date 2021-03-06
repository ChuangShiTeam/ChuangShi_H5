import React, {Component} from "react";
import {connect} from "dva";
import {ActivityIndicator, WhiteSpace, List, Tabs} from "antd-mobile";
import constant from "../../util/constant";
import storage from "../../util/storage";
import http from "../../util/http";

class MemberChildrenTradeIndex extends Component {
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
		document.title = '下级的订单';

		document.body.scrollTop = 0;

		this.handleLoad();
	}

	componentWillUnmount() {

	}

	handleLoad() {
		http.request({
			url: '/trade/children/list',
			data: {
				member_id: this.props.params.member_id
			},
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

	render() {
		const Item = List.Item;
		const TabPane = Tabs.TabPane;

		return (
			<div>
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
										<Item 
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
                                            共{trade.trade_product_quantity}件商品，合计：￥{trade.trade_product_amount}
                                        </span>
										</Item>
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
			</div>
		);
	}
}

export default connect(() => ({}))(MemberChildrenTradeIndex);
