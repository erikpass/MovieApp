import { SearchResult } from './models/SearchResult';
import { ParamsObject } from './models/ParamsObject';
export interface AppState {
  readonly url: {
    readonly url: string;
    readonly urlParams: ParamsObject;
  };
  readonly movies: {
    readonly searchData: SearchResult;
  };
}
