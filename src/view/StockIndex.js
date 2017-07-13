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
        this.props.dispatch(routerRedux.push({
            pathname: '/stock/add',
            query: {},
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        multipleLine
                        extra="999"
                        arrow="horizontal"
                    >
                        我的库存
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        multipleLine
                        extra="签收"
                        arrow="horizontal"
                        className="item-long-text"
                    >
                        <div>物流公司：德邦</div>
                        <div>快递单号：5277817363</div>
                        <div className="text-ellipsis">收货地址：北京北京市朝阳区朝阳北路八里庄北里公园1872，3号楼405</div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>新建发货单</div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(StockIndex);
