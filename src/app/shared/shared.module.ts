import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseFilterComponent } from './components/base-filter/base-filter.component';
import { Capitalizer } from '../../pipes/capitalizer.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseFilterComponent, Capitalizer],
  exports: [BaseFilterComponent],
})
export class SharedModule {}
