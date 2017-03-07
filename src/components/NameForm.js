import React from 'react';
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',upValue:'',textAreaVal:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.setState({upValue: event.target.value.toUpperCase()});
    this.setState({textAreaVal: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    alert('A name was submitted: ' + this.input.value);//for uncontrolled components
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          UpperCase:<input type="text" value={this.state.upValue} onChange={this.handleChange} />
          TextArea: <textarea value={this.state.textAreaVal} onChange={this.handleChange} />
          <div>
          Uncontrolled Component
          <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default NameForm;