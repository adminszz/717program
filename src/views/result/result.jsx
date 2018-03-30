import React,{Component} from 'react'
class Result extends Component{
    componentDidMount () {
        let {location} = this.props;
        console.log(location);
    }
    render(){
        return <h1>moren</h1>
    }
}
export default Result