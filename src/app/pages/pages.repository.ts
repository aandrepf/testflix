import { TestFlixFilters } from './main/models/TestFlixFilter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { BaseService } from '../services/base.service';
import { TestFlix, TestFlixMoviesInfo } from './main/models/TestFlix';
import { Observable } from 'rxjs';

@Injectable()
export class PagesRepository extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  fetchFacets(): Observable<TestFlix> {
    return this.http
      .get<TestFlix>(`${this.baseUrl}/facets`)
      .pipe(catchError(super.serviceError));
  }

  getMovies(filter: TestFlixFilters): Observable<TestFlixMoviesInfo[]> {
    const query = filter ? `?${this.serializeObject(filter)}` : '';
    return this.http
      .get<TestFlixMoviesInfo[]>(`${this.baseUrl}/movies/${query}`)
      .pipe(catchError(super.serviceError));
  }

  updateMovies(imdbId, status) {
    const body = status;
    return this.http
      .put<any>(`${this.baseUrl}/movies/id/${imdbId}`, body)
      .pipe(catchError(super.serviceError));
  }

  private serializeObject(object) {
    const str = [];
    for (const p in object)
      if (object.hasOwnProperty(p) && object[p].length !== 0) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
      }
    return str.join('&').trim();
  }
}
