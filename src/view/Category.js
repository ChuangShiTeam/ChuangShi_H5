import React, {Component} from 'react';
import {connect} from 'dva';
import {Toast} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category_id: '0',
            category_list: [],
            product_list: [],
        }
    }

    componentDidMount() {
        document.title = '商品分类';

        document.body.scrollTop = 0;

        if (this.props.category.product_list.length === 0) {
            this.props.dispatch({
                type: 'category/fetch',
                data: {
                    category_list: constant.category
                }
            });

            this.handleLoad();
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
                this.props.dispatch({
                    type: 'index/fetch',
                    data: {
                        product_list: data
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

    render() {
        return (
            <div>
                <view>
                    <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                    <view className="empty-text">没有数据</view>
                </view>
            </div>
        );
    }
}

export default connect(({category}) => ({category}))(Category);
