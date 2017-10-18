import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, Modal} from 'antd-mobile';

class Launch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            is_show: true,
            qrcode: '',
        };
    }

    componentDidMount() {
        document.title = '星创会';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleStart() {
        this.props.dispatch(routerRedux.push({
            pathname: '/team',
            query: {},
        }));
    }

    handleClose() {
        this.setState({
            is_show: false
        });
    }

    render() {
        return (
            <div>
                <div className="launch" style={{backgroundImage: 'url(' + require('../assets/image/launch.jpg') + ')'}}
                     onClick={this.handleStart.bind(this)}>
                </div>
                {/*<div className="launch-start" style={{height: document.documentElement.clientHeight / 2}} ></div>*/}
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
                <Modal
                    title="所有V+Lab代理们:"
                    transparent
                    visible={this.state.is_show}
                    onClose={this.handleClose.bind(this)}
                    footer={[{
                        text: '确定', onPress: () => {
                            this.handleClose();
                        }
                    }]}
                >
                    临近年底，爆水丸市场需求旺盛，销量激增，仓库已经缺货。加之工厂近期生产任务繁重，原材料稀缺，生产周期顺延。即日起付款的订单采取预售模式，工厂预计出货时间11月15日，到货后根据预定订单先后顺序排单发货。在此期间预定爆水丸，配比的赠品正常发货，无需等待特此告知！
                </Modal>
            </div>
        );
    }
}

export default connect(() => ({}))(Launch);
