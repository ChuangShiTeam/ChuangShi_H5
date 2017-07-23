import React, {Component} from 'react';
import {connect} from 'dva';
import {ActivityIndicator} from 'antd-mobile';

class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '我的授权书';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div>
                    <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                    <div className="empty-text">没有数据</div>
                </div>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(Article);
