import React, {Component} from 'react';
import {connect} from 'dva';
import {ActivityIndicator} from 'antd-mobile';

class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: this.props.article_index.is_load
        }
    }

    componentDidMount() {
        document.title = '商学院';

        document.body.scrollTop = 0;

        this.props.dispatch({
            type: 'article_index/fetch',
            data: {
                is_load: true
            }
        });

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div>
                    <img src={require('../../assets/svg/empty.svg')} className="empty-image" alt=""/>
                    <div className="empty-text">没有数据</div>
                </div>
                {
                    this.state.is_load ?
                        ''
                        :
                        <div className={'loading-mask ' + (this.props.article_index.is_load ? 'loading-mask-hide' : '')}>
                            <div className="loading"><ActivityIndicator/></div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(({article_index}) => ({article_index}))(Article);
