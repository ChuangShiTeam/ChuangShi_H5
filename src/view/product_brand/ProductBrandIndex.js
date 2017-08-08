import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator} from 'antd-mobile';

import constant from '../../util/constant';
import http from '../../util/http';

class BrandIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.product_brand.is_load
        }
    }

    componentDidMount() {
        document.title = "星创品牌";

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/product/brand/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'product_brand/fetch',
                    data: {
                        list: data
                    }
                });
            }.bind(this),
            complete: function () {
                this.props.dispatch({
                    type: 'product_brand/fetch',
                    data: {
                        is_load: true
                    }
                });
            }.bind(this)
        });
    }

    handleBrand(product_brand_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/product/brand/detail/' + product_brand_id,
            query: {},
        }));
    }

    render() {
        return (
            <div>
                {
                    this.props.product_brand.list.map((item) => {
                        return (
                            <div
                                className='index-product-item'
                                style={{
                                    width: (document.documentElement.clientWidth - 50) / 3 + 'px',
                                    margin: '15px 0 0 15px'
                                }}
                                key={item.product_brand_id}
                                onClick={this.handleBrand.bind(this, item.product_brand_id)}
                            >
                                <img
                                    style={{
                                        width: (document.documentElement.clientWidth - 50) / 3 + 'px',
                                        height: (document.documentElement.clientWidth - 50) / 3 + 'px',
                                    }}
                                    src={constant.host + item.product_brand_image}
                                    alt=""
                                />
                                <div className='index-product-item-name' style={{marginBottom: '15px', textAlign: 'center'}}>{item.product_brand_name}</div>
                            </div>
                        );
                    })
                }
                <div style={{float: 'left', width: '100%', height: '115px'}}/>
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.props.product_brand.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({product_brand}) => ({product_brand}))(BrandIndex);
