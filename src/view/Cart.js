import React, {Component} from 'react';
import {connect} from 'dva';
import {ActivityIndicator} from 'antd-mobile';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = '购物车';

        document.body.scrollTop = 0;

        this.props.dispatch({
            type: 'cart/fetch',
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
                    <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                    <div className="empty-text">没有数据</div>
                </div>
                <div className={'loading-mask ' + (this.props.cart.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(({cart}) => ({cart}))(Cart);
