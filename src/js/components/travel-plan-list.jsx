import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { red } from 'material-ui/colors';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import classnames from 'classnames';
const styleSheet = theme => ({
  card: { maxWidth: 400 },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: { backgroundColor: red[500] },
  flexGrow: { flex: '1 1 auto' },
});
const avatarStyle = { backgroundColor: red[500] };

class TravelPlanList extends React.Component{
	constructor(props){
		super(props);
		console.log("this.props", this.props);
		this.state = {
			expanded: false
		}
	}
	handleExpandClick = () => {
		this.setState({
			expanded: !this.state.expanded
		});
	}
	render(){
		const classes = this.props.classes;
		return (
				<Card>
					<CardHeader avatar={<Avatar aria-label={this.props.plan.country} className={classes.avatar}>{this.props.plan.country.substring(0,1)}</Avatar>} title={this.props.plan.country} subheader={this.props.plan.loc} />
					<CardContent>
						<Typography component="p">
							{this.props.plan.country}
						</Typography>
						<Typography component="p">
							{this.props.plan.loc}
						</Typography>
						<Typography>
							Time: {this.props.plan.date_time}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton
			              className={classnames(classes.expand, {
			                [classes.expandOpen]: this.state.expanded,
			              })}
			              onClick={this.handleExpandClick}
			              aria-expanded={this.state.expanded}
			              aria-label="Show more"
			            >
			              <ExpandMoreIcon />
			            </IconButton>
					</CardActions>
					<Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph type="body2">Note:</Typography>
							<Typography paragraph>
								{this.props.plan.note}
	                		</Typography>
						</CardContent>
					</Collapse>
				</Card>
				);
	}
}
TravelPlanList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styleSheet)(TravelPlanList);