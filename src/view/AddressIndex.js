import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace} from 'antd-mobile';

class AddressIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = '我要进货';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    handleAdd() {

    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>新建收货地址</div>
                </div>
            </div>
        );
    }
}

export default connect(({}) => ({}))(AddressIndex);
