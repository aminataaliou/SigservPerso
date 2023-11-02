import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurComponent } from './utilisateur.component';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { ALL_TAIGA_UI_MODULES } from 'src/app/all_taiga.module';
import { TuiInputFilesModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [
    UtilisateurComponent,
    ListeComponent,
    EditComponent,
    DetailComponent,
    NouveauComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    ALL_TAIGA_UI_MODULES,
    TuiTableModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputFilesModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class UtilisateurModule { }
