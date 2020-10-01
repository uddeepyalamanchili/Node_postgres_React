import React from 'react';
  export default class Timer extends React.Component{
      constructor(props){
          super(props);
          console.log(">>constructor");
      }
  state = { seconds: 0 , newCountVal:2};
  count = 0;
  interval;
  tick() {
      //seState({});
      // seState( (currentState)=>{return state} )
      // seState( (currentState)=>( state) )
    this.setState((prevState) => ({
      seconds: prevState.seconds + 1
    }));
  }

  componentWillMount(){
      console.log(">>componentWillMount")
  }
  componentDidMount() { //when component added to Parent
    //called after component added to parent
    console.log(">>componentDidMount")
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillReceiveProps(){

  }
  componentWillUpdate(){

  }
  componentWillUnmount() { //when component going be removed from Parent
    clearInterval(this.interval);
  }
  stopCounter(){
    this.count = 1;
    /*this.setState({
      seconds: 100
    }); */
    //this.forceUpdate();
    clearInterval(this.interval);
    console.log("interval is "+this.interval +" state:"+this.count);
  }
  updateCounter(){

  }
  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
        <div>
            <input type="text" value={this.state.newCountVal}></input> 
            <button onClick={this.updateCounter}>update Counter Value</button><br/><br/>

            <input type="button" onClick={() => this.stopCounter()} value="Stop this Counter" /></div>
      </div>
    );
  }
}