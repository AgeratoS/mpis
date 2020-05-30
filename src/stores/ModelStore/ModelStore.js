import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

let rootReducers = combineReducers({
  form: formReducer,
});

const store = createStore(rootReducers);


export {store}
