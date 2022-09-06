import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  exports: [],
  imports: [CommonModule, HttpClientModule, PagesRoutingModule],
  providers: [],
})
export class PagesModule {}
