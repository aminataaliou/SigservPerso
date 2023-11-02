import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import {TuiAvatarModule, TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ALL_TAIGA_UI_MODULES } from '../all_taiga.module';


@NgModule({
  declarations: [
    AuthentificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthentificationRoutingModule,
    ReactiveFormsModule,
    ALL_TAIGA_UI_MODULES
  ]
})
export class AuthentificationModule { }
