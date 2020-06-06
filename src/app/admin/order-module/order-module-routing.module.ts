import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderModuleComponent } from './order-module.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderViewComponent } from './components/order-view/order-view.component';

const routes: Routes = [
  { path: '', component: OrderModuleComponent, children: [
    {path: '', component: OrderListComponent},
    {path: 'crear', component: OrderCreateComponent},
    {path: ':id', component: OrderViewComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderModuleRoutingModule { }
