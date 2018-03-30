import React, { Component } from 'react'
import {Route,NavLink} from 'react-router-dom'
import $http from '../../utlis/http'
import RouteWrap from '../../components/routeWrap'
import './FootCell.css'

class FootCell extends Component{
    render () {
        const { routes } = this.props
        return (
            <div className='wrap'>
                <div className='content'>
                    <RouteWrap routes={routes} ></RouteWrap>
                </div>
                <div className='footer'>
                    {
                        routes.map((item,index) => {
                            return (
                                <NavLink exact to={item.path} key={index} activeClassName={item.activeClassName}>
                                    <i className={ `icon iconfont ${item.icon}`}></i>
                                    <span>{item.title}</span>
                                </NavLink> 
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    // componentDidMount(){
    //     $http.get('/server/test.json',{id:1,name:'lucy'})
    //     .then(data => {console.log(data)})
    //     .catch(err => {console.log(err)})  
    // }
}
export default FootCell