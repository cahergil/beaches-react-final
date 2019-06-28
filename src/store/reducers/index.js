import { combineReducers } from 'redux';
import beachesReducer from './beaches'
import mapFiltersReducer from './mapFilters';
import mapAreaReducer from './mapArea';

const rootReducer = combineReducers({
  beaches: beachesReducer,
  mapResultsFilters: mapFiltersReducer,
  mapArea: mapAreaReducer
});

export default rootReducer