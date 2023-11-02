import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServeursComponent } from './serveurs/serveurs.component';
import { SidnavComponent } from './sidnav/sidnav.component';
import { SystemeComponent } from './systeme/systeme.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  {
    path:'',
    component: AdministrationComponent,
    children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'serveurs',
        loadChildren: ()=>import("./serveurs/serveurs.module").then(m=>m.ServeursModule)
      },
      {
        path:'systemes',
        loadChildren: ()=>import("./systeme/systeme.module").then(m=>m.SystemeModule)
      },
      {
        path:'utilisateurs',
        loadChildren: ()=>import("./utilisateur/utilisateur.module").then(m=>m.UtilisateurModule)
      },
      {
        path: 'applications',
        loadChildren: ()=>import("./application/application.module").then(m=>m.ApplicationModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
