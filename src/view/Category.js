import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category_id: ''
        }
    }

    componentDidMount() {
        document.title = '商品分类';

        document.body.scrollTop = 0;

        if (this.props.category.product_list.length === 0) {
            this.props.dispatch({
                type: 'category/fetch',
                data: {
                    category_list: constant.category.concat()
                }
            });

            this.handleLoad();
        } else {
            let category_id = this.props.params.category_id;
            let product_show_list = [];

            for (let i = 0; i < this.props.category.product_list.length; i++) {
                if (this.props.category.product_list[i].product_category_id === category_id || category_id === '0') {
                    product_show_list.push(this.props.category.product_list[i]);
                }
            }

            this.props.dispatch({
                type: 'category/fetch',
                data: {
                    product_show_list: product_show_list
                }
            });

            this.setState({
                category_id: category_id
            });
        }
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/product/all/list',
            data: {},
            success: function (data) {
                let category_id = this.props.params.category_id;
                let product_show_list = [];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].product_category_id === category_id || category_id === '0') {
                        product_show_list.push(data[i]);
                    }
                }

                this.props.dispatch({
                    type: 'category/fetch',
                    data: {
                        product_list: data,
                        product_show_list: product_show_list
                    }
                });

                this.setState({
                    category_id: category_id
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
        let product_show_list = [];

        for (let i = 0; i < this.props.category.product_list.length; i++) {
            if (this.props.category.product_list[i].product_category_id === category_id || category_id === '0') {
                product_show_list.push(this.props.category.product_list[i]);
            }
        }

        this.props.dispatch({
            type: 'category/fetch',
            data: {
                product_show_list: product_show_list
            }
        });

        this.setState({
            category_id: category_id
        });
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
                <div className="category-left">
                    {
                        this.props.category.category_list.map((item) => {
                            return (
                                <div key={item.category_id} className={item.category_id == this.state.category_id ? 'category-left-item category-left-item-active' : 'category-left-item'} onClick={this.handleCategory.bind(this, item.category_id)}>{item.category_name}</div>
                            );
                        })
                    }
                </div>
                <div className="category-right">
                    {
                        this.props.category.product_show_list.map((item) => {
                            return (
                                <div
                                    className='index-product-item'
                                    style={{
                                        width: (document.documentElement.clientWidth - 202 - 50) / 2 + 'px',
                                        margin: '15px 0 0 15px'
                                    }}
                                    key={item.product_id}
                                    onClick={this.handleProduct.bind(this, item.product_id)}
                                >
                                    <img
                                        style={{
                                            width: (document.documentElement.clientWidth - 202 - 50) / 2 + 'px',
                                            height: (document.documentElement.clientWidth - 202 - 50) / 2 + 'px',
                                        }}
                                        src={constant.host + item.product_image}
                                        alt=""
                                    />
                                    <div className='index-product-item-name' style={{fontSize: '24px'}}>{item.product_name}</div>
                                    <div className='index-product-item-price' style={{fontSize: '24px'}}>
                                        ¥{item.product_sku_price.toFixed(2)}
                                        <span className="category-product-tag">
                                        <img src={require('../assets/svg/like.svg')} alt=""/>
                                        <img src={require('../assets/svg/appreciate.svg')} alt=""/>
                                    </span>
                                    </div>
                                </div>
                            );
                        })
                    }
                    <div style={{ float: 'left', width: '100%', height: '15px' }} />
                </div>
            </div>
        );
    }
}

export default connect(({category}) => ({category}))(Category);
