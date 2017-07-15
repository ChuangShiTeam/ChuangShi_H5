import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, Toast} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = constant.name;

        document.body.scrollTop = this.props.index.scroll_top;

        if (this.props.index.list.length === 0) {
            this.handleLoad();
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'index/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/product/all/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        list: data
                    }
                });

                Toast.hide();
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
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
            <view>
                <div style={{height: document.documentElement.clientWidth * 0.3125 + 'px'}}>
                    <img src={require('../assets/image/banner.jpg')} style={{width: '100%'}} alt=""/>
                </div>
                <div className='index-category'>
                    <div className='index-category-item'
                         onClick={this.handleCategory.bind(this, '146474b15ba545d9b9717cf8b5a6c3f5')}>
                        <div className='index-category-item-icon' style={{background: '#73b4ef'}}>
                            <img className='index-category-item-icon-image' src={require('../assets/svg/discover.svg')}
                                 alt=""/>
                        </div>
                        肠内营养
                    </div>
                    <div className='index-category-item'
                         onClick={this.handleCategory.bind(this, '9ed6cb3551fb4bfaabfeee89cc63f9b4')}>
                        <div className='index-category-item-icon' style={{background: '#e78ab0'}}>
                            <img className='index-category-item-icon-image' src={require('../assets/svg/ticket.svg')}
                                 alt=""/>
                        </div>
                        快康系列
                    </div>
                    <div className='index-category-item'
                         onClick={this.handleCategory.bind(this, '34fb354194e0409e8a80a4382a7fa18d')}>
                        <div className='index-category-item-icon' style={{background: '#7acfa6'}}>
                            <img className='index-category-item-icon-image' src={require('../assets/svg/present.svg')}
                                 alt=""/>
                        </div>
                        特殊奶粉
                    </div>
                    <div className='index-category-item'
                         onClick={this.handleCategory.bind(this, '26ef74aa1bb242479df5305478f31b08')}>
                        <div className='index-category-item-icon' style={{background: '#ffcb63'}}>
                            <img className='index-category-item-icon-image' src={require('../assets/svg/punch.svg')}
                                 alt=""/>
                        </div>
                        理疗辅助
                    </div>
                    <div className='index-category-item'
                         onClick={this.handleCategory.bind(this, '45ac41e5c3334439a6ac45abdea31a30')}>
                        <div className='index-category-item-icon' style={{background: '#9f8bea'}}>
                            <img className='index-category-item-icon-image' src={require('../assets/svg/apps.svg')}
                                 alt=""/>
                        </div>
                        补血系列
                    </div>
                    <div className='index-category-item' onClick={this.handleCategory.bind(this, '0')}>
                        <div className='index-category-item-icon' style={{background: '#fd666b'}}>
                            <img className='index-category-item-icon-image'
                                 src={require('../assets/svg/cart_white.svg')} alt=""/>
                        </div>
                        所有商品
                    </div>
                </div>
                {
                    this.props.index.list.map((item) => {
                        return (
                            <div
                                className='index-product-item'
                                style={{
                                    width: (document.documentElement.clientWidth - 25) / 2 + 'px',
                                    margin: '7px 0 0 7px'
                                }}
                                key={item.product_id}
                                onClick={this.handleProduct.bind(this, item.product_id)}
                            >
                                <img
                                    style={{
                                        width: (document.documentElement.clientWidth - 25) / 2 + 'px',
                                        height: (document.documentElement.clientWidth - 25) / 2 + 'px',
                                    }}
                                    src={item.product_image}
                                    alt=""
                                />
                                <div className='index-product-item-name'>{item.product_name}</div>
                                <div className='index-product-item-price'>¥{item.product_sku_price}</div>
                            </div>
                        );
                    })
                }
                <div style={{float: 'left', width: '100%', height: '57px'}}/>
            </view>
        );
    }
}

export default connect(({index}) => ({index}))(Index);
