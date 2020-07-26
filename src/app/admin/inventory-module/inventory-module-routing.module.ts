import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryModuleComponent } from './inventory-module.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { UserType } from 'backend/src/Utilities';
import { RoleGuard } from 'src/app/shared/guards/role.guard';

const routes: Routes = [
  {path: '', component: InventoryModuleComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: InventoryListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado, UserType.Vendedor]}},
      {path: 'ingresar', component: InventoryCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
      {path: 'ingresar/:id', component: InventoryCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryModuleRoutingModule { }
