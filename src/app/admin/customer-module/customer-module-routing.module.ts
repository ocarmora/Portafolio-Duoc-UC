import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerModuleComponent } from './customer-module.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  { path: '', component: CustomerModuleComponent, children: [
    {path: '', component: CustomerListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor]}},
    {path: 'nuevo', component: CustomerCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor]}},
    {path: 'editar/:id', component: CustomerEditComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor]}},
    {path: 'detalle/:id', component: CustomerDetailComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor]}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerModuleRoutingModule { }
