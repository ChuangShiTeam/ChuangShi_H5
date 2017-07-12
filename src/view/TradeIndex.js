import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Tabs} from 'antd-mobile';

class TradeIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = '我的订单';

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
                <Tabs defaultActiveKey="1" animated={false}>
                    <TabPane tab="全部" key="10">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡一内容
                        </div>
                    </TabPane>
                    <TabPane tab="代付款" key="1">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡二内容
                        </div>
                    </TabPane>
                    <TabPane tab="代发货" key="2">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡三内容
                        </div>
                    </TabPane>
                    <TabPane tab="代收货" key="3">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡四内容
                        </div>
                    </TabPane>
                    <TabPane tab="已完成" key="4">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡五内容
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default connect(() => ({}))(TradeIndex);
