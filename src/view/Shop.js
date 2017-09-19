import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, Carousel} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.shop.is_load,
            carousel_list: ['00', '01', '02', '03']
        }
    }

    componentDidMount() {
        document.title = constant.name;

        document.body.scrollTop = this.props.shop.scroll_top;

        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0);

        if (this.props.shop.product_list.length === 0) {
            var category_list = constant.category.concat();
            category_list.splice(0, 1);
            category_list.push(constant.category[0]);

            this.props.dispatch({
                type: 'shop/fetch',
                data: {
                    category_list: category_list
                }
            });

            this.handleLoad();
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'shop/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleLoad() {
        http.request({
            url: '/product/all/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'shop/fetch',
                    data: {
                        product_list: data
                    }
                });
            }.bind(this),
            complete: function () {
                this.props.dispatch({
                    type: 'shop/fetch',
                    data: {
                        is_load: true
                    }
                });
            }.bind(this)
        });
    }

    handleCategory(category_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/category/' + category_id,
            query: {},
        }));
    }

    handleProduct(product_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/product/detail/' + product_id,
            query: {},
        }));
    }

    render() {
        return (
            <div>
                <div style={{height: document.documentElement.clientWidth * 0.4 + 'px'}}>
                    <Carousel autoplay infinite>
                        {
                            this.state.carousel_list.map((item, index) => {
                                return (
                                    <div key={index} style={{width: document.documentElement.clientWidth, height: document.documentElement.clientWidth * 0.4 + 'px', backgroundColor: constant.category[index].category_color}}></div>
                                );
                            })
                        }
                    </Carousel>
                </div>
                <div className='shop-category'>
                    {
                        this.props.shop.category_list.map((item) => {
                            return (
                                <div
                                    key={item.category_id}
                                    className='shop-category-item'
                                    onClick={this.handleCategory.bind(this, item.category_id)}>
                                    <div className='shop-category-item-icon' style={{background: item.category_color}}>
                                        <img className='shop-category-item-icon-image'
                                             src={require('../assets/svg/' + item.category_image)} alt=""/>
                                    </div>
                                    {item.category_name}
                                </div>
                            );
                        })
                    }
                </div>
                <div className="with-line">
                    <span className="hot">HOT</span>热卖爆款
                </div>
                {
                    this.props.shop.product_list.map((item) => {
                        return (
                            <div
                                className='shop-product-item'
                                style={{
                                    width: (document.documentElement.clientWidth - 50) / 2 + 'px',
                                    margin: '15px 0 0 15px'
                                }}
                                key={item.product_id}
                                onClick={this.handleProduct.bind(this, item.product_id)}
                            >
                                <img
                                    style={{
                                        width: (document.documentElement.clientWidth - 50) / 2 + 'px',
                                        height: (document.documentElement.clientWidth - 50) / 2 + 'px',
                                    }}
                                    src={constant.host + item.product_image}
                                    alt=""
                                />
                                <div className='shop-product-item-name'>{item.product_name}</div>
                                <div className='shop-product-item-price'>
                                    ¥{item.product_sku_price.toFixed(2)}
                                    <span className="shop-product-tag">
                                        <img src={require('../assets/svg/like.svg')} alt=""/>
                                        <img src={require('../assets/svg/appreciate.svg')} alt=""/>
                                    </span>
                                </div>
                            </div>
                        );
                    })
                }
                <div style={{float: 'left', width: '100%', height: '115px'}}/>
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.props.shop.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({shop}) => ({shop}))(Shop);
