import React, {Component} from 'react';
import {connect} from 'dva';

class MemberBillIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = 'TA的订单流水';

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

export default connect(() => ({}))(MemberBillIndex);
