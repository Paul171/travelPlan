import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './reducer';

export const appStore = createStore(reducer, applyMiddleware(thunk));