import { SearchResult } from './../app/models/SearchResult';
import { ParamsObject } from './../app/models/ParamsObject';
import { Action } from '@ngrx/store';
import * as UrlActions from '../actions/url.actions';

export function urlReducer(
  state: { url: string; urlParams: ParamsObject },
  action: UrlActions.Actions
) {
  switch (action.type) {
    case UrlActions.SET_URL: {
      return { ...state, url: action.payload };
    }
    case UrlActions.SET_URL_PARAMS: {
      return { ...state, urlParams: action.payload };
    }
    default:
      return state;
  }
}
