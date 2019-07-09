import { combineReducers } from 'redux';
import beachesReducer from './beaches'
import mapFiltersReducer from './mapFilters';
import mapAreaReducer from './mapArea';
import searchFiltersReducer from './searchFilters';

const rootReducer = combineReducers({
  beaches: beachesReducer,
  mapResultsFilters: mapFiltersReducer,
  mapArea: mapAreaReducer,
  searchFilters: searchFiltersReducer
});

export default rootReducer