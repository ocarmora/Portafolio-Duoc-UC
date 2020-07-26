import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderComponent } from './provider.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  { path: '', component: ProviderComponent, canActivate: [RoleGuard], data: {roles: [UserType.Proveedor]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
