import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {List} from 'antd-mobile';

import constant from '../../util/constant';
import http from '../../util/http';

class ScienceIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        document.title = '医学科普';

        document.body.scrollTop = this.props.science.scroll_top;

        this.handleLoad();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'science/fetch',
            data: {
                scroll_top: document.body.scrollTop
            },
        });
    }

    handleLoad() {
        http.request({
            url: '/mobile/article/science/list',
            data: {},
            success: function (data) {
                this.props.dispatch({
                    type: 'science/fetch',
                    data: {
                        list: data
                    }
                });
            }.bind(this),
            complete: function () {

            }.bind(this),
        });
    }

    handleArticle(article_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/science/detail/' + article_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <div>
                    <List>
                        {
                            this.props.science.list.map((item) => {
                                return (
                                    <Item
                                        key={item.article_id}
                                        onClick={this.handleArticle.bind(this, item.article_id)}
                                        arrow="horizontal"
                                    >
                                        <div className="article-image">
                                            <img src={constant.host + item.article_image} style={{width: '100%', height: '100%'}}/>
                                        </div>
                                        <div className="article-name">{item.article_name}</div>
                                        <div className="article-summary">{item.article_summary}</div>
                                    </Item>
                                );
                            })
                        }
                    </List>
                </div>
            </div>
        );
    }
}

export default connect(({science}) => ({science}))(ScienceIndex);
