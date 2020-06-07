import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryModuleComponent } from './inventory-module.component';

const routes: Routes = [{ path: '', component: InventoryModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryModuleRoutingModule { }
