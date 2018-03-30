import React, { Component } from 'react'
import './Login.scss'
import $http from '../../utlis/http'
class Login extends Component{
    constructor(){
        super()
        this.toLogin = this.toLogin.bind(this)
    }
    render () {
        return (
            <div className='login'>
                <h1>请登录</h1>
                <p><input type="text" className='userName' ref='userName' placeholder='请输入手机号或用户名'/></p>
                <p><input type="password" className='password' ref='password' placeholder='请输入密码'/></p>
                <p><button onClick={this.toLogin}>登录</button></p>
            </div>
            
        )
    }
    toLogin(){
        let { userName,password } = this.refs
        $http.post('/user/login',{
            userName:userName.value,
            password:password.value
        })
        .then((res)=>{
            if(res.success==1){
                document.cookie = 'token'+res.token;
                this.props.history.push('/')
            }else{
                alert('登录出错')
            } 
        })
    }
}
export default Login