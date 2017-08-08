import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator} from 'antd-mobile';

class Launch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            qrcode: '',
        };
    }

    componentDidMount() {
        document.title = '星创会';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleStart() {
        this.props.dispatch(routerRedux.push({
            pathname: '/team',
            query: {},
        }));
    }

    render() {
        return (
            <div>
                <div className="launch" style={{backgroundImage: 'url(' + require('../assets/image/launch.jpg') + ')'}} onClick={this.handleStart.bind(this)}>
                </div>
                {/*<div className="launch-start" style={{height: document.documentElement.clientHeight / 2}} ></div>*/}
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(Launch);
