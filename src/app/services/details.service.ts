import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient) {}

  getMovieById(_imdbID) {
    let result = this.http.get(
      `http://www.omdbapi.com/?apikey=f79aeba3&i=${_imdbID}`
    );
    return result;
  }
}
