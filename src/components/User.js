import React from 'react';
//ES6
export default class User extends React.Component{
    constructor(props){
        super(props);
        console.log("constructor:"+props.name);
        this.state = {name: props.name};
    }
    render(){
        console.log(">> render22");
        return (
            <div>
            <h4>Name:{this.state.name}</h4>
            <button onClick={this.updateName} >update Name</button>
            </div>
          );
    }
    updateName = ()=>{
        //this.name = "India";
        this.setState({});
    }
}
