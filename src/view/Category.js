import React, {Component} from 'react';
import {connect} from 'dva';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = '商品分类';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

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

export default connect(() => ({}))(Category);