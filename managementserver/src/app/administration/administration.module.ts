import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { SidnavComponent } from './sidnav/sidnav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ALL_TAIGA_UI_MODULES } from '../all_taiga.module';
import { ConfirmationDeleteComponent } from './confirmation-delete/confirmation-delete.component';
import { EmplacementComponent } from './emplacement/emplacement.component';
import { CompteDaccesComponent } from './compte-dacces/compte-dacces.component';
import { TagsComponent } from './tags/tags.component';
import { DataCenterComponent } from './data-center/data-center.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    SidnavComponent,
    DashboardComponent,
    ConfirmationDeleteComponent,
    EmplacementComponent,
    TagsComponent,
    DataCenterComponent
  ],
  imports: [
    CommonModule,
    ALL_TAIGA_UI_MODULES,
    AdministrationRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AdministrationModule { }
