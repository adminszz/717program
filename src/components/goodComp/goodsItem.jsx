import React, { Component} from 'react'
import './goodsItem.css'
import $http from '../../utlis/http'
import Lazyload from 'react-lazyload'
import { getCookie } from '../../utlis/utlis'
import {ToastContainer,toast} from 'react-toastify';
import {connect} from 'react-redux';
import {ADD_CART} from '../../store/reducers.js'
class Placeholder extends Component{
    render(){
        return <img className='img1' src={require('../../static/img/lazy.jpg')} alt=""/>
    }
}
class GoodsItem extends Component{
    constructor(){
        super()
        this.addCart = this.addCart.bind(this)
    }
    render(){
        const { data } = this.props
        return <dl className='goods-item' onClick={this.toDetail.bind(this,data.goods_id)}>
            <dt>
                <Lazyload overflow once height='100%' placeholder={<Placeholder></Placeholder>} debounce={500}>
                    <img src={'http://www.lb717.com/'+data.obj_data} alt=""/>
                </Lazyload>
            </dt>
            <dd>
                <p className='goods-detail'>{data.goods_name}</p>
                <p>
                    <span className='goods-price'>{data.discount_price}</span>
                    <span onClick={this.addCart} className='iconfont cart'></span>
                </p>
            </dd>
        </dl>
    }
    toDetail(id){
        const { history } = this.props
        history.push('/detail?goods_id='+id,{
            goods_id:id
        })
    }
    addCart(e){
        e.stopPropagation();
        let { data } = this.props
        if(getCookie('token')){
            $http.post('/user/Cart/addCart',{
                goods_id:data.goods_id,
                goods_info:data,
                token:getCookie('token')
            })
            .then((res)=>{
                console.log(res)
                if(res==1){
                    toast.success('购物车添加成功',{
                        position:toast.POSITION.TOP_CENTER
                    })
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1
                        }
                    })
                }else{
                    toast.warn(res.info,{
                        position:toast.POSITION.TOP_CENTER,
                        hideProgressBar:true,
                        autoClose:2000,
                        className:"test"
                    })
                }
            })
        }else{
            this.props.history.push('/login',{
                from:'/'
            })
        }
    }
}
export default connect()(GoodsItem)