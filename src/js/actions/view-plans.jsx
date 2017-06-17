import {actionTypes} from '../action-types';

export const viewPlansRequest = () => ({
	type: actionTypes.VIEW_PLANS_REQUEST
});

export const viewPlansDone = plans => ({
	type: actionTypes.VIEW_PLANS_DONE,
	plans
});

export const viewPlans = () => {
	return dispatch => {
		dispatch(viewPlansRequest());

		return fetch('http://localhost:3000/plans').then(res=>res.json()).then(plans => {
			dispatch(viewPlansDone(plans));
		});		
	};
	
};