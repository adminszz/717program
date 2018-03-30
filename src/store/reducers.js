import {combineReducers} from 'redux'
export const ADD_CART = 'ADD_CART';//添加购物车
export const DELETE_CART = 'DELETE_CART';//删除购物车
export const UPDATE_GOODS_COUNT = 'UPDATE_GOODS_COUNT';//改变商品数量
let initState = {
    cart_list:[]
}

function cart_list (state=initState.cart_list,action) {
    switch(action.type){
        case ADD_CART : 
        let flag = false;//购物车中没有
        state.forEach((item,index)=>{
            if(item.goods_id==action.data.goods_id){
                ++item.count;
                flag = true
            }
        })
        return flag ? [...state] : [...state,action.data];
        break;
        case UPDATE_GOODS_COUNT :
        let arr = [];
        arr = [...state].map(item=>{
            if(item.goods_id==action.id){
                 item.count=action.data
            }
            return item
        })
        break;
        default :return state;
    }
    return state
}

export default combineReducers({
    cart_list
})