import React, { Component } from 'react'
import './List.css'
import {withRouter} from 'react-router-dom'
import $http from '../../utlis/http'
import getCookie from '../../utlis/getCookie'
import {connect} from 'react-redux'
import {CHANGE_GOODS_COUNT, CHANGE_SELECT, UPDATE_CART} from '../../store/reducers'

@withRouter
class List extends Component{
    render(){
        const {cartList} = this.props
        const {changeCount, toggleSelect}=this.props
        return(
            <div className='shopping-goodsList'>
                {cartList && cartList.map((item,index)=>{ 
                    return <div key={index} className='shopping-item'>
                    <span className='shopping-radio'>
                        <i onClick={()=>{toggleSelect(1-item.selected,item.goods_id)}} className={`iconfont icon-${item.selected?'iconfontxuanzhong1':'weixuanzhong'}`}></i>
                    </span>
                    <span className='shopping-img'><img alt='' src={`http://www.lb717.com${item.obj_data}`}/></span>
                    <div className='shopping-text'>
                        <p>{item.goods_name}</p>
                        <div>
                            <b>￥{item.discount_price}</b>
                            <p>
                                <i onClick={()=>changeCount(item.count<=0?0:--item.count,item.goods_id)}>-</i>
                                <span>{item.count}</span>
                                <i onClick={()=>changeCount(++item.count,item.goods_id)}>+</i>
                            </p>
                        </div>
                    </div>
                </div>
                })}
            </div>
        )
    }
    componentDidMount(){
        this.props.getGoodsList(this.props.history) 
    }
}


const mapDispatchToProps=(dispatch)=>{
    return {
        changeCount(count,id){
            dispatch({
                type:CHANGE_GOODS_COUNT,
                count,
                id
            })
        },
        toggleSelect(selected,id){
            dispatch({
                type:CHANGE_SELECT,
                selected,
                id
            })
        },
        getGoodsList(history){
            $http.post('/user/cart/getGoodsList',{
                token:getCookie('token')
            }).then(result=>{
                console.log(result,'购物车请求渲染数据')
                if(result.err){ 
                    history.push('/user')  
                }else{
                    dispatch({
                        type:UPDATE_CART,
                        data:result
                    })
                }
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(List);