import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserModuleComponent } from './user-module.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserType } from 'backend/src/Utilities';
import { RoleGuard } from 'src/app/shared/guards/role.guard';

const routes: Routes = [
  {path: '', component: UserModuleComponent, children: [
    {path: '', component: UserListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin]}},
    {path: 'nuevo', component: UserCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin]}},
    {path: 'editar/:id', component: UserEditComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin]}},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
