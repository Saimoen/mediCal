import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    PaginationModule.forRoot(),
  ],
  exports: [],
})
export class HomeModule {}
