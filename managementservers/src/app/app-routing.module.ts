import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: ()=>import("./authentification/authentification.module").then(m=>m.AuthentificationModule)
  },
  {
    path:'admin',
    loadChildren: ()=>import("./administration/administration.module").then(m=>m.AdministrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
