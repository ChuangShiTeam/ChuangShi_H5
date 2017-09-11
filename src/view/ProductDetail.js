import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List, Stepper, Badge, Toast} from 'antd-mobile';

import constant from '../util/constant';
import storage from '../util/storage';
import http from '../util/http';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.product_detail.is_load,
            cart_total: storage.getCart().length,
        }
    }

    componentDidMount() {
        if (constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279') {
            document.title = '我要进货';
        } else {
            document.title = '商品详情';
        }

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {
        if (constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279') {

        } else {
            this.props.dispatch({
                type: 'product_detail/fetch',
                data: {
                    is_load: false,
                    product_total: 0,
                    product_id: '',
                    product_name: '',
                    product_image: '',
                    product_content: '',
                    product_sku_id: '',
                    product_sku_price: 0,
                    product_sku_total_price: 0,
                    product_sku_quantity: 0,
                    product_sku_min_quantity: 10
                },
            });
        }
    }

    handleLoad() {
        http.request({
            url: constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279' ? '/mobile/product/find' : '/product/find',
            data: {
                product_id: this.props.params.product_id,
            },
            success: function (data) {
                this.props.dispatch({
                    type: 'product_detail/fetch',
                    data: {
                        is_load: true,
                        product_id: data.product_id,
                        product_name: data.product_name,
                        product_image: data.product_image,
                        product_content: data.product_content,
                        product_sku_id: data.product_sku_id,
                        product_sku_price: data.product_sku_price,
                        product_sku_quantity: data.product_sku_quantity,
                        product_sku_total_price: data.product_sku_price * data.product_sku_quantity
                    },
                });
            }.bind(this),
            complete: function () {
                this.props.dispatch({
                    type: 'product_detail/fetch',
                    data: {
                        is_load: true
                    }
                });
            }.bind(this)
        });
    }

    handleChange(product_sku_quantity) {
        console.log(product_sku_quantity);
        let product_sku_total_price = this.props.product_detail.product_sku_price * product_sku_quantity;

        this.props.dispatch({
            type: 'product_detail/fetch',
            data: {
                product_sku_quantity: product_sku_quantity,
                product_sku_total_price: product_sku_total_price
            },
        });
    }

    handleMemberPurchaseOrder() {
        storage.setProductSkuList([{
            product_sku_id: this.props.product_detail.product_sku_id,
            product_sku_quantity: this.props.product_detail.product_sku_quantity
        }]);
        this.props.dispatch(routerRedux.push({
            pathname: '/member/purchase/order/check',
            query: {}
        }));
    }

    handleIm() {
        window.location.href = "https://qiyukf.com/client?k=9027773b8177dd19b8a5d5c9bd84a9f8&u=kwtejaxwgf5s2kodhs9g&uuid=8rw3bkmeaiux2sm9rta9&gid=0&sid=0&qtype=0&dvctimer=0&robotShuntSwitch=0&hc=0&t=%25E5%2595%2586%25E5%2593%2581%25E8%25AF%25A6%25E6%2583%2585";
    }

    handleCart() {
        this.props.dispatch(routerRedux.push({
            pathname: '/cart/index',
            query: {}
        }));
    }

    handleAddCart() {
        storage.addCart({
            product_id: this.props.product_detail.product_id,
            product_name: this.props.product_detail.product_name,
            product_image: this.props.product_detail.product_image,
            product_sku_id: this.props.product_detail.product_sku_id,
            product_sku_price: this.props.product_detail.product_sku_price,
            product_sku_quantity: this.props.product_detail.product_sku_quantity,
        });

        this.setState({
            cart_total: storage.getCart().length
        });

        Toast.info("加入购物车成功", 1.5);
    }

    handleBuy() {
        storage.setProductSkuList([{
            product_sku_id: this.props.product_detail.product_sku_id,
            product_sku_quantity: this.props.product_detail.product_sku_quantity
        }]);
        this.props.dispatch(routerRedux.push({
            pathname: '/trade/check',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <div style={{height: document.documentElement.clientWidth + 'px'}}>
                    {
                        this.props.product_detail.is_load ?
                            <img style={{
                                width: document.documentElement.clientWidth + 'px',
                                height: document.documentElement.clientWidth + 'px'
                            }} src={constant.host + this.props.product_detail.product_image} alt=""/>
                            :
                            ''
                    }
                </div>
                <List>
                    <Item>
                        <div>{this.props.product_detail.product_name}</div>
                        <div className="product-price">
                            ￥{this.props.product_detail.product_sku_price.toFixed(2)}
                            <span className="product-tag">
                                <img src={require('../assets/svg/round_check.svg')} alt=""/>正品保证
                                <img src={require('../assets/svg/round_check.svg')} style={{marginLeft: '10px'}}
                                     alt=""/>全场包邮
                            </span>
                        </div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                {
                    constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279' ?
                        <List>
                            <Item>
                                {this.props.product_detail.is_first_purchase ? '首次' : ''}进货数量：{this.props.product_detail.product_sku_quantity}个
                            </Item>
                            {/*<Item extra={*/}
                                {/*<Stepper*/}
                                    {/*style={{width: '100%', minWidth: '2rem'}}*/}
                                    {/*showNumber={true}*/}
                                    {/*max={99999}*/}
                                    {/*min={1}*/}
                                    {/*value={this.props.product_detail.product_sku_quantity}*/}
                                    {/*onChange={this.handleChange.bind(this)}*/}
                                {/*/>}*/}
                            {/*>*/}
                                {/*购买数量*/}
                            {/*</Item>*/}
                        </List>
                        :
                        <List>
                            <Item>
                                已选：{this.props.product_detail.product_sku_quantity}个
                            </Item>
                            <Item extra={
                                <Stepper
                                    style={{width: '100%', minWidth: '2rem'}}
                                    showNumber={true}
                                    max={99999}
                                    min={1}
                                    value={this.props.product_detail.product_sku_quantity}
                                    onChange={this.handleChange.bind(this)}
                                />}
                            >
                                购买数量
                            </Item>
                        </List>

                }
                <WhiteSpace size="lg"/>
                <div
                    className="product-content"
                    dangerouslySetInnerHTML={{__html: this.props.product_detail.product_content}}
                />
                <WhiteSpace size="lg"/>
                {
                    constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279' ?
                        <div style={{height: '200px'}}></div>
                        :
                        <div style={{height: '100px'}}></div>
                }
                {
                    constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279' ?
                        <div className={this.props.route.path.indexOf('/detail/') > -1 ? 'footer' : 'footer2'}>
                            <div className="footer-total">
                            <span
                            className="footer-total-text">总金额: ￥{this.props.product_detail.product_sku_total_price.toFixed(2)}</span>
                            </div>
                            <div className="footer-buy" onClick={this.handleMemberPurchaseOrder.bind(this)}>
                                立即进货
                            </div>
                        </div>
                        :
                        <div className={this.props.route.path.indexOf('/detail/') > -1 ? 'footer' : 'footer2'}>
                            <div className="footer-im" onClick={this.handleIm.bind(this)}>
                                <img className="footer-cart-icon" src={require('../assets/svg/wang.svg')} alt=""/>
                                <div className="footer-cart-text">客服</div>
                            </div>
                            <div className="footer-cart" onClick={this.handleCart.bind(this)}>
                                <Badge text={this.state.cart_total} style={{marginLeft: 20, marginTop: 15}}>
                                    <img className="footer-cart-icon" src={require('../assets/svg/cart.svg')} alt=""/>
                                    <div className="footer-cart-text">购物车</div>
                                </Badge>
                            </div>
                            <div className="footer-add-cart" onClick={this.handleAddCart.bind(this)}>
                                加入购物车
                            </div>
                            <div className="footer-buy" onClick={this.handleBuy.bind(this)}>
                                立即购买
                            </div>
                        </div>
                }
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.props.product_detail.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({product_detail}) => ({product_detail}))(ProductDetail);
