import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MainService } from './service/main.service';
import { MainStateService } from './service/main-state.service';
import { LoaderService } from './../../services/loader.service';
import { NgxUiLoaderConfig } from './../../../../../../node_modules/ngx-ui-loader/lib/utils/interfaces.d';
import { TestFlixFilters } from './models/TestFlixFilter';

@Component({
  selector: 'mono-nx-test-with-nextjs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slide_in_out', [
      state(
        'true',
        style({
          maxWidth: '232px',
          visibility: AUTO_STYLE,
          opacity: 1,
          padding: '10px 15px 20px',
          display: AUTO_STYLE,
        })
      ),
      state(
        'false',
        style({
          maxWidth: '0px',
          visibility: 'hidden',
          opacity: 0,
          padding: '0',
          display: 'none',
        })
      ),
      transition('false => true', animate(100 + 'ms ease-in')),
      transition('true => false', animate(300 + 'ms ease-out')),
    ]),
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  filterOnOff$: Observable<boolean> = this.mainState.openCloseFilter$;
  moviesQuantity$: Observable<number> = this.mainState.moviesQty$;
  config: NgxUiLoaderConfig;
  subscriber: Subscription;

  constructor(
    public mainService: MainService,
    private mainState: MainStateService,
    private loader: LoaderService
  ) {
    this.mainService.getFacets();
    this.mainService.listMovies();
  }

  ngOnInit() {
    this.subscriber = this.loader.config.subscribe(
      (config) => (this.config = config)
    );
  }

  generateMovieList(mainFilter: TestFlixFilters) {
    this.loader.stop();
    setTimeout(() => {
      this.mainState.setMovies([]);
      this.mainService.listMovies(mainFilter);
    }, 100);
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
}
