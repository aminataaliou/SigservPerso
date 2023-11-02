import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServeurRoutingModule } from './serveur-routing.module';
import { ServeurComponent } from './serveur.component';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { ALL_TAIGA_UI_MODULES } from 'src/app/all_taiga.module';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouveauComponent } from './nouveau/nouveau.component';
import { TUI_DIALOGS_CLOSE } from '@taiga-ui/core';
import { TuiPushModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    ServeurComponent,
    ListeComponent,
    EditComponent,
    DetailComponent,
    NouveauComponent

  ],

  imports: [
    CommonModule,
    ServeurRoutingModule,
    ALL_TAIGA_UI_MODULES,
    TuiTableModule,
    FormsModule,
    ReactiveFormsModule,
    TuiPushModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class ServeurModule { }
