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
                <div>
                    <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                    <div className="empty-text">没有数据</div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberStockIndex);
