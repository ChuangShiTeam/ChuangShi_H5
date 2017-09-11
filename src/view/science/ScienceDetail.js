import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator} from 'antd-mobile';

import http from '../../util/http';

class ScienceDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            article: {},
        };
    }

    componentDidMount() {
        document.title = '医学科普';

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
                document.title = data.article_name;

                this.setState({
                    is_load: true,
                    article: data
                });

                // wechat.share(constant.host + data.article_image_file.file_path, data.article_name, data.article_summary, 'http://h5.jiyiguan.nowui.com/#/story/detail/' + this.props.params.article_id);
            }.bind(this),
            complete: function () {

            },
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        return (
            <div>
                <div style={{textAlign: 'center'}}><h1>{this.state.article.article_name}</h1></div>
                <div className="article-content"
                     dangerouslySetInnerHTML={{__html: this.state.article.article_content}}></div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({science}) => ({science}))(ScienceDetail);
