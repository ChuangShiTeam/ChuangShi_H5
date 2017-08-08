import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import constant from '../util/constant';
import http from '../util/http';
import wechat from '../util/wechat';

import style from './style.css';

class KnowledgeArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: {},
        };
    }

    componentDidMount() {
        document.title = '星创商学院';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/article/find',
            data: {
                article_id: this.props.params.article_id
            },
            success: function (data) {
                this.setState({
                    article: data
                });
            }.bind(this),
            complete: function () {

            }.bind(this),
        });
    }

    render() {
        return (
            <div>
                <div className={style.page}>
                    <div style={{textAlign: 'center'}}><h1>{this.state.article.article_name}</h1></div>
                    <div className={style.articleContent}
                         dangerouslySetInnerHTML={{__html: this.state.article.article_content}}></div>
                </div>
            </div>
        );
    }
}

export default connect(({story}) => ({story}))(KnowledgeArticleDetail);
