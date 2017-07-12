import React, {Component} from 'react';
import {connect} from 'dva';

class MemberStockIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = 'TA的发货单';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <view className="">
                    <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                    <view className="empty-text">没有数据</view>
                </view>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberStockIndex);
