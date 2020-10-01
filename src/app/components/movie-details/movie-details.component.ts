import { Movie } from './../../models/Movie';
import { DetailsService } from './../../services/details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  imdbId: string;
  movie: Movie;
  url: string;

  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private router: Router,
    private store: Store<AppState>
  ) {
    store
      .select((state) => state.url)
      .subscribe((data) => {
        if (data) {
          this.error = false;
          this.loading = false;

          this.url = data.url;
        }
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.imdbId = this.route.snapshot.params['imdbID'];

    this.detailsService.getMovieById(this.imdbId).subscribe(
      (result: Movie) => {
        this.movie = result;
        this.error = false;
        this.loading = false;

        //console.log(result);
      },
      (err) => {
        this.error = true;
        this.loading = false;
      }
    );
  }
}
