import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from "rc-form";
import {ActivityIndicator, WhiteSpace, List, InputItem, Picker, Toast} from 'antd-mobile';

import constant from "../../util/constant";
import validate from "../../util/validate";
import http from "../../util/http";
import storage from '../../util/storage';

class MemberDeliveryOrderSelfDeliver extends Component {
	constructor(props) {
		super(props);

		this.state = {
			is_load: false,
			action: 'save',
			product_sku_id: '',
			member_address: {}
		}
	}

	componentDidMount() {
		document.title = '发货单';

		document.body.scrollTop = 0;

		this.setState({
			is_load: true
		});

		this.handleLoadProduct();
	}

	componentWillUnmount() {

	}

	handleLoadProduct() {
		Toast.loading('加载中..', 0);

		http.request({
			url: '/product/find',
			data: {
				product_id: "76537999b6c6428d9a78d47739c08fa5"
			},
			success: function (data) {
				this.setState({
					member_address: storage.getMemberAddress(),
					product_sku_id: data.product_sku_id
				});
				Toast.hide();
			}.bind(this),
			complete() {

			}
		});
	}

	handleAdd() {
		this.props.form.validateFields((errors, values) => {
			if (!errors) {
				if (typeof (this.state.member_address.member_address_name) === 'undefined') {
					Toast.fail('请选择收货地址', constant.duration);

					return;
				}

				if (!validate.isMobile(this.state.member_address.member_address_mobile)) {
					Toast.fail('手机号码格式不对', constant.duration);

					return;
				}

				values.member_delivery_order_receiver_name = this.state.member_address.member_address_name;
				values.member_delivery_order_receiver_mobile = this.state.member_address.member_address_mobile;
				values.member_delivery_order_receiver_province = this.state.member_address.member_address_province;
				values.member_delivery_order_receiver_city = this.state.member_address.member_address_city;
				values.member_delivery_order_receiver_area = this.state.member_address.member_address_area;
				values.member_delivery_order_receiver_address = this.state.member_address.member_address_address;

				let member_delivery_order_product_sku_list = [];
				let map = {};
				map.product_sku_quantity = values.product_sku_quantity;
				map.product_sku_id = this.state.product_sku_id;
				member_delivery_order_product_sku_list.push(map);
				values.member_delivery_order_product_sku_list = member_delivery_order_product_sku_list;
				delete values.product_sku_quantity;

				values.member_delivery_order_express_pay_way = values.member_delivery_order_express_pay_way[0];
				values.member_delivery_order_is_warehouse_deliver = false; //自己发货
				Toast.loading('加载中..', 0);

				http.request({
					url: '/member/delivery/order/save',
					data: values,
					success: function (data) {
						Toast.hide();
						if (data) {
							storage.removeMemberAddress();
							this.handleBack();
						}
					}.bind(this),
					complete() {

					}
				});
			}
		});
	}

	handleBack() {
		this.props.dispatch(routerRedux.goBack());
	}

	handleMemberAddress() {
		this.props.dispatch(routerRedux.push({
			pathname: '/member/address/index/select',
			query: {}
		}));
	}

	render() {
		const Item = List.Item;
		const Brief = Item.Brief;

		const {getFieldProps, getFieldError} = this.props.form;

		return (
			<div>
				<List>
					<Item arrow="horizontal"
						  extra={typeof (this.state.member_address.member_address_name) === 'undefined' ? '请选择' : ''}
						  wrap
						  className="item-long-text"
						  onClick={this.handleMemberAddress.bind(this)}>
						{
							typeof (this.state.member_address.member_address_name) === 'undefined' ?
								'收货地址'
								:
								<div>
									{this.state.member_address.member_address_name} {this.state.member_address.member_address_mobile}
									<Brief>{this.state.member_address.member_address_province + this.state.member_address.member_address_city + this.state.member_address.member_address_area + this.state.member_address.member_address_address}</Brief>
								</div>
						}
					</Item>
				</List>
				<WhiteSpace size="lg"/>
				<List>
					<InputItem
						{...getFieldProps('product_sku_quantity', {
							rules: [{
								required: true,
								message: '请输入爆水丸数量',
							}],
							initialValue: '',
						})}
						error={!!getFieldError('product_sku_quantity')}
						clear
						placeholder="请输入爆水丸数量"
					>爆水丸数量:</InputItem>
					<Picker
						data={[
                            {
                                label: '到付',
                                value: '到付',
                            },
                            {
                                label: '自己付',
                                value: '自己付',
                            },
                        ]} {...getFieldProps('member_delivery_order_express_pay_way', {
						initialValue: [],
					})}
					>
						<Item arrow="horizontal">支付方式:</Item>
					</Picker>
				</List>
				<WhiteSpace size="lg"/>
				<div style={{height: '200px'}}></div>
				<div className="footer">
					<div className="footer-buttom" onClick={this.handleAdd.bind(this)}>提交</div>
				</div>
				<div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
					<div className="loading"><ActivityIndicator/></div>
				</div>
			</div>
		);
	}
}

MemberDeliveryOrderSelfDeliver = createForm()(MemberDeliveryOrderSelfDeliver);

export default connect(() => ({}))(MemberDeliveryOrderSelfDeliver);
