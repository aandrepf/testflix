import { TestFlixFilters } from './../models/TestFlixFilter';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Facets } from '../models/TestFlix';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MainStateService } from '../service/main-state.service';

@Component({
  selector: 'mono-nx-test-with-nextjs-movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.scss'],
})
export class MoviesFiltersComponent implements OnInit {
  @Output() movieFilterToUse: EventEmitter<
    TestFlixFilters
  > = new EventEmitter();

  public movieFilter$: Observable<Facets> = this.mainState.moviesFilter$;
  public actorsFilter$: Observable<Facets> = this.mainState.actorsFilter$;
  public directorsFilter$: Observable<Facets> = this.mainState.directorsFilter$;

  resetAllFilters = false;

  constructor(private mainState: MainStateService) {}

  ngOnInit() {}

  reset() {
    this.resetAllFilters = true;
  }

  resetFilters(isToReset: boolean) {
    this.resetAllFilters = isToReset;
  }

  receiveFilter(filter: TestFlixFilters) {
    this.movieFilterToUse.emit(filter);
  }
}
