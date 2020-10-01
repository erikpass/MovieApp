import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Component, OnInit } from '@angular/core';
import { mapParamsStringToObject } from '../../../functions/mapParamsStringToObject';
import { AppState } from 'src/app/app-state';
import { Store } from '@ngrx/store';
import * as UrlActions from '../../../actions/url.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  setUrl(url: string) {
    this.store.dispatch(new UrlActions.SetUrl(url));
  }

  isEmpty = true;

  searchIcon = '../../../assets/Vector.svg';

  formValues = {
    title: '',
    year: '',
    type: '',
  };

  changeRoute(event): void {
    if (event.key === 'Enter') {
      let path = this.formRoute();
      if (path !== '') {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
      this.router.navigateByUrl(path);
      this.setUrl(path);
    }
  }

  changeRouteButton(): void {
    let path = this.formRoute();
    if (path !== '') {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.router.navigateByUrl(path);
    this.setUrl(path);
  }

  formRoute(): string {
    let link, s, y, t;
    if (!this.formValues.title) {
      return '';
    }
    s = 's:' + this.formValues.title;
    y = this.formValues.year ? '&y:' + this.formValues.year : '';
    t = this.formValues.type ? '&t:' + this.formValues.type : '';
    t = '&t:all' ? '' : this.formValues.type;
    link = s + y + t;

    return link;
  }

  ngOnInit(): void {
    //if the search params field is not empty, set the search fields to match the search params
    if (this.route.children[0] !== undefined) {
      this.isEmpty = false;
      if (this.route.children[0].snapshot.params['searchParams']) {
        let params = this.route.children[0].snapshot.params['searchParams'];

        let values = mapParamsStringToObject(params);
        //console.log(values);

        this.formValues.title = values.s || '';
        this.formValues.year = values.y || '';
        this.formValues.type = values.t || 'all';

        //console.log(this.formValues);
      }
    }
  }
}
