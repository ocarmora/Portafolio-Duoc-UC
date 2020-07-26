import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderModuleComponent } from './provider-module.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';
import { ProviderEditComponent } from './components/provider-edit/provider-edit.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  { path: '', component: ProviderModuleComponent, canActivate: [AuthGuard], children: [
    {path: '', component: ProviderListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    {path: 'nuevo', component: ProviderCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    {path: 'editar/:id', component: ProviderEditComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    {path: 'detalle/:id', component: ProviderDetailComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderModuleRoutingModule { }
