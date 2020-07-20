import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserModuleComponent } from './user-module.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', component: UserModuleComponent, children: [
    {path: '', component: UserListComponent},
    {path: 'nuevo', component: UserCreateComponent},
    {path: 'editar/:id', component: UserEditComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
