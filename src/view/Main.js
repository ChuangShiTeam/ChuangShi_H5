import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import { TabBar } from 'antd-mobile';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: this.props.routes[2].path
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handlePress(tab) {
        this.setState({
            selectedTab: tab,
        });

        this.props.dispatch(routerRedux.push({
            pathname: '/' + tab,
            query: {},
        }));
    }

    render() {
        return (
            <div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#a72025"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="团队"
                        key="index"
                        icon={require('../assets/svg/friend.svg')}
                        selectedIcon={require('../assets/svg/friend_active.svg')}
                        selected={this.state.selectedTab === 'home'}
                        onPress={this.handlePress.bind(this, 'home')}
                    />
                    <TabBar.Item
                        title="进货"
                        key="product"
                        icon={require('../assets/svg/cart.svg')}
                        selectedIcon={require('../assets/svg/cart_active.svg')}
                        selected={this.state.selectedTab === 'product'}
                        onPress={this.handlePress.bind(this, 'product')}
                    />
                    <TabBar.Item
                        title="个人"
                        key="my"
                        icon={require('../assets/svg/my.svg')}
                        selectedIcon={require('../assets/svg/my_active.svg')}
                        selected={this.state.selectedTab === 'my'}
                        onPress={this.handlePress.bind(this, 'my')}
                    />
                </TabBar>
                {this.props.children}
            </div>
        );
    }
}

export default connect(() => ({}))(Main);
