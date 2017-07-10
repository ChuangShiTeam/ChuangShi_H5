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
        document.title = '我要进货';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    handleAdd() {

    }

    render() {
        const TabPane = Tabs.TabPane;

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
                <Tabs defaultActiveKey="1" animated={false}>
                    <TabPane tab="选项卡一" key="1">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡一内容
                        </div>
                    </TabPane>
                    <TabPane tab="选项卡二" key="2">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡二内容
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default connect(() => ({}))(StockIndex);
