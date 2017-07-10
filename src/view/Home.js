import React, {Component} from 'react';
import {connect} from 'dva';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '上海星销';
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <view className="">
                <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                <view className="empty-text">系统正在维护中</view>
            </view>
        );
    }
}

export default connect(() => ({}))(Home);
