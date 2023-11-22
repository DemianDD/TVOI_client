import { createStore, combineReducers, applyMiddleware } from 'redux';
import searchReducer from './reducers/SearchReducer';

const rootReducer = combineReducers({
  searchTerm: searchReducer,
});

const store = createStore(rootReducer, applyMiddleware());

export default store;