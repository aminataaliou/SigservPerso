import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TuiAvatarModule, TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AuthentificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthentificationRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiAvatarModule,

  ]
})
export class AuthentificationModule  {
  
  
  
  
 
  
}

