import { ParamsObject } from './../app/models/ParamsObject';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const SET_URL = '[URL] Set';
export const SET_URL_PARAMS = '[URL] SetParams';

export class SetUrl implements Action {
  readonly type = SET_URL;

  constructor(public payload: String) {}
}

export class SetUrlParams implements Action {
  readonly type = SET_URL_PARAMS;

  constructor(public payload: ParamsObject) {}
}

export type Actions = SetUrl | SetUrlParams;
