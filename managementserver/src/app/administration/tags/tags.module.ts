import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { NouveauComponent } from './nouveau/nouveau.component';


@NgModule({
  declarations: [
    ListeComponent,
    DetailComponent,
    EditComponent,
    NouveauComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule
  ]
})
export class TagsModule { }
