import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../../shared/shared.module';

import { MoviesFiltersComponent } from './movies-filters.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [MoviesFiltersComponent],
  exports: [MoviesFiltersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesFilterModule {}
