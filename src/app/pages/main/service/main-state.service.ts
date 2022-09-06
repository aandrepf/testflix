import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MoviesStateService } from '../../../core/state.service';
import { Facets, TestFlixMoviesInfo } from '../models/TestFlix';

interface MainState {
  openCloseFilter: boolean;
  movies: Facets;
  actors: Facets;
  directors: Facets;
  moviesList: TestFlixMoviesInfo[];
  moviesQty: number;
}

const initialState: MainState = {
  openCloseFilter: true,
  movies: null,
  actors: null,
  directors: null,
  moviesList: [],
  moviesQty: 0,
};

@Injectable({
  providedIn: 'root',
})
export class MainStateService extends MoviesStateService<MainState> {
  openCloseFilter$: Observable<boolean> = this.select(
    (state) => state.openCloseFilter
  );
  moviesFilter$: Observable<Facets> = this.select((state) => state.movies);
  actorsFilter$: Observable<Facets> = this.select((state) => state.actors);
  directorsFilter$: Observable<Facets> = this.select(
    (state) => state.directors
  );
  moviesList$: Observable<TestFlixMoviesInfo[]> = this.select(
    (state) => state.moviesList
  );
  moviesQty$: Observable<number> = this.select((state) => state.moviesQty);

  getOpenCloseStatus$: Observable<boolean> = this.select((state) => {
    return state.openCloseFilter;
  });
  getMoviesFilter$: Observable<Facets> = this.select((state) => {
    return state.movies;
  });
  getActorsFilter$: Observable<Facets> = this.select((state) => {
    return state.actors;
  });
  getDirectorsFilter$: Observable<Facets> = this.select((state) => {
    return state.directors;
  });

  constructor() {
    super(initialState);
  }

  filterOn() {
    this.setMainState({ openCloseFilter: true });
  }

  filterOff() {
    this.setMainState({ openCloseFilter: false });
  }

  createMoviesFilter(mf: Facets) {
    this.setMainState({ movies: mf });
  }

  createActorsFilter(af: Facets) {
    this.setMainState({ actors: af });
  }

  createDirectorsFilter(df: Facets) {
    this.setMainState({ directors: df });
  }

  setMovies(movies: TestFlixMoviesInfo[]) {
    this.setMainState({ moviesList: movies });
  }

  setMoviesQuantity(qty: number) {
    this.setMainState({ moviesQty: qty });
  }
}
