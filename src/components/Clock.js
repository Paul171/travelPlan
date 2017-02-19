import React from 'react';
class LoggingButton extends React.Component {
 /* binding in the constructor
  constructor(props){
  	super(props);
  	// This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() { 
  	console.warn('this is:sdf', this); 
  }*/
  /*experimental 
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.*/
  handleClick = () => {
    console.log('this is:', this);
  }
  

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}
	componentDidMount(){
		const self = this;
		this.timerID = setInterval( () => this.tick(), this.props.interval);
	}
	componentWillUnmount(){
		clearInterval(this.timerID);
	}
	tick(){
		this.setState({date:new Date()});
	}
	render() {
		return (
		      <div>
		      	<LoggingButton />
		        <h1>Hello, world!</h1>
		        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
		      </div>
		    );
	}
};
export default Clock;