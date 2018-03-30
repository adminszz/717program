import Home from '../views/Home'
import Classify from '../views/Classify'
import Cart from '../views/Cart'
import Mine from '../views/Mine'
import Detail from '../views/Detail'
import Login from '../views/Login'
import Search from '../views/Search'
import Register from '../views/Register'
import FootCell from '../views/FootCell'
let router = {
    routes:[
        {
            path:'/detail',
            component:Detail
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/search',
            component:Search
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/',
            component:FootCell,
            children:[
                {
                    path:'/',
                    title:'首页',
                    exact:true,
                    icon:'home',
                    activeClassName:'tab-active',
                    component:Home
                },
                {
                    path:'/classify',
                    title:'分类',
                    exact:true,                    
                    icon:'classify',
                    activeClassName:'tab-active',                    
                    component:Classify
                },
                {
                    path:'/cart',
                    title:'购物车',
                    exact:true,                    
                    icon:'cart',
                    activeClassName:'tab-active',                    
                    component:Cart
                },
                {
                    path:'/mine',
                    title:'我的',
                    exact:true,                    
                    icon:'mine',
                    activeClassName:'tab-active',                    
                    component:Mine
                }
            ]
        }
    ]
}
export default router