import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { MarketingComponent } from './marketing/marketing.component';
import { FeedComponent } from './feed/feed.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    CarouselComponent,
    MarketingComponent,
    FeedComponent,
    FormComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    CarouselComponent,
    MarketingComponent,
    FeedComponent,
    FormComponent,
  ],
})
export class HomeModule {}
