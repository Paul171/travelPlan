import React from 'react';
import TravelPlanList from '../components/travel-plan-list';

export class TravelPlanContainer extends React.Component{
	render(){
		console.log("TravelPlanContainer props",this.props);
		return (<div>{this.props.plans.map(plan => <TravelPlanList key={plan.date_time} plan={plan}/>)}</div>);	
	}
}