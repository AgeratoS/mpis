import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

let rootReducers = combineReducers({
  form: formReducer
});

export const store = createStore(rootReducers);
