import React,{Component} from 'react'
import {loginOut} from '../../utlis/utlis.js'
class Setting extends Component{
    loginout () {
        loginOut();
        this.props.history.push('/')
    }
    render(){
        return (
            <div className='setting'>
                <header>设置</header>
                <button onClick={this.loginout.bind(this)}>退出</button>
            </div>
        )
    }
}
export default Setting