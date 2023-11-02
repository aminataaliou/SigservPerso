import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    ListeComponent,
    EditComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
