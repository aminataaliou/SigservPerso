import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationComponent } from './administration.component';

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
        loadChildren: ()=>import("./serveur/serveur.module").then(m=>m.ServeurModule)
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
      {
        path: 'emplacements',
        loadChildren: ()=>import("./emplacement/emplacement.module").then(m=>m.EmplacementModule)
      },
      {
        path: 'compte-acces',
        loadChildren: ()=>import("./compte-dacces/compte-dacces.module").then(m=>m.CompteDaccesModule)
      },
      {
        path: 'tags',
        loadChildren: ()=>import("./tags/tags.module").then(m=>m.TagsModule)
      },
      {
        path: 'data-center',
        loadChildren: ()=>import("./data-center/data-center.module").then(m=>m.DataCenterModule)
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
