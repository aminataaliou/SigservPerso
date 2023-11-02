import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

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
    path:'edit',
    component:EditComponent
  },
  {
    path:'detail',
    component:DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServeursRoutingModule { }
