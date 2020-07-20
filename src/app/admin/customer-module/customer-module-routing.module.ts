import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerModuleComponent } from './customer-module.component';

const routes: Routes = [{ path: '', component: CustomerModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerModuleRoutingModule { }
