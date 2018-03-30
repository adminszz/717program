import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'
import $http from '../../utils/http'
import getCookie from '../../utils/getCookie'
import './Cart.css';
import {connect} from 'react-redux'
import ShopcartListList from '../List/index'
import { TOGGLE_SELECTED_ALL} from '../../store/reducers'
import { UPDATE_CART} from '../../store/reducers'

@withRouter
class Cart extends Component {
    constructor(){
        super()
        this.state={
            edit:'编辑',
            pay:'结算',
            totalPriceClass:'show-totalPrice'
        }
        this.cartEdit = this.cartEdit.bind(this)
        this.deleteCartGoods=this.deleteCartGoods.bind(this)
    }
    render(){
        const { cartList, selectAll, totalPrice, toggleSelectedAll} = this.props
        return (
            <div className='App-Shopping'>
                <header>
                    购物车<span onClick={this.cartEdit}>{this.state.edit}</span>
                </header>
                <ShopcartList cartList={cartList}/>
                <footer className='shopping-footer'>
                    <div onClick={() => { toggleSelectedAll() }}><i className={`iconfont icon-${selectAll ?'iconfontxuanzhong1':'weixuanzhong'}`}></i>全选</div>
                    <div><p className={this.state.totalPriceClass}>合计：<span>￥{totalPrice}</span></p></div>
                    <div onClick={this.deleteCartGoods}>{this.state.pay}</div>
                </footer>
            </div>
        )
    }
    cartEdit(){
        const editState=this.state.edit === '编辑' 
        this.setState({
            edit: editState? '完成' :'编辑',
            pay: editState ? '删除' : '结算',
            totalPriceClass: editState ? 'hide-totalPrice' : 'show-totalPrice',
        })
    }
    deleteCartGoods(){
        if(this.state.pay==='结算') return;
        let selectedID=[];
        this.props.cartList.forEach(item=>{
            if(item.selected){
                selectedID.push(item.goods_id)
            }
        })
        this.props.delCartGoods(selectedID)
    }
    componentDidMount(){
        PubSub.publish('changeHead', this.props.location.pathname);
    }
}

const mapStateToProps=(state,ownProps)=>{
    let selectAll=true;  
    let totalPrice=0;
    state.cart_list.forEach(item=>{
        if(item.selected){
            totalPrice+=item.count*item.discount_price;  
        }else{  
            selectAll=false; 
        }
    })

    return {
        cartList:state.cart_list,
        selectAll,
        totalPrice:totalPrice.toFixed(2)
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        toggleSelectedAll(){
            dispatch({
                type:TOGGLE_SELECTED_ALL
            })
        },
        delCartGoods(selectedID){
            $http.post('/user/cart/delCartGoods',{
                token:getCookie('token'),
                selectedID
            }).then(result=>{
                if(result.code){
                    dispatch({
                        type:UPDATE_CART,
                        data:result.remainGoods
                    })
                }
                console.log(result,'delCartGoods')
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);