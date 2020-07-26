import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { DocumentListComponent } from './components/documentos/document-list/document-list.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  { path: '', component: CustomerComponent, children: [
    {path: '', component: DocumentListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Cliente, UserType.Empresa]}}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
