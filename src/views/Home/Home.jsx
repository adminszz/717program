import React, { Component } from 'react'
import $http from '../../utlis/http'
import './Home.css'
import '../../static/css/reset.css'
import '../../static/font/iconfont.css'
import GoodItem from '../../components/goodComp/goodsItem'
import SwiperComponent from '../../components/swiper/swiper'
class Home extends Component{
    constructor(){
        super()
        this.toSearch = this.toSearch.bind(this)
        this.state={
            list:[
                {
                    name:'牛奶乳品',
                    img:require('../../static/img/c1.png')
                },
                {
                    name:'家乡味道',
                    img:require('../../static/img/c2.png')
                },
                {
                    name:'休闲零食',
                    img:require('../../static/img/c3.png')
                },
                {
                    name:'米面粮面',
                    img:require('../../static/img/c4.png')
                },
                {
                    name:'调味调料',
                    img:require('../../static/img/c5.png')
                },
                {
                    name:'酒水饮料',
                    img:require('../../static/img/c6.png')
                },
                {
                    name:'生鲜果蔬',
                    img:require('../../static/img/c7.png')
                },
                {
                    name:'进口食品',
                    img:require('../../static/img/c8.png')
                }
            ],
            goodsList:[],
            channel_id:2,
            caniquery:true
        }
    }
    toSearch() {
        let { history } = this.props
        history.push('/search')
    }
    render () {
        const { list,goodsList } = this.state 
        return (
            <div className='home_cont' ref='scroller' onScroll={this.scrolling.bind(this)}>
                <div ref='doc'>
                    <div className='head'>
                        <span>717</span>
                        <span>
                            <i className='icon sousuo'></i>
                            <input type="text" onFocus={this.toSearch} placeholder='请输入您要购买的商品'/>
                        </span>
                        <span>
                            <i className='icon dianpu'></i>
                            <b>我的店铺</b>
                        </span>
                    </div> 
                    <div className='content'>
                        <div>
                            <SwiperComponent></SwiperComponent>
                        </div>
                        <section className='section ks-clear'>
                            {
                                list.map((item,index) => {
                                return  <dl key={index}>
                                        <dt><img src={item.img} alt=""/></dt>
                                        <dd>{item.name}</dd>
                                    </dl>
                                })
                            }
                        </section>
                        <div className='goods-list ks-clear'>
                            {
                                goodsList.map((item,index)=>{
                                    return <GoodItem key={index} data={item} history={this.props.history}></GoodItem>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                goodsList:JSON.parse(res).data.data
            })
        })
    }
    scrolling(){
        if(this.state.channel_id>9) return;
        if(!this.state.caniquery) return; 
        let {scroller,doc} = this.refs
        let st = scroller.scrollTop;
        let sw = scroller.offsetHeight;
        let dh = doc.offsetHeight;
        if(dh-(st+sw)<50){
            this.setState({
                channel_id:++this.state.channel_id,
                caniquery:false
            })
            let { goodsList } = this.state;
            $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
            .then(res=>{
                this.setState({
                    goodsList:[...goodsList,...JSON.parse(res).data.data]
                })
                this.setState({
                    caniquery:true
                })
            })
        }
    }
}
export default Home
