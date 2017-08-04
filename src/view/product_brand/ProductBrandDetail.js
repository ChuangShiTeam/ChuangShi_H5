import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List} from 'antd-mobile';

import constant from '../../util/constant';
import http from '../../util/http';

class BrandDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            list: []
        }
    }

    componentDidMount() {
        document.title = "产品列表";

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/product/brand/product/list',
            data: {
                product_brand_id: this.props.params.product_brand_id
            },
            success: function (data) {
                this.setState({
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

    handleProduct(product_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/product/detail/' + product_id,
            query: {},
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.state.list.length > 0 ?
                        <List>
                            {
                                this.state.list.map((item) => {
                                    return (
                                        <Item
                                            key={item.product_id}
                                            multipleLine
                                            arrow="horizontal"
                                            onClick={this.handleProduct.bind(this, item.product_id)}
                                        >
                                            <div className="list-item-image">
                                                <img src={constant.host + item.product_image} alt=""/>
                                            </div>
                                            <div className="list-item-text">
                                                {item.product_name}
                                            </div>
                                            <div className="list-item-brief product-brand-price">
                                                ￥{item.product_sku_price.toFixed(2)}
                                            </div>
                                        </Item>
                                    );
                                })
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.state.is_load && this.state.list.length === 0 ?
                        <div>
                            <img src={require('../../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <div className="empty-text">没有数据</div>
                        </div>
                        :
                        ''
                }
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(BrandDetail);
