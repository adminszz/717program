import React, { Component } from 'react'
import './Register.scss'
import $http from '../../utlis/http'
class Register extends Component{
    constructor(){
        super()
        this.toRegister = this.toRegister.bind(this)
    }
    render () {
        return (
            <div className='Register'>
                <h1>欢迎注册</h1>
                <p><input type="text" className='userName' ref='userName' placeholder='请输入手机号或用户名'/></p>
                <p><input type="password" className='password' ref='password' placeholder='请输入密码'/></p>
                <p><button onClick={this.toRegister}>注册</button></p>
            </div>
        )
    }
    toRegister(){
        let { userName,password } = this.refs
        $http.post('/user/register',{
            userName:userName.value,
            password:password.value
        })
        .then((res)=>{
            console.log(res)
        })
    }
}
export default Register