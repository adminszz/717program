import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'
class routeWrap extends Component{
    render(){
        const { routes } = this.props
        return routes.map((item,index) => {
                    return <Route key={index} path={item.path} render={(location) => {
                            <item.component {...location} routes={item.children}></item.component>
                        }}> </Route>
                })
        
    }
}
export default routeWrap