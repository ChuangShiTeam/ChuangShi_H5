import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List, Checkbox} from 'antd-mobile';

import storage from '../util/storage';
import constant from '../util/constant';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.cart.is_load,
            is_all: false,
            is_select: false,
            is_edit: false,
            cart_total: 0,
            cart_list: storage.getCart(),
        }
    }

    componentDidMount() {
        document.title = '购物车';

        document.body.scrollTop = 0;

        this.props.dispatch({
            type: 'cart/fetch',
            data: {
                is_load: true
            }
        });

        this.handleChangeAll();
    }

    componentWillUnmount() {

    }

    handleCheckboxItem(product) {
        var is_all = true;
        var is_select = false;
        var cart_total = 0;
        var cart_list = this.state.cart_list;

        for (var i = 0; i < cart_list.length; i++) {
            if (cart_list[i].product_id == product.product_id) {
                cart_list[i].is_check = !cart_list[i].is_check;
            }

            if (cart_list[i].is_check) {
                is_select = true;

                cart_total += cart_list[i].product_sku_quantity * cart_list[i].product_sku_price;
            } else {
                is_all = false;
            }
        }

        this.setState({
            is_all: is_all,
            is_select: is_select,
            cart_total: cart_total,
            cart_list: cart_list,
        });
    }

    handleChangeAll() {
        var is_all = !this.state.is_all;
        var is_select = false;
        var cart_total = 0;
        var cart_list = this.state.cart_list;

        for (var i = 0; i < cart_list.length; i++) {
            cart_list[i].is_check = is_all;

            if (is_all) {
                is_select = true;

                cart_total += cart_list[i].product_sku_quantity * cart_list[i].product_sku_price;
            }
        }

        this.setState({
            is_all: is_all,
            is_select: is_select,
            cart_total: cart_total,
            cart_list: cart_list,
        });
    }

    handleBuy() {
        if (!this.state.is_select) {
            return;
        }

        var cart_list = this.state.cart_list;
        var uncheck_cart_list = [];
        var product_list = [];

        for (var i = 0; i < cart_list.length; i++) {
            if (cart_list[i].is_check) {
                product_list.push({
                    product_sku_id: cart_list[i].product_sku_id,
                    product_sku_quantity: cart_list[i].product_sku_quantity
                });
            } else {
                uncheck_cart_list.push(cart_list[i]);
            }
        }

        storage.setCart(uncheck_cart_list);

        storage.setProductSkuList(product_list);
        this.props.dispatch(routerRedux.push({
            pathname: '/trade/check',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;
        const CheckboxItem = Checkbox.CheckboxItem;

        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.state.cart_list.length > 0 ?
                        <List>
                            {
                                this.state.cart_list.map((item) => {
                                    return (
                                        <Item
                                            key={item.product_sku_id}
                                            multipleLine
                                        >
                                            <CheckboxItem
                                                checked={item.is_check} className="cart-list-checkbox" activeStyle={{
                                                backgroundColor: '#ffffff',
                                            }}
                                                onChange={this.handleCheckboxItem.bind(this, item)}
                                            />
                                            <img
                                                className="cart-list-image"
                                                src={constant.host + item.product_image}
                                            />
                                            <span className="cart-list-text">{item.product_name}</span>
                                            <span className="cart-list-price">{item.product_sku_price.toFixed(2)}</span>
                                            <span className="cart-list-quantity">{item.product_sku_quantity}</span>
                                        </Item>
                                    );
                                })
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.state.cart_list.length == 0 ?
                        ''
                        :
                        <div className={this.props.route.path.indexOf('/index') > -1 ? 'footer' : 'footer2'}>
                            <div className="cart-total">
                                <CheckboxItem
                                    checked={this.state.is_all} activeStyle={{
                                    backgroundColor: '#ffffff',
                                }} className="cart-all-checkbox" onChange={this.handleChangeAll.bind(this)}
                                >
                                    全选
                                </CheckboxItem>
                                <span className="cart-total-text">总金额: ￥{this.state.cart_total.toFixed(2)}</span>
                            </div>
                            <div className="footer-buy" style={{backgroundColor: this.state.is_select ? '#f23030' : '#dddddd'}} onClick={this.handleBuy.bind(this)}>
                                立即购买
                            </div>
                        </div>
                }
                {
                    this.state.is_load && this.state.cart_list.length === 0 ?
                        <div>
                            <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <div className="empty-text">没有数据</div>
                        </div>
                        :
                        ''
                }
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.props.cart.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({cart}) => ({cart}))(Cart);
