import keyMirror from 'key-mirror';
/*
Key Mirror is a helpful utility 
for declaring properties whose values are the property names themselves
*/
// ensure that consistent action-type names are used
// two actions for asyn call 
// REQUEST action: to transmit the call
// DONE action to receive the result when the call completes
export const actionTypes = keyMirror({
	GET_MENU_REQUEST: null, //retrieve menu
	GET_MENU_DONE: null,
    VIEW_PLANS_REQUEST: null,
    VIEW_PLANS_DONE: null,
    EDIT_PLAN: null,//replace a view row with an edit row
    CANCEL_PLAN: null,//replace an edit row with a view row
    SAVE_PLAN_REQUEST: null, //save the edited plan and change the edit row to a view row
    DELETE_PLAN_REQUEST: null,//trigger the plan to be deleted

});