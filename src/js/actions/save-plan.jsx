import {actionTypes} from '../action-types';
import { viewPlans } from '../actions/view-plans';
let httpRequest = null;
export const savePlanRequest = plan => ({
	type: actionTypes.SAVE_PLAN_REQUEST,
	plan
});

export const savePlan = plan => {
	console.log("savePlan", plan);
	return dispatch => {
		dispatch(savePlanRequest(plan));
		let savePlanPromise = null;
		let headers = new Headers({"Content-Type":"application/json"});
		if(plan._id){
			savePlanPromise = fetch("http://localhost:3000/plans/" + plan._id, {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(plan)
			});
		}else{
			console.log("plan", plan);
			savePlanPromise = fetch("http://localhost:3000/plans", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: '{"country":"Japan","loc":"Tokyo","note":"note"}'
			});
		}
		savePlanPromise.then(viewPlans()).catch(err=> console.log("error",err));
	};
}
