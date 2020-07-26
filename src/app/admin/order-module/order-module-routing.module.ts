import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderModuleComponent } from './order-module.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  { path: '', component: OrderModuleComponent, children: [
    {path: '', component: OrderListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    {path: 'crear', component: OrderCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    {path: ':id', component: OrderViewComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
  ]},
  {path: 'viewer/:id', component: OrderViewComponent, data: {
    viewer: true
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderModuleRoutingModule { }
