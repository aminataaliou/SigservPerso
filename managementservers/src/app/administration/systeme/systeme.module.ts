import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemeRoutingModule } from './systeme-routing.module';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ListeComponent,
    EditComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SystemeRoutingModule
  ]
})
export class SystemeModule { }
