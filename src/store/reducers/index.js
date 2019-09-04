// @flow
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';

import beachesReducer from './beaches';
import type { Action as BeachesAction } from '../actions/beaches';
import type { State as BeachesState } from '../reducers/beaches';

import mapFiltersReducer from './mapFilters';
import type {  Action as MapFiltersAction} from '../actions/mapFilters';
import type { State as MapFiltersState} from '../reducers/mapFilters';

import searchFiltersReducer from './searchFilters';
import type { Action as SearchFiltersAction} from '../actions/searchFilters';
import type { State as SearchFiltersState } from '../reducers/searchFilters';

export type Action =
  | BeachesAction
  | MapFiltersAction
  | SearchFiltersAction;

export type State = {
  beaches: BeachesState,
  mapResultsFilters: MapFiltersState,
  searchFilters: SearchFiltersState
};

const rootReducer: Reducer<State,Action> = combineReducers({
  beaches: beachesReducer,
  mapResultsFilters: mapFiltersReducer,
  searchFilters: searchFiltersReducer
});

export default rootReducer