import PropTypes from 'prop-types';
import React from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { MenuItem } from 'material-ui/Menu';
const styleSheet = theme=> ({
	  root: {
	    position: 'relative',
	    marginTop: 30,
	    width: '100%',
	  },
	  appBar: {
	    position: 'relative',
	  },
	  flex: {
	    flex: 1,
	  },
	});
class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}
	toggleDrawer = () => {
	    this.setState({ open: !this.state.open });
	  };
	render(){
		console.log("menu", this.props);
		const menu = this.props.menu;
		const menuList = (
			<div>
				{menu.map((item,index) => (
					<MenuItem key={index}>{item}</MenuItem>
					))}
			</div>
			);
		return (
			<div>
			<AppBar className={this.props.classes.appBar}>
		        <Toolbar>
		          <IconButton color="contrast" aria-label="Menu" onClick={this.toggleDrawer}>
		            <MenuIcon />
		          </IconButton>
		          <Typography type="title" colorInherit className={this.props.classes.flex}>{this.props.title}</Typography>
		        </Toolbar>
		      </AppBar>
		      <Drawer open={this.state.open}
		      	onClick={this.toggleDrawer}>
		      	{menuList}
		      </Drawer>
						</div>);
	}
}
export default withStyles(styleSheet)(Header);
Header.propTypes = {
	menu: PropTypes.array,
	title: PropTypes.string,
	classes: PropTypes.object.isRequired
}
Header.defaultProps = {
	menu: [],
	title: "Travel Plan"
};