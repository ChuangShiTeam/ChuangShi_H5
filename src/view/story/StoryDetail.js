import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import http from '../../util/http';

class StoryDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: {},
        };
    }

    componentDidMount() {
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
                <div>
                    <div style={{textAlign: 'center'}}><h1>{this.state.article.article_name}</h1></div>
                    <div className="article-content"
                         dangerouslySetInnerHTML={{__html: this.state.article.article_content}}></div>
                </div>
            </div>
        );
    }
}

StoryDetail.propTypes = {};

export default connect(({story}) => ({story}))(StoryDetail);
