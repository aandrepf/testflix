import { MainStateService } from './main-state.service';
import { Facets } from '../models/TestFlix';
import { PagesRepository } from '../../pages.repository';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private _facets: Facets[];
  get facets(): Facets[] {
    return this._facets;
  }

  private _configsLoader = {
    text: 'please wait...',
    fgsColor: 'red',
    bgsOpacity: 1,
    blur: 15,
    bgsType: 'circle',
  };

  get configs(): any {
    return this._configsLoader;
  }

  constructor(
    private pagesRepository: PagesRepository,
    private mainStateService: MainStateService,
    private loader: LoaderService
  ) {}

  getFacets() {
    return this.pagesRepository.fetchFacets().subscribe((facet) => {
      this.mainStateService.createMoviesFilter({
        label: facet.movies.label.toUpperCase(),
        list: Object.values(facet.movies.filters),
      });

      this.mainStateService.createActorsFilter({
        label: facet.actors.label.toUpperCase(),
        list: Object.values(facet.actors.filters.movies.values),
      });

      this.mainStateService.createDirectorsFilter({
        label: facet.directors.label.toUpperCase(),
        list: Object.values(facet.directors.filters[0].values),
      });
    });
  }

  listMovies(filter: any = null) {
    this.loader.start(this.configs);
    return this.pagesRepository.getMovies(filter).subscribe((movies) => {
      this.loader.stop();

      setTimeout(() => {
        this.mainStateService.setMovies(movies);
        this.mainStateService.setMoviesQuantity(movies.length);
      }, 1000);
    });
  }

  updateMovies(id, status) {
    return this.pagesRepository.updateMovies(id, status).subscribe((ret) => {
      console.log(ret);
    });
  }
}
