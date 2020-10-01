import { SearchResult } from './../app/models/SearchResult';
import { Action } from '@ngrx/store';
import * as MoviesActions from '../actions/movies.actions';

export function moviesReducer(
  state: { searchData: SearchResult },
  action: MoviesActions.Actions
) {
  switch (action.type) {
    case MoviesActions.SET_DATA: {
      return { ...state, searchData: action.payload };
    }
    default:
      return state;
  }
}
