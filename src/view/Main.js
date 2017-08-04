import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import { TabBar } from 'antd-mobile';

import constant from '../util/constant';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: constant.menu,
            selectedTab: ''
        };
    }

    componentDidMount() {
        this.handleMenu();
    }

    componentWillUnmount() {

    }

    handleMenu() {
        for (let i = 0; i < this.state.menu.length; i++) {
            if (this.props.routes[2].path === this.state.menu[i].path) {
                this.setState({
                    selectedTab: this.state.menu[i].key,
                });
            }
        }
    }

    handlePress(key, url) {
        this.setState({
            selectedTab: key,
        });

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
