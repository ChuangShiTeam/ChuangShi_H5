import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Tabs} from 'antd-mobile';

class StockIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = '我的发货';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    handleAdd() {

    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        multipleLine
                        arrow="horizontal"
                    >
                        <span style={{fontSize: '24px'}}>我的库存：999</span>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item arrow="horizontal">
                        快递单号
                    </Item>
                </List>
            </div>
        );
    }
}

export default connect(() => ({}))(StockIndex);
