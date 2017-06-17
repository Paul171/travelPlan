import React from 'react';
import ReactDOM from 'react-dom';
import { appStore } from './app-store';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { viewPlans } from './actions/view-plans';
import { savePlan } from './actions/save-plan';
import { getMenu } from './actions/get-menu';
import { TravelPlanContainer } from './components/travel-plan-container';
import Header  from './components/travel-plan-header';
import TravelPlanForm from './components/travel-plan-form';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import 'typeface-roboto';


const mapStateToProps = ({plans, editRowId, menu}) => ({plans, editRowId, menu});
const dispatchToProps = dispatch => bindActionCreators({
	viewPlans,
	getMenu,
	savePlan
},dispatch);
const theme = createMuiTheme({
  palette: createPalette({
    type: 'light', // Switching the dark mode on is a single property value change.
  }),
});
class TravelPlan extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			editRowId:0,
			plans:[],
			menu:{}
		}
	}
	componentDidMount(){
		this.appStoreUnsubscribe = appStore.subscribe(()=>{
			this.setState({
				plans: appStore.getState().plans,
				menu: appStore.getState().menu
			});
			console.log("this.state",this.state);
		});
		this.props.viewPlans();
		this.props.getMenu();
		appStore.dispatch(getMenu())
		appStore.dispatch(viewPlans());

	}
	componentWillUnmount() {
        this.appStoreUnsubscribe();
    }
    onSave = plan => {
    	appStore.dispatch(savePlan(plan));
    };
	render(){
		console.log("this.props", this.props);
		return <div>
		 <Header menu={this.props.menu}/>
		 <TravelPlanContainer {...this.props} />
		 <TravelPlanForm onSubmit={this.props.savePlan}/>
		</div>;
	}
}
const TravelPlanApp = connect(mapStateToProps, dispatchToProps)(TravelPlan);
ReactDOM.render(
	<MuiThemeProvider theme={theme}>
	<Provider store={appStore}>
<TravelPlanApp/></Provider></MuiThemeProvider>,document.querySelector('root')
);