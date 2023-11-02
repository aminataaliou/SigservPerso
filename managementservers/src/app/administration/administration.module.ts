import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';

import { SystemeComponent } from './systeme/systeme.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {TuiAppBarModule, TuiSidebarModule} from '@taiga-ui/addon-mobile';
import { TuiAccordionModule } from '@taiga-ui/kit/components/accordion';
import { AdministrationComponent } from './administration.component';
import { SidnavComponent } from './sidnav/sidnav.component';
import { TuiButtonModule, TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule, TuiMarkerIconModule } from '@taiga-ui/kit';




@NgModule({
  declarations: [
    AdministrationComponent,
    SidnavComponent,
    SystemeComponent,
    DashboardComponent,
    UtilisateurComponent,
  
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    TuiSidebarModule,
    TuiButtonModule,
    TuiActiveZoneModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiLinkModule,
    TuiMarkerIconModule,
    TuiAppBarModule,
    TuiAvatarModule
  ],

})
export class AdministrationModule { }
