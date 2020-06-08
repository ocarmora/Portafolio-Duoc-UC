import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryModuleComponent } from './inventory-module.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';

const routes: Routes = [
  {path: '', component: InventoryModuleComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: InventoryListComponent},
      {path: 'ingresar', component: InventoryCreateComponent},
      {path: 'ingresar/:id', component: InventoryCreateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryModuleRoutingModule { }
