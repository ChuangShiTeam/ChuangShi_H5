import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, Carousel} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.index.is_load
        }
    }

    componentDidMount() {
        document.title = constant.name;

        document.body.scrollTop = this.props.index.scroll_top;

        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0);

        if (this.props.index.product_list.length === 0) {
            var category_list = constant.category.concat();
            category_list.splice(0, 1);
            category_list.push(constant.category[0]);

            this.props.dispatch({
                type: 'index/fetch',
                data: {
                    category_list: category_list
                }
            });

            this.handleLoad();
        }

        if (this.props.index.banner_list.length === 0) {
            this.handleLoadBanner();
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'index/fetch',
            data: {
                scroll_top: document.body.scrollTop
            }
        });
    }

    handleLoadBanner() {
        http.request({
            url: '/mobile/advertisement/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        banner_list: data
                    }
                });
            }.bind(this),
            complete: function () {
                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        is_load: true
                    }
                });
            }.bind(this)
        });
    }

    handleLoad() {
        http.request({
            url: '/product/all/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        product_list: data
                    }
                });
            }.bind(this),
            complete: function () {
                this.props.dispatch({
                    type: 'index/fetch',
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
            query: {}
        }));
    }

    handleProduct(product_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/product/detail/' + product_id,
            query: {}
        }));
    }

    render() {
        return (
            <div>
                <div style={{height: document.documentElement.clientWidth * 0.4 + 'px'}}>
                    <Carousel autoplay infinite>
                        {
                            this.props.index.banner_list.map((item, index) => {
                                return (
                                    <img key={index} src={constant.host + item.file_original_path} style={{width: document.documentElement.clientWidth, height: document.documentElement.clientWidth * 0.4 + 'px'}} alt=""/>
                                );
                            })
                        }
                    </Carousel>
                </div>
                <div className='index-category'>
                    {
                        this.props.index.category_list.map((item) => {
                            return (
                                <div
                                    key={item.category_id}
                                    className='index-category-item'
                                    onClick={this.handleCategory.bind(this, item.category_id)}>
                                    <div className='index-category-item-icon' style={{background: item.category_color}}>
                                        <img className='index-category-item-icon-image'
                                             src={require('../assets/svg/' + item.category_image)} alt=""/>
                                    </div>
                                    {item.category_name}
                                </div>
                            );
                        })
                    }
                </div>
                <div className="with-line">
                    <span className="hot">HOT</span>热卖商品
                </div>
                {
                    this.props.index.product_list.map((item) => {
                        return (
                            <div
                                className='index-product-item'
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
                                <div className='index-product-item-name'>{item.product_name}</div>
                                <div className='index-product-item-price'>
                                    ¥{item.product_sku_price.toFixed(2)}
                                    <span className="index-product-tag">
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
                        <div className={'loading-mask ' + (this.props.index.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({index}) => ({index}))(Index);
