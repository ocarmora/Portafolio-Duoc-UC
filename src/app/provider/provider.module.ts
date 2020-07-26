import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { AdminModule } from '../admin/admin.module';
import { OrderListComponent } from './components/order-list/order-list.component';


@NgModule({
  declarations: [ProviderComponent, OrderListComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    AdminModule
  ]
})
export class ProviderModule { }
