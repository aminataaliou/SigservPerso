import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { ALL_TAIGA_UI_MODULES } from 'src/app/all_taiga.module';


@NgModule({
  declarations: [
    ApplicationComponent,
    ListeComponent,
    EditComponent,
    DetailComponent,
    NouveauComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ALL_TAIGA_UI_MODULES,
    TuiTableModule,
    FormsModule,
    ReactiveFormsModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  
})
export class ApplicationModule { }
