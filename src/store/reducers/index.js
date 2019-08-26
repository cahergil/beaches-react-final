// @flow
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';

import beachesReducer from './beaches';
import type { Action as BeachesAction } from '../actions/beaches';
import type { State as BeachesState } from '../reducers/beaches';

import mapFiltersReducer from './mapFilters';
import type {  Action as MapFiltersAction} from '../actions/mapFilters';
import type { State as MapFiltersState} from '../reducers/mapFilters';

import mapAreaReducer from './mapArea';
import type { Action as MapAreaAction} from '../actions/mapArea';
import type { State as MapAreaState } from '../reducers/mapArea';

import searchFiltersReducer from './searchFilters';
import type { Action as SearchFiltersAction} from '../actions/searchFilters';
import type { State as SearchFiltersState } from '../reducers/searchFilters';

type Action =
  | BeachesAction
  | MapFiltersAction
  | MapAreaAction
  | SearchFiltersAction;

type State = {
  beaches: BeachesState,
  mapResultsFilters: MapFiltersState,
  mapArea: MapAreaState, 
  searchFilters: SearchFiltersState
};

const rootReducer: Reducer<State,Action> = combineReducers({
  beaches: beachesReducer,
  mapResultsFilters: mapFiltersReducer,
  mapArea: mapAreaReducer,
  searchFilters: searchFiltersReducer
});

export default rootReducer