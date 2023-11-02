import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { NouveauComponent } from './nouveau/nouveau.component';

const routes: Routes = [
  {
    path:'',
    redirectTo :'liste',
    pathMatch :'full'
  },
  {
    path:'liste',
    component:ListeComponent
  },
  {
    path:':id/edit',
    component:EditComponent
  },
  {
    path:':id/detail',
    component:DetailComponent
  },
  {
    path:'nouveau',
    component:NouveauComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServeurRoutingModule { }
