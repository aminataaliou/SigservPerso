import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./shareds/services/authGuard.service";
import {AdminGuardService} from "./shareds/services/admin.guard";

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuardService],
    loadChildren: ()=>import("./authentification/authentification.module").then(m=>m.AuthentificationModule)
  },
  {
    path:'admin',
    canActivate: [AdminGuardService],
    loadChildren: ()=>import("./administration/administration.module").then(m=>m.AdministrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
