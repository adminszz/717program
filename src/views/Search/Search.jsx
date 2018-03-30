import React,{Component} from 'react'
import './search.css'
class Search extends Component{
   constructor(){
        super()
        this.state = {
            historylist:[]
        }
        this.clearHistory = this.clearHistory.bind(this)
    }
    render(){
        let {historylist} = this.state
        return <div id='search'>
            <header><input type="text" ref="keyWords"/><span onClick={this.toSearch.bind(this)}>搜索</span></header>
            <section className='recent-search'>
                <p>最近搜索
                    <button className='serBtn' onClick={this.clearHistory}>清空</button>
                </p>
                 {
                    historylist.length==0?<p>暂无搜索记录...</p>:
                    <ul className="ks-clear">
                        {this.state.historylist.map((item,index)=>{
                            return <li key={index} onClick={()=>{this.toResult(item)}}>{item}</li>
                        })}
                    </ul>
                } 
            </section>
            <section className="common-search">
                <p>大家都在搜</p>
                <ol className="ks-clear">
                    <li>面包</li>
                </ol>
            </section>
        </div>
    }
    //清空搜索记录
    clearHistory(){
        localStorage.removeItem('SearchHistory')
        this.setState({
            historylist:[]
        })
    }
   //搜索跳转页面
    toSearch () {
        if(!this.refs.keyWords.value) return;
        let keyWords = this.refs.keyWords.value
        let ls = localStorage;
        if(ls.getItem('SearchHistory')){
            let shArr = JSON.parse(ls.getItem('SearchHistory'))
            if(shArr.indexOf(keyWords)>-1) return;
            shArr.push(keyWords)
            ls.setItem('SearchHistory',JSON.stringify(shArr))
        }else{
            ls.setItem('SearchHistory',JSON.stringify([keyWords]))
        }

        this.props.history.push("/result",{
            key_words:keyWords
        })
        
    }
    //搜索过得记录点击跳转
    toResult(keyWords){
        this.props.history.push("/index/result",{
            key_words:keyWords
        })
    }
    //获取localstorage里边的搜素记录
    componentDidMount(){
        if(localStorage.getItem("SearchHistory")){
            this.setState({
                historylist:JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
  
}
export default Search