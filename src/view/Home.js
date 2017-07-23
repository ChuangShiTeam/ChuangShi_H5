import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import constant from '../util/constant';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '上海星销';

        this.props.dispatch(routerRedux.push({
            pathname: constant.index,
            query: {},
        }));
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default connect(() => ({}))(Home);
