import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { ListeComponent } from './liste/liste.component';
import { NewutilisateurComponent } from './newutilisateur/newutilisateur.component';


@NgModule({
  declarations: [
    ListeComponent,
    NewutilisateurComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule
  ]
})
export class UtilisateurModule { }
