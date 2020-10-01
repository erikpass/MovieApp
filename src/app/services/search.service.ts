import { SearchResult } from './../models/SearchResult';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private APIKEY: string = '?apikey=f79aeba3';
  private BASE_URL: string = 'http://www.omdbapi.com/';

  getMovies(
    _title: string | null,
    _year: string | null,
    _type: string | null,
    _page: string | null
  ) {
    let searchParams: string = '';

    if (_title != null) {
      searchParams += `&s=${_title}`;
    }
    if (_year != null) {
      searchParams += `&y=${_year}`;
    }
    if (_type != null) {
      searchParams += `&type=${_type}`;
    }
    if (_page != null) {
      searchParams += `&page=${_page}`;
    }

    //debug
    //console.log(this.BASE_URL + this.APIKEY + searchParams);
    let result = this.http.get<SearchResult>(
      this.BASE_URL + this.APIKEY + searchParams
    );
    return result;
  }
}
