import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResult } from './../../models/MovieResult';
import { Component, OnInit } from '@angular/core';
import { mapParamsStringToObject } from '../../../functions/mapParamsStringToObject';
import { AppState } from 'src/app/app-state';
import * as UrlActions from '../../../actions/url.actions';
import * as MoviesActions from '../../../actions/movies.actions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  moviesList: MovieResult[];
  moviesAmount: number;
  params: string;
  values: object;
  notFoundPoster: string = '../../../assets/image27.png';
  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private store: Store<AppState>
  ) {
    store
      .select((state) => state.url)
      .subscribe((data) => {
        //console.log(data);
        if (data) {
          //console.log(data.url);
          this.paramsUpdateFromStore(data.url);
        }
      });
  }

  getMovies(input) {
    this.loading = true;
    this.error = false;
    this.searchService.getMovies(input.s, input.y, input.t, input.p).subscribe(
      (data) => {
        this.loading = false;
        this.error = false;
        this.store.dispatch(new MoviesActions.SetData(data));

        this.moviesList = data.Search;
        this.moviesAmount = parseInt(data.totalResults);

        //debug
        //console.log(data);
      },
      (err) => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  paramsUpdate(): void {
    if (this.params !== this.route.snapshot.params['searchParams']) {
      this.params = this.route.snapshot.params['searchParams'];
      //console.log(this.params);
      this.values = mapParamsStringToObject(this.params);
      this.getMovies(this.values);
    }
  }

  paramsUpdateFromStore(input: string) {
    this.values = mapParamsStringToObject(input);
    this.getMovies(this.values);
  }

  setUrl() {
    let url = (this.params = this.route.snapshot.params['searchParams']);
    this.store.dispatch(new UrlActions.SetUrl(url));
  }

  ngOnInit(): void {
    this.setUrl();
    //this.paramsUpdate();
  }
}
