
import { legacy_createStore, combineReducers } from 'redux';
import { footballReducer } from './reducer.js';

const rootReducer = combineReducers({
  football: footballReducer,
});


export const store = legacy_createStore(rootReducer);
