import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Toast} from 'antd-mobile';

import http from '../util/http';

class MemberIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = '我要进货';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/member/find',
            data: {
                member_id: this.props.params.member_id
            },
            success: function (data) {

                Toast.hide();
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
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
