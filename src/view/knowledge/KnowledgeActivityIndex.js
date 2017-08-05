import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, Card, WhiteSpace, WingBlank} from 'antd-mobile';

class KnowledgeActivityIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '线下活动';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleItem() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/activity/detail',
            query: {},
        }));
    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg"/>
                <WingBlank size="lg">
                    <Card onClick={this.handleItem.bind(this)}>
                        <Card.Header
                            title="中国首届个创行业峰会"
                        />
                        <Card.Body>
                            <img src={require('../../assets/image/IMG_2562.jpg')} style={{width: '100%'}} alt=""/>
                        </Card.Body>
                    </Card>
                    <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                        <div className="loading"><ActivityIndicator/></div>
                    </div>
                </WingBlank>
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
            </div>
        );
    }
}

export default connect(() => ({}))(KnowledgeActivityIndex);
