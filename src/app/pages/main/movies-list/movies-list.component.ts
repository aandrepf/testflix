import { MainService } from './../service/main.service';
import { TestFlixMoviesInfo } from './../models/TestFlix';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainStateService } from '../service/main-state.service';

@Component({
  selector: 'mono-nx-test-with-nextjs-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<TestFlixMoviesInfo[]> = this.mainState.moviesList$;

  constructor(
    private mainState: MainStateService,
    private mainService: MainService
  ) {}

  ngOnInit() {}

  calculateRating(ratings: any[], el: HTMLElement) {
    ratings = ratings.map((r) => {
      return +r.Value.replace(/\/100?|\%?\.?/g, '');
    });
    const avgDivider = ratings.length;
    const avgCalculated = ratings.reduce((a, c) => {
      return a + c;
    }, 0);

    const finalRating = (((avgCalculated / 100) * 5) / avgDivider).toFixed(2);
    this.generateStars(finalRating, el);
    return finalRating;
  }

  generateStars(rating: string, element: HTMLElement) {
    const splitedRating = rating.split('.');
    const n = +splitedRating[0];
    const d = +splitedRating[1];

    const s = Array.from(element.children);
    s.forEach((st, index) => {
      if (index < n || n >= 5) {
        st.classList.replace('fa-star-o', 'fa-star');
      } else if (d > 50) {
        s[n].classList.replace('fa-star-o', 'fa-star-half-o');
      }
    });
  }

  setBackground(watched: string, saved: string) {
    const w = watched === 'True' ? true : false;
    const s = saved === 'True' ? true : false;
    let classes;

    if (!w && !s) {
      classes = 'mv-white';
    } else if (!w && s) {
      classes = 'mv-orange';
    } else if (w && !s) {
      classes = 'mv-yellow';
    } else if (w && s) {
      classes = 'mv-green';
    }
    return classes;
  }

  setMovieStatus(classes: string, w: string, s: string, id: string) {
    let watched;
    let saved;
    let status;
    if (classes.includes('eye')) {
      watched = w === 'True' ? 'False' : 'True';
      status = {
        watched: watched.toLowerCase(),
        saved: s.toLowerCase(),
      };
    } else {
      saved = s === 'True' ? 'False' : 'True';
      status = {
        watched: w.toLowerCase(),
        saved: saved.toLowerCase(),
      };
    }

    this.mainService.updateMovies(id, status);

    setTimeout(() => {
      this.mainState.setMovies([]);
      this.mainService.listMovies();
      this.mainService.getFacets();
    }, 100);
  }
}
