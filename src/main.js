import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import router from './router/router.config'
import RouteWrap from './components/routeWrap'
import { BrowserRouter,Route,Switch} from 'react-router-dom'
import './static/css/reset.css'
import './static/css/goodsItem.scss'
import './static/css/common.css'
import './static/font/iconfont.css'
console.log(router.routes)
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <RouteWrap routes={router.routes}></RouteWrap>
        </Switch>
    </BrowserRouter>,
    document.querySelector('#root')
)