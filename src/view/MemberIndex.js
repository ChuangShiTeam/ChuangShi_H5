import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List} from 'antd-mobile';

class MemberIndex extends Component {
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

    handleMemberLevel() {
        this.props.dispatch(routerRedux.push({
            pathname: '/member/level/' + this.props.params.member_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <List.Item
                        multipleLine
                    >
                        ddd
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item arrow="horizontal" onClick={this.handleMemberLevel.bind(this)}>
                        重设等级
                    </Item>
                </List>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberIndex);
