import { ImgMissingDirective } from './../../../directive/imgMissing.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

import { MainRoutingModule } from './main-routing.module';
import { MoviesFilterModule } from './movies-filters/movies-filter.module';
import { SharedModule } from './../../shared/shared.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { MainService } from './service/main.service';
import { PagesRepository } from './../pages.repository';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MoviesFilterModule,
    NgxUiLoaderModule,
  ],
  declarations: [MainComponent, MoviesListComponent, ImgMissingDirective],
  providers: [PagesRepository, MainService],
})
export class MainModule {}
