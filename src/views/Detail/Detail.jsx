import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import './GoodsDetail.css'

const tabs = [
  { title: '商品' },
  { title: '详情' }
];
function renderTabBar(props) {
  return (
    <Sticky>
        {({style}) => <div style={{...style}} className='goods-tabs-title'>
            <Tabs.DefaultTabBar {...props} />
        </div>}
    </Sticky>);
}

@withRouter
class Detail extends Component{
    render(){
        return(
            <div className='goods-detail'>
                <StickyContainer>
                    <Tabs tabs={tabs}
                        initalPage={'t1'}
                        renderTabBar={renderTabBar}
                    >
                        <div>
                            Content of first tab
                        </div>
                        <div>
                            Content of second tab
                        </div>
                    </Tabs>
                </StickyContainer>
            </div>
        )
    }
    goHome(){
        this.props.history.push('/home')
    }
    componentDidMount(){
        const {goods_info} = this.props.location.query;
        console.log(goods_info)
        PubSub.publish('changeHead', this.props.location.pathname);
    }
}

export default Detail;