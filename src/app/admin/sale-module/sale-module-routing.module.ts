import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleModuleComponent } from './sale-module.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';

const routes: Routes = [
  { path: '', component: SaleModuleComponent, canActivate: [AuthGuard], children: [
    {path: '', component: SaleListComponent},
    {path: 'nueva', component: SaleCreateComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleModuleRoutingModule { }
