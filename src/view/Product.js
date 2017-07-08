import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { Button, List } from 'antd-mobile';

class Product extends Component {
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

    render() {
        return (
            <List style={{ margin: '0.1rem 0', backgroundColor: 'white' }}>
                <List.Item
                    extra={<Button type="ghost" size="small" inline>small</Button>}
                    multipleLine
                >
                    regional manager
                    <List.Item.Brief>
                        Can be collected, refund, discount management, view data and other operations
                    </List.Item.Brief>
                </List.Item>
                <List.Item
                    extra={<Button type="primary" size="small" inline>small</Button>}
                    multipleLine
                >
                    regional manager
                    <List.Item.Brief>
                        Can be collected, refund, discount management, view data and other operations
                    </List.Item.Brief>
                </List.Item>
            </List>
        );
    }
}

export default connect(({}) => ({}))(Product);
