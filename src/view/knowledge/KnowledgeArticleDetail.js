import React, {Component} from 'react';
import {connect} from 'dva';
import {ActivityIndicator, WhiteSpace} from 'antd-mobile';

import http from '../../util/http';
import validate from '../../util/validate';

class KnowledgeArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            is_empty: false,
            article: {},
        };
    }

    componentDidMount() {
        document.body.scrollTop = 0;

        if (this.props.params.article_id === '0') {
            this.setState({
                is_empty: true,
                is_load: true
            });
        } else {
            this.handleLoad();
        }
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
                data.article_content = validate.unescapeHtml(data.article_content);

                document.title = data.article_name;

                this.setState({
                    article: data
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this),
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.is_empty ?
                        <div>
                            <img src={require('../../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <div className="empty-text">没有数据</div>
                        </div>
                        :
                        <div className="article-content"
                             dangerouslySetInnerHTML={{__html: this.state.article.article_content}}></div>
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({story}) => ({story}))(KnowledgeArticleDetail);
