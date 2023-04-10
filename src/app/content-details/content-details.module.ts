import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentDetailsRoutingModule } from './content-details-routing.module';
import { ContentDetailsComponent } from './content-details.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ContentDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentDetailsRoutingModule,
    MatCardModule
  ]
})
export class ContentDetailsModule { }
