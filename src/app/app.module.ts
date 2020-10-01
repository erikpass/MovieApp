import { DetailsService } from './services/details.service';
import { SearchService } from './services/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PageSelectorComponent } from './components/page-selector/page-selector.component';
import { StoreModule } from '@ngrx/store';
import { urlReducer } from '../reducers/url.reducer';
import { moviesReducer } from '../reducers/movies.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SearchComponent,
    MovieDetailsComponent,
    PageSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        url: urlReducer,
        movies: moviesReducer,
      },
      {}
    ),
    NgbModule,
  ],
  providers: [SearchService, DetailsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
