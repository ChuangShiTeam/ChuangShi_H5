import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import { TabBar } from 'antd-mobile';

import constant from '../util/constant';
import notification from '../util/notification';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: constant.menu,
            selectedTab: ''
        };
    }

    componentDidMount() {
        this.handleMenu(this.props.routes[2].path);

        notification.on('notification_main_load', this, function (data) {
            this.handleMenu(data.path);
        });
    }

    componentWillUnmount() {
        notification.remove('notification_main_load', this);
    }

    handleMenu(path) {
        let key = '';
        for (let i = 0; i < this.state.menu.length; i++) {
            if (path === this.state.menu[i].path) {
                key = this.state.menu[i].key;
            }
        }

        this.setState({
            selectedTab: key
        });
    }

    handlePress(key, url) {
        // this.setState({
        //     selectedTab: key,
        // });

        this.props.dispatch(routerRedux.push({
            pathname: url,
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
                >{
                    this.state.menu.map((item) => {
                        return (
                            <TabBar.Item
                                title={item.title}
                                key={item.key}
                                icon={require('../assets/svg/' + item.icon)}
                                selectedIcon={require('../assets/svg/' + item.selected_icon)}
                                selected={this.state.selectedTab === item.key}
                                onPress={this.handlePress.bind(this, item.key, item.url)}
                            />
                        );
                    })
                }
                </TabBar>
                {this.props.children}
            </div>
        );
    }
}

export default connect(() => ({}))(Main);
