import {actionTypes} from '../action-types';

export const getMenuRequest = () => ({
	type: actionTypes.GET_MENU_REQUEST
});

export const getMenuDone = menu => ({
	type: actionTypes.GET_MENU_DONE,
	menu
});

export const getMenu = () => {
	return dispatch => {
		dispatch(getMenuRequest());

		return fetch('http://localhost:3000/menu').then(res=>res.json()).then(menu => {
			dispatch(getMenuDone(menu));
		});		
	};
	
};