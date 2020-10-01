import { Router } from '@angular/router';
import { ParamsObject } from './../../models/ParamsObject';
import { AppState } from './../../app-state';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mapParamsStringToObject } from 'src/functions/mapParamsStringToObject';
import * as UrlActions from '../../../actions/url.actions';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss'],
})
export class PageSelectorComponent implements OnInit {
  moviesAmount: number;
  currentPage: number;
  lastPage: number;
  url: string;
  urlParams: ParamsObject;

  selections: number[];

  constructor(private store: Store<AppState>, private router: Router) {
    //get current url for current page
    store
      .select((state) => state.url)
      .subscribe((url) => {
        if (url) {
          this.url = url.url;
          this.updatePageData(this.url);
          //console.log(this.url);
        }
      });
    //get movie query data for total results
    store
      .select((state) => state.movies)
      .subscribe((movies) => {
        //console.log(movies);
        if (movies) {
          //console.log(movies.searchData);
          this.moviesAmount = parseInt(movies.searchData.totalResults);

          if (this.url) {
            this.updatePageData(this.url);
          }
        }
      });
  }

  updatePageData(input: string) {
    if (this.moviesAmount && this.url) {
      this.urlParams = mapParamsStringToObject(input);
      this.currentPage = parseInt(this.urlParams.p) || 1;

      this.lastPage = Math.ceil(this.moviesAmount / 10);

      //console.log('total results: ' + this.moviesAmount);
      //console.log('current page: ' + this.currentPage);
      //console.log('total amount of pages: ' + this.lastPage);
      //console.log(this.urlParams);

      this.assignPages(this.currentPage, this.lastPage);
    }
  }

  constructUrlFromParams(_params: ParamsObject): string {
    if (!_params.s) {
      return '';
    }

    let result: string;
    result = `s:${_params.s}`;

    if (_params.y) {
      result += `&y:${_params.y}`;
    }

    if (_params.t) {
      result += `&t:${_params.t}`;
    }

    if (_params.p) {
      result += `&p:${_params.p}`;
    }

    return result;
  }

  goToPage(_inputNumber: number, _currentParams: ParamsObject) {
    let obj = _currentParams;

    obj.p = _inputNumber.toString();
    let targetUrl = this.constructUrlFromParams(obj);

    this.router.navigateByUrl(`/${targetUrl}`);
    this.store.dispatch(new UrlActions.SetUrl(targetUrl));
  }

  assignPages(_currentPage: number, _totalPages: number) {
    this.selections = [];

    //less than 5 pages
    if (_totalPages < 5) {
      for (let i = 0; i < _totalPages; i++) {
        this.selections[i] = this.currentPage + i - (_currentPage - 1);
      }
    }
    //5 pages or more
    if (_totalPages >= 5) {
      //default case
      this.selections[0] = this.currentPage - 2;
      this.selections[1] = this.currentPage - 1;
      this.selections[2] = this.currentPage;
      this.selections[3] = this.currentPage + 1;
      this.selections[4] = this.currentPage + 2;

      //near the start of list
      if (_currentPage < 3) {
        this.selections = alignSelections(_currentPage - 1, _currentPage);
      }
      //near the end of list
      if (_currentPage > _totalPages - 2) {
        this.selections = alignSelections(
          4 - (_totalPages - _currentPage),
          _currentPage
        );
      }

      function alignSelections(_index: number, _currentPage: number): number[] {
        let _selections: number[] = [0, 0, 0, 0, 0];
        _selections[_index] = _currentPage;

        switch (_index) {
          case 0: {
            _selections = [
              _currentPage,
              _currentPage + 1,
              _currentPage + 2,
              _currentPage + 3,
              _currentPage + 4,
            ];
            break;
          }
          case 1: {
            _selections = [
              _currentPage - 1,
              _currentPage,
              _currentPage + 1,
              _currentPage + 2,
              _currentPage + 3,
            ];
            break;
          }
          case 3: {
            _selections = [
              _currentPage - 3,
              _currentPage - 2,
              _currentPage - 1,
              _currentPage,
              _currentPage + 1,
            ];
            break;
          }
          case 4: {
            _selections = [
              _currentPage - 4,
              _currentPage - 3,
              _currentPage - 2,
              _currentPage - 1,
              _currentPage,
            ];
            break;
          }
          default:
            break;
        }

        return _selections;
      }
    }
  }

  getForwardNumber(_currentPage: number, _lastPage: number): number {
    let difference = _lastPage - _currentPage;

    if (_currentPage !== _lastPage) {
      if (difference >= 5) {
        return _currentPage + 5;
      }

      if (difference < 5) {
        return _currentPage + difference;
      }
    }
    return 0;
  }

  getBackNumber(_currentPage: number): number {
    let difference = _currentPage - 1;

    if (_currentPage !== 1) {
      if (difference >= 5) {
        return _currentPage - 5;
      }

      if (difference < 5) {
        return _currentPage - difference;
      }
    }
    return 0;
  }

  ngOnInit(): void {}
}
