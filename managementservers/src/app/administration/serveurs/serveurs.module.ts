import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServeursRoutingModule } from './serveurs-routing.module';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ServeursComponent } from './serveurs.component';
import { ListeComponent } from './liste/liste.component';
import { TuiSwipeModule } from '@taiga-ui/cdk';
import {TuiTableModule} from '@taiga-ui/addon-table';

 


@NgModule({
  declarations: [
    ServeursComponent,
    DetailComponent,
    EditComponent,
    ListeComponent,
  ],
  imports: [
    CommonModule,
    TuiSwipeModule,
    TuiTableModule,
    ServeursRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class ServeursModule { }
