import React,{Component} from 'react'
class Mine extends Component{
    toSetting () {
        this.props.history.push('/setting')
    }
    render(){
        return (
            <div className='mine'>
                <header>
                    <p><span onClick={this.toSetting.bind(this)}>设置</span> <span>我的717商城</span></p>
                    <dl>
                        <dt>
                            <img src="http://scimg.jb51.net/touxiang/201704/2017041117223569.png" alt=""/>
                        </dt>
                        <dd>JavaScript</dd>
                    </dl>
                </header>
            </div>
        )
    }
}
export default Mine
