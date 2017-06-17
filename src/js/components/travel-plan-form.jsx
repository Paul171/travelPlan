import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import { savePlan } from '../actions/save-plan';
const styleSheet = createStyleSheet('TravelPlanForm', theme => ({
  input: {
    margin: theme.spacing.unit,
    display: "block",
    position: "relative"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));
class TravelPlanForm extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			country: "",
			loc: "",
			note: "",
			date_time: ""
		};
	}
	handleChange = (event) => {
		let target = event.target;
		this.setState({
			[target.id]: target.value
		});
	}
	handleSubmit = () => {
		this.setState({
			date_time: new Date().toString()
		})
		this.props.onSubmit(this.state);
	}
	render(){
		const classes = this.props.classes;
		const style = {
			label: {
				position: "relative"
			}
		}
		console.log("classes form", this.props);
		return (<div className={classes.container}>
			<FormControl className={classes.input}>
				<InputLabel style={style.label} htmlFor="country" >Country</InputLabel>
				<input type="text" id="country" onChange={this.handleChange}/>
			</FormControl>
			<FormControl className={classes.input}>
				<InputLabel style={style.label} htmlFor="loc" >Location</InputLabel>
				<input type="text" id="loc" onChange={this.handleChange}/>
			</FormControl>
			<FormControl className={classes.input}>
				<InputLabel style={style.label} htmlFor="note" >Note</InputLabel>
				<input type="text" id="note" onChange={this.handleChange}/>
				<FormHelperText>Things in your mind </FormHelperText>
			</FormControl>
		   <Button onClick={this.handleSubmit}>Submit</Button>
		</div>);
	}
}
TravelPlanForm.PropTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styleSheet)(TravelPlanForm);