import { SearchResult } from './../app/models/SearchResult';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const SET_DATA = '[Movies] SetData';

export class SetData implements Action {
  readonly type = SET_DATA;
  constructor(public payload: SearchResult) {}
}

export type Actions = SetData;
