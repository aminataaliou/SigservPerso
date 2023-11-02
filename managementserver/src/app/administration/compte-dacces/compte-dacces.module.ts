import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteDaccesRoutingModule } from './compte-dacces-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import {ALL_TAIGA_UI_MODULES} from "../../all_taiga.module";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiPushModule} from "@taiga-ui/kit";
import {CompteDaccesComponent} from "./compte-dacces.component";


@NgModule({
  declarations: [
    CompteDaccesComponent,
    ListeComponent,
    DetailComponent,
    EditComponent,
    NouveauComponent
  ],
  imports: [
    CommonModule,
    CompteDaccesRoutingModule,
    ALL_TAIGA_UI_MODULES,
    TuiTableModule,
    FormsModule,
    ReactiveFormsModule,
    TuiPushModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class CompteDaccesModule { }
