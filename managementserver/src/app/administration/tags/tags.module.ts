import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import {ALL_TAIGA_UI_MODULES} from "../../all_taiga.module";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiPushModule} from "@taiga-ui/kit";


@NgModule({
  declarations: [
    ListeComponent,
    EditComponent,
    NouveauComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ALL_TAIGA_UI_MODULES,
    TuiTableModule,
    FormsModule,
    ReactiveFormsModule,
    TuiPushModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class TagsModule { }
