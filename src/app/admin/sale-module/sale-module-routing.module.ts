import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleModuleComponent } from './sale-module.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  { path: '', component: SaleModuleComponent, children: [
    {path: '', component: SaleListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor]}},
    {path: 'nueva', component: SaleCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor]}},
    {path: 'detalle/:id', component: SaleDetailComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor]}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleModuleRoutingModule { }
