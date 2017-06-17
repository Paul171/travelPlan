import {actionTypes} from './action-types';

export const reducer = (state = { plans: [],menu: []}, action) => {
	switch(action.type){
		case actionTypes.VIEW_PLANS_DONE:
			return Object.assign({}, state, { plans: action.plans });
		case actionTypes.VIEW_PLANS_REQUEST:
			return Object.assign({}, state, { plans: [] });
		case actionTypes.GET_MENU_DONE:
			return Object.assign({}, state, { menu: action.menu});
		case actionTypes.GET_MENU_REQUEST:
			return Object.assign({}, state, { menu: [] });
		case actionTypes.SAVE_PLAN_REQUEST:
			return Object.assign({}, state, { plans: action.plans});
		default:
			return state;
	}
};