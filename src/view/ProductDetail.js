import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Stepper, Toast} from 'antd-mobile';

import constant from '../util/constant';
import storage from '../util/storage';
import http from '../util/http';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {}
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

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/product/find',
            data: {
                product_id: this.props.params.product_id,
            },
            success: function (data) {
                this.props.dispatch({
                    type: 'product/fetch',
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

                Toast.hide();
            }.bind(this),
            complete() {

            },
        });
    }

    handleChange(product_sku_quantity) {
        let product_sku_total_price = this.props.product.product_sku_price * product_sku_quantity;

        this.props.dispatch({
            type: 'product/fetch',
            data: {
                product_sku_quantity: product_sku_quantity,
                product_sku_total_price: product_sku_total_price
            },
        });
    }

    handleBuy() {
        storage.setProductSkuList([{
            product_sku_id: this.props.product.product_sku_id,
            product_sku_quantity: this.props.product.product_sku_quantity
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
                        this.props.product.is_load ?
                            <img style={{
                                width: document.documentElement.clientWidth + 'px',
                                height: document.documentElement.clientWidth + 'px'
                            }} src={constant.host + this.props.product.product_image} alt=""/>
                            :
                            ''
                    }
                </div>
                <List>
                    <Item>
                        <div>{this.props.product.product_name}</div>
                        <div className="product-price">
                            ￥{this.props.product.product_sku_price.toFixed(2)}
                            <span className="product-tag">
                                <img src={require('../assets/svg/round_check.svg')} alt=""/>正品保证
                                <img src={require('../assets/svg/round_check.svg')} style={{marginLeft: '10px'}}
                                     alt=""/>全场包邮
                            </span>
                        </div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item>
                        已选：{this.props.product.product_sku_quantity >= 25000 ? (this.props.product.product_sku_quantity - 15000) : this.props.product.product_sku_quantity}个
                    </Item>
                    <Item extra={
                        <Stepper
                            style={{width: '100%', minWidth: '2rem'}}
                            showNumber={false}
                            max={99999}
                            min={1}
                            value={this.props.product.product_sku_quantity}
                            onChange={this.handleChange.bind(this)}
                        />}
                    >
                        购买数量
                    </Item>
                </List>
                <div className="product-quantity" style={{top: (document.documentElement.clientWidth + 146) + 'px'}}>
                    <div
                        className="product-quantity-number">{this.props.product.product_sku_quantity}</div>
                </div>
                <WhiteSpace size="lg"/>
                <div
                    className="product-content"
                    dangerouslySetInnerHTML={{__html: this.props.product.product_content}}
                />
                {
                    constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279' ?
                        <div style={{height: '100px'}}></div>
                        :
                        <div style={{height: '50px'}}></div>
                }
                <div className={this.props.route.path.indexOf('/detail/') > -1 ? 'footer' : 'footer2'}>
                    <div className="footer-total">
                        <span
                            className="footer-total-text">总金额: ￥{this.props.product.product_sku_total_price.toFixed(2)}</span>
                    </div>
                    <div className="footer-buy" onClick={this.handleBuy.bind(this)}>
                        {
                            constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279' ?
                                '立即进货'
                                :
                                '立即购买'
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({product}) => ({product}))(ProductDetail);
