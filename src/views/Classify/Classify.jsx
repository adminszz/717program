import React, { Component } from 'react'
import './classify.css'
import {BrowserRouter as Router,withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'
import $http from '../../utlis/http.js'

class Classify extends Component {
    constructor(props){
        super(props);
        this.state={
            list:['家乡味道','进口食品','牛奶乳品','休闲零食','生鲜果蔬','米面粮油','调味调料','酒水饮料']
        }
        this.category=this.category.bind(this)
    }
    
    render(){
        const {list}=this.state;
        return (
            <Router>
                <div className='App-Category'>
                    <ul className='category-left'>
                        {list.map((val,index)=>{
                            return <li key={index} onClick={this.category}>{val}</li>
                        })}
                    </ul>
                    <div className='category-right'></div>
                </div>
            </Router>
        )
    }
    
    componentDidMount() {
        PubSub.publish('changeHead',this.props.location.pathname);
    }

    category(){
        // $http.get('/moblie/Category/categorySon',{sonid:2})
        // .then(result=>{
        //     console.log(result,'result')
        // })
        // .catch(err=>{
        //     throw new Error(err)
        // })
        
        // jsonp测试
        $http.jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location=32,114&output=jsonp&key=TGCBZ-WXSCJ-ZDQFQ-KK4U3-RGTMV-5SFJD&callback=findWhere', 'findWhere')
        .then(result=>{
            console.log(result,'jsonp测试 山西吕梁')
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default withRouter(Classify);