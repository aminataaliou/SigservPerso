import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { NewutilisateurComponent } from './newutilisateur/newutilisateur.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'liste',
    pathMatch : 'full'
  },
  {
    path: 'liste',
    component: ListeComponent
  },
  {
    path: 'newutilisateur',
    component: NewutilisateurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
